import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { getD1, getR2 } from "@/lib/cms/env";

export const runtime = "edge";

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  return NextResponse.json({
    authenticated,
    storage: getD1() ? "d1" : "memory",
    mediaBucket: Boolean(getR2()),
  });
}
