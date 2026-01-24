// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.SUPABASE_URL as string;
// const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

// export const supabase = createClient(supabaseUrl, serviceRoleKey);

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, serviceRoleKey);
