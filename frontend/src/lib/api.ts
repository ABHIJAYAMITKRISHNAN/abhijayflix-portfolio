import "server-only";
import { connection } from "next/server";
import type { Portfolio, ProjectDetail } from "./types";
import snapshot from "@/data/portfolio.json";

/**
 * Portfolio content comes from one of two sources:
 *
 * 1. The Spring Boot API, when BACKEND_URL is set (Docker Compose sets http://backend:8080; on Vercel set it
 *    to the public URL of the hosted API, without the trailing /api). Read server-side only, never shipped
 *    to the browser. If the API is unreachable, the bundled snapshot is served instead.
 * 2. The bundled snapshot in src/data/portfolio.json, when BACKEND_URL is not set. The site is then fully
 *    static and needs no backend. Regenerate the snapshot from the API after changing the seed data
 *    (see README, "Static content snapshot").
 */
const staticData = snapshot as unknown as { portfolio: Portfolio; projects: Record<string, ProjectDetail> };

export function backendUrl(): string | null {
  const url = process.env.BACKEND_URL?.trim();
  return url ? url.replace(/\/$/, "") : null;
}

class BackendUnavailableError extends Error {}

async function getJson<T>(base: string, path: string): Promise<T | null> {
  let res: Response;
  try {
    res = await fetch(`${base}${path}`, { headers: { Accept: "application/json" } });
  } catch (cause) {
    throw new BackendUnavailableError("Cannot reach the content API", { cause });
  }
  if (res.status === 404) return null;
  if (!res.ok) throw new BackendUnavailableError(`API ${path} responded ${res.status}`);
  return (await res.json()) as T;
}

/** Fetches from the API when configured, falling back to the bundled snapshot if it is unavailable. */
async function fromApiOr<T>(path: string, fallback: () => T): Promise<T> {
  const base = backendUrl();
  if (!base) return fallback();
  await connection(); // live content is read per request, never baked in at build time
  try {
    const data = await getJson<T>(base, path);
    return data ?? fallback();
  } catch (err) {
    if (!(err instanceof BackendUnavailableError)) throw err;
    console.warn(`[abhijayflix] ${err.message}; serving bundled content`);
    return fallback();
  }
}

export function getPortfolio(): Promise<Portfolio> {
  return fromApiOr("/api/portfolio", () => staticData.portfolio);
}

export async function getProject(slug: string): Promise<ProjectDetail | null> {
  const fallback = () => staticData.projects[slug] ?? null;
  const base = backendUrl();
  if (!base) return fallback();
  await connection();
  try {
    // A 404 from the live API is authoritative: the project does not exist.
    return await getJson<ProjectDetail>(base, `/api/projects/${encodeURIComponent(slug)}`);
  } catch (err) {
    if (!(err instanceof BackendUnavailableError)) throw err;
    console.warn(`[abhijayflix] ${err.message}; serving bundled content`);
    return fallback();
  }
}

/** Slugs available without a backend, used to prerender project pages. */
export function staticProjectSlugs(): string[] {
  return Object.keys(staticData.projects);
}
