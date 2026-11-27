"use client";

import { useEffect, useState } from "react";
import { X, Upload, CheckCircle2 } from "lucide-react";
import type { Role } from "@/content/careers";

export default function CareerApplyList({ roles }: { roles: Role[] }) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  return (
    <>
      <ul className="flex flex-col border-t border-[#d5dadc]">
        {roles.map((role) => (
          <li
            key={`${role.title}-${role.location}`}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d5dadc] py-6"
          >
            <div className="flex flex-col gap-1">
              <h3 className="type-h3 text-[#080f12]">{role.title}</h3>
              <p className="type-small text-[#47494a]">
                {[role.team, role.location, role.type].filter(Boolean).join(" · ")}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedRole(role)}
              className="type-cta text-[#e22328] underline-offset-4 hover:underline text-left sm:text-right cursor-pointer"
            >
              Apply<span className="sr-only"> for {role.title}</span>
            </button>
          </li>
        ))}
      </ul>

      {selectedRole && (
        <ApplyModal role={selectedRole} onClose={() => setSelectedRole(null)} />
      )}
    </>
  );
}

function ApplyModal({ role, onClose }: { role: Role; onClose: () => void }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [website, setWebsite] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setFields({});
    setSubmitting(true);

    try {
      const fd = new FormData();
      fd.append("roleTitle", role.title);
      fd.append("team", role.team);
      fd.append("location", role.location);
      fd.append("fullName", fullName);
      fd.append("email", email);
      fd.append("phone", phone);
      fd.append("linkedin", linkedin);
      fd.append("coverNote", coverNote);
      fd.append("website", website);
      if (resume) fd.append("resume", resume);

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: fd,
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        fields?: Record<string, string>;
      };

      if (!res.ok || !data.ok) {
        setError(data.error ?? "Could not submit application.");
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

  const inputCls =
    "w-full bg-[#f5f6f6] border border-[#d5dadc] rounded-[4px] px-3.5 py-2.5 text-[14px] text-[#080f12] placeholder:text-[#7f8a91] focus:outline-none focus:border-[#e22328]";
  const labelCls = "block font-mono text-[11px] uppercase tracking-wider text-[#47494a] mb-1.5";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[560px] max-h-[90vh] overflow-y-auto bg-white text-[#080f12] border border-[#d5dadc] rounded-[4px] p-6 sm:p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close application modal"
          className="absolute top-4 right-4 p-2 text-[#47494a] hover:text-[#080f12] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-6 flex flex-col items-start gap-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            <h2 id="apply-modal-title" className="type-h3 text-[#080f12]">
              Application Received
            </h2>
            <p className="type-body text-[#47494a]">
              Thank you for applying for <strong>{role.title}</strong>. Our recruitment team will review your resume and get in touch.
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
              Apply for Position
            </p>
            <h2 id="apply-modal-title" className="type-h3 text-[#080f12] pr-8">
              {role.title}
            </h2>
            <p className="type-small text-[#47494a] mt-1 mb-6">
              {[role.team, role.location, role.type].filter(Boolean).join(" · ")}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              {/* Honeypot */}
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
                  <label htmlFor="apply-name" className={labelCls}>
                    Full Name *
                  </label>
                  <input
                    id="apply-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Aarav Sharma"
                    className={inputCls}
                  />
                  {fields.fullName && (
                    <p className="text-[12px] text-[#e22328] mt-1">{fields.fullName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="apply-email" className={labelCls}>
                    Email *
                  </label>
                  <input
                    id="apply-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={inputCls}
                  />
                  {fields.email && (
                    <p className="text-[12px] text-[#e22328] mt-1">{fields.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="apply-phone" className={labelCls}>
                    Phone
                  </label>
                  <input
                    id="apply-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98..."
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="apply-linkedin" className={labelCls}>
                    LinkedIn / Portfolio
                  </label>
                  <input
                    id="apply-linkedin"
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="apply-resume" className={labelCls}>
                  Resume / CV * (PDF, DOC, DOCX · Max 5 MB)
                </label>
                <label
                  htmlFor="apply-resume"
                  className="flex items-center justify-between gap-3 w-full bg-[#f5f6f6] border border-dashed border-[#9aa4aa] hover:border-[#e22328] rounded-[4px] px-4 py-3 cursor-pointer transition-colors"
                >
                  <span className="text-[13px] text-[#080f12] truncate">
                    {resume
                      ? `${resume.name} (${Math.max(1, Math.round(resume.size / 1024))} KB)`
                      : "Choose file to upload…"}
                  </span>
                  <Upload className="w-4 h-4 text-[#e22328] shrink-0" />
                  <input
                    id="apply-resume"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={(e) => setResume(e.target.files?.[0] ?? null)}
                    className="hidden"
                  />
                </label>
                {fields.resume && (
                  <p className="text-[12px] text-[#e22328] mt-1">{fields.resume}</p>
                )}
              </div>

              <div>
                <label htmlFor="apply-note" className={labelCls}>
                  Cover Note
                </label>
                <textarea
                  id="apply-note"
                  rows={3}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Briefly share relevant experience or projects..."
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
                  {submitting ? "Submitting…" : "Submit Application"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
