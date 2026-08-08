import { supabase } from "./src/config/supabase";

async function checkAdmins() {
  const { data, error } = await supabase
    .from("admins")
    .select("email");
    
  if (error) {
    console.error("Error fetching admins:", error);
    return;
  }
  
  console.log("Current admins:", data);
}

checkAdmins();
