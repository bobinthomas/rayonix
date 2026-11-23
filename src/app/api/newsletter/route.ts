import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, honeypot } = body as { email?: string; honeypot?: string };

    // Honeypot check: silently succeed if bot filled the hidden trap field
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Subscribed successfully" });
    }

    // Validate email format
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const recipient = process.env.NEWSLETTER_TO || "info@rayonix.in";
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.NEWSLETTER_FROM || "newsletter@rayonix.in",
            to: recipient,
            subject: "New Newsletter Subscriber (Rayonix)",
            text: `New subscriber email: ${cleanEmail}`,
          }),
        });
      } catch (err) {
        console.error("Resend API delivery error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Subscription confirmed.",
      email: cleanEmail,
    });
  } catch (error) {
    console.error("Newsletter route error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your subscription." },
      { status: 500 }
    );
  }
}
