/**
 * Revalidation Webhook
 *
 * POST /api/revalidate
 * Body: { "tags": ["pages", "faqs", ...], "secret": "..." }
 *
 * Called by the CMS admin panel after content changes.
 * Purges specific tagged edge caches via Next.js on-demand revalidation.
 */

import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export const runtime = "edge";

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET || "dev-secret";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tags, paths, secret } = body as {
      tags?: string[];
      paths?: string[];
      secret?: string;
    };

    // Verify secret
    if (secret !== REVALIDATION_SECRET) {
      return NextResponse.json(
        { error: "Invalid revalidation secret" },
        { status: 401 }
      );
    }

    const revalidated: string[] = [];

    // Revalidate by cache tags
    if (tags && Array.isArray(tags)) {
      for (const tag of tags) {
        revalidateTag(tag);
        revalidated.push(`tag:${tag}`);
      }
    }

    // Revalidate by specific paths
    if (paths && Array.isArray(paths)) {
      for (const path of paths) {
        revalidatePath(path);
        revalidated.push(`path:${path}`);
      }
    }

    // Always revalidate sitemap and llms.txt on any content change
    revalidatePath("/sitemap.xml");
    revalidatePath("/llms.txt");
    revalidatePath("/llms-full.txt");

    return NextResponse.json({
      revalidated: true,
      items: revalidated,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Revalidation failed", details: String(error) },
      { status: 500 }
    );
  }
}
