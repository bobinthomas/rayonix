"use client";

import React from "react";

/**
 * Pill tab — the single tab style for the site (Figma: Home "One Connected Defense Ecosystem").
 * Inactive: grey pill. Active: dark pill with a red progress bar that grows over the
 * auto-advance interval; `onProgressEnd` fires when it completes.
 * With prefers-reduced-motion the bar renders full-width and never auto-advances.
 */
type PillTabProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  active: boolean;
  /** Pause the progress bar (e.g. while the section is hovered). */
  paused?: boolean;
  /** Called when the active tab's progress bar completes — advance to the next tab here. */
  onProgressEnd?: () => void;
  ref?: React.Ref<HTMLButtonElement>;
};

export default function PillTab({
  active,
  paused = false,
  onProgressEnd,
  className = "",
  children,
  ref,
  ...rest
}: PillTabProps) {
  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={active}
      className={`group relative px-[9px] sm:px-[10px] xl:px-[11px] py-[9px] sm:py-[10px] xl:py-[12px] rounded-[4px] type-caption font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap overflow-hidden select-none border-0 outline-none focus-visible:ring-2 focus-visible:ring-[#e22328] ${
        active ? "bg-[#10181c] text-[#f1f2f2]" : "bg-[#9da1a4] text-white hover:bg-[#868c90]"
      } ${className}`}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
      {active && (
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[2px] w-full bg-[#e22328] animate-tab-progress motion-reduce:animate-none"
          style={{ animationPlayState: paused ? "paused" : "running" }}
          onAnimationEnd={() => {
            if (!paused) onProgressEnd?.();
          }}
        />
      )}
    </button>
  );
}
