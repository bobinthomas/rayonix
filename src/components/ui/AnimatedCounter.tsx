"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number; // Duration in seconds (default: 1.8)
  className?: string;
}

export default function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1.8,
  className = "",
}: AnimatedCounterProps) {
  const [currentValue, setCurrentValue] = useState<number>(0);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (typeof window === "undefined" || !el) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrentValue(target);
      return;
    }

    const obj = { val: 0 };
    let tween: gsap.core.Tween | null = null;

    const playCountUp = () => {
      tween?.kill();
      obj.val = 0;
      setCurrentValue(0);

      tween = gsap.to(obj, {
        val: target,
        duration: duration,
        ease: "power2.out",
        onUpdate: () => {
          setCurrentValue(Math.max(0, Math.round(obj.val)));
        },
        onComplete: () => {
          setCurrentValue(target);
        },
      });
    };

    const resetCounter = () => {
      tween?.kill();
      obj.val = 0;
      setCurrentValue(0);
    };

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      end: "bottom 12%",
      onEnter: () => playCountUp(),
      onEnterBack: () => playCountUp(),
      onLeave: () => resetCounter(),
      onLeaveBack: () => resetCounter(),
    });

    return () => {
      st.kill();
      tween?.kill();
    };
  }, [target, duration]);

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
