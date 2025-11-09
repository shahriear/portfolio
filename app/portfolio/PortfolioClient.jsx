"use client";
import { useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import projects from "@/lib/projects";
export default function PortfolioClient() {
  const [filter, setFilter] = useState("all");
  const list = useMemo(
    () =>
      projects.filter((p) => (filter === "all" ? true : p.category === filter)),
    [filter]
  );
  const toLabel = (k) =>
    k === "all" ? "All" : k[0].toUpperCase() + k.slice(1);
  return (
    <div className="container mt-24">
      <h1 className="text-3xl font-bold">Portfolio</h1>
      <p className="muted mt-2">Filter by category: Custom Websites, CMS Websites, Branding</p>
      <div className="mt-4 flex gap-2 flex-wrap">
        {["all", "Custom Websites", "CMS Websites", "Branding"].map((k) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`px-3 py-1 rounded-full border border-black/10 dark:border-white/10 ${filter === k ? "bg-black/5 dark:bg-white/10" : ""}`}
          >
            {toLabel(k)}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {list.map((p, i) => (
          <ProjectCard key={i} project={p} />
        ))}
      </div>
    </div>
  );
}
