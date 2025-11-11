import { type SupabaseClient } from '@supabase/supabase-js';
export declare function getSupabase(): SupabaseClient;
export declare function checkSupabaseHealth(timeoutMs?: number): Promise<boolean>;
