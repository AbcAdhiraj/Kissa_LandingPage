"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface SectionHeaderProps {
  /** Small pill/eyebrow label shown above the title. */
  eyebrow: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Animate the header into view on scroll. */
  animate?: boolean;
  /** Margin/spacing classes for the wrapper. */
  className?: string;
  /** Override the eyebrow pill background/text colors. */
  eyebrowClassName?: string;
  /** Extra classes for the title (e.g. bottom margin). */
  titleClassName?: string;
  /** Extra classes for the subtitle (e.g. top margin). */
  subtitleClassName?: string;
}

const HEADING_STYLE = {
  color: "#1F4D3A",
  fontFamily: "var(--font-plus-jakarta)",
} as const;

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  animate = false,
  className = "",
  eyebrowClassName = "bg-[#1F4D3A]/5 text-[#1F4D3A]",
  titleClassName = "",
  subtitleClassName = "",
}: SectionHeaderProps) {
  const content = (
    <>
      <span
        className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4 ${eyebrowClassName}`}
      >
        {eyebrow}
      </span>
      <h2
        className={`text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight ${titleClassName}`}
        style={HEADING_STYLE}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-sm sm:text-base lg:text-lg max-w-xl mx-auto px-4 ${subtitleClassName}`}
          style={{ color: "#2D2D2D/70" }}
        >
          {subtitle}
        </p>
      )}
    </>
  );

  if (animate) {
    return (
      <motion.div
        className={`text-center ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {content}
      </motion.div>
    );
  }

  return <div className={`text-center ${className}`}>{content}</div>;
}
