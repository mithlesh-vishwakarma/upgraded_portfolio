import { supabase } from "./src/config/supabase";

async function checkExtraSkillsFinal() {
  console.log("Checking detailed schema for 'extra_skills' table...");
  const { data, error } = await supabase.from("extra_skills").select("*").limit(1);
  
  if (data && data.length > 0) {
    console.log("Columns in 'extra_skills':", Object.keys(data[0]));
    console.log("Sample record:", data[0]);
  } else {
    console.log("Table is empty. Testing for title, level, icon, description...");
    const tests = ["id", "name", "title", "level", "icon", "description"];
    for (const test of tests) {
        const { error: e } = await supabase.from("extra_skills").select(test).limit(1);
        console.log(`Column '${test}':`, e ? `❌ MISSING (${e.message})` : "✅ EXISTS");
    }
  }
  process.exit();
}

checkExtraSkillsFinal();
