import type { PosterVariant } from "@/lib/types";

interface PosterArtProps {
  variant: PosterVariant;
  accent: string;
  className?: string;
}

/** Deterministic, code-generated "key art" for each project: no stock images needed. */
export function PosterArt({ variant, accent, className = "" }: PosterArtProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 80% at 70% 15%, ${accent}66 0%, transparent 55%),
                     radial-gradient(90% 70% at 10% 100%, ${accent}33 0%, transparent 60%),
                     linear-gradient(160deg, #1c1c1c 0%, #0a0a0a 100%)`,
      }}
    >
      <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
        {variant === "network" && <NetworkMotif accent={accent} />}
        {variant === "map" && <MapMotif accent={accent} />}
        {variant === "text" && <TextMotif accent={accent} />}
        {variant === "currency" && <CurrencyMotif accent={accent} />}
      </svg>
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_2px,rgb(0_0_0/0.18)_2px_3px)] mix-blend-multiply" />
    </div>
  );
}

const NODES: [number, number][] = [
  [100, 70], [40, 120], [160, 115], [70, 190], [135, 185], [100, 250], [25, 230], [180, 235],
];
const EDGES: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [3, 5], [4, 5], [1, 6], [2, 7], [5, 6], [5, 7], [0, 4],
];

function NetworkMotif({ accent }: { accent: string }) {
  return (
    <g>
      {EDGES.map(([a, b], i) => (
        <line key={i} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]}
              stroke={accent} strokeOpacity={0.45} strokeWidth={1} />
      ))}
      {NODES.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i === 0 ? 14 : 8} fill="#0b0b0b" stroke={accent} strokeWidth={1.5} />
          <circle cx={x} cy={y} r={i === 0 ? 5 : 3} fill={accent} />
        </g>
      ))}
      <path d="M10 40 L40 40 L48 25 L56 55 L64 40 L190 40" fill="none" stroke="#fff" strokeOpacity={0.25} strokeWidth={1.2} />
    </g>
  );
}

function MapMotif({ accent }: { accent: string }) {
  return (
    <g>
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 36} x2={200} y2={i * 36 + 18} stroke="#fff" strokeOpacity={0.07} />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <line key={`v${i}`} x1={i * 34} y1={0} x2={i * 34 - 20} y2={300} stroke="#fff" strokeOpacity={0.07} />
      ))}
      <path d="M35 240 C 60 180, 20 150, 80 130 S 150 110, 140 70 S 165 40, 170 35"
            fill="none" stroke={accent} strokeWidth={3} strokeDasharray="7 5" strokeLinecap="round" />
      <Pin x={35} y={240} color="#fff" />
      <Pin x={170} y={35} color={accent} />
    </g>
  );
}

function Pin({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={14} fill={color} fillOpacity={0.15} />
      <path d="M0 6 C -7 -2, -7 -12, 0 -12 C 7 -12, 7 -2, 0 6 Z" fill={color} />
      <circle cy={-6} r={2.4} fill="#0a0a0a" />
    </g>
  );
}

function TextMotif({ accent }: { accent: string }) {
  const rows = [70, 52, 84, 40, 76, 60, 88, 46, 66, 80];
  return (
    <g>
      {rows.map((w, i) => (
        <rect key={i} x={20} y={40 + i * 20} width={w * 1.7} height={7} rx={3.5}
              fill={i % 3 === 1 ? accent : "#fff"} fillOpacity={i % 3 === 1 ? 0.8 : 0.12} />
      ))}
      <g transform="translate(145 105)">
        <circle r={30} fill="none" stroke={accent} strokeWidth={3} />
        <line x1={21} y1={21} x2={42} y2={42} stroke={accent} strokeWidth={5} strokeLinecap="round" />
        <text textAnchor="middle" dy={8} fontSize={22} fontWeight={700} fill="#fff">AI?</text>
      </g>
    </g>
  );
}

function CurrencyMotif({ accent }: { accent: string }) {
  return (
    <g>
      <g transform="translate(100 150)">
        {Array.from({ length: 24 }, (_, i) => (
          <ellipse key={i} rx={78} ry={22} fill="none" stroke={accent} strokeOpacity={0.35}
                   transform={`rotate(${i * 7.5})`} />
        ))}
        <circle r={30} fill="#0a0a0a" stroke={accent} strokeWidth={2} />
        <path d="M-12 0 L-3 10 L14 -10" fill="none" stroke={accent} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <rect x={14} y={30} width={172} height={240} rx={8} fill="none" stroke="#fff" strokeOpacity={0.15} strokeDasharray="2 4" />
    </g>
  );
}

/** Small red brand badge shown in the corner of posters, like a studio mark. */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display leading-none text-flix-red drop-shadow ${className}`} aria-hidden>
      A
    </span>
  );
}
