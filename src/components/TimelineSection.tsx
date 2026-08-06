"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  CollectionIcon,
  ChatIcon,
  WeaveIcon,
  ConnectionIcon,
} from "@/components/journey/ChapterIcons";

const steps = [
  {
    icon: CollectionIcon,
    title: "Gather",
    description: "Upload photos, voice notes, videos, and memories. Every piece of you matters.",
    accent: "#F5EDD6",
  },
  {
    icon: ChatIcon,
    title: "Converse",
    description: "The app asks you questions. You answer naturally, like talking to a friend.",
    accent: "#A8C4A0",
  },
  {
    icon: WeaveIcon,
    title: "Weave",
    description: "A digital avatar is created with your voice, tone and mannerisms — a living reflection of you.",
    accent: "#C4B8D8",
  },
  {
    icon: ConnectionIcon,
    title: "Meet",
    description: "Future generations get to hear those stories from your digital self — with your personality, your laughter, and your heart.",
    accent: "#F5C542",
  },
];

export function TimelineSection() {
  return (
    <section id="timeline" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-[#F5C542]/8 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-[#C4B8D8]/8 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          className="mb-12 sm:mb-16 lg:mb-20"
          eyebrow="How It Works"
          title="Your story comes to life"
          titleClassName="mb-3 sm:mb-4"
          subtitle="Four simple steps to preserve who you are — for generations to come."
        />

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting path */}
          <svg
            className="absolute top-[72px] left-[8%] right-[8%] h-[2px] w-[84%]"
            viewBox="0 0 1000 2"
            preserveAspectRatio="none"
          >
            <path
              d="M0 1 Q125 0 250 1 Q375 2 500 1 Q625 0 750 1 Q875 2 1000 1"
              stroke="#1F4D3A"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              fill="none"
              opacity={0.15}
            />
          </svg>

          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <TimelineStep key={step.title} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden relative">
          {/* Vertical connecting line */}
          <div className="absolute top-24 bottom-0 left-[31px] w-[1.5px] bg-[#1F4D3A]/10" />

          <div className="flex flex-col gap-10">
            {steps.map((step, i) => (
              <MobileTimelineStep key={step.title} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineStep({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Icon circle */}
      <div
        className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-5 shadow-lg border border-white/50 relative z-10"
        style={{ backgroundColor: step.accent }}
      >
        <step.icon />
      </div>

      {/* Step number badge */}
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold -mt-3 mb-4 relative z-10"
        style={{ backgroundColor: "#1F4D3A", color: "#FAF8F3" }}
      >
        {index + 1}
      </div>

      <h3
        className="text-lg font-bold mb-2"
        style={{
          color: "#1F4D3A",
          fontFamily: "var(--font-plus-jakarta)",
        }}
      >
        {step.title}
      </h3>
      <p className="text-sm leading-relaxed max-w-[200px]" style={{ color: "#2D2D2D/70" }}>
        {step.description}
      </p>
    </motion.div>
  );
}

function MobileTimelineStep({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="flex items-start gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-[62px] h-[62px] rounded-full flex items-center justify-center shadow-md border border-white/50 relative z-10"
          style={{ backgroundColor: step.accent }}
        >
          <step.icon />
        </div>
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold -mt-2 relative z-10"
          style={{ backgroundColor: "#1F4D3A", color: "#FAF8F3" }}
        >
          {index + 1}
        </div>
      </div>
      <div className="pt-2">
        <h3
          className="text-base font-bold mb-1"
          style={{
            color: "#1F4D3A",
            fontFamily: "var(--font-plus-jakarta)",
          }}
        >
          {step.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "#2D2D2D/70" }}>
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}
