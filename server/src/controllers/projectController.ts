import { Request, Response } from "express";
import { supabase } from "../config/supabase";

// Helper to handle related project tables
const fetchNestedData = async (projectId: string) => {
  const [
    { data: tags },
    { data: journey },
    { data: problems },
    { data: solutions },
    { data: techStack },
    { data: results },
    { data: resources }
  ] = await Promise.all([
    supabase.from("project_tags").select("*").eq("project_id", projectId),
    supabase.from("project_journey").select("*").eq("project_id", projectId).order("order", { ascending: true }),
    supabase.from("project_problems").select("*").eq("project_id", projectId),
    supabase.from("project_solutions").select("*").eq("project_id", projectId),
    supabase.from("project_tech_stack").select("*").eq("project_id", projectId),
    supabase.from("project_results").select("*").eq("project_id", projectId),
    supabase.from("project_resources").select("*").eq("project_id", projectId)
  ]);

  return {
    tags: tags?.map(t => t.tag) || [],
    journey: journey || [],
    problems: problems || [],
    solutions: solutions || [],
    techStack: techStack || [],
    results: results || [],
    resources: resources || []
  };
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Optionally include basic tags for the list view
    const projectsWithTags = await Promise.all(projects.map(async (project) => {
      const { data: tags } = await supabase.from("project_tags").select("tag").eq("project_id", project.id);
      return { ...project, tags: tags?.map(t => t.tag) || [] };
    }));

    res.json(projectsWithTags);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching projects", error: error.message });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  try {
    const { data: project, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const nestedData = await fetchNestedData(id);

    res.json({ ...project, ...nestedData });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching project detail", error: error.message });
  }
};

export const createProject = async (req: Request, res: Response) => {
  const { tags, journey, problems, solutions, techStack, results, resources, ...projectData } = req.body;
  
  // Sanitize projectData to only include columns that exist in the projects table
  // This prevents Supabase from erroring out if extra fields (like 'technologies' or 'featured') 
  // are sent but don't exist in the database schema.
  const allowedFields = [
    'title', 'category', 'description', 'liveUrl', 'githubUrl', 
    'image', 'projectType', 'status', 'problem', 'solution', 
    'techStackDescription', 'result', 'date', 'assignedDate', 
    'location', 'client', 'featured', 'technologies'
  ];

  const sanitizedData: any = {};
  allowedFields.forEach(field => {
    // Provide default empty strings for critical fields if they are missing
    if (projectData[field] !== undefined) {
      sanitizedData[field] = projectData[field];
    } else {
      // Default values to satisfy NOT NULL constraints in DB
      const defaults: any = {
        description: "",
        problem: "",
        solution: "",
        techStackDescription: "",
        result: "",
        date: "",
        assignedDate: "",
        location: "",
        client: "",
        image: "",
        liveUrl: "",
        githubUrl: "",
        featured: false
      };
      if (defaults[field] !== undefined) {
        sanitizedData[field] = defaults[field];
      }
    }
  });

  try {
    // 1. Insert Project
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .insert([sanitizedData])
      .select()
      .single();

    if (projectError) {
      console.error("Supabase Project Error:", projectError);
      throw projectError;
    }
    const projectId = project.id;

    // 2. Insert Nested Data
    const promises = [];
    if (tags?.length) promises.push(supabase.from("project_tags").insert(tags.map((tag: string) => ({ project_id: projectId, tag }))));
    if (journey?.length) promises.push(supabase.from("project_journey").insert(journey.map((item: any) => ({ ...item, project_id: projectId }))));
    if (problems?.length) promises.push(supabase.from("project_problems").insert(problems.map((item: any) => ({ ...item, project_id: projectId }))));
    if (solutions?.length) promises.push(supabase.from("project_solutions").insert(solutions.map((item: any) => ({ ...item, project_id: projectId }))));
    if (techStack?.length) promises.push(supabase.from("project_tech_stack").insert(techStack.map((item: any) => ({ ...item, project_id: projectId }))));
    if (results?.length) promises.push(supabase.from("project_results").insert(results.map((item: any) => ({ ...item, project_id: projectId }))));
    if (resources?.length) promises.push(supabase.from("project_resources").insert(resources.map((item: any) => ({ ...item, project_id: projectId }))));

    await Promise.all(promises);

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error: any) {
    console.error("Error creating project:", error);
    res.status(500).json({ 
      message: `Critcal DB Error: ${error.message || "Unknown Failure"}`, 
      error: error.message 
    });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const { tags, journey, problems, solutions, techStack, results, resources, ...projectData } = req.body;

  const allowedFields = [
    'title', 'category', 'description', 'liveUrl', 'githubUrl', 
    'image', 'projectType', 'status', 'problem', 'solution', 
    'techStackDescription', 'result', 'date', 'assignedDate', 
    'location', 'client', 'featured', 'technologies'
  ];

  const sanitizedData: any = {};
  allowedFields.forEach(field => {
    if (projectData[field] !== undefined) {
      sanitizedData[field] = projectData[field];
    }
  });

  try {
    // 1. Update Project
    const { error: projectError } = await supabase
      .from("projects")
      .update(sanitizedData)
      .eq("id", id);

    if (projectError) {
      console.error("Supabase Project Error:", projectError);
      throw projectError;
    }

    // 2. Delete existing nested data
    await Promise.all([
      supabase.from("project_tags").delete().eq("project_id", id),
      supabase.from("project_journey").delete().eq("project_id", id),
      supabase.from("project_problems").delete().eq("project_id", id),
      supabase.from("project_solutions").delete().eq("project_id", id),
      supabase.from("project_tech_stack").delete().eq("project_id", id),
      supabase.from("project_results").delete().eq("project_id", id),
      supabase.from("project_resources").delete().eq("project_id", id)
    ]);

    // 3. Insert new nested data
    const promises = [];
    if (tags?.length) promises.push(supabase.from("project_tags").insert(tags.map((tag: string) => ({ project_id: id, tag }))));
    if (journey?.length) promises.push(supabase.from("project_journey").insert(journey.map((item: any) => ({ ...item, project_id: id }))));
    if (problems?.length) promises.push(supabase.from("project_problems").insert(problems.map((item: any) => ({ ...item, project_id: id }))));
    if (solutions?.length) promises.push(supabase.from("project_solutions").insert(solutions.map((item: any) => ({ ...item, project_id: id }))));
    if (techStack?.length) promises.push(supabase.from("project_tech_stack").insert(techStack.map((item: any) => ({ ...item, project_id: id }))));
    if (results?.length) promises.push(supabase.from("project_results").insert(results.map((item: any) => ({ ...item, project_id: id }))));
    if (resources?.length) promises.push(supabase.from("project_resources").insert(resources.map((item: any) => ({ ...item, project_id: id }))));

    await Promise.all(promises);

    res.json({ message: "Project updated successfully" });
  } catch (error: any) {
    console.error("Error updating project:", error);
    res.status(500).json({ 
      message: `Evolution Sync Error: ${error.message || "Logic Inconsistency"}`, 
      error: error.message 
    });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  try {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw error;
    res.json({ message: "Project deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting project", error: error.message });
  }
};

export const getRelatedProjects = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  try {
    // 1. Get current project category
    const { data: currentProject } = await supabase
      .from("projects")
      .select("category")
      .eq("id", id)
      .single();

    if (!currentProject) return res.status(404).json({ message: "Project not found" });

    // 2. Fetch related by category
    const { data: related, error } = await supabase
      .from("projects")
      .select("*")
      .neq("id", id)
      .eq("category", currentProject.category)
      .limit(3);

    if (error) throw error;

    res.json(related);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching related projects", error: error.message });
  }
};
