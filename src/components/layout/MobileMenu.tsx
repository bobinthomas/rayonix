"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronDown } from "lucide-react";
import { megaMenuData, MegaMenuTab } from "./MegaMenu";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedTab, setExpandedTab] = useState<MegaMenuTab | null>(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const toggleTab = (tab: MegaMenuTab) => {
    setExpandedTab(expandedTab === tab ? null : tab);
  };

  const domainTabs: MegaMenuTab[] = ["subsurface", "surface", "aerial"];
  const otherTabs: MegaMenuTab[] = ["solutions", "company"];

  return (
    <div
      className="fixed inset-0 z-50 md:hidden bg-[#080f12]/95 backdrop-blur-[24px] flex flex-col justify-between anim-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
    >
      {/* Top Bar: same logo size, padding and centring as the page header, so the logo does not jump */}
      <div className="h-[80px] border-b border-[#253035]" style={{ borderInline: "1px solid transparent" }}>
        <div className="max-w-[1280px] mx-auto w-full h-full px-6 sm:px-8 flex items-center justify-between">
          <Link href="/" onClick={onClose} className="flex items-center" aria-label="Rayonix Home">
            <div className="relative w-[144px] h-[40px]">
              <Image
                src="/assets/rayonix-logo.svg"
                alt="Rayonix"
                width={144}
                height={40}
                className="object-contain"
              />
            </div>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#f5f6f6] hover:text-white focus:outline-none"
            aria-label="Close Mobile Menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Nav List with Expandable Mega Menu items */}
      <nav className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-[#253035]/60">
        {/* Operational Domains */}
        <div className="pb-6 space-y-2">
          <p className="type-eyebrow text-[#e22328] mb-3">
            Operational Domains
          </p>

          {domainTabs.map((tab) => {
            const data = megaMenuData[tab];
            const isExpanded = expandedTab === tab;
            return (
              <div key={tab} className="border-b border-white/5 pb-2">
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={`mobile-menu-section-${tab}`}
                  onClick={() => toggleTab(tab)}
                  className="w-full flex items-center justify-between py-2 type-body-lg font-medium text-[#f5f6f6] hover:text-[#e22328] transition-colors"
                >
                  <span className="capitalize">{data.title}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isExpanded ? "rotate-180 text-[#e22328]" : "text-[#7f8a91]"
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div id={`mobile-menu-section-${tab}`} className="pl-3 py-2 space-y-3 bg-[#10181c]/60 rounded-md my-1">
                    <p className="type-caption text-[#bdc4c8] ">
                      {data.subtitle}
                    </p>
                    <div className="space-y-3 pt-1">
                      {data.modes.map((mode) => (
                        <div key={mode.id} className="space-y-1.5">
                          <span className="type-eyebrow text-[#e22328] ">
                            {mode.label}
                          </span>
                          <div className="pl-2 space-y-2">
                            {mode.items.map((item) => (
                              <Link
                                key={item.title}
                                href={item.href}
                                prefetch={false}
                                onClick={onClose}
                                className="block type-small text-[#f5f6f6] hover:text-[#e22328]"
                              >
                                {item.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Solutions & Company */}
        <div className="py-6 space-y-2">
          <p className="type-eyebrow text-[#7f8a91] mb-3">
            Solutions & Company
          </p>

          {otherTabs.map((tab) => {
            const data = megaMenuData[tab];
            const isExpanded = expandedTab === tab;
            return (
              <div key={tab} className="border-b border-white/5 pb-2">
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={`mobile-menu-section-${tab}`}
                  onClick={() => toggleTab(tab)}
                  className="w-full flex items-center justify-between py-2 type-body-lg font-medium text-[#f5f6f6] hover:text-[#e22328] transition-colors"
                >
                  <span className="capitalize">{tab === "solutions" ? "Solutions" : "Company"}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isExpanded ? "rotate-180 text-[#e22328]" : "text-[#7f8a91]"
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div id={`mobile-menu-section-${tab}`} className="pl-3 py-2 space-y-3 bg-[#10181c]/60 rounded-md my-1">
                    <p className="type-caption text-[#bdc4c8] ">
                      {data.subtitle}
                    </p>
                    <div className="space-y-3 pt-1">
                      {data.modes.map((mode) => (
                        <div key={mode.id} className="space-y-1.5">
                          <span className="type-eyebrow text-[#e22328] ">
                            {mode.label}
                          </span>
                          <div className="pl-2 space-y-2">
                            {mode.items.map((item) => (
                              <Link
                                key={item.title}
                                href={item.href}
                                prefetch={false}
                                onClick={onClose}
                                className="block type-small text-[#f5f6f6] hover:text-[#e22328]"
                              >
                                {item.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Bottom CTA */}
      <div className="p-6 border-t border-[#253035] bg-[#10181c]">
        <Link
          href="/contact"
          onClick={onClose}
          className="w-full flex items-center justify-center px-6 py-3.5 type-cta text-white bg-[#e22328] hover:bg-[#c8171c] transition-colors rounded-[4px] shadow-sm"
        >
          Contact Our Command Team
        </Link>
        <p className="mt-3 text-center type-caption text-[#7f8a91]">
          IN(VISIBLE) WARFARE · Sovereign Defence Technology
        </p>
      </div>
    </div>
  );
}
