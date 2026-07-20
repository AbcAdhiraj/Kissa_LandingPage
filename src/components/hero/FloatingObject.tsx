"use client";

import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { type ReactNode, useMemo } from "react";

interface FloatingObjectProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  floatDuration?: number;
  floatDelay?: number;
  rotateAmount?: number;
  yRange?: number;
  parallaxFactor?: number;
  scale?: number;
}

export function FloatingObject({
  children,
  className = "",
  style,
  floatDuration = 4,
  floatDelay = 0,
  rotateAmount = 6,
  yRange = 10,
  parallaxFactor = 0.02,
  scale = 1,
}: FloatingObjectProps) {
  const mouse = useMousePosition();

  const parallaxX = useMemo(
    () => (mouse.x - 0.5) * parallaxFactor * 100,
    [mouse.x, parallaxFactor]
  );
  const parallaxY = useMemo(
    () => (mouse.y - 0.5) * parallaxFactor * 100,
    [mouse.y, parallaxFactor]
  );

  return (
    <motion.div
      className={`absolute ${className}`}
      style={style}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale,
        y: [0, -yRange, yRange / 2, -yRange / 2, 0],
        rotate: [0, rotateAmount, -rotateAmount / 2, rotateAmount / 2, 0],
        x: parallaxX,
      }}
      transition={{
        opacity: { duration: 0.6, delay: floatDelay },
        scale: { duration: 0.6, delay: floatDelay },
        y: {
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        },
        rotate: {
          duration: floatDuration * 1.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        },
        x: {
          type: "spring",
          stiffness: 100,
          damping: 30,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
