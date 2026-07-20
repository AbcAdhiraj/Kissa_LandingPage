"use client";

import { useEffect, useState } from "react";

interface Butterfly {
  id: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
}

export function FloatingButterflies() {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);

  useEffect(() => {
    const spawn = () => {
      const bfly: Butterfly = {
        id: Date.now() + Math.random(),
        top: Math.random() * 40 + 30,
        left: Math.random() * 80 + 10,
        duration: Math.random() * 6 + 8,
        delay: Math.random() * 3,
      };
      setButterflies((prev) => [...prev.slice(-2), bfly]);

      setTimeout(() => {
        setButterflies((prev) => prev.filter((b) => b.id !== bfly.id));
      }, (bfly.duration + bfly.delay + 2) * 1000);
    };

    for (let i = 0; i < 2; i++) {
      setTimeout(spawn, i * 5000);
    }

    const interval = setInterval(spawn, 12000);
    return () => clearInterval(interval);
  }, []);

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
