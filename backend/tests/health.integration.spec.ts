import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import express from 'express';
import session from 'express-session';
import request from 'supertest';
import dotenv from 'dotenv';
import path from 'path';

describe('Health and auth integration', () => {
  let app: express.Express;
  let server: any;

  beforeAll(async () => {
    // Load env before importing any module that requires DATABASE_URL
    dotenv.config({ path: path.resolve(import.meta.dirname, '..', '.env') });

    app = express();
    app.use(session({
      secret: process.env.SESSION_SECRET || 'test-secret',
      resave: false,
      saveUninitialized: false,
    }));
    app.use(express.json());
    const { registerRoutes } = await import('../routes');
    server = await registerRoutes(app);
  });

  afterAll(async () => {
    if (server && server.close) {
      await new Promise<void>(resolve => server.close(() => resolve()));
    }
  });

  it('GET /api/health returns db and supabase status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('db');
    expect(res.body).toHaveProperty('supabase');
    expect(res.body).toHaveProperty('ok');
  });
});
