import { supabase } from "./src/config/supabase";

async function showAllColumns() {
  const { data, error } = await supabase.from("experience").select("*").limit(1);
  if (error) {
    console.error("Fetch Error:", error.message);
  } else if (data && data.length > 0) {
    console.log("All columns in 'experience' table:", Object.keys(data[0]));
    console.log("Record sample:", data[0]);
  } else {
    console.log("Table 'experience' is empty.");
  }
  process.exit();
}

showAllColumns();
