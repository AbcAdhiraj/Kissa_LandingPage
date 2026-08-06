import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const WEBHOOK_URL = "https://script.google.com/macros/s/abc123/exec";

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/early-access", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/early-access", () => {
  it.each([
    ["a missing email", {}],
    ["an empty email", { email: "" }],
    ["a non-string email", { email: 42 }],
    ["an email without @", { email: "not-an-email" }],
  ])("rejects %s with 400", async (_label, body) => {
    const response = await POST(makeRequest(body));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Please enter a valid email address.",
    });
  });

  it("succeeds with a warning when the webhook URL is unset", async () => {
    vi.stubEnv("GOOGLE_SHEET_WEBHOOK_URL", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(makeRequest({ email: "person@example.com" }));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      warning: "Google Sheet Webhook URL not configured in .env.local",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("succeeds with a warning when the webhook URL is still the placeholder", async () => {
    vi.stubEnv(
      "GOOGLE_SHEET_WEBHOOK_URL",
      "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
    );
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(makeRequest({ email: "person@example.com" }));

    await expect(response.json()).resolves.toMatchObject({ success: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("forwards the email to the webhook and returns success", async () => {
    vi.stubEnv("GOOGLE_SHEET_WEBHOOK_URL", WEBHOOK_URL);
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(makeRequest({ email: "person@example.com" }));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
    expect(fetchMock).toHaveBeenCalledWith(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "person@example.com" }),
      redirect: "follow",
    });
  });

  it("returns 500 with the upstream status when the webhook fails", async () => {
    vi.stubEnv("GOOGLE_SHEET_WEBHOOK_URL", WEBHOOK_URL);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 502 }))
    );

    const response = await POST(makeRequest({ email: "person@example.com" }));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Failed to save response (Status: 502)",
    });
  });

  it("returns 500 when the webhook request throws", async () => {
    vi.stubEnv("GOOGLE_SHEET_WEBHOOK_URL", WEBHOOK_URL);
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));

    const response = await POST(makeRequest({ email: "person@example.com" }));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({ error: "network down" });
  });

  it("returns 500 for a malformed JSON body", async () => {
    const request = new Request("http://localhost/api/early-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{ not json",
    });

    const response = await POST(request);

    expect(response.status).toBe(500);
  });

  it("falls back to a generic message for non-Error throws", async () => {
    vi.stubEnv("GOOGLE_SHEET_WEBHOOK_URL", WEBHOOK_URL);
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue("boom"));

    const response = await POST(makeRequest({ email: "person@example.com" }));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Failed to submit to early access",
    });
  });
});
