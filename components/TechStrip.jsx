'use client';

import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

const chip = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

export default function TechStrip({
  chips = [
    'React',
    'Next.js',
    'Javascript',
    'Node.js',
    'Express',
    'MongoDB',
    'PostgreSQL',
    'Redis',
    'Docker',
    'AWS',
    'Tailwind',
    'Framer Motion',
  ],
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="mt-10 card p-4 flex flex-wrap gap-2 justify-center"
    >
      {chips.map((c) => (
        <motion.span
          key={c}
          variants={chip}
          whileHover={{ y: -2, scale: 1.03 }}
          className="badge"
        >
          {c}
        </motion.span>
      ))}
    </motion.div>
  );
}
