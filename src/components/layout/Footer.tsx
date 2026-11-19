"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="relative w-full bg-[#253035] text-[#f5f6f6]"
      aria-label="Rayonix Footer"
      data-node-id="640:4087"
    >
      <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 pt-[48px] pb-8 flex flex-col gap-10">
        {/* Upper Footer: Brand info & Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-10">
          {/* Left Brand Column matching Figma node 640:4088 */}
          <div className="lg:col-span-4 flex flex-col items-start gap-2">
            <Link href="/" aria-label="Rayonix Home">
              <div className="relative w-[180px] h-[54px]">
                <Image
                  src="/assets/rayonix-logo.svg"
                  alt="Rayonix"
                  width={180}
                  height={54}
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-[16px] font-normal text-[#a3adb2]">
              Detect. Decide. Respond.
            </p>
            <p className="pt-6 text-[18px] font-normal text-[#f5f6f6] leading-[28px] max-w-[284px]">
              Technology built for what lies beyond the visible.
            </p>
          </div>

          {/* Right Section: Newsletter + Navigation Links */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* Newsletter matching Figma node 640:4177 */}
            <div className="flex flex-col gap-3">
              <p className="text-[16px] font-normal text-[#808080]">
                Subscribe for Rayonix Update, Insights & News.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center w-full max-w-[880px] h-[54px] bg-white rounded-[4px] px-5 shadow-sm focus-within:ring-2 focus-within:ring-[#e22328]"
              >
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 text-[16px] text-[#080f12] placeholder-[#808080] bg-transparent focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="p-1 hover:opacity-80 transition-opacity"
                  aria-label="Subscribe"
                >
                  <Image
                    src="/assets/arrow-send.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </button>
              </form>
            </div>

            <div className="h-px w-full bg-[#b8bfc2]/40" />

            {/* Navigation Columns matching Figma node 640:4096 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {/* Explore Column */}
              <div className="flex flex-col gap-3.5">
                <p className="text-[18px] font-normal text-[#f5f6f6]">Explore</p>
                <Link
                  href="/solutions"
                  prefetch={false}
                  className="text-[16px] text-[#a3adb2] hover:text-white transition-colors"
                >
                  Capabilities
                </Link>
                <Link
                  href="/solutions"
                  prefetch={false}
                  className="text-[16px] text-[#a3adb2] hover:text-white transition-colors"
                >
                  Solutions
                </Link>
                <Link
                  href="/subsurface/detect/gpr"
                  prefetch={false}
                  className="text-[16px] text-[#a3adb2] hover:text-white transition-colors"
                >
                  Platforms
                </Link>
                <Link
                  href="/ecosystem"
                  prefetch={false}
                  className="text-[16px] text-[#a3adb2] hover:text-white transition-colors"
                >
                  Technologies
                </Link>
              </div>

              {/* Company Column */}
              <div className="flex flex-col gap-3.5">
                <p className="text-[18px] font-normal text-[#f5f6f6]">Company</p>
                <Link
                  href="/about"
                  prefetch={false}
                  className="text-[16px] text-[#a3adb2] hover:text-white transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/news"
                  prefetch={false}
                  className="text-[16px] text-[#a3adb2] hover:text-white transition-colors"
                >
                  Newsroom
                </Link>
                <a
                  href="mailto:info@rayonix.in?subject=Business%20enquiry"
                  className="text-[16px] text-[#a3adb2] hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </div>

              {/* Connect Column */}
              <div className="flex flex-col gap-3.5">
                <p className="text-[18px] font-normal text-[#f5f6f6]">Connect</p>
                <a
                  href="https://linkedin.com/company/rayonix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f5f6f6] hover:text-[#e22328] transition-colors inline-flex items-center"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider matching Figma node 640:4114 */}
        <div className="h-px w-full bg-[#b8bfc2]/40" />

        {/* Global Presence matching Figma node 640:4116 */}
        <div className="flex flex-col gap-8 pt-4">
          <div className="space-y-1">
            <h3 className="text-[24px] font-medium text-[#f5f6f6] leading-[32px]">
              Our Global Presence
            </h3>
            <p className="text-[18px] font-normal text-[#f5f6f6] leading-[28px]">
              Rooted in India. Connected to the World.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            {/* India Contact matching Figma node 640:4121 */}
            <div className="flex items-start gap-4">
              <div className="relative w-[46px] h-[30px] shrink-0 mt-1">
                <Image
                  src="/assets/flag-india.svg"
                  alt="India Flag"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col gap-1 text-[16px]">
                <p className="text-[18px] text-[#bdbdbd] font-normal leading-[28px]">
                  INDIA | Headquarters
                </p>
                <p className="text-[14px] text-[#808080] font-medium">
                  Rayonix Tech Private Limited
                </p>
                <p className="text-[14px] text-[#808080] font-medium">
                  Delhi - Hyderabad - Mumbai - Chennai - Bangalore
                </p>
                <p className="text-[#808080] font-normal pt-1 leading-[24px]">
                  HO. : Plot 89, 4th Floor, Sector 44, Gurugram - 122003
                  <br />
                  Phone: +91 89397 92592
                  <br />
                  Email: info@rayonix.in
                </p>
              </div>
            </div>

            {/* Australia Contact matching Figma node 640:4157 */}
            <div className="flex items-start gap-4">
              <div className="relative w-[46px] h-[30px] shrink-0 mt-1">
                <Image
                  src="/assets/flag-australia.svg"
                  alt="Australia Flag"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col gap-1 text-[16px]">
                <p className="text-[18px] text-[#bdbdbd] font-normal leading-[28px]">
                  AUSTRALIA | Global Presence
                </p>
                <p className="text-[14px] text-[#808080] font-medium">
                  Rayonix Australia Pty Ltd
                </p>
                <p className="text-[#808080] font-normal pt-1 leading-[24px]">
                  PO Box 4021, Carlton,
                  <br />
                  NSW 2218, Australia
                  <br />
                  Phone: +91 000-0000-
                  <br />
                  Email: info@rayonix.au
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Giant RAYONIX Wordmark Watermark matching Figma node 640:4174 */}
        <div className="relative w-full h-[180px] sm:h-[260px] lg:h-[361px] my-6 flex items-center justify-center opacity-70 pointer-events-none">
          <Image
            src="/assets/rayonix-wordmark.svg"
            alt="RAYONIX"
            fill
            className="object-contain object-center"
          />
        </div>
      </div>

      {/* Red Legal Strip matching Figma node 640:4183 */}
      <div className="w-full bg-[#e22328] py-3">
        <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between text-[12px] font-normal text-white gap-2">
          <p>© 2026 Rayonix Tech Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" prefetch={false} className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" prefetch={false} className="hover:underline">
              Terms of Use
            </Link>
          </div>
          <p>Invisible Warfare. Visible Impact.</p>
        </div>
      </div>
    </footer>
  );
}
