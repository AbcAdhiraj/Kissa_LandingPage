import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useMousePosition } from "./useMousePosition";

function setViewport(width: number, height: number) {
  Object.defineProperty(window, "innerWidth", { value: width, configurable: true });
  Object.defineProperty(window, "innerHeight", { value: height, configurable: true });
}

function moveMouse(clientX: number, clientY: number) {
  act(() => {
    window.dispatchEvent(new MouseEvent("mousemove", { clientX, clientY }));
  });
}

describe("useMousePosition", () => {
  it("starts centered", () => {
    const { result } = renderHook(() => useMousePosition());
    expect(result.current).toEqual({ x: 0.5, y: 0.5 });
  });

  it("reports the pointer position normalized to the viewport", () => {
    setViewport(1000, 500);
    const { result } = renderHook(() => useMousePosition());

    moveMouse(250, 100);
    expect(result.current).toEqual({ x: 0.25, y: 0.2 });

    moveMouse(1000, 500);
    expect(result.current).toEqual({ x: 1, y: 1 });
  });

  it("stops updating after unmount", () => {
    setViewport(1000, 500);
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { result, unmount } = renderHook(() => useMousePosition());

    moveMouse(500, 250);
    const lastPosition = result.current;

    unmount();
    expect(removeSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));

    moveMouse(0, 0);
    expect(result.current).toBe(lastPosition);
    removeSpy.mockRestore();
  });
});
