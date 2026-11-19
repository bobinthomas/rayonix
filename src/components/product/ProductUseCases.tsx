"use client";

import React, { useState } from "react";
import type { ProductPageContent, UseCase } from "@/content/products/types";

// Cards shown per carousel page on desktop; slides are built from the array in pairs
const CARDS_PER_PAGE = 2;

interface ProductUseCasesProps {
  useCases: ProductPageContent["useCases"];
}

export default function ProductUseCases({ useCases }: ProductUseCasesProps) {
  const pages: UseCase[][] = Array.from(
    { length: Math.ceil(useCases.items.length / CARDS_PER_PAGE) },
    (_, i) => useCases.items.slice(i * CARDS_PER_PAGE, (i + 1) * CARDS_PER_PAGE)
  );

  // Carousel page index (each page holds CARDS_PER_PAGE cards)
  const [currentPage, setCurrentPage] = useState<number>(0);
  const totalPages = pages.length;

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <section
      className="relative w-full bg-[#080f12] border-t border-[#253035] text-[#f5f6f6] py-16 lg:py-24"
      aria-label="Use Cases Carousel"
      data-node-id="527:2475"
    >
      <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 flex flex-col gap-10 lg:gap-12">
        {/* Header Row with Controls */}
        <div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2"
          data-node-id="527:2477"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl sm:text-5xl lg:text-[48px] font-medium text-[#f5f6f6] leading-tight lg:leading-[56px] tracking-tight">
              {useCases.heading}
            </h2>
            {useCases.description && (
              <p className="text-xs sm:text-[12px] text-[#7f8a91] font-normal leading-[18px]">
                {useCases.description}
              </p>
            )}
          </div>

          {/* Carousel Tactical Navigation Arrows */}
          <div
            className="flex items-center gap-3 select-none"
            data-node-id="527:2483"
          >
            <button
              onClick={handlePrev}
              aria-label="Previous use cases"
              className="w-12 h-12 rounded-[4px] bg-[#10181c] border border-[#253035] flex items-center justify-center transition-all duration-300 hover:border-[#e22328] hover:bg-[#162025] cursor-pointer group outline-none"
            >
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              >
                <path
                  d="M7 1L2 6L7 11"
                  stroke="#bdc4c8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:stroke-white transition-colors"
                />
              </svg>
            </button>

            <button
              onClick={handleNext}
              aria-label="Next use cases"
              className="w-12 h-12 rounded-[4px] bg-[#10181c] border border-[#253035] flex items-center justify-center transition-all duration-300 hover:border-[#e22328] hover:bg-[#162025] cursor-pointer group outline-none"
            >
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path
                  d="M1 1L6 6L1 11"
                  stroke="#bdc4c8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:stroke-white transition-colors"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full overflow-hidden border border-[#253035] rounded-[4px] bg-[#080f12]">
          <div
            className="flex transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] w-full"
            style={{
              transform: `translateX(-${currentPage * 100}%)`,
            }}
          >
            {pages.map((pageItems, pageIdx) => (
              <div
                key={pageIdx}
                className="min-w-full grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#253035]"
              >
                {pageItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-8 sm:p-12 lg:p-[48px] min-h-[460px] lg:h-[536px] flex flex-col justify-between relative group hover:bg-[#0c1418] transition-colors duration-300"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-mono text-[13px] font-medium tracking-[1px] text-[#bdc4c8] uppercase">
                        {item.tag}
                      </span>
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                    </div>

                    <div className="flex flex-col gap-4 pt-12">
                      <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-normal leading-tight lg:leading-[44px] text-[#f5f6f6]">
                        {item.title}
                      </h3>
                      <p className="text-lg sm:text-xl lg:text-[26px] font-normal leading-relaxed lg:leading-[35px] text-[#bdc4c8]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Indicator */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                currentPage === idx
                  ? "w-8 bg-[#e22328]"
                  : "w-2 bg-[#253035] hover:bg-[#7f8a91]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
