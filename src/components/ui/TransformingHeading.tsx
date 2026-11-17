"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";

// Axion-style high-tech typographic glyph set for font transformation
const GLYPHS = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'.";

interface TransformingHeadingProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "div";
  accentDot?: boolean;
  accentColor?: string;
  speed?: number; // ms per tick, default 25
  scrambleTicks?: number; // number of scrambled ticks per char, default 6
}

export default function TransformingHeading({
  text,
  className = "",
  as: Component = "h2",
  accentDot = false,
  accentColor = "#e22328",
  speed = 28,
  scrambleTicks = 7,
}: TransformingHeadingProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [displayText, setDisplayText] = useState<string>(text);
  const [charStates, setCharStates] = useState<boolean[]>(() =>
    new Array(text.length).fill(true)
  ); // true = resolved to normal font, false = transformed
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const animFrameRef = useRef<NodeJS.Timeout | null>(null);

  // Check prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const runTransformAnimation = () => {
    if (prefersReducedMotion) {
      setDisplayText(text);
      setCharStates(new Array(text.length).fill(true));
      return;
    }

    if (animFrameRef.current) clearInterval(animFrameRef.current);

    const length = text.length;
    // Track tick count per character
    const ticks = new Array(length).fill(0);
    // Stagger start: each character starts after (index * 1.5) ticks
    const startDelays = text.split("").map((_, i) => Math.floor(i * 1.2));
    let currentGlobalTick = 0;

    const interval = setInterval(() => {
      currentGlobalTick++;
      let allDone = true;

      const newChars: string[] = [];
      const newStates: boolean[] = [];

      for (let i = 0; i < length; i++) {
        const char = text[i];

        if (char === " ") {
          newChars.push(" ");
          newStates.push(true);
          continue;
        }

        // Before this character's start delay, keep as transformed glyph
        if (currentGlobalTick < startDelays[i]) {
          allDone = false;
          // Random glyph in transformed font state
          const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          newChars.push(glyph);
          newStates.push(false);
        } else {
          ticks[i]++;
          if (ticks[i] < scrambleTicks) {
            allDone = false;
            // Mid-transformation: rapidly cycling glyphs
            const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            newChars.push(glyph);
            newStates.push(false);
          } else {
            // Settled into normal font!
            newChars.push(char);
            newStates.push(true);
          }
        }
      }

      setDisplayText(newChars.join(""));
      setCharStates(newStates);

      if (allDone) {
        clearInterval(interval);
        animFrameRef.current = null;
        setDisplayText(text);
        setCharStates(new Array(length).fill(true));
      }
    }, speed);

    animFrameRef.current = interval;
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runTransformAnimation();
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animFrameRef.current) clearInterval(animFrameRef.current);
    };
  }, [text, speed, scrambleTicks, prefersReducedMotion]);

  return (
    <Component
      ref={containerRef as any}
      className={`inline-block select-none ${className}`}
      aria-label={text}
    >
      <span aria-hidden="true" className="inline">
        {displayText.split("").map((char, index) => {
          const isResolved = charStates[index] ?? true;
          return (
            <span
              key={index}
              className={`transition-colors duration-150 ${
                isResolved
                  ? "font-sans font-bold text-inherit"
                  : "font-mono font-medium text-[#bdc4c8] scale-105 inline-block opacity-85"
              }`}
            >
              {char}
            </span>
          );
        })}
        {accentDot && (
          <span
            style={{ color: accentColor }}
            className="transition-transform duration-300 inline-block"
          >
            .
          </span>
        )}
      </span>
      {/* Screen-reader accessible full text */}
      <span className="sr-only">{text}{accentDot ? "." : ""}</span>
    </Component>
  );
}
