import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_EMAIL_LENGTH = 254;
const WEBHOOK_TIMEOUT_MS = 10_000;

const GENERIC_ERROR = "Something went wrong. Please try again later.";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(key) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  requestLog.set(key, recent);
  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  if (isRateLimited(clientKey(request))) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  let email: unknown;

  try {
    const body = await request.json();
    email = (body as { email?: unknown } | null)?.email;
  } catch (error) {
    console.error("Early Access API: invalid JSON body", error);
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  if (
    typeof email !== "string" ||
    email.length > MAX_EMAIL_LENGTH ||
    !EMAIL_PATTERN.test(email.trim())
  ) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const normalizedEmail = email.trim().toLowerCase();
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

  if (!webhookUrl || webhookUrl.includes("YOUR_SCRIPT_ID")) {
    // Never pretend the signup succeeded in production: the address would be
    // lost with no trace for the user or the operator.
    if (process.env.NODE_ENV === "production") {
      console.error(
        "Early Access API: GOOGLE_SHEET_WEBHOOK_URL is not configured; rejecting signup"
      );
      return NextResponse.json(
        {
          error:
            "Early access signups are temporarily unavailable. Please try again later.",
        },
        { status: 503 }
      );
    }

    console.warn(
      "Early Access API: GOOGLE_SHEET_WEBHOOK_URL is not set or uses the placeholder value in .env.local; signup was not persisted"
    );
    return NextResponse.json({ success: true });
  }

  let response: Response;

  try {
    response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: normalizedEmail }),
      // Follow redirects since Google Apps Script redirects after POST
      redirect: "follow",
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    console.error(
      `Early Access API: webhook request ${timedOut ? "timed out" : "failed"}`,
      error
    );
    return NextResponse.json(
      {
        error: timedOut
          ? "The signup service took too long to respond. Please try again."
          : GENERIC_ERROR,
      },
      { status: 502 }
    );
  }

  if (!response.ok) {
    const detail = await response.text().catch(() => "<unreadable body>");
    console.error(
      `Early Access API: webhook responded with status ${response.status}`,
      detail
    );
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
