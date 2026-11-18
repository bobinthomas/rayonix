"use client";

import Link from "next/link";
import CTAButton from "@/components/ui/CTAButton";

const subsidiaries = [
  {
    name: "X Labs",
    description: "Inhouse - Research, innovation and technology development.",
    href: "/ecosystem/x-labs",
  },
  {
    name: "neXr Optronics",
    description: "Electro-optical systems manufacturing.",
    href: "/ecosystem/nexr-optronics",
  },
  {
    name: "Mcray Xtend",
    description: "Advanced UAV Manufacturing",
    href: "/ecosystem/mcray-xtend",
  },
];

export default function BeyondIntegrationSection() {
  return (
    <section
      className="relative w-full bg-[#f5f6f6] text-[#080f12] py-[80px] border-b border-[#bdbdbd]/53"
      aria-label="Beyond Integration Built for Defence"
      data-node-id="640:3938"
    >
      <div className="max-w-[1448px] mx-auto">
        {/* Editorial Statement Header matching Figma node 640:3939 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-6 sm:px-12 lg:px-[80px] pb-16">
          <div>
            <h2 className="text-4xl sm:text-6xl lg:text-[64px] font-bold text-[#080f12] leading-tight lg:leading-[72px]">
              Beyond Integration.
              <br />
              Built for <span className="text-[#7f8a91]">Defense</span>
              <span className="text-[#e22328]">.</span>
            </h2>
          </div>

          <div>
            <CTAButton href="/ecosystem" variant="primary">
              Discover our Xfactor
            </CTAButton>
          </div>
        </div>

        {/* 3 Full-Width Subsidiary Strips matching Figma node 640:3949 */}
        <div className="border-t border-[#a3adb2]">
          {subsidiaries.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              prefetch={false}
              className="subsidiary-strip group relative block h-[220px] sm:h-[250px] px-6 sm:px-12 lg:px-[80px] py-[28px] border-b border-[#a3adb2] overflow-hidden"
            >
              {/* Black fill that grows from bottom on hover — GPU-only transform */}
              <span
                className="subsidiary-fill absolute inset-0 bg-[#080f12] will-change-transform"
                aria-hidden="true"
              />

              {/* Content layer above the fill */}
              <div className="relative z-10 h-full flex flex-col justify-between">
                <h3 className="subsidiary-title text-4xl sm:text-6xl lg:text-[64px] font-bold text-[#7f8a91] leading-[72px]">
                  {item.name}
                </h3>
                <p className="subsidiary-desc text-lg sm:text-2xl lg:text-[24px] font-medium text-[#080f12] leading-[32px]">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
