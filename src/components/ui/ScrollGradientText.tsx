"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollGradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "p" | "span";
  start?: string; // e.g. "top 80%"
  end?: string; // e.g. "bottom 45%"
  scrub?: boolean | number;
}

export default function ScrollGradientText({
  children,
  className = "",
  as: Component = "div",
  start = "top 82%",
  end = "bottom 48%",
  scrub = 0.6,
}: ScrollGradientTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    // Strict GSAP Context for Next.js App Router cleanup
    const ctx = gsap.context(() => {
      // Find all target paragraphs or elements inside, or animate the element itself
      const targets = el.querySelectorAll<HTMLElement>("[data-gradient-text]");
      const elementsToAnimate = targets.length > 0 ? Array.from(targets) : [el];

      elementsToAnimate.forEach((target) => {
        gsap.fromTo(
          target,
          {
            backgroundPosition: "100% 0",
          },
          {
            backgroundPosition: "0% 0",
            ease: "none",
            scrollTrigger: {
              trigger: target,
              start: start,
              end: end,
              scrub: scrub,
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [start, end, scrub]);

  return (
    <Component ref={containerRef as any} className={className}>
      {children}
    </Component>
  );
}
