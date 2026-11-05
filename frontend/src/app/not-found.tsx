import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6 text-center">
      <div>
        <p className="font-display text-6xl tracking-wide text-flix-red">ABHIJAYFLIX</p>
        <h1 className="mt-6 text-3xl font-semibold">Lost your way?</h1>
        <p className="mt-2 text-flix-muted">Sorry, we can&apos;t find that title. You&apos;ll find lots to explore on the home page.</p>
        <Link href="/" className="mt-6 inline-block rounded bg-white px-6 py-2.5 font-bold text-black hover:bg-white/75">
          Home
        </Link>
      </div>
    </main>
  );
}
