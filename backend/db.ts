import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@workspace/shared/schema';

const connectionString = process.env.DATABASE_URL || 
  `postgresql://postgres:${process.env.DB_PASSWORD || ''}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '5432'}/${process.env.DB_NAME || 'postgres'}`;

const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
