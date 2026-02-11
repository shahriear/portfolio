"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function HeroSection({
  roles = [
    'Full-Stack Developer',
    'Role-Based Access Control (RBAC)',
    'Responsive Web Design',
  ],
  title = (
    <>
      I build modern,{' '}
      <span className="text-gradient-headline">high-quality, scalable web</span>{' '}
      applications.
    </>
  ),
  subtitle = (
    <>
      {/* Full-stack builds in React, Next.js &amp; Node.js plus branding, digital
      marketing, and short-form motion editing. I also run a made-to-order
      garments unit. */}
      “Full-stack engineer building scalable applications with React, Next.js,
      Node.js, Express, MongoDB, Tailwind CSS, Redux Toolkit, REST APIs, secure
      JWT authentication, and cloud deployments on Vercel.”
    </>
  ),
  imageSrc = '/images/shuvo.jpg',
  imageAlt = 'shuvo',
}) {
  return (
    <section className="mt-24 grid items-center gap-10 md:grid-cols-2">
      {/* Left */}
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.p variants={itemUp} className="muted mb-2">
          Available for projects &amp; collaborations
        </motion.p>

        <motion.h1
          variants={itemUp}
          // className="text-4xl font-extrabold leading-tight md:text-6xl"
          className=" text-4xl font-black"
        >
          {title}
        </motion.h1>

        <motion.p variants={itemUp} className="muted mt-4 max-w-2xl">
          {subtitle}
        </motion.p>

        <motion.div variants={itemUp} className="mt-6 flex flex-wrap gap-3">
          <Link className="btn" href="/contact">
            Book a call →
          </Link>
          <Link className="btn-ghost" href="/solutions">
            Explore solutions
          </Link>
        </motion.div>

        <motion.div variants={itemUp} className="mt-6 flex flex-wrap gap-2">
          {roles.map(r => (
            <span key={r} className="badge">
              {r}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Right image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative"
      >
        <div className="card h-0 m-auto overflow-hidden p-0 md:h-[22rem] md:ml-24 w-fit">
          <Image
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-contain"
            width={1200}
            height={800}
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
