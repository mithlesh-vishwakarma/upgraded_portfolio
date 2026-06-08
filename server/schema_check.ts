import { supabase } from "./src/config/supabase";

async function checkSchema() {
  const { data, error } = await supabase.from("projects").select("*").limit(1);
  if (error) {
    console.error("Schema Check Error:", error);
    return;
  }
  if (data && data.length > 0) {
    console.log("Current Project Columns:", Object.keys(data[0]));
  } else {
    console.log("No projects found to inspect columns.");
  }
  process.exit();
}

checkSchema();
