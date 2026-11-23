import type { Metadata } from "next";
import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";
import { BreadcrumbSchema } from "@/lib/seo/json-ld";
import {
  ArrowLink,
  CompanyHero,
  CompanySection,
  CornerTicks,
  DotList,
  GridPlaceholder,
  HudBadge,
  SectionHeader,
} from "@/components/company/ui";

export const metadata: Metadata = {
  title: "X Labs | Rayonix R&D",
  description:
    "X Labs explores, develops and validates technologies designed around emerging defence requirements, moving capabilities from concept to real-world application.",
  alternates: { canonical: "/ecosystem/x-labs" },
};

/** Figma 553:4239 "X Labs". Copy as supplied in the design. */

const METRICS = [
  { value: "14+", label: "Patents Filed" },
  { value: "3", label: "Core R&D Labs" },
  { value: "18,000 ft", label: "Field Test Altitude" },
  { value: "100%", label: "Sovereign Indigenous IP" },
];

const MISSION_CARDS = [
  {
    icon: "icon-xlabs-agility.svg",
    title: "Mission-Driven Agility",
    body: "Direct feedback loops from front-line warfighters and tactical defence agencies into laboratory engineering sprints, accelerating deployment readiness.",
    tag: "Operational User Feedback",
  },
  {
    icon: "icon-xlabs-sovereign.svg",
    title: "Dual-Use & Sovereign Integrity",
    body: "100% indigenous IP engineering compliant with ITAR, DISP, and export control regulations, ensuring resilience against adversarial supply shocks.",
    tag: "Protected Sovereign Pipeline",
  },
  {
    icon: "icon-xlabs-crosspollination.svg",
    title: "Deep-Tech Cross-Pollination",
    body: "Bridging edge neuromorphic compute, quantum RF photonics, and autonomous kinetic swarm dynamics into unified tactical command frameworks.",
    tag: "Multi-Domain Synergies",
  },
];

const PILLARS = [
  {
    icon: "icon-pillar-research.svg",
    title: "Research",
    body: "We explore technologies with future mission potential.",
    points: ["Quantum RF Sensing", "Low-SWaP Neuromorphic Inference", "Photonic Waveforms"],
  },
  {
    icon: "icon-pillar-development.svg",
    title: "Development",
    body: "We transform ideas into functional capabilities.",
    points: ["High-G Shock Hardening", "Distributed Geophone Arrays", "SDR Architecture"],
  },
  {
    icon: "icon-pillar-prototyping.svg",
    title: "Prototyping",
    body: "We rapidly develop and refine concepts.",
    points: ["Carbon-Fiber Tactical Airframes", "Rapid Additive Manufacturing", "3D LiDAR Perception Rigs"],
  },
  {
    icon: "icon-pillar-validation.svg",
    title: "Validation",
    body: "We test capabilities against operational requirements.",
    points: ["Extreme Environment (-40°C to +55°C)", "18,000 ft Himalayan Trials", "Electronic Warfare Stress Suites"],
  },
];

const IMPACT = [
  {
    stat: "< 15ms Latency",
    title: "Ultra-Rapid Sensor Fusion",
    body: "Real-time neural arbitration across multi-modal seismic, acoustic, and radar streams, synthesizing raw telemetry into actionable tactical tracking before adversaries react.",
    points: ["Cross-Modal Edge Calibration", "0.04 nε Sub-Nanostrain DAS Precision"],
  },
  {
    stat: "GPS-Denied Resilient",
    title: "Zero-GPS Navigation Autonomy",
    body: "Visual-inertial odometry and terrain contour matching ensure uncompromised mission execution and precision loitering inside heavily contested electronic warfare zones.",
    points: ["Decentralized Swarm Mesh Logic", "Autonomous Kinetic Target Tracking"],
  },
  {
    stat: "100% Domestic Supply",
    title: "Sovereign Defence Self-Reliance",
    body: "Complete domestic supply chain integration and secure hardware roots of trust eliminate foreign dependencies across frontline sovereign assets.",
    points: ["ITAR-Compliant Architecture", "Cryptographic Key Isolation"],
  },
];

const STAGES = [
  { title: "Research", body: "Exploratory physics, threat surface mapping, and mathematical validation.", tag: "Theoretical Modeling" },
  { title: "Develop", body: "Algorithmic modeling, custom FPGA synthesis, and bench validation.", tag: "Low-Power SDR Stacks" },
  { title: "Prototype", body: "Tactical form-factor builds on active test stands in skunkworks labs.", tag: "Loitering Swarm Chassis" },
  { title: "Validate", body: "Operational theater stress trials, 18,000 ft altitude runs & red-teaming.", tag: "EW & Jamming Trials" },
  { title: "Integrate", body: "Tactical C2 ecosystem handoff and scalable sovereign production lines.", tag: "Active Fleet Delivery" },
];

const SHOWCASE = [
  {
    image: "/assets/company/xlabs-card-gpr.webp",
    alt: "Rugged military sensor pod mounted on a tactical vehicle in the field",
    badge: "Subsurface • Detect",
    title: "Ground Penetrating Radar (GPR)",
    body: "Stepped-frequency continuous-wave subsurface imaging sensor capable of detecting deeply buried anomalies and covert subterranean tunnels down to 15m.",
    link: { label: "View product", href: "/sub-surface/detect/gpr" },
  },
  {
    image: "/assets/company/xlabs-card-loitering.webp",
    alt: "Autonomous loitering munition prototype with carbon-fiber frame",
    badge: "Defence Solution",
    title: "Launch & Forget Autonomous",
    body: "Autonomous tactical loitering munition system with onboard neural target classification, secure swarm mesh communications, and GPS-denied terminal kinetic precision.",
    link: { label: "View solution", href: "/aerial/respond/kinetic-interception" },
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function XLabsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Ecosystem", href: "/ecosystem" },
          { name: "X Labs", href: "/ecosystem/x-labs" },
        ]}
      />
      <main className="relative w-full min-h-screen bg-[#080f12]">
      <CompanyHero
        ariaLabel="X Labs"
        crumbs={[{ label: "Home", href: "/" }, { label: "Company" }, { label: "X Factor" }, { label: "X Labs" }]}
        title={"X Labs: where ideas become\nmission capabilities."}
        intro="We explore, develop and validate technologies designed around emerging defence requirements."
      >
        {/* Tactical visual (553:4895) */}
        <div className="relative border border-[#253035] rounded-[4px] p-2 sm:p-[9px]">
          <div className="relative h-[240px] sm:h-[420px] lg:h-[620px] rounded-[4px] overflow-hidden">
            <GridPlaceholder />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080f12] via-transparent to-transparent opacity-80" aria-hidden="true" />
            <div className="absolute left-4 top-4 max-w-[calc(100%-2rem)]">
              <HudBadge dot className="py-[9px] px-[15px]">
                Aero-Kinetic Testing Bay // Test Status: Nominal
              </HudBadge>
            </div>
            <div className="absolute right-4 bottom-4 hidden sm:block">
              <span className="inline-flex items-center gap-2 backdrop-blur-[12px] bg-[rgba(8,15,18,0.9)] border border-[#253035] rounded-[4px] px-[15px] py-[9px] type-caption select-none">
                <span className="text-[#7f8a91]">Telemetry Lock:</span>
                <span className="text-[#f5f6f6]">99.84% Swarm Synchronized</span>
              </span>
            </div>
          </div>
          <CornerTicks size={12} inset={0} />
        </div>

        {/* Credibility metrics bar (553:4930) */}
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 bg-[#10181c] border border-[#253035] rounded-[4px] p-6 sm:p-[33px]">
          {METRICS.map((m, i) => (
            <li
              key={m.label}
              // Dividers: 2 columns on mobile (before items 2 and 4), 4 columns on desktop (before 2, 3 and 4).
              className={`flex flex-col gap-[6px] pr-4 ${i % 2 ? "border-l border-[#253035] pl-4" : ""} ${
                i === 2 ? "lg:border-l lg:border-[#253035] lg:pl-4" : ""
              }`}
            >
              <span className="flex items-end gap-[6px] whitespace-nowrap type-stat text-[#f5f6f6]">
                {m.value}
                <span className="mb-3 size-[6px] shrink-0 rounded-full bg-[#e22328]" aria-hidden="true" />
              </span>
              <span className="type-small text-[#7f8a91]">{m.label}</span>
            </li>
          ))}
        </ul>
      </CompanyHero>

      {/* Research with a mission (554:5559) */}
      <CompanySection tone="light" ariaLabel="Research with a mission">
        <div className="flex flex-col gap-10 lg:gap-14">
          <SectionHeader
            tone="light"
            title="Research With a Mission"
            lead="At X Labs, we turn complex operational challenges into focused technology programmes. We work across emerging technologies to develop capabilities that can move from concept to real-world application."
          />
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {MISSION_CARDS.map((c) => (
              <li
                key={c.title}
                className="flex flex-col justify-between gap-6 bg-white border border-[#e2e8f0] rounded-[4px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-[33px]"
              >
                <div className="flex flex-col gap-4">
                  <span className="size-12 rounded-[4px] bg-[#fff1f1] flex items-center justify-center">
                    <Image src={`/assets/company/${c.icon}`} alt="" width={24} height={24} aria-hidden="true" />
                  </span>
                  <h3 className="type-h3 text-[#080f12]">{c.title}</h3>
                  <p className="type-small text-[#2f3639]">{c.body}</p>
                </div>
                <p className="flex items-center gap-2 border-t border-[#edf2f7] pt-[17px] type-eyebrow text-[#e22328]">
                  <span className="size-[6px] rounded-full bg-[#e22328]" aria-hidden="true" />
                  {c.tag}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </CompanySection>

      {/* What we focus on (556:5616) */}
      <CompanySection tone="dark" ariaLabel="What we focus on">
        <div className="flex flex-col gap-10 lg:gap-14">
          <div className="flex flex-col gap-3">
            <h2 className="type-h2 text-[#f5f6f6]">What We Focus On</h2>
            <p className="type-body-lg text-[#7f8a91]">
              From theoretical physics to ruggedized hardware, our dedicated research pillars span the full modernization frontier.
            </p>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {PILLARS.map((p, i) => (
              <li key={p.title} className="flex flex-col gap-8 bg-[#10181c] border border-[#253035] rounded-[4px] p-[29px]">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <span className="type-h3 text-[#e22328]">{pad(i + 1)}</span>
                    <span className="size-10 rounded-[4px] bg-[#1a2124] border border-[#253035] flex items-center justify-center">
                      <Image src={`/assets/company/${p.icon}`} alt="" width={20} height={20} aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex flex-col gap-[7px]">
                    <h3 className="type-h3 text-[#f5f6f6]">{p.title}</h3>
                    <p className="type-small text-[#7f8a91]">{p.body}</p>
                  </div>
                </div>
                <div className="border-t border-[#253035] pt-[21px]">
                  <DotList items={p.points} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CompanySection>

      {/* From possibility to capability (556:5740) */}
      <CompanySection tone="light" ariaLabel="From possibility to capability">
        <div className="flex flex-col gap-10 lg:gap-14">
          <SectionHeader
            tone="light"
            title="From Possibility to Capability"
            lead="We research with a clear purpose: to create technologies that strengthen sensing, intelligence, autonomy and mission response."
          />
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {IMPACT.map((c, i) => (
              <li
                key={c.title}
                className="flex flex-col justify-between gap-8 bg-white border border-[#e2e8f0] rounded-[4px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-[33px]"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-baseline justify-between gap-3 border-b border-[#edf2f7] pb-[17px]">
                    <span className="type-stat text-[#e22328]">{pad(i + 1)}</span>
                    <span className="type-caption text-[#2f3639] text-right">{c.stat}</span>
                  </div>
                  <h3 className="type-h3 text-[#080f12]">{c.title}</h3>
                  <p className="type-small text-[#2f3639]">{c.body}</p>
                </div>
                <div className="border-t border-[#edf2f7] pt-[17px]">
                  <DotList items={c.points} className="text-[#080f12]" gap="gap-2" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CompanySection>

      {/* From research to real-world deployment (556:5894) */}
      <CompanySection tone="dark" ariaLabel="From research to real-world deployment">
        <div className="flex flex-col gap-10 lg:gap-14">
          <SectionHeader
            tone="dark"
            title="From Research to Real-World Deployment"
            lead="We identify mission challenges, develop and validate solutions, and work with our wider ecosystem to transition proven technologies towards integration and deployment."
          />
          <div className="relative bg-[#10181c] border border-[#253035] rounded-[4px] overflow-hidden px-2 pb-2 pt-12 sm:px-[17px] sm:pb-[17px] sm:pt-[25px]">
            <div className="relative w-full aspect-[1198/669] rounded-[4px] overflow-hidden">
              <Image
                src="/assets/company/xlabs-pipeline-diagram.jpg"
                alt="Engineering pipeline diagram: Research, Develop, Prototype, Validate and Integrate connected in a cycle"
                fill
                sizes="(max-width: 1280px) 100vw, 1198px"
                className="object-cover"
              />
            </div>
            <div className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)]">
              <HudBadge dot className="py-[7px]">
                Tactical Engineering Pipeline // 5 Cyclic Stages
              </HudBadge>
            </div>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {STAGES.map((s, i) => (
              <li key={s.title} className="flex flex-col justify-between gap-4 bg-[#10181c] border border-[#253035] rounded-[4px] p-[21px]">
                <div className="flex flex-col gap-[7px]">
                  <div className="flex items-center justify-between">
                    <span className="type-eyebrow text-[#e22328]">Stage {pad(i + 1)}</span>
                    <span className="size-2 rounded-full bg-[#e22328]" aria-hidden="true" />
                  </div>
                  <h3 className="type-h3 text-[#f5f6f6]">{s.title}</h3>
                  <p className="type-caption text-[#7f8a91]">{s.body}</p>
                </div>
                <p className="border-t border-[#253035] pt-[13px] type-caption text-[#bdc4c8]">{s.tag}</p>
              </li>
            ))}
          </ol>
        </div>
      </CompanySection>

      {/* Transitioned from X Labs (556:5974) */}
      <CompanySection tone="light" ariaLabel="Transitioned from X Labs to battlefield fleet">
        <div className="flex flex-col gap-10 lg:gap-14">
          <SectionHeader
            tone="light"
            title="Transitioned From X Labs to Battlefield Fleet"
            lead="How fundamental breakthroughs engineered in X Labs graduate into combat-proven battlefield systems."
          />
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {SHOWCASE.map((c) => (
              <li
                key={c.title}
                className="flex flex-col bg-white border border-[#e2e8f0] rounded-[4px] overflow-hidden shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
              >
                <div className="relative h-[220px] sm:h-[280px] lg:h-[320px] bg-[#10181c]">
                  <Image src={c.image} alt={c.alt} fill sizes="(max-width: 768px) 100vw, 624px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden="true" />
                  <div className="absolute left-4 top-4">
                    <HudBadge dot className="py-[7px] rounded-[4px]">
                      {c.badge}
                    </HudBadge>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between gap-8 p-6 sm:p-8">
                  <div className="flex flex-col gap-3">
                    <h3 className="type-h3 text-[#080f12]">{c.title}</h3>
                    <p className="type-small text-[#2f3639]">{c.body}</p>
                  </div>
                  <div className="border-t border-[#edf2f7] pt-[23px]">
                    <ArrowLink href={c.link.href} bold solid>
                      {c.link.label}
                    </ArrowLink>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CompanySection>

      {/* Partner with X Labs (556:6067) */}
      <CompanySection tone="dark" ariaLabel="Partner with X Labs">
        <div className="flex flex-col gap-10 lg:gap-12">
          <h2 className="max-w-[836px] type-h2 text-[#f5f6f6]">
            Partner With X Labs or Build With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="flex flex-col justify-between gap-8 bg-[#10181c] border border-[#253035] rounded-[4px] p-6 sm:p-[41px]">
              <div className="flex flex-col gap-4 pt-1">
                <p className="type-eyebrow text-[#e22328]">Defence Industry &amp; Allied Sovereignty</p>
                <h3 className="type-h3 text-[#f5f6f6]">Co-Develop with X Labs</h3>
                <p className="type-body text-[#7f8a91]">
                  Partner on defence grants, custom sensor payloads, and joint operational trials across our sovereign test facilities and simulation testbeds.
                </p>
              </div>
              <div>
                <CTAButton href="mailto:info@rayonix.in?subject=X%20Labs%20R%26D%20partnership" variant="primary">
                  Initiate R&amp;D partnership
                </CTAButton>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-8 bg-[#10181c] border border-[#253035] rounded-[4px] p-6 sm:p-[41px]">
              <div className="flex flex-col gap-4 pt-1">
                <p className="type-eyebrow text-[#e22328]">Careers &amp; Research Fellowships</p>
                <h3 className="type-h3 text-[#f5f6f6]">Build What&apos;s Next</h3>
                <p className="type-body text-[#7f8a91]">
                  Join our cross-disciplinary team of RF engineers, AI researchers, and defence roboticists solving hard kinetic defence and autonomous navigation challenges.
                </p>
              </div>
              <ArrowLink href="/careers#engineering" bold solid>
                Explore open R&amp;D roles
              </ArrowLink>
            </div>
          </div>
        </div>
      </CompanySection>
    </main>
    </>
  );
}
