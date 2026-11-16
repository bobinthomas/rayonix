"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function ExploreSection() {
  return (
    <section
      className="relative w-full bg-[#f5f6f6] text-[#080f12] px-6 sm:px-12 lg:px-[64px] py-16 lg:py-[64px]"
      aria-label="Explore Rayonix"
      data-node-id="640:4004"
    >
      <div className="max-w-[1290px] mx-auto flex flex-col gap-12 lg:gap-[36px]">
        {/* Section Heading matching Figma node 640:4007 */}
        <div>
          <h2 className="text-4xl sm:text-6xl lg:text-[64px] font-bold text-[#080f12] leading-tight lg:leading-[72px]">
            Explore Rayonix<span className="text-[#e22328]">.</span>
          </h2>
        </div>

        {/* 1. Featured Company Story Card (h-[653px]) matching Figma node 640:4008 */}
        <div className="relative w-full h-[550px] sm:h-[653px] rounded-[12px] overflow-hidden border border-[#c4c9cc] bg-black shadow-lg flex flex-col justify-end p-8 sm:p-14 group">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <Image
              src="/assets/story-company.png"
              alt="The Rayonix Story"
              fill
              sizes="(max-width: 1290px) 100vw, 1290px"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark gradient for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-[535px] flex flex-col gap-[11.5px]">
            <span className="text-[14px] font-medium text-[#e8141a]">
              01 / COMPANY
            </span>
            <h3 className="text-3xl sm:text-5xl lg:text-[48px] font-medium text-[#f5f6f6] leading-tight lg:leading-[56px]">
              The Rayonix Story.
            </h3>
            <p className="text-base sm:text-lg lg:text-[18px] text-[#f5f6f6] font-normal leading-[28px]">
              Discover our mission, vision and approach to advancing defence technology.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 px-[20px] py-[13px] bg-[#c8171c] hover:bg-[#b01217] text-white text-[16px] font-normal transition-colors rounded-[4px] shadow-sm group"
              >
                <span>Learn More</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 2. Side-by-Side 2 Cards (h-[510px]) matching Figma node 643:4413 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[17px]">
          {/* Card 02 / ECOSYSTEM */}
          <div className="relative w-full h-[480px] sm:h-[510px] rounded-[12px] overflow-hidden border border-[#c4c9cc] bg-black shadow-md flex flex-col justify-end p-8 sm:p-10 group">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <Image
                src="/assets/story-ecosystem.png"
                alt="The Rayonix Ecosystem"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col gap-[15px] max-w-[442px]">
              <span className="text-[14px] font-medium text-[#f5f6f6]">
                02 / ECOSYSTEM
              </span>
              <h3 className="text-2xl sm:text-4xl lg:text-[48px] font-medium text-[#f5f6f6] leading-tight lg:leading-[56px]">
                The Rayonix Ecosystem.
              </h3>
              <p className="text-sm sm:text-base lg:text-[18px] text-[#f5f6f6] font-normal leading-[28px]">
                Explore the specialised engineering, innovation and manufacturing entities behind our capabilities.
              </p>
              <div className="pt-2">
                <Link
                  href="/ecosystem"
                  className="inline-flex items-center gap-3 px-[20px] py-[13px] bg-[#e22328] hover:bg-[#c8171c] text-white text-[16px] font-normal transition-colors rounded-[4px] shadow-sm group"
                >
                  <span>Learn More</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 04 / CAREERS */}
          <div className="relative w-full h-[480px] sm:h-[510px] rounded-[12px] overflow-hidden border border-[#c4c9cc] bg-black shadow-md flex flex-col justify-end p-8 sm:p-10 group">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <Image
                src="/assets/story-news1.png"
                alt="Build What's Next"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col gap-[16px] max-w-[516px]">
              <span className="text-[14px] font-medium text-[#f5f6f6]">
                04 / CAREERS
              </span>
              <h3 className="text-2xl sm:text-4xl lg:text-[48px] font-medium text-[#f5f6f6] leading-tight lg:leading-[56px]">
                Build What’s Next.
              </h3>
              <p className="text-sm sm:text-base lg:text-[18px] text-[#f5f6f6] font-normal leading-[28px]">
                Explore opportunities to work across engineering, technology and defence innovation.
              </p>
              <div className="pt-2">
                <Link
                  href="/careers"
                  className="inline-flex items-center gap-3 px-[20px] py-[13px] bg-[#e22328] hover:bg-[#c8171c] text-white text-[16px] font-normal transition-colors rounded-[4px] shadow-sm group"
                >
                  <span>Learn More</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Sub-Section: The Latest from Rayonix matching Figma node 643:4417 */}
        <div className="pt-16 lg:pt-20 flex flex-col gap-[25px]">
          {/* Header Row with Red Outline Button */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4">
            <div>
              <h3 className="text-3xl sm:text-5xl lg:text-[48px] font-medium text-[#080f12] leading-tight lg:leading-[56px]">
                The Latest from Rayonix.
              </h3>
              <p className="text-base sm:text-lg lg:text-[18px] text-[#080f12] font-normal leading-[28px] mt-2">
                Follow our latest developments, announcements and industry perspectives.
              </p>
            </div>

            <div>
              <Link
                href="/news"
                className="inline-flex items-center gap-3 px-[20px] py-[13px] border border-[#e22328] text-[#e22328] hover:bg-[#e22328] hover:text-white transition-colors text-[16px] font-normal rounded-[4px] group"
              >
                <span>Learn More</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* 2 News Cards with Dark Backgrounds matching Figma nodes 640:4038 & 640:4045 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* News 1: bg-[#253035] (Slate Dark) */}
            <div className="bg-[#253035] rounded-[8px] p-8 sm:p-12 flex flex-col justify-between min-h-[500px] lg:h-[558px] shadow-md border border-white/[0.04]">
              <div className="space-y-4">
                <h4 className="text-xl sm:text-2xl lg:text-[24px] font-medium text-[#f5f6f6] leading-[32px] max-w-[494px]">
                  Magellanic, Rayonix ink $11 million JV pact for defence drones
                </h4>
                <div className="h-px w-full bg-[#bfcdd1]/25" />
              </div>

              <div className="relative w-full h-[260px] sm:h-[300px] rounded-[4px] overflow-hidden my-4">
                <Image
                  src="/assets/story-news1.png"
                  alt="Magellanic Rayonix JV"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="flex items-center gap-4 text-[12px] text-[#7f8a91] font-normal">
                <span>The Hindu</span>
                <span>•</span>
                <span>April 28, 2026</span>
              </div>
            </div>

            {/* News 2: bg-[#10181c] (Deep Panel Dark) */}
            <div className="bg-[#10181c] rounded-[8px] p-8 sm:p-12 flex flex-col justify-between min-h-[500px] lg:h-[558px] shadow-md border border-white/[0.04]">
              <div className="space-y-4">
                <h4 className="text-xl sm:text-2xl lg:text-[24px] font-medium text-[#f5f6f6] leading-[32px] max-w-[494px]">
                  India’s drone ecosystem gets boost with ₹100-crore Magellanic-Rayonix JV
                </h4>
                <div className="h-px w-full bg-[#bfcdd1]/25" />
              </div>

              <div className="relative w-full h-[260px] sm:h-[300px] rounded-[4px] overflow-hidden my-4">
                <Image
                  src="/assets/story-news2.png"
                  alt="India Drone Ecosystem"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="flex items-center gap-4 text-[12px] text-[#7f8a91] font-normal">
                <span>The Hindu</span>
                <span>•</span>
                <span>April 28, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
