import { supabase } from "./src/config/supabase";

async function checkSkillsDetailed() {
  console.log("Checking detailed schema for 'skills' and 'extra_skills'...");
  
  const tables = ["skills", "extra_skills"];
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select("*").limit(1);
    if (data && data.length > 0) {
        console.log(`\nTable '${table}' columns:`, Object.keys(data[0]));
    } else {
        console.log(`\nTable '${table}' is empty. Testing manual columns...`);
        const tests = ["name", "skill_name", "category_id", "percentage", "level"];
        for (const t of tests) {
            const { error: te } = await supabase.from(table).select(t).limit(1);
            if (!te) console.log(`✅ Table '${table}' has: ${t}`);
        }
    }
  }
  process.exit();
}

checkSkillsDetailed();
