"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from "lucide-react";

/* ==== brand-aware tokens (CSS variables) ==== */
const GRADIENT = "linear-gradient(90deg, var(--brand-hex), var(--brand2-hex))";
const SURFACE_BG = "oklch(var(--surface))";

const TLD_SUGGESTIONS = [
  ".com",
  ".net",
  ".org",
  ".co",
  ".io",
  ".dev",
  ".app",
  ".xyz",
  ".ai",
  ".tech",
  ".store",
  ".online",
];

function Badge({ state }) {
  const map = {
    available: {
      label: "Available",
      className: "border-emerald-400 text-emerald-600 dark:text-emerald-400",
    },
    taken: {
      label: "Taken",
      className: "border-rose-400 text-rose-600 dark:text-rose-400",
    },
    unknown: {
      label: "Unknown",
      className: "border-amber-400 text-amber-600 dark:text-amber-400",
    },
    error: {
      label: "Error",
      className: "border-rose-400 text-rose-600 dark:text-rose-400",
    },
  };
  const m = map[state] ?? map.unknown;
  const Icon =
    state === "available" ? CheckCircle2 : state === "taken" ? XCircle : HelpCircle;

  return (
    <span className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs ${m.className}`}>
      <Icon className="h-4 w-4" /> {m.label}
    </span>
  );
}

export default function DomainSearch({
  id = "domains",
  sectionTitle = "Find your domain",
  sectionSubtitle = "",
}) {
  const [name, setName] = useState("");
  const [tlds, setTlds] = useState(TLD_SUGGESTIONS.slice(0, 8));
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const base = useMemo(
    () => (name || "").trim().toLowerCase().replace(/[^a-z0-9-]/g, ""),
    [name]
  );

  useEffect(() => {
    const h = setTimeout(() => {
      if (base.length >= 2) handleSearch();
      else setResults([]);
    }, 450);
    return () => clearTimeout(h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, tlds.join("|")]);

  async function handleSearch() {
    if (!base) return;
    setLoading(true);
    setError("");
    try {
      const domains = tlds.map((t) => `${base}.${String(t).replace(/^\./, "")}`);

      const r = await fetch("/api/domain-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domains }),
      });

      const ct = r.headers.get("content-type") || "";

      // Fallback: some hosts may not allow JSON POST body
      if (!ct.includes("application/json")) {
        const per = await Promise.all(
          domains.map(async (d) => {
            try {
              const g = await fetch(`/api/domain-check?domain=${encodeURIComponent(d)}`, {
                cache: "no-store",
              });
              const gct = g.headers.get("content-type") || "";
              if (gct.includes("application/json")) {
                const gd = await g.json();
                return { domain: d, available: !!gd.available, message: gd.message || "" };
              }
            } catch (_) {}
            return { domain: d, available: false, message: "Could not verify" };
          })
        );

        const normalized = per.map((r) => ({
          domain: r.domain,
          state: r.available ? "available" : "taken",
          summary: r.message || "",
        }));
        setResults(normalized);
        return;
      }

      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Failed to check domain");

      const normalized = (data.results || []).map((r) => ({
        domain: r.domain,
        state: r.available ? "available" : "taken",
        summary: r.message || "",
      }));
      setResults(normalized);
    } catch (e) {
      setError(e?.message || "Something went wrong");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function toggleTld(tld) {
    setTlds((prev) => (prev.includes(tld) ? prev.filter((t) => t !== tld) : [...prev, tld]));
  }

  return (
    <section id={id} className="relative w-full">
      {/* surface strip for dark/light harmony */}
      <div className="absolute inset-x-0 -z-10 hidden h-full w-full dark:block" style={{ background: SURFACE_BG }} />

      {/* ↓ tighter vertical spacing */}
      <div className="mx-auto w-full max-w-6xl px-4 pt-6 pb-8 sm:pt-7 sm:pb-9">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-3 sm:mb-4 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            <span className="text-[var(--brand-hex)]">{sectionTitle}</span>
          </h2>
          {sectionSubtitle ? (
            <p className="mt-1.5 text-sm sm:text-base muted">{sectionSubtitle}</p>
          ) : null}
          <div className="mx-auto mt-3 h-[3px] w-24 rounded-full" style={{ backgroundImage: GRADIENT }} />
        </motion.div>

        <div className="card p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-60">
                <Search className="h-4.5 w-4.5" />
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="yourbrand"
                className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent pl-10 pr-3 py-2.5 outline-none"
                aria-label="Domain name"
              />
            </div>
            <button
              onClick={handleSearch}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow disabled:opacity-60"
              style={{ backgroundImage: GRADIENT }}
              disabled={!base || loading}
              aria-disabled={!base || loading}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Checking…
                </span>
              ) : (
                "Check availability"
              )}
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {TLD_SUGGESTIONS.map((t) => {
              const active = tlds.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => toggleTld(t)}
                  className={`rounded-lg border px-2.5 py-1 text-xs transition ${
                    active ? "text-white" : "text-foreground/80 border-black/10 dark:border-white/10"
                  }`}
                  style={active ? { backgroundImage: GRADIENT } : {}}
                  aria-pressed={active}
                  type="button"
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4">
          {error && (
            <div className="mb-4 rounded-xl border border-rose-300/40 bg-rose-50/40 px-3 py-2 text-sm text-rose-600 dark:border-rose-400/30 dark:bg-rose-400/10 dark:text-rose-300">
              {error}
            </div>
          )}

          {loading ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card p-4 animate-pulse">
                  <div className="h-4 w-3/5 rounded bg-black/10 dark:bg-white/10" />
                  <div className="mt-2 h-3 w-2/5 rounded bg-black/10 dark:bg-white/10" />
                </div>
              ))}
            </div>
          ) : results.length ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((r) => (
                <div key={r.domain} className="card p-4 flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{r.domain}</div>
                    <div className="mt-0.5 text-xs opacity-70">{r.summary || "—"}</div>
                  </div>
                  <Badge state={r.state} />
                </div>
              ))}
            </div>
          ) : base.length >= 2 ? (
            <div className="text-center text-sm opacity-70">No results yet. Try selecting more TLDs.</div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
