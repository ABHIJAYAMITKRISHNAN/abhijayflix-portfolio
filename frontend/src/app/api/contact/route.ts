import { backendUrl } from "@/lib/api";

/** Proxies the contact form to the Spring Boot API so the browser never needs the backend's address. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ detail: "Invalid JSON" }, { status: 400 });
  }

  try {
    const res = await fetch(`${backendUrl()}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const payload = await res.json().catch(() => ({}));
    return Response.json(payload, { status: res.status });
  } catch {
    return Response.json({ detail: "Backend unavailable" }, { status: 503 });
  }
}
