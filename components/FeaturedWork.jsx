'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Animation variants
const fwContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.10 },
  },
};

const fwItem = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

export default function FeaturedWork() {
  const items = [1,4,3];

  return (
    <motion.section
      className="mt-16"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <motion.h2 variants={fwItem} className="text-2xl md:text-3xl font-bold">
            Featured work
          </motion.h2>
          <motion.p variants={fwItem} className="muted mt-1">
            A few highlights — see more in the portfolio.
          </motion.p>
        </div>

        <motion.div variants={fwItem}>
          <Link href="/portfolio" className="nav-link">
            <motion.span whileHover={{ y: -1 }}>See all →</motion.span>
          </Link>
        </motion.div>
      </div>

      {/* Cards */}
      <motion.div className="mt-6 grid md:grid-cols-3 gap-4" variants={fwContainer}>
        {items.map((n) => (
          <Link key={n} href="/portfolio" className="group block">
            <motion.article
              variants={fwItem}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="card overflow-hidden"
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={`/images/project-${n}.png`}
                  alt={`Project ${n}`}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  width={1200}
                  height={800}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={n === 1}
                />
              </div>
              <div className="p-4">
                <div className="font-semibold">Project {n}</div>
                <p className="muted text-sm">React/Next.js • Node.js/Express • Tailwind CSS</p>
              </div>
            </motion.article>
          </Link>
        ))}
      </motion.div>
    </motion.section>
  );
}
