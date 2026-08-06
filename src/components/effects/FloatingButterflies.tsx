"use client";

import { useSpawner } from "@/hooks/useSpawner";
import { randomBetween } from "@/lib/utils";

interface Butterfly {
  id: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
}

export function FloatingButterflies() {
  const butterflies = useSpawner<Butterfly>({
    create: () => ({
      id: Date.now() + Math.random(),
      top: randomBetween(30, 70),
      left: randomBetween(10, 90),
      duration: randomBetween(8, 14),
      delay: randomBetween(0, 3),
    }),
    lifetime: (bf) => (bf.duration + bf.delay + 2) * 1000,
    interval: 12000,
    maxAlive: 2,
    initialCount: 2,
    initialStagger: 5000,
  });

  return (
    <div className="pointer-events-none z-30">
      {butterflies.map((bf) => (
        <div
          key={bf.id}
          className="absolute"
          style={{
            top: `${bf.top}%`,
            left: `${bf.left}%`,
            animation: `float-slow ${bf.duration}s ease-in-out ${bf.delay}s forwards`,
          }}
        >
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
            <path
              d="M10 8 C10 4 6 0 2 2 C0 4 4 8 10 8Z"
              fill="#C4B8D8"
              opacity={0.5}
            />
            <path
              d="M10 8 C10 4 14 0 18 2 C20 4 16 8 10 8Z"
              fill="#C4B8D8"
              opacity={0.5}
            />
            <line
              x1="10"
              y1="8"
              x2="10"
              y2="16"
              stroke="#2D2D2D"
              strokeWidth="0.5"
              opacity={0.3}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
