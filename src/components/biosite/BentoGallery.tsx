"use client";

import { useEffect, useRef, useState } from "react";
import type { BentoItem } from "@/lib/types";

export function BentoGallery({
  title,
  items,
  onOrder,
}: {
  title: string;
  items: BentoItem[];
  onOrder: (item: BentoItem) => void;
}) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((i) => (i + 1) % items.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [items.length]);

  useEffect(() => {
    const track = trackRef.current;
    const card = cardRefs.current[active];
    if (!track || !card) return;
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <section className="py-8">
      <h2 className="mb-6 px-5 text-center text-xl font-extrabold tracking-tight">{title}</h2>
      <div
        ref={trackRef}
        className="custom-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[11%]"
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="relative aspect-[4/5] w-[78%] flex-shrink-0 snap-center overflow-hidden rounded-2xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute right-3 bottom-3 left-3">
              {item.badge && (
                <p className="truncate text-[11px] font-bold text-orange-400">{item.badge}</p>
              )}
              <h3 className="truncate text-sm leading-tight font-bold">{item.title}</h3>
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="truncate text-sm font-black">{item.price}</span>
                <button
                  type="button"
                  onClick={() => onOrder(item)}
                  className="shrink-0 rounded-lg bg-orange-600 px-3 py-2 text-[10px] font-bold uppercase"
                >
                  Pedir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
