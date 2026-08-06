import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Footer } from "./Footer";

afterEach(() => {
  vi.useRealTimers();
});

describe("Footer", () => {
  it("links to every page section", () => {
    render(<Footer />);

    const expected: Record<string, string> = {
      Home: "/#hero",
      "How It Works": "/#timeline",
      Journey: "/#journey",
      Roadmap: "/#roadmap",
      "Early Access": "/#early-access",
      FAQ: "/#faq",
    };

    for (const [label, href] of Object.entries(expected)) {
      expect(screen.getByRole("link", { name: label })).toHaveAttribute("href", href);
    }
  });

  it("opens social links safely in a new tab", () => {
    render(<Footer />);

    const expected: Record<string, string> = {
      Instagram: "https://instagram.com/ekkissaaa",
      LinkedIn: "https://www.linkedin.com/company/qissaai",
      "X (Twitter)": "https://x.com/kissa",
    };

    for (const [label, href] of Object.entries(expected)) {
      const link = screen.getByRole("link", { name: label });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("shows the current year in the copyright line", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2031-05-04T00:00:00Z"));

    render(<Footer />);

    expect(screen.getByText(/2031 KISSA. All rights reserved./)).toBeInTheDocument();
  });
});
