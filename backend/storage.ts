import { 
  type ColetaGrupo1, 
  type ColetaGrupo2, 
  type InsertColetaGrupo1, 
  type InsertColetaGrupo2,
} from "@workspace/shared/schema";

export interface IStorage {
  getAccessCode(): Promise<string>;
  verifyAccessCode(code: string): Promise<boolean>;
  getColetasGrupo1(): Promise<ColetaGrupo1[]>;
  getColetasGrupo2(): Promise<ColetaGrupo2[]>;
  getColetaGrupo1(id: number): Promise<ColetaGrupo1 | undefined>;
  getColetaGrupo2(id: number): Promise<ColetaGrupo2 | undefined>;
  createColetaGrupo1(coleta: InsertColetaGrupo1): Promise<ColetaGrupo1 | null>;
  createColetaGrupo2(coleta: InsertColetaGrupo2): Promise<ColetaGrupo2 | null>;
  updateColetaGrupo1(id: number, coleta: Partial<InsertColetaGrupo1>): Promise<ColetaGrupo1 | undefined>;
  updateColetaGrupo2(id: number, coleta: Partial<InsertColetaGrupo2>): Promise<ColetaGrupo2 | undefined>;
  deleteColetaGrupo1(id: number): Promise<boolean>;
  deleteColetaGrupo2(id: number): Promise<boolean>;
}

import { PostgreSQLStorage } from './postgres-storage';

// Always require database-backed storage in production and development for security
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required. Configure Supabase Postgres connection string in .env');
}

export const storage: IStorage = new PostgreSQLStorage();
