"use client";

import React, { useEffect, useRef, useState } from "react";

export default function SniperCursor() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const verticalLineRef = useRef<HTMLDivElement>(null);
  const horizontalLineRef = useRef<HTMLDivElement>(null);
  const intersectionRef = useRef<HTMLDivElement>(null);
  const xCoordRef = useRef<HTMLSpanElement>(null);
  const yCoordRef = useRef<HTMLSpanElement>(null);

  const mousePos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Detect mobile / touch devices
    if (
      typeof window === "undefined" ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches
    ) {
      setIsTouchDevice(true);
      return;
    }

    // Hide default system cursor on desktop
    document.documentElement.classList.add("custom-sniper-cursor");

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // High-performance 120fps hardware-accelerated direct DOM transform loop
    let lastX = -1;
    let lastY = -1;

    const render = () => {
      const { x, y } = mousePos.current;

      if (x !== lastX || y !== lastY) {
        // Full-length vertical line: translate along X
        if (verticalLineRef.current) {
          verticalLineRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
        }

        // Full-length horizontal line: translate along Y
        if (horizontalLineRef.current) {
          horizontalLineRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
        }

        // Intersection reticle & coordinates HUD: translate along X and Y
        if (intersectionRef.current) {
          intersectionRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }

        // Update live coordinates text directly without React re-render overhead
        const padX = String(Math.max(0, Math.round(x))).padStart(4, "0");
        const padY = String(Math.max(0, Math.round(y))).padStart(4, "0");

        if (xCoordRef.current) xCoordRef.current.textContent = padX;
        if (yCoordRef.current) yCoordRef.current.textContent = padY;

        lastX = x;
        lastY = y;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove("custom-sniper-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-[999999] overflow-hidden select-none transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* 1. Full-Length Vertical Line (spans top-to-bottom edge across the screen) */}
      <div
        ref={verticalLineRef}
        className="fixed top-0 bottom-0 left-0 w-[1px] h-screen bg-[#f5be58]/55 shadow-[0_0_8px_rgba(245,190,88,0.45)] will-change-transform"
        style={{ transform: "translate3d(-100px, 0, 0)" }}
      />

      {/* 2. Full-Length Horizontal Line (spans left-to-right edge across the screen) */}
      <div
        ref={horizontalLineRef}
        className="fixed top-0 left-0 right-0 h-[1px] w-screen bg-[#f5be58]/55 shadow-[0_0_8px_rgba(245,190,88,0.45)] will-change-transform"
        style={{ transform: "translate3d(0, -100px, 0)" }}
      />

      {/* 3. Intersection Target Reticle & Coordinates HUD */}
      <div
        ref={intersectionRef}
        className="fixed top-0 left-0 will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        {/* Glowing Intersection Target Box matching the reference image */}
        <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          {/* Outer glowing square box */}
          <div className="w-[16px] h-[16px] border border-[#f5be58] bg-[#f5be58]/15 shadow-[0_0_12px_rgba(245,190,88,0.7)]" />
          {/* Inner precision center dot */}
          <div className="absolute w-[3px] h-[3px] bg-white rounded-full shadow-[0_0_4px_#ffffff]" />
        </div>

        {/* Clean X Y Coordinates Display directly adjacent to the intersection */}
        <div className="absolute top-[8px] left-[10px] flex items-center gap-2.5 font-mono text-[10px] tracking-wider text-[#f5be58] font-medium bg-black/75 px-1.5 py-0.5 rounded-[2px] border border-[#f5be58]/30 shadow-md whitespace-nowrap">
          <div className="flex items-center gap-1">
            <span className="text-white/50 text-[9px]">X</span>
            <span ref={xCoordRef}>0000</span>
          </div>
          <span className="text-white/30">|</span>
          <div className="flex items-center gap-1">
            <span className="text-white/50 text-[9px]">Y</span>
            <span ref={yCoordRef}>0000</span>
          </div>
        </div>
      </div>
    </div>
  );
}
