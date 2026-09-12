import { supabase } from "@/lib/supabase";
import type { BiositeData } from "@/lib/types";

export async function getBiositeBySlug(slug: string): Promise<BiositeData | null> {
  const { data, error } = await supabase
    .from("biosites")
    .select("data")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;

  return data.data as BiositeData;
}
