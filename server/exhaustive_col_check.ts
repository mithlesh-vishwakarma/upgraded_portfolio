import { supabase } from "./src/config/supabase";

async function getColumnsFromInfoSchema() {
  const { data, error } = await supabase
    .from("experience")
    .select("id")
    .limit(1);

  console.log("Checking schema via select * from information_schema.columns...");
  
  // PostgREST doesn't usually allow direct access to information_schema unless exposed
  // But let's try a clever select that might fail and give us clues, 
  // or just try common names again.
  
  const commonNames = ["duration", "year", "time_period", "dates", "period", "range", "time", "work_period", "interval"];
  for (const name of commonNames) {
    const { error: e } = await supabase.from("experience").select(name).limit(1);
    if (!e) {
        console.log(`✅ FOUND COLUMN: ${name}`);
    }
  }
  
  process.exit();
}

getColumnsFromInfoSchema();
