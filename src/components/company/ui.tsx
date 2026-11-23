import React from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Link from "next/link";
import TransformingHeading from "@/components/ui/TransformingHeading";

/**
 * Shared building blocks for the Company pages (About, X Labs, Newsroom).
 * Figma: 553:4239 (X Labs), 556:6457 (About), 556:7661 (Newsroom).
 */

export type Crumb = { label: string; href?: string };

/** Figma "Breadcrumb" component: ancestors link, last item is aria-current. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 type-small font-medium">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <React.Fragment key={item.label}>
            {i > 0 && (
              <span className="text-[#7f8a91]" aria-hidden="true">
                /
              </span>
            )}
            {last ? (
              <span className="p-1 text-[#e22328]" aria-current="page">
                {item.label}
              </span>
            ) : item.href ? (
              <Link href={item.href} className="p-1 text-[#bdc4c8] hover:text-white transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="p-1 text-[#bdc4c8]">{item.label}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

/**
 * Dark page hero: breadcrumb, optional sub-nav, h1 and intro.
 * `introBeside` puts the intro in a right-hand column (About, Newsroom); otherwise it sits below (X Labs).
 */
export function CompanyHero({
  crumbs,
  title,
  intro,
  introBeside = false,
  subnav,
  children,
  ariaLabel,
}: {
  crumbs: Crumb[];
  title: string;
  intro: string;
  introBeside?: boolean;
  subnav?: React.ReactNode;
  children?: React.ReactNode;
  ariaLabel: string;
}) {
  const heading = (
    <TransformingHeading
      as="h1"
      text={title}
      className="type-hero text-[#f5f6f6]"
    />
  );
  const introText = (
    <p className="type-body-lg text-[#bdc4c8]">{intro}</p>
  );

  return (
    <section
      className="relative w-full bg-[#080f12] text-[#f5f6f6] pt-28 sm:pt-32 pb-12 lg:pb-16"
      aria-label={ariaLabel}
    >
      <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 flex flex-col gap-8 lg:gap-[34px]">
        <div className="flex flex-col gap-5">
          <Breadcrumb items={crumbs} />
          {subnav}
          {introBeside ? (
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-10">
              <div className="lg:flex-1 lg:min-w-0">{heading}</div>
              <div className="lg:w-[356px] lg:shrink-0 lg:pt-1">{introText}</div>
            </div>
          ) : (
            <>
              {heading}
              <div className="max-w-[1176px] pt-1">{introText}</div>
            </>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

/** Red L-shaped corner ticks around a framed visual. */
export function CornerTicks({ size = 16, inset = -4 }: { size?: number; inset?: number }) {
  const s = { width: size, height: size };
  const common = "absolute border-[#e22328] pointer-events-none";
  return (
    <>
      <span aria-hidden="true" className={`${common} border-l-2 border-t-2`} style={{ ...s, left: inset, top: inset }} />
      <span aria-hidden="true" className={`${common} border-r-2 border-t-2`} style={{ ...s, right: inset, top: inset }} />
      <span aria-hidden="true" className={`${common} border-l-2 border-b-2`} style={{ ...s, left: inset, bottom: inset }} />
      <span aria-hidden="true" className={`${common} border-r-2 border-b-2`} style={{ ...s, right: inset, bottom: inset }} />
    </>
  );
}

/** Small frosted HUD label used over images. */
export function HudBadge({
  children,
  dot = false,
  icon,
  tone = "default",
  className = "",
}: {
  children: React.ReactNode;
  dot?: boolean;
  /** 14px icon path shown before the label. */
  icon?: string;
  tone?: "default" | "muted" | "alert";
  className?: string;
}) {
  const border = tone === "alert" ? "border-[rgba(226,35,40,0.4)]" : "border-[#253035]";
  const text = tone === "muted" ? "text-[#bdc4c8]" : "text-[#f5f6f6]";
  return (
    <span
      className={`inline-flex items-center gap-2 max-w-full backdrop-blur-[12px] bg-[rgba(8,15,18,0.9)] border ${border} rounded-[2px] px-[13px] py-[5px] select-none pointer-events-none ${className}`}
    >
      {dot && <span className="size-[6px] shrink-0 rounded-full bg-[#e22328]" aria-hidden="true" />}
      {icon && <Image src={icon} alt="" width={14} height={14} aria-hidden="true" className="shrink-0" />}
      <span className={`truncate type-caption ${text}`}>{children}</span>
    </span>
  );
}

/** Tactical grid placeholder for visuals that have no image yet. */
export function GridPlaceholder() {
  return (
    <div
      className="absolute inset-0 bg-[#10181c]"
      aria-hidden="true"
      style={{
        backgroundImage:
          "linear-gradient(rgba(189,196,200,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(189,196,200,0.06) 1px, transparent 1px), radial-gradient(ellipse at center, rgba(226,35,40,0.08), transparent 60%)",
        backgroundSize: "48px 48px, 48px 48px, 100% 100%",
      }}
    />
  );
}

/** Section wrapper: light (#f4f5f7) or dark (#080f12) polarity, 80px vertical rhythm. */
export function CompanySection({
  tone,
  id,
  ariaLabel,
  children,
  className = "",
}: {
  tone: "light" | "dark";
  id?: string;
  ariaLabel: string;
  children: React.ReactNode;
  className?: string;
}) {
  const colours =
    tone === "light"
      ? "bg-[#f4f5f7] text-[#080f12]"
      : "bg-[#080f12] text-[#f5f6f6] border-t border-[#253035]";
  return (
    <section id={id} aria-label={ariaLabel} className={`relative w-full scroll-mt-24 py-16 lg:py-20 ${colours} ${className}`}>
      <Reveal className="max-w-[1280px] mx-auto w-full px-6 sm:px-8">{children}</Reveal>
    </section>
  );
}

/** Section heading + optional lead paragraph. */
export function SectionHeader({
  title,
  lead,
  tone,
}: {
  title: string;
  lead?: string;
  tone: "light" | "dark";
}) {
  return (
    <div className="flex flex-col gap-3">
      <h2
        className={`type-h2 ${
          tone === "light" ? "text-[#080f12]" : "text-[#f5f6f6]"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`max-w-[1180px] type-body-lg ${
            tone === "light" ? "text-[#2f3639]" : "text-[#7f8a91]"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

/** Red-dot bullet list (12px). */
export function DotList({ items, className = "text-[#bdc4c8]", gap = "gap-[10px]" }: { items: string[]; className?: string; gap?: string }) {
  return (
    <ul className={`flex flex-col ${gap}`}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <span className="size-[6px] shrink-0 rounded-full bg-[#e22328]" aria-hidden="true" />
          <span className={`type-caption ${className}`}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Text link with the red arrow (Figma "Read article", "View product", …). */
export function ArrowLink({
  href,
  children,
  bold = false,
  solid = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  bold?: boolean;
  /** Filled arrow (X Labs cards) instead of the stroked one (Newsroom, About). */
  solid?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={`group inline-flex items-center gap-[6px] type-cta text-[#e22328] ${
        bold ? "font-bold" : ""
      } ${className}`}
    >
      <span className="group-hover:underline underline-offset-4">{children}</span>
      <Image
        src={solid ? "/assets/company/icon-arrow-solid-red.svg" : "/assets/company/icon-arrow-right-red.svg"}
        alt=""
        width={16}
        height={16}
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
}
