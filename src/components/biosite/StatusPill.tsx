export function StatusPill({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="flex justify-center">
      <div
        className={`flex items-center gap-2 rounded-full border px-4 py-1.5 ${
          isOpen
            ? "border-green-500/20 bg-green-500/10"
            : "border-red-500/20 bg-red-500/10"
        }`}
      >
        <span className="relative flex h-2 w-2">
          {isOpen && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          )}
          <span
            className={`relative inline-flex h-2 w-2 rounded-full ${
              isOpen ? "bg-green-500" : "bg-red-500"
            }`}
          />
        </span>
        <span
          className={`text-[10px] font-bold uppercase tracking-widest ${
            isOpen ? "text-green-400" : "text-red-400"
          }`}
        >
          {isOpen ? "Aberto Agora" : "Fechado"}
        </span>
      </div>
    </div>
  );
}
