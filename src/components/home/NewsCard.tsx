"use client";

import React from "react";
import Image from "next/image";

export interface NewsCardButton {
  label: string;
  href: string;
}

export interface NewsCardProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  buttons: NewsCardButton[];
  source: string;
  date: string;
  variant?: "slate" | "deep";
  nodeId?: string;
}

export default function NewsCard({
  title,
  imageSrc,
  imageAlt,
  description,
  buttons,
  source,
  date,
  variant = "slate",
  nodeId,
}: NewsCardProps) {
  const isSlate = variant === "slate";
  const bgClass = isSlate ? "bg-[#253035]" : "bg-[#10181c]";

  return (
    <div
      className={`group relative w-full h-[558px] ${bgClass} rounded-[8px] p-6 sm:p-10 lg:p-[48px] flex flex-col justify-between overflow-hidden shadow-lg border border-white/[0.08] transition-colors duration-500`}
      data-node-id={nodeId}
    >
      {/* 1. Header: Headline + Thin Divider */}
      <div className="space-y-3.5 shrink-0">
        <h4 className="text-xl sm:text-2xl lg:text-[24px] font-medium text-[#f5f6f6] leading-[32px] line-clamp-2 min-h-[64px] flex items-center">
          {title}
        </h4>
        <div className="h-px w-full bg-white/10" />
      </div>

      {/* 2. Middle: Fixed 322px Container (Image slides up on hover, revealing description and buttons) */}
      <div className="relative w-full h-[322px] rounded-[4px] overflow-hidden shrink-0 my-auto">
        {/* Story Image: In resting state fills full 322px; on hover slides UP by 160px (extra 40px clearance) */}
        <div className="absolute inset-x-0 top-0 h-[322px] w-full rounded-[4px] overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[160px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Revealed Content: Starts translated down, on hover slides up into view */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end gap-[12px] pb-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-[140px] opacity-0 pointer-events-none group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto">
          <p className="text-sm sm:text-base lg:text-[16px] text-[#f5f6f6] font-normal leading-[22px] sm:leading-[24px] line-clamp-3">
            {description}
          </p>

          <div className="flex flex-wrap sm:flex-nowrap gap-[10px] items-center pt-1">
            {buttons.map((btn, idx) => (
              <a
                key={idx}
                href={btn.href}
                className="group/btn relative inline-flex items-center justify-center gap-3 sm:gap-4 px-4 sm:px-5 py-2.5 sm:py-3 h-[46px] sm:h-[52px] rounded-[4px] border border-[#e22328] overflow-hidden transition-all duration-300 select-none cursor-pointer text-sm sm:text-base font-normal leading-normal whitespace-nowrap"
              >
                {/* Black background grows from bottom to top on hover */}
                <span
                  className="absolute inset-0 bg-[#080f12] translate-y-full transition-transform duration-300 ease-out group-hover/btn:translate-y-0"
                  aria-hidden="true"
                />
                <span className="relative z-10 text-[#e22328] group-hover/btn:text-white transition-colors duration-300 font-medium">
                  {btn.label}
                </span>
                <span
                  className="relative z-10 shrink-0 w-[15px] h-[18px] flex items-center justify-center"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 95 81"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[15px] h-[18px] overflow-visible"
                  >
                    {/* Rear Chevron Wing */}
                    <path
                      d="M0.000973671 80.75C-0.0790263 80.61 4.79097 75.57 10.841 69.54L21.821 58.57L35.651 58.67C43.251 58.72 49.531 58.81 49.591 58.88C49.661 58.95 44.731 63.95 38.631 70L27.541 81H13.851C4.99098 81 0.100974 80.91 0.000973671 80.75ZM10.811 11.44C4.78097 5.42 -0.0790263 0.39 0.000973671 0.25C0.100974 0.09 4.99098 0 13.851 0H27.531L38.611 11.01C44.711 17.06 49.651 22.07 49.581 22.13C49.521 22.2 43.231 22.28 35.621 22.31L21.771 22.38L10.811 11.44Z"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      className="fill-[#e22328] group-hover/btn:fill-white transition-colors duration-300"
                    />
                    {/* Forward Chevron Tip */}
                    <g className="transition-transform duration-300 ease-out group-hover/btn:translate-x-[26px]">
                      <path
                        d="M25.4336 58.8475L22 58.7051L30.6429 49.7475C35.4009 44.8162 39.2858 40.6678 39.2858 40.5254C39.2858 40.3831 35.4009 36.2347 30.6429 31.3034L22 22.3457L23.0988 22.183C23.707 22.0915 29.8777 22.0102 36.8038 22.0102L49.4101 22L58.2099 31.0899C63.0464 36.0923 67 40.3424 67 40.5254C67 40.7084 63.0562 44.9483 58.2296 49.9305L49.4591 59H39.1583C33.4977 58.9898 27.3172 58.9288 25.4336 58.8475Z"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        className="fill-[#e22328] group-hover/btn:fill-white transition-colors duration-300"
                      />
                    </g>
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Footer: Story Metadata */}
      <div className="flex items-center gap-2.5 text-[12px] text-[#7f8a91] font-normal shrink-0">
        <span className="font-bold text-[#f5f6f6]">{source}</span>
        <span className="text-white/30">•</span>
        <span>{date}</span>
      </div>
    </div>
  );
}
