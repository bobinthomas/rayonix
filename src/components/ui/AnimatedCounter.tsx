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
  const containerRef = useRef<HTMLSpanElement>(null);
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const displayEl = displayRef.current;
    if (typeof window === "undefined" || !el) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (displayEl) {
        displayEl.textContent = `${prefix}${target.toLocaleString("en-US")}${suffix}`;
      }
      return;
    }

    const obj = { val: 0 };
    let tween: gsap.core.Tween | null = null;

    const updateDisplay = (val: number) => {
      if (displayEl) {
        displayEl.textContent = `${prefix}${Math.max(0, Math.round(val)).toLocaleString("en-US")}${suffix}`;
      }
    };

    const playCountUp = () => {
      tween?.kill();
      obj.val = 0;
      updateDisplay(0);

      tween = gsap.to(obj, {
        val: target,
        duration: duration,
        ease: "power2.out",
        onUpdate: () => {
          updateDisplay(obj.val);
        },
        onComplete: () => {
          updateDisplay(target);
        },
      });
    };

    const resetCounter = () => {
      tween?.kill();
      obj.val = 0;
      updateDisplay(0);
    };

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      end: "bottom 10%",
      onEnter: () => playCountUp(),
      onEnterBack: () => playCountUp(),
      onLeave: () => resetCounter(),
      onLeaveBack: () => resetCounter(),
    });

    return () => {
      st.kill();
      tween?.kill();
    };
  }, [target, suffix, prefix, duration]);

  return (
    <span ref={containerRef} className={className}>
      <span ref={displayRef} aria-hidden="true">
        {prefix}0{suffix}
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
