"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        rotateX: 8,
        y: 60,
        filter: "blur(4px)",
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              rotateX: 0,
              y: 0,
              filter: "blur(0px)",
            }
          : {}
      }
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: 1200 }}
    >
      {children}
    </motion.div>
  );
}
