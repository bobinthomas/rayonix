"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CTAButton from "@/components/ui/CTAButton";
import { CONTACT_FIELDS, CONTACT_PAGE } from "@/content/contact";
import { CONTACT, CONTACT_SUBJECTS, isContactSubject } from "@/content/site";
import {
  normaliseContact,
  validateContact,
  type ContactErrors,
  type ContactPayload,
} from "@/lib/contact-validation";

/** Public Turnstile site key, inlined at build time. Without it the widget is skipped. */
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

type Status = "idle" | "submitting" | "success" | "error";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

const EMPTY: ContactPayload = {
  fullName: "",
  email: "",
  company: "",
  phone: "",
  linkedin: "",
  subject: "",
  product: "",
  message: "",
  consent: false,
  website: "",
};

const inputBase =
  "w-full bg-[#080f12] border rounded-[4px] px-4 py-3 type-body text-[#f5f6f6] placeholder-[#7f8a91] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e22328] disabled:opacity-60";

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="type-small font-medium text-[#f5f6f6]">
        {label}
        {required && (
          <span className="text-[#e22328]" aria-hidden="true">
            {" "}*
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="type-caption text-[#7f8a91]">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="type-caption text-[#ff6b6f]">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const params = useSearchParams();
  const [values, setValues] = useState<ContactPayload>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [token, setToken] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const statusRef = useRef<HTMLDivElement>(null);

  // Preselect subject and product from ?subject= and ?product=.
  useEffect(() => {
    const subject = params.get("subject");
    const product = params.get("product");
    setValues((v) => ({
      ...v,
      subject: isContactSubject(subject) ? subject : v.subject,
      product: product && /^[a-z0-9-]{1,80}$/.test(product) ? product : v.product,
    }));
  }, [params]);

  // Load Turnstile only when a site key is configured.
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileRef.current) return;
    const render = () => {
      if (!window.turnstile || !turnstileRef.current || widgetId.current) return;
      widgetId.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "dark",
        callback: (t: string) => setToken(t),
        "expired-callback": () => setToken(""),
      });
    };
    if (window.turnstile) {
      render();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = render;
    document.head.appendChild(script);
  }, []);

  const careers = values.subject === "careers";

  const set = <K extends keyof ContactPayload>(key: K, value: ContactPayload[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    if (status === "error" || status === "success") setStatus("idle");
  };

  const describedBy = (id: keyof ContactPayload, hint = false) =>
    errors[id] ? `${id}-error` : hint ? `${id}-hint` : undefined;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    const payload = normaliseContact({ ...values, turnstileToken: token });
    const found = validateContact(payload);
    if (Object.keys(found).length) {
      setErrors(found);
      // Move focus to the first invalid field.
      const first = Object.keys(found)[0];
      document.getElementById(first)?.focus();
      return;
    }
    if (TURNSTILE_SITE_KEY && !token) {
      setServerError("Please complete the verification check.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fields?: ContactErrors;
      };
      if (res.ok && data.ok) {
        setStatus("success");
        setValues({ ...EMPTY, subject: values.subject, product: values.product });
        setErrors({});
      } else {
        if (data.fields) setErrors(data.fields);
        setServerError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setServerError("We could not reach the server. Please check your connection and try again.");
      setStatus("error");
    } finally {
      if (TURNSTILE_SITE_KEY && window.turnstile) {
        window.turnstile.reset(widgetId.current);
        setToken("");
      }
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  };

  const border = (k: keyof ContactPayload) => (errors[k] ? "border-[#ff6b6f]" : "border-[#253035] focus:border-[#bdc4c8]");
  const busy = status === "submitting";

  if (status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col gap-4 bg-[#10181c] border border-[#253035] rounded-[4px] p-6 sm:p-10 focus:outline-none"
      >
        <p className="type-eyebrow text-[#e22328]">Enquiry sent</p>
        <h2 className="type-h3 text-[#f5f6f6]">Thank you. We have received your enquiry.</h2>
        <p className="type-body text-[#bdc4c8]">
          Our team will be in touch shortly. For anything urgent, email{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-[#f5f6f6] underline underline-offset-4">
            {CONTACT.email}
          </a>
          .
        </p>
        <div>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="type-cta text-[#e22328] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e22328] rounded-[2px]"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-label="Enquiry form"
      className="flex flex-col gap-6 bg-[#10181c] border border-[#253035] rounded-[4px] p-6 sm:p-10"
    >
      {/* Honeypot: hidden from people and assistive tech. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>
      <input type="hidden" name="product" value={values.product} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id="fullName" label={CONTACT_FIELDS.fullName} required error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={!!errors.fullName}
            aria-describedby={describedBy("fullName")}
            value={values.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            disabled={busy}
            className={`${inputBase} ${border("fullName")}`}
          />
        </Field>

        <Field
          id="email"
          label={careers ? CONTACT_FIELDS.emailCareers : CONTACT_FIELDS.email}
          required
          error={errors.email}
        >
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            disabled={busy}
            className={`${inputBase} ${border("email")}`}
          />
        </Field>

        <Field id="company" label={CONTACT_FIELDS.company} required={!careers} error={errors.company}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            aria-required={!careers}
            aria-invalid={!!errors.company}
            aria-describedby={describedBy("company")}
            value={values.company}
            onChange={(e) => set("company", e.target.value)}
            disabled={busy}
            className={`${inputBase} ${border("company")}`}
          />
        </Field>

        <Field
          id="phone"
          label={`${CONTACT_FIELDS.phone} (Optional)`}
          error={errors.phone}
          hint="Include the country code, e.g. +91."
        >
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+91"
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone", true)}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            disabled={busy}
            className={`${inputBase} ${border("phone")}`}
          />
        </Field>

        <Field id="linkedin" label={CONTACT_FIELDS.linkedin} error={errors.linkedin}>
          <input
            id="linkedin"
            name="linkedin"
            type="url"
            autoComplete="url"
            placeholder="https://www.linkedin.com/in/"
            aria-invalid={!!errors.linkedin}
            aria-describedby={describedBy("linkedin")}
            value={values.linkedin}
            onChange={(e) => set("linkedin", e.target.value)}
            disabled={busy}
            className={`${inputBase} ${border("linkedin")}`}
          />
        </Field>

        <Field id="subject" label={CONTACT_FIELDS.subject} required error={errors.subject}>
          <select
            id="subject"
            name="subject"
            required
            aria-required="true"
            aria-invalid={!!errors.subject}
            aria-describedby={describedBy("subject")}
            value={values.subject}
            onChange={(e) => set("subject", e.target.value as ContactPayload["subject"])}
            disabled={busy}
            className={`${inputBase} ${border("subject")} appearance-none bg-[url('/assets/chevron-down.svg')] bg-no-repeat bg-[right_1rem_center] pr-10`}
          >
            <option value="" disabled>
              Choose a subject
            </option>
            {CONTACT_SUBJECTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label={CONTACT_FIELDS.message} required error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={describedBy("message")}
          placeholder={CONTACT_PAGE.messagePlaceholder}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          disabled={busy}
          className={`${inputBase} ${border("message")} resize-y min-h-[140px]`}
        />
      </Field>

      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            aria-required="true"
            aria-invalid={!!errors.consent}
            aria-describedby={describedBy("consent")}
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            disabled={busy}
            className="mt-1 size-4 shrink-0 accent-[#e22328] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e22328]"
          />
          <label htmlFor="consent" className="type-small text-[#bdc4c8]">
            {CONTACT_FIELDS.consent}{" "}
            <Link href="/privacy" className="text-[#f5f6f6] underline underline-offset-4 hover:text-[#e22328]">
              Privacy Policy
            </Link>
            .<span className="text-[#e22328]" aria-hidden="true"> *</span>
          </label>
        </div>
        {errors.consent && (
          <p id="consent-error" className="type-caption text-[#ff6b6f]">
            {errors.consent}
          </p>
        )}
      </div>

      {TURNSTILE_SITE_KEY && <div ref={turnstileRef} />}

      <div
        ref={statusRef}
        tabIndex={-1}
        role={status === "error" ? "alert" : undefined}
        aria-live="polite"
        className="focus:outline-none"
      >
        {status === "error" && serverError && (
          <p className="type-small text-[#ff6b6f]">
            {serverError} You can also email{" "}
            <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-4">
              {CONTACT.email}
            </a>
            .
          </p>
        )}
        {busy && <p className="type-small text-[#bdc4c8]">Sending…</p>}
      </div>

      <div>
        <CTAButton type="submit" variant="primary" disabled={busy} aria-label={busy ? "Sending enquiry" : undefined}>
          {busy ? "Sending…" : CONTACT_PAGE.submit}
        </CTAButton>
      </div>
    </form>
  );
}
