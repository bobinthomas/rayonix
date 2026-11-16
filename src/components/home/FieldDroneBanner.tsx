"use client";

import Image from "next/image";

export default function FieldDroneBanner() {
  return (
    <section
      className="relative w-full h-[500px] sm:h-[620px] lg:h-[721px] bg-black overflow-hidden"
      aria-label="Tactical Drone Field Deployment"
      data-node-id="640:3919"
    >
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/assets/field-drone.png"
          alt="Rayonix Tactical Drone in Field Deployment"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle top & bottom shadow blend */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
    </section>
  );
}
