import { supabase } from "./src/config/supabase";

async function checkExperienceSchema() {
  console.log("Checking detailed schema for 'experience' table...");
  const { data, error } = await supabase.from("experience").select("*").limit(1);
  
  if (data && data.length > 0) {
    console.log("All columns in 'experience' table:", Object.keys(data[0]));
  } else {
    console.log("Table is empty. Testing for common variations...");
    const tests = ["role", "company", "description", "duration", "company_name", "job_title"];
    for (const test of tests) {
        const { error: e } = await supabase.from("experience").select(test).limit(1);
        if (!e) {
            console.log(`✅ Column '${test}' EXISTS.`);
        }
    }
  }
  process.exit();
}

checkExperienceSchema();
