import { afterEach, describe, expect, it, vi } from "vitest";
import { randomBetween, randomChoice } from "./utils";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("randomBetween", () => {
  it("returns min when Math.random is 0", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    expect(randomBetween(2, 10)).toBe(2);
  });

  it("interpolates linearly between min and max", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.25);
    expect(randomBetween(0, 8)).toBe(2);
  });

  it("stays strictly below max", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.999999);
    expect(randomBetween(0, 1)).toBeLessThan(1);
  });

  it("supports negative and inverted ranges", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    expect(randomBetween(-10, -2)).toBe(-6);
    expect(randomBetween(10, 0)).toBe(5);
  });

  it("returns the bound when min equals max", () => {
    expect(randomBetween(3, 3)).toBe(3);
  });

  it("always falls inside the range for unmocked randomness", () => {
    for (let i = 0; i < 100; i++) {
      const value = randomBetween(1, 5);
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThan(5);
    }
  });
});

describe("randomChoice", () => {
  it("returns the first element when Math.random is 0", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    expect(randomChoice(["a", "b", "c"])).toBe("a");
  });

  it("returns the last element for randomness close to 1", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.999999);
    expect(randomChoice(["a", "b", "c"])).toBe("c");
  });

  it("indexes with a floored scaled random value", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    expect(randomChoice([10, 20, 30, 40])).toBe(30);
  });

  it("returns the single element of a one-item array", () => {
    expect(randomChoice([42])).toBe(42);
  });

  it("returns undefined for an empty array", () => {
    expect(randomChoice([])).toBeUndefined();
  });

  it("only ever returns members of the array", () => {
    const options = ["x", "y", "z"];
    for (let i = 0; i < 100; i++) {
      expect(options).toContain(randomChoice(options));
    }
  });
});
