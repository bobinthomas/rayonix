import { NextRequest, NextResponse } from "next/server";
import { getR2 } from "@/lib/cms/env";

export const runtime = "edge";

type Ctx = { params: Promise<{ key: string[] }> };

export async function GET(_request: NextRequest, { params }: Ctx) {
  const bucket = getR2();
  if (!bucket) {
    return NextResponse.json({ error: "Media bucket not configured" }, { status: 404 });
  }

  const { key } = await params;
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
