"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Download,
  Check,
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  Sparkles,
  Award,
  ArrowRight,
} from "lucide-react";

/* ========= DATA ========= */

const experience = [
  {
    role: "Senior Full-Stack Developer",
    company: "Swisscom",
    location: "Zurich, Switzerland (Remote)",
    period: "2025 — Present",
    bullets: [
      "Next.js + Node.js monorepo with shared UI and API packages",
      "Web vitals 90+ across pages; SSR caching + edge middleware",
      "Design system tokens, a11y audits, DX tooling & CI pipelines",
    ],
  },
  {
    role: "Tech Lead (E-commerce Platform)",
    company: "Zalando SE",
    location: "Berlin, Germany (Remote)",
    period: "2023 — 2025",
    bullets: [
      "Owned product detail/checkout flows for 1M+ MAU",
      "Led 12-member squad; roadmap, estimates & delivery",
      "Introduced feature flags, error budgets, SLO/SLA tracking",
    ],
  },
  {
    role: "Senior Digital Marketing Coordinator",
    company: "Disruptive Advertising",
    location: "USA (Remote)",
    period: "2022 — 2024",
    bullets: [
      "Managed multi-channel PPC with GA4 + Meta Pixel",
      "Built reporting dashboards; CPA down by 23%",
    ],
  },
  {
    role: "Full-Stack Engineer",
    company: "Growth Labs",
    location: "Dhaka, Bangladesh",
    period: "2021 — 2023",
    bullets: [
      "Headless CMS (Sanity/Strapi) + Next.js marketing sites",
      "Serverless APIs on Vercel/AWS; image/CDN optimization",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Pixel Forge",
    location: "Dhaka, Bangladesh (Remote)",
    period: "2020 — 2021",
    bullets: [
      "React SPA to Next.js migration with route-level code-split",
      "Component library, storybook & visual regression tests",
    ],
  },
];

const education = [
  {
    school: 'Uttara University',
    period: '2025 — 2028',
    details: 'B.Sc. in CSE Engineering — strong analytical & research skills',
  },
  {
    school: 'Creative IT Institute',
    period: '2023 — 2025',
    details:
      'Full-stack bootcamp: HTML/CSS/JS, React, Next.js, Node.js, Express, MongoDB',
  },
  {
    school: 'Security Printing Corporation High School',
    period: '2010 — 2020',
    details:
      'Communication / Leadership / Teamwork. Computer / Programming skills',
  },
  {
    school: 'Self-Learning & MOOCs',
    period: 'Ongoing',
    details: 'System design, performance, a11y, testing, product thinking',
  },
];

const certifications = [
  {
    name: "Meta Front-End Developer (Professional Cert.)",
    org: "Meta / Coursera",
    year: "2024",
  },
  {
    name: "Google Analytics 4 (GA4) Certification",
    org: "Google",
    year: "2024",
  },
  {
    name: "AWS Cloud Practitioner (CLF-C02)",
    org: "Amazon Web Services",
    year: "2023",
  },
  { name: "Javascript & Node.js Mastery", org: "Udemy", year: "2023" },
];

const quickFacts = [
  { k: "Projects shipped", v: "80+" },
  { k: "Clients served", v: "65+" },
  { k: "On-time delivery", v: "97% (last 12m)" },
];

/* ========= ANIMATIONS ========= */

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const fade = {
  hidden: { opacity: 0, y: prefersReduced ? 0 : 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: prefersReduced ? 0 : 0.45, ease: "easeOut" },
  },
};
const list = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: prefersReduced ? {} : { staggerChildren: 0.08 },
  },
};

/* ========= COLORS (fallback) ========= */
const GRADIENT = `linear-gradient(90deg, var(--brand-hex, #1f155a), var(--brand2-hex, #38b4a1))`;

/* ========= COMPONENT ========= */

export default function ResumeClient() {
  return (
    <div className="relative container mt-24">
      {/* decorative bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-50 opacity-[.06] dark:opacity-[.08]"
        style={{
          background: `radial-gradient(900px 350px at 20% 10%, var(--brand-hex, #1f155a), transparent),
             radial-gradient(900px 350px at 80% 20%, var(--brand2-hex, #38b4a1), transparent)`,
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between gap-4">
        <motion.div variants={fade} initial="hidden" animate="show">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-3 py-1 text-sm">
            <Sparkles className="h-4 w-4" aria-hidden />
            <span className="opacity-80">Professional profile</span>
          </div>

          {/*bg-clip-text*/}
          <h1 className="mt-2 text-4xl font-extrabold leading-tight">Resume</h1>
          <div
            className="mt-2 h-[3px] w-24 rounded-full"
            style={{ background: GRADIENT }}
            aria-hidden
          />

          <p className="muted mt-3 max-w-2xl">
            Full-stack product engineer with a marketing edge — I design
            systems, build delightful UIs, ship robust APIs and optimise for
            growth. Focus on quality, accessibility and performance.
          </p>
        </motion.div>

        {/* download (desktop) */}
        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          className="hidden md:block"
        >
          {/* <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-white shadow transition hover:shadow-md"
            style={{ background: GRADIENT }}
          >
            <Download size={16} aria-hidden />
            Download PDF
          </Link> */}
        </motion.div>
      </div>

      {/* quick facts */}
      <motion.ul
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-6 grid max-w-2xl grid-cols-3 gap-3"
      >
        {quickFacts.map((f) => (
          <motion.li
            key={f.k}
            variants={fade}
            className="group relative overflow-hidden rounded-2xl border border-black/10 bg-[oklch(var(--surface))/90] p-4 shadow-sm backdrop-blur-sm transition hover:shadow-md dark:border-white/10"
          >
            <div className="text-xs opacity-70">{f.k}</div>
            <div className="text-xl font-semibold">{f.v}</div>
          </motion.li>
        ))}
      </motion.ul>

      {/* Experience */}
      <motion.section
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-12"
      >
        <div className="mb-4 flex items-center gap-2">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <Briefcase className="h-5 w-5 opacity-90" aria-hidden />
          </div>
          <h2 className="text-xl font-bold">Experience</h2>
        </div>

        <div className="relative pl-6">
          <div
            aria-hidden
            className="absolute left-[14px] top-0 h-full w-[2px] rounded-full"
            style={{
              background: `linear-gradient(180deg,
                  color-mix(in oklch, var(--brand-hex, #1f155a) 80%, transparent),
                  color-mix(in oklch, var(--brand2-hex, #38b4a1) 80%, transparent)
                )`,
            }}
          />
          <div className="space-y-5">
            {experience.map((e, idx) => (
              <motion.article
                key={idx}
                variants={fade}
                className="relative rounded-2xl border border-black/10 bg-[oklch(var(--surface))] p-5 shadow-sm transition hover:shadow-md dark:border-white/10"
              >
                <span
                  aria-hidden
                  className="absolute -left-[7px] top-6 h-3 w-3 rounded-full ring-4 ring-[oklch(var(--surface))]"
                  style={{ background: GRADIENT }}
                />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="text-base font-semibold">{e.role}</h3>
                  <span className="hidden h-1 w-1 rounded-full bg-foreground/40 sm:inline-block" />
                  <div className="opacity-80">
                    {e.company}
                    <span className="opacity-70"> — {e.location}</span>
                  </div>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm opacity-70">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-4 w-4" aria-hidden />
                    {e.period}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4" aria-hidden />
                    {e.location}
                  </span>
                </div>

                <ul className="mt-3 space-y-1.5">
                  {e.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-[15px]">
                      <Check
                        size={16}
                        className="mt-0.5 text-emerald-500 dark:text-emerald-400"
                        aria-hidden
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Education */}
      <motion.section
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-12"
      >
        <div className="mb-4 flex items-center gap-2">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <GraduationCap className="h-5 w-5 opacity-90" aria-hidden />
          </div>
          <h2 className="text-xl font-bold">Education</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {education.map((ed, i) => (
            <motion.div
              key={i}
              variants={fade}
              className="group relative overflow-hidden rounded-2xl border border-black/10 bg-[oklch(var(--surface))] p-5 shadow-sm transition hover:shadow-md dark:border-white/10"
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ background: GRADIENT }}
              />
              <div className="text-base font-semibold">{ed.school}</div>
              <div className="text-sm opacity-70">{ed.period}</div>
              <p className="muted mt-2">{ed.details}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Certifications & Courses */}
      <motion.section
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-12 mb-8"
      >
        <div className="mb-4 flex items-center gap-2">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <Award className="h-5 w-5 opacity-90" aria-hidden />
          </div>
          <h2 className="text-xl font-bold">Certifications & Courses</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {certifications.map((c, idx) => (
            <motion.div
              key={idx}
              variants={fade}
              className="flex items-center justify-between rounded-2xl border border-black/10 bg-[oklch(var(--surface))] px-4 py-3 shadow-sm transition hover:shadow-md dark:border-white/10"
            >
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-sm opacity-70">{c.org}</div>
              </div>
              <div className="text-sm opacity-70">{c.year}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Mobile CTA */}
      <Link
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-xl border border-black/10 bg-[oklch(var(--surface))] px-4 py-2 text-sm shadow-lg backdrop-blur supports-[backdrop-filter]:bg-[oklch(var(--surface))/90] dark:border-white/10 md:hidden"
      >
        <Download className="h-4 w-4" aria-hidden />
        <span>Download PDF</span>
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}
