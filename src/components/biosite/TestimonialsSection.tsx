import { Star } from "lucide-react";
import type { TestimonialsConfig } from "@/lib/types";

export function TestimonialsSection({ testimonials }: { testimonials: TestimonialsConfig }) {
  if (!testimonials.enabled) return null;

  return (
    <section className="px-5 py-10">
      <h2 className="mb-5 text-lg font-bold">O que dizem nossos clientes</h2>
      <div className="custom-scrollbar flex justify-center gap-4 overflow-x-auto pb-4">
        {testimonials.items.map((t) => (
          <div
            key={t.id}
            className="min-w-[240px] rounded-2xl border border-white/5 bg-[#1A1D23] p-5"
          >
            <div className="mb-3 flex flex-col items-center gap-2 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.avatarUrl} alt={t.name} className="h-10 w-10 rounded-full border border-white/10" />
              <div>
                <p className="mb-1 text-xs font-bold">{t.name}</p>
                <div className="flex justify-center text-yellow-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-500" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-center text-[12px] leading-relaxed font-medium text-gray-400 italic">
              &ldquo;{t.quote}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
