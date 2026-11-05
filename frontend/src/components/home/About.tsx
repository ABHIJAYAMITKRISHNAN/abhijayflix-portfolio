import type { Profile } from "@/lib/types";
import { DotList } from "@/components/ui/Row";

export function About({ profile }: { profile: Profile }) {
  const roles = profile.title.split("|").map((r) => r.trim());
  const initials = profile.fullName.split(" ").map((n) => n[0]).join("");

  return (
    <section id="about" className="px-4 py-10 md:px-12" aria-labelledby="about-title">
      <div className="grid gap-8 rounded-lg bg-flix-panel p-6 ring-1 ring-white/5 md:grid-cols-[260px_1fr] md:p-10">
        <div className="relative mx-auto aspect-[3/4] w-48 overflow-hidden rounded-md bg-gradient-to-br from-flix-red to-[#3a0003] md:w-full">
          {profile.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.imageUrl} alt={profile.fullName} className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full place-items-center">
              <span className="font-display text-8xl tracking-wide text-white/90">{initials}</span>
              <span className="absolute bottom-3 text-[10px] uppercase tracking-widest text-white/60">Photo coming soon</span>
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-flix-red">About Me</p>
          <h2 id="about-title" className="mt-1 font-display text-4xl tracking-wide md:text-5xl">{profile.aboutTitle}</h2>
          <DotList items={roles} className="mt-3 text-neutral-300" />
          <div className="mt-5 space-y-4 leading-relaxed text-neutral-200">
            {profile.aboutText.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className="mt-6 space-y-2 border-t border-white/10 pt-5 text-sm text-neutral-300">
            {profile.introduction.slice(1).map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
}
