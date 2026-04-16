import { supabase } from "./src/config/supabase";

async function deepDiagnose() {
  console.log("Deep Diagnostic Started...");

  // Diagnose experience_tech
  console.log("\n--- experience_tech ---");
  const etNames = ["tech", "technology", "name", "tag"];
  for (const n of etNames) {
    const { error } = await supabase.from("experience_tech").select(n).limit(1);
    if (!error) console.log(`✅ FOUND in experience_tech: ${n}`);
  }

  // Diagnose education
  console.log("\n--- education ---");
  const eduNames = ["title", "degree", "program", "institution", "school", "university", "year", "date", "duration", "grade", "score", "cgpa"];
  for (const n of eduNames) {
    const { error } = await supabase.from("education").select(n).limit(1);
    if (!error) console.log(`✅ FOUND in education: ${n}`);
  }

  // Diagnose skills
  console.log("\n--- skills ---");
  const skillNames = ["name", "skill", "title", "category", "type", "group", "level", "proficiency", "percentage"];
  for (const n of skillNames) {
    const { error } = await supabase.from("skills").select(n).limit(1);
    if (!error) console.log(`✅ FOUND in skills: ${n}`);
  }

  process.exit();
}

deepDiagnose();
