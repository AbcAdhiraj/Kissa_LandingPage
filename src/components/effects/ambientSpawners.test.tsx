import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DriftingLeaves } from "./DriftingLeaves";
import { FloatingBirds } from "./FloatingBirds";
import { FloatingButterflies } from "./FloatingButterflies";

function advance(ms: number) {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
}

function spriteCount(container: HTMLElement) {
  return container.querySelectorAll(".absolute").length;
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("FloatingBirds", () => {
  it("starts empty and spawns a bird every 8 seconds", () => {
    const { container } = render(<FloatingBirds />);
    expect(spriteCount(container)).toBe(0);

    advance(8000);
    expect(spriteCount(container)).toBe(1);

    advance(8000);
    expect(spriteCount(container)).toBe(2);
  });

  it("keeps at most three birds on screen", () => {
    const { container } = render(<FloatingBirds />);

    advance(8000 * 10);

    expect(spriteCount(container)).toBeLessThanOrEqual(3);
  });

  it("stops spawning after unmount", () => {
    const clearSpy = vi.spyOn(globalThis, "clearInterval");
    const { unmount } = render(<FloatingBirds />);

    unmount();

    expect(clearSpy).toHaveBeenCalled();
  });
});

describe("DriftingLeaves", () => {
  it("spawns leaves on the initial stagger", () => {
    const { container } = render(<DriftingLeaves />);
    expect(spriteCount(container)).toBe(0);

    advance(1);
    expect(spriteCount(container)).toBe(1);

    advance(2000);
    expect(spriteCount(container)).toBe(2);
  });

  it("keeps at most six leaves on screen", () => {
    const { container } = render(<DriftingLeaves />);

    advance(4000 * 20);

    expect(spriteCount(container)).toBeLessThanOrEqual(6);
  });
});

describe("FloatingButterflies", () => {
  it("spawns butterflies on its own schedule", () => {
    const { container } = render(<FloatingButterflies />);
    expect(spriteCount(container)).toBe(0);

    advance(1);
    expect(spriteCount(container)).toBe(1);

    advance(5000);
    expect(spriteCount(container)).toBe(2);
  });

  it("keeps at most three butterflies on screen", () => {
    const { container } = render(<FloatingButterflies />);

    advance(12000 * 10);

    expect(spriteCount(container)).toBeLessThanOrEqual(3);
  });
});
