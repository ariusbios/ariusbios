import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { signOut } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const { data: rows } = await supabaseAdmin
    .from("biosites")
    .select("slug, data, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen w-full bg-[#0F1115] px-6 py-10 text-white">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Biosites</h1>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/new"
              className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold hover:bg-orange-700"
            >
              + Novo biosite
            </Link>
            <form action={signOut}>
              <button type="submit" className="text-sm text-gray-400 hover:text-white">
                Sair
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {rows?.length === 0 && (
            <p className="text-sm text-gray-400">Nenhum biosite criado ainda.</p>
          )}
          {rows?.map((row) => {
            const data = row.data as { name?: string; whatsappNumber?: string };
            return (
              <Link
                key={row.slug}
                href={`/admin/${row.slug}`}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:border-orange-500/50"
              >
                <div>
                  <p className="font-semibold">{data.name ?? row.slug}</p>
                  <p className="text-xs text-gray-400">/{row.slug}</p>
                </div>
                <span className="text-xs text-gray-500">editar →</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
