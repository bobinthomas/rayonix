"use client";

import { useRef, useEffect } from "react";

export default function FieldDroneBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Use IntersectionObserver to play video when visible and pause when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Browser autoplay policy handler
            });
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.15,
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
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/ai-robotics-poster.webp"
          className="w-full h-full object-cover object-center"
        >
          {/* Optimized 1080p web version with faststart for instantaneous playback */}
          <source src="/assets/videos/ai-robotics-web.mp4" type="video/mp4" />
          <source src="/assets/videos/ai-robotics.mp4" type="video/mp4" />
          <source src="/assets/videos/Ai%20Robotics.mp4" type="video/mp4" />
        </video>

        {/* Subtle top & bottom edge gradients for seamless container blending */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
    </section>
  );
}
