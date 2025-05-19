import { config } from "dotenv";
import { factsTable } from "./schema/facts-schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL!;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

const dbSchema = {
  facts: factsTable,
};

function initDb(url: string) {
  const client = postgres(url, { prepare: false });
  return drizzle(client, { schema: dbSchema });
}

export const db = initDb(databaseUrl);
