"use client";

import { Share2, BadgeCheck } from "lucide-react";

export function BiositeHeader({
  name,
  avatarUrl,
  verified,
}: {
  name: string;
  avatarUrl: string;
  verified: boolean;
}) {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: name, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <header className="flex shrink-0 flex-col items-center px-5 pt-14 pb-6">
      <div className="mb-3 h-24 w-24 overflow-hidden rounded-full border-2 border-orange-500 p-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={avatarUrl} alt={name} className="h-full w-full rounded-full object-cover" />
      </div>
      <div className="flex flex-col items-center">
        <div className="mb-1 flex items-center gap-1.5">
          <h1 className="text-base font-bold tracking-tight">{name}</h1>
          {verified && <BadgeCheck className="h-4 w-4 text-blue-400" />}
        </div>
      </div>
      <button
        type="button"
        onClick={handleShare}
        className="absolute top-12 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
        aria-label="Compartilhar"
      >
        <Share2 className="h-4 w-4" />
      </button>
    </header>
  );
}
