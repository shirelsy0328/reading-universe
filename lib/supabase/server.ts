import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let serverClient: SupabaseClient | null = null;

function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error("缺少 NEXT_PUBLIC_SUPABASE_URL 环境变量。");
  }
  return url;
}

function getSupabaseKey(): string {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (serviceKey) {
    return serviceKey;
  }

  if (anonKey) {
    return anonKey;
  }

  throw new Error(
    "缺少 Supabase API Key。请设置 SUPABASE_SERVICE_ROLE_KEY 或 NEXT_PUBLIC_SUPABASE_ANON_KEY。"
  );
}

export function createSupabaseServerClient(): SupabaseClient {
  return createClient(getSupabaseUrl(), getSupabaseKey(), {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function getSupabaseServerClient(): SupabaseClient {
  if (!serverClient) {
    serverClient = createSupabaseServerClient();
  }
  return serverClient;
}
