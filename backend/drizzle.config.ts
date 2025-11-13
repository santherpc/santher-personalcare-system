import { defineConfig } from "drizzle-kit";
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
// Load .env from repo root when running from backend directory (CJS)
const candidates = [
  path.resolve(process.cwd(), '..', '.env'),
  path.resolve(process.cwd(), '.env'),
];
for (const p of candidates) {
  if (fs.existsSync(p)) {
    dotenv.config({ path: p, override: true });
    break;
  }
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required for database migrations. Set it in your .env file.");
}

export default defineConfig({
  out: "../migrations",
  schema: "../shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
