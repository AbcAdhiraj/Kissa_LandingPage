import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SmoothScroll } from "./SmoothScroll";

const { lenisInstances, LenisMock } = vi.hoisted(() => {
  const lenisInstances: Array<{
    options: Record<string, unknown>;
    raf: ReturnType<typeof vi.fn>;
    destroy: ReturnType<typeof vi.fn>;
  }> = [];

  class LenisMock {
    raf = vi.fn();
    destroy = vi.fn();
    constructor(public options: Record<string, unknown>) {
      lenisInstances.push(this);
    }
  }

  return { lenisInstances, LenisMock };
});

vi.mock("lenis", () => ({ default: LenisMock }));

afterEach(() => {
  lenisInstances.length = 0;
  vi.restoreAllMocks();
});

describe("SmoothScroll", () => {
  it("renders its children", () => {
    render(
      <SmoothScroll>
        <p>page content</p>
      </SmoothScroll>
    );

    expect(screen.getByText("page content")).toBeInTheDocument();
  });

  it("initializes Lenis with vertical smooth scrolling", () => {
    render(<SmoothScroll>content</SmoothScroll>);

    expect(lenisInstances).toHaveLength(1);
    expect(lenisInstances[0].options).toMatchObject({
      duration: 1.2,
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    expect(typeof lenisInstances[0].options.easing).toBe("function");
  });

  it("drives Lenis from the animation frame loop", () => {
    const rafSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation(() => 1);

    render(<SmoothScroll>content</SmoothScroll>);

    const frameCallback = rafSpy.mock.calls[0][0];
    frameCallback(123);

    expect(lenisInstances[0].raf).toHaveBeenCalledWith(123);
  });

  it("destroys the Lenis instance on unmount", () => {
    const { unmount } = render(<SmoothScroll>content</SmoothScroll>);

    unmount();

    expect(lenisInstances[0].destroy).toHaveBeenCalledTimes(1);
  });
});
