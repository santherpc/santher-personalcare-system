import fs from 'fs';
import path from 'path';
import { describe, it, expect } from 'vitest';
import dotenv from 'dotenv';
const repoRoot = path.resolve(__dirname, '..', '..');
dotenv.config({ path: path.resolve(repoRoot, '.env') });
describe('Security checks - no hardcoded credentials', () => {
    const filesToScan = [
        path.join(repoRoot, 'backend', 'postgres-storage.ts'),
        path.join(repoRoot, 'backend', 'storage.ts'),
        path.join(repoRoot, 'backend', 'db.ts'),
        path.join(repoRoot, 'create-tables.sql'),
        path.join(repoRoot, 'supabase-init.sql'),
    ];
    const forbiddenPatterns = [
        /UFHPC@2025/,
        /1234/, // previous seed
        /service_rolesecret/i,
        /anonpublic/i,
        /postgres:\/\/[A-Za-z0-9]+:[^@]+@/ // raw password in connection string
    ];
    for (const file of filesToScan) {
        it(`does not contain hardcoded secrets in ${path.basename(file)}`, () => {
            const content = fs.readFileSync(file, 'utf-8');
            for (const pattern of forbiddenPatterns) {
                expect(pattern.test(content)).toBe(false);
            }
        });
    }
});
describe('Environment configuration', () => {
    it('requires DATABASE_URL to be set', () => {
        // Simulate process env
        const hasEnv = !!process.env.DATABASE_URL;
        expect(hasEnv).toBe(true);
    });
});
