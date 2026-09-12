import Link from "next/link";
import { NewBiositeForm } from "./NewBiositeForm";

export default function NewBiositePage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[#0F1115] px-6 py-10 text-white">
      <div className="mb-8 flex w-full max-w-md items-center justify-between">
        <h1 className="text-xl font-bold">Novo biosite</h1>
        <Link href="/admin" className="text-sm text-gray-400 hover:text-white">
          ← voltar
        </Link>
      </div>
      <NewBiositeForm />
    </div>
  );
}
