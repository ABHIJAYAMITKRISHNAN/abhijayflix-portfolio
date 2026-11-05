import type { Education } from "@/lib/types";
import { PosterArt } from "@/components/ui/Poster";

export function Academic({ education }: { education: Education[] }) {
  return (
    <section id="education" className="px-4 py-8 md:px-12" aria-labelledby="edu-title">
      <h2 id="edu-title" className="mb-4 text-lg font-bold md:text-2xl">Academic Journey</h2>
      <div className="grid gap-4">
        {education.map((e) => (
          <article key={e.degree + e.institution} className="relative overflow-hidden rounded-md ring-1 ring-white/10">
            <PosterArt variant="network" accent="#3B82F6" className="opacity-60" />
            <div className="vignette-left absolute inset-0" />
            <div className="relative flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between md:p-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">Now Streaming · In Progress</p>
                <h3 className="mt-2 font-display text-4xl tracking-wide md:text-6xl">{e.degree}</h3>
                <p className="text-lg text-neutral-200 md:text-xl">{e.branch}</p>
                <p className="mt-2 text-sm text-neutral-300">{e.institution}</p>
              </div>
              <div className="shrink-0 rounded border border-white/30 bg-black/40 px-5 py-3 text-center backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">Expected graduation</p>
                <p className="font-display text-4xl tracking-wide">{e.expectedGraduation}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
