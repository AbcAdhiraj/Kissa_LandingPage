"use client";

import { useEffect, useRef } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  createdAt: number;
}

export function CursorSparkles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const colors = ["#F5C542", "#E87060", "#C4B8D8", "#7EC8E3", "#A8C4A0"];

    const handleMouseMove = (e: MouseEvent) => {
      const sparkle: Sparkle = {
        id: nextId.current++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        createdAt: Date.now(),
      };

      sparklesRef.current.push(sparkle);
      if (sparklesRef.current.length > 50) {
        sparklesRef.current = sparklesRef.current.slice(-50);
      }

      renderSparkles();
    };

    const renderSparkles = () => {
      if (!containerRef.current) return;
      const now = Date.now();
      const active = sparklesRef.current.filter(
        (s) => now - s.createdAt < 600
      );

      containerRef.current.innerHTML = active
        .map(
          (s) => `
          <div
            style="
              position: fixed;
              left: ${s.x}px;
              top: ${s.y}px;
              width: ${s.size}px;
              height: ${s.size}px;
              background: ${s.color};
              border-radius: 50%;
              pointer-events: none;
              z-index: 9999;
              animation: sparkle-fade 0.6s ease-out forwards;
            "
          />
        `
        )
        .join("");

      if (active.length > 0) {
        requestAnimationFrame(() => {
          setTimeout(renderSparkles, 100);
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <div ref={containerRef} />;
}
