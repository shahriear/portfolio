// app/not-found.jsx
export const dynamic = "force-dynamic";

import Link from "next/link";
import { Home, Search, LifeBuoy } from "lucide-react";

const GRADIENT =
  "linear-gradient(90deg, var(--brand-hex, #1f155a), var(--brand2-hex, #38b4a1))";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[oklch(var(--surface))] px-4">
      <section className="w-full max-w-3xl rounded-[20px] border border-black/10 dark:border-white/10 bg-white/85 dark:bg-neutral-950/70 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* top accent */}
        <div className="h-1.5" style={{ background: GRADIENT }} />
        <div className="p-6 md:p-8 text-center">
          {/* compact header */}
          <div className="inline-flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 px-3 py-1.5 mb-3">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: GRADIENT }}
            />
            <span className="text-xs font-semibold tracking-wide">
              404 NOT FOUND
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Oops! Page not found
          </h1>
          <p className="opacity-70 mt-1 text-sm">
            The page you’re looking for doesn’t exist or has moved.
          </p>

          {/* primary actions */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <Primary href="/">
              <Home size={16} className="-ml-0.5 mr-1.5" />
              Back to Home
            </Primary>

            <Ghost href="/search">
              <Search size={16} className="-ml-0.5 mr-1.5" />
              Search
            </Ghost>

            <Ghost href="/contact">
              <LifeBuoy size={16} className="-ml-0.5 mr-1.5" />
              Contact
            </Ghost>
          </div>

          {/* quick links */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
            <Pill href="/">Home</Pill>
            <Pill href="/about">About</Pill>
            <Pill href="/resume">Resume</Pill>
            <Pill href="/portfolio">Portfolio</Pill>
            <Pill href="/garments">Garments</Pill>
            <Pill href="/contact">Contact</Pill>
          </div>
        </div>
      </section>
    </main>
  );
}

/* --- tiny UI helpers --- */

function Primary({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-xl px-4 py-2.5 font-semibold text-white shadow hover:brightness-110 active:scale-[.99] transition"
      style={{ background: GRADIENT }}
    >
      {children}
    </Link>
  );
}

function Ghost({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-xl px-4 py-2.5 font-medium border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 hover:shadow-sm"
    >
      {children}
    </Link>
  );
}

function Pill({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 px-3 py-1.5 hover:shadow-sm"
    >
      {children}
    </Link>
  );
}
