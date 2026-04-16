import { supabase } from "./src/config/supabase";

async function diagnose() {
  console.log("Checking columns for 'projects' table...");
  // Try to fetch any existing project to see available keys
  const { data: projects, error: pError } = await supabase.from("projects").select("*").limit(1);
  
  if (pError) {
    console.error("Fetch Error:", pError.message);
  } else if (projects && projects.length > 0) {
    console.log("Available columns in 'projects' table:", Object.keys(projects[0]));
  } else {
    console.log("Table 'projects' is empty. Trying to guess schema...");
    // Try to select specific common columns to see which ones fail
    const testColumns = ["assignedDate", "assigned_date", "projectType", "project_type", "techStackDescription", "tech_stack_description"];
    for (const col of testColumns) {
      const { error } = await supabase.from("projects").select(col).limit(1);
      if (error) {
        console.log(`Column '${col}' is MISSING: ${error.message}`);
      } else {
        console.log(`Column '${col}' EXISTS.`);
      }
    }
  }
  process.exit();
}

diagnose();
