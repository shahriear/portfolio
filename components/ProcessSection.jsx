"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, PenTool, Wrench, Rocket } from "lucide-react";

const GRADIENT =
  "linear-gradient(90deg, var(--brand-hex, #1f155a), var(--brand2-hex, #38b4a1))";

// Animation presets
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 18 },
  },
};

export default function ProcessSection() {
  return (
    <section className="relative w-full">
      {/* top spacing so it doesn’t stick to previous block */}
      <div className="mx-auto w-full max-w-6xl px-4 pt-16 sm:pt-20 pb-6">
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            A process that keeps you in the loop
          </h2>
          <p className="muted mt-2">
            Clear stages and predictable delivery — no surprises.
          </p>
          <div
            className="mx-auto mt-4 h-[3px] w-28 rounded-full"
            style={{ backgroundImage: GRADIENT }}
          />
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Step 1 */}
          <motion.div
            variants={item}
            whileHover={{ y: -3 }}
            className="card p-5"
          >
            <div className="text-xs opacity-70">Step 1</div>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/5 dark:bg-white/10">
                <Compass className="h-4 w-4 opacity-80" />
              </div>
              <h3 className="text-lg font-semibold">Discover</h3>
            </div>
            <p className="muted mt-2">
              We define goals, scope, timeline and success metrics.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            variants={item}
            whileHover={{ y: -3 }}
            className="card p-5"
          >
            <div className="text-xs opacity-70">Step 2</div>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/5 dark:bg-white/10">
                <PenTool className="h-4 w-4 opacity-80" />
              </div>
              <h3 className="text-lg font-semibold">Design</h3>
            </div>
            <p className="muted mt-2">
              Wireframes to UI — iterate fast with your feedback.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            variants={item}
            whileHover={{ y: -3 }}
            className="card p-5"
          >
            <div className="text-xs opacity-70">Step 3</div>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/5 dark:bg-white/10">
                <Wrench className="h-4 w-4 opacity-80" />
              </div>
              <h3 className="text-lg font-semibold">Build</h3>
            </div>
            <p className="muted mt-2">
              Code, integrations, and content migration.
            </p>
          </motion.div>

          {/* Step 4 */}
          <motion.div
            variants={item}
            whileHover={{ y: -3 }}
            className="card p-5"
          >
            <div className="text-xs opacity-70">Step 4</div>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/5 dark:bg-white/10">
                <Rocket className="h-4 w-4 opacity-80" />
              </div>
              <h3 className="text-lg font-semibold">Launch</h3>
            </div>
            <p className="muted mt-2">
              Deploy, monitor, and improve with analytics.
            </p>
          </motion.div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/contact?tab=book"
            aria-label="Book a free 15 minute discovery call"
            className="rounded-xl px-4 py-2 text-white shadow"
            style={{ backgroundImage: GRADIENT }}
          >
            Book a free 15-min call
          </Link>

          <Link
            href="/contact?tab=inquiry&reason=Timeline"
            aria-label="Ask about timeline and get a rough estimate"
            className="nav-link rounded-xl border border-black/10 dark:border-white/10 px-4 py-2 inline-flex items-center gap-1"
          >
            Ask about timeline & estimate →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
