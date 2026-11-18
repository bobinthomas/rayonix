import Link from "next/link";
import CTAButton from "@/components/ui/CTAButton";

interface TacticalPlaceholderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  category?: string;
}

export default function TacticalPlaceholder({
  badge = "TACTICAL BRIEFING · CLEARANCE IN PROGRESS",
  title,
  subtitle = "Operational documentation and technical specifications for this domain are currently being integrated. Access live hardware platforms below.",
  category = "SYSTEMS & PLATFORMS",
}: TacticalPlaceholderProps) {
  return (
    <main className="w-full min-h-[75vh] flex flex-col items-center justify-center bg-[#080d0f] text-[#f5f6f6] px-6 sm:px-12 py-20 relative overflow-hidden select-none">
      {/* Background Subtle Gradient & Grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#101b22] via-[#080d0f] to-black" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[800px] mx-auto text-center flex flex-col items-center gap-6">
        {/* Category & Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[rgba(226,35,40,0.3)] bg-[rgba(226,35,40,0.06)] backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e22328] animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#e22328]">
            {badge}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f5f6f6] leading-tight">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#8e9ca2] max-w-[620px] leading-relaxed">
          {subtitle}
        </p>

        {/* Actions */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
          <CTAButton
            href="/subsurface/detect/gpr"
            variant="primary"
            aria-label="Explore GPR Detection Platform"
          >
            Explore GPR Platform
          </CTAButton>
          <CTAButton
            href="/"
            variant="secondary"
            aria-label="Return to Operations Homepage"
          >
            Return to Operations
          </CTAButton>
        </div>
      </div>
    </main>
  );
}
