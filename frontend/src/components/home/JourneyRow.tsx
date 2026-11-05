import Link from "next/link";
import type { Portfolio } from "@/lib/types";
import { Row } from "@/components/ui/Row";
import { PosterArt } from "@/components/ui/Poster";
import { PlayIcon } from "@/components/ui/Icons";

interface JourneyItem {
  key: string;
  kicker: string;
  title: string;
  meta: string;
  href: string;
  variant: "network" | "map" | "text" | "currency";
  accent: string;
}

/** "Continue Watching": every chapter of the journey, built from the API data. */
export function JourneyRow({ data }: { data: Portfolio }) {
  const items: JourneyItem[] = [
    ...data.education.map((e, i) => ({
      key: `edu-${i}`,
      kicker: "Academic",
      title: `${e.degree}, ${e.branch}`,
      meta: `${e.institution} · Expected ${e.expectedGraduation}`,
      href: "#education",
      variant: "network" as const,
      accent: "#3B82F6",
    })),
    ...data.experiences.map((x) => ({
      key: `exp-${x.slug}`,
      kicker: "Internship",
      title: x.company,
      meta: `${x.role} · ${x.duration}`,
      href: "#experience",
      variant: "network" as const,
      accent: "#E50914",
    })),
    ...data.projects.map((p) => ({
      key: `proj-${p.slug}`,
      kicker: "Project",
      title: p.shortTitle,
      meta: `${p.categories[0]}${p.year ? ` · ${p.year}` : ""}`,
      href: `/projects/${p.slug}`,
      variant: p.posterVariant,
      accent: p.accentColor,
    })),
  ];

  return (
    <Row title="Continue Watching: Developer Journey" subtitle="Pick up any chapter of the story">
      {items.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          className="group/j relative w-64 shrink-0 snap-start overflow-hidden rounded-md bg-flix-panel ring-1 ring-white/5 transition hover:scale-105 hover:ring-white/30 md:w-80"
        >
          <div className="relative aspect-video">
            <PosterArt variant={item.variant} accent={item.accent} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
            <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white/80 bg-black/50 opacity-0 transition group-hover/j:opacity-100">
              <PlayIcon width={20} height={20} />
            </span>
            <div className="absolute bottom-2 left-3 right-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em]" style={{ color: item.accent }}>{item.kicker}</p>
              <p className="truncate text-base font-semibold">{item.title}</p>
            </div>
          </div>
          {/* Decorative scrubber bar, not a progress metric */}
          <div className="h-[3px] w-full bg-neutral-700" aria-hidden>
            <div className="h-full w-1/3 bg-flix-red transition-all duration-500 group-hover/j:w-full" />
          </div>
          <p className="truncate px-3 py-2 text-xs text-flix-muted">{item.meta}</p>
        </Link>
      ))}
    </Row>
  );
}
