"use client";

import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";
import TransformingHeading from "@/components/ui/TransformingHeading";

export default function LetsTalkSection() {
  return (
    <section
      className="relative w-full bg-[#080f12] text-[#f5f6f6] pt-[64px] pb-[80px] rounded-none"
      aria-label="Contact and Collaboration"
      data-node-id="354:2993"
    >
      <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 flex flex-col gap-[29px]">
        {/* Section Heading with Decrypt Animation matching Figma node 354:2994 */}
        <div>
          <TransformingHeading
            as="h2"
            segments={[
              {
                text: "Lets Talk",
                className: "text-[#f5f6f6]",
              },
              {
                text: ".",
                className: "text-[#e22328] font-bold",
              },
            ]}
            accentDot={false}
            className="text-4xl sm:text-6xl lg:text-[64px] font-bold tracking-tight leading-tight lg:leading-[72px]"
          />
        </div>

        {/* 3 Pillars matching Figma node 354:2995 */}
        <div
          className="border-t border-[#262626] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#262626]"
          data-node-id="354:2995"
        >
          {/* Pillar 01: Operational Requirement */}
          <div
            className="px-6 sm:px-8 py-10 sm:py-[48px] flex flex-col justify-between min-h-[380px] lg:h-[401px]"
            data-node-id="354:2996"
          >
            <div className="flex flex-col gap-6">
              <div className="relative w-[40px] h-[45px]">
                <Image
                  src="/assets/talk-shield.svg"
                  alt="Operational Requirement"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-[24px] font-medium text-[#f5f6f6] leading-[32px]">
                Have an Operational Requirement?
              </h3>
              <p className="text-[16px] font-normal text-[#5c6e75] leading-[24px]">
                We assess mission-specific requirements and engineer integrated defence solutions tailored to operational needs.
              </p>
            </div>

            <div className="pt-6">
              <CTAButton
                href="mailto:info@rayonix.in?subject=Operational%20requirement"
                variant="secondary"
              >
                Discuss Your Requirement
              </CTAButton>
            </div>
          </div>

          {/* Pillar 02: Technology Partnership */}
          <div
            className="px-6 sm:px-8 py-10 sm:py-[48px] flex flex-col justify-between min-h-[380px] lg:h-[401px]"
            data-node-id="354:2997"
          >
            <div className="flex flex-col gap-6">
              <div className="relative w-[40px] h-[45px]">
                <Image
                  src="/assets/talk-partner.svg"
                  alt="Technology Partnership"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-[24px] font-medium text-[#f5f6f6] leading-[32px]">
                Exploring a Technology Partnership?
              </h3>
              <p className="text-[16px] font-normal text-[#5c6e75] leading-[24px]">
                We collaborate with global technology companies on system integration, manufacturing and market opportunities.
              </p>
            </div>

            <div className="pt-6">
              <CTAButton
                href="mailto:info@rayonix.in?subject=Technology%20partnership"
                variant="secondary"
              >
                Partner With Us
              </CTAButton>
            </div>
          </div>

          {/* Pillar 03: Connect With Team */}
          <div
            className="px-6 sm:px-8 py-10 sm:py-[48px] flex flex-col justify-between min-h-[380px] lg:h-[401px]"
            data-node-id="354:2998"
          >
            <div className="flex flex-col gap-6">
              <div className="relative w-[40px] h-[45px]">
                <Image
                  src="/assets/talk-connect.svg"
                  alt="Connect With Our Team"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-[24px] font-medium text-[#f5f6f6] leading-[32px]">
                Want to Connect With Our Team?
              </h3>
              <p className="text-[16px] font-normal text-[#5c6e75] leading-[24px]">
                Reach out to discuss business enquiries, technology capabilities and potential collaborations.
              </p>
            </div>

            <div className="pt-6">
              <CTAButton
                href="mailto:info@rayonix.in?subject=Business%20enquiry"
                variant="secondary"
              >
                Get in Touch
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
