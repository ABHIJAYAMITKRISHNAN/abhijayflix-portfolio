"use client";

import { motion } from "framer-motion";
import type { Education, Profile } from "@/lib/types";
import { PosterArt, BrandMark } from "@/components/ui/Poster";
import { InfoIcon, PlayIcon } from "@/components/ui/Icons";

interface HeroProps {
  profile: Profile;
  education: Education | undefined;
  projectCount: number;
  internshipCount: number;
}

export function Hero({ profile, education, projectCount, internshipCount }: HeroProps) {
  const roles = profile.title.split("|").map((r) => r.trim());
  const [first, ...rest] = profile.fullName.split(" ");

  return (
    <section id="home" className="relative h-[92svh] min-h-[560px] w-full overflow-hidden md:h-[95vh]">
      {/* Backdrop */}
      <div className="animate-drift absolute inset-0">
        <PosterArt variant="network" accent="#E50914" />
      </div>
      {profile.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={profile.imageUrl}
          alt={profile.fullName}
          className="absolute right-0 top-0 h-full w-full object-cover object-top opacity-70 md:w-3/5 [mask-image:linear-gradient(to_left,black_40%,transparent)]"
        />
      )}
      <div className="vignette-left absolute inset-0" />
      <div className="vignette-bottom absolute inset-0" />

      <motion.div
        className="relative z-10 flex h-full max-w-3xl flex-col justify-end px-4 pb-[18vh] md:px-12"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-300">
          <BrandMark className="text-3xl" /> {profile.brandName} Original Series
        </p>

        <h1 className="font-display text-[3.75rem] leading-[0.85] tracking-wide drop-shadow-2xl sm:text-8xl md:text-[8.5rem]">
          {first}
          <br />
          <span className="text-flix-red">{rest.join(" ")}</span>
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-neutral-200">
          {education && (
            <span className="font-semibold text-[#46d369]">Graduating {education.expectedGraduation}</span>
          )}
          <span>{projectCount} Projects</span>
          <span>{internshipCount} Internships</span>
          {education && (
            <span className="rounded border border-neutral-400/70 px-1.5 text-xs">B.Tech · {education.branch}</span>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {roles.map((r) => (
            <span key={r} className="rounded-sm bg-black/40 px-2 py-1 text-xs text-neutral-100 ring-1 ring-white/15 backdrop-blur-sm">
              {r}
            </span>
          ))}
        </div>

        <p className="mt-5 max-w-xl text-sm leading-relaxed text-neutral-200 drop-shadow md:text-lg">
          {profile.introduction[0]}
        </p>

        <div className="mt-6 flex gap-3">
          <a
            href="#projects"
            className="flex items-center gap-2 rounded bg-white px-5 py-2 text-base font-bold text-black transition hover:bg-white/75 md:px-8 md:py-2.5 md:text-lg"
          >
            <PlayIcon width={24} height={24} /> Play Projects
          </a>
          <a
            href="#about"
            className="flex items-center gap-2 rounded bg-neutral-500/60 px-5 py-2 text-base font-bold transition hover:bg-neutral-500/40 md:px-8 md:py-2.5 md:text-lg"
          >
            <InfoIcon width={24} height={24} /> More Info
          </a>
        </div>
      </motion.div>

      {/* Maturity-rating style tag */}
      <div className="absolute bottom-[22vh] right-0 z-10 hidden items-center border-l-[3px] border-neutral-300 bg-neutral-600/40 py-1.5 pl-3 pr-12 text-sm md:flex">
        Java · Spring Boot · AI/ML
      </div>
    </section>
  );
}
