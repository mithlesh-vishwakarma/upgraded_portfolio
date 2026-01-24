import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projects.routes";
import { supabase } from "./services/supabase";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("API running");
});
app.use("/api/projects", projectRoutes);

app.get("/test", async (_req, res) => {
  const { data, error } = await supabase.from("test").select("*");

  if (error) return res.status(500).json(error);
  res.json(data);
});

export default app;
