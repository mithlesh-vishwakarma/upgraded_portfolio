import { supabase } from "./src/config/supabase";

async function diagnoseExperience() {
  console.log("Fetching schema for 'experience' table...");
  const { data, error } = await supabase.from("experience").select("*").limit(1);
  
  if (error) {
    console.error("Fetch Error:", error.message);
    // If we can't select *, maybe the table doesn't exist or we have a permission issue?
    // Let's try to select 'id' specifically
    const { error: idError } = await supabase.from("experience").select("id").limit(1);
    if (idError) {
        console.error("Critical Error: Table 'experience' might not exist or is inaccessible.", idError.message);
    } else {
        console.log("Table 'experience' exists. Column check failed on '*'.");
    }
  } else if (data && data.length > 0) {
    console.log("Available columns in 'experience' table:", Object.keys(data[0]));
  } else {
    console.log("Table 'experience' is empty. Testing column existence manually...");
    const testColumns = ["duration", "time_period", "period", "date", "dates", "years"];
    for (const col of testColumns) {
      const { error: testError } = await supabase.from("experience").select(col).limit(1);
      if (testError) {
        console.log(`❌ Column '${col}' is MISSING.`);
      } else {
        console.log(`✅ Column '${col}' EXISTS.`);
      }
    }
  }
  process.exit();
}

diagnoseExperience();
