"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import MegaMenu, { MegaMenuTab } from "./MegaMenu";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaTab, setActiveMegaTab] = useState<MegaMenuTab | null>(null);
  const [displayTab, setDisplayTab] = useState<MegaMenuTab>("subsurface");
  const headerRef = useRef<HTMLDivElement>(null);
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabEnter = (tab: MegaMenuTab) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setDisplayTab(tab);
    setActiveMegaTab(tab);
  };

  const handleCloseMegaMenu = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = setTimeout(() => {
      setActiveMegaTab(null);
    }, 150);
  };

  const handleCancelClose = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  };

  const isMenuOpen = activeMegaTab !== null;

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isMenuOpen) {
        document.documentElement.classList.add("megamenu-open");
      } else {
        document.documentElement.classList.remove("megamenu-open");
      }
    }
    return () => {
      if (typeof document !== "undefined") {
        document.documentElement.classList.remove("megamenu-open");
      }
    };
  }, [isMenuOpen]);

  return (
    <>
      <div
        ref={headerRef}
        onMouseEnter={handleCancelClose}
        onMouseLeave={handleCloseMegaMenu}
        className={`fixed top-4 left-4 right-4 z-50 transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
          isScrolled ? "-translate-y-4" : "translate-y-0"
        }`}
      >
        {/* Persistent invariant-height Header (80px at all times: zero layout jump) */}
        <header
          className={`h-[80px] w-full flex items-center transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isMenuOpen
              ? "bg-[#10181c] border-b border-x border-[#253035]"
              : isScrolled
              ? "bg-[#080f12]/90 backdrop-blur-[20px] backdrop-saturate-[180%] border-b border-x border-[#253035]/60"
              : "bg-transparent border-b border-x border-transparent"
          }`}
        >
          <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 flex items-center justify-between">
            {/* 1. Left Section: Logo */}
            <div className="flex items-center min-w-[160px] lg:w-[220px]">
              <Link
                href="/"
                onClick={() => setActiveMegaTab(null)}
                className="flex items-center group focus:outline-none focus-visible:ring-1 focus-visible:ring-rayonix-accent"
                aria-label="Rayonix Home"
              >
                <div className="relative w-[144px] h-[40px]">
                  <Image
                    src="/assets/rayonix-logo.svg"
                    alt="Rayonix"
                    width={144}
                    height={40}
                    priority
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* 2. Middle / Center Section: Operational Domains */}
            <nav
              className="hidden md:flex flex-1 items-center justify-center gap-8 lg:gap-12 h-[80px]"
              aria-label="Domain Navigation"
            >
              {/* Sub Surface */}
              <div
                onMouseEnter={() => handleTabEnter("subsurface")}
                className={`relative flex items-center h-full cursor-pointer transition-all ${
                  activeMegaTab === "subsurface"
                    ? "border-b-[3px] border-[#e22328]"
                    : "border-b-[3px] border-transparent"
                }`}
              >
                <Link
                  href="/subsurface/detect/gpr"
                  prefetch={false}
                  className="inline-flex items-center gap-2 text-[14px] font-medium text-[#f5f6f6] hover:text-white transition-colors"
                >
                  <span>Sub Surface</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      activeMegaTab === "subsurface"
                        ? "rotate-180 text-[#e22328]"
                        : "text-[#f5f6f6]/70"
                    }`}
                  />
                </Link>
              </div>

              {/* Surface */}
              <div
                onMouseEnter={() => handleTabEnter("surface")}
                className={`relative flex items-center h-full cursor-pointer transition-all ${
                  activeMegaTab === "surface"
                    ? "border-b-[3px] border-[#e22328]"
                    : "border-b-[3px] border-transparent"
                }`}
              >
                <Link
                  href="/domains/surface"
                  prefetch={false}
                  className="inline-flex items-center gap-2 text-[14px] font-medium text-[#f5f6f6] hover:text-white transition-colors"
                >
                  <span>Surface</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      activeMegaTab === "surface"
                        ? "rotate-180 text-[#e22328]"
                        : "text-[#f5f6f6]/70"
                    }`}
                  />
                </Link>
              </div>

              {/* Aerial */}
              <div
                onMouseEnter={() => handleTabEnter("aerial")}
                className={`relative flex items-center h-full cursor-pointer transition-all ${
                  activeMegaTab === "aerial"
                    ? "border-b-[3px] border-[#e22328]"
                    : "border-b-[3px] border-transparent"
                }`}
              >
                <Link
                  href="/domains/aerial"
                  prefetch={false}
                  className="inline-flex items-center gap-2 text-[14px] font-medium text-[#f5f6f6] hover:text-white transition-colors"
                >
                  <span>Aerial</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      activeMegaTab === "aerial"
                        ? "rotate-180 text-[#e22328]"
                        : "text-[#f5f6f6]/70"
                    }`}
                  />
                </Link>
              </div>
            </nav>

            {/* 3. Right Section: Solutions & Company */}
            <div className="hidden md:flex items-center justify-end gap-8 lg:gap-10 min-w-[160px] lg:w-[220px] h-[80px]">
              {/* Solutions */}
              <div
                onMouseEnter={() => handleTabEnter("solutions")}
                className={`relative flex items-center h-full cursor-pointer transition-all ${
                  activeMegaTab === "solutions"
                    ? "border-b-[3px] border-[#e22328]"
                    : "border-b-[3px] border-transparent"
                }`}
              >
                <Link
                  href="/solutions"
                  prefetch={false}
                  className="inline-flex items-center gap-2 text-[14px] font-medium text-[#f5f6f6] hover:text-white transition-colors"
                >
                  <span>Solutions</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      activeMegaTab === "solutions"
                        ? "rotate-180 text-[#e22328]"
                        : "text-[#f5f6f6]/70"
                    }`}
                  />
                </Link>
              </div>

              {/* Company */}
              <div
                onMouseEnter={() => handleTabEnter("company")}
                className={`relative flex items-center h-full cursor-pointer transition-all ${
                  activeMegaTab === "company"
                    ? "border-b-[3px] border-[#e22328]"
                    : "border-b-[3px] border-transparent"
                }`}
              >
                <Link
                  href="/about"
                  prefetch={false}
                  className="inline-flex items-center gap-2 text-[14px] font-medium text-[#f5f6f6] hover:text-white transition-colors"
                >
                  <span>Company</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      activeMegaTab === "company"
                        ? "rotate-180 text-[#e22328]"
                        : "text-[#f5f6f6]/70"
                    }`}
                  />
                </Link>
              </div>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-white hover:text-rayonix-accent focus:outline-none"
                aria-label="Open Mobile Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Sigmoid Curtain Dropdown: Outer clipped container (overflow-hidden) */}
        <div
          onMouseEnter={handleCancelClose}
          className={`absolute top-full left-0 right-0 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isMenuOpen
              ? "opacity-100 visible pointer-events-auto"
              : "opacity-0 invisible pointer-events-none"
          }`}
          style={{ zIndex: 2100 }}
        >
          {/* Inner sliding container (translates from -100% to 0% like Sigmoid .dropdown-container) */}
          <div
            className={`w-full transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
              isMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <MegaMenu
              activeTab={displayTab}
              onClose={() => setActiveMegaTab(null)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
