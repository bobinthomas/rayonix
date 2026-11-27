import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { getSiteSettings, updateSiteSettings } from "@/lib/cms/store";
import type { SiteSettings } from "@/lib/cms/types";

export const runtime = "edge";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  const settings = await getSiteSettings();
  return NextResponse.json({ settings });
}

export async function PUT(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const body = (await request.json()) as Partial<SiteSettings>;
    const settings = await updateSiteSettings(body);
    revalidatePath("/", "layout");
    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json({ error: "Invalid settings payload." }, { status: 400 });
  }
}
