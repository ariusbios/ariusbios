import type { ComboItem } from "@/lib/types";

const MAX_COMBOS = 3;

export function CombosSection({
  combos,
  onAdd,
}: {
  combos: ComboItem[];
  onAdd: (combo: ComboItem) => void;
}) {
  const visibleCombos = combos.slice(0, MAX_COMBOS);

  return (
    <section className="bg-[#15181E] py-8">
      <div className="mb-5 px-5">
        <h2 className="text-lg font-bold">Combos com Desconto</h2>
      </div>
      <div className="custom-scrollbar flex justify-center gap-4 overflow-x-auto px-5">
        {visibleCombos.map((combo) => (
          <div
            key={combo.id}
            className={`relative min-w-[320px] rounded-2xl bg-[#1A1D23] p-5 ${
              combo.highlighted ? "glow-ring border-2 border-orange-500/40" : "border border-white/5"
            }`}
          >
            {combo.savingsLabel && (
              <div className="absolute top-3 right-3 left-16 truncate rounded bg-red-600 px-2 py-0.5 text-right text-[10px] font-black">
                {combo.savingsLabel}
              </div>
            )}
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="h-36 w-36 flex-shrink-0 overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={combo.imageUrl} alt={combo.title} className="h-full w-full object-cover" />
              </div>
              <div className="w-full">
                <h3 className="line-clamp-2 text-sm leading-tight font-bold break-words">
                  {combo.title}
                </h3>
                <div className="mt-1 flex items-baseline justify-center gap-2">
                  <span className="text-sm font-bold text-white">{combo.price}</span>
                  {combo.originalPrice && (
                    <span
                      className="text-[10px] line-through"
                      style={{ color: combo.originalPriceColor ?? "#6B7280" }}
                    >
                      {combo.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onAdd(combo)}
              className={`mt-4 w-full rounded-xl py-2.5 text-xs font-bold transition-colors ${
                combo.highlighted
                  ? "pulse-cta bg-orange-600 text-white hover:bg-orange-500"
                  : "bg-white/10 text-white"
              }`}
            >
              ADICIONAR AO PEDIDO
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
