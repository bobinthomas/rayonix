"use client";

import { useRef, useEffect } from "react";

export default function FieldDroneBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let isAttached = false;

    // Use IntersectionObserver to lazy-load video source and play when approaching viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isAttached) {
              video.src = "/assets/videos/ai-robotics-web.mp4";
              isAttached = true;
            }
            video.play().catch(() => {});
          } else {
            if (isAttached) {
              video.pause();
            }
          }
        });
      },
      {
        rootMargin: "300px 0px",
        threshold: 0.1,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[500px] sm:h-[620px] lg:h-[721px] bg-black overflow-hidden"
      aria-label="Rayonix AI Robotics Tactical Video"
      data-node-id="640:3919"
      data-name="Video"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          width={1920}
          height={1080}
          muted
          loop
          playsInline
          preload="none"
          poster="/assets/ai-robotics-poster.webp"
          className="w-full h-full object-cover object-center"
        />

        {/* Subtle top & bottom edge gradients for seamless container blending */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
    </section>
  );
}
