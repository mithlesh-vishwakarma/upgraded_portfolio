import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// Import routes
import authRoutes from "./routes/authRoutes";
import projectRoutes from "./routes/projectRoutes";
import experienceRoutes from "./routes/experienceRoutes";
import educationRoutes from "./routes/educationRoutes";
import skillRoutes from "./routes/skillRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// API Routes
app.use("/admin", authRoutes);
app.use("/api/admin", authRoutes);

app.use("/projects", projectRoutes);
app.use("/api/projects", projectRoutes);

app.use("/experience", experienceRoutes);
app.use("/api/experience", experienceRoutes);

app.use("/education", educationRoutes);
app.use("/api/education", educationRoutes);

app.use("/skills", skillRoutes);
app.use("/api/skills", skillRoutes);

app.get("/", (_req, res) => {
  res.send("Portfolio API running");
});

export default app;
