"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    console.error("❌ Migration aborted: DATABASE_URL environment variable is not defined.");
    console.error("Please add DATABASE_URL to your server's .env file.");
    console.error("Example: DATABASE_URL=postgresql://postgres:[YOUR-DB-PASSWORD]@db.xsrmbplzipkzabvczqop.supabase.co:5432/postgres");
    process.exit(1);
}
async function runMigration() {
    const sqlPath = path_1.default.join(__dirname, "../migrations/add_sort_order_to_projects.sql");
    if (!fs_1.default.existsSync(sqlPath)) {
        console.error(`❌ Migration aborted: SQL file not found at ${sqlPath}`);
        process.exit(1);
    }
    const sql = fs_1.default.readFileSync(sqlPath, "utf8");
    const client = new pg_1.Client({ connectionString });
    try {
        console.log("🔄 Connecting to PostgreSQL database...");
        await client.connect();
        console.log("⚡ Executing migration SQL query...");
        await client.query(sql);
        console.log("✅ Database migration completed successfully!");
    }
    catch (error) {
        console.error("❌ Database migration failed:", error.message);
    }
    finally {
        await client.end();
    }
}
runMigration();
