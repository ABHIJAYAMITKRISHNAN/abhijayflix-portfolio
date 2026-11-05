// Regenerates src/data/portfolio.json (the content shown when no backend is configured)
// from a running Spring Boot API. Usage: npm run snapshot  (or BACKEND_URL=https://... npm run snapshot)
import { writeFile } from "node:fs/promises";

const base = (process.env.BACKEND_URL ?? "http://localhost:8080").replace(/\/$/, "");
const get = async (path) => {
  const res = await fetch(base + path);
  if (!res.ok) throw new Error(`${path} responded ${res.status}`);
  return res.json();
};

const portfolio = await get("/api/portfolio");
const projects = Object.fromEntries(
  await Promise.all(portfolio.projects.map(async (p) => [p.slug, await get(`/api/projects/${p.slug}`)])),
);
const out = new URL("../src/data/portfolio.json", import.meta.url);
await writeFile(out, JSON.stringify({ portfolio, projects }, null, 2) + "\n");
console.log(`Wrote ${portfolio.projects.length} projects from ${base} to src/data/portfolio.json`);
