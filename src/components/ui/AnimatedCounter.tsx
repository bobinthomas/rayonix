"use client";

import React, { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number; // Duration in ms (default: 2000)
  className?: string;
}

export default function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
  className = "",
}: AnimatedCounterProps) {
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    // Respect user's motion preferences
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setCurrentValue(target);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            const startTime = performance.now();

            const updateCount = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(1, elapsed / duration);

              // Apple-grade smooth ease-out (cubic)
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const nextVal = Math.round(easeOut * target);

              setCurrentValue(nextVal);

              if (progress < 1) {
                animRef.current = requestAnimationFrame(updateCount);
              } else {
                setCurrentValue(target);
                animRef.current = null;
              }
            };

            animRef.current = requestAnimationFrame(updateCount);
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animRef.current !== null) {
        cancelAnimationFrame(animRef.current);
      }
    };
  }, [target, duration, hasStarted]);

  // Format with locale thousands separator (e.g. 18,000)
  const formattedNumber = currentValue.toLocaleString("en-US");

  return (
    <span ref={containerRef} className={className}>
      <span aria-hidden="true">
        {prefix}
        {formattedNumber}
        {suffix}
      </span>
      {/* Accessible screen-reader text */}
      <span className="sr-only">
        {prefix}
        {target.toLocaleString("en-US")}
        {suffix}
      </span>
    </span>
  );
}
