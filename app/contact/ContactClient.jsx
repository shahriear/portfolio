"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  Calendar,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  Copy,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

/* ---------- Schemas (server-match) ---------- */
const inquirySchema = z.object({
  name: z.string().min(2, "Name is required (min 2 chars)"),
  email: z.string().email("Valid email required"),
  reason: z.string().optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters"),
  hp: z.string().max(0).optional().or(z.literal("")),
});

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required (min 2 chars)"),
  email: z.string().email("Valid email required"),
  datetime: z.string().min(1, "Pick a date & time"),
  notes: z.string().optional().or(z.literal("")),
  hp: z.string().max(0).optional().or(z.literal("")),
});

/* ---------- Helpers ---------- */
async function submitToApi(endpoint, payload) {
  const res = await fetch(endpoint || "/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let out = {};
  try {
    out = await res.json();
  } catch {}

  if (!res.ok || out?.ok === false) {
    throw new Error(out?.error || "Submission failed");
  }
  return out;
}

export default function ContactClient() {
  const params = useSearchParams();
  const { push } = useToast();

  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "/api/contact";
  const toEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@tamimalhridoy.com";

  const initialTab = params.get("tab") === "book" ? "book" : "inquiry";
  const [tab, setTab] = useState(initialTab);
  const reasonFromURL = params.get("reason") || "";

  useEffect(() => {
    const t = params.get("tab");
    if (t === "book" || t === "inquiry") setTab(t);
  }, [params]);

  const tabs = [
    { key: "inquiry", label: "General inquiry" },
    { key: "book", label: "Book a call" },
  ];

  return (
    <div className="container mt-24">
      <div className="grid gap-4 md:grid-cols-3">
        {/* Left: Card with tabs + active form */}
        <div className="card p-6 md:col-span-2">
          <h1 className="text-3xl font-bold">Contact</h1>
          <p className="muted mt-2">
            Use the form or book a call—whatever’s easier.
          </p>

          {/* Tabs */}
          <div className="mt-4 flex flex-wrap gap-2">
            {tabs.map((t) => {
              const isActive = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`rounded-full px-4 py-2 transition border ${
                    isActive
                      ? "text-white shadow"
                      : "bg-transparent border-black/10 dark:border-white/15"
                  }`}
                  style={
                    isActive
                      ? {
                          background:
                            "linear-gradient(90deg, var(--brand-hex), var(--brand2-hex))",
                          borderColor: "transparent",
                        }
                      : undefined
                  }
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Active form */}
          <div className="mt-6">
            {tab === "book" ? (
              <BookingForm endpoint={endpoint} toEmail={toEmail} push={push} />
            ) : (
              <InquiryForm
                endpoint={endpoint}
                toEmail={toEmail}
                reasonFromURL={reasonFromURL}
                push={push}
              />
            )}
          </div>
        </div>

        {/* Right: Quick links + Connect */}
        <aside className="card p-6">
          <h3 className="font-semibold">Quick links</h3>

          <ul className="mt-3 space-y-2">
            <li className="feature">
              <Link
                href="/about"
                className="btn-ghost inline-flex items-center gap-2"
              >
                About
              </Link>
            </li>
            <li className="feature">
              <Link
                href="/portfolio"
                className="btn-ghost inline-flex items-center gap-2"
              >
                Portfolio
              </Link>
            </li>
            <li className="feature">
              <Link
                href="/contact?tab=book"
                className="btn-ghost inline-flex items-center gap-2"
              >
                Book a call
              </Link>
            </li>
            <li className="feature">
              <Link
                href="/garments"
                className="btn-ghost inline-flex items-center gap-2"
              >
                Garments
              </Link>
            </li>
          </ul>

          <hr className="my-5 border-black/10 dark:border-white/10" />

          <h4 className="text-sm font-semibold">Connect</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href="https://www.linkedin.com/in/tamimalhridoy7/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-black/10 dark:border-white/15 hover:shadow transition"
            >
              <Linkedin size={18} />
            </Link>
            <Link
              href="https://wa.me/+8801912218666"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-black/10 dark:border-white/15 hover:shadow transition"
            >
              <MessageCircle size={18} />
            </Link>
            <Link
              href={`mailto:${toEmail}`}
              aria-label="Email"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-black/10 dark:border-white/15 hover:shadow transition"
            >
              <Mail size={18} />
            </Link>

            {/* Copy email button */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(toEmail);
                push({ title: "Email copied", desc: toEmail });
              }}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-black/10 dark:border-white/15 hover:shadow transition"
              aria-label="Copy email"
              type="button"
            >
              <Copy size={18} />
            </button>

            <Link
              href="https://www.facebook.com/tamimalhridoy/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-black/10 dark:border-white/15 hover:shadow transition"
            >
              <Facebook size={18} />
            </Link>
            <Link
              href="https://www.instagram.com/tamimalhridoy/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-black/10 dark:border-white/15 hover:shadow transition"
            >
              <Instagram size={18} />
            </Link>
            <Link
              href="https://twitter.com/tamimalhridoy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-black/10 dark:border-white/15 hover:shadow transition"
            >
              <Twitter size={18} />
            </Link>
          </div>

          <p className="muted text-xs mt-4">
            Live chat available (Crisp) when enabled.
          </p>
        </aside>
      </div>
    </div>
  );
}

/* ---------- Inquiry (General) Form ---------- */
function InquiryForm({ endpoint, toEmail, reasonFromURL, push }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(inquirySchema) });

  useEffect(() => {
    if (reasonFromURL) setValue("reason", reasonFromURL);
  }, [reasonFromURL, setValue]);

  const onSubmit = async (d) => {
    try {
      if (endpoint) {
        await submitToApi(endpoint, { type: "inquiry", ...d });
        push({ title: "Thanks! I will get back soon.", variant: "success" });
        reset();
      } else {
        const subject = encodeURIComponent(
          `Contact — ${d.reason || "General"}`
        );
        const body = encodeURIComponent(
          `${d.message}\n\n— ${d.name} • ${d.email}`
        );
        window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;
      }
    } catch (e) {
      push({
        title: "Couldn't send your message",
        desc: e.message || "Please try again.",
        variant: "error",
      });
    }
  };

  return (
    <form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
      {/* Honeypot (hidden) */}
      <input
        type="text"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        {...register("hp")}
      />

      <div className="grid gap-3 md:grid-cols-2">
        <label className="grid gap-1">
          <span>Name</span>
          <input
            className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--brand2-hex)]"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </label>

        <label className="grid gap-1">
          <span>Email</span>
          <input
            className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--brand2-hex)]"
            {...register("email")}
            type="email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </label>
      </div>

      <label className="grid gap-1">
        <span>Reason (optional)</span>
        <input
          className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--brand2-hex)]"
          {...register("reason")}
          placeholder="Website / Hosting / Garments / Other"
        />
      </label>

      <label className="grid gap-1">
        <span>Message</span>
        <textarea
          rows={6}
          className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--brand2-hex)]"
          {...register("message")}
        />
        {errors.message && (
          <span className="text-red-500 text-sm">{errors.message.message}</span>
        )}
      </label>

      <button className="btn w-fit" type="submit" disabled={isSubmitting}>
        <Mail size={18} /> {isSubmitting ? "Sending..." : "Send message"}
      </button>

      <p className="muted text-sm">
        Direct:{" "}
        <Link className="underline" href={`mailto:${toEmail}`}>
          {toEmail}
        </Link>
      </p>
    </form>
  );
}

/* ---------- Booking (Call) Form ---------- */
function BookingForm({ endpoint, toEmail, push }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({ resolver: zodResolver(bookingSchema) });

  // -------- Calendar helpers --------
  const pad = (n) => String(n).padStart(2, "0");
  const fmtUTC = (d) =>
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;

  const escapeICS = (s = "") =>
    String(s).replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");

  function makeICS({
    startLocal,
    duration = 30,
    title,
    description,
    location,
  }) {
    const start = new Date(startLocal);
    const end = new Date(start.getTime() + duration * 60000);
    const dtstamp = fmtUTC(new Date());
    const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@tamimalhridoy.com`;

    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//tamimalhridoy//contact//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART:${fmtUTC(start)}`,
      `DTEND:${fmtUTC(end)}`,
      `SUMMARY:${escapeICS(title)}`,
      `DESCRIPTION:${escapeICS(description)}`,
      `LOCATION:${escapeICS(location)}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ];
    return lines.join("\r\n");
  }

  function downloadICS(filename, text) {
    const blob = new Blob([text], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function buildGoogleLink({
    startLocal,
    duration = 30,
    title,
    details,
    location,
  }) {
    const start = new Date(startLocal);
    const end = new Date(start.getTime() + duration * 60000);
    const dates = `${fmtUTC(start)}/${fmtUTC(end)}`;
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      dates,
      details,
      location,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  // -------- Submit handler --------
  const onSubmit = async (d) => {
    try {
      if (endpoint) {
        await submitToApi(endpoint, { type: "booking", ...d });
        push({ title: "Thanks! I will get back soon.", variant: "success" });
        reset();
      } else {
        const subject = encodeURIComponent(`Call request — ${d.datetime}`);
        const body = encodeURIComponent(
          `Please confirm a call.\n\nTime: ${d.datetime}\nNotes: ${d.notes || "-"}\n\n— ${d.name} • ${d.email}`
        );
        window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;
      }
    } catch (e) {
      push({
        title: "Couldn't send your request",
        desc: e.message || "Please try again.",
        variant: "error",
      });
    }
  };

  // -------- Calendar actions (computed) --------
  const name = watch("name");
  const email = watch("email");
  const when = watch("datetime");
  const notes = watch("notes") || "-";

  const readyForCal = Boolean(name && email && when);
  const calTitle = "Call with Tamim Al Hridoy";
  const calDetails = `Name: ${name}\nEmail: ${email}\nNotes: ${notes}`;
  const calLocation = "Online (meet link will be shared)";
  const gcalUrl = readyForCal
    ? buildGoogleLink({
        startLocal: when,
        title: calTitle,
        details: calDetails,
        location: calLocation,
        duration: 30,
      })
    : "#";

  return (
    <form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
      {/* Honeypot (hidden) */}
      <input
        type="text"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        {...register("hp")}
      />

      <div className="grid gap-3 md:grid-cols-2">
        <label className="grid gap-1">
          <span>Name</span>
          <input
            className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--brand2-hex)]"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </label>

        <label className="grid gap-1">
          <span>Email</span>
          <input
            className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--brand2-hex)]"
            {...register("email")}
            type="email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </label>
      </div>

      <label className="grid gap-1">
        <span>Date &amp; Time</span>
        <input
          className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--brand2-hex)]"
          {...register("datetime")}
          type="datetime-local"
        />
        {errors.datetime && (
          <span className="text-red-500 text-sm">
            {errors.datetime.message}
          </span>
        )}
      </label>

      <label className="grid gap-1">
        <span>Notes (optional)</span>
        <textarea
          rows={5}
          className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--brand2-hex)]"
          {...register("notes")}
          placeholder="Context or agenda…"
        />
      </label>

      {/* Calendar actions */}
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={gcalUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (!readyForCal) {
              e.preventDefault();
              push({
                title: "Fill name, email & time first",
                variant: "error",
              });
            }
          }}
          className={`rounded-xl border border-black/10 px-3 py-2 text-sm transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5 ${
            !readyForCal ? "pointer-events-none opacity-60" : ""
          }`}
          aria-disabled={!readyForCal}
        >
          Add to Google Calendar
        </a>

        <button
          type="button"
          disabled={!readyForCal}
          onClick={() => {
            const ics = makeICS({
              startLocal: when,
              duration: 30,
              title: calTitle,
              description: calDetails,
              location: calLocation,
            });
            downloadICS("call-with-tamim.ics", ics);
            push({ title: "ICS downloaded" });
          }}
          className="rounded-xl border border-black/10 px-3 py-2 text-sm transition hover:bg-black/5 disabled:opacity-60 dark:border-white/10 dark:hover:bg-white/5"
        >
          Download .ics
        </button>
      </div>

      <button className="btn w-fit" type="submit" disabled={isSubmitting}>
        <Calendar size={18} /> {isSubmitting ? "Sending..." : "Request a call"}
      </button>
    </form>
  );
}
