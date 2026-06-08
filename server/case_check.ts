import { supabase } from "./src/config/supabase";

async function checkCaseSensitivity() {
  const table = "experience";
  const names = ["duration", "Duration", "DURATION", "period", "Period", "PERIOD"];

  for (const name of names) {
    const { error } = await supabase.from(table).select(name).limit(1);
    if (!error) {
        console.log(`✅ FOUND: ${name}`);
        process.exit();
    }
  }
  console.log("None of the variations found.");
  process.exit();
}

checkCaseSensitivity();
