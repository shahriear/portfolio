// app/api/quote/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { randomUUID } from "crypto";
import { getIP } from "@/lib/get-ip";
import { rateLimitAllow } from "@/lib/rate-limit";

// --- health check (GET /api/quote) ---
export async function GET() {
  return NextResponse.json({ ok: true, route: "quote" });
}

// --- env ---
const TO_LIST = (
  process.env.CONTACT_INBOX ||
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
  "tamimalhridoy3@gmail.com"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const FROM =
  (process.env.RESEND_FROM ?? "").trim() ||
  `Tamim Al Hridoy <info@${process.env.MAIL_FROM_DOMAIN || "example.com"}>`;

const resend = new Resend((process.env.RESEND_API_KEY || "").trim());

// --- validation ---
const schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional().nullable(),
  product: z.string().min(2, "Product required"),
  quantity: z.coerce
    .number()
    .int()
    .positive("Quantity must be a positive number"),
  details: z.string().min(5, "Please add a few details"),
  hp: z.string().max(0).optional().default(""), // honeypot
});

// --- helpers ---
const esc = (s = "") =>
  String(s).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]
  );

const htmlFor = (d) => `
  <h2>New quick quote request</h2>
  <p><b>Name:</b> ${esc(d.name)}</p>
  <p><b>Email:</b> ${esc(d.email)}</p>
  <p><b>Phone:</b> ${esc(d.phone || "-")}</p>
  <p><b>Product:</b> ${esc(d.product)}</p>
  <p><b>Quantity:</b> ${esc(String(d.quantity))}</p>
  <p><b>Details:</b><br/>${esc(d.details).replace(/\n/g, "<br/>")}</p>
`;

const textFor = (d) =>
  [
    "New quick quote request",
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone || "-"}`,
    `Product: ${d.product}`,
    `Quantity: ${d.quantity}`,
    "",
    "Details:",
    d.details,
  ].join("\n");

// --- handler ---
export async function POST(req) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Missing RESEND_API_KEY" },
      { status: 501 }
    );
  }

  // Rate limit (per IP)
  const ip = getIP(req);
  const rl = rateLimitAllow({ key: `quote:${ip}`, limit: 8, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rl.retryAfterSec),
          "X-RateLimit-Limit": String(rl.limit),
          "X-RateLimit-Remaining": String(rl.remaining),
          "X-RateLimit-Reset": String(Math.floor(rl.reset / 1000)),
        },
      }
    );
  }

  let body = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 422 });
  }

  const d = parsed.data;

  // Honeypot drop
  if (d.hp && String(d.hp).trim() !== "") {
    return NextResponse.json({ ok: true, id: null });
  }

  const subject = `Quick quote — ${d.product} (${d.quantity})`;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: TO_LIST,
      reply_to: d.email,
      subject,
      html: htmlFor(d),
      text: textFor(d),
      headers: { "X-Entity-Ref-ID": randomUUID() },
    });

    if (error) {
      const msg =
        typeof error === "string"
          ? error
          : error.message || JSON.stringify(error);
      return NextResponse.json({ error: msg }, { status: 500 });
    }
    return NextResponse.json({ ok: true, id: data?.id || null });
  } catch (e) {
    const msg = e?.message || String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
