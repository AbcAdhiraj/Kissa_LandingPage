"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const mvps = [
  {
    number: "MVP 1",
    title: "Kahani",
    subtitle: "Chat App",
    description:
      "Users share stories, photos, videos, and voice notes, and the AI learns from them to create a conversational digital version of the person. Freemium model.",
    accent: "#143829",
    tagColor: "#143829",
    isActive: true,
    pricing: { tier: "Chat", price: "$5–$10/month", quota: "200–500 AI messages/month" },
  },
  {
    number: "MVP 2",
    title: "Kathan",
    subtitle: "Voice Agent",
    description:
      "The avatar can speak using the person's voice, matching their pauses, pitch, tone, and speaking style. Freemium model.",
    accent: "#B84A3E",
    tagColor: "#B84A3E",
    pricing: { tier: "Voice", price: "$10–$20/month", quota: "100–300 minutes/month" },
  },
  {
    number: "MVP 3",
    title: "Kirdaar",
    subtitle: "Video Call Agent",
    description:
      "A visual digital avatar that can have video conversations, creating the experience of actually talking to that person.",
    accent: "#2B6CB0",
    tagColor: "#2B6CB0",
    pricing: { tier: "Video", price: "$19–$29/month", quota: "10–30 minutes/month" },
  },
];

function MvpCard({
  mvp,
  index,
}: {
  mvp: (typeof mvps)[0];
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative [perspective:1000px] cursor-pointer h-full"
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        className="relative rounded-2xl border border-white/50 shadow-lg overflow-hidden min-h-[320px]"
        style={{ backgroundColor: "#FAF8F3", transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div
          className="transition-transform duration-500"
          style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* Front */}
          <div style={{ backfaceVisibility: "hidden" }}>
            <div className="p-6 sm:p-8">
              {/* In progress badge */}
              {mvp.isActive && (
                <motion.div
                  className="absolute top-3 right-3 z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider shadow-sm border border-white/60"
                    style={{ backgroundColor: "#1F4D3A", color: "#FAF8F3" }}
                  >
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-[#F5C542] inline-block"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    In Progress
                  </div>
                </motion.div>
              )}

              {/* Accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: mvp.tagColor }}
              />

              <div className="flex flex-col gap-3 mt-1">
                <div
                  className="inline-flex self-start px-3 py-1 rounded-full text-xs font-bold tracking-wider"
                  style={{
                    backgroundColor: `${mvp.tagColor}15`,
                    color: mvp.tagColor,
                  }}
                >
                  {mvp.number}
                </div>
                <h3
                  className="text-xl sm:text-2xl font-extrabold tracking-tight"
                  style={{
                    color: "#1F4D3A",
                    fontFamily: "var(--font-plus-jakarta)",
                  }}
                >
                  {mvp.title}
                </h3>
                <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: mvp.tagColor }}>
                  {mvp.subtitle}
                </span>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#2D2D2D/70" }}>
                  {mvp.description}
                </p>
              </div>

              {/* Flip hint */}
              <div className="mt-3 text-[10px] tracking-widest uppercase text-center opacity-50" style={{ color: mvp.tagColor }}>
                Click to see pricing
              </div>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 p-6 sm:p-8 flex flex-col items-center justify-center rounded-2xl"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", backgroundColor: "#FAF8F3" }}
          >
            {/* Accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1.5"
              style={{ backgroundColor: mvp.tagColor }}
            />

            <div className="w-full flex flex-col items-center gap-4 mt-2">
              <h4
                className="text-sm font-bold tracking-widest uppercase"
                style={{ color: mvp.tagColor }}
              >
                {mvp.subtitle}
              </h4>
              <h3
                className="text-2xl sm:text-3xl font-extrabold tracking-tight text-center"
                style={{
                  color: "#1F4D3A",
                  fontFamily: "var(--font-plus-jakarta)",
                }}
              >
                {mvp.pricing.price}
              </h3>

              {/* Quota badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: `${mvp.tagColor}12`,
                  color: mvp.tagColor,
                }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {mvp.pricing.quota}
              </div>

              {/* Divider */}
              <div className="w-12 h-px" style={{ backgroundColor: `${mvp.tagColor}30` }} />

              {/* Freemium note */}
              {(mvp.pricing.tier === "Chat" || mvp.pricing.tier === "Voice") && (
                <div className="text-xs text-center leading-relaxed px-2" style={{ color: "#2D2D2D/70" }}>
                  Free tier available with limited usage
                </div>
              )}

              {/* Flip back hint */}
              <button
                className="mt-1 text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full transition-opacity hover:opacity-100"
                style={{
                  color: mvp.tagColor,
                  backgroundColor: `${mvp.tagColor}10`,
                  opacity: 0.6,
                }}
              >
                Flip back
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function RoadmapSection() {
  return (
    <section id="roadmap" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#C4B8D8]/8 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-[#F5C542]/8 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeader
          animate
          className="mb-12 sm:mb-16"
          eyebrow={<>What&apos;s Next</>}
          title="The Road Ahead"
          subtitle={
            <>
              We&apos;re building Kissa in stages. Here&apos;s what we&apos;re launching next.
            </>
          }
          subtitleClassName="mt-3 sm:mt-4"
        />

        <div className="grid gap-6 sm:gap-8 md:grid-cols-3 items-stretch">
          {mvps.map((mvp, i) => (
            <MvpCard key={mvp.number} mvp={mvp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
