"use strict";
// import { createClient } from "@supabase/supabase-js";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
// const supabaseUrl = process.env.SUPABASE_URL as string;
// const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
// export const supabase = createClient(supabaseUrl, serviceRoleKey);
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase environment variables");
}
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, serviceRoleKey);
