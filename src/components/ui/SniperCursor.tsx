"use client";

import React, { useEffect, useRef, useState } from "react";

const PADDING = 16; // 16px inset from viewport edges
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [role="tab"], input, select, textarea, summary, label[for], [data-cursor="pointer"]';

export default function SniperCursor() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const verticalLineRef = useRef<HTMLDivElement>(null);
  const horizontalLineRef = useRef<HTMLDivElement>(null);
  const intersectionRef = useRef<HTMLDivElement>(null);
  const xCoordRef = useRef<HTMLSpanElement>(null);
  const yCoordRef = useRef<HTMLSpanElement>(null);

  const mousePos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const visibleRef = useRef<boolean>(false);
  const hoveringRef = useRef<boolean>(false);
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
      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }

      const target = e.target instanceof Element ? e.target.closest(INTERACTIVE_SELECTOR) : null;
      const nextHover = target !== null;
      if (hoveringRef.current !== nextHover) {
        hoveringRef.current = nextHover;
        setIsHovering(nextHover);
      }
    };

    const onMouseLeave = () => {
      visibleRef.current = false;
      hoveringRef.current = false;
      setIsVisible(false);
      setIsHovering(false);
    };
    const onMouseEnter = () => {
      visibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // High-performance 120fps hardware-accelerated direct DOM transform loop
    let lastX = -1;
    let lastY = -1;

    const render = () => {
      const { x, y } = mousePos.current;

      if (x !== lastX || y !== lastY) {
        // Vertical line position is relative to the padded container,
        // so we subtract PADDING from the mouse position
        const relX = x - PADDING;
        const relY = y - PADDING;

        // Full-length vertical line: translate along X within padded container
        if (verticalLineRef.current) {
          verticalLineRef.current.style.transform = `translate3d(${relX}px, 0, 0)`;
        }

        // Full-length horizontal line: translate along Y within padded container
        if (horizontalLineRef.current) {
          horizontalLineRef.current.style.transform = `translate3d(0, ${relY}px, 0)`;
        }

        // Intersection reticle & coordinates HUD
        if (intersectionRef.current) {
          intersectionRef.current.style.transform = `translate3d(${relX}px, ${relY}px, 0)`;
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
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      ref={containerRef}
      className={`sniper-cursor-container fixed pointer-events-none z-[999999] overflow-hidden select-none transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        top: PADDING,
        right: PADDING,
        bottom: PADDING,
        left: PADDING,
      }}
      aria-hidden="true"
    >
      {/* 1. Subtle Full-Length Vertical Line (zero glow, crisp subtle hairline) */}
      <div
        ref={verticalLineRef}
        className={`absolute top-0 bottom-0 left-0 w-px will-change-transform transition-colors duration-200 ${
          isHovering ? "bg-[#e22328]/25" : "bg-white/[0.12]"
        }`}
        style={{ transform: "translate3d(-100px, 0, 0)" }}
      />

      {/* 2. Subtle Full-Length Horizontal Line (zero glow, crisp subtle hairline) */}
      <div
        ref={horizontalLineRef}
        className={`absolute top-0 left-0 right-0 h-px will-change-transform transition-colors duration-200 ${
          isHovering ? "bg-[#e22328]/25" : "bg-white/[0.12]"
        }`}
        style={{ transform: "translate3d(0, -100px, 0)" }}
      />

      {/* 3. Intersection Target Reticle & Coordinates HUD (Rayonix Design System) */}
      <div
        ref={intersectionRef}
        className="absolute top-0 left-0 will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        {/* Subtle Intersection Reticle Box (morphs to diamond lock-on on interactive targets) */}
        <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          {/* Outer hairline square box */}
          <div
            className={`w-[14px] h-[14px] border transition-[transform,border-color,background-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isHovering
                ? "sniper-reticle-lock border-[#e22328] bg-[#e22328]/10"
                : "scale-100 rotate-0 border-white/20 bg-transparent"
            }`}
          />
          {/* Inner precision center dot in Rayonix Brand Red */}
          <div
            className={`absolute w-[2.5px] h-[2.5px] bg-[#e22328] rounded-full transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isHovering ? "sniper-dot-pulse" : "scale-100"
            }`}
          />
        </div>

        {/* Clean, Subtle X Y Coordinates Display directly adjacent to the intersection */}
        <div
          className={`absolute top-[8px] left-[10px] flex items-center gap-2 font-mono text-[10px] tracking-wider bg-[#080f12]/90 px-1.5 py-0.5 rounded-[2px] border select-none whitespace-nowrap transition-colors duration-200 ${
            isHovering ? "border-[#e22328]/45" : "border-white/[0.08]"
          }`}
        >
          <div className="flex items-center gap-1">
            <span className="text-[#7f8a91] text-[9px]">X</span>
            <span ref={xCoordRef} className="text-[#f5f6f6] font-medium">0000</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1">
            <span className="text-[#7f8a91] text-[9px]">Y</span>
            <span ref={yCoordRef} className="text-[#f5f6f6] font-medium">0000</span>
          </div>
        </div>
      </div>
    </div>
  );
}
