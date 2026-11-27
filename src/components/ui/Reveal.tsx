"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Delay in ms before the reveal starts once the element is visible. */
  delay?: number;
}

/**
 * Fades a block up once it scrolls into view. Renders visible by default, so
 * server output and no-JS visitors see the full content. Only blocks that start
 * below the fold are hidden, and only after mount. Reduced-motion users are
 * never hidden. Animation is opacity + transform only, so layout does not shift.
 */
export default function Reveal({ children, as: Tag = "div", className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (el.getBoundingClientRect().top >= window.innerHeight * 0.92) {
      el.dataset.reveal = "hidden";
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          el.dataset.reveal = entry.isIntersecting ? "shown" : "hidden";
        }
      },
      { threshold: 0.02, rootMargin: "-20px 0px -20px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
