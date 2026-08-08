import { supabase } from "./src/config/supabase";

async function getRealSchema() {
    const tables = ["experience", "experience_tech", "education", "skills", "projects"];
    
    for (const table of tables) {
        console.log(`\nTable: ${table}`);
        // Try to select a non-existent column to see if it lists others (not usually working in PostgREST)
        // Instead, try to insert a dummy row with just ID and see what happens? No.
        
        // Let's try to select * and see if we get anything
        const { data, error } = await supabase.from(table).select("*").limit(1);
        if (data && data.length > 0) {
            console.log(`Columns: ${Object.keys(data[0]).join(", ")}`);
        } else {
            console.log("Table is empty. Checking common columns...");
            // Manual test for a few more
            const tests = ["id", "created_at", "updated_at", "name", "title", "date"];
            const found = [];
            for (const t of tests) {
                const { error: te } = await supabase.from(table).select(t).limit(1);
                if (!te) found.push(t);
            }
            console.log(`Common columns found: ${found.join(", ")}`);
        }
    }
    process.exit();
}

getRealSchema();
