import React from "react";
import Image from "next/image";
import Link from "next/link";
import CTAButton from "@/components/ui/CTAButton";
import TransformingHeading from "@/components/ui/TransformingHeading";
import type { SolutionItem, SolutionPageContent } from "@/content/solutions/types";
import { buildSolutionJsonLd } from "./solutionSeo";

/**
 * Solutions page template (Figma 838:703 "Rayonix / Solutions / Template · ICCS").
 * Hero → Key Capabilities (light) → Applications (dark) → [Value Proposition] → CTA panel.
 */

const pad = (n: number) => String(n).padStart(2, "0");

/** Figma rule: 4 = 2+2, 5 = 3+2, 6 = 3+3, 7 = 4+3; otherwise rows of 3. */
function capabilityRows(n: number): number[] {
  if (n === 4) return [2, 2];
  if (n === 7) return [4, 3];
  const rows: number[] = [];
  for (let left = n; left > 0; left -= 3) rows.push(Math.min(3, left));
  return rows;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] sm:text-[14px] font-medium leading-[20px] tracking-[1.12px] uppercase text-[#e22328]">
      {children}
    </p>
  );
}

function CapabilityCard({ item, index }: { item: SolutionItem; index: number }) {
  return (
    <div
      className="bg-white border border-[#dde2e8] rounded-[4px] p-6 sm:p-8 flex flex-col gap-8 lg:gap-14 lg:flex-1 lg:min-w-0"
      data-name="Solution / Capability card"
    >
      <div className="flex items-center gap-4">
        <span className="text-[14px] font-medium leading-[20px] text-[#e22328]">{pad(index)}</span>
        <span className="flex-1 h-px bg-[#dde2e8]" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-[20px] sm:text-[24px] font-medium leading-[28px] sm:leading-[32px] text-[#080f12]">
          {item.title}
        </h3>
        <p className="text-[16px] font-normal leading-[24px] text-[#475569]">{item.body}</p>
      </div>
    </div>
  );
}

function ApplicationCard({
  item,
  index,
  fullRow,
}: {
  item: SolutionItem;
  index: number;
  fullRow: boolean;
}) {
  return (
    <div
      className={`bg-[#080f12] border border-[#253035] p-6 sm:p-8 lg:p-12 flex flex-col justify-between gap-12 lg:min-h-[360px] ${
        fullRow ? "sm:col-span-2" : ""
      }`}
      data-name="Solution / Application card"
    >
      <div className="flex items-center justify-between">
        <span className="text-[13px] sm:text-[14px] font-medium leading-[20px] tracking-[1.12px] text-[#bdc4c8]">
          Application / {pad(index)}
        </span>
        <Image src="/assets/solutions/indicator.svg" alt="" width={9} height={9} aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-[24px] sm:text-[28px] lg:text-[32px] font-normal leading-[32px] lg:leading-[40px] text-[#f5f6f6]">
          {item.title}
        </h3>
        <p className="text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[28px] text-[#bdc4c8]">
          {item.body}
        </p>
      </div>
    </div>
  );
}

export default function SolutionPage({ content }: { content: SolutionPageContent }) {
  const { hero, capabilities, applications, valueProposition, cta } = content;
  const rows = capabilityRows(capabilities.items.length);
  const oddApps = applications.items.length % 2 === 1;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSolutionJsonLd(content)) }}
      />
      <main className="relative w-full min-h-screen bg-[#080f12]">
        {/* 01 · Hero */}
        <section
          className="relative w-full bg-[#080f12] text-[#f5f6f6] pt-28 sm:pt-32 pb-16 lg:pb-24"
          aria-label={`${content.name} overview`}
          data-node-id="838:708"
        >
          <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 flex flex-col gap-10 lg:gap-16">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm font-medium" data-node-id="838:712">
              <Link href="/" className="text-[#bdc4c8] hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-[#7f8a91]" aria-hidden="true">/</span>
              <Link href="/solutions" className="text-[#bdc4c8] hover:text-white transition-colors">
                Solutions
              </Link>
              <span className="text-[#7f8a91]" aria-hidden="true">/</span>
              <span className="text-[#bdc4c8]">{content.category}</span>
              <span className="text-[#7f8a91]" aria-hidden="true">/</span>
              <span className="text-[#e22328]" aria-current="page">
                {content.name}
              </span>
            </nav>

            <div className="flex flex-col gap-6 pt-1" data-node-id="838:713">
              <Eyebrow>{hero.eyebrow}</Eyebrow>
              <TransformingHeading
                as="h1"
                text={hero.headline.join("\n")}
                className="max-w-[1100px] text-[36px] sm:text-5xl lg:text-[64px] font-bold leading-[1.15] lg:leading-[72px] text-[#f5f6f6]"
              />
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12">
                <p className="max-w-[820px] text-[16px] sm:text-[18px] font-normal leading-[26px] sm:leading-[28px] text-[#bdc4c8]">
                  {hero.intro}
                </p>
                <div className="shrink-0 lg:pt-4">
                  <CTAButton href={hero.cta.href} variant="secondary">
                    {hero.cta.label}
                  </CTAButton>
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div
              className="relative w-full h-[260px] sm:h-[420px] lg:h-[635px] rounded-[8px] overflow-hidden border border-[#253035] bg-[#10181c]"
              data-node-id="838:718"
            >
              {hero.image ? (
                <Image
                  src={hero.image.src}
                  alt={hero.image.alt}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover object-center"
                />
              ) : (
                <div
                  className="absolute inset-0"
                  aria-hidden="true"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(189,196,200,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(189,196,200,0.06) 1px, transparent 1px), radial-gradient(ellipse at center, rgba(226,35,40,0.08), transparent 60%)",
                    backgroundSize: "48px 48px, 48px 48px, 100% 100%",
                  }}
                />
              )}
              <div className="absolute top-4 sm:top-5 left-4 z-10 hidden sm:flex items-center gap-2 select-none pointer-events-none">
                <span className="text-[#e22328] text-[11px] font-mono">+</span>
                <span className="text-[#bdc4c8] text-[11px] font-mono tracking-[1.1px]">
                  LAT 33.4241° N // LON 111.9281° W
                </span>
              </div>
              <div className="absolute top-4 sm:top-5 right-4 z-10 backdrop-blur-[4px] bg-[#080f12]/90 border border-[#253035] px-3 py-1 select-none pointer-events-none max-w-[calc(100%-2rem)]">
                <span className="block truncate text-[#bdc4c8] text-[11px] font-mono tracking-[1.1px]">
                  {hero.badge}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 size-4 border-b-2 border-l-2 border-[#e22328] pointer-events-none" aria-hidden="true" />
              <div className="absolute bottom-4 right-4 size-4 border-b-2 border-r-2 border-[#e22328] pointer-events-none" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* 02 · Key Capabilities */}
        <section
          className="relative w-full bg-[#f4f5f7] text-[#080f12] py-16 lg:py-24"
          aria-label="Key capabilities"
          data-node-id="838:817"
        >
          <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 flex flex-col gap-10 lg:gap-14">
            <div className="flex flex-col gap-3 pt-2">
              <Eyebrow>Key Capabilities</Eyebrow>
              <h2 className="text-3xl sm:text-5xl lg:text-[48px] font-medium leading-tight lg:leading-[56px] text-[#080f12]">
                {capabilities.heading}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:flex lg:flex-col" data-node-id="840:775">
              {rows.map((count, rowIdx) => {
                const start = rows.slice(0, rowIdx).reduce((a, b) => a + b, 0);
                return (
                  <div key={rowIdx} className="contents lg:flex lg:gap-6 lg:items-stretch">
                    {capabilities.items.slice(start, start + count).map((item, i) => (
                      <CapabilityCard key={item.title} item={item} index={start + i + 1} />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 03 · Applications */}
        <section
          className="relative w-full bg-[#080f12] border-t border-[#253035] text-[#f5f6f6] py-16 lg:py-24"
          aria-label="Applications"
          data-node-id="838:846"
        >
          <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 flex flex-col gap-10 lg:gap-[104px]">
            <div className="flex flex-col gap-3">
              <Eyebrow>Applications</Eyebrow>
              <h2 className="text-3xl sm:text-5xl lg:text-[48px] font-medium leading-tight lg:leading-[56px] text-[#f5f6f6]">
                {applications.heading}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-node-id="838:860">
              {applications.items.map((item, idx) => (
                <ApplicationCard
                  key={item.title}
                  item={item}
                  index={idx + 1}
                  fullRow={oddApps && idx === applications.items.length - 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Optional · Value Proposition (not in the Figma template; styled to match) */}
        {valueProposition && (
          <section
            className="relative w-full bg-[#080f12] border-t border-[#253035] text-[#f5f6f6] py-16 lg:py-24"
            aria-label="Value proposition"
          >
            <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 flex flex-col gap-10 lg:gap-14">
              <div className="flex flex-col gap-3">
                <Eyebrow>Value Proposition</Eyebrow>
                <h2 className="text-3xl sm:text-5xl lg:text-[48px] font-medium leading-tight lg:leading-[56px] text-[#f5f6f6]">
                  {valueProposition.heading}
                </h2>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                {valueProposition.items.map((item) => (
                  <li key={item.title} className="border-l-2 border-[#e22328] pl-5 flex flex-col gap-2">
                    <h3 className="text-[20px] sm:text-[24px] font-medium leading-[28px] sm:leading-[32px] text-[#f5f6f6]">
                      {item.title}
                    </h3>
                    <p className="text-[16px] lg:text-[18px] leading-[24px] lg:leading-[28px] text-[#bdc4c8]">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* 04 · Call to Action */}
        <section
          className="relative w-full bg-[#080f12] pt-8 pb-20 lg:pb-28"
          aria-label="Call to action"
          data-node-id="840:844"
        >
          <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8">
            <div
              className="relative overflow-hidden bg-[#10181c] border border-[#253035] rounded-[8px] p-6 sm:p-12 lg:p-[72px] flex flex-col gap-6"
              data-node-id="840:845"
            >
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#e22328]" aria-hidden="true" />
              <h2 className="max-w-[1100px] text-3xl sm:text-5xl lg:text-[48px] font-medium leading-tight lg:leading-[56px] text-[#f5f6f6]">
                {cta.heading}
              </h2>
              <p className="max-w-[860px] text-[16px] sm:text-[18px] leading-[26px] sm:leading-[28px] text-[#bdc4c8]">
                {cta.text}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <CTAButton href={cta.primary.href} variant="primary">
                  {cta.primary.label}
                </CTAButton>
                {cta.secondary && (
                  <CTAButton href={cta.secondary.href} variant="secondary">
                    {cta.secondary.label}
                  </CTAButton>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
