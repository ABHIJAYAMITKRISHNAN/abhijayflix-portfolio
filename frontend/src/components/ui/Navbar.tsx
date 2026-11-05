"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown } from "./Icons";

const LINKS = [
  { href: "/#home", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#education", label: "Education" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar({ brandName, initials }: { brandName: string; initials: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-flix-black/95 shadow-lg shadow-black/40 backdrop-blur" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <nav className="flex h-16 items-center gap-6 px-4 md:h-[4.25rem] md:px-12" aria-label="Main">
        <Link href="/#home" className="font-display text-3xl tracking-wide text-flix-red md:text-4xl" aria-label={`${brandName} home`}>
          {brandName}
        </Link>

        <ul className="hidden items-center gap-5 text-sm text-neutral-200 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-neutral-400">{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="relative lg:hidden">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-browse"
            className="flex items-center gap-1 text-sm font-medium"
          >
            Browse <ChevronDown width={16} height={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
          {open && (
            <ul id="mobile-browse" className="absolute left-1/2 top-9 w-56 -translate-x-1/2 border-t-2 border-white bg-black/95 py-2 text-center text-sm">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block py-2.5 text-neutral-300 hover:bg-white/5 hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="ml-auto flex items-center gap-4">
          <Link href="/#contact" className="hidden rounded bg-flix-red px-3 py-1.5 text-sm font-semibold transition hover:bg-flix-red-dark sm:block">
            Hire Me
          </Link>
          <Link
            href="/#about"
            aria-label="About me"
            className="grid h-8 w-8 place-items-center rounded bg-gradient-to-br from-flix-red to-[#7a0006] text-xs font-bold"
          >
            {initials}
          </Link>
        </div>
      </nav>
    </header>
  );
}
