import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { revalidateCmsSection } from "@/lib/cms/revalidate";
import { createCareerRole, listCareerRoles, type CareerRoleInput } from "@/lib/cms/store";

export const runtime = "edge";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  const items = await listCareerRoles();
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const body = (await request.json()) as Partial<CareerRoleInput>;
    const title = (body.title ?? "").trim();
    const team = (body.team ?? "").trim();
    const location = (body.location ?? "").trim();
    const type = (body.type ?? "Full-time").trim();
    const applyUrl = (body.applyUrl ?? "/contact?subject=careers").trim();

    if (!title || !team || !location) {
      return NextResponse.json({ error: "Title, team, and location are required." }, { status: 400 });
    }

    const created = await createCareerRole({
      title,
      team,
      location,
      type,
      description: body.description?.trim() || undefined,
      applyUrl,
      published: body.published !== false,
      sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : 0,
    });

    revalidateCmsSection("careers");
    return NextResponse.json({ item: created }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to create role." }, { status: 400 });
  }
}
