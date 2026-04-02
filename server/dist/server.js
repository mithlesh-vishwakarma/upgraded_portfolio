"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // MUST be first because it should be in before any other imports, so that process.env is populated
const app_js_1 = __importDefault(require("./app.js"));
const PORT = process.env.PORT || 5000;
app_js_1.default.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
});
