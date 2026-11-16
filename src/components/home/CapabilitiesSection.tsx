"use client";

const proofPoints = [
  {
    value: "15+",
    label: "Defence Deployments",
    description: "Across Northern and\nEastern Commands",
  },
  {
    value: "18,000 ft",
    label: "High-Altitude Trials",
    description: "Tested in demanding\noperational environments",
  },
  {
    value: "12+",
    label: "Global Technology Partners",
    description: "Battle-Tested Global Technologies\nTrusted by the US Army, NATO and IDF.",
  },
];

export default function CapabilitiesSection() {
  return (
    <section
      className="relative w-full bg-[#253035] text-[#f5f6f6] px-6 sm:px-12 lg:px-[64px] pt-[72px] pb-[80px]"
      aria-label="Proven Capabilities Engineered for the Mission"
      data-node-id="640:3900"
    >
      <div className="max-w-[1320px] mx-auto flex flex-col gap-6">
        {/* Section Headline matching Figma node 640:3911 */}
        <div className="pb-2">
          <h2 className="text-3xl sm:text-5xl lg:text-[64px] font-bold text-[#f5f6f6] leading-tight lg:leading-[72px]">
            Engineered for the Mission<span className="text-[#e22328]">.</span>
            <br />
            Proven in the Field<span className="text-[#e22328]">.</span>
          </h2>
        </div>

        {/* Divider line matching Figma node 640:3912 */}
        <div className="h-px w-full bg-[#bfcdd1]/25" />

        {/* 3 Proof Points matching Figma node 640:3913 */}
        <div className="grid grid-cols-1 md:grid-cols-3 pt-6 divide-y md:divide-y-0 md:divide-x divide-[#bfcdd1]/25">
          {proofPoints.map((point) => (
            <div
              key={point.label}
              className="px-4 lg:px-8 py-6 md:py-2 flex flex-col gap-2"
            >
              <div className="text-4xl sm:text-5xl lg:text-[64px] font-bold text-[#f5f6f6] leading-[72px]">
                {point.value}
              </div>
              <div className="text-xl sm:text-2xl lg:text-[24px] font-medium text-[#f5f6f6] leading-[32px]">
                {point.label}
              </div>
              <div className="text-base sm:text-lg lg:text-[18px] font-normal text-[#bdc4c8] leading-[28px] whitespace-pre-line">
                {point.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
