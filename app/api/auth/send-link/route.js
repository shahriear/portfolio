export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET || "dev-secret");

async function createToken(payload, exp = "10m") {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(secret);
}

export async function POST(request) {
  const bad = (msg) => NextResponse.json({ ok: false, message: msg }, { status: 400 });

  try {
    const { email } = await request.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad("Valid email required");

    const token = await createToken({ email }, "10m");
    const base =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    // গুরুত্বপূর্ণ: /api/auth/verify রুট
    const link = `${base}/api/auth/verify?token=${encodeURIComponent(token)}`;

    const preview = { ok: true, preview: true, previewLink: link };

    const key = process.env.RESEND_API_KEY?.trim();
    if (!key) return NextResponse.json(preview);

    try {
      const resend = new Resend(key);
      const result = await resend.emails.send({
        from: "Auth <onboarding@resend.dev>",
        to: email,
        subject: "Your sign-in link",
        html: `<p>Click to sign in:</p><p><a href="${link}">${link}</a></p><p>This link expires in 10 minutes.</p>`,
      });

      if (result?.error) {
        console.error("[send-link] Resend error:", result.error);
        return NextResponse.json(preview);
      }
      return NextResponse.json({ ok: true, preview: false, previewLink: link });
    } catch (e) {
      console.error("[send-link] Exception:", e);
      return NextResponse.json(preview);
    }
  } catch (e) {
    console.error("[send-link] Unexpected:", e);
    return bad("Failed to process request");
  }
}
