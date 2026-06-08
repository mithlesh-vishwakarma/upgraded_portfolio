import { Client } from "pg";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ Migration aborted: DATABASE_URL environment variable is not defined.");
  console.error("Please add DATABASE_URL to your server's .env file.");
  console.error("Example: DATABASE_URL=postgresql://postgres:[YOUR-DB-PASSWORD]@db.xsrmbplzipkzabvczqop.supabase.co:5432/postgres");
  process.exit(1);
}

async function runMigration() {
  const sqlPath = path.join(__dirname, "../migrations/add_sort_order_to_projects.sql");
  if (!fs.existsSync(sqlPath)) {
    console.error(`❌ Migration aborted: SQL file not found at ${sqlPath}`);
    process.exit(1);
  }

  const sql = fs.readFileSync(sqlPath, "utf8");
  const client = new Client({ connectionString });

  try {
    console.log("🔄 Connecting to PostgreSQL database...");
    await client.connect();
    console.log("⚡ Executing migration SQL query...");
    await client.query(sql);
    console.log("✅ Database migration completed successfully!");
  } catch (error: any) {
    console.error("❌ Database migration failed:", error.message);
  } finally {
    await client.end();
  }
}

runMigration();
