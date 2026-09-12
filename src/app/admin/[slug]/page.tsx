import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { BiositeData } from "@/lib/types";
import { EditBiositeForm } from "./EditBiositeForm";

export const dynamic = "force-dynamic";

export default async function EditBiositePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: row } = await supabaseAdmin
    .from("biosites")
    .select("data")
    .eq("slug", slug)
    .maybeSingle();

  if (!row) notFound();

  const data = row.data as BiositeData;

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[#0F1115] px-6 py-10 text-white">
      <div className="mb-8 flex w-full max-w-md items-center justify-between">
        <h1 className="text-xl font-bold">Editar biosite</h1>
        <div className="flex items-center gap-4 text-sm">
          <a
            href={`/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 hover:text-orange-300"
          >
            ver ao vivo ↗
          </a>
          <Link href="/admin" className="text-gray-400 hover:text-white">
            ← voltar
          </Link>
        </div>
      </div>
      <EditBiositeForm data={data} />
    </div>
  );
}
