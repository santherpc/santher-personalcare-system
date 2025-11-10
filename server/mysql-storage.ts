import { eq, and } from 'drizzle-orm';
import { db } from './db';
import { 
  authConfig,
  coletaGrupo1, 
  coletaGrupo2,
  type ColetaGrupo1, 
  type ColetaGrupo2, 
  type InsertColetaGrupo1, 
  type InsertColetaGrupo2,
  type AuthConfig 
} from '@shared/schema';
import { IStorage } from './storage';

export class MySQLStorage implements IStorage {
  async getAccessCode(): Promise<string> {
    const config = await db.select().from(authConfig).limit(1);
    if (config.length === 0) {
      await db.insert(authConfig).values({ id: 1, accessCode: 'UFHPC@2025' });
      return 'UFHPC@2025';
    }
    return config[0].accessCode;
  }

  async verifyAccessCode(code: string): Promise<boolean> {
    const storedCode = await this.getAccessCode();
    return code === storedCode;
  }

  async getColetasGrupo1(): Promise<ColetaGrupo1[]> {
    const results = await db.select().from(coletaGrupo1);
    return results.sort((a, b) => {
      const dateCompare = new Date(b.dataColeta).getTime() - new Date(a.dataColeta).getTime();
      if (dateCompare !== 0) return dateCompare;
      return (b.id || 0) - (a.id || 0);
    });
  }

  async getColetasGrupo2(): Promise<ColetaGrupo2[]> {
    const results = await db.select().from(coletaGrupo2);
    return results.sort((a, b) => {
      const dateCompare = new Date(b.dataColeta).getTime() - new Date(a.dataColeta).getTime();
      if (dateCompare !== 0) return dateCompare;
      return (b.id || 0) - (a.id || 0);
    });
  }

  async getColetaGrupo1(id: number): Promise<ColetaGrupo1 | undefined> {
    const results = await db.select().from(coletaGrupo1).where(eq(coletaGrupo1.id, id)).limit(1);
    return results[0];
  }

  async getColetaGrupo2(id: number): Promise<ColetaGrupo2 | undefined> {
    const results = await db.select().from(coletaGrupo2).where(eq(coletaGrupo2.id, id)).limit(1);
    return results[0];
  }

  async createColetaGrupo1(insertColeta: InsertColetaGrupo1): Promise<ColetaGrupo1 | null> {
    try {
      const existing = await db.select().from(coletaGrupo1)
        .where(
          and(
            eq(coletaGrupo1.dataColeta, insertColeta.dataColeta),
            eq(coletaGrupo1.linhaProducao, insertColeta.linhaProducao)
          )
        )
        .limit(1);

      if (existing.length > 0) {
        return null;
      }

      const result = await db.insert(coletaGrupo1).values(insertColeta);
      const insertId = Number(result[0].insertId);
      return await this.getColetaGrupo1(insertId) || null;
    } catch (error) {
      console.error('Error creating coleta grupo 1:', error);
      return null;
    }
  }

  async createColetaGrupo2(insertColeta: InsertColetaGrupo2): Promise<ColetaGrupo2 | null> {
    try {
      const existing = await db.select().from(coletaGrupo2)
        .where(
          and(
            eq(coletaGrupo2.dataColeta, insertColeta.dataColeta),
            eq(coletaGrupo2.linhaProducao, insertColeta.linhaProducao)
          )
        )
        .limit(1);

      if (existing.length > 0) {
        return null;
      }

      const result = await db.insert(coletaGrupo2).values(insertColeta);
      const insertId = Number(result[0].insertId);
      return await this.getColetaGrupo2(insertId) || null;
    } catch (error) {
      console.error('Error creating coleta grupo 2:', error);
      return null;
    }
  }

  async updateColetaGrupo1(id: number, updates: Partial<InsertColetaGrupo1>): Promise<ColetaGrupo1 | undefined> {
    try {
      await db.update(coletaGrupo1)
        .set(updates)
        .where(eq(coletaGrupo1.id, id));
      return await this.getColetaGrupo1(id);
    } catch (error) {
      console.error('Error updating coleta grupo 1:', error);
      return undefined;
    }
  }

  async updateColetaGrupo2(id: number, updates: Partial<InsertColetaGrupo2>): Promise<ColetaGrupo2 | undefined> {
    try {
      await db.update(coletaGrupo2)
        .set(updates)
        .where(eq(coletaGrupo2.id, id));
      return await this.getColetaGrupo2(id);
    } catch (error) {
      console.error('Error updating coleta grupo 2:', error);
      return undefined;
    }
  }

  async deleteColetaGrupo1(id: number): Promise<boolean> {
    try {
      await db.delete(coletaGrupo1).where(eq(coletaGrupo1.id, id));
      return true;
    } catch (error) {
      console.error('Error deleting coleta grupo 1:', error);
      return false;
    }
  }

  async deleteColetaGrupo2(id: number): Promise<boolean> {
    try {
      await db.delete(coletaGrupo2).where(eq(coletaGrupo2.id, id));
      return true;
    } catch (error) {
      console.error('Error deleting coleta grupo 2:', error);
      return false;
    }
  }
}
