import { supabase } from "./src/config/supabase";

async function findColumns() {
  const fields = [
    "id", "name", "image_url", "short_description", "tech_stack", 
    "features", "challenges_solved", "live_url", "github_url", 
    "project_type", "start_date", "end_date", "created_at"
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
