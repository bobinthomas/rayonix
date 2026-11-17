"use client";

import React, { useEffect, useRef, useState } from "react";

export default function SniperCursor() {
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isFiring, setIsFiring] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch / mobile devices
    if (
      typeof window === "undefined" ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches
    ) {
      setIsTouchDevice(true);
      return;
    }

    // Hide default cursor on desktop
    document.documentElement.classList.add("custom-sniper-cursor");

    const onMouseMove = (e: MouseEvent) => {
      coordsRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, [role="button"], [role="tab"], input, select, textarea, [data-interactive="true"]'
        );
        setIsLocked(!!interactive);
      }
    };

    const onMouseDown = () => setIsFiring(true);
    const onMouseUp = () => setIsFiring(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Render loop using requestAnimationFrame for 120fps hardware-accelerated tracking
    let lastRenderX = 0;
    let lastRenderY = 0;

    const render = () => {
      const { x, y } = coordsRef.current;

      if (cursorRef.current && (x !== lastRenderX || y !== lastRenderY)) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        setCoords({ x, y });
        lastRenderX = x;
        lastRenderY = y;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove("custom-sniper-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  // Format 4-digit coordinates
  const formattedX = String(Math.max(0, Math.round(coords.x))).padStart(4, "0");
  const formattedY = String(Math.max(0, Math.round(coords.y))).padStart(4, "0");

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[999999] will-change-transform select-none transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      {/* Precision Sniper Crosshair Container (centered at 0,0) */}
      <div
        className={`relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out ${
          isFiring ? "scale-90" : isLocked ? "scale-115" : "scale-100"
        }`}
      >
        {/* Outer Circular Reticle Ring */}
        <div
          className={`w-[38px] h-[38px] rounded-full border transition-colors duration-200 ${
            isLocked
              ? "border-[#e22328] bg-[#e22328]/10 shadow-[0_0_12px_rgba(226,35,40,0.45)]"
              : "border-white/25 bg-black/5"
          }`}
        />

        {/* Inner Reticle Ring */}
        <div
          className={`absolute w-[18px] h-[18px] rounded-full border border-dashed transition-colors duration-200 ${
            isLocked ? "border-[#e22328]/70" : "border-white/15"
          }`}
        />

        {/* Center Target Dot */}
        <div
          className={`absolute w-[3px] h-[3px] rounded-full transition-colors duration-200 ${
            isLocked ? "bg-[#e22328] shadow-[0_0_6px_#e22328]" : "bg-white"
          }`}
        />

        {/* 4 Cardinal Crosshair Hairlines (with center deadzone gap) */}
        {/* Top Hairline */}
        <div
          className={`absolute -top-[14px] w-[1px] h-[10px] transition-colors duration-200 ${
            isLocked ? "bg-[#e22328]" : "bg-white/40"
          }`}
        />
        {/* Bottom Hairline */}
        <div
          className={`absolute -bottom-[14px] w-[1px] h-[10px] transition-colors duration-200 ${
            isLocked ? "bg-[#e22328]" : "bg-white/40"
          }`}
        />
        {/* Left Hairline */}
        <div
          className={`absolute -left-[14px] h-[1px] w-[10px] transition-colors duration-200 ${
            isLocked ? "bg-[#e22328]" : "bg-white/40"
          }`}
        />
        {/* Right Hairline */}
        <div
          className={`absolute -right-[14px] h-[1px] w-[10px] transition-colors duration-200 ${
            isLocked ? "bg-[#e22328]" : "bg-white/40"
          }`}
        />

        {/* 4 Corner Locking Brackets (appear prominently on lock) */}
        {isLocked && (
          <div className="absolute inset-[-4px] pointer-events-none">
            <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#e22328]" />
            <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#e22328]" />
            <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#e22328]" />
            <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#e22328]" />
          </div>
        )}
      </div>

      {/* Real-Time Military Coordinates HUD Display */}
      <div className="absolute top-[16px] left-[18px] flex flex-col gap-0.5 bg-black/85 backdrop-blur-[4px] px-2 py-1 rounded-[2px] border border-white/10 shadow-lg text-[9px] font-mono tracking-wider">
        <div className="flex items-center gap-1.5">
          <span className="text-white/40">X:</span>
          <span className={`font-semibold ${isLocked ? "text-[#e22328]" : "text-[#f5f6f6]"}`}>
            {formattedX}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-white/40">Y:</span>
          <span className={`font-semibold ${isLocked ? "text-[#e22328]" : "text-[#f5f6f6]"}`}>
            {formattedY}
          </span>
        </div>
        <div
          className={`text-[8px] font-bold uppercase tracking-widest pt-0.5 border-t border-white/10 transition-colors duration-200 ${
            isLocked ? "text-[#e22328]" : "text-[#7f8a91]"
          }`}
        >
          {isLocked ? "TARGET LOCKED" : "RAYONIX // HUD"}
        </div>
      </div>
    </div>
  );
}
