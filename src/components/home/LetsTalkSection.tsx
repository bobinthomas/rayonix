"use client";

import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";

export default function LetsTalkSection() {
  return (
    <section
      className="relative w-full bg-[#080f12] text-[#f5f6f6] px-6 sm:px-12 lg:px-[68px] pt-[64px] pb-[80px]"
      aria-label="Contact and Collaboration"
      data-node-id="640:4081"
    >
      <div className="max-w-[1312px] mx-auto flex flex-col gap-[29px]">
        {/* Section Heading matching Figma node 640:4082 */}
        <div>
          <h2 className="text-4xl sm:text-6xl lg:text-[64px] font-bold text-[#f5f6f6] leading-tight lg:leading-[72px]">
            Lets Talk<span className="text-[#e22328]">.</span>
          </h2>
        </div>

        {/* 3 Pillars matching Figma node 640:4083 */}
        <div className="border-t border-[#262626] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#262626]">
          {/* Pillar 01: Operational Requirement */}
          <div className="px-6 sm:px-8 py-10 sm:py-[48px] flex flex-col justify-between min-h-[380px] lg:h-[401px]">
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
          <div className="px-6 sm:px-8 py-10 sm:py-[48px] flex flex-col justify-between min-h-[380px] lg:h-[401px]">
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
          <div className="px-6 sm:px-8 py-10 sm:py-[48px] flex flex-col justify-between min-h-[380px] lg:h-[401px]">
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
