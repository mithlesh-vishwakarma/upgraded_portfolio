import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY/SUPABASE_ANON_KEY");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
