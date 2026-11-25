"use client";

import Link from "next/link";
import CTAButton from "@/components/ui/CTAButton";
import { ECOSYSTEM_COMPANIES } from "@/content/ecosystem";

// Client copy (src/content/ecosystem.ts). Display names follow the existing homepage casing.
const subsidiaries = ECOSYSTEM_COMPANIES.map((c) => ({
  name: c.slug === "mcray-xtend" ? "Mcray Xtend" : c.name,
  headline: c.headline,
  intro: c.intro,
  href: `/ecosystem/${c.slug}`,
}));

export default function BeyondIntegrationSection() {
  return (
    <section
      className="relative w-full bg-[#f5f6f6] text-[#080f12] py-[80px]"
      aria-label="Beyond Integration Built for Defence"
      data-node-id="640:3938"
    >
      <div className="max-w-[1280px] mx-auto w-full">
        {/* Editorial Statement Header matching Figma node 640:3939 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-6 sm:px-8 pb-16">
          <div>
            <h2 className="type-hero text-[#080f12] ">
              Beyond Integration.
              <br />
              Built for <span className="text-[#7f8a91]">Defence</span>
              <span className="text-[#e22328]">.</span>
            </h2>
          </div>

          <div>
            <CTAButton href="/ecosystem" variant="primary">
              Discover our Xfactor
            </CTAButton>
          </div>
        </div>

        {/* 3 Full-Width Subsidiary Strips matching Figma node 640:3949 - No bottom line on last item */}
        <div className="border-t border-[#a3adb2]">
          {subsidiaries.map((item, index) => {
            const isLast = index === subsidiaries.length - 1;
            return (
              <Link
                key={item.name}
                href={item.href}
                prefetch={false}
                className={`subsidiary-strip group relative block min-h-[220px] sm:min-h-[250px] px-6 sm:px-8 py-[28px] overflow-hidden ${
                  !isLast ? "border-b border-[#a3adb2]" : ""
                }`}
              >
                {/* Black fill that grows from bottom on hover — GPU-only transform */}
                <span
                  className="subsidiary-fill absolute inset-0 bg-[#080f12] will-change-transform"
                  aria-hidden="true"
                />

                {/* Content layer above the fill */}
                <div className="relative z-10 h-full min-h-[164px] sm:min-h-[194px] grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 content-between lg:content-stretch">
                  <h3 className="lg:col-span-5 subsidiary-title type-hero text-[#7f8a91] ">
                    {item.name}
                  </h3>
                  <div className="lg:col-span-7 flex flex-col justify-end gap-2">
                    <p className="subsidiary-desc type-h3 text-[#080f12] ">{item.headline}</p>
                    <p className="subsidiary-desc type-body text-[#080f12]/80 ">{item.intro}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
