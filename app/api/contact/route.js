// app/api/contact/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { randomUUID } from "crypto";
import { getIP } from "@/lib/get-ip";
import { rateLimitAllow } from "@/lib/rate-limit";

// === Recipients & Sender ===
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

// === Validation (match client) ===
const inquirySchema = z.object({
  type: z.literal("inquiry"),
  name: z.string().min(2),
  email: z.string().email(),
  reason: z.string().max(120).optional().nullable(),
  message: z.string().min(10),
  hp: z.string().max(0).optional().default(""),
});

const bookingSchema = z.object({
  type: z.literal("booking"),
  name: z.string().min(2),
  email: z.string().email(),
  datetime: z.string().min(5),
  notes: z.string().max(2000).optional().nullable(),
  hp: z.string().max(0).optional().default(""),
});

// === Minimal templating ===
const esc = (s = "") =>
  String(s).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
  );

const htmlFor = (d) =>
  d.type === "booking"
    ? `<h2>New call request</h2>
       <p><b>Name:</b> ${esc(d.name)}</p>
       <p><b>Email:</b> ${esc(d.email)}</p>
       <p><b>Date & Time:</b> ${esc(d.datetime)}</p>
       <p><b>Notes:</b><br/>${esc(d.notes || "-").replace(/\n/g, "<br/>")}</p>`
    : `<h2>New inquiry</h2>
       <p><b>Name:</b> ${esc(d.name)}</p>
       <p><b>Email:</b> ${esc(d.email)}</p>
       <p><b>Reason:</b> ${esc(d.reason || "-")}</p>
       <p><b>Message:</b><br/>${esc(d.message).replace(/\n/g, "<br/>")}</p>`;

const textFor = (d) =>
  d.type === "booking"
    ? [
        "New call request",
        `Name: ${d.name}`,
        `Email: ${d.email}`,
        `Date & Time: ${d.datetime}`,
        "",
        "Notes:",
        d.notes || "-",
      ].join("\n")
    : [
        "New inquiry",
        `Name: ${d.name}`,
        `Email: ${d.email}`,
        `Reason: ${d.reason || "-"}`,
        "",
        "Message:",
        d.message,
      ].join("\n");

// === Handler ===
export async function POST(req) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Missing RESEND_API_KEY" }, { status: 501 });
  }

  // Rate limit (per IP)
  const ip = getIP(req);
  const rl = rateLimitAllow({ key: `contact:${ip}`, limit: 8, windowMs: 60_000 });
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

  const parsed =
    body?.type === "booking"
      ? bookingSchema.safeParse(body)
      : inquirySchema.safeParse({ ...body, type: "inquiry" });

  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 422 });
  }

  const d = parsed.data;

  // Honeypot hit => pretend success (spam drop)
  if (d.hp && String(d.hp).trim() !== "") {
    return NextResponse.json({ ok: true, id: null });
  }

  // Tiny heuristic: অনেকগুলো লিঙ্ক হলে ব্লক (optional)
  const msgText = d.type === "booking" ? (d.notes || "") : d.message;
  const urlCount = (msgText.match(/https?:\/\//gi) || []).length;
  if (urlCount > 4) {
    return NextResponse.json({ error: "Suspicious content." }, { status: 400 });
  }

  const subject =
    d.type === "booking"
      ? `Call request — ${d.datetime}`
      : `Contact — ${d.reason || "General"}`;

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
        typeof error === "string" ? error : error.message || JSON.stringify(error);
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id || null });
  } catch (e) {
    const msg = e?.message || String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
