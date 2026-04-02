import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export const getExperience = async (req: Request, res: Response) => {
  try {
    const { data: experiences, error } = await supabase
      .from("experience")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;

    const experiencesWithTech = await Promise.all(experiences.map(async (exp) => {
      const { data: tech } = await supabase.from("experience_tech").select("tech").eq("experience_id", exp.id);
      return { ...exp, technologies: tech?.map(t => t.tech) || [] };
    }));

    res.json(experiencesWithTech);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching experience", error: error.message });
  }
};

export const createExperience = async (req: Request, res: Response) => {
  const { technologies, ...expData } = req.body;
  try {
    const { data: experience, error } = await supabase.from("experience").insert([expData]).select().single();
    if (error) throw error;

    if (technologies?.length) {
      const techToInsert = technologies.map((tech: string) => ({ experience_id: experience.id, tech }));
      await supabase.from("experience_tech").insert(techToInsert);
    }

    res.status(201).json({ message: "Experience created successfully", experience });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating experience", error: error.message });
  }
};

export const updateExperience = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const { technologies, ...expData } = req.body;
  try {
    const { error } = await supabase.from("experience").update(expData).eq("id", id);
    if (error) throw error;

    // Update tech tags (delete + insert)
    await supabase.from("experience_tech").delete().eq("experience_id", id);
    if (technologies?.length) {
      const techToInsert = technologies.map((tech: string) => ({ experience_id: id, tech }));
      await supabase.from("experience_tech").insert(techToInsert);
    }

    res.json({ message: "Experience updated successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error updating experience", error: error.message });
  }
};

export const deleteExperience = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  try {
    const { error } = await supabase.from("experience").delete().eq("id", id);
    if (error) throw error;
    res.json({ message: "Experience deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting experience", error: error.message });
  }
};
