import type { Metadata } from "next";
import Link from "next/link";
import { CompanyHero, CompanySection } from "@/components/company/ui";
import { blogPosts, formatBlogMonth } from "@/content/company/blog";

// Kept noindex until the client approves the go-live.
export const metadata: Metadata = {
  title: "Blog | Rayonix",
  description: "Articles from Rayonix on defence technology and partnerships.",
  alternates: { canonical: "/blog" },
  robots: { index: false, follow: true },
};

export default function BlogPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#080f12]">
      <CompanyHero
        ariaLabel="Blog"
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        title="Blog."
        intro="Articles from Rayonix."
      >
        <span className="sr-only">Blog</span>
      </CompanyHero>

      <CompanySection tone="dark" ariaLabel="Articles">
        <ul className="flex flex-col gap-6 list-none p-0 m-0">
          {blogPosts.map((post) => (
            <li key={post.slug}>
              <article className="flex flex-col gap-3 bg-[#10181c] border border-[#253035] rounded-[4px] p-6 sm:p-8">
                <p className="type-caption text-[#7f8a91]">
                  <time dateTime={post.date}>{formatBlogMonth(post.date)}</time>
                </p>
                <h2 className="type-h3 text-[#f5f6f6]">
                  <Link href={`/blog/${post.slug}`} className="hover:text-[#e22328] transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="type-body text-[#bdc4c8] line-clamp-3">{post.summary}</p>
                <Link href={`/blog/${post.slug}`} className="type-caption font-medium text-[#f5f6f6] hover:text-[#e22328] transition-colors">
                  Read article →
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </CompanySection>
    </main>
  );
}
