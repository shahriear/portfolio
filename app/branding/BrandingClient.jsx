// app/branding/BrandingClient.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Palette,
  Type,
  SwatchBook,
  Ruler,
  Image as ImageIcon,
  FileText,
  BadgeCheck,
  Sparkles,
  Rocket,
  ShieldCheck,
  Handshake,
} from "lucide-react";

/* small motion helpers */
const fade = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const list = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const GRADIENT = "linear-gradient(90deg, var(--brand-hex), var(--brand2-hex))";

/* ---------- data (branding-focused copy) ---------- */
const DELIVERABLES = [
  {
    icon: Palette,
    title: "Logo Suite",
    bullets: [
      "Primary, secondary & favicon",
      "Mono / inverted variants",
      "SVG, PDF, PNG exports",
    ],
  },
  {
    icon: SwatchBook,
    title: "Color System",
    bullets: [
      "Core & accent palette",
      "Light/Dark tokens (OKLCH)",
      "Accessibility & contrast rules",
    ],
  },
  {
    icon: Type,
    title: "Typography",
    bullets: [
      "Brand type pairing",
      "Web licensing guidance",
      "Scale & rhythm system",
    ],
  },
  {
    icon: FileText,
    title: "Brand Guidelines",
    bullets: [
      "Usage do’s & don’ts",
      "Spacing, grids & logo safety area",
      "Downloadable guide (PDF)",
    ],
  },
  {
    icon: ImageIcon,
    title: "Social & Ad Kit",
    bullets: [
      "Profile & cover templates",
      "Post/story/ad layouts",
      "Editable source files",
    ],
  },
  {
    icon: Ruler,
    title: "Stationery & Collateral",
    bullets: [
      "Card, letterhead, envelope",
      "Print-ready exports",
      "Realistic mockups",
    ],
  },
];

const PACKAGES = [
  {
    name: "Brand Kit",
    price: "from $299",
    tagline: "Clean identity for new or early-stage products.",
    features: [
      "Primary logo + mono variant",
      "Color palette & type pairing",
      "Mini brand sheet (PDF)",
      "2 rounds of refinement",
      "Source files & exports",
    ],
    cta: "/contact?reason=Brand%20Kit",
    badge: "Starter",
  },
  {
    name: "Brand + Site",
    price: "from $899",
    tagline: "Identity + a fast marketing site to launch right away.",
    features: [
      "Full logo suite (primary/secondary)",
      "Light/Dark design tokens (OKLCH)",
      "12-page brand guide",
      "Social kit + stationery",
      "1–3 page Next.js site (landing)",
      "3 rounds of refinement",
    ],
    cta: "/contact?reason=Brand%20%2B%20Site",
    badge: "Most Popular",
  },
  {
    name: "Brand + Growth",
    price: "from $1,499",
    tagline: "Identity, components & campaign assets for scale.",
    features: [
      "Extended logo set & iconography",
      "Developer tokens + component snippets",
      "Campaign/ad templates bundle",
      "Launch/rollout support (2 weeks)",
      "Unlimited revisions for 1 month",
      "All source files & exports",
    ],
    cta: "/contact?reason=Brand%20%2B%20Growth",
    badge: "Pro",
  },
];

const STEPS = [
  {
    icon: Handshake,
    title: "Discovery Call",
    desc: "Goals, audience, competitors & tone — we align on outcomes.",
  },
  {
    icon: ShieldCheck,
    title: "Strategy & Mood",
    desc: "Moodboards, directions & a clear creative brief to guide the work.",
  },
  {
    icon: Sparkles,
    title: "Concept Routes",
    desc: "Multiple logo directions with rationale and visual territories.",
  },
  {
    icon: BadgeCheck,
    title: "Refinement",
    desc: "Iterate with structured feedback until the mark is production-ready.",
  },
  {
    icon: Rocket,
    title: "Systemize & Handover",
    desc: "Tokens, guidelines, exports & templates — ready for web and print.",
  },
];

/* ---------- page ---------- */
export default function BrandingClient() {
  return (
    <div className="container mt-24">
      {/* hero */}
      <motion.header variants={fade} initial="hidden" animate="show">
        <p className="muted">Brand identity • Guidelines • Assets</p>
        <h1 className="mt-1 text-3xl md:text-5xl font-extrabold leading-tight">
          Build a brand that feels{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: GRADIENT }}
          >
            premium & consistent
          </span>
          .
        </h1>
        <p className="muted mt-3 max-w-2xl">
          I design modern identities with clear rules and production-ready
          assets — so your product, website and campaigns always look on-brand.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/contact?reason=Branding" className="btn">
            Book a branding call →
          </Link>
          <a
            href="#packages"
            className="btn-ghost"
            aria-label="Skip to packages"
          >
            See packages
          </a>
        </div>
      </motion.header>

      {/* deliverables */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">What you get</h2>
        <p className="muted mt-1">
          Everything required to launch and grow — neatly organized for teams
          and developers.
        </p>

        <motion.div
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {DELIVERABLES.map((d) => {
            const Icon = d.icon;
            return (
              <motion.article
                key={d.title}
                variants={fade}
                className="card p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
                    <Icon className="h-5 w-5 opacity-90" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{d.title}</h3>
                    <ul className="mt-2 space-y-1 text-sm">
                      {d.bullets.map((b, i) => (
                        <li key={i} className="feature">
                          <span className="soft">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </section>

      {/* packages */}
      <section id="packages" className="mt-10">
        <h2 className="text-xl font-bold">Packages</h2>
        <p className="muted mt-1">
          Choose the scope that fits — same quality across tiers.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {PACKAGES.map((p) => (
            <div key={p.name} className="card p-5 flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <span className="badge">{p.badge}</span>
              </div>
              <p className="mt-1 text-3xl font-extrabold">{p.price}</p>
              <p className="muted text-sm">{p.tagline}</p>

              <ul className="mt-3 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="feature">
                    <span className="leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={p.cta}
                className="mt-4 inline-flex items-center justify-center rounded-xl border border-black/10 dark:border-white/10 px-4 py-2.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5"
              >
                Start {p.name}
              </Link>
            </div>
          ))}
        </div>

        <p className="muted text-xs mt-3">
          Need something custom?{" "}
          <Link href="/contact?reason=Branding%20Custom" className="underline">
            Describe your scope
          </Link>{" "}
          for a fixed quote.
        </p>
      </section>

      {/* process */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">Process</h2>
        <p className="muted mt-1">
          Simple, collaborative and deadline-friendly.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-5">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="card p-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-2 font-semibold">
                  {i + 1}. {s.title}
                </h3>
                <p className="muted text-sm mt-1">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* small gallery (now using <Image /> with correct paths) */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">Recent brand work</h2>
        <p className="muted mt-1">A few quick snapshots &amp; mockups.</p>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            "/images/branding-1.jpg",
            "/images/branding-2.jpg",
            "/images/branding-3.jpg",
          ].map((src, i) => (
            <div key={src} className="card overflow-hidden h-48">
              <div className="relative h-48 w-full">
                <Image
                  src={src}
                  alt={`Branding mockup ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                  priority={i === 0}
                  loading={i === 0 ? "eager" : "lazy"}
                  onError={(e) => {
                    // fallback to subtle stripes if file missing
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.style.background =
                        "repeating-linear-gradient(45deg,#0001 0 10px,#0002 10px 20px)";
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">FAQ</h2>
        <div className="mt-3 space-y-2">
          <details className="card p-4">
            <summary className="font-semibold cursor-pointer">
              How many concepts and revisions are included?
            </summary>
            <p className="muted mt-2">
              Every package includes multiple logo directions. Revisions vary by
              tier (see above), and I keep refining until your mark is
              production-ready and consistent across uses.
            </p>
          </details>

          <details className="card p-4">
            <summary className="font-semibold cursor-pointer">
              What files do I receive at handover?
            </summary>
            <p className="muted mt-2">
              You’ll get vector (SVG/PDF) and raster (PNG) exports, a brand
              guide PDF, and for Pro: developer-friendly tokens for light/dark
              themes plus component snippets for Next.js.
            </p>
          </details>

          <details className="card p-4">
            <summary className="font-semibold cursor-pointer">
              Can you apply the brand to my website or landing page?
            </summary>
            <p className="muted mt-2">
              Yes. The “Brand + Site” and “Brand + Growth” packages include
              implementation in a fast, accessible Next.js marketing site — or I
              can ship tokens & components to your team to integrate.
            </p>
          </details>

          <details className="card p-4">
            <summary className="font-semibold cursor-pointer">
              Who owns the final design and IP?
            </summary>
            <p className="muted mt-2">
              Upon full payment, you receive exclusive rights to the finalized
              logo and brand assets. I may showcase the work in my portfolio
              unless you request otherwise.
            </p>
          </details>

          <details className="card p-4">
            <summary className="font-semibold cursor-pointer">
              What’s the typical timeline?
            </summary>
            <p className="muted mt-2">
              Starter: ~1 week. Brand + Site: 2–3 weeks. Brand + Growth: 3–4
              weeks depending on scope and feedback speed. I’ll share a detailed
              schedule at kickoff.
            </p>
          </details>
        </div>
      </section>

      {/* final cta */}
      <section className="mt-12 card p-6 text-center">
        <h3 className="text-lg font-semibold">Ready to look premium?</h3>
        <p className="muted mt-1">
          Get a quick scope &amp; quote, or book a short call to align.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Link href="/contact?reason=Branding" className="btn">
            Get a quote
          </Link>
          <Link href="/contact?tab=book&reason=Branding" className="btn-ghost">
            Book a 15-min call
          </Link>
        </div>
      </section>
    </div>
  );
}
