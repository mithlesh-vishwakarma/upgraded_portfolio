import dotenv from "dotenv";
dotenv.config(); // MUST be first because it should be in before any other imports, so that process.env is populated

import app from "./src/app.ts";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
});
