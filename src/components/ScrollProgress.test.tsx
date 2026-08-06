import { fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ScrollProgress } from "./ScrollProgress";

const springSet = vi.hoisted(() => vi.fn());
vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return {
    ...actual,
    useSpring: (initial: number) => ({ ...actual.useSpring(initial), set: springSet }),
  };
});

function setPageMetrics({
  scrollY,
  scrollHeight,
  innerHeight,
}: {
  scrollY: number;
  scrollHeight: number;
  innerHeight: number;
}) {
  Object.defineProperty(window, "scrollY", { value: scrollY, configurable: true });
  Object.defineProperty(window, "innerHeight", { value: innerHeight, configurable: true });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    value: scrollHeight,
    configurable: true,
  });
  fireEvent.scroll(window);
}

afterEach(() => {
  springSet.mockReset();
  vi.restoreAllMocks();
});

describe("ScrollProgress", () => {
  it("reports the fraction of the page scrolled", () => {
    render(<ScrollProgress />);

    setPageMetrics({ scrollY: 300, scrollHeight: 2000, innerHeight: 800 });

    expect(springSet).toHaveBeenLastCalledWith(0.25);
  });

  it("reports full progress at the bottom of the page", () => {
    render(<ScrollProgress />);

    setPageMetrics({ scrollY: 1200, scrollHeight: 2000, innerHeight: 800 });

    expect(springSet).toHaveBeenLastCalledWith(1);
  });

  it("reports zero when the page is not scrollable", () => {
    render(<ScrollProgress />);

    setPageMetrics({ scrollY: 0, scrollHeight: 800, innerHeight: 800 });

    expect(springSet).toHaveBeenLastCalledWith(0);
  });

  it("stops listening for scroll after unmount", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<ScrollProgress />);

    unmount();

    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });
});
