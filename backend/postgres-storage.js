import { eq, and } from 'drizzle-orm';
import { db } from './db';
import { authConfig, coletaGrupo1, coletaGrupo2 } from '@workspace/shared/schema';
import { getSupabase } from './supabase';
export class PostgreSQLStorage {
    async getAccessCode() {
        const config = await db.select().from(authConfig).limit(1);
        if (config.length === 0 || !config[0]?.accessCode) {
            throw new Error('Access code not configured in database');
        }
        return config[0].accessCode;
    }
    async verifyAccessCode(code) {
        // Consultar via Supabase PostgREST para garantir consistência com políticas RLS
        const { data, error } = await getSupabase()
            .from('auth_config')
            .select('access_code')
            .limit(1)
            .maybeSingle();
        if (error) {
            console.error('Supabase verification error:', error.message);
            return false;
        }
        const storedCode = data?.access_code;
        if (!storedCode)
            return false;
        // Ignorar espaços acidentais na comparação
        return code.trim() === String(storedCode).trim();
    }
    async getColetasGrupo1() {
        const results = await db.select().from(coletaGrupo1);
        return results.sort((a, b) => {
            const dateCompare = new Date(b.dataColeta).getTime() - new Date(a.dataColeta).getTime();
            if (dateCompare !== 0)
                return dateCompare;
            return (b.id || 0) - (a.id || 0);
        });
    }
    async getColetasGrupo2() {
        const results = await db.select().from(coletaGrupo2);
        return results.sort((a, b) => {
            const dateCompare = new Date(b.dataColeta).getTime() - new Date(a.dataColeta).getTime();
            if (dateCompare !== 0)
                return dateCompare;
            return (b.id || 0) - (a.id || 0);
        });
    }
    async getColetaGrupo1(id) {
        const results = await db.select().from(coletaGrupo1).where(eq(coletaGrupo1.id, id)).limit(1);
        return results[0];
    }
    async getColetaGrupo2(id) {
        const results = await db.select().from(coletaGrupo2).where(eq(coletaGrupo2.id, id)).limit(1);
        return results[0];
    }
    async createColetaGrupo1(insertColeta) {
        try {
            const existing = await db.select().from(coletaGrupo1)
                .where(and(eq(coletaGrupo1.dataColeta, insertColeta.dataColeta), eq(coletaGrupo1.linhaProducao, insertColeta.linhaProducao)))
                .limit(1);
            if (existing.length > 0) {
                return null;
            }
            const result = await db.insert(coletaGrupo1)
                .values(insertColeta)
                .returning();
            return result[0] || null;
        }
        catch (error) {
            console.error('Error creating coleta grupo 1:', error);
            return null;
        }
    }
    async createColetaGrupo2(insertColeta) {
        try {
            const existing = await db.select().from(coletaGrupo2)
                .where(and(eq(coletaGrupo2.dataColeta, insertColeta.dataColeta), eq(coletaGrupo2.linhaProducao, insertColeta.linhaProducao)))
                .limit(1);
            if (existing.length > 0) {
                return null;
            }
            const result = await db.insert(coletaGrupo2)
                .values(insertColeta)
                .returning();
            return result[0] || null;
        }
        catch (error) {
            console.error('Error creating coleta grupo 2:', error);
            return null;
        }
    }
    async updateColetaGrupo1(id, updates) {
        try {
            await db.update(coletaGrupo1)
                .set(updates)
                .where(eq(coletaGrupo1.id, id));
            return await this.getColetaGrupo1(id);
        }
        catch (error) {
            console.error('Error updating coleta grupo 1:', error);
            return undefined;
        }
    }
    async updateColetaGrupo2(id, updates) {
        try {
            await db.update(coletaGrupo2)
                .set(updates)
                .where(eq(coletaGrupo2.id, id));
            return await this.getColetaGrupo2(id);
        }
        catch (error) {
            console.error('Error updating coleta grupo 2:', error);
            return undefined;
        }
    }
    async deleteColetaGrupo1(id) {
        try {
            await db.delete(coletaGrupo1).where(eq(coletaGrupo1.id, id));
            return true;
        }
        catch (error) {
            console.error('Error deleting coleta grupo 1:', error);
            return false;
        }
    }
    async deleteColetaGrupo2(id) {
        try {
            await db.delete(coletaGrupo2).where(eq(coletaGrupo2.id, id));
            return true;
        }
        catch (error) {
            console.error('Error deleting coleta grupo 2:', error);
            return false;
        }
    }
}
