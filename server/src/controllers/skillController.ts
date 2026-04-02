import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export const getSkills = async (req: Request, res: Response) => {
  try {
    const [{ data: categories }, { data: skills }, { data: extraSkills }] = await Promise.all([
      supabase.from("skill_categories").select("*").order("id", { ascending: true }),
      supabase.from("skills").select("*").order("id", { ascending: true }),
      supabase.from("extra_skills").select("*").order("id", { ascending: true })
    ]);

    const groupedSkills = categories?.map(cat => ({
      ...cat,
      skills: skills?.filter(s => s.category_id === cat.id) || []
    })) || [];

    res.json({
      categories: groupedSkills,
      extra_skills: extraSkills || []
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching skills", error: error.message });
  }
};

export const createSkill = async (req: Request, res: Response) => {
  try {
    const { data: skill, error } = await supabase.from("skills").insert([req.body]).select().single();
    if (error) throw error;
    res.status(201).json({ message: "Skill created successfully", skill });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating skill", error: error.message });
  }
};

export const updateSkill = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  try {
    const { error } = await supabase.from("skills").update(req.body).eq("id", id);
    if (error) throw error;
    res.json({ message: "Skill updated successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error updating skill", error: error.message });
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  try {
    const { error } = await supabase.from("skills").delete().eq("id", id);
    if (error) throw error;
    res.json({ message: "Skill deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting skill", error: error.message });
  }
};

// Also handle category and extra skills CRUD if needed, but the prompt focused on getSkills grouping and skills CRUD. 
// I'll add extra skills CRUD for completeness.

export const createExtraSkill = async (req: Request, res: Response) => {
    try {
      const { data: skill, error } = await supabase.from("extra_skills").insert([req.body]).select().single();
      if (error) throw error;
      res.status(201).json({ message: "Extra skill created successfully", skill });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating extra skill", error: error.message });
    }
};

export const deleteExtraSkill = async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    try {
      const { error } = await supabase.from("extra_skills").delete().eq("id", id);
      if (error) throw error;
      res.json({ message: "Extra skill deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: "Error deleting extra skill", error: error.message });
    }
};
