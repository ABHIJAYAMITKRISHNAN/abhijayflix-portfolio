import type { Certification } from "@/lib/types";
import { Row } from "@/components/ui/Row";

const KIND_STYLE: Record<string, { label: string; color: string }> = {
  PROGRAM: { label: "Program", color: "#3B82F6" },
  CERTIFICATE: { label: "Certificate", color: "#10B981" },
  HACKATHON: { label: "Hackathon", color: "#F5A524" },
};

export function Certifications({ items }: { items: Certification[] }) {
  return (
    <Row id="certifications" title="Certifications & Achievements" subtitle="Awards season">
      {items.map((c) => {
        const style = KIND_STYLE[c.kind] ?? { label: c.kind, color: "#a3a3a3" };
        return (
          <article
            key={c.title}
            className="relative flex aspect-video w-64 shrink-0 snap-start flex-col justify-between overflow-hidden rounded-md bg-flix-panel p-4 ring-1 ring-white/10 transition hover:scale-105 hover:ring-white/30 md:w-80"
            style={{ backgroundImage: `radial-gradient(circle at 100% 0%, ${style.color}40, transparent 60%)` }}
          >
            <span className="w-fit rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-black" style={{ background: style.color }}>
              {style.label}
            </span>
            <h3 className="text-base font-semibold leading-snug md:text-lg">{c.title}</h3>
            <svg className="absolute -bottom-4 -right-4 h-24 w-24 opacity-10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2l2.9 6.26L22 9.27l-5 5.14L18.18 22 12 18.56 5.82 22 7 14.41 2 9.27l7.1-1.01z" />
            </svg>
          </article>
        );
      })}
    </Row>
  );
}
