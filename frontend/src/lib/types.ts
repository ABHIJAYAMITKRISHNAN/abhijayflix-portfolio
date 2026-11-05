export interface Profile {
  fullName: string;
  brandName: string;
  title: string;
  introduction: string[];
  aboutTitle: string;
  aboutText: string[];
  email: string | null;
  phone: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  resumeUrl: string | null;
  imageUrl: string | null;
}

export type PosterVariant = "network" | "map" | "text" | "currency";

export interface ProjectSummary {
  slug: string;
  title: string;
  shortTitle: string;
  year: number | null;
  categories: string[];
  techStack: string[];
  tagline: string;
  posterVariant: PosterVariant;
  accentColor: string;
  position: number;
}

export interface ProjectSection {
  heading: string;
  kind: "TEXT" | "LIST" | "FLOW";
  body: string | null;
  items: string[];
}

export interface ProjectMetric {
  label: string;
  value: string;
  note: string | null;
}

export interface ProjectDetail extends ProjectSummary {
  summary: string;
  notes: string | null;
  githubUrl: string | null;
  demoUrl: string | null;
  sections: ProjectSection[];
  metrics: ProjectMetric[];
}

export interface Experience {
  slug: string;
  company: string;
  role: string;
  duration: string;
  summary: string;
  techStack: string[];
  responsibilities: string[];
  highlights: string[];
}

export interface SkillCategory {
  slug: string;
  name: string;
  skills: string[];
}

export interface Education {
  degree: string;
  branch: string;
  institution: string;
  expectedGraduation: string;
}

export interface Certification {
  title: string;
  kind: "PROGRAM" | "CERTIFICATE" | "HACKATHON" | string;
}

export interface Portfolio {
  profile: Profile;
  projects: ProjectSummary[];
  experiences: Experience[];
  skills: SkillCategory[];
  education: Education[];
  certifications: Certification[];
}
