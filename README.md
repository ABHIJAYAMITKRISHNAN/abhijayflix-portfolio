# ABHIJAYFLIX

A Netflix-inspired developer portfolio for **Abhijay Krishnan**.

| Layer    | Stack |
|----------|-------|
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion |
| Backend  | Java 17, Spring Boot 3.5, Spring Data JPA, Spring Security, REST |
| Database | MySQL 8.4 with Flyway migrations |
| Runtime  | Docker + Docker Compose |

All content (profile, projects, internships, skills, education, certifications) lives in MySQL,
seeded by the Flyway migrations in `backend/src/main/resources/db/migration/`, and is served through REST.

The frontend also bundles a **static snapshot** of that content (`frontend/src/data/portfolio.json`), so it
works on its own: with no `BACKEND_URL` it serves the snapshot, and if the API is unreachable it falls back
to it. The contact form then opens the visitor's email app (`mailto:`) instead of posting to the API.

```
browser ──► Next.js (3000) ──► Spring Boot API (8080) ──► MySQL (3306)
              │  server components fetch /api/portfolio, /api/projects/{slug}
              └─ /api/contact route proxies the contact form to the API
```

## Run everything with Docker

```bash
cp .env.example .env        # optional: change passwords / enable admin
docker compose up -d --build
open http://localhost:3000
```

## Run locally for development

```bash
docker compose up -d mysql                 # just the database
cd backend && mvn spring-boot:run          # http://localhost:8080
cd frontend && npm install && npm run dev  # http://localhost:3000
```

Backend tests (H2 in MySQL mode, run the real Flyway migrations): `cd backend && mvn test`

## API

| Method | Path | Notes |
|--------|------|-------|
| GET | `/api/portfolio` | Everything the home page needs |
| GET | `/api/profile`, `/api/projects`, `/api/projects/{slug}`, `/api/experiences`, `/api/skills`, `/api/education`, `/api/certifications` | Individual resources |
| POST | `/api/contact` | `{name, email, message}`, validated, stored in `contact_message` |
| PATCH | `/api/admin/profile/links` | HTTP Basic. `{email, linkedinUrl, githubUrl, resumeUrl, imageUrl}` |
| PATCH | `/api/admin/projects/{slug}/links` | HTTP Basic. `{githubUrl, demoUrl}` |
| GET | `/api/admin/messages` | HTTP Basic. Contact form submissions |

Admin endpoints are **disabled** unless `ADMIN_PASSWORD` is set.

## Filling in your links later

Email, phone, LinkedIn and GitHub are set by `V3__contact_details.sql`. Resume, photo and every
project's GitHub/demo link are still **empty**; the UI shows them as disabled "Coming soon" buttons.

**Option A: admin API** (set `ADMIN_PASSWORD` in `.env`, then `docker compose up -d`):

```bash
curl -u admin:$ADMIN_PASSWORD -X PATCH localhost:8080/api/admin/profile/links \
  -H 'Content-Type: application/json' \
  -d '{"email":"you@example.com","linkedinUrl":"https://...","githubUrl":"https://...","resumeUrl":"/resume.pdf","imageUrl":"/me.jpg"}'

curl -u admin:$ADMIN_PASSWORD -X PATCH localhost:8080/api/admin/projects/quickparcel/links \
  -H 'Content-Type: application/json' -d '{"githubUrl":"https://...","demoUrl":"https://..."}'
```

Send `""` to clear a value; omitted fields are left unchanged.

**Option B: migration** (permanent, versioned). Add `V3__my_links.sql`:

```sql
UPDATE profile SET email = 'you@example.com', github_url = 'https://...';
UPDATE project SET github_url = 'https://...' WHERE slug = 'payment-aiops-platform';
```

**Resume and photo:** put `resume.pdf` / `me.jpg` in `frontend/public/` and set the URLs to `/resume.pdf` / `/me.jpg`
(e.g. a `V4__resume.sql` with `UPDATE profile SET resume_url = '/resume.pdf';`).

## Deploying the frontend (Vercel)

Vercel hosts only the Next.js app. The Spring Boot API and MySQL must be hosted separately, and the
frontend reaches them through one **server-only** env var (never sent to the browser):

| Vercel setting | Value |
|---|---|
| Root Directory | `frontend` |
| Framework Preset | Next.js |
| `BACKEND_URL` | Public base URL of the API, **without** `/api`, e.g. `https://api.example.com` |

`BACKEND_URL` is optional. Without it the site runs entirely from the static snapshot. Vercel reads it at
build time, so redeploy after changing it.

On the backend, set `CORS_ALLOWED_ORIGINS` to the Vercel domain (only needed for direct browser calls;
the site itself calls the API server-side).

Project slugs: `payment-aiops-platform`, `quickparcel`, `fake-review-detection`, `currency-authentication`.

## Content accuracy

The seed data follows the supplied content exactly:

- The payment platform is described as **human-approved** recovery, never autonomous. The flow diagram marks the approval step.
- QuickParcel's Firebase version and its Spring Boot + MySQL + Docker/EC2 deployment are shown as **two separate implementations**.
- Fake Review Detection metrics are labelled as **reported**, with a viewer advisory that not every listed technology is in one production pipeline.
- No proficiency percentages, no invented dates, links or results.

To change any text, edit the seed migration before the first deploy, or add a new `V3__...sql` migration afterwards.

## Static content snapshot

After changing content in the database (a new migration, or the admin API), refresh the bundled copy
from a running API and commit it:

```bash
cd frontend && npm run snapshot      # reads http://localhost:8080, or BACKEND_URL if set
```
