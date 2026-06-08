import { supabase } from "./src/config/supabase";

async function findColumns() {
  const table = "experience";
  const fields = ["duration", "year", "time_period", "dates", "period", "id", "role", "company", "description"];

  console.log(`Testing columns in '${table}' table...`);
  const existing = [];
  const missing = [];

  for (const field of fields) {
    try {
        const { error } = await supabase.from(table).select(field).limit(1);
        if (error) {
            missing.push(`${field} (${error.message})`);
        } else {
            existing.push(field);
        }
    } catch (e: any) {
        missing.push(`${field} (Exception: ${e.message})`);
    }
  }

  console.log("EXISTING COLUMNS:", existing.join(", "));
  console.log("MISSING COLUMNS:", missing.join(", "));
  process.exit();
}

findColumns();
