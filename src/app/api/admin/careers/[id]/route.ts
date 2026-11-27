import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { revalidateCmsSection } from "@/lib/cms/revalidate";
import { deleteCareerRole, updateCareerRole, type CareerRoleInput } from "@/lib/cms/store";

export const runtime = "edge";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const numId = Number(id);
  if (!Number.isInteger(numId) || numId <= 0) {
    return NextResponse.json({ error: "Invalid role id." }, { status: 400 });
  }

  try {
    const body = (await request.json()) as Partial<CareerRoleInput>;
    const updated = await updateCareerRole(numId, body);
    if (!updated) return NextResponse.json({ error: "Role not found." }, { status: 404 });
    revalidateCmsSection("careers");
    return NextResponse.json({ item: updated });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to update role." }, { status: 400 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const numId = Number(id);
  if (!Number.isInteger(numId) || numId <= 0) {
    return NextResponse.json({ error: "Invalid role id." }, { status: 400 });
  }

  const deleted = await deleteCareerRole(numId);
  if (!deleted) return NextResponse.json({ error: "Role not found." }, { status: 404 });
  revalidateCmsSection("careers");
  return NextResponse.json({ ok: true });
}
