import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '@shared/schema';

const connectionString = process.env.DATABASE_URL || 
  `mysql://${process.env.DB_USER || 'root'}:${process.env.DB_PASSWORD || ''}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '3306'}/${process.env.DB_NAME || 'ufhpc_producao'}`;

const poolConnection = mysql.createPool(connectionString);

export const db = drizzle(poolConnection, { schema, mode: 'default' });
