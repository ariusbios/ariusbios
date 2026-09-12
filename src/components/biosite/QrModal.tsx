"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Check, Copy, X } from "lucide-react";

export function QrModal({
  title,
  qrValue,
  copyValue,
  copyLabel,
  onClose,
}: {
  title: string;
  qrValue: string;
  copyValue?: string;
  copyLabel?: string;
  onClose: () => void;
}) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    QRCode.toDataURL(qrValue, { width: 320, margin: 1 }).then(setQrDataUrl);
  }, [qrValue]);

  const handleCopy = async () => {
    if (!copyValue) return;
    await navigator.clipboard.writeText(copyValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 px-6">
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center text-white"
      >
        <X className="h-7 w-7" />
      </button>

      <h2 className="mb-6 max-w-full truncate px-4 text-lg font-bold text-white">{title}</h2>

      <div className="max-w-full rounded-3xl bg-white p-4">
        {qrDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={qrDataUrl} alt={title} className="h-auto w-64 max-w-full" />
        ) : (
          <div className="aspect-square w-64 max-w-full animate-pulse bg-gray-200" />
        )}
      </div>

      {copyValue && (
        <button
          type="button"
          onClick={handleCopy}
          className="mt-6 flex max-w-full items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white"
        >
          <span className="max-w-[220px] truncate">{copyValue}</span>
          {copied ? (
            <Check className="h-4 w-4 shrink-0 text-green-400" />
          ) : (
            <Copy className="h-4 w-4 shrink-0" />
          )}
        </button>
      )}
      {copyLabel && (
        <p className="mt-2 max-w-full truncate px-4 text-xs text-gray-400">{copyLabel}</p>
      )}
    </div>
  );
}
