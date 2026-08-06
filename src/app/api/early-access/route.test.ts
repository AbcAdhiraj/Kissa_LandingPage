import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const WEBHOOK_URL = "https://script.google.com/macros/s/abc123/exec";

let ipCounter = 0;

// The route rate limits per client IP with module-level state, so every test
// (and every request within a test) uses a fresh address unless it is
// deliberately exercising the limiter.
function nextIp(): string {
  ipCounter += 1;
  return `203.0.113.${ipCounter % 256}.${ipCounter}`;
}

function makeRequest(body: unknown, ip: string = nextIp()): Request {
  return new Request("http://localhost/api/early-access", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
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
    ["an email without a TLD", { email: "person@example" }],
    ["an email containing spaces", { email: "per son@example.com" }],
    ["an email over 254 characters", { email: `${"a".repeat(250)}@example.com` }],
  ])("rejects %s with 400", async (_label, body) => {
    const response = await POST(makeRequest(body));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Please enter a valid email address.",
    });
  });

  it("rejects a malformed JSON body with 400", async () => {
    const response = await POST(makeRequest("{ not json"));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "Invalid request body." });
  });

  it("accepts the signup outside production when the webhook URL is unset", async () => {
    vi.stubEnv("GOOGLE_SHEET_WEBHOOK_URL", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(makeRequest({ email: "person@example.com" }));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("treats the placeholder webhook URL as unconfigured", async () => {
    vi.stubEnv(
      "GOOGLE_SHEET_WEBHOOK_URL",
      "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
    );
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(makeRequest({ email: "person@example.com" }));

    await expect(response.json()).resolves.toEqual({ success: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("refuses to swallow the signup in production when the webhook URL is unset", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("GOOGLE_SHEET_WEBHOOK_URL", "");

    const response = await POST(makeRequest({ email: "person@example.com" }));

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      error: "Early access signups are temporarily unavailable. Please try again later.",
    });
  });

  it("forwards the normalized email to the webhook", async () => {
    vi.stubEnv("GOOGLE_SHEET_WEBHOOK_URL", WEBHOOK_URL);
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(makeRequest({ email: "  Person@Example.COM  " }));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(WEBHOOK_URL);
    expect(init).toMatchObject({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "person@example.com" }),
      redirect: "follow",
    });
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it("returns 502 with a generic message when the webhook responds with an error", async () => {
    vi.stubEnv("GOOGLE_SHEET_WEBHOOK_URL", WEBHOOK_URL);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("upstream boom", { status: 500 }))
    );

    const response = await POST(makeRequest({ email: "person@example.com" }));

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      error: "Something went wrong. Please try again later.",
    });
  });

  it("returns 502 when the webhook request fails", async () => {
    vi.stubEnv("GOOGLE_SHEET_WEBHOOK_URL", WEBHOOK_URL);
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));

    const response = await POST(makeRequest({ email: "person@example.com" }));

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      error: "Something went wrong. Please try again later.",
    });
  });

  it("reports a timeout distinctly", async () => {
    vi.stubEnv("GOOGLE_SHEET_WEBHOOK_URL", WEBHOOK_URL);
    const timeout = new Error("timed out");
    timeout.name = "TimeoutError";
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(timeout));

    const response = await POST(makeRequest({ email: "person@example.com" }));

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      error: "The signup service took too long to respond. Please try again.",
    });
  });

  it("rate limits a client after five requests in the window", async () => {
    vi.stubEnv("GOOGLE_SHEET_WEBHOOK_URL", WEBHOOK_URL);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 200 }))
    );
    const ip = nextIp();

    for (let i = 0; i < 5; i++) {
      const allowed = await POST(makeRequest({ email: "person@example.com" }, ip));
      expect(allowed.status).toBe(200);
    }

    const blocked = await POST(makeRequest({ email: "person@example.com" }, ip));
    expect(blocked.status).toBe(429);
    await expect(blocked.json()).resolves.toEqual({
      error: "Too many requests. Please try again in a minute.",
    });

    // A different client is unaffected.
    const other = await POST(makeRequest({ email: "person@example.com" }));
    expect(other.status).toBe(200);
  });

  it("takes the first address of an x-forwarded-for chain as the client", async () => {
    vi.stubEnv("GOOGLE_SHEET_WEBHOOK_URL", WEBHOOK_URL);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 200 }))
    );
    const ip = nextIp();

    for (let i = 0; i < 5; i++) {
      await POST(makeRequest({ email: "person@example.com" }, `${ip}, 10.0.0.${i}`));
    }

    const blocked = await POST(makeRequest({ email: "person@example.com" }, ip));
    expect(blocked.status).toBe(429);
  });
});
