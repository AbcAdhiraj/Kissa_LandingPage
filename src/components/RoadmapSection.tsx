"use client";

import { motion } from "framer-motion";

const mvps = [
  {
    number: "MVP 1",
    title: "Kahani",
    subtitle: "Chat App",
    description:
      "Users share stories, photos, videos, and voice notes, and the AI learns from them to create a conversational digital version of the person.",
    accent: "#F5EDD6",
    tagColor: "#1F4D3A",
    isActive: true,
  },
  {
    number: "MVP 2",
    title: "Kathan",
    subtitle: "Voice Agent",
    description:
      "The avatar can speak using the person's voice, matching their pauses, pitch, tone, and speaking style.",
    accent: "#E87060",
    tagColor: "#E87060",
  },
  {
    number: "MVP 3",
    title: "Kirdaar",
    subtitle: "Video Call Agent",
    description:
      "A visual digital avatar that can have video conversations, creating the experience of actually talking to that person.",
    accent: "#7EC8E3",
    tagColor: "#7EC8E3",
  },
];

function MvpCard({
  mvp,
  index,
}: {
  mvp: (typeof mvps)[0];
  index: number;
}) {
  return (
    <motion.div
      className="relative rounded-2xl p-6 sm:p-8 border border-white/50 shadow-lg overflow-hidden group cursor-default"
      style={{ backgroundColor: "#FAF8F3" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* In progress badge */}
      {mvp.isActive && (
        <motion.div
          className="absolute top-3 right-3 z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.15 + 0.4 }}
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
        className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 group-hover:h-2"
        style={{ backgroundColor: mvp.tagColor }}
      />

      <div className="flex flex-col gap-3">
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
    </motion.div>
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
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-[#1F4D3A]/5 text-[#1F4D3A] text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            What&apos;s Next
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight"
            style={{
              color: "#1F4D3A",
              fontFamily: "var(--font-plus-jakarta)",
            }}
          >
            The Road Ahead
          </h2>
          <p
            className="text-sm sm:text-base lg:text-lg max-w-xl mx-auto mt-3 sm:mt-4 px-4"
            style={{ color: "#2D2D2D/70" }}
          >
            We&apos;re building Kissa in stages. Here&apos;s what we&apos;re launching next.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {mvps.map((mvp, i) => (
            <MvpCard key={mvp.number} mvp={mvp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
