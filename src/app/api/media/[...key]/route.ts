import { NextRequest, NextResponse } from "next/server";
import { getR2 } from "@/lib/cms/env";
import { getMediaAsset } from "@/lib/cms/store";

export const runtime = "edge";

type Ctx = { params: Promise<{ key: string[] }> };

function base64ToUint8Array(b64: string): Uint8Array {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    bytes[i] = bin.charCodeAt(i);
  }
  return bytes;
}

export async function GET(_request: NextRequest, { params }: Ctx) {
  const { key } = await params;

  // Serve Free-Plan D1 media: /api/media/d1/<id>
  if (key[0] === "d1" && key[1]) {
    const id = Number(key[1]);
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ error: "Invalid media id" }, { status: 400 });
    }
    const asset = await getMediaAsset(id);
    if (!asset) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const bytes = base64ToUint8Array(asset.dataBase64);
    return new NextResponse(bytes.buffer as ArrayBuffer, {
      headers: {
        "Content-Type": asset.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  const bucket = getR2();
  if (!bucket) {
    return NextResponse.json({ error: "Media bucket not configured" }, { status: 404 });
  }

  const objectKey = key.join("/");
  const obj = await bucket.get(objectKey);
  if (!obj) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  return new NextResponse(obj.body as BodyInit, { headers });
}
