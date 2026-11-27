"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { X, CheckCircle2 } from "lucide-react";

export type RequestKind = "demo" | "brochure";

export interface RequestModalParams {
  kind: RequestKind;
  product?: string;
}

interface RequestModalContextValue {
  openRequest: (params: RequestModalParams) => void;
}

const RequestModalContext = createContext<RequestModalContextValue | null>(null);

export function useRequestModal() {
  return useContext(RequestModalContext);
}

export function detectRequestKind(label: unknown, href?: string): { kind: RequestKind; product?: string } | null {
  if (typeof label !== "string") return null;
  const text = label.trim().toLowerCase();
  let kind: RequestKind | null = null;
  if (text.includes("brochure")) kind = "brochure";
  else if (text.includes("demo")) kind = "demo";
  if (!kind) return null;

  let product: string | undefined;
  if (href && href.includes("?")) {
    try {
      const qs = new URLSearchParams(href.split("?")[1]);
      product = qs.get("product") ?? undefined;
    } catch {
      // ignore
    }
  }
  return { kind, product };
}

export function RequestModalProvider({ children }: { children: React.ReactNode }) {
  const [params, setParams] = useState<RequestModalParams | null>(null);

  return (
    <RequestModalContext.Provider value={{ openRequest: (p) => setParams(p) }}>
      {children}
      {params && <EnquiryModal params={params} onClose={() => setParams(null)} />}
    </RequestModalContext.Provider>
  );
}

function EnquiryModal({ params, onClose }: { params: RequestModalParams; onClose: () => void }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setFields({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: params.kind,
          product: params.product ?? "",
          fullName,
          email,
          company,
          phone,
          message,
          website,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        fields?: Record<string, string>;
      };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Unable to submit request.");
        if (data.fields) setFields(data.fields);
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Network error while submitting. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const isBrochure = params.kind === "brochure";
  const title = isBrochure ? "Request Brochure" : "Request a Demo";
  const inputCls =
    "w-full bg-[#f5f6f6] border border-[#d5dadc] rounded-[4px] px-3.5 py-2.5 text-[14px] text-[#080f12] placeholder:text-[#7f8a91] focus:outline-none focus:border-[#e22328]";
  const labelCls = "block font-mono text-[11px] uppercase tracking-wider text-[#47494a] mb-1.5";

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 transition-opacity duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="request-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`relative w-full max-w-[520px] max-h-[90vh] overflow-y-auto bg-white text-[#080f12] border border-[#d5dadc] rounded-[4px] p-6 sm:p-8 shadow-2xl transition-[transform,opacity] duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${
          mounted ? "opacity-100 scale-100" : "opacity-0 scale-[0.96]"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close request modal"
          className="absolute top-4 right-4 p-2 text-[#47494a] hover:text-[#080f12] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-6 flex flex-col items-start gap-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            <h2 id="request-modal-title" className="type-h3 text-[#080f12]">
              Request Received
            </h2>
            <p className="type-body text-[#47494a]">
              Thank you. Our team has received your {isBrochure ? "brochure" : "demo"} request and will respond shortly.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 inline-flex items-center justify-center bg-[#e22328] hover:bg-[#b81b20] text-white text-[14px] font-medium px-5 py-2.5 rounded-[4px] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#e22328] mb-1">
              Rayonix Defence Technologies
            </p>
            <h2 id="request-modal-title" className="type-h3 text-[#080f12] pr-8">
              {title}
            </h2>
            {params.product && (
              <p className="type-small text-[#47494a] mt-1">System: {params.product}</p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5" noValidate>
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="req-name" className={labelCls}>
                    Full Name *
                  </label>
                  <input
                    id="req-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Aarav Sharma"
                    className={inputCls}
                  />
                  {fields.fullName && <p className="text-[12px] text-[#e22328] mt-1">{fields.fullName}</p>}
                </div>
                <div>
                  <label htmlFor="req-email" className={labelCls}>
                    Work Email *
                  </label>
                  <input
                    id="req-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@organisation.com"
                    className={inputCls}
                  />
                  {fields.email && <p className="text-[12px] text-[#e22328] mt-1">{fields.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="req-company" className={labelCls}>
                    Organisation
                  </label>
                  <input
                    id="req-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Organisation / Unit"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="req-phone" className={labelCls}>
                    Phone
                  </label>
                  <input
                    id="req-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 ..."
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="req-msg" className={labelCls}>
                  Requirements / Notes
                </label>
                <textarea
                  id="req-msg"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share operational context, timeline, or questions..."
                  className={inputCls}
                />
              </div>

              {error && (
                <p className="text-[13px] text-[#e22328] bg-[#e22328]/10 border border-[#e22328]/30 rounded-[4px] px-3 py-2">
                  {error}
                </p>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-[14px] font-medium text-[#47494a] hover:text-[#080f12] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center bg-[#e22328] hover:bg-[#b81b20] text-white text-[14px] font-medium px-5 py-2.5 rounded-[4px] transition-colors disabled:opacity-50"
                >
                  {submitting ? "Sending…" : isBrochure ? "Send Request" : "Request Demo"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
