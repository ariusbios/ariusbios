import { Star } from "lucide-react";
import type { SocialProofData } from "@/lib/types";

export function SocialProof({ data }: { data: SocialProofData }) {
  if (!data.enabled) return null;

  return (
    <section className="flex items-center justify-between border-b border-white/5 px-5 py-6">
      <div className="flex min-w-0 items-center">
        <div className="flex shrink-0 -space-x-2">
          {data.avatarUrls.map((url, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={url}
              alt=""
              className="h-7 w-7 rounded-full border-2 border-[var(--biosite-bg)]"
            />
          ))}
        </div>
        <span className="ml-3 truncate text-[12px] font-medium text-gray-400">
          {data.orderCountLabel}
        </span>
      </div>
      {data.showRating && (
        <div className="ml-3 flex shrink-0 items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-bold">{data.rating}</span>
          <span className="text-[10px] font-medium text-gray-500">({data.ratingCount})</span>
        </div>
      )}
    </section>
  );
}
