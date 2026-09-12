import { Zap } from "lucide-react";

export function ScarcityBar({ messages }: { messages: string[] }) {
  const loop = [...messages, ...messages];
  return (
    <section className="relative overflow-hidden bg-orange-600 py-3">
      <div className="animate-scroll flex items-center gap-6 whitespace-nowrap">
        {loop.map((msg, i) => (
          <span key={i} className="flex items-center gap-6">
            <span className="text-xs font-black tracking-tighter text-white italic uppercase">
              {msg}
            </span>
            <Zap className="h-4 w-4 text-orange-200" />
          </span>
        ))}
      </div>
    </section>
  );
}
