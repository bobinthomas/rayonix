import { NextRequest, NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/cms/store";

export const runtime = "edge";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "Invalid request payload." }, 400);
  }

  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim() : "");

  // Honeypot
  if (str("website")) return json({ ok: true });

  const kind = str("kind") === "brochure" ? "brochure" : "demo";
  const product = str("product");
  const fullName = str("fullName");
  const email = str("email");
  const company = str("company");
  const phone = str("phone");
  const message = str("message");

  const fields: Record<string, string> = {};
  if (!fullName) fields.fullName = "Full name is required.";
  if (!email || !EMAIL_RE.test(email)) fields.email = "Valid email address is required.";

  if (Object.keys(fields).length > 0) {
    return json({ ok: false, error: "Please check the highlighted fields.", fields }, 422);
  }

  const settings = await getSiteSettings();
  const recipient =
    kind === "brochure"
      ? settings.brochureEmail || settings.contactEmail || "info@rayonix.in"
      : settings.demoEmail || settings.contactEmail || "info@rayonix.in";

  const label = kind === "brochure" ? "Brochure Request" : "Demo Request";
  const text = [
    `Type: ${label}`,
    product ? `Product / Solution: ${product}` : null,
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Company / Organisation: ${company || "-"}`,
    `Phone: ${phone || "-"}`,
    "",
    message || "(No additional notes)",
  ]
    .filter((l): l is string => l !== null)
    .join("\n");

  const resendApiKey = process.env.RESEND_API_KEY;
  if (process.env.NODE_ENV !== "production" || !resendApiKey) {
    console.log(`[enquiries] test/dev mode — email suppressed (would send to ${recipient})\n${text}`);
    return json({ ok: true, mode: "logged" });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || "website@rayonix.in",
        to: recipient,
        reply_to: email,
        subject: `${label}${product ? `: ${product}` : ""} — ${fullName}`,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[enquiries] Resend error", res.status, await res.text());
      return json({ ok: false, error: "Unable to send request. Please try again later." }, 502);
    }
  } catch (err) {
    console.error("[enquiries] Resend failed:", err);
    return json({ ok: false, error: "Unable to send request. Please try again later." }, 502);
  }

  return json({ ok: true, mode: "sent" });
}
