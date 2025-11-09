"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SEARCH_INDEX } from "@/lib/searchData";
import { Search } from "lucide-react";

export const runtime = "edge";
export const dynamic = "force-static";

const groups = [
  { key: "service", label: "Services" },
  { key: "bundle",  label: "Bundles" },
  { key: "page",    label: "Pages"   },
];

function SearchInner() {
  const params = useSearchParams();
  const q = (params.get("q") || "").trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return [];
    const index = Array.isArray(SEARCH_INDEX) ? SEARCH_INDEX : [];
    return index
      .map((item) => {
        const text = (item.title + " " + (item.tags || []).join(" ")).toLowerCase();
        let score = 0;
        if (text.includes(q)) score += 10;
        if ((item.tags || []).some(t => (t || "").toLowerCase().includes(q))) score += 5;
        if ((item.title || "").toLowerCase().startsWith(q)) score += 5;
        return { ...item, _score: score };
      })
      .filter(i => i._score > 0)
      .sort((a,b) => b._score - a._score);
  }, [q]);

  return (
    <div className="container mt-24">
      <div className="flex items-center gap-2">
        <Search className="h-5 w-5 opacity-70" />
        <h1 className="text-2xl font-bold">Search</h1>
      </div>
      <p className="muted mt-1">Showing results for: <span className="font-medium">“{q || "—"}”</span></p>

      {!q ? (
        <p className="mt-6 opacity-70">Type something in the navbar search.</p>
      ) : results.length === 0 ? (
        <p className="mt-6 opacity-70">No results found.</p>
      ) : (
        <div className="mt-6 space-y-6">
          {groups.map(g => {
            const items = results.filter(r => r.type === g.key);
            if (!items.length) return null;
            return (
              <section key={g.key}>
                <h2 className="text-lg font-semibold mb-2">{g.label}</h2>
                <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((r) => (
                    <li key={r.title} className="rounded-xl border border-black/10 dark:border-white/10 p-4 hover:shadow-sm transition">
                      <Link href={r.href} className="block">
                        <div className="font-medium">{r.title}</div>
                        {r.tags?.length ? <div className="mt-1 text-xs opacity-70">{r.tags.join(" · ")}</div> : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="container mt-24">Loading search…</div>}>
      <SearchInner />
    </Suspense>
  );
}
