"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon, Search } from "lucide-react";
import { useTheme } from "next-themes";
import AccountButton from "@/components/AccountButton";
import { useRouter, usePathname } from "next/navigation";
import SearchPopover from "@/components/SearchPopover";

const links = [
  { href: "/", label: "Homee" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/portfolio", label: "Portfolio" },
  // { href: "/garments", label: "Garments" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    setOpen(false);
    setOpenSearch(false);
  }, [pathname]);

  const isDark = (resolvedTheme || theme) !== "light";
  const submitSearch = (e) => {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    setOpen(false);
    router.push("/search?q=" + encodeURIComponent(term));
    setQ("");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition ${
        scrolled
          ? 'backdrop-blur bg-white/70 dark:bg-neutral-950/60 border-b border-black/10 dark:border-white/10'
          : ''
      }`}
    >
      {/* One-row responsive grid: [left | center | right] */}
      <div className="container h-16 grid grid-cols-[auto,1fr,auto] items-center">
        {/* LEFT (mobile hamburger, desktop empty) */}
        <div className="justify-self-start">
          <button
            className="md:hidden p-2 rounded-lg border border-black/10 dark:border-white/10"
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* CENTER (logo on mobile center; desktop left via grid start override) */}
        <div className="col-start-2 justify-self-center md:col-start-1 md:justify-self-start">
          {/* <img src="tah-logo.png" alt="" /> */}

          <Link
            href="/"
            aria-label="Home"
            className="relative z-20 select-none"
          >
            {/* no-FOUC:  */}
            <Image
              src="/logoLight.png"
              alt="Shuvo"
              width={140}
              height={28}
              priority
              className="h-10 w-auto block dark:hidden"
            />
            <Image
              src="/logoDark.png"
              alt="Shuvo"
              width={140}
              height={28}
              priority
              className="h-10 w-auto hidden dark:block"
            />
          </Link>
        </div>
        {/* MIDDLE NAV (desktop only, occupies true center column) */}
        <nav className="hidden md:flex items-center justify-center gap-2 col-start-2 ">
          {links.map(l => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link ${active ? 'text-foreground font-semibold' : ''}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        {/* RIGHT (actions; mobile = theme+account, desktop = search+theme+account) */}
        <div className="justify-self-end flex items-center gap-2">
          {/* Desktop search */}
          <button
            className="hidden md:inline-flex nav-link p-2"
            aria-label="Search"
            aria-expanded={openSearch}
            onClick={() => setOpenSearch(v => !v)}
          >
            <Search size={16} />
          </button>

          {/* Theme toggle */}
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="nav-link p-2 rounded-lg border border-black/10 dark:border-white/10"
          >
            {mounted ? (
              isDark ? (
                <Sun size={16} />
              ) : (
                <Moon size={16} />
              )
            ) : (
              <span className="inline-block w-4 h-4" />
            )}
          </button>

          {/* Account */}
          <AccountButton />

          {/* Desktop search popover anchor */}
          <div className="relative hidden md:block">
            <SearchPopover
              open={openSearch}
              onClose={() => setOpenSearch(false)}
            />
          </div>
        </div>
      </div>

      {/* ===== Mobile panel ===== */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-x-0 top-16 z-50 bg-white/95 dark:bg-neutral-900/95 border-t border-black/10 dark:border-white/10 shadow-lg transition-transform duration-200 ${
          open
            ? 'translate-y-0 opacity-100'
            : '-translate-y-2 opacity-0 pointer-events-none'
        }`}
        style={{ height: '100vh', overflowY: 'auto' }}
      >
        <div className="container py-4 flex flex-col gap-3">
          {/* Mobile search */}
          <form
            onSubmit={submitSearch}
            className="flex items-center gap-2 bg-[oklch(var(--surface))] ring-1 ring-black/10 dark:ring-white/20 rounded-xl p-2 shadow-md"
          >
            <Search size={18} className="opacity-70" />
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search..."
              className="bg-transparent flex-1 outline-none px-1 py-2"
            />
            <button
              className="rounded-lg px-3 py-2 text-white shadow"
              style={{
                background:
                  'linear-gradient(90deg, var(--brand-hex), var(--brand2-hex))',
              }}
            >
              Go
            </button>
          </form>

          {/* Links */}
          <nav className="flex flex-col gap-1">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`nav-link ${pathname === l.href ? 'font-semibold' : ''}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Actions inside panel */}
          <div className="flex items-center gap-2 pt-1">
            <button
              aria-label="Toggle theme"
              onClick={() => {
                setOpen(false);
                setTheme(isDark ? 'light' : 'dark');
              }}
              className="nav-link p-2 rounded-lg border border-black/10 dark:border-white/10"
            >
              {mounted ? (
                isDark ? (
                  <Sun size={16} />
                ) : (
                  <Moon size={16} />
                )
              ) : (
                <span className="inline-block w-4 h-4" />
              )}
            </button>
            <AccountButton />
          </div>
        </div>
      </div>
    </header>
  );
}
