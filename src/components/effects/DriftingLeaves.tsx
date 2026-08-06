"use client";

import { useSpawner } from "@/hooks/useSpawner";
import { randomBetween, randomChoice } from "@/lib/utils";

interface Leaf {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  rotation: number;
}

const LEAF_COLORS = ["#A8C4A0", "#F0A870", "#F5C542", "#C4B8D8"];

export function DriftingLeaves() {
  const leaves = useSpawner<Leaf>({
    create: () => ({
      id: Date.now() + Math.random(),
      left: randomBetween(0, 100),
      size: randomBetween(8, 18),
      duration: randomBetween(10, 18),
      delay: randomBetween(0, 3),
      color: randomChoice(LEAF_COLORS),
      rotation: randomBetween(0, 360),
    }),
    lifetime: (leaf) => (leaf.duration + leaf.delay + 1) * 1000,
    interval: 4000,
    maxAlive: 5,
    initialCount: 3,
    initialStagger: 2000,
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute"
          style={{
            left: `${leaf.left}%`,
            top: "-20px",
            width: leaf.size,
            height: leaf.size,
            animation: `drift ${leaf.duration}s ease-in-out ${leaf.delay}s forwards`,
            transform: `rotate(${leaf.rotation}deg)`,
          }}
        >
          <svg
            width={leaf.size}
            height={leaf.size}
            viewBox="0 0 24 24"
            fill={leaf.color}
            opacity={0.4}
          >
            <path d="M12 2C10 8 6 12 2 14C8 16 12 20 14 22C16 18 20 14 22 10C18 8 14 4 12 2Z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
