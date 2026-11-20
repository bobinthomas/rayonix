"use client";

import Image from "next/image";
import TransformingHeading from "@/components/ui/TransformingHeading";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

interface ProofPoint {
  id: string;
  target: number;
  suffix: string;
  label: string;
  description: string[];
}

const proofPoints: ProofPoint[] = [
  {
    id: "deployments",
    target: 15,
    suffix: "+",
    label: "Defence Deployments",
    description: ["Across Northern and", "Eastern Commands"],
  },
  {
    id: "altitude",
    target: 18000,
    suffix: " ft",
    label: "High-Altitude Trials",
    description: ["Tested in demanding", "operational environments"],
  },
  {
    id: "partners",
    target: 12,
    suffix: "+",
    label: "Global Technology Partners",
    description: [
      "Battle-Tested Global Technologies",
      "Trusted by the US Army, NATO and IDF.",
    ],
  },
];

export default function CapabilitiesSection() {
  return (
    <section
      className="relative w-full bg-[#253035] text-[#f5f6f6] pt-[72px] pb-[88px] lg:pb-[100px] overflow-hidden"
      aria-label="Proven Capabilities · Engineered for the Mission"
      data-node-id="354:2887"
    >
      {/* Background Topographic Contour Lines matching Figma node 354:2888 */}
      <div
        className="absolute bottom-0 left-[-48px] w-[1574px] h-[172px] pointer-events-none select-none overflow-hidden opacity-90 z-0"
        aria-hidden="true"
        data-node-id="354:2888"
      >
        <Image
          src="/assets/proven-capabilities-contours.svg"
          alt=""
          width={1574}
          height={172}
          className="w-full h-full object-cover object-bottom"
          priority={false}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto w-full px-6 sm:px-8 flex flex-col gap-6">
        {/* Section Headline with Axion Decrypt Animation matching Figma node 354:2898 */}
        <div className="pb-2" data-node-id="354:2898">
          <TransformingHeading
            as="h2"
            segments={[
              {
                text: "Engineered for the Mission",
                className: "text-[#f5f6f6]",
              },
              {
                text: ".",
                className: "text-[#e22328] font-bold",
              },
              {
                text: "\nProven in the Field",
                className: "text-[#f5f6f6]",
              },
              {
                text: ".",
                className: "text-[#e22328] font-bold",
              },
            ]}
            accentDot={false}
            className="type-hero"
          />
        </div>

        {/* Heading Divider Line matching Figma node 354:2899 */}
        <div
          className="h-px w-full bg-[rgba(191,204,209,0.25)]"
          data-node-id="354:2899"
          data-name="Heading divider"
        />

        {/* Three Proof Points with Animated Count-Up matching Figma node 354:2900 */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 pt-6 relative"
          data-node-id="354:2900"
          data-name="Three proof points"
        >
          {proofPoints.map((point, idx) => (
            <div
              key={point.id}
              className={`flex flex-col gap-4 py-6 md:py-2 ${
                idx === 0
                  ? "md:pr-8 lg:pr-[32px]"
                  : idx === 1
                  ? "md:px-8 lg:px-[32px] md:border-l border-[rgba(191,204,209,0.25)] border-t md:border-t-0"
                  : "md:pl-8 lg:pl-[32px] md:border-l border-[rgba(191,204,209,0.25)] border-t md:border-t-0"
              }`}
              data-node-id={
                idx === 0
                  ? "200:1184"
                  : idx === 1
                  ? "354:2901"
                  : "354:2903"
              }
              data-name="Metric / Proof point"
            >
              {/* Animated Stat Value counting up from 0 */}
              <div
                className="h-[56px] flex items-center type-h2 text-[#f5f6f6] "
                data-node-id="200:1185"
              >
                <AnimatedCounter
                  target={point.target}
                  suffix={point.suffix}
                  duration={1.8}
                />
              </div>

              {/* Metric Label */}
              <p
                className="type-h3 text-[#f5f6f6] "
                data-node-id="200:1186"
              >
                {point.label}
              </p>

              {/* Metric Description */}
              <div
                className="type-body text-[#bdc4c8] "
                data-node-id="200:1187"
              >
                {point.description.map((line, lineIdx) => (
                  <p key={lineIdx} className={lineIdx === 0 ? "mb-0" : ""}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
