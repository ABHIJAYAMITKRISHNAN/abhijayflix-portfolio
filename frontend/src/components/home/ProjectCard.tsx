"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ProjectSummary } from "@/lib/types";
import { BrandMark, PosterArt } from "@/components/ui/Poster";
import { InfoIcon } from "@/components/ui/Icons";

/** Top-10 style poster card: big rank numeral + cinematic poster that expands on hover. */
export function TrendingProjectCard({ project, rank }: { project: ProjectSummary; rank: number }) {
  return (
    <div className="flex shrink-0 snap-start items-end">
      <span
        className="text-outline -mr-5 select-none font-display text-[9rem] leading-[0.75] md:-mr-7 md:text-[13rem]"
        aria-hidden
      >
        {rank}
      </span>
      <ProjectPoster project={project} />
    </div>
  );
}

export function ProjectPoster({ project, size = "md" }: { project: ProjectSummary; size?: "md" | "sm" }) {
  const width = size === "md" ? "w-40 md:w-56" : "w-36 md:w-44";
  return (
    <motion.div
      whileHover={{ scale: 1.08, zIndex: 30 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`group/card relative ${width} aspect-[2/3] shrink-0 overflow-hidden rounded-md shadow-xl shadow-black/60 ring-1 ring-white/5`}
    >
      <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10" aria-label={`More info: ${project.title}`} />
      <PosterArt variant={project.posterVariant} accent={project.accentColor} />

      <div className="absolute left-2 top-2 flex items-center gap-1">
        <BrandMark className="text-2xl" />
        <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-neutral-300">Project</span>
      </div>

      {/* Poster title block */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-3 pt-16 transition-opacity duration-300 group-hover/card:opacity-0">
        <p className="font-display text-3xl leading-none tracking-wide md:text-4xl">{project.shortTitle}</p>
        <p className="mt-1 line-clamp-2 text-[11px] text-neutral-300">{project.title}</p>
        <p className="mt-2 text-[10px] uppercase tracking-widest" style={{ color: project.accentColor }}>
          {project.categories[0]}
          {project.year ? ` · ${project.year}` : ""}
        </p>
      </div>

      {/* Hover preview */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/90 to-black/30 p-3 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
        <p className="font-display text-2xl leading-none tracking-wide">{project.shortTitle}</p>
        <p className="mt-2 line-clamp-4 text-[11px] leading-snug text-neutral-200">{project.tagline}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {project.techStack.slice(0, 5).map((t) => (
            <span key={t} className="rounded-sm bg-white/10 px-1.5 py-0.5 text-[9px] text-neutral-200">{t}</span>
          ))}
          {project.techStack.length > 5 && (
            <span className="px-1 text-[9px] text-neutral-400">+{project.techStack.length - 5}</span>
          )}
        </div>
        <span className="mt-3 flex items-center justify-center gap-1.5 rounded bg-white py-1.5 text-xs font-bold text-black">
          <InfoIcon width={14} height={14} /> More Info
        </span>
      </div>
    </motion.div>
  );
}
