import { supabase } from "./src/config/supabase";

async function checkExperienceColumns() {
  const fields = ["id", "role", "company", "description", "duration", "created_at"];
  console.log("Checking 'experience' table columns...");
  
  for (const field of fields) {
    const { error } = await supabase.from("experience").select(field).limit(1);
    if (error) {
      console.log(`❌ Column '${field}' ERROR:`, error.message);
    } else {
      console.log(`✅ Column '${field}' exists.`);
    }
  }
  process.exit();
}

checkExperienceColumns();
