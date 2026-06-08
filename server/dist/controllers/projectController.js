"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderProjects = exports.uploadProjectImage = exports.getRelatedProjects = exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectById = exports.getProjects = void 0;
const supabase_1 = require("../config/supabase");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getProjects = async (req, res) => {
    try {
        let projectsData;
        const { data: projects, error } = await supabase_1.supabase
            .from("projects")
            .select("*")
            .order("sort_order", { ascending: true })
            .order("created_at", { ascending: false });
        if (error) {
            console.warn("Sorting by sort_order failed (column might not exist yet), falling back to created_at:", error.message);
            const fallback = await supabase_1.supabase
                .from("projects")
                .select("*")
                .order("created_at", { ascending: false });
            if (fallback.error)
                throw fallback.error;
            projectsData = fallback.data;
        }
        else {
            projectsData = projects;
        }
        res.json(projectsData);
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
        res.json(project);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching project detail", error: error.message });
    }
};
exports.getProjectById = getProjectById;
const createProject = async (req, res) => {
    const { name, image_url, short_description, tech_stack, features, challenges_solved, live_url, github_url, project_type, start_date, end_date, sort_order } = req.body;
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
    const parsedSortOrder = typeof sort_order !== "undefined" ? parseInt(sort_order, 10) : 0;
    const insertPayload = {
        name: name.trim(),
        image_url: image_url ? image_url.trim() : null,
        short_description: short_description.trim(),
        tech_stack,
        features,
        challenges_solved: challenges_solved.trim(),
        live_url: live_url ? live_url.trim() : null,
        github_url: github_url ? github_url.trim() : null,
        project_type: project_type || 'Personal',
        start_date: start_date ? start_date.trim() : null,
        end_date: end_date ? end_date.trim() : null
    };
    try {
        const { data: project, error } = await supabase_1.supabase
            .from("projects")
            .insert([{ ...insertPayload, sort_order: isNaN(parsedSortOrder) ? 0 : parsedSortOrder }])
            .select()
            .single();
        if (error) {
            // If sort_order column does not exist, retry without it
            if (error.message.includes('column "sort_order" of relation "projects" does not exist') || error.code === '42703') {
                console.warn("Column sort_order does not exist, retrying insert without it.");
                const retry = await supabase_1.supabase.from("projects").insert([insertPayload]).select().single();
                if (retry.error)
                    throw retry.error;
                return res.status(201).json({ message: "Project created successfully (without sort_order fallback)", project: retry.data });
            }
            throw error;
        }
        res.status(201).json({ message: "Project created successfully", project });
    }
    catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: "Error creating project", error: error.message });
    }
};
exports.createProject = createProject;
const updateProject = async (req, res) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { name, image_url, short_description, tech_stack, features, challenges_solved, live_url, github_url, project_type, start_date, end_date, sort_order } = req.body;
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
    const parsedSortOrder = typeof sort_order !== "undefined" ? parseInt(sort_order, 10) : 0;
    const updatePayload = {
        name: name.trim(),
        image_url: image_url ? image_url.trim() : null,
        short_description: short_description.trim(),
        tech_stack,
        features,
        challenges_solved: challenges_solved.trim(),
        live_url: live_url ? live_url.trim() : null,
        github_url: github_url ? github_url.trim() : null,
        project_type: project_type || 'Personal',
        start_date: start_date ? start_date.trim() : null,
        end_date: end_date ? end_date.trim() : null
    };
    try {
        const { data: project, error } = await supabase_1.supabase
            .from("projects")
            .update({ ...updatePayload, sort_order: isNaN(parsedSortOrder) ? 0 : parsedSortOrder })
            .eq("id", id)
            .select()
            .single();
        if (error) {
            if (error.message.includes('column "sort_order" of relation "projects" does not exist') || error.code === '42703') {
                console.warn("Column sort_order does not exist, retrying update without it.");
                const retry = await supabase_1.supabase.from("projects").update(updatePayload).eq("id", id).select().single();
                if (retry.error)
                    throw retry.error;
                return res.json({ message: "Project updated successfully (without sort_order fallback)", project: retry.data });
            }
            throw error;
        }
        res.json({ message: "Project updated successfully", project });
    }
    catch (error) {
        console.error("Error updating project:", error);
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
        const { data: related, error } = await supabase_1.supabase
            .from("projects")
            .select("*")
            .neq("id", id)
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
const uploadProjectImage = async (req, res) => {
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
        // Ensure uploads directory exists
        const uploadsDir = path_1.default.join(process.cwd(), "uploads");
        if (!fs_1.default.existsSync(uploadsDir)) {
            fs_1.default.mkdirSync(uploadsDir, { recursive: true });
        }
        // Save locally first (local storage fallback)
        const localFilePath = path_1.default.join(uploadsDir, uniqueFilename);
        fs_1.default.writeFileSync(localFilePath, fileBuffer);
        // Resolve protocol and host from request headers
        const protocol = req.headers["x-forwarded-proto"] || req.protocol;
        const host = req.headers["x-forwarded-host"] || req.get("host");
        const localUrl = `${protocol}://${host}/uploads/${uniqueFilename}`;
        try {
            // Attempt to upload to Supabase storage
            const { error } = await supabase_1.supabase.storage
                .from("portfolio")
                .upload(uniqueFilename, fileBuffer, {
                contentType: `image/${fileExtension}`,
                upsert: true
            });
            if (error) {
                console.warn("Supabase upload failed, falling back to local storage:", error.message);
                return res.json({ imageUrl: localUrl });
            }
            const { data: publicUrlData } = supabase_1.supabase.storage
                .from("portfolio")
                .getPublicUrl(uniqueFilename);
            if (!publicUrlData || !publicUrlData.publicUrl) {
                console.warn("Could not retrieve Supabase public URL, falling back to local storage.");
                return res.json({ imageUrl: localUrl });
            }
            return res.json({ imageUrl: publicUrlData.publicUrl });
        }
        catch (supabaseError) {
            console.warn("Supabase upload threw error, falling back to local storage:", supabaseError.message);
            return res.json({ imageUrl: localUrl });
        }
    }
    catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: "Error uploading image", error: error.message });
    }
};
exports.uploadProjectImage = uploadProjectImage;
const reorderProjects = async (req, res) => {
    const { orders } = req.body;
    if (!Array.isArray(orders)) {
        return res.status(400).json({ message: "Orders must be an array of { id, sort_order }" });
    }
    try {
        const promises = orders.map(item => supabase_1.supabase
            .from("projects")
            .update({ sort_order: item.sort_order })
            .eq("id", item.id));
        const results = await Promise.all(promises);
        const errors = results.filter(r => r.error).map(r => r.error);
        if (errors.length > 0) {
            console.error("Bulk reorder errors:", errors);
            return res.status(500).json({ message: "Failed to update some project orders", errors });
        }
        res.json({ message: "Projects reordered successfully" });
    }
    catch (error) {
        res.status(550).json({ message: "Error reordering projects", error: error.message });
    }
};
exports.reorderProjects = reorderProjects;
