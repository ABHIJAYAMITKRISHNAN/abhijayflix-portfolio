import { backendUrl } from "@/lib/api";

/** Tells the browser to fall back to a mailto: link (no backend configured, or it is unreachable). */
const emailFallback = (detail: string) => Response.json({ detail, fallback: "mailto" }, { status: 503 });

/** Proxies the contact form to the Spring Boot API so the browser never needs the backend's address. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ detail: "Invalid JSON" }, { status: 400 });
  }

  const base = backendUrl();
  if (!base) return emailFallback("Contact API not configured");

  try {
    const res = await fetch(`${base}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.status >= 500) return emailFallback("Contact API error");
    const payload = await res.json().catch(() => ({}));
    return Response.json(payload, { status: res.status });
  } catch {
    return emailFallback("Contact API unavailable");
  }
}
