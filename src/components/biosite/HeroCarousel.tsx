"use client";

import { useEffect, useState } from "react";
import type { HeroSlide } from "@/lib/types";

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [slides.length]);

  const slide = slides[active];

  return (
    <section className="relative mt-4 aspect-[4/5] w-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={slide.imageUrl} alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--biosite-bg)] via-transparent to-transparent" />
      {slide.badge && (
        <div className="absolute top-6 right-0 left-0 flex justify-center">
          <span className="flex items-center gap-1 rounded-full bg-orange-600 px-3 py-1.5 text-[10px] font-bold tracking-widest text-white uppercase shadow-lg">
            {slide.badge}
          </span>
        </div>
      )}
      <div className="absolute right-0 bottom-8 left-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${i === active ? "bg-orange-600" : "bg-white/30"}`}
          />
        ))}
      </div>
    </section>
  );
}
