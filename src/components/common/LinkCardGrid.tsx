import Link from "next/link";

export type LinkCard = { title: string; description: string; href: string };

/** Grid of linked cards (title, description, arrow). Used by domain overviews and the Solutions hub. */
export default function LinkCardGrid({
  items,
  tone = "light",
  headingLevel = "h3",
}: {
  items: LinkCard[];
  tone?: "light" | "dark";
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  const card =
    tone === "light"
      ? "bg-white border-[#d5dadc] hover:border-[#e22328]"
      : "bg-[#10181c] border-[#253035] hover:border-[#e22328]/60";
  const title = tone === "light" ? "text-[#080f12]" : "text-[#f5f6f6]";
  const body = tone === "light" ? "text-[#47494a]" : "text-[#bdc4c8]";
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {items.map((item) => (
        <li key={item.href + item.title} className="flex">
          <Link
            href={item.href}
            prefetch={false}
            className={`group flex flex-col justify-between gap-6 w-full border rounded-[4px] p-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e22328] ${card}`}
          >
            <div className="flex flex-col gap-2">
              <H className={`type-h3 group-hover:text-[#e22328] transition-colors ${title}`}>{item.title}</H>
              <p className={`type-small ${body}`}>{item.description}</p>
            </div>
            <span className="type-cta text-[#e22328]" aria-hidden="true">
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
