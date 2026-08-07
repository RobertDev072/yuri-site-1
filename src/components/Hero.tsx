import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Button from "./Button";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100vh] w-full items-center overflow-hidden bg-background-deep"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero-dusk.jpg"
          alt="Moderne woonwijk in de schemering met zonnepanelen op de daken en de SG Onderneming bedrijfswagen op straat"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-5 pt-24 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
          Bouw &amp; Verduurzaming
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-[13vw] font-black leading-[0.95] tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
          Verduurzamen
          <br />
          begint bij <span className="text-accent">vakwerk</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg">
          Zonnepanelen, thuisbatterijen en laadoplossingen tot dakrenovatie en
          verbouwingen — SG Onderneming regelt het van A tot Z, met eigen
          monteurs en garantie achteraf.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href="#contact">Offerte aanvragen</Button>
          <Button href="#oplossingen" variant="secondary">
            Bekijk onze oplossingen
          </Button>
        </div>

        <dl className="mt-16 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            ["10+", "jaar garantie"],
            ["500+", "installaties"],
            ["24/7", "service"],
            ["100%", "duurzaam"],
          ].map(([value, label]) => (
            <div key={label} className="border-l border-white/15 pl-4">
              <dt className="sr-only">{label}</dt>
              <dd className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                {value}
              </dd>
              <dd className="text-xs text-foreground-muted sm:text-sm">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <a
        href="#oplossingen"
        aria-label="Scroll naar oplossingen"
        className="focus-ring absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-full p-2 text-foreground-muted transition-colors hover:text-foreground animate-bounce"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
