"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/lib/cms/types";

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      className="relative px-6 sm:px-12 lg:px-[84px] py-24 bg-[#080f12] border-t border-[#253035]"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-rayonix-accent" />
            <span className="text-[12px] font-semibold tracking-label uppercase text-[#a3adb2]">
              07 / KNOWLEDGE & FREQUENT QUESTIONS
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-hero">
            Frequently Asked Questions
            <span className="text-rayonix-accent">.</span>
          </h2>

          <p className="mt-4 text-[#a3adb2] text-base sm:text-lg">
            Essential facts on Rayonix autonomous systems, global operations, and mission architectures.
          </p>
        </div>

        {/* FAQ Accordion Grid */}
        <div className="divide-y divide-[#253035] border-y border-[#253035]">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq.id} className="py-6 sm:py-8 transition-colors">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left gap-6 group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-xl sm:text-2xl font-medium text-white group-hover:text-rayonix-accent transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-[#253035] bg-[#10181c] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 border-rayonix-accent bg-rayonix-accent/10" : ""
                    }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-colors ${
                        isOpen ? "text-rayonix-accent" : "text-[#a3adb2]"
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 pr-12 text-base sm:text-lg text-[#bdc4c8] font-normal leading-relaxed animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Helpdesk Callout */}
        <div className="mt-12 text-sm text-[#7f8a91]">
          Have a specific defence or enterprise inquiry?{" "}
          <a
            href="mailto:info@rayonix.in"
            className="text-rayonix-accent hover:underline font-medium"
          >
            Contact our strategic operations team directly
          </a>
          .
        </div>
      </div>
    </section>
  );
}
