import type { Profile } from "@/lib/types";
import { GithubIcon, LinkedinIcon, MailIcon, PhoneIcon } from "./Icons";

const iconClass = "grid h-9 w-9 place-items-center rounded-full bg-white/5 text-neutral-300 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white";

export function Footer({ profile }: { profile: Profile }) {
  const links = [
    profile.githubUrl && { href: profile.githubUrl, label: "GitHub", icon: <GithubIcon />, external: true },
    profile.linkedinUrl && { href: profile.linkedinUrl, label: "LinkedIn", icon: <LinkedinIcon />, external: true },
    profile.email && { href: `mailto:${profile.email}`, label: `Email ${profile.email}`, icon: <MailIcon />, external: false },
    profile.phone && { href: `tel:${profile.phone.replace(/[^\d+]/g, "")}`, label: `Call ${profile.phone}`, icon: <PhoneIcon />, external: false },
  ].filter((l) => !!l);

  return (
    <footer className="mt-16 border-t border-white/5 px-4 py-10 text-sm text-neutral-500 md:px-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p>
          <span className="font-display text-xl tracking-wide text-flix-red">{profile.brandName}</span>
          <span className="ml-3">The portfolio of {profile.fullName}</span>
        </p>
        {links.length > 0 && (
          <ul className="flex gap-3" aria-label="Social links">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  aria-label={l.label}
                  title={l.label}
                  className={iconClass}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {l.icon}
                </a>
              </li>
            ))}
          </ul>
        )}
        <p className="text-xs">Built with Next.js, Spring Boot and MySQL. Content is served from a REST API.</p>
      </div>
    </footer>
  );
}
