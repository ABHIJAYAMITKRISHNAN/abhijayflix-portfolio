"use client";

import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "./Icons";

interface RowProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

/** A Netflix-style horizontally scrolling row with paging arrows on desktop. */
export function Row({ id, title, subtitle, children }: RowProps) {
  const track = useRef<HTMLDivElement>(null);

  const page = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section id={id} className="group/row relative py-4 md:py-6" aria-label={title}>
      <div className="mb-3 px-4 md:px-12">
        <h2 className="text-lg font-bold text-neutral-100 md:text-2xl">{title}</h2>
        {subtitle && <p className="mt-0.5 text-xs text-flix-muted md:text-sm">{subtitle}</p>}
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={() => page(-1)}
          aria-label={`Scroll ${title} left`}
          className="absolute inset-y-0 left-0 z-20 hidden w-12 place-items-center bg-black/50 opacity-0 transition group-hover/row:opacity-100 hover:bg-black/70 md:grid"
        >
          <ChevronLeft width={32} height={32} />
        </button>
        <div ref={track} className="no-scrollbar flex snap-x gap-2 overflow-x-auto scroll-smooth px-4 py-6 md:gap-3 md:px-12">
          {children}
        </div>
        <button
          type="button"
          onClick={() => page(1)}
          aria-label={`Scroll ${title} right`}
          className="absolute inset-y-0 right-0 z-20 hidden w-12 place-items-center bg-black/50 opacity-0 transition group-hover/row:opacity-100 hover:bg-black/70 md:grid"
        >
          <ChevronRight width={32} height={32} />
        </button>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      {eyebrow && <p className="mb-1 text-xs font-semibold uppercase tracking-[0.3em] text-flix-red">{eyebrow}</p>}
      <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-flix-muted">{subtitle}</p>}
    </div>
  );
}

export function Tag({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "red" }) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-[11px] font-medium ${
        tone === "red" ? "bg-flix-red/15 text-red-300 ring-1 ring-flix-red/40" : "bg-white/8 text-neutral-300 ring-1 ring-white/10"
      }`}
    >
      {children}
    </span>
  );
}

/** "Genre · Genre · Genre" dotted list, Netflix detail style. */
export function DotList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2 text-sm text-neutral-200 ${className}`}>
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-2">
          {i > 0 && <span className="h-1 w-1 rounded-full bg-neutral-500" aria-hidden />}
          {item}
        </span>
      ))}
    </p>
  );
}
