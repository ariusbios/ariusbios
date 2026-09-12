import { createClient } from "@supabase/supabase-js";

// Bypassa RLS — usar só em código server-side depois de checar a sessão do produtor.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } },
);
