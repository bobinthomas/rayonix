/**
 * Contact form validation, shared by the browser form and /api/contact
 * so both sides apply exactly the same rules.
 */
import { isContactSubject, type ContactSubject } from "@/content/site";

export type ContactPayload = {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  linkedin: string;
  subject: ContactSubject | "";
  product: string;
  message: string;
  consent: boolean;
  /** Honeypot: must stay empty. */
  website?: string;
  /** Cloudflare Turnstile token (only when Turnstile is configured). */
  turnstileToken?: string;
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** International format: leading +, then 7 to 15 digits (spaces, dashes, brackets allowed). */
const PHONE_RE = /^\+[\d\s()-]{7,20}$/;
const SLUG_RE = /^[a-z0-9-]{1,80}$/;

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Coerce unknown JSON into a clean payload (trims, caps lengths). */
export function normaliseContact(input: unknown): ContactPayload {
  const o = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const subject = str(o.subject, 40);
  const product = str(o.product, 80).toLowerCase();
  return {
    fullName: str(o.fullName, 120),
    email: str(o.email, 200).toLowerCase(),
    company: str(o.company, 200),
    phone: str(o.phone, 30),
    linkedin: str(o.linkedin, 300),
    subject: isContactSubject(subject) ? subject : "",
    product: SLUG_RE.test(product) ? product : "",
    message: str(o.message, 5000),
    consent: o.consent === true,
    website: str(o.website, 200),
    turnstileToken: str(o.turnstileToken, 4096),
  };
}

export function validateContact(p: ContactPayload): ContactErrors {
  const e: ContactErrors = {};
  const careers = p.subject === "careers";

  if (!p.fullName) e.fullName = "Please enter your full name.";
  if (!p.email) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(p.email)) e.email = "Please enter a valid email address.";
  if (!careers && !p.company) e.company = "Please enter your company or organisation.";
  if (p.phone) {
    const digits = p.phone.replace(/\D/g, "");
    if (!PHONE_RE.test(p.phone) || digits.length < 7 || digits.length > 15) {
      e.phone = "Please include the country code, for example +91 89397 92592.";
    }
  }
  if (p.linkedin) {
    try {
      const u = new URL(p.linkedin);
      if (u.protocol !== "https:" && u.protocol !== "http:") throw new Error();
    } catch {
      e.linkedin = "Please enter a full URL, for example https://www.linkedin.com/in/your-name.";
    }
  }
  if (!p.subject) e.subject = "Please choose a subject.";
  if (!p.message) e.message = "Please tell us how we can help.";
  else if (p.message.length < 10) e.message = "Please add a little more detail (at least 10 characters).";
  if (!p.consent) e.consent = "Please confirm you agree to the privacy policy.";
  return e;
}
