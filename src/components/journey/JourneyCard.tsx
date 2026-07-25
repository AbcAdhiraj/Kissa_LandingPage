"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface JourneyCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  years: string;
  accent: string;
  index: number;
  span?: "normal" | "wide";
  doodle?: string;
  children?: React.ReactNode;
}

export function JourneyCard({
  icon: Icon,
  title,
  years,
  accent,
  index,
  span = "normal",
  doodle = "",
  children,
}: JourneyCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        className="relative cursor-pointer select-none"
        style={{ perspective: 1000 }}
        onClick={() => setIsFlipped(!isFlipped)}
        whileHover={{ y: -4 }}
      >
        <motion.div
          className="relative"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Front */}
          <div
            className="rounded-2xl shadow-lg border border-white/50 flex flex-col"
            style={{
              backgroundColor: accent,
              padding: span === "wide" ? "1.75rem" : "1.25rem",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <span><Icon /></span>
              {doodle && span === "normal" && (
                <span className="text-sm opacity-40">{doodle.split(" ").slice(0, 2).join(" ")}</span>
              )}
            </div>
            <h3
              className={`font-bold ${span === "wide" ? "text-xl" : "text-base"}`}
              style={{
                color: "#1F4D3A",
                fontFamily: "var(--font-plus-jakarta)",
              }}
            >
              {title}
            </h3>
            <p
              className="text-xs opacity-60 mt-0.5"
              style={{ color: "#1F4D3A" }}
            >
              {years}
            </p>
            {span === "wide" && doodle && (
              <p className="text-lg mt-auto pt-3 opacity-50">{doodle}</p>
            )}
            {span === "normal" && (
              <div
                className="mt-auto pt-3 flex items-center gap-1 text-xs opacity-40"
                style={{ color: "#1F4D3A" }}
              >
                <span>Tap</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1F4D3A" strokeWidth="2" strokeLinecap="round" className="opacity-40">
                  <path d="M7 17L17 7" />
                  <path d="M7 7H17V17" />
                </svg>
              </div>
            )}
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-2xl shadow-lg border border-white/50 flex flex-col"
            style={{
              backgroundColor: accent,
              padding: span === "wide" ? "1.25rem" : "1rem",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="flex flex-col items-center justify-center flex-1 text-center [&_p]:text-xs [&_p]:leading-snug [&_p]:mb-1 [&_p:last-child]:text-sm [&_p:last-child]:opacity-60">
              {children}
              <button
                className="mt-2 text-[10px] underline opacity-40"
                style={{ color: "#1F4D3A" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
              >
                Tap to close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
