"use client";

import { useState, useTransition } from "react";
import type { BiositeData } from "@/lib/types";
import { updateBiosite, deleteBiosite } from "../actions";

export function EditBiositeForm({ data }: { data: BiositeData }) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [advancedJson, setAdvancedJson] = useState(() =>
    JSON.stringify(
      {
        stories: data.stories,
        heroSlides: data.heroSlides,
        scarcityMessages: data.scarcityMessages,
        socialProof: data.socialProof,
        bentoTitle: data.bentoTitle,
        bentoItems: data.bentoItems,
        combos: data.combos,
        testimonials: data.testimonials,
        storeGallery: data.storeGallery,
        blocks: data.blocks,
        businessHours: data.businessHours,
        footerCreditUrl: data.footerCreditUrl,
      },
      null,
      2,
    ),
  );

  const handleSubmit = (formData: FormData) => {
    setError(null);
    formData.set("advancedJson", advancedJson);
    startTransition(async () => {
      try {
        await updateBiosite(data.slug, formData);
      } catch (err) {
        const digest = (err as { digest?: string })?.digest;
        if (digest?.startsWith("NEXT_REDIRECT")) throw err;
        setError(err instanceof Error ? err.message : "Erro ao salvar.");
      }
    });
  };

  const handleDelete = () => {
    if (!confirm(`Apagar o biosite "${data.name}" (/${data.slug}) pra sempre?`)) return;
    startTransition(async () => {
      try {
        await deleteBiosite(data.slug);
      } catch (err) {
        const digest = (err as { digest?: string })?.digest;
        if (digest?.startsWith("NEXT_REDIRECT")) throw err;
        setError(err instanceof Error ? err.message : "Erro ao apagar.");
      }
    });
  };

  return (
    <form action={handleSubmit} className="flex w-full max-w-md flex-col gap-4">
      <Field label="Nome do negócio" name="name" required defaultValue={data.name} />
      <Field label="Slug (URL)" name="slug" required defaultValue={data.slug} />
      <Field
        label="WhatsApp (com DDI)"
        name="whatsappNumber"
        required
        defaultValue={data.whatsappNumber}
      />
      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Cor de destaque"
          name="accentColor"
          type="color"
          defaultValue={data.accentColor}
        />
        <Field
          label="Cor de fundo"
          name="backgroundColor"
          type="color"
          defaultValue={data.backgroundColor}
        />
      </div>
      <Field label="URL da foto/logo" name="avatarUrl" defaultValue={data.avatarUrl} />

      <label className="flex items-center gap-2 text-sm text-gray-300">
        <input type="checkbox" name="verified" defaultChecked={data.verified} className="h-4 w-4" />
        Selo de verificado
      </label>

      <details className="rounded-lg border border-white/10 bg-white/5 p-3">
        <summary className="cursor-pointer text-sm font-medium text-gray-300">
          Conteúdo avançado (stories, destaques, combos, links...) — JSON
        </summary>
        <textarea
          value={advancedJson}
          onChange={(e) => setAdvancedJson(e.target.value)}
          rows={16}
          spellCheck={false}
          className="mt-3 w-full rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-xs text-gray-200 outline-none focus:border-orange-500"
        />
      </details>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="mt-2 flex items-center justify-between gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-700 disabled:opacity-50"
        >
          {isPending ? "Salvando..." : "Salvar"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="text-sm text-red-400 hover:text-red-300 disabled:opacity-50"
        >
          Apagar biosite
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-gray-300">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
      />
    </div>
  );
}
