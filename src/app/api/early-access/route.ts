import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    if (!webhookUrl || webhookUrl.includes("YOUR_SCRIPT_ID")) {
      console.warn(
        "GOOGLE_SHEET_WEBHOOK_URL is not set or using placeholder value in .env.local"
      );
      // Return success so UI works during preview, but log warning
      return NextResponse.json({
        success: true,
        warning: "Google Sheet Webhook URL not configured in .env.local",
      });
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
      // Follow redirects since Google Apps Script redirects after POST
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`Failed to save response (Status: ${response.status})`);
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to submit to early access";
    console.error("Early Access API Error:", error);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
