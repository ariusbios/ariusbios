import Link from "next/link";
import { mockBiosite } from "@/lib/mock-biosite";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-[#0F1115] p-8 text-center text-white">
      <h1 className="text-2xl font-bold">Biosite Platform</h1>
      <p className="max-w-sm text-sm text-gray-400">
        Ainda em construção — painel do produtor e builder vêm nas próximas fases.
      </p>
      <Link
        href={`/${mockBiosite.slug}`}
        className="rounded-full bg-orange-600 px-5 py-2.5 text-sm font-bold"
      >
        Ver biosite de exemplo
      </Link>
    </div>
  );
}
