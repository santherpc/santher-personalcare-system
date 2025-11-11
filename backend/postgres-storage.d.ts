import { type ColetaGrupo1, type ColetaGrupo2, type InsertColetaGrupo1, type InsertColetaGrupo2 } from '@workspace/shared/schema';
import { IStorage } from './storage';
export declare class PostgreSQLStorage implements IStorage {
    getAccessCode(): Promise<string>;
    verifyAccessCode(code: string): Promise<boolean>;
    getColetasGrupo1(): Promise<ColetaGrupo1[]>;
    getColetasGrupo2(): Promise<ColetaGrupo2[]>;
    getColetaGrupo1(id: number): Promise<ColetaGrupo1 | undefined>;
    getColetaGrupo2(id: number): Promise<ColetaGrupo2 | undefined>;
    createColetaGrupo1(insertColeta: InsertColetaGrupo1): Promise<ColetaGrupo1 | null>;
    createColetaGrupo2(insertColeta: InsertColetaGrupo2): Promise<ColetaGrupo2 | null>;
    updateColetaGrupo1(id: number, updates: Partial<InsertColetaGrupo1>): Promise<ColetaGrupo1 | undefined>;
    updateColetaGrupo2(id: number, updates: Partial<InsertColetaGrupo2>): Promise<ColetaGrupo2 | undefined>;
    deleteColetaGrupo1(id: number): Promise<boolean>;
    deleteColetaGrupo2(id: number): Promise<boolean>;
}
