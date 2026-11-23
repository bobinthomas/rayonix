import { coverage } from "@/content/company/coverage";
import { formatNewsDate } from "@/content/company/newsroom";

/** Third-party press coverage cards. Each card links out to the publisher. */
export default function PressCoverage() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 list-none p-0 m-0">
      {coverage.map((item) => (
        <li key={item.id} className="flex">
          <article className="flex flex-col justify-between gap-5 w-full bg-[#10181c] border border-[#253035] rounded-[4px] p-6 shadow-md">
            <div className="flex flex-col gap-3">
              <p className="type-caption text-[#7f8a91]">
                <span className="text-[#e22328]">{item.source}</span>
                {" · "}
                <time dateTime={item.date}>{formatNewsDate(item.date)}</time>
              </p>
              <h3 className="type-body-lg text-[#f5f6f6] line-clamp-3">{item.title}</h3>
            </div>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="type-caption font-medium text-[#f5f6f6] hover:text-[#e22328] transition-colors"
            >
              Read in {item.source} →
            </a>
          </article>
        </li>
      ))}
    </ul>
  );
}
