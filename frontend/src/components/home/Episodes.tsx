"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Experience } from "@/lib/types";
import { PosterArt } from "@/components/ui/Poster";
import { ChevronDown } from "@/components/ui/Icons";
import { Tag } from "@/components/ui/Row";

/** Internships presented as an episode list, like a series detail page. */
export function Episodes({ experiences }: { experiences: Experience[] }) {
  const [open, setOpen] = useState<string | null>(experiences[0]?.slug ?? null);

  return (
    <section id="experience" className="px-4 py-8 md:px-12" aria-labelledby="exp-title">
      <div className="flex items-end justify-between border-b border-white/10 pb-3">
        <div>
          <h2 id="exp-title" className="text-lg font-bold md:text-2xl">Behind the Scenes: Professional Experience</h2>
          <p className="mt-0.5 text-xs text-flix-muted md:text-sm">Season 1 · {experiences.length} Episodes</p>
        </div>
      </div>

      <ol className="mt-2 divide-y divide-white/10">
        {experiences.map((x, i) => {
          const expanded = open === x.slug;
          return (
            <li key={x.slug}>
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : x.slug)}
                aria-expanded={expanded}
                className={`flex w-full items-center gap-4 rounded-md px-2 py-5 text-left transition md:gap-6 md:px-4 ${expanded ? "bg-flix-card" : "hover:bg-white/5"}`}
              >
                <span className="w-6 shrink-0 text-center text-2xl text-neutral-400">{i + 1}</span>
                <div className="relative hidden aspect-video w-36 shrink-0 overflow-hidden rounded sm:block">
                  <PosterArt variant="network" accent={i % 2 ? "#8B5CF6" : "#E50914"} />
                  <span className="absolute inset-0 grid place-items-center font-display text-2xl tracking-wide">
                    {x.company.split(" ")[0]}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold md:text-lg">{x.company}</h3>
                    <span className="text-sm text-neutral-300">{x.duration}</span>
                  </div>
                  <p className="text-sm text-flix-red">{x.role}</p>
                  <p className="mt-1 text-sm text-flix-muted">{x.summary}</p>
                </div>
                <ChevronDown className={`shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-6 px-2 pb-6 pt-4 md:grid-cols-[2fr_1fr] md:px-14">
                      <div>
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">In this episode</h4>
                        <ul className="space-y-2 text-sm text-neutral-200">
                          {x.responsibilities.map((r) => (
                            <li key={r} className="flex gap-2">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-flix-red" aria-hidden />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        {x.highlights.length > 0 && (
                          <div>
                            <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">Featured builds</h4>
                            <ul className="space-y-1.5">
                              {x.highlights.map((h) => (
                                <li key={h} className="rounded bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10">{h}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div>
                          <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">Cast (tech stack)</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {x.techStack.map((t) => <Tag key={t}>{t}</Tag>)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
