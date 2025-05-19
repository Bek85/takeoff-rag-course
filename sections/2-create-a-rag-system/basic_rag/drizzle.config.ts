import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: "./sections/2-create-a-rag-system/basic_rag/.env.local" });

console.log(process.env.DATABASE_URL);

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  schema: "./db/schema",
  out: "./db/migrations",
});
