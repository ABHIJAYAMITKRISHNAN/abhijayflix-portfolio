export function BackendOffline({ detail }: { detail?: string }) {
  return (
    <main className="grid min-h-dvh place-items-center px-6 text-center">
      <div className="max-w-md">
        <p className="font-display text-6xl tracking-wide text-flix-red">ABHIJAYFLIX</p>
        <h1 className="mt-6 text-2xl font-semibold">We&apos;re having trouble playing this title right now.</h1>
        <p className="mt-3 text-flix-muted">
          The content API isn&apos;t reachable. Make sure the Spring Boot backend is running, then refresh.
        </p>
        {detail && <p className="mt-4 rounded bg-white/5 px-3 py-2 font-mono text-xs text-neutral-400">{detail}</p>}
      </div>
    </main>
  );
}
