import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function storeLead(email: string, details: any) {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase not configured. Lead not stored.');
    return null;
  }

  const { data, error } = await supabase
    .from('leads')
    .insert([{ email, ...details }])
    .select();

  if (error) throw error;
  return data;
}

export async function storeAudit(result: any) {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase not configured. Audit not stored.');
    return { id: Math.random().toString(36).substring(7) };
  }

  const { data, error } = await supabase
    .from('audits')
    .insert([result])
    .select();

  if (error) throw error;
  return data[0];
}
