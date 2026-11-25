import Link from "next/link";
import type { Capability } from "@/content/capabilities";

/**
 * Capability chips.
 * - No links: plain text chip (no pointer).
 * - One link: the whole chip is the link.
 * - Several links: label plus compact links (e.g. "Surface · Aerial").
 */
export default function CapabilityChips({
  items,
  tone = "light",
  label,
}: {
  items: Capability[];
  tone?: "light" | "dark";
  /** Accessible name for the list. */
  label?: string;
}) {
  const chip =
    tone === "light"
      ? "border-[#d5dadc] bg-white text-[#080f12]"
      : "border-[#253035] bg-[#10181c] text-[#f5f6f6]";
  const linkChip =
    tone === "light"
      ? "hover:border-[#e22328] hover:text-[#e22328]"
      : "hover:border-[#e22328] hover:text-white";
  const sub = tone === "light" ? "text-[#7f8a91]" : "text-[#7f8a91]";

  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {items.map((c) => {
        const base = `inline-flex items-center gap-2 rounded-[2px] border px-3 py-1.5 type-small ${chip}`;
        if (c.links.length === 0) {
          return (
            <li key={c.label} className={`${base} cursor-default`}>
              {c.label}
            </li>
          );
        }
        if (c.links.length === 1) {
          return (
            <li key={c.label} className="flex">
              <Link
                href={c.links[0].href}
                prefetch={false}
                className={`${base} ${linkChip} transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e22328]`}
              >
                {c.label}
                <span aria-hidden="true" className="text-[#e22328]">
                  →
                </span>
              </Link>
            </li>
          );
        }
        return (
          <li key={c.label} className={`${base} flex-wrap`}>
            <span>{c.label}</span>
            <span className={`flex items-center gap-1.5 type-caption ${sub}`}>
              {c.links.map((l, i) => (
                <span key={l.href} className="flex items-center gap-1.5">
                  {i > 0 && <span aria-hidden="true">·</span>}
                  <Link
                    href={l.href}
                    prefetch={false}
                    aria-label={`${c.label}: ${l.label}`}
                    className="text-[#e22328] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e22328] rounded-[2px]"
                  >
                    {l.label}
                  </Link>
                </span>
              ))}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
