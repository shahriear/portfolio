"use client";

import { motion } from "framer-motion";
import DomainSearch from "@/components/DomainSearch";

const wrap = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function DomainBlock({
  id = "domain",
  sectionTitle = "Find your domain",
  sectionSubtitle = "Check availability across popular TLDs in seconds.",
  className = "",
}) {
  return (
    <motion.section
      variants={wrap}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`mt-10 md:mt-12 ${className}`}
      id={id}
    >
      <DomainSearch
        id={id}
        sectionTitle={sectionTitle}
        sectionSubtitle={sectionSubtitle}
      />
    </motion.section>
  );
}
