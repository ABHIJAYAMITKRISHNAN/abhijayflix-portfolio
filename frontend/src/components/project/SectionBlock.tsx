import type { ProjectSection } from "@/lib/types";
import { FlowDiagram } from "./FlowDiagram";

export function SectionBlock({ section, accent, index }: { section: ProjectSection; accent: string; index: number }) {
  return (
    <section className="border-t border-white/10 py-7">
      <div className="mb-3 flex items-baseline gap-3">
        <span className="font-display text-2xl text-neutral-600">{String(index + 1).padStart(2, "0")}</span>
        <h2 className="text-xl font-semibold md:text-2xl">{section.heading}</h2>
      </div>
      {section.body && <p className="max-w-3xl leading-relaxed text-neutral-300">{section.body}</p>}

      {section.kind === "LIST" && section.items.length > 0 && (
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {section.items.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-md bg-white/[0.04] px-4 py-3 text-sm ring-1 ring-white/5">
              <span className="mt-1.5 h-2 w-2 shrink-0 rotate-45" style={{ background: accent }} aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      )}

      {section.kind === "FLOW" && section.items.length > 0 && (
        <div className="mt-4 rounded-md bg-black/40 p-4 ring-1 ring-white/10">
          <FlowDiagram steps={section.items} accent={accent} />
        </div>
      )}
    </section>
  );
}
