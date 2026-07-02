"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/trainings", label: "Trainings" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/dmit", label: "About DMIT" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-lavender-border/50 bg-lavender/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-[18px] md:px-10">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-purple"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-purple px-[22px] py-3 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-offwhite transition-colors hover:bg-purple-dark"
          >
            Begin the Conversation
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`block h-[1.5px] w-6 bg-plum transition-transform ${
              open ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span className={`block h-[1.5px] w-6 bg-plum transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`block h-[1.5px] w-6 bg-plum transition-transform ${
              open ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav className="flex flex-col gap-1 border-t border-lavender-border/50 bg-bg px-6 py-6 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 font-sans text-sm uppercase tracking-[0.08em] text-muted transition-colors hover:text-purple"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 bg-purple px-[22px] py-3 text-center font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-offwhite"
          >
            Begin the Conversation
          </Link>
        </nav>
      )}
    </header>
  );
}
