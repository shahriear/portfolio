"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Megaphone, Palette } from "lucide-react";

/* brand-aware tokens */
const GRADIENT = "linear-gradient(90deg, var(--brand-hex), var(--brand2-hex))";
const SURFACE_BG = "oklch(var(--surface))";

/* data */
const BUNDLES = [
  {
    icon: Globe,
    name: "Website",
    caption: "Custom or CMS website fast, secure, editor-friendly.",
    bullets: [
      "Next.js frontend with clean UI",
      "Custom stack or CMS (WordPress/Sanity)",
      "API integration (Node/Express)",
      "Postgres/MongoDB support",
      "Auth, forms & file uploads",
      "SEO + deploy, monitor & handover",
    ],
    queryLabel: "Website",
  },
  {
    icon: Megaphone,
    name: "Digital Marketing",
    caption: "Plan, run, and optimize with clear results.",
    bullets: [
      "Channel plan & budgeting",
      "FB/IG setup + pixels/events",
      "Weekly content/ad calendar",
      "High-performing ad creatives",
      "Reports, retargeting & LAL",
      "CRO tips for landing pages",
    ],
    queryLabel: "Digital Marketing",
  },
  {
    icon: Palette,
    name: "Graphics & Branding",
    caption: "Clean identity and production-ready assets.",
    bullets: [
      "Logo, color & type system",
      "Brand kit & usage guide",
      "Business card/letterhead",
      "Web & print banners/posters",
      "Editable source files",
      "2–3 revision rounds",
    ],
    queryLabel: "Graphics & Branding",
  },
];

/* animation */
const container = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1, y: 0,
    transition: { type: "spring", stiffness: 160, damping: 18, staggerChildren: 0.08 },
  },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 220, damping: 18 } },
};

export default function BundlesSection({
  sectionTitle = "Solution bundles",
  sectionSubtitle = "Pick what you need and contact directly — modern, clean and effective.",
  contactHref = "/contact",
  id = "bundles",
  relaxed = false, // set true if you want the old larger spacing
}) {
  const pad = relaxed
    ? "py-12 sm:py-16"
    : "pt-6 pb-10 sm:pt-8 sm:pb-12";

  return (
    <section id={id} className="relative w-full">
      {/* dark-only bg tint */}
      <div className="absolute inset-x-0 -z-10 hidden h-full w-full dark:block" style={{ background: SURFACE_BG }} />

      <div className={`mx-auto w-full max-w-6xl px-4 ${pad}`}>
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-center mb-5"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            <span className="text-[var(--brand-hex)]">{sectionTitle}</span>
          </h2>
          {sectionSubtitle && <p className="mt-2 text-sm sm:text-base muted">{sectionSubtitle}</p>}
          <div className="mx-auto mt-3 h-[3px] w-24 rounded-full" style={{ backgroundImage: GRADIENT }} />
        </motion.div>

        {/* cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {BUNDLES.map((b) => {
            const Icon = b.icon;
            const href = contactHref.startsWith("mailto:")
              ? contactHref
              : `${contactHref}?bundle=${encodeURIComponent(b.queryLabel)}`;

            return (
              <motion.article key={b.name} variants={item} whileHover={{ y: -4 }} className="card p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
                    <Icon className="h-5 w-5 opacity-90" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold">{b.name}</h3>
                    <p className="text-sm muted">{b.caption}</p>
                  </div>
                </div>

                <div className="mt-3 h-[2px] w-16 rounded-full" style={{ backgroundImage: GRADIENT }} />

                <div className="mt-4 flex h-full flex-col">
                  <ul className="space-y-2 text-sm">
                    {b.bullets.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current/40" />
                        <span className="leading-relaxed">{t}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={href} className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-black/10 dark:border-white/10 px-4 py-2.5 text-sm font-medium">
                    Contact about “{b.queryLabel}”
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
