"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.deleteExtraSkill = exports.createExtraSkill = exports.deleteSkill = exports.updateSkill = exports.createSkill = exports.getSkills = void 0;
const supabase_1 = require("../config/supabase");
const getSkills = async (req, res) => {
    try {
        const [{ data: categories }, { data: skills }, { data: extraSkills }] = await Promise.all([
            supabase_1.supabase.from("skill_categories").select("*").order("id", { ascending: true }),
            supabase_1.supabase.from("skills").select("*").order("id", { ascending: true }),
            supabase_1.supabase.from("extra_skills").select("*").order("id", { ascending: true })
        ]);
        const groupedSkills = categories?.map(cat => ({
            ...cat,
            skills: skills?.filter(s => s.category_id === cat.id) || []
        })) || [];
        res.json({
            categories: groupedSkills,
            extra_skills: extraSkills || []
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching skills", error: error.message });
    }
};
exports.getSkills = getSkills;
const createSkill = async (req, res) => {
    try {
        const { data: skill, error } = await supabase_1.supabase.from("skills").insert([req.body]).select().single();
        if (error)
            throw error;
        res.status(201).json({ message: "Skill created successfully", skill });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating skill", error: error.message });
    }
};
exports.createSkill = createSkill;
const updateSkill = async (req, res) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    try {
        const { error } = await supabase_1.supabase.from("skills").update(req.body).eq("id", id);
        if (error)
            throw error;
        res.json({ message: "Skill updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating skill", error: error.message });
    }
};
exports.updateSkill = updateSkill;
const deleteSkill = async (req, res) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    try {
        const { error } = await supabase_1.supabase.from("skills").delete().eq("id", id);
        if (error)
            throw error;
        res.json({ message: "Skill deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting skill", error: error.message });
    }
};
exports.deleteSkill = deleteSkill;
// Also handle category and extra skills CRUD if needed, but the prompt focused on getSkills grouping and skills CRUD. 
// I'll add extra skills CRUD for completeness.
const createExtraSkill = async (req, res) => {
    try {
        const { data: skill, error } = await supabase_1.supabase.from("extra_skills").insert([req.body]).select().single();
        if (error)
            throw error;
        res.status(201).json({ message: "Extra skill created successfully", skill });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating extra skill", error: error.message });
    }
};
exports.createExtraSkill = createExtraSkill;
const deleteExtraSkill = async (req, res) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    try {
        const { error } = await supabase_1.supabase.from("extra_skills").delete().eq("id", id);
        if (error)
            throw error;
        res.json({ message: "Extra skill deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting extra skill", error: error.message });
    }
};
exports.deleteExtraSkill = deleteExtraSkill;
// Category Management
const createCategory = async (req, res) => {
    try {
        const { data: category, error } = await supabase_1.supabase.from("skill_categories").insert([req.body]).select().single();
        if (error)
            throw error;
        res.status(201).json({ message: "Category created successfully", category });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating category", error: error.message });
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    try {
        const { error } = await supabase_1.supabase.from("skill_categories").update(req.body).eq("id", id);
        if (error)
            throw error;
        res.json({ message: "Category updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating category", error: error.message });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    try {
        const { error } = await supabase_1.supabase.from("skill_categories").delete().eq("id", id);
        if (error)
            throw error;
        res.json({ message: "Category deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting category", error: error.message });
    }
};
exports.deleteCategory = deleteCategory;
