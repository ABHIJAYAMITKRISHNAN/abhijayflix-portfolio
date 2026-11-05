"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { SkillCategory } from "@/lib/types";

const GRADIENTS = [
  "from-[#E50914] to-[#4a0005]",
  "from-[#2563EB] to-[#0b1a3d]",
  "from-[#F5A524] to-[#4a2a00]",
  "from-[#10B981] to-[#022c1f]",
  "from-[#06B6D4] to-[#05303a]",
  "from-[#8B5CF6] to-[#1e0b45]",
  "from-[#EC4899] to-[#3d0a24]",
];

/** "Browse by genre" tiles; selecting one reveals that category's skills. */
export function SkillsBrowser({ categories }: { categories: SkillCategory[] }) {
  const [active, setActive] = useState(categories[0]?.slug);
  const current = categories.find((c) => c.slug === active);

  return (
    <section id="skills" className="px-4 py-8 md:px-12" aria-labelledby="skills-title">
      <h2 id="skills-title" className="text-lg font-bold md:text-2xl">Browse by Technical Skills</h2>
      <p className="mt-0.5 text-xs text-flix-muted md:text-sm">Choose a genre</p>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-7" role="tablist">
        {categories.map((c, i) => {
          const selected = c.slug === active;
          return (
            <button
              key={c.slug}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="skills-panel"
              onClick={() => setActive(c.slug)}
              className={`relative flex aspect-[16/10] items-end overflow-hidden rounded-md bg-gradient-to-br p-3 text-left transition ${
                GRADIENTS[i % GRADIENTS.length]
              } ${selected ? "scale-[1.03] ring-2 ring-white" : "opacity-75 hover:opacity-100"}`}
            >
              <span className="absolute -right-2 -top-3 font-display text-7xl text-white/10" aria-hidden>
                {c.skills.length}
              </span>
              <span className="relative text-sm font-bold leading-tight md:text-base">{c.name}</span>
            </button>
          );
        })}
      </div>

      <div id="skills-panel" role="tabpanel" className="mt-5 min-h-24 rounded-md bg-flix-panel p-5 ring-1 ring-white/5">
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <p className="mb-3 text-sm text-flix-muted">
                Now showing: <span className="font-semibold text-white">{current.name}</span>
              </p>
              <ul className="flex flex-wrap gap-2">
                {current.skills.map((s) => (
                  <li key={s} className="rounded-full bg-white/8 px-4 py-1.5 text-sm ring-1 ring-white/15 transition hover:bg-white hover:text-black">
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
