import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export const getSkills = async (req: Request, res: Response) => {
  try {
    let categoriesRes = await supabase.from("skill_categories").select("*").order("sort_order", { ascending: true }).order("id", { ascending: true });
    let skillsRes = await supabase.from("skills").select("*").order("sort_order", { ascending: true }).order("id", { ascending: true });
    const extraSkillsRes = await supabase.from("extra_skills").select("*").order("id", { ascending: true });

    if (categoriesRes.error) {
      categoriesRes = await supabase.from("skill_categories").select("*").order("id", { ascending: true });
    }
    if (skillsRes.error) {
      skillsRes = await supabase.from("skills").select("*").order("id", { ascending: true });
    }

    const categories = categoriesRes.data || [];
    const skills = skillsRes.data || [];
    const extraSkills = extraSkillsRes.data || [];

    const groupedSkills = categories.map(cat => ({
      ...cat,
      skills: skills.filter(s => s.category_id === cat.id)
    }));

    res.json({
      categories: groupedSkills,
      extra_skills: extraSkills
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

// Category Management
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { data: category, error } = await supabase.from("skill_categories").insert([req.body]).select().single();
    if (error) throw error;
    res.status(201).json({ message: "Category created successfully", category });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating category", error: error.message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  try {
    const { error } = await supabase.from("skill_categories").update(req.body).eq("id", id);
    if (error) throw error;
    res.json({ message: "Category updated successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error updating category", error: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  try {
    const { error } = await supabase.from("skill_categories").delete().eq("id", id);
    if (error) throw error;
    res.json({ message: "Category deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting category", error: error.message });
  }
};

export const reorderCategories = async (req: Request, res: Response) => {
  const { orders } = req.body;

  if (!Array.isArray(orders)) {
    return res.status(400).json({ message: "Orders must be an array of { id, sort_order }" });
  }

  try {
    const promises = orders.map(item => 
      supabase
        .from("skill_categories")
        .update({ sort_order: item.sort_order })
        .eq("id", item.id)
    );

    const results = await Promise.all(promises);
    const errors = results.filter(r => r.error).map(r => r.error);

    if (errors.length > 0) {
      console.error("Bulk reorder categories errors:", errors);
      return res.status(500).json({ message: "Failed to update some category orders", errors });
    }

    res.json({ message: "Categories reordered successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error reordering categories", error: error.message });
  }
};

export const reorderSkills = async (req: Request, res: Response) => {
  const { orders } = req.body;

  if (!Array.isArray(orders)) {
    return res.status(400).json({ message: "Orders must be an array of { id, sort_order }" });
  }

  try {
    const promises = orders.map(item => 
      supabase
        .from("skills")
        .update({ sort_order: item.sort_order })
        .eq("id", item.id)
    );

    const results = await Promise.all(promises);
    const errors = results.filter(r => r.error).map(r => r.error);

    if (errors.length > 0) {
      console.error("Bulk reorder skills errors:", errors);
      return res.status(500).json({ message: "Failed to update some skill orders", errors });
    }

    res.json({ message: "Skills reordered successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error reordering skills", error: error.message });
  }
};
