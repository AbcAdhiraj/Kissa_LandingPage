import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { EarlyAccessSection } from "./EarlyAccessSection";

const confettiMock = vi.hoisted(() => vi.fn());
vi.mock("canvas-confetti", () => ({ default: confettiMock }));

function jsonResponse(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  fetchMock = vi.fn().mockResolvedValue(jsonResponse({ success: true }));
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  confettiMock.mockReset();
});

function setup() {
  const user = userEvent.setup();
  render(<EarlyAccessSection />);
  return {
    user,
    input: screen.getByPlaceholderText("your@email.com"),
    submit: () => screen.getByRole("button"),
  };
}

describe("EarlyAccessSection", () => {
  it("renders the signup form", () => {
    const { input, submit } = setup();

    expect(input).toBeInTheDocument();
    expect(submit()).toHaveTextContent("Plant It");
  });

  it("does not submit an email without an @", async () => {
    const { user, input, submit } = setup();

    await user.type(input, "invalid");
    await user.click(submit());

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts the email, fires confetti and shows the success screen", async () => {
    const { user, input, submit } = setup();

    await user.type(input, "person@example.com");
    await user.click(submit());

    expect(fetchMock).toHaveBeenCalledWith("/api/early-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "person@example.com" }),
    });

    expect(
      await screen.findByText("We can't wait to hear your story.", undefined, {
        timeout: 4000,
      })
    ).toBeInTheDocument();
    await waitFor(() => expect(confettiMock).toHaveBeenCalledTimes(2));
  });

  it("shows the server error message and re-enables the form", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ error: "Email already signed up." }, 400));
    const { user, input, submit } = setup();

    await user.type(input, "person@example.com");
    await user.click(submit());

    expect(await screen.findByText("Email already signed up.")).toBeInTheDocument();
    expect(submit()).toBeEnabled();
    expect(confettiMock).not.toHaveBeenCalled();
  });

  it("falls back to a generic message when the error response has no message", async () => {
    fetchMock.mockResolvedValue(jsonResponse({}, 500));
    const { user, input, submit } = setup();

    await user.type(input, "person@example.com");
    await user.click(submit());

    expect(
      await screen.findByText("Failed to sign up for early access. Please try again.")
    ).toBeInTheDocument();
  });

  it("surfaces network failures", async () => {
    fetchMock.mockRejectedValue(new Error("network down"));
    const { user, input, submit } = setup();

    await user.type(input, "person@example.com");
    await user.click(submit());

    expect(await screen.findByText("network down")).toBeInTheDocument();
  });
});
