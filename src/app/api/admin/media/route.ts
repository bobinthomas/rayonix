import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { getCmsEnv, getR2 } from "@/lib/cms/env";
import { saveMediaAsset } from "@/lib/cms/store";

export const runtime = "edge";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml"]);
const MAX_R2_BYTES = 5 * 1024 * 1024; // 5 MB for R2
const MAX_D1_BYTES = 500 * 1024; // 500 KB for Free-Plan D1

function arrayBufferToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  const chunkSize = 0x8000;
  let binary = "";
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file field." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Only JPEG, PNG, WebP, AVIF, and SVG images are supported." }, { status: 400 });
  }

  const bucket = getR2();
  if (bucket) {
    if (file.size > MAX_R2_BYTES) {
      return NextResponse.json({ error: "File exceeds 5 MB limit." }, { status: 400 });
    }
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
    const key = `cms/${Date.now()}-${safeName}`;
    await bucket.put(key, await file.arrayBuffer(), {
      httpMetadata: { contentType: file.type },
    });
    const baseUrl = getCmsEnv().R2_PUBLIC_URL?.replace(/\/$/, "") ?? "";
    const url = baseUrl ? `${baseUrl}/${key}` : `/api/media/${key}`;
    return NextResponse.json({ key, url, storage: "r2" }, { status: 201 });
  }

  // Free-Plan D1 fallback (<= 500 KB)
  if (file.size > MAX_D1_BYTES) {
    return NextResponse.json(
      { error: "Image exceeds 500 KB limit for Free-Plan D1 storage. Compress to WebP/JPEG <= 500 KB." },
      { status: 400 }
    );
  }

  const base64 = arrayBufferToBase64(await file.arrayBuffer());
  const saved = await saveMediaAsset({
    filename: file.name,
    contentType: file.type,
    sizeBytes: file.size,
    dataBase64: base64,
  });
  return NextResponse.json({ id: saved.id, url: saved.url, storage: "d1" }, { status: 201 });
}
