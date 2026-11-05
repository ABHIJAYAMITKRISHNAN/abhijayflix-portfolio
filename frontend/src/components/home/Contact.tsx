"use client";

import { useState, type FormEvent } from "react";
import type { Profile } from "@/lib/types";
import { PendingLink } from "@/components/ui/PendingLink";
import { CheckIcon, FileIcon, GithubIcon, LinkedinIcon, MailIcon, PhoneIcon } from "@/components/ui/Icons";

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };

const linkClass =
  "flex items-center gap-3 rounded-md bg-white/5 px-4 py-3 text-sm ring-1 ring-white/10 transition hover:bg-white/10";

export function Contact({ profile }: { profile: Profile }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const fields = body?.errors ? Object.keys(body.errors).join(", ") : null;
        throw new Error(fields ? `Please check: ${fields}` : "Something went wrong. Please try again.");
      }
      form.reset();
      setStatus({ state: "sent" });
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  const input =
    "w-full rounded bg-[#333] px-4 py-3.5 text-sm text-white placeholder-neutral-400 outline-none ring-1 ring-transparent transition focus:bg-[#454545] focus:ring-white/60";

  return (
    <section id="contact" className="px-4 py-10 md:px-12" aria-labelledby="contact-title">
      <div className="relative overflow-hidden rounded-lg bg-black/70 ring-1 ring-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_100%_0%,rgb(229_9_20/0.25),transparent)]" aria-hidden />
        <div className="relative grid gap-10 p-6 md:grid-cols-2 md:p-12">
          <div>
            <h2 id="contact-title" className="font-display text-5xl tracking-wide md:text-6xl">
              Ready to <span className="text-flix-red">collaborate?</span>
            </h2>
            <p className="mt-3 max-w-md text-neutral-300">
              Internships, full-time roles, or a project idea: send a message and it lands straight in the backend.
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              <PendingLink href={profile.email ? `mailto:${profile.email}` : null} className={linkClass} icon={<MailIcon />}>
                Email
              </PendingLink>
              <PendingLink href={profile.phone ? `tel:${profile.phone.replace(/[^\d+]/g, "")}` : null} className={linkClass} icon={<PhoneIcon />}>
                {profile.phone ?? "Phone"}
              </PendingLink>
              <PendingLink href={profile.linkedinUrl} className={linkClass} icon={<LinkedinIcon />}>
                LinkedIn
              </PendingLink>
              <PendingLink href={profile.githubUrl} className={linkClass} icon={<GithubIcon />}>
                GitHub
              </PendingLink>
              <PendingLink href={profile.resumeUrl} className={linkClass} icon={<FileIcon />} download>
                Resume
              </PendingLink>
            </div>
          </div>

          {status.state === "sent" ? (
            <div className="grid place-items-center rounded-md bg-white/5 p-8 text-center" role="status">
              <div>
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#46d369] text-black"><CheckIcon width={28} height={28} /></span>
                <p className="mt-4 text-xl font-semibold">Message received</p>
                <p className="mt-1 text-sm text-flix-muted">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                <button type="button" onClick={() => setStatus({ state: "idle" })} className="mt-5 text-sm underline underline-offset-4">
                  Send another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-3" noValidate={false}>
              <label className="block">
                <span className="sr-only">Name</span>
                <input name="name" required maxLength={120} placeholder="Name" autoComplete="name" className={input} />
              </label>
              <label className="block">
                <span className="sr-only">Email</span>
                <input name="email" type="email" required maxLength={255} placeholder="Email address" autoComplete="email" className={input} />
              </label>
              <label className="block">
                <span className="sr-only">Message</span>
                <textarea name="message" required maxLength={5000} rows={5} placeholder="Your message" className={`${input} resize-none`} />
              </label>
              {status.state === "error" && <p className="text-sm text-[#e87c03]" role="alert">{status.message}</p>}
              <button
                type="submit"
                disabled={status.state === "sending"}
                className="w-full rounded bg-flix-red py-3.5 font-bold transition hover:bg-flix-red-dark disabled:opacity-60"
              >
                {status.state === "sending" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
