import "server-only";
import { connection } from "next/server";
import type { Portfolio, ProjectDetail } from "./types";

export class BackendUnavailableError extends Error {}

/**
 * Base URL of the Spring Boot API (without the trailing /api), read at request time on the server only,
 * so it never ships to the browser. Docker Compose sets http://backend:8080; on Vercel set BACKEND_URL
 * to the public URL of the hosted backend. The localhost default applies only to `next dev`.
 */
export function backendUrl(): string {
  const url = process.env.BACKEND_URL?.trim();
  if (url) return url.replace(/\/$/, "");
  if (process.env.NODE_ENV === "development") return "http://localhost:8080";
  throw new BackendUnavailableError("BACKEND_URL is not configured");
}

async function getJson<T>(path: string): Promise<T | null> {
  await connection(); // content and BACKEND_URL are read per request, never baked in at build time
  const base = backendUrl();
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

export async function getPortfolio(): Promise<Portfolio> {
  const data = await getJson<Portfolio>("/api/portfolio");
  if (!data) throw new BackendUnavailableError("Portfolio not found");
  return data;
}

export function getProject(slug: string): Promise<ProjectDetail | null> {
  return getJson<ProjectDetail>(`/api/projects/${encodeURIComponent(slug)}`);
}
