import React from "react";
import Image from "next/image";
import Link from "next/link";
import TransformingHeading from "@/components/ui/TransformingHeading";
import type { Breadcrumb, ProductPageContent } from "@/content/products/types";

const TITLE_SIZES = {
  display: "text-6xl sm:text-8xl lg:text-[128px] font-bold text-[#f5f6f6] tracking-tight leading-none",
  long: "text-5xl sm:text-7xl lg:text-[104px] font-bold text-[#f5f6f6] tracking-tight leading-[1.05]",
  extended: "text-4xl sm:text-6xl lg:text-[72px] font-bold text-[#f5f6f6] tracking-tight leading-[1.1]",
} as const;

// Spec strip columns by spec count (literal strings so Tailwind keeps them).
const SPEC_GRID: Record<number, string> = {
  4: "grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 sm:grid-cols-3",
};

interface ProductHeroProps {
  hero: ProductPageContent["hero"];
  breadcrumbs: Breadcrumb[];
}

export default function ProductHero({ hero, breadcrumbs }: ProductHeroProps) {
  const { specs } = hero;
  const lastSpanFull = specs.length % 2 === 1;

  return (
    <section
      className="relative w-full bg-[#080f12] text-[#f5f6f6] pt-28 sm:pt-32 pb-16 lg:pb-20"
      aria-label={hero.ariaLabel}
      data-node-id="480:4633"
    >
      <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 flex flex-col gap-10 lg:gap-12">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm font-medium text-[#7f8a91]"
          data-node-id="486:5632"
        >
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <span className="text-[#7f8a91]" aria-hidden="true">
                    /
                  </span>
                )}
                {isLast ? (
                  <span className="text-[#e22328]" aria-current="page">
                    {crumb.label}
                  </span>
                ) : crumb.linked ? (
                  <Link
                    href={crumb.href}
                    className="text-[#bdc4c8] hover:text-white transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#bdc4c8]">{crumb.label}</span>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Display Title and Intro */}
        <div className="flex flex-col gap-6 lg:gap-8 max-w-[1230px]">
          <TransformingHeading
            as="h1"
            text={hero.title}
            className={TITLE_SIZES[hero.titleSize ?? "display"]}
          />

          <div className="flex flex-col gap-3">
            <h2 className="text-xl sm:text-2xl lg:text-[24px] font-medium text-[#e22328] leading-[32px]">
              {hero.eyebrow}
            </h2>
            <p className="text-base sm:text-lg lg:text-[18px] text-[#bdc4c8] font-normal leading-[28px] max-w-[1176px]">
              {hero.intro}
            </p>
          </div>
        </div>

        {/* Tactical Sensor Render Enclosure */}
        <div
          className="relative w-full h-[380px] sm:h-[500px] lg:h-[635px] rounded-[8px] overflow-hidden border border-[#253035] bg-[#080f12] shadow-2xl group"
          data-node-id="527:1192"
        >
          {hero.image ? (
            /* Main Hero Image (the page's only priority image) */
            <div className="absolute inset-0 pointer-events-none">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
              />
              {/* Atmospheric overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080f12]/80 via-transparent to-transparent pointer-events-none" />
            </div>
          ) : (
            /* Placeholder until a hero visual is supplied: tactical grid panel */
            <div
              className="absolute inset-0 pointer-events-none bg-[#10181c]"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(189,196,200,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(189,196,200,0.06) 1px, transparent 1px), radial-gradient(ellipse at center, rgba(226,35,40,0.08), transparent 60%)",
                backgroundSize: "48px 48px, 48px 48px, 100% 100%",
              }}
            />
          )}

          {hero.hud && (
            <>
              {/* HUD Top Left: Coordinates */}
              <div
                className="absolute top-4 sm:top-5 left-4 sm:left-5 z-10 flex items-center gap-2 select-none pointer-events-none"
                data-node-id="527:1207"
              >
                <span className="text-[#e22328] text-xs font-mono font-bold">+</span>
                <span className="text-[#bdc4c8] text-[11px] font-mono tracking-[1.1px]">
                  {hero.hud.coordinates}
                </span>
              </div>

              {/* HUD Top Right: Hardware Spec Badge */}
              <div
                className="absolute top-4 sm:top-5 right-4 sm:right-5 z-10 backdrop-blur-[6px] bg-[#080f12]/90 border border-[#253035] px-3.5 py-1.5 rounded-[4px] select-none pointer-events-none"
                data-node-id="527:1211"
              >
                <span className="text-[#bdc4c8] text-[11px] font-mono tracking-[1.1px]">
                  {hero.hud.badge}
                </span>
              </div>
            </>
          )}

          {/* Corner Alignment Reticles */}
          <div
            className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#e22328] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#e22328] pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Floating Specification Strip */}
        <div
          className={`grid ${SPEC_GRID[specs.length] ?? SPEC_GRID[5]} gap-3 sm:gap-4 w-full`}
          data-node-id="527:1216"
        >
          {specs.map((spec, idx) => (
            <div
              key={idx}
              className={`relative bg-[#10181c] border border-[#253035] rounded-[4px] p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-md transition-all duration-300 hover:border-[#38464d] ${
                lastSpanFull && idx === specs.length - 1 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              {/* Left Accent Bar */}
              <div
                className={`absolute top-0 bottom-0 left-0 w-1 ${
                  spec.accent ? "bg-[#e22328]" : "bg-[#253035]"
                }`}
                aria-hidden="true"
              />

              <div className="flex flex-col gap-1 pl-1">
                <span className="text-xl sm:text-3xl lg:text-[30px] font-normal text-[#f5f6f6] tracking-tight leading-tight [overflow-wrap:anywhere]">
                  {/* allow a line break after "/" in long values (e.g. Pixels/Second) */}
                  {spec.value.split("/").map((part, i, all) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < all.length - 1 && (
                        <>
                          /<wbr />
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </span>
                <span className="text-xs sm:text-sm lg:text-[15px] font-normal text-[#7f8a91] leading-snug">
                  {spec.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
