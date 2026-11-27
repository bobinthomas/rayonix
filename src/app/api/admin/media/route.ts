import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { getCmsEnv, getR2 } from "@/lib/cms/env";

export const runtime = "edge";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml"]);
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const bucket = getR2();
  if (!bucket) {
    return NextResponse.json(
      { error: "R2 MEDIA_BUCKET is not bound in this environment. Paste an image URL or bind MEDIA_BUCKET in wrangler.toml." },
      { status: 501 }
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file field." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Only JPEG, PNG, WebP, AVIF, and SVG images are supported." }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File exceeds 5 MB limit." }, { status: 400 });
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
  const key = `cms/${Date.now()}-${safeName}`;
  await bucket.put(key, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type },
  });

  const baseUrl = getCmsEnv().R2_PUBLIC_URL?.replace(/\/$/, "") ?? "";
  const url = baseUrl ? `${baseUrl}/${key}` : `/api/media/${key}`;
  return NextResponse.json({ key, url }, { status: 201 });
}
