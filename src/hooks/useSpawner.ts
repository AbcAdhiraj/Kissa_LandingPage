"use client";

import { useEffect, useState } from "react";

interface SpawnerOptions<T> {
  /** Build a new particle. Must include a unique `id`. */
  create: () => T;
  /** Lifetime of a particle in milliseconds before it is removed. */
  lifetime: (item: T) => number;
  /** Interval between periodic spawns, in milliseconds. */
  interval: number;
  /** Cap on the number of live particles kept when a new one spawns. */
  maxAlive: number;
  /** How many particles to spawn immediately on mount. */
  initialCount?: number;
  /** Delay between staggered initial spawns, in milliseconds. */
  initialStagger?: number;
}

/**
 * Manages a self-expiring pool of particles for ambient effects.
 *
 * Periodically spawns particles, caps the pool size, and removes each
 * particle once its lifetime elapses. Shared by the drifting/floating
 * ambient effects which previously each reimplemented this lifecycle.
 */
export function useSpawner<T extends { id: number }>({
  create,
  lifetime,
  interval,
  maxAlive,
  initialCount = 0,
  initialStagger = 0,
}: SpawnerOptions<T>): T[] {
  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const spawn = () => {
      const item = create();
      setItems((prev) => [...prev.slice(-maxAlive), item]);
      timeouts.push(
        setTimeout(() => {
          setItems((prev) => prev.filter((i) => i.id !== item.id));
        }, lifetime(item))
      );
    };

    for (let i = 0; i < initialCount; i++) {
      timeouts.push(setTimeout(spawn, i * initialStagger));
    }

    const intervalId = setInterval(spawn, interval);
    return () => {
      clearInterval(intervalId);
      timeouts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return items;
}
