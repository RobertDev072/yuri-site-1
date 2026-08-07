"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#oplossingen", label: "Oplossingen" },
  { href: "#projecten", label: "Projecten" },
  { href: "#over-ons", label: "Over ons" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border-subtle shadow-[0_1px_0_0_rgba(255,255,255,0.05)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <Link
          href="#home"
          className="focus-ring flex items-center gap-3 rounded-full"
          aria-label="SG Onderneming — naar de homepage"
        >
          <span className="relative h-10 w-10 overflow-hidden rounded-full bg-white ring-1 ring-white/10 sm:h-11 sm:w-11">
            <Image
              src="/images/logo.jpg"
              alt="SG Onderneming logo"
              fill
              sizes="44px"
              className="object-contain p-1"
            />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-bold tracking-tight text-foreground">
              SG ONDERNEMING
            </span>
            <span className="text-[11px] font-medium tracking-wide text-foreground-muted">
              Bouw &amp; Verduurzaming
            </span>
          </span>
        </Link>

        <nav
          aria-label="Hoofdnavigatie"
          className="hidden items-center gap-8 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="focus-ring text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:+31611185395"
            className="focus-ring text-sm font-semibold text-foreground-muted transition-colors hover:text-foreground"
          >
            06 11 18 53 95
          </a>
          <a
            href="#contact"
            className="focus-ring inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-black transition-transform hover:scale-105 hover:bg-accent-soft"
          >
            Offerte aanvragen
          </a>
        </div>

        <button
          type="button"
          className="focus-ring inline-flex items-center justify-center rounded-full p-2 text-foreground lg:hidden"
          aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border-subtle bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <nav
              aria-label="Mobiele navigatie"
              className="flex flex-col gap-1 px-5 py-4"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="focus-ring rounded-lg px-3 py-3 text-base font-medium text-foreground-muted transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:+31611185395"
                onClick={() => setMenuOpen(false)}
                className="focus-ring rounded-lg px-3 py-3 text-base font-semibold text-foreground transition-colors hover:bg-white/5"
              >
                06 11 18 53 95
              </a>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="focus-ring mt-2 inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-base font-bold text-black transition-colors hover:bg-accent-soft"
              >
                Offerte aanvragen
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
