import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export const getEducation = async (req: Request, res: Response) => {
  try {
    const { data: education, error } = await supabase
      .from("education")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;
    res.json(education);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching education entries", error: error.message });
  }
};

export const createEducation = async (req: Request, res: Response) => {
  try {
    const { data: education, error } = await supabase.from("education").insert([req.body]).select().single();
    if (error) throw error;
    res.status(201).json({ message: "Education entry created successfully", education });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating education entry", error: error.message });
  }
};

export const updateEducation = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  try {
    const { error } = await supabase.from("education").update(req.body).eq("id", id);
    if (error) throw error;
    res.json({ message: "Education entry updated successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error updating education entry", error: error.message });
  }
};

export const deleteEducation = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  try {
    const { error } = await supabase.from("education").delete().eq("id", id);
    if (error) throw error;
    res.json({ message: "Education entry deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting education entry", error: error.message });
  }
};
