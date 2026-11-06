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
/**
 * Only idempotent, non-destructive migrations run automatically.
 *
 * `update_projects_schema.sql` is intentionally excluded: it DROPs and recreates
 * the projects table, which would wipe live portfolio data.
 */
const SAFE_MIGRATIONS = [
    "add_sort_order_to_projects.sql",
    "create_accounts_tables.sql",
];
async function runMigration() {
    if (!connectionString) {
        console.error("❌ Migration aborted: DATABASE_URL environment variable is not defined.");
        console.error("Please add DATABASE_URL to your server's .env file.");
        console.error("Example: DATABASE_URL=postgresql://postgres:[YOUR-DB-PASSWORD]@db.xsrmbplzipkzabvczqop.supabase.co:5432/postgres");
        process.exit(1);
    }
    // Allow an explicit override: `pnpm migrate -- create_accounts_tables.sql`
    const override = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));
    const files = override.length > 0 ? override : SAFE_MIGRATIONS;
    const client = new pg_1.Client({ connectionString });
    try {
        await client.connect();
        for (const file of files) {
            const sqlPath = path_1.default.join(__dirname, "../migrations", file);
            if (!fs_1.default.existsSync(sqlPath)) {
                console.error(`❌ Migration aborted: SQL file not found at ${sqlPath}`);
                await client.end();
                process.exit(1);
            }
            const sql = fs_1.default.readFileSync(sqlPath, "utf8");
            console.log(`🔄 Applying migration: ${file}`);
            await client.query(sql);
            console.log(`✅ Applied: ${file}`);
        }
        console.log("✅ Database migration completed successfully!");
    }
    catch (error) {
        console.error("❌ Database migration failed:", error.message);
        process.exitCode = 1;
    }
    finally {
        await client.end().catch(() => undefined);
    }
}
runMigration();
