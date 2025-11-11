import { PostgreSQLStorage } from './postgres-storage';
// Always require database-backed storage in production and development for security
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required. Configure Supabase Postgres connection string in .env');
}
export const storage = new PostgreSQLStorage();
