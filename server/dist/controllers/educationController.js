"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEducation = exports.updateEducation = exports.createEducation = exports.getEducation = void 0;
const supabase_1 = require("../config/supabase");
const getEducation = async (req, res) => {
    try {
        const { data: education, error } = await supabase_1.supabase
            .from("education")
            .select("*")
            .order("id", { ascending: false });
        if (error)
            throw error;
        res.json(education);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching education entries", error: error.message });
    }
};
exports.getEducation = getEducation;
const createEducation = async (req, res) => {
    try {
        const { data: education, error } = await supabase_1.supabase.from("education").insert([req.body]).select().single();
        if (error)
            throw error;
        res.status(201).json({ message: "Education entry created successfully", education });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating education entry", error: error.message });
    }
};
exports.createEducation = createEducation;
const updateEducation = async (req, res) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    try {
        const { error } = await supabase_1.supabase.from("education").update(req.body).eq("id", id);
        if (error)
            throw error;
        res.json({ message: "Education entry updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating education entry", error: error.message });
    }
};
exports.updateEducation = updateEducation;
const deleteEducation = async (req, res) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    try {
        const { error } = await supabase_1.supabase.from("education").delete().eq("id", id);
        if (error)
            throw error;
        res.json({ message: "Education entry deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting education entry", error: error.message });
    }
};
exports.deleteEducation = deleteEducation;
