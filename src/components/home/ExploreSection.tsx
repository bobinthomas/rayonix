"use client";

import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";
import TransformingHeading from "@/components/ui/TransformingHeading";
import NewsCard from "@/components/home/NewsCard";
import { CAREERS_LABEL } from "@/content/site";
import { NEWSROOM_INTRO, formatNewsDate, homepageNews } from "@/content/news";

export default function ExploreSection() {
  return (
    <section
      className="relative w-full bg-[#f5f6f6] text-[#080f12] py-16 lg:py-[80px] rounded-none"
      aria-label="Explore Rayonix"
      data-node-id="440:557"
    >
      <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 flex flex-col gap-12 lg:gap-[40px]">
        {/* Section Heading with Decrypt Animation matching Figma node 440:558 */}
        <div>
          <TransformingHeading
            as="h2"
            segments={[
              {
                text: "Explore Rayonix",
                className: "text-[#080f12]",
              },
              {
                text: ".",
                className: "text-[#e22328] font-bold",
              },
            ]}
            accentDot={false}
            className="type-hero"
          />
        </div>

        {/* 1. Featured Company Story Card (h-[653px]) matching Figma node 440:559 */}
        <div
          className="relative w-full h-[550px] sm:h-[653px] rounded-[12px] overflow-hidden border border-[#c4c9cc] bg-black shadow-lg flex flex-col justify-end p-8 sm:p-14 group"
          data-node-id="440:559"
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <Image
              src="/assets/story-company-v5.webp"
              alt="The Rayonix Story"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Dark gradient for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          <div
            className="relative z-10 max-w-[535px] flex flex-col gap-[12px]"
            data-node-id="440:561"
          >
            <span
              className="type-eyebrow text-[#e8141a] "
              data-node-id="440:562"
            >
              01 / COMPANY
            </span>
            <h3
              className="type-h2 text-[#f5f6f6] "
              data-node-id="440:563"
            >
              The Rayonix Story.
            </h3>
            <p
              className="type-body-lg text-[#f5f6f6]/90 "
              data-node-id="440:564"
            >
              Discover our mission, vision and approach to advancing defence technology.
            </p>
            <div className="pt-2">
              <CTAButton href="/about" variant="primary" aria-label="Learn about the Rayonix story">
                Learn about Rayonix
              </CTAButton>
            </div>
          </div>
        </div>

        {/* 2. Side-by-Side 2 Cards (h-[510px]) matching Figma nodes 440:566 & 440:579 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-[18px]">
          {/* Card 02 / ECOSYSTEM */}
          <div
            className="relative w-full h-[480px] sm:h-[510px] rounded-[12px] overflow-hidden border border-[#c4c9cc] bg-black shadow-md flex flex-col justify-end p-8 sm:p-10 group"
            data-node-id="440:566"
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <Image
                src="/assets/story-ecosystem-v5.webp"
                alt="The Rayonix Ecosystem"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
            </div>

            <div
              className="relative z-10 flex flex-col gap-[15px] max-w-[442px]"
              data-node-id="440:569"
            >
              <span
                className="type-eyebrow text-[#f5f6f6]/80 "
                data-node-id="440:570"
              >
                02 / ECOSYSTEM
              </span>
              <h3
                className="type-h2 text-[#f5f6f6] "
                data-node-id="440:571"
              >
                The Rayonix Ecosystem.
              </h3>
              <p
                className="type-body-lg text-[#f5f6f6]/90 "
                data-node-id="440:572"
              >
                Explore the specialised engineering, innovation and manufacturing entities behind our capabilities.
              </p>
              <div className="pt-2">
                <CTAButton href="/ecosystem" variant="primary" aria-label="Explore the Rayonix ecosystem">
                  Explore the Ecosystem
                </CTAButton>
              </div>
            </div>
          </div>

          {/* Card 03 / CAREERS */}
          <div
            className="relative w-full h-[480px] sm:h-[510px] rounded-[12px] overflow-hidden border border-[#c4c9cc] bg-black shadow-md flex flex-col justify-end p-8 sm:p-10 group"
            data-node-id="440:579"
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <Image
                src="/assets/story-careers-v5.webp"
                alt="Build What's Next"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
            </div>

            <div
              className="relative z-10 flex flex-col gap-[16px] max-w-[516px]"
              data-node-id="440:584"
            >
              <span
                className="type-eyebrow text-[#f5f6f6]/80 "
                data-node-id="440:585"
              >
                03 / {CAREERS_LABEL.toUpperCase()}
              </span>
              <h3
                className="type-h2 text-[#f5f6f6] "
                data-node-id="440:586"
              >
                Build What’s Next.
              </h3>
              <p
                className="type-body-lg text-[#f5f6f6]/90 "
                data-node-id="440:587"
              >
                Explore opportunities to work across engineering, technology and defence innovation.
              </p>
              <div className="pt-2">
                <CTAButton href="/careers" variant="primary" aria-label={`${CAREERS_LABEL} at Rayonix`}>
                  {CAREERS_LABEL}
                </CTAButton>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Sub-Section: The Latest from Rayonix matching Figma node 440:574 */}
        <div
          className="pt-16 lg:pt-20 flex flex-col gap-[28px]"
          data-node-id="440:574"
        >
          {/* Header Row with Explore News Button */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2">
            <div>
              <TransformingHeading
                as="h3"
                segments={[
                  {
                    text: NEWSROOM_INTRO.heading.replace(/\.$/, ""),
                    className: "text-[#080f12]",
                  },
                  {
                    text: ".",
                    className: "text-[#e22328] font-bold",
                  },
                ]}
                accentDot={false}
                className="type-h2 "
              />
              <p
                className="type-body-lg text-[#080f12]/80 max-w-[805px] mt-2"
                data-node-id="440:577"
              >
                {NEWSROOM_INTRO.body}
              </p>
            </div>

            <div>
              <CTAButton href="/news" variant="secondary">
                {NEWSROOM_INTRO.cta}
              </CTAButton>
            </div>
          </div>

          {/* Newest stories from src/content/news.ts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {homepageNews.slice(0, 2).map((story, i) => (
              <NewsCard
                key={story.slug}
                variant={i === 0 ? "slate" : "deep"}
                title={story.title}
                imageSrc={story.image?.src}
                imageAlt={story.image?.alt ?? ""}
                description={story.summary[0] ?? ""}
                buttons={story.buttons}
                source={story.source ?? story.category}
                date={formatNewsDate(story.date) ?? ""}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
