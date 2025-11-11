import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (cachedClient) return cachedClient;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for Supabase integration');
  }
  cachedClient = createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  return cachedClient;
}

export async function checkSupabaseHealth(timeoutMs = 5000): Promise<boolean> {
  const timeout = new Promise<boolean>((resolve) => {
    const t = setTimeout(() => {
      resolve(false);
    }, timeoutMs);
    // prevent unhandled rejections
    (timeout as any).cancel = () => clearTimeout(t);
  });

  const probe = (async () => {
    const { error } = await getSupabase()
      .from('auth_config')
      .select('*')
      .limit(1);
    if (error) return false;
    return true;
  })();

  const result = await Promise.race([timeout, probe]);
  return result;
}