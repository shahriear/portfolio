export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dev-secret"
);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(
      new URL("/signin?error=missing_token", request.url)
    );
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const email = payload?.email || "";
    const url = new URL("/auth/verified", request.url);
    url.searchParams.set("email", email);

    const res = NextResponse.redirect(url);
    // optional cookie
    res.headers.append(
      "Set-Cookie",
      `userEmail=${encodeURIComponent(email)}; Path=/; Max-Age=2592000; SameSite=Lax`
    );
    return res;
  } catch {
    return NextResponse.redirect(
      new URL("/signin?error=invalid_or_expired", request.url)
    );
  }
}
