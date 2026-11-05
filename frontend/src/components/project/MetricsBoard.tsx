import type { ProjectMetric } from "@/lib/types";

export function MetricsBoard({ metrics, accent }: { metrics: ProjectMetric[]; accent: string }) {
  return (
    <section className="border-t border-white/10 py-7" aria-labelledby="results-title">
      <h2 id="results-title" className="text-xl font-semibold md:text-2xl">Reported Results</h2>
      <p className="mt-1 text-sm text-flix-muted">Figures as reported for this project.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-md bg-flix-panel p-4 ring-1 ring-white/10">
            <p className="font-display text-5xl tracking-wide" style={{ color: accent }}>{m.value}</p>
            <p className="mt-1 text-sm font-medium">{m.label}</p>
            {m.note && <p className="mt-1 text-xs text-flix-muted">{m.note}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
