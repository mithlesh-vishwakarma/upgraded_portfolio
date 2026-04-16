import { supabase } from "./src/config/supabase";

async function findColumns() {
  const fields = [
    "id", "title", "category", "description", "technologies", "liveUrl", 
    "githubUrl", "image", "projectType", "status", "problem", "solution", 
    "techStackDescription", "result", "date", "assignedDate", "location", 
    "client", "featured", "created_at"
  ];

  console.log("Testing columns in 'projects' table...");
  const existing = [];
  const missing = [];

  for (const field of fields) {
    const { error } = await supabase.from("projects").select(field).limit(1);
    if (error) {
      missing.push(field);
    } else {
      existing.push(field);
    }
  }

  console.log("EXISTING COLUMNS:", existing.join(", "));
  console.log("MISSING COLUMNS:", missing.join(", "));
  process.exit();
}

findColumns();
