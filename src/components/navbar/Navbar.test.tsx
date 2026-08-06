import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Navbar } from "./Navbar";

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

function scrollTo(y: number) {
  Object.defineProperty(window, "scrollY", { value: y, configurable: true });
  fireEvent.scroll(window);
}

describe("Navbar", () => {
  it("renders the brand and navigation links", () => {
    render(<Navbar />);

    expect(screen.getByText("KISSA")).toBeInTheDocument();
    ["Home", "How It Works", "Roadmap", "Join"].forEach((label) => {
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    });
  });

  it("switches to the scrolled styling past 80px and back", () => {
    render(<Navbar />);
    const nav = screen.getByRole("navigation");
    expect(nav.className).toContain("bg-[#FAF8F3]/70");

    scrollTo(120);
    expect(nav.className).toContain("bg-[#FAF8F3]/85");

    scrollTo(10);
    expect(nav.className).toContain("bg-[#FAF8F3]/70");
  });

  it("scrolls to the matching section when a link is clicked", async () => {
    const section = document.createElement("div");
    section.id = "roadmap";
    section.scrollIntoView = vi.fn();
    document.body.appendChild(section);
    render(<Navbar />);

    await userEvent.click(screen.getByRole("button", { name: "Roadmap" }));

    expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  it("falls back to scrolling to the top when the section is missing", async () => {
    const scrollToSpy = vi.fn();
    vi.stubGlobal("scrollTo", scrollToSpy);
    render(<Navbar />);

    await userEvent.click(screen.getByRole("button", { name: "Home" }));

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    vi.unstubAllGlobals();
  });

  it("stops listening for scroll after unmount", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<Navbar />);

    unmount();

    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });
});
