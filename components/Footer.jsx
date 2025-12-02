// components/Footer.jsx
"use client";

import Link from "next/link";
import { Mail, Github, Linkedin, ArrowUp, MessageCircle } from "lucide-react";

const BRAND = "shahriear shuvo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16">
      {/* subtle gradient top border */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-px h-px opacity-70"
        style={{
          background:
            'linear-gradient(90deg, var(--brand-hex), transparent 20%, transparent 80%, var(--brand2-hex))',
        }}
      />
      <div className="container py-8 md:py-10">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          {/* left: brand + copyright */}
          <p className="text-sm text-muted-foreground">
            © {year} {BRAND}. All rights reserved.
          </p>

          {/* middle: quick nav (optional) */}
          <nav className="flex flex-wrap items-center gap-5 text-sm">
            <Link className="nav-link" href="/portfolio">
              Portfolio
            </Link>
            <Link className="nav-link" href="/solutions">
              Solutions
            </Link>
            <Link className="nav-link" href="/contact">
              Contact
            </Link>
          </nav>

          {/* right: social / email */}
          <div className="flex items-center gap-4">
            <Link
              aria-label="Email"
              href="mailto:shuvovai403@gmail.com"
              className="rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/10 transition"
            >
              <Mail className="h-5 w-5 opacity-80" />
            </Link>

            <Link
              aria-label="GitHub"
              href="https://github.com/shahriear"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/10 transition"
            >
              <Github className="h-5 w-5 opacity-80" />
            </Link>

            <Link
              aria-label="LinkedIn"
              href="http://linkedin.com/in/shahriear-shuvo"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/10 transition"
            >
              <Linkedin className="h-5 w-5 opacity-80" />
            </Link>
            <Link
              aria-label="WhatsApp"
              href="https://wa.me/+8801706691320"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/10 transition"
            >
              <MessageCircle className="h-5 w-5 opacity-80" />
            </Link>

            {/* back to top */}
            <button
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="ml-2 rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/10 transition"
            >
              <ArrowUp className="h-5 w-5 opacity-80" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
