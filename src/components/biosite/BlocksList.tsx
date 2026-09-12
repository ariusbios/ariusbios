import { ChevronRight, Link2, MapPin, Wifi } from "lucide-react";
import type { Block, LinkBlockConfig, MapBlockConfig, QrLinkConfig } from "@/lib/types";

const PIX_ICON = <span className="text-xl font-black text-teal-400">Pix</span>;

const WHATSAPP_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-green-400">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.148.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12.004 2c-5.514 0-9.996 4.478-9.996 9.997 0 1.763.464 3.484 1.346 4.997L2 22l5.144-1.35a9.958 9.958 0 0 0 4.86 1.24h.004c5.514 0 9.996-4.478 9.996-9.997 0-2.67-1.04-5.181-2.929-7.07A9.936 9.936 0 0 0 12.004 2z" />
  </svg>
);

const INSTAGRAM_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-pink-400">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

function LinkIconBox({ icon }: { icon: LinkBlockConfig["icon"] }) {
  if (icon === "whatsapp") {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
        {WHATSAPP_ICON}
      </div>
    );
  }
  if (icon === "instagram") {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10">
        {INSTAGRAM_ICON}
      </div>
    );
  }
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
      <Link2 className="h-5 w-5 text-gray-400" />
    </div>
  );
}

export function BlocksList({
  blocks,
  onOpenQr,
}: {
  blocks: Block[];
  onOpenQr: (block: Block) => void;
}) {
  const rowBlocks = [...blocks]
    .filter((b) => b.type !== "map")
    .sort((a, b) => a.position - b.position);

  return (
    <section className="flex flex-col gap-3 px-5 py-6">
      {rowBlocks.map((block) => {
          if (block.type === "qr_link") {
            const config = block.config as QrLinkConfig;
            const isWifi = config.kind === "wifi";
            return (
              <button
                key={block.id}
                type="button"
                onClick={() => onOpenQr(block)}
                className="group flex items-center justify-between rounded-2xl border border-white/5 bg-[#1A1D23] p-4 text-left transition-all hover:border-orange-500/50"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      isWifi ? "bg-blue-500/10" : "bg-teal-500/10"
                    }`}
                  >
                    {isWifi ? <Wifi className="h-5 w-5 text-blue-400" /> : PIX_ICON}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{config.label}</p>
                    <p className="truncate text-[10px] text-gray-500">{config.description}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-gray-600 transition-colors group-hover:text-orange-500" />
              </button>
            );
          }

          const config = block.config as LinkBlockConfig;
          return (
            <a
              key={block.id}
              href={config.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-white/5 bg-[#1A1D23] p-4 transition-all hover:border-orange-500/50"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="shrink-0">
                  <LinkIconBox icon={config.icon} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{config.label}</p>
                  {config.description && (
                    <p className="truncate text-[10px] text-gray-500">{config.description}</p>
                  )}
                </div>
              </div>
              <ChevronRight className="h-5 w-5 shrink-0 text-gray-600 transition-colors group-hover:text-orange-500" />
            </a>
          );
        })}
    </section>
  );
}

export function LocationBlock({ blocks }: { blocks: Block[] }) {
  const mapBlock = blocks.find((b) => b.type === "map");
  if (!mapBlock) return null;

  return (
    <section className="px-5 pb-8">
      <MapBlockCard config={mapBlock.config as MapBlockConfig} />
    </section>
  );
}

function MapBlockCard({ config }: { config: MapBlockConfig }) {
  return (
    <a
      href={config.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block overflow-hidden rounded-2xl border border-white/5 bg-[#1A1D23]"
    >
      <div className="h-24 w-full grayscale">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={config.mapImageUrl} alt="" className="h-full w-full object-cover opacity-50" />
      </div>
      <div className="flex items-center justify-between p-4">
        <div className="min-w-0">
          <p className="truncate text-xs font-bold">{config.label}</p>
          <p className="truncate text-[10px] text-gray-400">{config.address}</p>
        </div>
        <MapPin className="h-5 w-5 shrink-0 text-orange-500" />
      </div>
    </a>
  );
}
