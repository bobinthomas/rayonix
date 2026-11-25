import type { Metadata } from "next";
import Image from "next/image";
import { BreadcrumbSchema } from "@/lib/seo/json-ld";
import { pageMetadata } from "@/lib/seo/metadata";
import { CompanyHero, CompanySection } from "@/components/company/ui";
import ContactTeaser from "@/components/company/ContactTeaser";
import {
  ABOUT_HERO,
  ABOUT_PILLARS,
  ABOUT_SEO,
  LEADERS,
  LEADERSHIP_HEADING,
  MISSION,
  VISION,
  type Leader,
} from "@/content/about";

export const metadata: Metadata = pageMetadata({
  title: ABOUT_SEO.title,
  description: ABOUT_SEO.description,
  path: "/about",
});

/** Certifications and partners are kept from the previous About page (Figma 556:6457). */
const CREDENTIALS = [
  { icon: "icon-cert-iso.svg", title: "ISO 9001", body: "Quality Management Systems for high-reliability manufacturing." },
  { icon: "icon-cert-as9100.svg", title: "AS9100D", body: "Aviation, Space and Defence Engineering manufacturing standards." },
  { icon: "icon-cert-milstd.svg", title: "MIL-STD-810H", body: "Environmental Engineering & extreme laboratory durability testing." },
  { icon: "icon-cert-india.svg", title: "Make in India Defence", body: "100% Indigenous Design, Development & sovereign manufacturing." },
];

const PARTNERS = [
  { name: "XTEND", file: "xtend" },
  { name: "Hivebotics", file: "hivebotics" },
  { name: "Orca Optronics", file: "orca-optronics" },
  { name: "KIRO", file: "kiro" },
  { name: "GMafcon Security Technologies", file: "gmafcon" },
  { name: "Rayonix partner mark", file: "a-mark" },
  { name: "OSINT Losena Ltd.", file: "osint-losena" },
  { name: "Frenel Imaging", file: "frenel-imaging" },
  { name: "Guideline Geo", file: "guideline-geo" },
  { name: "Cirotta", file: "cirotta" },
  { name: "Vanguard Systems Ltd.", file: "vanguard-systems" },
  { name: "Ariel Photonics", file: "ariel-photonics" },
  { name: "Innoviz Technologies", file: "innoviz" },
  { name: "Tyndall FX", file: "tyndall-fx" },
];

const pad = (n: number) => String(n).padStart(2, "0");

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function LeaderCard({ leader }: { leader: Leader }) {
  return (
    <li className="flex flex-col gap-6 bg-white border border-[rgba(189,196,200,0.4)] rounded-[4px] p-6 sm:p-10">
      <div className="flex items-center gap-5">
        {leader.photo ? (
          <Image
            src={leader.photo.src}
            alt={leader.photo.alt}
            width={80}
            height={80}
            className="size-20 rounded-full object-cover"
          />
        ) : (
          <span
            className="size-20 shrink-0 rounded-full bg-[#080f12] text-[#f5f6f6] flex items-center justify-center type-h3 tracking-[0.04em]"
            aria-hidden="true"
          >
            {initials(leader.name)}
          </span>
        )}
        <div className="flex flex-col gap-1">
          <h3 className="type-h3 text-[#080f12]">{leader.name}</h3>
          <p className="type-small text-[#e22328] font-medium">{leader.title}</p>
        </div>
        {leader.linkedin && (
          <a
            href={leader.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${leader.name} on LinkedIn`}
            className="ml-auto text-[#080f12] hover:text-[#e22328]"
          >
            in
          </a>
        )}
      </div>
      <blockquote className="border-l-2 border-[#e22328] pl-5">
        <p className="type-body-lg text-[#2f3639]">&ldquo;{leader.quote.replace(/^"|"$/g, "")}&rdquo;</p>
      </blockquote>
      <div className="flex flex-col gap-3 border-t border-[rgba(189,196,200,0.4)] pt-5">
        <p className="type-eyebrow text-[#7f8a91]">Professional Focus</p>
        <ul className="flex flex-wrap gap-2">
          {leader.focus.map((f) => (
            <li key={f} className="rounded-[2px] border border-[#d5dadc] bg-[#f4f5f7] px-3 py-1 type-caption text-[#080f12]">
              {f}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Company", href: "/about" },
          { name: "About Us", href: "/about" },
        ]}
      />
      <div className="relative w-full min-h-screen bg-[#080f12]">
        {/* Hero: our approach + four pillars */}
        <CompanyHero
          id="approach"
          ariaLabel="Our approach"
          eyebrow={ABOUT_HERO.eyebrow}
          crumbs={[{ label: "Home", href: "/" }, { label: "Company", href: "/about" }, { label: "About Us" }]}
          title={ABOUT_HERO.title}
          intro={ABOUT_HERO.intro}
        >
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {ABOUT_PILLARS.map((p, i) => (
              <li
                key={p.title}
                className="flex flex-col gap-5 bg-[#10181c] border border-[#253035] rounded-[4px] p-6 lg:p-[29px]"
              >
                <span className="type-h3 text-[#e22328]">{pad(i + 1)}</span>
                <div className="flex flex-col gap-2">
                  <h2 className="type-body font-bold tracking-[0.04em] text-[#f5f6f6]">{p.title}</h2>
                  <p className="type-small text-[#bdc4c8]">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </CompanyHero>

        {/* Mission */}
        <CompanySection tone="light" id="mission" ariaLabel="Mission">
          <div className="flex flex-col gap-6 lg:gap-8">
            <p className="type-eyebrow text-[#e22328]">{MISSION.heading}</p>
            <h2 className="max-w-[1100px] type-hero text-[#080f12]">{MISSION.statement}</h2>
          </div>
        </CompanySection>

        {/* Vision: today, tomorrow, future */}
        <CompanySection tone="dark" id="vision" ariaLabel="Vision">
          <div className="flex flex-col gap-10 lg:gap-14">
            <h2 className="type-h2 text-[#f5f6f6]">{VISION.heading}</h2>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {VISION.steps.map((step, i) => (
                <li
                  key={step.stage}
                  className="relative flex flex-col gap-6 bg-[#10181c] border border-[#253035] rounded-[4px] p-6 lg:p-10"
                >
                  <div className="flex items-center gap-3">
                    <span className="type-eyebrow text-[#e22328]">
                      {pad(i + 1)} · {step.stage}
                    </span>
                    <span className="flex-1 h-px bg-[#253035]" aria-hidden="true" />
                  </div>
                  <p className="type-statement text-[#f5f6f6]">{step.line}</p>
                </li>
              ))}
            </ol>
          </div>
        </CompanySection>

        {/* Leadership */}
        <CompanySection tone="light" id="leadership" ariaLabel="Leadership">
          <div className="flex flex-col gap-10 lg:gap-14">
            <h2 className="type-h2 text-[#080f12]">{LEADERSHIP_HEADING}</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {LEADERS.map((l) => (
                <LeaderCard key={l.name} leader={l} />
              ))}
            </ul>
          </div>
        </CompanySection>

        {/* Certifications (kept from the previous page) */}
        <CompanySection tone="dark" id="certifications" ariaLabel="Defence certifications">
          <div className="flex flex-col gap-10 lg:gap-16">
            <h2 className="type-h2 text-[#f5f6f6]">Defence Certifications</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {CREDENTIALS.map((c) => (
                <li
                  key={c.title}
                  className="flex flex-col justify-between gap-10 lg:min-h-[242px] bg-white border border-[rgba(189,196,200,0.2)] rounded-[4px] p-[25px]"
                >
                  <span className="size-10 rounded-[2px] bg-[#f4f5f7] flex items-center justify-center">
                    <Image src={`/assets/company/${c.icon}`} alt="" width={24} height={24} aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="type-h3 text-[#080f12]">{c.title}</h3>
                    <p className="type-small text-[#47494a]">{c.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </CompanySection>

        {/* Partners (kept from the previous page) */}
        <CompanySection tone="dark" id="partners" ariaLabel="Global strategic partners" className="scroll-mt-28">
          <div className="flex flex-col gap-8 lg:gap-12">
            <div className="flex flex-col gap-3">
              <p className="type-eyebrow text-[#e22328]">Global Alliances</p>
              <h2 className="type-h2 text-[#f5f6f6]">Strategic Partners &amp; Collaborators</h2>
              <p className="type-body-lg text-[#bdc4c8] max-w-[800px]">
                We collaborate with premier international defence innovators, integrating battle-proven capabilities with sovereign Make-in-India systems.
              </p>
            </div>
            <div className="w-full bg-white/[0.04] backdrop-blur-md p-3 sm:p-4 rounded-[4px] border border-white/10 shadow-2xl">
              <ul
                className="rounded-[2px] bg-[#f6f7f9] p-4 sm:p-6 lg:p-8 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-4 lg:gap-[14px]"
                aria-label="Global defence and technology partners"
              >
                {PARTNERS.map((partner) => (
                  <li
                    key={partner.file}
                    className="relative aspect-[263/243] rounded-[8px] border border-[#e4e7ec] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
                  >
                    <Image
                      src={`/assets/partners/${partner.file}.webp`}
                      alt={`${partner.name} logo`}
                      width={526}
                      height={486}
                      sizes="(max-width: 767px) 45vw, (max-width: 1279px) 14vw, 175px"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-contain p-2"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CompanySection>

        <ContactTeaser />
      </div>
    </>
  );
}
