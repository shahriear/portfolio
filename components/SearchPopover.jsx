"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  ChevronRight,
  Package,
  Boxes,
  FileText,
  CheckCircle2,
} from "lucide-react";

// ✅ safe import: named/default 
import searchDataRaw from "@/lib/searchData";
const DATA =
  (searchDataRaw && searchDataRaw.searchData)
    ? searchDataRaw.searchData
    : (searchDataRaw || { services: [], bundles: [], pages: [] });

const TABS = ["All", "Services", "Bundles", "Pages"];

export default function SearchPopover({ open, onClose }) {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("All");
  const router = useRouter();
  const panelRef = useRef(null);
  const inputRef = useRef(null);

  // open to import
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      // clouse
      setQ("");
      setTab("All");
    }
  }, [open]);

  // ESC/Outside 
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    function onDoc(e) {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose?.();
      }
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.addEventListener("mousedown", onDoc);
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDoc);
    };
  }, [open, onClose]);

  const hits = useMemo(() => {
    const term = q.trim().toLowerCase();
    const arr = [];

    const push = (items, _kind) => {
      for (const it of items || []) {
        const ok =
          !term ||
          it.title?.toLowerCase().includes(term) ||
          (it.tags || []).some((t) => t.toLowerCase().includes(term));
        if (ok) arr.push({ ...it, _kind });
      }
    };

    if (tab === "All" || tab === "Services") push(DATA.services, "services");
    if (tab === "All" || tab === "Bundles")  push(DATA.bundles,  "bundles");
    if (tab === "All" || tab === "Pages")    push(DATA.pages,    "pages");

    return arr;
  }, [q, tab]);

  const go = (href) => {
    onClose?.();
    router.push(href);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80]"
      aria-modal="true"
      role="dialog"
    >
      {/* Dimmed backdrop + soft blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Panel */}
      <div
        ref={panelRef}
        className="absolute left-1/2 top-8 w-[min(1100px,94vw)] -translate-x-1/2 rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10"
      >
        {/* Top search bar */}
        <div className="relative bg-[oklch(var(--surface))] p-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
             
            }}
            className="relative flex items-center gap-2 rounded-xl ring-1 ring-black/10 dark:ring-white/10 bg-white/90 dark:bg-neutral-900/90 px-3 py-2 shadow"
          >
            <Search className="h-4 w-4 opacity-70" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search services, bundles, pages..."
              className="bg-transparent outline-none flex-1 text-[15px]"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="rounded-lg p-1.5 hover:bg-black/5 dark:hover:bg-white/5"
            >
              <X className="h-4 w-4" />
            </button>
          </form>

          {/* Tabs */}
          <div className="mt-2 flex items-center gap-2">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-2.5 py-1.5 text-sm rounded-lg border transition ${
                  tab === t
                    ? "border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/10"
                    : "border-transparent hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Results (scrollable) */}
        <div className="max-h-[70vh] overflow-y-auto bg-[oklch(var(--surface))]">
          {/* secson heder */}
          {["services", "bundles", "pages"].map((sectionKey) => {
            const sectionHits = hits.filter((h) => h._kind === sectionKey);
            if (!sectionHits.length) return null;

            const label =
              sectionKey === "services"
                ? "Services"
                : sectionKey === "bundles"
                ? "Bundles"
                : "Pages";

            return (
              <div key={sectionKey}>
                <div className="sticky top-0 z-10 bg-[oklch(var(--surface))]/95 backdrop-blur border-y border-black/5 dark:border-white/5 px-4 py-2 text-sm opacity-70">
                  {label}
                </div>

                <ul className="px-2 py-2">
                  {sectionHits.map((h, i) => (
                    <li key={h.href + i}>
                      <Link
                        href={h.href}
                        onClick={(e) => {
                          e.preventDefault();
                          go(h.href);
                        }}
                        className="group flex items-start gap-3 rounded-xl px-3 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition"
                      >
                        <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
                          {sectionKey === "services" ? (
                            <CheckCircle2 className="h-5 w-5 opacity-80" />
                          ) : sectionKey === "bundles" ? (
                            <Boxes className="h-5 w-5 opacity-80" />
                          ) : (
                            <FileText className="h-5 w-5 opacity-80" />
                          )}
                        </span>

                        <span className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{h.title}</span>
                            <span className="opacity-50 text-xs">
                              {sectionKey === "services"
                                ? "services"
                                : sectionKey === "bundles"
                                ? "bundles"
                                : "pages"}
                            </span>
                          </div>
                          {h.desc ? (
                            <div className="text-sm opacity-70">{h.desc}</div>
                          ) : null}
                          {Array.isArray(h.tags) && h.tags.length ? (
                            <div className="mt-1 flex flex-wrap gap-1.5">
                              {h.tags.slice(0, 6).map((t) => (
                                <span
                                  key={t}
                                  className="rounded-md border border-black/10 dark:border-white/10 px-1.5 py-0.5 text-[11px] opacity-80"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </span>

                        <ChevronRight className="mt-1 h-4 w-4 opacity-30 group-hover:opacity-60 transition" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Empty state */}
          {!hits.length && (
            <div className="px-6 py-12 text-center text-sm opacity-70">
              No results. Try “website”, “seo”, or “garments”.
            </div>
          )}
        </div>

        {/* Bottom gradient hint / tips */}
        <div
          className="px-4 py-2 text-xs opacity-70"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklch, var(--brand-hex) 6%, transparent), transparent)",
          }}
        >
          Tip: use arrow keys to navigate, <kbd>Enter</kbd> to open, <kbd>Esc</kbd> to close.
        </div>
      </div>
    </div>
  );
}
