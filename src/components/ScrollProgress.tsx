"use client";

import { useEffect } from "react";
import { motion, useSpring } from "framer-motion";

export function ScrollProgress() {
  const scaleX = useSpring(0, { stiffness: 80, damping: 25, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      scaleX.set(pct);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scaleX]);

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 h-1 origin-left"
      style={{ scaleX, backgroundColor: "#1F4D3A" }}
    />
  );
}
