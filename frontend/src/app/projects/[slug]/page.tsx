import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPortfolio, getProject, staticProjectSlugs } from "@/lib/api";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { DetailSkeleton } from "@/components/ui/Skeletons";
import { BrandMark, PosterArt } from "@/components/ui/Poster";
import { PendingLink } from "@/components/ui/PendingLink";
import { DotList, Tag } from "@/components/ui/Row";
import { ArrowLeft, ExternalIcon, GithubIcon } from "@/components/ui/Icons";
import { SectionBlock } from "@/components/project/SectionBlock";
import { MetricsBoard } from "@/components/project/MetricsBoard";
import { ProjectPoster } from "@/components/home/ProjectCard";

export function generateStaticParams() {
  return staticProjectSlugs().map((slug) => ({ slug }));
}

export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <ProjectDetail params={params} />
    </Suspense>
  );
}

async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [project, portfolio] = await Promise.all([getProject(slug), getPortfolio()]);
  if (!project) notFound();

  const { profile } = portfolio;
  const initials = profile.fullName.split(" ").map((n) => n[0]).join("");
  const others = portfolio.projects.filter((p) => p.slug !== project.slug);
  const btn = "flex items-center gap-2 rounded px-5 py-2.5 font-bold transition";

  return (
    <>
      <title>{`${project.title} · ${profile.brandName}`}</title>
      <Navbar brandName={profile.brandName} initials={initials} />
      <main>
        {/* Billboard */}
        <section className="relative min-h-[78vh] overflow-hidden">
          <div className="animate-drift absolute inset-0">
            <PosterArt variant={project.posterVariant} accent={project.accentColor} />
          </div>
          <div className="vignette-left absolute inset-0" />
          <div className="vignette-bottom absolute inset-0" />
          <div className="relative z-10 flex min-h-[78vh] max-w-4xl flex-col justify-end px-4 pb-14 pt-28 md:px-12">
            <Link href="/#projects" className="mb-6 flex w-fit items-center gap-2 text-sm text-neutral-300 hover:text-white">
              <ArrowLeft width={18} height={18} /> Back to browse
            </Link>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-300">
              <BrandMark className="text-3xl" /> Project
            </p>
            <h1 className="mt-2 font-display text-6xl leading-[0.9] tracking-wide md:text-8xl">{project.shortTitle}</h1>
            <p className="mt-2 text-lg font-medium text-neutral-200 md:text-2xl">{project.title}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              {project.year && <span className="font-semibold text-[#46d369]">{project.year}</span>}
              <span className="rounded border border-neutral-400/70 px-1.5 text-xs">{project.techStack.length} technologies</span>
              <span className="rounded border border-neutral-400/70 px-1.5 text-xs">{project.sections.length} chapters</span>
            </div>
            <p className="mt-4 max-w-2xl text-neutral-200 md:text-lg">{project.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <PendingLink href={project.githubUrl} className={`${btn} bg-white text-black hover:bg-white/75`} icon={<GithubIcon />}>
                View Code
              </PendingLink>
              <PendingLink href={project.demoUrl} className={`${btn} bg-neutral-500/60 hover:bg-neutral-500/40`} icon={<ExternalIcon />}>
                Live Demo
              </PendingLink>
            </div>
          </div>
        </section>

        {/* Details */}
        <div className="grid gap-10 px-4 md:px-12 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="text-lg leading-relaxed text-neutral-100 md:text-xl">{project.summary}</p>

            {project.notes && (
              <aside className="mt-6 flex gap-3 rounded-md border-l-4 border-amber-400 bg-amber-400/10 p-4 text-sm text-amber-100" aria-label="Viewer advisory">
                <span className="font-display text-lg tracking-wider text-amber-300">Viewer Advisory</span>
                <p className="leading-relaxed">{project.notes}</p>
              </aside>
            )}

            <div className="mt-6">
              {project.sections.map((s, i) => (
                <SectionBlock key={s.heading} section={s} accent={project.accentColor} index={i} />
              ))}
              {project.metrics.length > 0 && <MetricsBoard metrics={project.metrics} accent={project.accentColor} />}
            </div>
          </div>

          <aside className="space-y-6 text-sm lg:sticky lg:top-24 lg:self-start">
            <div>
              <p className="mb-2 text-neutral-500">Genres:</p>
              <DotList items={project.categories} />
            </div>
            <div>
              <p className="mb-2 text-neutral-500">Cast (tech stack):</p>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((t) => <Tag key={t}>{t}</Tag>)}
              </div>
            </div>
            <div>
              <p className="mb-1 text-neutral-500">Created by:</p>
              <p>{profile.fullName}</p>
            </div>
          </aside>
        </div>

        {/* More like this */}
        {others.length > 0 && (
          <section className="mt-12 px-4 md:px-12" aria-labelledby="more-title">
            <h2 id="more-title" className="mb-4 text-xl font-bold md:text-2xl">More Like This</h2>
            <div className="no-scrollbar flex gap-3 overflow-x-auto py-4">
              {others.map((p) => <ProjectPoster key={p.slug} project={p} size="sm" />)}
            </div>
          </section>
        )}
      </main>
      <Footer profile={profile} />
    </>
  );
}
