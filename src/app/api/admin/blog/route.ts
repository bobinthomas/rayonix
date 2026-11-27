import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { revalidateCmsSection } from "@/lib/cms/revalidate";
import { createBlogPost, listBlogPosts, type BlogInput } from "@/lib/cms/store";

export const runtime = "edge";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  const items = await listBlogPosts();
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const body = (await request.json()) as Partial<BlogInput>;
    const slug = (body.slug ?? "").trim().toLowerCase();
    const title = (body.title ?? "").trim();
    const date = (body.date ?? new Date().toISOString().slice(0, 10)).trim();
    const summary = (body.summary ?? "").trim();
    const paragraphs = Array.isArray(body.body)
      ? body.body.map((p) => p.trim()).filter(Boolean)
      : [];

    if (!slug || !title || !summary) {
      return NextResponse.json({ error: "Slug, title, and summary are required." }, { status: 400 });
    }

    const created = await createBlogPost({
      slug,
      title,
      date,
      summary,
      body: paragraphs,
      coverImage: body.coverImage?.trim() || undefined,
      published: Boolean(body.published),
    });

    revalidateCmsSection("blog", created.slug);
    return NextResponse.json({ item: created }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to create post." }, { status: 400 });
  }
}
