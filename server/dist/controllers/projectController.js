"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelatedProjects = exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectById = exports.getProjects = void 0;
const supabase_1 = require("../config/supabase");
// Helper to handle related project tables
const fetchNestedData = async (projectId) => {
    const [{ data: tags }, { data: journey }, { data: problems }, { data: solutions }, { data: techStack }, { data: results }, { data: resources }] = await Promise.all([
        supabase_1.supabase.from("project_tags").select("*").eq("project_id", projectId),
        supabase_1.supabase.from("project_journey").select("*").eq("project_id", projectId).order("order", { ascending: true }),
        supabase_1.supabase.from("project_problems").select("*").eq("project_id", projectId),
        supabase_1.supabase.from("project_solutions").select("*").eq("project_id", projectId),
        supabase_1.supabase.from("project_tech_stack").select("*").eq("project_id", projectId),
        supabase_1.supabase.from("project_results").select("*").eq("project_id", projectId),
        supabase_1.supabase.from("project_resources").select("*").eq("project_id", projectId)
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
const getProjects = async (req, res) => {
    try {
        const { data: projects, error } = await supabase_1.supabase
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false });
        if (error)
            throw error;
        // Optionally include basic tags for the list view
        const projectsWithTags = await Promise.all(projects.map(async (project) => {
            const { data: tags } = await supabase_1.supabase.from("project_tags").select("tag").eq("project_id", project.id);
            return { ...project, tags: tags?.map(t => t.tag) || [] };
        }));
        res.json(projectsWithTags);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching projects", error: error.message });
    }
};
exports.getProjects = getProjects;
const getProjectById = async (req, res) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    try {
        const { data: project, error } = await supabase_1.supabase
            .from("projects")
            .select("*")
            .eq("id", id)
            .single();
        if (error || !project) {
            return res.status(404).json({ message: "Project not found" });
        }
        const nestedData = await fetchNestedData(id);
        res.json({ ...project, ...nestedData });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching project detail", error: error.message });
    }
};
exports.getProjectById = getProjectById;
const createProject = async (req, res) => {
    const { tags, journey, problems, solutions, techStack, results, resources, ...projectData } = req.body;
    try {
        // 1. Insert Project
        const { data: project, error: projectError } = await supabase_1.supabase
            .from("projects")
            .insert([projectData])
            .select()
            .single();
        if (projectError)
            throw projectError;
        const projectId = project.id;
        // 2. Insert Nested Data
        const promises = [];
        if (tags?.length)
            promises.push(supabase_1.supabase.from("project_tags").insert(tags.map((tag) => ({ project_id: projectId, tag }))));
        if (journey?.length)
            promises.push(supabase_1.supabase.from("project_journey").insert(journey.map((item) => ({ ...item, project_id: projectId }))));
        if (problems?.length)
            promises.push(supabase_1.supabase.from("project_problems").insert(problems.map((item) => ({ ...item, project_id: projectId }))));
        if (solutions?.length)
            promises.push(supabase_1.supabase.from("project_solutions").insert(solutions.map((item) => ({ ...item, project_id: projectId }))));
        if (techStack?.length)
            promises.push(supabase_1.supabase.from("project_tech_stack").insert(techStack.map((item) => ({ ...item, project_id: projectId }))));
        if (results?.length)
            promises.push(supabase_1.supabase.from("project_results").insert(results.map((item) => ({ ...item, project_id: projectId }))));
        if (resources?.length)
            promises.push(supabase_1.supabase.from("project_resources").insert(resources.map((item) => ({ ...item, project_id: projectId }))));
        await Promise.all(promises);
        res.status(201).json({ message: "Project created successfully", project });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating project", error: error.message });
    }
};
exports.createProject = createProject;
const updateProject = async (req, res) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { tags, journey, problems, solutions, techStack, results, resources, ...projectData } = req.body;
    try {
        // 1. Update Project
        const { error: projectError } = await supabase_1.supabase
            .from("projects")
            .update(projectData)
            .eq("id", id);
        if (projectError)
            throw projectError;
        // 2. Delete existing nested data
        await Promise.all([
            supabase_1.supabase.from("project_tags").delete().eq("project_id", id),
            supabase_1.supabase.from("project_journey").delete().eq("project_id", id),
            supabase_1.supabase.from("project_problems").delete().eq("project_id", id),
            supabase_1.supabase.from("project_solutions").delete().eq("project_id", id),
            supabase_1.supabase.from("project_tech_stack").delete().eq("project_id", id),
            supabase_1.supabase.from("project_results").delete().eq("project_id", id),
            supabase_1.supabase.from("project_resources").delete().eq("project_id", id)
        ]);
        // 3. Insert new nested data
        const promises = [];
        if (tags?.length)
            promises.push(supabase_1.supabase.from("project_tags").insert(tags.map((tag) => ({ project_id: id, tag }))));
        if (journey?.length)
            promises.push(supabase_1.supabase.from("project_journey").insert(journey.map((item) => ({ ...item, project_id: id }))));
        if (problems?.length)
            promises.push(supabase_1.supabase.from("project_problems").insert(problems.map((item) => ({ ...item, project_id: id }))));
        if (solutions?.length)
            promises.push(supabase_1.supabase.from("project_solutions").insert(solutions.map((item) => ({ ...item, project_id: id }))));
        if (techStack?.length)
            promises.push(supabase_1.supabase.from("project_tech_stack").insert(techStack.map((item) => ({ ...item, project_id: id }))));
        if (results?.length)
            promises.push(supabase_1.supabase.from("project_results").insert(results.map((item) => ({ ...item, project_id: id }))));
        if (resources?.length)
            promises.push(supabase_1.supabase.from("project_resources").insert(resources.map((item) => ({ ...item, project_id: id }))));
        await Promise.all(promises);
        res.json({ message: "Project updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating project", error: error.message });
    }
};
exports.updateProject = updateProject;
const deleteProject = async (req, res) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    try {
        const { error } = await supabase_1.supabase.from("projects").delete().eq("id", id);
        if (error)
            throw error;
        res.json({ message: "Project deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting project", error: error.message });
    }
};
exports.deleteProject = deleteProject;
const getRelatedProjects = async (req, res) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    try {
        // 1. Get current project category
        const { data: currentProject } = await supabase_1.supabase
            .from("projects")
            .select("category")
            .eq("id", id)
            .single();
        if (!currentProject)
            return res.status(404).json({ message: "Project not found" });
        // 2. Fetch related by category
        const { data: related, error } = await supabase_1.supabase
            .from("projects")
            .select("*")
            .neq("id", id)
            .eq("category", currentProject.category)
            .limit(3);
        if (error)
            throw error;
        res.json(related);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching related projects", error: error.message });
    }
};
exports.getRelatedProjects = getRelatedProjects;
