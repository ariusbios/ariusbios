"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { buildBiositeTemplate } from "@/lib/biosite-template";
import type { BiositeData } from "@/lib/types";

async function requireUser() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
}

export async function signOut() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createBiosite(formData: FormData) {
  await requireUser();

  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugify(slugInput || name);
  const whatsappNumber = String(formData.get("whatsappNumber") ?? "").replace(/\D/g, "");
  const accentColor = String(formData.get("accentColor") ?? "#EA580C");
  const backgroundColor = String(formData.get("backgroundColor") ?? "#0F1115");
  const avatarUrl = String(formData.get("avatarUrl") ?? "").trim();
  const verified = formData.get("verified") === "on";

  if (!name || !slug || !whatsappNumber) {
    throw new Error("Nome, slug e WhatsApp são obrigatórios.");
  }

  const data = buildBiositeTemplate({
    slug,
    name,
    whatsappNumber,
    accentColor,
    backgroundColor,
    avatarUrl,
    verified,
  });

  const { error } = await supabaseAdmin.from("biosites").insert({ slug, data });

  if (error) {
    if (error.code === "23505") {
      throw new Error(`Já existe um biosite com o slug "${slug}".`);
    }
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath(`/${slug}`);
  redirect(`/admin/${slug}`);
}

export async function updateBiosite(currentSlug: string, formData: FormData) {
  await requireUser();

  const { data: row, error: fetchError } = await supabaseAdmin
    .from("biosites")
    .select("data")
    .eq("slug", currentSlug)
    .maybeSingle();

  if (fetchError || !row) throw new Error("Biosite não encontrado.");

  const current = row.data as BiositeData;

  const newSlug = slugify(String(formData.get("slug") ?? currentSlug));
  const whatsappNumber = String(formData.get("whatsappNumber") ?? current.whatsappNumber).replace(
    /\D/g,
    "",
  );

  const updated: BiositeData = {
    ...current,
    slug: newSlug,
    name: String(formData.get("name") ?? current.name),
    avatarUrl: String(formData.get("avatarUrl") ?? current.avatarUrl),
    verified: formData.get("verified") === "on",
    accentColor: String(formData.get("accentColor") ?? current.accentColor),
    backgroundColor: String(formData.get("backgroundColor") ?? current.backgroundColor),
    whatsappNumber,
  };

  const advancedJson = String(formData.get("advancedJson") ?? "").trim();
  let merged: BiositeData = updated;
  if (advancedJson) {
    try {
      const parsed = JSON.parse(advancedJson);
      merged = { ...updated, ...parsed, slug: newSlug };
    } catch {
      throw new Error("JSON avançado inválido — verifique a sintaxe.");
    }
  }

  const { error } = await supabaseAdmin
    .from("biosites")
    .update({ slug: newSlug, data: merged, updated_at: new Date().toISOString() })
    .eq("slug", currentSlug);

  if (error) {
    if (error.code === "23505") {
      throw new Error(`Já existe um biosite com o slug "${newSlug}".`);
    }
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath(`/${currentSlug}`);
  revalidatePath(`/${newSlug}`);
  redirect(`/admin/${newSlug}`);
}

export async function deleteBiosite(slug: string) {
  await requireUser();

  const { error } = await supabaseAdmin.from("biosites").delete().eq("slug", slug);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath(`/${slug}`);
  redirect("/admin");
}
