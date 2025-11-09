"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

/**
 * Call-to-Action section
 * - Add nice top spacing so it doesn't stick to the section above.
 * - You can override spacing via the `spaceTop` prop.
 */
export default function CTASection({
  id = "cta",
  title = "Have an idea? Let’s ship it.",
  subtitle = "Book a quick call or explore solutions to get started.",
  primaryHref = "/contact?tab=book",
  primaryLabel = "Book a 15-min call",
  secondaryHref = "/solutions",
  secondaryLabel = "Explore solutions",
  spaceTop = "mt-14 md:mt-16", // <- top spacing (change as you like)
}) {
  return (
    <section id={id} className={spaceTop}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="card overflow-hidden"
      >
        {/* Soft radial tint */}
        <div
          className="absolute inset-0 opacity-[.07] pointer-events-none"
          style={{
            background:
              "radial-gradient(600px 300px at 20% 30%, var(--brand-hex), transparent), radial-gradient(600px 300px at 80% 70%, var(--brand2-hex), transparent)",
          }}
        />
        <div className="relative p-6 md:p-10">
          <motion.h2
            className="text-2xl md:text-3xl font-bold"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4 }}
          >
            {title}
          </motion.h2>

          <motion.p
            className="muted mt-2"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            className="mt-5 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Link
              href={primaryHref}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-white shadow"
              style={{
                background:
                  "linear-gradient(90deg, var(--brand-hex), var(--brand2-hex))",
              }}
            >
              <Calendar className="h-4 w-4" />
              {primaryLabel}
            </Link>

            <Link
              href={secondaryHref}
              className="nav-link rounded-xl border border-black/10 dark:border-white/10 px-4 py-2 inline-flex items-center gap-2"
            >
              {secondaryLabel}
              <ArrowRight className="h-4 w-4 opacity-70" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
