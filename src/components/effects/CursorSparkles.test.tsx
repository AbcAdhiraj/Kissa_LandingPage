import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CursorSparkles } from "./CursorSparkles";

function moveMouse(clientX: number, clientY: number) {
  act(() => {
    window.dispatchEvent(new MouseEvent("mousemove", { clientX, clientY }));
  });
}

beforeEach(() => {
  // The render loop reschedules itself; keep it from running during assertions.
  vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 1);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("CursorSparkles", () => {
  it("renders an empty container until the pointer moves", () => {
    const { container } = render(<CursorSparkles />);

    expect(container.firstElementChild?.innerHTML).toBe("");
  });

  it("draws a sparkle at the pointer position", () => {
    const { container } = render(<CursorSparkles />);

    moveMouse(120, 240);

    const sparkle = container.firstElementChild!.querySelector<HTMLElement>("div");
    expect(sparkle).not.toBeNull();
    expect(sparkle!.style.left).toBe("120px");
    expect(sparkle!.style.top).toBe("240px");
  });

  it("keeps at most 50 sparkles alive", () => {
    const { container } = render(<CursorSparkles />);

    for (let i = 0; i < 60; i++) {
      moveMouse(i, i);
    }

    expect(container.firstElementChild!.querySelectorAll("div")).toHaveLength(50);
  });

  it("stops listening for pointer moves after unmount", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<CursorSparkles />);

    unmount();

    expect(removeSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
  });
});
