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
      <div className="max-w-[1408px] mx-auto px-6 sm:px-12 lg:px-[64px] pt-[48px] pb-8 flex flex-col gap-10">
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
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a3adb2] hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <div className="relative w-4 h-4">
                    <Image
                      src="/assets/linkedin-icon.svg"
                      alt="LinkedIn"
                      fill
                      className="object-contain"
                    />
                  </div>
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
      <div className="w-full bg-[#e22328] py-3 px-6 sm:px-12 lg:px-[64px]">
        <div className="max-w-[1408px] mx-auto w-full flex flex-col sm:flex-row items-center justify-between text-[12px] font-normal text-white gap-2">
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
