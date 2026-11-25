"use client";

import { useState } from "react";
import StoryCard from "./StoryCard";
import { NEWS_FILTERS, type NewsFilter, type NewsStory } from "@/content/news";

/** Filterable newsroom grid: All · Announcements · Media coverage. */
export default function NewsList({ stories }: { stories: NewsStory[] }) {
  const [filter, setFilter] = useState<NewsFilter>("all");
  const shown = filter === "all" ? stories : stories.filter((s) => s.kind === filter);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#d5dadc] pb-6">
        <h2 className="type-h2 text-[#080f12]">Announcements &amp; Media Coverage</h2>
        <div role="group" aria-label="Filter news" className="flex flex-wrap gap-2">
          {NEWS_FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.id)}
                className={`rounded-[12px] px-4 py-2 type-small transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e22328] ${
                  active
                    ? "bg-[#080f12] text-[#f5f6f6] border border-[#080f12]"
                    : "bg-white text-[#47494a] border border-[#d5dadc] hover:border-[#080f12] hover:text-[#080f12]"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {shown.length ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" aria-live="polite">
          {shown.map((s) => (
            <li key={s.slug}>
              <StoryCard story={s} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="type-body text-[#7f8a91]" aria-live="polite">
          No items in this category yet.
        </p>
      )}
    </div>
  );
}
