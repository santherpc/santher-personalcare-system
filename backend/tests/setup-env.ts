import dotenv from 'dotenv';
import path from 'path';

// Load env from repo root
dotenv.config({ path: path.resolve(import.meta.dirname, '../../', '.env') });

// Ensure required env vars exist for tests
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required for integration tests');
}
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for integration tests');
}