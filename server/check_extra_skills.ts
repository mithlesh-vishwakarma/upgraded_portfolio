import { supabase } from "./src/config/supabase";

async function checkExtraSkills() {
  const { data, error } = await supabase.from("extra_skills").select("*").limit(1);
  if (data && data.length > 0) {
    console.log("extra_skills columns:", Object.keys(data[0]));
  } else {
    const tests = ["name", "skill_name"];
    for (const t of tests) {
      const { error: te } = await supabase.from("extra_skills").select(t).limit(1);
      console.log(`extra_skills has ${t}:`, !te);
    }
  }
  process.exit();
}

checkExtraSkills();
