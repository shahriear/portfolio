"use client";

import { motion } from "framer-motion";
import BundlesSection from "@/components/BundlesSection";

const wrap = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function BundlesBlock({
  id = "bundles",
  sectionTitle = "Solution bundles",
  sectionSubtitle = "Pick what you need and contact directly — modern, clean and effective.",
  contactHref = "/contact",
  className = "",
}) {
  return (
    <motion.section
      id={id}
      variants={wrap}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`mt-12 md:mt-14 ${className}`}
    >
      <BundlesSection
        id={id}
        sectionTitle={sectionTitle}
        sectionSubtitle={sectionSubtitle}
        contactHref={contactHref}
      />
    </motion.section>
  );
}
