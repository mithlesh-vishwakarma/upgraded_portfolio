"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Import routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const experienceRoutes_1 = __importDefault(require("./routes/experienceRoutes"));
const educationRoutes_1 = __importDefault(require("./routes/educationRoutes"));
const skillRoutes_1 = __importDefault(require("./routes/skillRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// API Routes
app.use("/api/admin", authRoutes_1.default);
app.use("/api/projects", projectRoutes_1.default);
app.use("/api/experience", experienceRoutes_1.default);
app.use("/api/education", educationRoutes_1.default);
app.use("/api/skills", skillRoutes_1.default);
app.get("/", (_req, res) => {
    res.send("Portfolio API running");
});
exports.default = app;
