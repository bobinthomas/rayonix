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
  justifyWords?: boolean; // Spreads words edge-to-edge across container width above 1280px
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
  justifyWords = false,
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

  // Build word groupings if justifyWords is enabled
  const words = useMemo(() => {
    if (!justifyWords) return null;
    const result: Array<Array<{ char: string; index: number }>> = [];
    let currentWord: Array<{ char: string; index: number }> = [];

    for (let i = 0; i < displayText.length; i++) {
      const char = displayText[i];
      if (char === " ") {
        if (currentWord.length > 0) {
          result.push(currentWord);
          currentWord = [];
        }
      } else {
        currentWord.push({ char, index: i });
      }
    }
    if (currentWord.length > 0) {
      result.push(currentWord);
    }
    return result;
  }, [justifyWords, displayText]);

  return (
    <Component
      ref={containerRef as any}
      className={`select-none ${justifyWords ? "w-full block" : "inline-block"} ${className}`}
      aria-label={fullText}
    >
      {justifyWords && words ? (
        <span
          aria-hidden="true"
          className="w-full flex flex-wrap gap-x-3 sm:gap-x-4 xl:flex-nowrap xl:justify-between items-baseline"
        >
          {words.map((wordGroup, wordIdx) => {
            const isLastWord = wordIdx === words.length - 1;
            return (
              <span key={wordIdx} className="inline-block whitespace-nowrap">
                {wordGroup.map(({ char, index }) => {
                  const isResolved = charStates[index] ?? true;
                  const segmentClass = charSegmentClasses[index];
                  return (
                    <span
                      key={index}
                      className={`transition-colors duration-150 ${
                        isResolved
                          ? segmentClass || "font-sans font-bold text-inherit"
                          : "font-mono font-medium text-[#bdc4c8] scale-105 inline-block opacity-85"
                      }`}
                    >
                      {char}
                    </span>
                  );
                })}
                {isLastWord && accentDot && (
                  <span
                    style={{ color: accentColor }}
                    className="transition-transform duration-300 inline-block font-bold ml-0.5"
                  >
                    .
                  </span>
                )}
              </span>
            );
          })}
        </span>
      ) : (
        <span aria-hidden="true" className="inline">
          {displayText.split("").map((char, index) => {
            if (char === "\n") {
              return <br key={index} className="block" />;
            }
            const isResolved = charStates[index] ?? true;
            const segmentClass = charSegmentClasses[index];
            return (
              <span
                key={index}
                className={`transition-colors duration-150 ${
                  isResolved
                    ? segmentClass || "font-sans font-bold text-inherit"
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
              className="transition-transform duration-300 inline-block font-bold ml-0.5"
            >
              .
            </span>
          )}
        </span>
      )}
      {/* Screen-reader accessible full text */}
      <span className="sr-only">{fullText}{accentDot ? "." : ""}</span>
    </Component>
  );
}
