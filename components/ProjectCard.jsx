"use client";
import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  return (
    <motion.article
      className="card p-4 rounded-2xl border border-black/10 dark:border-white/10 shadow-sm"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
    >
      <div
        className="h-40 rounded-xl border border-black/10 dark:border-white/10 bg-cover bg-center"
        style={{ backgroundImage: `url(${project?.image})` }}
      />

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold truncate">{project?.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-3">
            {project?.description}
          </p>
          {project?.category && (
            <div className="mt-2 text-xs opacity-70">
              Category: {project.category}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {project?.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="GitHub repo"
            >
              <Github size={18} />
            </a>
          )}
          {project?.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Live preview"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      {!!project?.tags?.length && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((t, i) => (
            <li
              key={i}
              className="rounded-full border border-black/10 dark:border-white/10 px-2.5 py-1 text-xs"
            >
              {t}
            </li>
          ))}
        </ul>
      )}
    </motion.article>
  );
}
