import { supabase } from "./src/config/supabase";

async function checkEducationSchema() {
  console.log("Checking detailed schema for 'education' table...");
  const { data, error } = await supabase.from("education").select("*").limit(1);
  
  if (data && data.length > 0) {
    console.log("All columns in 'education' table:", Object.keys(data[0]));
    console.log("Sample record:", data[0]);
  } else {
    console.log("Table is empty. Testing for institution vs institution_name...");
    const tests = ["institution", "institution_name", "title", "degree", "year", "grade", "cgpa"];
    for (const test of tests) {
        const { error: e } = await supabase.from("education").select(test).limit(1);
        if (e) {
            console.log(`❌ Column '${test}' MISSING: ${e.message}`);
        } else {
            console.log(`✅ Column '${test}' EXISTS.`);
        }
    }
  }
  process.exit();
}

checkEducationSchema();
