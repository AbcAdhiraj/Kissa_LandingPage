"use client";

import { useEffect, useState } from "react";

interface Leaf {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  rotation: number;
}

export function DriftingLeaves() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    const colors = ["#A8C4A0", "#F0A870", "#F5C542", "#C4B8D8"];

    const spawnLeaf = () => {
      const leaf: Leaf = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        size: Math.random() * 10 + 8,
        duration: Math.random() * 8 + 10,
        delay: Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
      };
      setLeaves((prev) => [...prev.slice(-5), leaf]);

      setTimeout(() => {
        setLeaves((prev) => prev.filter((l) => l.id !== leaf.id));
      }, (leaf.duration + leaf.delay + 1) * 1000);
    };

    // Spawn initial leaves
    for (let i = 0; i < 3; i++) {
      setTimeout(spawnLeaf, i * 2000);
    }

    // Spawn new leaves periodically
    const interval = setInterval(spawnLeaf, 4000);
    return () => clearInterval(interval);
  }, []);

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
