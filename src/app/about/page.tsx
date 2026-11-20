import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowLink,
  CompanyHero,
  CompanySection,
  CornerTicks,
  HudBadge,
} from "@/components/company/ui";

export const metadata: Metadata = {
  title: "About Rayonix | Global Technology, Indian Defence Capability",
  description:
    "Rayonix builds integrated sensing, intelligence, and response systems engineered for modern multi-domain defense and critical enterprise security.",
  alternates: { canonical: "/about" },
};

/** Figma 556:6457 "About Us". Copy as supplied in the design. */

const SUBNAV = [
  { label: "Overview", href: "#mission" },
  { label: "Certifications", href: "#certifications" },
  { label: "Global presence", href: "#presence" },
];

const PILLARS = [
  {
    title: "Our Mission",
    body: "To eliminate operational blind spots across subsurface, surface, and aerial domains through indigenous deep-tech engineering.",
    points: [
      "Autonomous subsurface threat detection",
      "Real-time multi-spectral sensor fusion",
      "Zero-latency edge computing & tactical interdiction",
    ],
  },
  {
    title: "Our Vision",
    body: "To establish global leadership in unified autonomous defense ecosystems built in India for the world.",
    points: [
      "Sovereign supply chain security & 100% indigenous IP",
      "Interoperable allied defense partnerships",
      "Continuous multi-domain deterrent dominance",
    ],
  },
];

const KPIS = [
  { value: "15+", title: "Deployed Systems", body: "Across contested border frontiers & naval corridors." },
  { value: "18,000 ft", title: "Extreme Altitude Proven", body: "Sub-zero trials in rugged Himalayan passes (-40°C)." },
  { value: "12+", title: "Global Partner Nations", body: "Joint defense evaluation & sovereign bilateral tech programs." },
];

const CREDENTIALS = [
  { icon: "icon-cert-iso.svg", title: "ISO 9001", body: "Quality Management Systems for high-reliability manufacturing." },
  { icon: "icon-cert-as9100.svg", title: "AS9100D", body: "Aviation, Space and Defense Engineering manufacturing standards." },
  { icon: "icon-cert-milstd.svg", title: "MIL-STD-810H", body: "Environmental Engineering & extreme laboratory durability testing." },
  { icon: "icon-cert-india.svg", title: "Make in India Defence", body: "100% Indigenous Design, Development & sovereign manufacturing." },
];

const HUBS = [
  {
    kind: "Primary Facility",
    name: "Bengaluru Tech Hub (India)",
    body: "Headquarters, cleanrooms, and multi-domain engineering center.",
  },
  {
    kind: "Bilateral Hub",
    name: "Canberra Joint Evaluation Facility (Australia)",
    body: "Field validation, maritime corridor telemetry, and defense tech interoperability.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#080f12]">
      <CompanyHero
        ariaLabel="About Rayonix"
        crumbs={[{ label: "Home", href: "/" }, { label: "Company" }, { label: "About us" }]}
        title={"Global technology.\nIndian defence capability."}
        intro="Rayonix builds integrated sensing, intelligence, and response systems engineered for modern multi-domain defense and critical enterprise security."
        introBeside
        subnav={
          <nav
            aria-label="About sections"
            className="-mx-6 px-6 sm:mx-0 sm:px-0 overflow-x-auto border-b border-[#253035]"
          >
            <ul className="flex gap-8 whitespace-nowrap">
              {SUBNAV.map((item, i) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={i === 0 ? "true" : undefined}
                    className={`block pb-3 type-body border-b-2 transition-colors ${
                      i === 0
                        ? "border-[#e22328] text-[#e22328] font-bold"
                        : "border-transparent text-[#bdc4c8] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      >
        {/* Hero laboratory telemetry frame (556:7184) */}
        <div className="relative mt-4 bg-[#10181c] border border-[#253035] rounded-[4px] p-2 sm:p-[9px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
          <div className="relative h-[240px] sm:h-[420px] lg:h-[555px] rounded-[2px] overflow-hidden bg-[#080f12]">
            <Image
              src="/assets/company/about-hero-lab.jpg"
              alt="Engineers at work in a defence engineering laboratory and cleanroom integration facility"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1270px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080f12] via-transparent to-[rgba(8,15,18,0.2)]" aria-hidden="true" />
            <div className="absolute left-4 top-4 right-4 hidden sm:flex flex-wrap gap-2">
              <HudBadge dot>Facility Telemetry: Cleanroom Tier 1</HudBadge>
              <HudBadge tone="muted">Sensor Matrix: Multi-Domain Fusion</HudBadge>
            </div>
            <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 max-w-[calc(100%-1.5rem)]">
              <HudBadge tone="alert" icon="/assets/company/icon-live-loop.svg" className="py-[7px] gap-[10px]">
                Autonomous Integration Test Stand: Active Live Loop
              </HudBadge>
            </div>
          </div>
          <CornerTicks />
        </div>
      </CompanyHero>

      {/* Mission & Vision (556:7208) */}
      <CompanySection tone="light" id="mission" ariaLabel="Mission and vision">
        <div className="flex flex-col gap-10 lg:gap-14">
          <h2 className="type-h2 text-[#080f12]">
            Architecting Autonomy for Sovereign Supremacy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-14">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="relative bg-white border border-[rgba(189,196,200,0.2)] rounded-[4px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-8 lg:p-[49px]"
              >
                <span className="absolute left-0 top-8 bottom-8 w-1 bg-[#e22328] rounded-r-[2px]" aria-hidden="true" />
                <div className="pl-4 flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <h3 className="type-statement text-[#080f12]">{p.title}</h3>
                    <p className="type-body-lg text-[#47494a]">{p.body}</p>
                  </div>
                  <ul className="flex flex-col gap-[14px] border-t border-[rgba(189,196,200,0.15)] pt-[17px]">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3">
                        <span className="mt-1 size-4 shrink-0 rounded-full bg-[rgba(226,35,40,0.1)] flex items-center justify-center">
                          <Image src="/assets/company/icon-check.svg" alt="" width={12} height={12} aria-hidden="true" />
                        </span>
                        <span className="type-body text-[#080f12]">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CompanySection>

      {/* Field proof metrics (556:7272) */}
      <section aria-label="Field proof" className="relative w-full bg-[#080f12] text-[#f5f6f6] border-b border-[#253035] py-16 lg:py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #253035 1px, transparent 1px), linear-gradient(180deg, #253035 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <ul className="relative max-w-[1280px] mx-auto w-full px-6 sm:px-8 grid grid-cols-1 md:grid-cols-3">
          {KPIS.map((k, i) => (
            <li
              key={k.title}
              className={`flex flex-col gap-4 py-6 md:py-0 md:pr-8 ${
                i > 0 ? "border-t md:border-t-0 md:border-l border-[#253035] md:pl-[33px]" : ""
              }`}
            >
              <p className="flex items-end gap-2 type-stat">
                {k.value}
                <span className="mb-[15px] size-[10px] shrink-0 rounded-full bg-[#e22328] shadow-[0px_0px_12px_0px_#e22328]" aria-hidden="true" />
              </p>
              <div className="flex flex-col gap-1">
                <h3 className="type-h3 ">{k.title}</h3>
                <p className="type-small text-[#bdc4c8]">{k.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Certifications & global footprint (556:7308) */}
      <CompanySection tone="light" id="certifications" ariaLabel="Certifications and international reach">
        <div className="flex flex-col gap-10 lg:gap-16">
          <h2 className="type-h2 text-[#080f12]">
            Defense Certifications &amp; International Reach
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {CREDENTIALS.map((c) => (
              <li
                key={c.title}
                className="flex flex-col justify-between gap-10 lg:min-h-[242px] bg-white border border-[rgba(189,196,200,0.2)] rounded-[4px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-[25px]"
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

          {/* World map module + operational hubs */}
          <div
            id="presence"
            className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 bg-[#10181c] border border-[#253035] rounded-[4px] overflow-hidden shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]"
          >
            <div className="relative lg:col-span-8 h-[260px] sm:h-[380px] lg:h-[528px] bg-[#080f12]">
              <Image
                src="/assets/company/about-world-map.jpg"
                alt="Tactical world map showing Rayonix defence hubs connected by data links"
                fill
                sizes="(max-width: 1024px) 100vw, 852px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[rgba(16,24,28,0.8)]" aria-hidden="true" />
              <div className="absolute left-4 top-4 max-w-[calc(100%-2rem)]">
                <HudBadge dot tone="muted" className="py-[7px]">
                  Real-Time Allied Link Status: Active
                </HudBadge>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-8 p-6 sm:p-10">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-[6px]">
                  <p className="type-eyebrow text-[#e22328]">Strategic Nodes</p>
                  <h3 className="type-h3 text-[#f5f6f6]">Operational Hubs</h3>
                </div>
                <ul className="flex flex-col gap-4">
                  {HUBS.map((h) => (
                    <li key={h.name} className="flex flex-col gap-1 bg-[#080f12] border border-[#253035] rounded-[2px] p-[17px]">
                      <span className="type-caption text-[#7f8a91]">{h.kind}</span>
                      <span className="type-body font-medium text-[#f5f6f6]">{h.name}</span>
                      <span className="type-small text-[#bdc4c8]">{h.body}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <ArrowLink href="#global-presence" bold className="type-cta">
                Explore global presence
              </ArrowLink>
            </div>
          </div>
        </div>
      </CompanySection>
    </main>
  );
}
