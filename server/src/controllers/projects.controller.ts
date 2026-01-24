import { Request, Response } from "express";
import { supabase } from "../services/supabase";

export const getProjects = async (_req: Request, res: Response) => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json(error);
  res.json(data);
};

export const createProject = async (req: Request, res: Response) => {
  const { title, description, tech_stack } = req.body;

  const { data, error } = await supabase
    .from("projects")
    .insert([{ title, description, tech_stack }]);

  if (error) return res.status(400).json(error);
  res.json(data);
};
