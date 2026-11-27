import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompanyHero, CompanySection } from "@/components/company/ui";
import { formatBlogMonth } from "@/content/company/blog";
import { getPublishedBlogPostBySlug } from "@/lib/cms";

export const runtime = "edge";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    // Kept noindex until the client approves the go-live.
    robots: { index: false, follow: true },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="relative w-full min-h-screen bg-[#080f12]">
      <CompanyHero
        ariaLabel={post.title}
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Article" }]}
        title={post.title}
        intro={formatBlogMonth(post.date)}
      >
        <span className="sr-only">Blog article</span>
      </CompanyHero>

      <CompanySection tone="dark" ariaLabel="Article text">
        <article className="max-w-[760px] flex flex-col gap-6 type-body-lg text-[#bdc4c8]">
          {post.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </article>
      </CompanySection>
    </main>
  );
}
