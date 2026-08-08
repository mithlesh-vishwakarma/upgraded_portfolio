"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const projects_routes_1 = __importDefault(require("./routes/projects.routes"));
const supabase_1 = require("./services/supabase");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.send("API running");
});
app.use("/api/projects", projects_routes_1.default);
app.get("/test", async (_req, res) => {
    const { data, error } = await supabase_1.supabase.from("test").select("*");
    if (error)
        return res.status(500).json(error);
    res.json(data);
});
exports.default = app;
