import { Fragment } from "react";
import { ChevronRight } from "@/components/ui/Icons";

/** Renders an ordered pipeline as connected steps. Approval gates are highlighted. */
export function FlowDiagram({ steps, accent }: { steps: string[]; accent: string }) {
  return (
    <ol className="flex flex-wrap items-center gap-y-3">
      {steps.map((step, i) => {
        const gate = /approval/i.test(step);
        return (
          <Fragment key={step + i}>
            <li
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ring-1 ${
                gate ? "bg-amber-400/15 text-amber-200 ring-amber-400/60" : "bg-white/5 ring-white/15"
              }`}
            >
              <span
                className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold text-black"
                style={{ background: gate ? "#fbbf24" : accent }}
              >
                {i + 1}
              </span>
              {step}
              {gate && <span className="text-[10px] font-semibold uppercase tracking-wider">Human-in-the-loop</span>}
            </li>
            {i < steps.length - 1 && (
              <li aria-hidden className="px-1 text-neutral-500">
                <ChevronRight width={18} height={18} />
              </li>
            )}
          </Fragment>
        );
      })}
    </ol>
  );
}
