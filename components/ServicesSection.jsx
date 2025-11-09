'use client';

import { motion } from 'framer-motion';
import {
  Code2,
  Globe,
  ShoppingCart,
  Rocket,
  Shield,
  Wrench,
} from 'lucide-react';

const SERVICES = [
  {
    icon: Code2,
    title: 'Full-stack Web Apps',
    desc: 'Next.js + Node.js apps with APIs & databases.',
  },
  {
    icon: Globe,
    title: 'Business Websites',
    desc: 'Fast, SEO-friendly, responsive marketing sites.',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    desc: 'Product catalogs, carts, payments and orders.',
  },
  {
    icon: Rocket,
    title: 'Performance & SEO',
    desc: 'Core Web Vitals, lighthouse & on-page SEO.',
  },
  {
    icon: Shield,
    title: 'Security & Best-practices',
    desc: 'Auth, input safety, secure headers.',
  },
  {
    icon: Wrench,
    title: 'Maintenance',
    desc: 'Bugs, enhancements, new features on demand.',
  },
];

// simple variants
const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.10 },
  },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function ServicesSection() {
  return (
    <motion.section
      className="mt-16"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Heading */}
      <div>
        <motion.h2 variants={item} className="text-2xl md:text-3xl font-bold">
          Services I deliver
        </motion.h2>
        <motion.p variants={item} className="muted mt-1">
          From idea to deployment — fast, scalable and beautiful.
        </motion.p>
      </div>

      {/* Cards */}
      <motion.div
        variants={container}
        className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.article
              key={s.title}
              variants={item}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="card p-5 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-white"
                  style={{
                    background:
                      'linear-gradient(90deg, var(--brand-hex), var(--brand2-hex))',
                  }}
                >
                  <Icon size={16} />
                </span>
                <div className="font-semibold">{s.title}</div>
              </div>
              <p className="muted mt-2">{s.desc}</p>
            </motion.article>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
