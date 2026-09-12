"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { StoryItem } from "@/lib/types";

const SLIDE_DURATION_MS = 4000;

export function StoriesViewer({
  stories,
  initialStoryIndex,
  onClose,
}: {
  stories: StoryItem[];
  initialStoryIndex: number;
  onClose: () => void;
}) {
  const [storyIndex, setStoryIndex] = useState(initialStoryIndex);
  const [imageIndex, setImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const currentStory = stories[storyIndex];

  const goToNextImage = () => {
    if (imageIndex < currentStory.images.length - 1) {
      setImageIndex((i) => i + 1);
      setProgress(0);
    } else if (storyIndex < stories.length - 1) {
      setStoryIndex((s) => s + 1);
      setImageIndex(0);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const goToPrevImage = () => {
    if (imageIndex > 0) {
      setImageIndex((i) => i - 1);
      setProgress(0);
    } else if (storyIndex > 0) {
      const prevStory = stories[storyIndex - 1];
      setStoryIndex((s) => s - 1);
      setImageIndex(prevStory.images.length - 1);
      setProgress(0);
    }
  };

  useEffect(() => {
    const tickMs = 50;
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + (tickMs / SLIDE_DURATION_MS) * 100;
        if (next >= 100) {
          goToNextImage();
          return 0;
        }
        return next;
      });
    }, tickMs);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyIndex, imageIndex]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black">
      <div className="flex gap-1 px-3 pt-4">
        {currentStory.images.map((_, i) => (
          <div key={i} className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/30">
            <div
              className="h-full bg-white"
              style={{
                width: `${i < imageIndex ? 100 : i === imageIndex ? progress : 0}%`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <span className="min-w-0 truncate text-sm font-bold text-white">{currentStory.label}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="flex h-11 w-11 shrink-0 items-center justify-center text-white"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="relative flex-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentStory.images[imageIndex]}
          alt={currentStory.label}
          className="h-full w-full object-cover"
        />
        <button
          type="button"
          aria-label="Anterior"
          onClick={goToPrevImage}
          className="absolute inset-y-0 left-0 w-1/3"
        />
        <button
          type="button"
          aria-label="Próximo"
          onClick={goToNextImage}
          className="absolute inset-y-0 right-0 w-2/3"
        />
      </div>
    </div>
  );
}
