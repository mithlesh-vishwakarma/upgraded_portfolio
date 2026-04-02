import { supabase } from "./src/config/supabase";
import bcrypt from "bcrypt";

async function updateAdminPassword() {
  const email = "admin@gmail.com";
  const newPassword = "M1thle$h";
  
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  const { data, error } = await supabase
    .from("admins")
    .update({ password: hashedPassword })
    .eq("email", email);
    
  if (error) {
    console.error("Error updating admin password:", error);
    return;
  }
  
  console.log(`Password for ${email} has been updated to ${newPassword}`);
}

updateAdminPassword();
