import { revalidatePath, revalidateTag } from "next/cache";

export type CmsSection = "news" | "blog" | "careers";

/**
 * Purges edge caches for a CMS section after an admin mutation.
 */
export function revalidateCmsSection(section: CmsSection, slug?: string) {
  revalidateTag(`cms:${section}`);

  if (section === "news") {
    revalidatePath("/");
    revalidatePath("/news");
    if (slug) revalidatePath(`/news/${slug}`);
  } else if (section === "blog") {
    revalidatePath("/blog");
    if (slug) revalidatePath(`/blog/${slug}`);
  } else if (section === "careers") {
    revalidatePath("/careers");
  }

  revalidatePath("/sitemap.xml");
  revalidatePath("/llms.txt");
  revalidatePath("/llms-full.txt");
}
