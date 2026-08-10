"use client";

import { ChevronDown } from "lucide-react";
import Button from "./Button";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100vh] w-full items-center overflow-hidden bg-background-deep"
    >
      {/* Client-supplied banner photo — already has its own light-streak and
          corner texture baked in, so no decorative overlay layers are added
          here (they'd double up on what the image already carries). */}
      <div className="absolute inset-0">
        <Image
          src="/images/brand/hero-banner.png"
          alt="Bedrijfswagen van SG Onderneming bij een woning tijdens de schemering, met een monteur op het dak die zonnepanelen installeert"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-5 pt-16 sm:px-8 sm:pt-24">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
          Bouw &amp; Verduurzaming
        </p>
        <h1 className="mt-3 max-w-4xl font-display text-[13vw] font-black leading-[0.95] tracking-tighter text-foreground sm:mt-4 sm:text-6xl md:text-7xl lg:text-8xl">
          Verduurzamen
          <br />
          begint bij <span className="text-accent">vakwerk</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground-muted sm:mt-6 sm:text-lg">
          Zonnepanelen, thuisbatterijen en laadoplossingen tot dakrenovatie en
          verbouwingen — SG Onderneming regelt het van A tot Z, met eigen
          monteurs en garantie achteraf.
        </p>

        <div className="mt-6 flex flex-col gap-4 sm:mt-10 sm:flex-row">
          <Button href="#contact">Offerte aanvragen</Button>
          <Button href="#oplossingen" variant="secondary">
            Bekijk onze oplossingen
          </Button>
        </div>
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
