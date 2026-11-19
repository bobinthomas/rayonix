"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLink } from "./ui";
import {
  NEWS_FILTERS,
  formatNewsDate,
  type NewsArticle,
  type NewsCategory,
} from "@/content/company/newsroom";

/** Figma 556:8169: "Press Releases & Field Bulletins" header, filter pills and 3-column card grid. */
export default function NewsArchive({
  articles,
  featured,
}: {
  articles: NewsArticle[];
  featured: NewsArticle;
}) {
  const [filter, setFilter] = useState<"all" | NewsCategory>("all");
  // "All" lists the archive; a category also includes the featured story when it matches.
  const shown =
    filter === "all" ? articles : [featured, ...articles].filter((a) => a.category === filter);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#d5dadc] pb-6">
        <h2 className="text-[26px] sm:text-[32px] font-normal leading-[40px] tracking-[-0.8px] text-[#080f12]">
          Press Releases &amp; Field Bulletins
        </h2>
        <div role="group" aria-label="Filter news" className="flex flex-wrap gap-2">
          {NEWS_FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.id)}
                className={`rounded-[12px] px-4 py-2 text-[14px] leading-[20px] tracking-[0.84px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e22328] ${
                  active
                    ? "bg-[#080f12] text-[#f5f6f6] border border-[#080f12]"
                    : "bg-white text-[#7f8a91] border border-[#d5dadc] hover:border-[#080f12] hover:text-[#080f12]"
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
          {shown.map((a) => (
            <li key={a.slug}>
              <NewsCard article={a} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[16px] text-[#7f8a91]" aria-live="polite">
          No items in this category yet.
        </p>
      )}
    </div>
  );
}

function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <article className="h-full flex flex-col bg-white border border-[#d5dadc] rounded-[4px] overflow-hidden shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
      <div className="relative h-[224px] bg-[#10181c] shrink-0">
        {article.image && (
          <Image
            src={article.image.src}
            alt={article.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 405px"
            className="object-cover"
          />
        )}
        <span className="absolute left-3 top-[13px] backdrop-blur-[4px] bg-white/95 rounded-[2px] px-[10px] py-[2.5px] text-[12px] font-semibold leading-[18px] tracking-[0.24px] text-[#080f12]">
          {article.tag}
        </span>
      </div>
      <div className="flex-1 flex flex-col justify-between gap-4 p-6">
        <div className="flex flex-col gap-[7px]">
          <time dateTime={article.date} className="text-[12px] leading-[18px] tracking-[0.24px] text-[#7f8a91]">
            {formatNewsDate(article.date)}
          </time>
          <h3 className="text-[18px] font-bold leading-[24.75px] text-[#080f12]">{article.title}</h3>
          <p className="text-[14px] leading-[22.75px] tracking-[0.14px] text-[#7f8a91]">{article.summary}</p>
        </div>
        <div className="border-t border-[#f0f2f4] pt-5">
          <ArrowLink href={`/news/${article.slug}`}>Read article</ArrowLink>
        </div>
      </div>
    </article>
  );
}
