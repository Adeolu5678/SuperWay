"use client";

import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/lib/site-content";
import { business, getPhoneHref } from "@/lib/contact";

type SiteHeaderProps = {
  onBookService: () => void;
};

export function SiteHeader({ onBookService }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(245,241,232,0.84)] backdrop-blur-xl">
      <div className="container-page flex items-center justify-between gap-3 py-3 md:py-4">
        <a href="#home" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(40,95,32,0.25)] bg-white/80 text-[1.15rem] font-bold text-[var(--accent)] shadow-sm">
            SW
          </span>
          <span className="hidden sm:block">
            <span className="block font-[family:var(--font-display)] text-xl font-bold tracking-[0.12em] text-[var(--foreground)]">
              SUPER WAY
            </span>
            <span className="block text-[0.68rem] uppercase tracking-[0.38em] text-[var(--accent)]">
              General Cleaning Services
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--foreground)] lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-[var(--accent)]">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={getPhoneHref()}
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(40,95,32,0.25)] bg-white px-4 py-2 text-sm font-semibold text-[var(--foreground)] shadow-sm transition hover:-translate-y-0.5"
          >
            <Phone className="h-4 w-4 text-[var(--accent)]" />
            {business.phoneDisplay}
          </a>
          <button
            type="button"
            onClick={onBookService}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[rgba(40,95,32,0.22)] transition hover:-translate-y-0.5"
          >
            Book a Service
          </button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--foreground)] shadow-sm lg:hidden"
          aria-expanded={menuOpen}
          aria-label="Open menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-[var(--border)] bg-[rgba(255,255,255,0.92)] lg:hidden">
          <div className="container-page flex flex-col gap-4 py-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm font-semibold transition hover:border-[rgba(40,95,32,0.24)]"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onBookService();
                }}
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white"
              >
                Book a Service
              </button>
              <a
                href={getPhoneHref()}
                className="inline-flex items-center justify-center rounded-full border border-[rgba(40,95,32,0.25)] bg-white px-5 py-3 text-sm font-semibold text-[var(--foreground)]"
              >
                Call {business.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

