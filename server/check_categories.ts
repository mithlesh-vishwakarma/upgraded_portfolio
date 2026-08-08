import { supabase } from "./src/config/supabase";

async function checkCategories() {
  const { data, error } = await supabase.from("skill_categories").select("*");
  if (error) {
    console.error("Error fetching categories:", error.message);
  } else {
    console.log("Current Categories:", data);
  }
  process.exit();
}

checkCategories();
