import type { StoreGalleryConfig } from "@/lib/types";

export function StoreGallery({ gallery }: { gallery: StoreGalleryConfig }) {
  if (!gallery.enabled || gallery.images.length === 0) return null;

  return (
    <section className="px-5 pb-8">
      <h2 className="mb-4 text-center text-lg font-bold">{gallery.title}</h2>
      <div className="grid grid-cols-2 gap-3">
        {gallery.images.slice(0, 4).map((url, i) => (
          <div key={i} className="aspect-square overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={gallery.title} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
