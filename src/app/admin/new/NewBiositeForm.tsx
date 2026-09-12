"use client";

import { useState, useTransition } from "react";
import { createBiosite } from "../actions";

export function NewBiositeForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      try {
        await createBiosite(formData);
      } catch (err) {
        const digest = (err as { digest?: string })?.digest;
        if (digest?.startsWith("NEXT_REDIRECT")) throw err;
        setError(err instanceof Error ? err.message : "Erro ao criar biosite.");
      }
    });
  };

  return (
    <form action={handleSubmit} className="flex w-full max-w-md flex-col gap-4">
      <Field label="Nome do negócio" name="name" required placeholder="Padaria Silva" />
      <Field
        label="Slug (URL)"
        name="slug"
        placeholder="padaria-silva (deixa em branco pra gerar do nome)"
      />
      <Field
        label="WhatsApp (com DDI)"
        name="whatsappNumber"
        required
        placeholder="5511999999999"
      />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Cor de destaque" name="accentColor" type="color" defaultValue="#EA580C" />
        <Field label="Cor de fundo" name="backgroundColor" type="color" defaultValue="#0F1115" />
      </div>
      <Field label="URL da foto/logo (opcional)" name="avatarUrl" placeholder="https://..." />

      <label className="flex items-center gap-2 text-sm text-gray-300">
        <input type="checkbox" name="verified" className="h-4 w-4" />
        Selo de verificado
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-700 disabled:opacity-50"
      >
        {isPending ? "Criando..." : "Criar biosite"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
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
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
      />
    </div>
  );
}
