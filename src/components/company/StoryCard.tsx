import Image from "next/image";
import Link from "next/link";
import { formatNewsDate, storyHref, type NewsStory } from "@/content/news";

/** Newsroom card: announcements open their article page, coverage links out in a new tab. */
export default function StoryCard({
  story,
  headingLevel = "h3",
}: {
  story: NewsStory;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  const date = formatNewsDate(story.date);
  const main = storyHref(story);
  const buttons = story.buttons.length
    ? story.buttons
    : main
    ? [{ label: story.kind === "coverage" ? `Read in ${story.source ?? "the publication"}` : "Read the Announcement", href: main.href, external: main.external }]
    : [];

  return (
    <article className="h-full flex flex-col bg-white border border-[#d5dadc] rounded-[4px] overflow-hidden shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
      {story.image && (
        <div className="relative h-[200px] bg-[#10181c] shrink-0">
          <Image
            src={story.image.src}
            alt={story.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 405px"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex-1 flex flex-col justify-between gap-5 p-6">
        <div className="flex flex-col gap-2">
          <p className="type-caption text-[#e22328] font-medium">
            {story.kind === "coverage" ? "Media coverage" : "Announcement"}
            <span className="text-[#7f8a91]"> · {story.category}</span>
          </p>
          {date && (
            <time dateTime={story.date ?? undefined} className="type-caption text-[#7f8a91]">
              {date}
            </time>
          )}
          <H className="type-h3 text-[#080f12]">{story.title}</H>
          {story.summary.map((p) => (
            <p key={p} className="type-small text-[#47494a]">
              {p}
            </p>
          ))}
        </div>
        {buttons.length > 0 && (
          <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-[#f0f2f4] pt-5">
            {buttons.map((b) =>
              b.external ? (
                <a
                  key={b.href}
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-cta text-[#e22328] underline-offset-4 hover:underline"
                >
                  {b.label} <span aria-hidden="true">→</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <Link
                  key={b.href}
                  href={b.href}
                  prefetch={false}
                  className="type-cta text-[#e22328] underline-offset-4 hover:underline"
                >
                  {b.label} <span aria-hidden="true">→</span>
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </article>
  );
}
