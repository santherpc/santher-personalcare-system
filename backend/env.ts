import dotenv from 'dotenv';
import path from 'path';

// Load .env from repo root (one level above backend)
dotenv.config({ path: path.resolve(import.meta.dirname, '..', '.env') });