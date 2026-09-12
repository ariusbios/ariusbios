import type { StoryItem } from "@/lib/types";

export function StoriesRow({
  stories,
  onOpenStory,
}: {
  stories: StoryItem[];
  onOpenStory: (index: number) => void;
}) {
  return (
    <section className="px-5 py-2">
      <div className="custom-scrollbar flex justify-center gap-4 overflow-x-auto">
        {stories.map((story, index) => (
          <button
            key={story.id}
            type="button"
            onClick={() => onOpenStory(index)}
            className="flex min-w-[70px] flex-col items-center gap-2"
          >
            <div className="gradient-ring">
              <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-[var(--biosite-bg)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={story.images[0]}
                  alt={story.label}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <span className="text-[11px] font-semibold text-gray-300">{story.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
