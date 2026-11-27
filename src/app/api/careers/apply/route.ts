import { NextRequest, NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/cms/store";

export const runtime = "edge";

const CAREERS_RECIPIENT = "hr@rayonix.com";
const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_EXTENSIONS = /\.(pdf|doc|docx)$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

function arrayBufferToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  const chunkSize = 0x8000;
  let binary = "";
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const slice = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...slice);
  }
  return btoa(binary);
}

/**
 * POST /api/careers/apply
 *
 * Accepts multipart/form-data with candidate details and a resume file.
 * Sends email with attachment to hr@rayonix.com via Resend ONLY in production
 * when RESEND_API_KEY is configured; in development/testing, logs the
 * application without emailing hr@rayonix.com.
 */
export async function POST(request: NextRequest) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: "Invalid form submission." }, 400);
  }

  const str = (key: string) => {
    const v = form.get(key);
    return typeof v === "string" ? v.trim() : "";
  };

  // Honeypot
  if (str("website")) return json({ ok: true });

  const roleTitle = str("roleTitle") || "General Application";
  const team = str("team");
  const location = str("location");
  const fullName = str("fullName");
  const email = str("email");
  const phone = str("phone");
  const linkedin = str("linkedin");
  const coverNote = str("coverNote");
  const resume = form.get("resume");

  const fields: Record<string, string> = {};
  if (!fullName) fields.fullName = "Full name is required.";
  if (!email || !EMAIL_RE.test(email)) fields.email = "Valid email address is required.";

  if (!(resume instanceof File) || resume.size === 0) {
    fields.resume = "Please upload your resume (PDF, DOC, or DOCX).";
  } else if (!ALLOWED_EXTENSIONS.test(resume.name)) {
    fields.resume = "Resume must be a PDF, DOC, or DOCX file.";
  } else if (resume.size > MAX_RESUME_BYTES) {
    fields.resume = "Resume file must be 5 MB or smaller.";
  }

  if (Object.keys(fields).length > 0) {
    return json({ ok: false, error: "Please check the highlighted fields.", fields }, 422);
  }

  const file = resume as File;
  const settings = await getSiteSettings();
  const recipient = process.env.CAREERS_TO || settings.careersEmail || CAREERS_RECIPIENT;
  const text = [
    `Role: ${roleTitle}`,
    team ? `Team: ${team}` : null,
    location ? `Location: ${location}` : null,
    `Candidate: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone || "-"}`,
    `LinkedIn / Portfolio: ${linkedin || "-"}`,
    `Resume: ${file.name} (${Math.round(file.size / 1024)} KB)`,
    "",
    coverNote || "(No cover note provided)",
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  const resendApiKey = process.env.RESEND_API_KEY;
  const isProd = process.env.NODE_ENV === "production";

  // Do not send real emails to hr@rayonix.com while testing / in local dev.
  if (!isProd || !resendApiKey) {
    console.log(
      `[careers/apply] test/dev mode — email suppressed (would send to ${recipient})\n${text}`
    );
    return json({ ok: true, mode: "logged" });
  }

  try {
    const base64Resume = arrayBufferToBase64(await file.arrayBuffer());
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
        subject: `Career Application: ${roleTitle} — ${fullName}`,
        text,
        attachments: [
          {
            filename: file.name,
            content: base64Resume,
          },
        ],
      }),
    });

    if (!res.ok) {
      console.error("[careers/apply] Resend error", res.status, await res.text());
      return json(
        { ok: false, error: "We could not submit your application. Please try again later." },
        502
      );
    }
  } catch (err) {
    console.error("[careers/apply] Resend request failed:", err);
    return json(
      { ok: false, error: "We could not submit your application. Please try again later." },
      502
    );
  }

  return json({ ok: true, mode: "sent" });
}
