"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = exports.getProjects = void 0;
const supabase_1 = require("../services/supabase");
const getProjects = async (_req, res) => {
    const { data, error } = await supabase_1.supabase
        .from("projects")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
    if (error)
        return res.status(500).json(error);
    res.json(data);
};
exports.getProjects = getProjects;
const createProject = async (req, res) => {
    const { title, description, tech_stack } = req.body;
    const { data, error } = await supabase_1.supabase
        .from("projects")
        .insert([{ title, description, tech_stack }]);
    if (error)
        return res.status(400).json(error);
    res.json(data);
};
exports.createProject = createProject;
