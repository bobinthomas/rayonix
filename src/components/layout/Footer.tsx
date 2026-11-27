"use client";

import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "./NewsletterForm";
import { FOOTER_BRAND, FOOTER_COLUMNS, FOOTER_LEGAL } from "@/content/footer";
import { CLOSING_BRAND_LINE, CONTACT, COPYRIGHT, GLOBAL_PRESENCE, OFFICES } from "@/content/site";

const FLAG_SRC: Record<string, string> = {
  india: "/assets/flag-india.svg",
  australia: "/assets/flag-australia.svg",
};

export default function Footer({
  social,
}: {
  social?: { linkedinUrl?: string; xUrl?: string; youtubeUrl?: string; instagramUrl?: string };
} = {}) {
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
            <p className="type-body text-[#a3adb2]">{FOOTER_BRAND.tagline}</p>
            <p className="pt-6 type-body-lg text-[#f5f6f6] max-w-[284px]">{FOOTER_BRAND.line}</p>
          </div>

          {/* Right Section: Newsletter + Navigation Links */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* Newsletter matching Figma node 640:4177 */}
            <NewsletterForm />

            <div className="h-px w-full bg-[#b8bfc2]/40" />

            {/* Navigation Columns matching Figma node 640:4096 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {FOOTER_COLUMNS.map((col) => (
                <nav key={col.heading} aria-label={col.heading} className="flex flex-col gap-3.5">
                  <p className="type-body-lg text-[#f5f6f6]">{col.heading}</p>
                  {col.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      prefetch={false}
                      className="type-body text-[#a3adb2] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e22328] rounded-[2px]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              ))}

              {/* Connect Column */}
              <div className="flex flex-col gap-3.5">
                <p className="type-body-lg text-[#f5f6f6]">Connect</p>
                <div className="flex items-center gap-4">
                  <a
                    href={social?.linkedinUrl || CONTACT.linkedin}
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
                  {social?.xUrl && (
                    <a
                      href={social.xUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="type-small text-[#f5f6f6] hover:text-[#e22328] transition-colors"
                      aria-label="X"
                    >
                      X
                    </a>
                  )}
                  {social?.youtubeUrl && (
                    <a
                      href={social.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="type-small text-[#f5f6f6] hover:text-[#e22328] transition-colors"
                      aria-label="YouTube"
                    >
                      YouTube
                    </a>
                  )}
                  {social?.instagramUrl && (
                    <a
                      href={social.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="type-small text-[#f5f6f6] hover:text-[#e22328] transition-colors"
                      aria-label="Instagram"
                    >
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider matching Figma node 640:4114 */}
        <div className="h-px w-full bg-[#b8bfc2]/40" />

        {/* Global Presence matching Figma node 640:4116 */}
        <div className="flex flex-col gap-8 pt-4">
          <div className="space-y-1">
            <h2 className="type-h3 text-[#f5f6f6] ">{GLOBAL_PRESENCE.heading}</h2>
            <p className="type-body-lg text-[#f5f6f6] ">{GLOBAL_PRESENCE.subheading}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            {OFFICES.map((office) => (
              <div key={office.id} className="flex items-start gap-4">
                <div className="relative w-[46px] h-[30px] shrink-0 mt-1">
                  <Image src={FLAG_SRC[office.id]} alt="" width={46} height={30} className="object-contain" />
                </div>
                <div className="flex flex-col gap-1 type-body">
                  <p className="type-body-lg text-[#bdbdbd] ">
                    {office.region} | {office.role}
                  </p>
                  <p className="type-small font-medium text-[#a3acb1] ">{office.entity}</p>
                  {office.cities && <p className="type-small font-medium text-[#a3acb1] ">{office.cities}</p>}
                  <address className="not-italic text-[#a3acb1] font-normal pt-1 leading-[24px]">
                    {office.address}
                    {office.phone && (
                      <>
                        <br />
                        Phone:{" "}
                        <a href={office.phone.href} className="hover:text-white underline-offset-4 hover:underline">
                          {office.phone.display}
                        </a>
                      </>
                    )}
                    <br />
                    Email:{" "}
                    <a href={`mailto:${office.email}`} className="hover:text-white underline-offset-4 hover:underline">
                      {office.email}
                    </a>
                  </address>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Giant RAYONIX Wordmark Watermark matching Figma node 640:4174 */}
        <div className="relative w-full h-[180px] sm:h-[260px] lg:h-[361px] my-6 flex items-center justify-center opacity-70 pointer-events-none">
          <Image
            src="/assets/rayonix-wordmark.svg"
            alt=""
            width={1200}
            height={361}
            className="w-auto h-auto max-w-full max-h-full object-contain object-center"
          />
        </div>
      </div>

      {/* Red Legal Strip matching Figma node 640:4183 */}
      <div className="w-full bg-[#e22328] py-3">
        <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between type-caption text-white gap-2">
          <p>{COPYRIGHT}</p>
          <div className="flex items-center gap-6">
            {FOOTER_LEGAL.map((link) => (
              <Link key={link.href} href={link.href} prefetch={false} className="hover:underline">
                {link.label}
              </Link>
            ))}
          </div>
          <p>{CLOSING_BRAND_LINE}</p>
        </div>
      </div>
    </footer>
  );
}
