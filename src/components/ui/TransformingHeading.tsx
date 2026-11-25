"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";

// Axion-style high-tech typographic glyph set for font transformation
const GLYPHS = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'.";

export interface HeadingSegment {
  text: string;
  className?: string;
}

interface TransformingHeadingProps {
  text?: string;
  segments?: HeadingSegment[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "div";
  accentDot?: boolean;
  accentColor?: string;
  speed?: number; // ms per tick, default 25
  scrambleTicks?: number; // number of scrambled ticks per char, default 6
}

export default function TransformingHeading({
  text = "",
  segments,
  className = "",
  as: Component = "h2",
  accentDot = false,
  accentColor = "#e22328",
  speed = 28,
  scrambleTicks = 7,
}: TransformingHeadingProps) {
  const containerRef = useRef<HTMLElement>(null);
  const fullText = useMemo(() => {
    if (segments && segments.length > 0) {
      return segments.map((s) => s.text).join("");
    }
    return text;
  }, [text, segments]);

  const [displayText, setDisplayText] = useState<string>(fullText);
  const [charStates, setCharStates] = useState<boolean[]>(() =>
    new Array(fullText.length).fill(true)
  ); // true = resolved to normal font, false = transformed
  const hasAnimatedRef = useRef<boolean>(false);
  const animFrameRef = useRef<NodeJS.Timeout | null>(null);

  // Map each character index to its segment className
  const charSegmentClasses = useMemo(() => {
    if (!segments || segments.length === 0) return [];
    const classes: (string | undefined)[] = [];
    segments.forEach((seg) => {
      for (let i = 0; i < seg.text.length; i++) {
        classes.push(seg.className);
      }
    });
    return classes;
  }, [segments]);

  // Check prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const runTransformAnimation = () => {
    if (prefersReducedMotion) {
      setDisplayText(fullText);
      setCharStates(new Array(fullText.length).fill(true));
      return;
    }

    if (animFrameRef.current) clearInterval(animFrameRef.current);

    const length = fullText.length;
    // Track tick count per character
    const ticks = new Array(length).fill(0);
    // Stagger start: each character starts after (index * 1.2) ticks
    const startDelays = fullText.split("").map((_, i) => Math.floor(i * 1.2));
    let currentGlobalTick = 0;

    const interval = setInterval(() => {
      currentGlobalTick++;
      let allDone = true;

      const newChars: string[] = [];
      const newStates: boolean[] = [];

      for (let i = 0; i < length; i++) {
        const char = fullText[i];

        if (char === " " || char === "\n" || char === ".") {
          newChars.push(char);
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
        setDisplayText(fullText);
        setCharStates(new Array(length).fill(true));
      }
    }, speed);

    animFrameRef.current = interval;
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasAnimatedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            observer.unobserve(el);
            runTransformAnimation();
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animFrameRef.current) clearInterval(animFrameRef.current);
    };
  }, [fullText, speed, scrambleTicks, prefersReducedMotion]);

  return (
    <Component
      ref={containerRef as any}
      className={`relative select-none inline-block ${className}`}
    >
      {/* Visible text in normal flow, one span per character, so the layout is final from first paint (CLS = 0).
          A scrambling character hides its real glyph and draws the scrambled glyph in an absolutely
          positioned ::after on that same character. Absolute boxes do not affect layout, so the
          animation cannot reflow lines or overlap the content below. */}
      <span aria-hidden="true" className="block">
        {fullText.split("").map((char, i) => {
          if (char === "\n") {
            return <br key={i} className="block" />;
          }
          const resolved = charStates[i] ?? true;
          const glyph = resolved ? "" : displayText[i] ?? "";
          const segClass =
            charSegmentClasses[i] || "font-sans font-bold text-inherit";
          return (
            <span
              key={i}
              aria-hidden="true"
              data-g={glyph}
              className={`${segClass} relative after:absolute after:left-0 after:top-0 after:font-mono after:font-medium after:text-[#bdc4c8] after:opacity-85 after:content-[attr(data-g)]`}
              style={resolved ? undefined : { color: "transparent" }}
            >
              {char}
            </span>
          );
        })}
        {accentDot && (
          <span
            aria-hidden="true"
            style={{ color: accentColor }}
            className="inline font-bold ml-0.5"
          >
            .
          </span>
        )}
      </span>

      {/* Screen-reader text: the only accessible name (letters above are aria-hidden). */}
      <span className="sr-only">
        {fullText}
        {accentDot ? "." : ""}
      </span>
    </Component>
  );
}
