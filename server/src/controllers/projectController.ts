import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export const getProjects = async (req: Request, res: Response) => {
  try {
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(projects);
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

    res.json(project);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching project detail", error: error.message });
  }
};

export const createProject = async (req: Request, res: Response) => {
  const { name, image_url, short_description, tech_stack, features, challenges_solved, live_url, github_url } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ message: "Project name is required" });
  }
  if (!short_description || typeof short_description !== "string" || !short_description.trim()) {
    return res.status(400).json({ message: "Short description is required" });
  }
  if (!challenges_solved || typeof challenges_solved !== "string" || !challenges_solved.trim()) {
    return res.status(400).json({ message: "Challenges solved description is required" });
  }
  if (!Array.isArray(tech_stack)) {
    return res.status(400).json({ message: "Tech stack must be an array of strings" });
  }
  if (!Array.isArray(features)) {
    return res.status(400).json({ message: "Features must be an array of strings" });
  }

  try {
    const { data: project, error } = await supabase
      .from("projects")
      .insert([{
        name: name.trim(),
        image_url: image_url ? image_url.trim() : null,
        short_description: short_description.trim(),
        tech_stack,
        features,
        challenges_solved: challenges_solved.trim(),
        live_url: live_url ? live_url.trim() : null,
        github_url: github_url ? github_url.trim() : null
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error: any) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Error creating project", error: error.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const { name, image_url, short_description, tech_stack, features, challenges_solved, live_url, github_url } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ message: "Project name is required" });
  }
  if (!short_description || typeof short_description !== "string" || !short_description.trim()) {
    return res.status(400).json({ message: "Short description is required" });
  }
  if (!challenges_solved || typeof challenges_solved !== "string" || !challenges_solved.trim()) {
    return res.status(400).json({ message: "Challenges solved description is required" });
  }
  if (!Array.isArray(tech_stack)) {
    return res.status(400).json({ message: "Tech stack must be an array of strings" });
  }
  if (!Array.isArray(features)) {
    return res.status(400).json({ message: "Features must be an array of strings" });
  }

  try {
    const { data: project, error } = await supabase
      .from("projects")
      .update({
        name: name.trim(),
        image_url: image_url ? image_url.trim() : null,
        short_description: short_description.trim(),
        tech_stack,
        features,
        challenges_solved: challenges_solved.trim(),
        live_url: live_url ? live_url.trim() : null,
        github_url: github_url ? github_url.trim() : null
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.json({ message: "Project updated successfully", project });
  } catch (error: any) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Error updating project", error: error.message });
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
    const { data: related, error } = await supabase
      .from("projects")
      .select("*")
      .neq("id", id)
      .limit(3);

    if (error) throw error;

    res.json(related);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching related projects", error: error.message });
  }
};

export const uploadProjectImage = async (req: Request, res: Response) => {
  const { image, name } = req.body;

  if (!image || typeof image !== "string" || !image.startsWith("data:image/")) {
    return res.status(400).json({ message: "Invalid image format. Expected base64 data URL." });
  }
  if (!name || typeof name !== "string") {
    return res.status(400).json({ message: "Image filename is required." });
  }

  try {
    const matches = image.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ message: "Invalid base64 image encoding." });
    }

    const fileExtension = matches[1];
    const base64Data = matches[2];
    const fileBuffer = Buffer.from(base64Data, "base64");

    const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExtension}`;

    const { error } = await supabase.storage
      .from("portfolio")
      .upload(uniqueFilename, fileBuffer, {
        contentType: `image/${fileExtension}`,
        upsert: true
      });

    if (error) {
      console.error("Supabase storage error:", error);
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from("portfolio")
      .getPublicUrl(uniqueFilename);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      throw new Error("Could not retrieve public URL for uploaded asset.");
    }

    res.json({ imageUrl: publicUrlData.publicUrl });
  } catch (error: any) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Error uploading image", error: error.message });
  }
};
