import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { revalidateCmsSection } from "@/lib/cms/revalidate";
import { createNews, listNews, type NewsInput } from "@/lib/cms/store";

export const runtime = "edge";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  const items = await listNews();
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const body = (await request.json()) as Partial<NewsInput>;
    const slug = (body.slug ?? "").trim().toLowerCase();
    const title = (body.title ?? "").trim();
    const category = (body.category ?? "DEFENCE TECHNOLOGY").trim();
    const kind = body.kind === "coverage" ? "coverage" : "announcement";

    if (!slug || !title) {
      return NextResponse.json({ error: "Slug and title are required." }, { status: 400 });
    }

    const summary = Array.isArray(body.summary)
      ? body.summary.map((s) => s.trim()).filter(Boolean)
      : [];

    const created = await createNews({
      slug,
      kind,
      published: Boolean(body.published),
      homepage: Boolean(body.homepage),
      category,
      date: body.date?.trim() || null,
      title,
      summary,
      coverageUrl: body.coverageUrl ?? null,
      source: body.source?.trim() || undefined,
      buttons: Array.isArray(body.buttons) ? body.buttons : [],
      image: body.image?.src ? { src: body.image.src.trim(), alt: body.image.alt?.trim() || title } : undefined,
      article:
        kind === "announcement"
          ? {
              body: body.article?.body?.length ? body.article.body : null,
              sourceLink: body.article?.sourceLink,
              related: body.article?.related ?? [],
            }
          : undefined,
      sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : 0,
    });

    revalidateCmsSection("news", created.slug);
    return NextResponse.json({ item: created }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to create story." }, { status: 400 });
  }
}
