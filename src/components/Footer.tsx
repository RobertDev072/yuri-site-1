import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

// lucide-react no longer ships brand/social glyphs, so the Instagram mark is
// drawn locally in the same stroke-based style as the rest of the icon set.
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const QUICK_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#oplossingen", label: "Oplossingen" },
  { href: "#projecten", label: "Projecten" },
  { href: "#over-ons", label: "Over ons" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border-subtle bg-background-deep px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative h-10 w-10 overflow-hidden rounded-full bg-white ring-1 ring-white/10">
                <Image
                  src="/images/logo.jpg"
                  alt="SG Onderneming logo"
                  fill
                  sizes="40px"
                  className="object-contain p-1"
                />
              </span>
              <span className="text-sm font-bold tracking-tight text-foreground">
                SG ONDERNEMING
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground-muted">
              Bouw &amp; Verduurzaming. Van zonnepanelen en thuisbatterijen tot
              dakrenovatie en verbouwingen — van A tot Z geregeld.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
              Snel naar
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="focus-ring text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
              Contact
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href="tel:+31611185395"
                  className="focus-ring flex items-center gap-2.5 text-sm text-foreground-muted transition-colors hover:text-foreground"
                >
                  <Phone size={16} aria-hidden="true" className="shrink-0" />
                  06 11 18 53 95
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@sgonderneming.nl"
                  className="focus-ring flex items-center gap-2.5 text-sm text-foreground-muted transition-colors hover:text-foreground"
                >
                  <Mail size={16} aria-hidden="true" className="shrink-0" />
                  info@sgonderneming.nl
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-foreground-muted">
                <MapPin size={16} aria-hidden="true" className="shrink-0" />
                Actief in heel Nederland
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
              Volg ons
            </h3>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.instagram.com/sg.onderneming"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SG Onderneming op Instagram"
                className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-foreground-muted transition-colors hover:border-accent/40 hover:text-accent"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
            <p className="mt-4 text-sm text-foreground-muted">
              sgonderneming.nl
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-8 sm:flex-row">
          <p className="text-xs text-foreground-muted">
            © 2026 SG Onderneming. Alle rechten voorbehouden.
          </p>
          <p className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
            Kwaliteit · Betrouwbaarheid · Vakmanschap
          </p>
        </div>
      </div>
    </footer>
  );
}
