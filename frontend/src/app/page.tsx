import { Suspense } from "react";
import { BackendUnavailableError, getPortfolio } from "@/lib/api";
import type { Portfolio } from "@/lib/types";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Row } from "@/components/ui/Row";
import { BackendOffline } from "@/components/ui/BackendOffline";
import { HomeSkeleton } from "@/components/ui/Skeletons";
import { IntroSplash } from "@/components/home/IntroSplash";
import { Hero } from "@/components/home/Hero";
import { JourneyRow } from "@/components/home/JourneyRow";
import { TrendingProjectCard } from "@/components/home/ProjectCard";
import { SkillsBrowser } from "@/components/home/SkillsBrowser";
import { Episodes } from "@/components/home/Episodes";
import { Academic } from "@/components/home/Academic";
import { Certifications } from "@/components/home/Certifications";
import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";

export default function HomePage() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <Home />
    </Suspense>
  );
}

async function Home() {
  let data: Portfolio;
  try {
    data = await getPortfolio();
  } catch (err) {
    if (err instanceof BackendUnavailableError) return <BackendOffline detail={err.message} />;
    throw err;
  }

  const { profile } = data;
  const initials = profile.fullName.split(" ").map((n) => n[0]).join("");

  return (
    <>
      <IntroSplash brandName={profile.brandName} />
      <Navbar brandName={profile.brandName} initials={initials} />
      <main>
        <Hero
          profile={profile}
          education={data.education[0]}
          projectCount={data.projects.length}
          internshipCount={data.experiences.length}
        />
        <div className="relative z-10 -mt-[14vh] space-y-2">
          <JourneyRow data={data} />
          <Row id="projects" title="Trending Now: Featured Projects" subtitle="Hover for a preview · click for the full story">
            {data.projects.map((p, i) => (
              <TrendingProjectCard key={p.slug} project={p} rank={i + 1} />
            ))}
          </Row>
          <SkillsBrowser categories={data.skills} />
          <Episodes experiences={data.experiences} />
          <Academic education={data.education} />
          <Certifications items={data.certifications} />
          <About profile={profile} />
          <Contact profile={profile} />
        </div>
      </main>
      <Footer profile={profile} />
    </>
  );
}
