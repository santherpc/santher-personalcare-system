import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@workspace/shared/schema';
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('DATABASE_URL is required to connect to Supabase Postgres');
}
// Supabase Postgres requires SSL; configure timeouts and max connection retries
const client = postgres(connectionString, {
    prepare: false,
    ssl: 'require',
    max: 5,
    idle_timeout: 5,
    connect_timeout: 10,
});
export const db = drizzle(client, { schema });
