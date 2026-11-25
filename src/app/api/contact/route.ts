import { NextRequest, NextResponse } from "next/server";
import { CONTACT, CONTACT_SUBJECTS } from "@/content/site";
import { normaliseContact, validateContact, type ContactPayload } from "@/lib/contact-validation";

export const runtime = "edge";

/**
 * POST /api/contact
 *
 * Validates an enquiry, verifies Cloudflare Turnstile when TURNSTILE_SECRET_KEY
 * is set, then emails it through Resend when RESEND_API_KEY is set. Without a
 * provider key the enquiry is logged (visible in Cloudflare Pages function logs),
 * matching how /api/newsletter behaves.
 *
 * Env vars: RESEND_API_KEY, CONTACT_TO (default info@rayonix.in),
 * CONTACT_FROM (default website@rayonix.in), TURNSTILE_SECRET_KEY.
 *
 * Responses: { ok: true } | { ok: false, error, fields? }
 */

const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

async function verifyTurnstile(token: string | undefined, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Not configured (local dev): skip.
  if (!token) return false;
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return false;
  }
}

function formatEnquiry(p: ContactPayload) {
  const subjectLabel = CONTACT_SUBJECTS.find((s) => s.value === p.subject)?.label ?? p.subject;
  const lines = [
    `Subject: ${subjectLabel}`,
    `Name: ${p.fullName}`,
    `Email: ${p.email}`,
    `Company / Organisation: ${p.company || "-"}`,
    `Phone: ${p.phone || "-"}`,
    `LinkedIn: ${p.linkedin || "-"}`,
    `Product: ${p.product || "-"}`,
    "",
    p.message,
  ];
  return { subjectLabel, text: lines.join("\n") };
}

export async function POST(request: NextRequest) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request body." }, 400);
  }

  const payload = normaliseContact(raw);

  // Honeypot filled in: pretend success so bots learn nothing.
  if (payload.website) return json({ ok: true });

  const fields = validateContact(payload);
  if (Object.keys(fields).length) {
    return json({ ok: false, error: "Please check the highlighted fields.", fields }, 422);
  }

  const ip = request.headers.get("cf-connecting-ip");
  if (!(await verifyTurnstile(payload.turnstileToken, ip))) {
    return json({ ok: false, error: "We could not verify you are human. Please try again." }, 403);
  }

  const { subjectLabel, text } = formatEnquiry(payload);
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    // No provider configured: keep the enquiry in the function logs.
    console.log("[contact] enquiry received (no RESEND_API_KEY set)\n" + text);
    return json({ ok: true });
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
        to: process.env.CONTACT_TO || CONTACT.recipient,
        reply_to: payload.email,
        subject: `Website enquiry: ${subjectLabel} (${payload.fullName})`,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text());
      console.log("[contact] undelivered enquiry\n" + text);
      return json({ ok: false, error: "We could not send your enquiry. Please try again or email us." }, 502);
    }
  } catch (err) {
    console.error("[contact] Resend request failed:", err);
    console.log("[contact] undelivered enquiry\n" + text);
    return json({ ok: false, error: "We could not send your enquiry. Please try again or email us." }, 502);
  }

  return json({ ok: true });
}
