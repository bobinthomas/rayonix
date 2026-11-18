"use client";

import React from "react";
import Link from "next/link";

export interface CTAButtonProps {
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  "aria-label"?: string;
}

export default function CTAButton({
  variant = "primary",
  href,
  onClick,
  type = "button",
  className = "",
  children = "Explore the Technology",
  disabled = false,
  "aria-label": ariaLabel,
}: CTAButtonProps) {
  const isPrimary = variant === "primary";

  // Tactical Segmented Chevron Arrow matching Figma node 156:1087
  const renderArrow = () => (
    <span
      className="relative shrink-0 w-[18px] h-[15px] flex items-center justify-center overflow-visible select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 95 81"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[18px] h-[15px] overflow-visible"
      >
        {/* Rear Chevron Wing */}
        <path
          d="M0.000973671 80.75C-0.0790263 80.61 4.79097 75.57 10.841 69.54L21.821 58.57L35.651 58.67C43.251 58.72 49.531 58.81 49.591 58.88C49.661 58.95 44.731 63.95 38.631 70L27.541 81H13.851C4.99098 81 0.100974 80.91 0.000973671 80.75ZM10.811 11.44C4.78097 5.42 -0.0790263 0.39 0.000973671 0.25C0.100974 0.09 4.99098 0 13.851 0H27.531L38.611 11.01C44.711 17.06 49.651 22.07 49.581 22.13C49.521 22.2 43.231 22.28 35.621 22.31L21.771 22.38L10.811 11.44Z"
          fillRule="evenodd"
          clipRule="evenodd"
          className={`transition-colors duration-300 ${
            isPrimary
              ? "fill-white"
              : "fill-transparent stroke-[#e22328] stroke-[3] group-hover:fill-white group-hover:stroke-none"
          }`}
        />

        {/* Forward Chevron Tip (slides forward and turns red on hover) */}
        <g className="transition-transform duration-300 ease-out group-hover:translate-x-[26px]">
          <path
            d="M25.4336 58.8475L22 58.7051L30.6429 49.7475C35.4009 44.8162 39.2858 40.6678 39.2858 40.5254C39.2858 40.3831 35.4009 36.2347 30.6429 31.3034L22 22.3457L23.0988 22.183C23.707 22.0915 29.8777 22.0102 36.8038 22.0102L49.4101 22L58.2099 31.0899C63.0464 36.0923 67 40.3424 67 40.5254C67 40.7084 63.0562 44.9483 58.2296 49.9305L49.4591 59H39.1583C33.4977 58.9898 27.3172 58.9288 25.4336 58.8475Z"
            fillRule="evenodd"
            clipRule="evenodd"
            className={`transition-colors duration-300 ${
              isPrimary
                ? "fill-white group-hover:fill-[#e31e24]"
                : "fill-transparent stroke-[#e22328] stroke-[3] group-hover:fill-[#e31e24] group-hover:stroke-none"
            }`}
          />
        </g>
      </svg>
    </span>
  );

  const baseClasses =
    "group relative overflow-hidden inline-flex items-center justify-center gap-[16px] px-[20px] py-[13px] rounded-[4px] text-[16px] font-normal leading-[24px] whitespace-nowrap transition-all duration-300 select-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#e22328] focus-visible:ring-offset-2";

  const variantClasses = isPrimary
    ? "bg-[#e22328] hover:bg-[#080f12] text-[#f5f6f6] shadow-sm border border-transparent"
    : "bg-transparent text-[#e22328] group-hover:text-[#f5f6f6] border border-[#e22328] shadow-sm";

  const disabledClasses = disabled
    ? "opacity-50 pointer-events-none cursor-not-allowed"
    : "active:scale-[0.98]";

  const combinedClasses = `${baseClasses} ${variantClasses} ${disabledClasses} ${className}`;

  // Fill element for bottom-to-top background growth on hover
  const renderFill = () => (
    <span
      className={`absolute inset-0 transition-transform duration-300 ease-out z-0 pointer-events-none ${
        isPrimary
          ? "bg-[#080f12] translate-y-full group-hover:translate-y-0"
          : "bg-[#080f12] translate-y-full group-hover:translate-y-0"
      }`}
      aria-hidden="true"
    />
  );

  if (href) {
    return (
      <Link
        href={href}
        prefetch={false}
        className={combinedClasses}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {renderFill()}
        <span className="relative z-10 transition-colors duration-300">{children}</span>
        {renderArrow()}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {renderFill()}
      <span className="relative z-10 transition-colors duration-300">{children}</span>
      {renderArrow()}
    </button>
  );
}
