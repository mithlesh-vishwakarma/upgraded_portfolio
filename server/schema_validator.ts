import { supabase } from "./src/config/supabase";

const SCHEMA = {
  experience: ["id", "role", "company", "description", "duration"],
  experience_tech: ["experience_id", "tech"],
  education: ["id", "title", "institution", "year", "description", "grade"],
  projects: ["id", "name", "image_url", "short_description", "tech_stack", "features", "challenges_solved", "live_url", "github_url", "project_type", "start_date", "end_date"]
  skills: ["id", "name", "category_id", "percentage"],
  extra_skills: ["id", "name"],
  skill_categories: ["id", "name"]
};

async function validateSchema() {
  console.log("🚀 Starting FINAL Database Schema Validation...\n");
  let allClear = true;

  for (const [table, columns] of Object.entries(SCHEMA)) {
    console.log(`Checking table: ${table}...`);
    const missing = [];
    
    // Check if table exists
    const { error: tableError } = await supabase.from(table).select("id").limit(1);
    if (tableError) {
        console.log(`❌ Table '${table}' might be MISSING or inaccessible: ${tableError.message}`);
        allClear = false;
        console.log("");
        continue;
    }

    for (const column of columns) {
      const { error } = await supabase.from(table).select(column).limit(1);
      if (error) {
        missing.push(`${column} (${error.message})`);
      }
    }

    if (missing.length > 0) {
      console.log(`❌ Table '${table}' has MISSING COLUMNS:`);
      missing.forEach(m => console.log(`   - ${m}`));
      allClear = false;
    } else {
      console.log(`✅ Table '${table}' schema is correct.`);
    }
    console.log("");
  }

  if (allClear) {
    console.log("✨ ALL TABLES VALIDATED SUCCESSFULLY!");
    console.log("Your portfolio database is now fully aligned with the application code.");
  } else {
    console.log("⚠️  SCHEMA MISMATCH DETECTED. Please check the errors above.");
  }
  
  process.exit(allClear ? 0 : 1);
}

validateSchema();
