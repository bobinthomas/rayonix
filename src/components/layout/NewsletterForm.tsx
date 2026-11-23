"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "submitting") return;

    setStatus("submitting");
    setFeedback("Subscribing...");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, honeypot }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("success");
        setFeedback("Thank you for subscribing to Rayonix insights.");
        setEmail("");
      } else {
        setStatus("error");
        setFeedback(data.error || "Unable to subscribe. Please try again.");
      }
    } catch {
      setStatus("error");
      setFeedback("Network error. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="type-body text-[#a3acb1]">
        Subscribe for Rayonix Update, Insights &amp; News.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full max-w-[880px] h-[54px] bg-white rounded-[4px] px-5 shadow-sm focus-within:ring-2 focus-within:ring-[#e22328]"
        noValidate
      >
        {/* Honeypot field for bot spam prevention */}
        <div className="sr-only" aria-hidden="true">
          <input
            type="text"
            name="company_title"
            tabIndex={-1}
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            autoComplete="off"
          />
        </div>

        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="Email address"
          aria-label="Email address"
          required
          disabled={status === "submitting"}
          className="flex-1 type-body text-[#080f12] placeholder-[#808080] bg-transparent focus:outline-none disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={status === "submitting"}
          className="p-1 hover:opacity-80 transition-opacity disabled:opacity-50 cursor-pointer"
          aria-label="Subscribe to newsletter"
        >
          <Image
            src="/assets/arrow-send.svg"
            alt=""
            width={20}
            height={20}
            aria-hidden="true"
          />
        </button>
      </form>

      {/* Live region for accessibility announcement of form state */}
      <div
        aria-live="polite"
        className={`type-caption min-h-[20px] transition-opacity duration-200 ${
          status === "success"
            ? "text-green-400 opacity-100"
            : status === "error"
            ? "text-[#f0494d] opacity-100"
            : status === "submitting"
            ? "text-[#a3acb1] opacity-100"
            : "opacity-0"
        }`}
      >
        {feedback}
      </div>
    </div>
  );
}
