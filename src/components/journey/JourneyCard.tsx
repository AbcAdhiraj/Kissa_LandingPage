"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        className="relative cursor-pointer select-none h-full"
        style={{ perspective: 1000 }}
        onClick={() => setIsFlipped(!isFlipped)}
        whileHover={{ y: -4 }}
      >
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div
              key="front"
              className="rounded-2xl shadow-lg border border-white/50 h-full flex flex-col"
              style={{
                backgroundColor: accent,
                padding: span === "wide" ? "1.75rem" : "1.25rem",
              }}
              initial={false}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start justify-between mb-2">
                <span className={span === "wide" ? "" : ""}>
                  <Icon />
                </span>
                {doodle && span === "normal" && (
                  <span className="text-sm opacity-40">{doodle.split(" ").slice(0, 2).join(" ")}</span>
                )}
              </div>
              <h3
                className={`font-bold ${
                  span === "wide" ? "text-xl" : "text-base"
                }`}
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
            </motion.div>
          ) : (
            <motion.div
              key="back"
              className="rounded-2xl shadow-lg border border-white/50 h-full flex flex-col"
              style={{
                backgroundColor: accent,
                padding: span === "wide" ? "1.75rem" : "1.25rem",
              }}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center justify-center flex-1 text-center">
                {children}
                <button
                  className="mt-3 text-xs underline opacity-40"
                  style={{ color: "#1F4D3A" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                >
                  Tap to close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
