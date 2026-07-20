"use client";

import { useEffect, useState } from "react";

interface Bird {
  id: number;
  top: number;
  speed: number;
  delay: number;
}

export function FloatingBirds() {
  const [birds, setBirds] = useState<Bird[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newBird: Bird = {
        id: Date.now(),
        top: Math.random() * 60 + 5,
        speed: Math.random() * 4 + 6,
        delay: Math.random() * 2,
      };
      setBirds((prev) => [...prev.slice(-2), newBird]);

      setTimeout(() => {
        setBirds((prev) => prev.filter((b) => b.id !== newBird.id));
      }, (newBird.speed + 2) * 1000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {birds.map((bird) => (
        <div
          key={bird.id}
          className="absolute"
          style={{
            top: `${bird.top}%`,
            left: "-60px",
            animation: `fly-across ${bird.speed}s ease-in-out ${bird.delay}s forwards`,
          }}
        >
          <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
            <path
              d="M2 8 C6 4 10 6 12 8 C14 6 18 4 22 8"
              stroke="#1F4D3A"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity={0.3}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
