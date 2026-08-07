"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function WhyUs() {
  return (
    <section className="relative flex min-h-[70vh] w-full items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-dusk.jpg"
          alt="Woonwijk in de schemering met zonnepanelen op de daken, gefotografeerd voor SG Onderneming"
          fill
          sizes="100vw"
          className="object-cover [filter:contrast(1.1)_brightness(0.7)_saturate(1.05)]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-accent/10" />
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-b from-transparent via-accent/10 to-transparent blur-2xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32"
      >
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            Waarom SG Onderneming
          </p>
          <h2 className="mt-4 text-4xl font-black leading-[1.05] tracking-tighter text-foreground sm:text-5xl">
            Eén partner, van eerste schets tot laatste schroef
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground-muted sm:text-lg">
            Terwijl heel Nederland verduurzaamt, blijven wij bij elk project
            aan huis komen — met eigen monteurs, vaste aanspreekpunten en
            garantie die niet stopt zodra de laatste kabel is aangesloten.
          </p>

          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-white/15 bg-black/40 p-5 backdrop-blur-sm">
            <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
              <ShieldCheck size={20} aria-hidden="true" />
            </span>
            <div>
              <p className="text-lg font-bold italic leading-snug text-foreground">
                &ldquo;Van A tot Z geregeld — dat is niet onze slogan, dat is
                onze werkwijze.&rdquo;
              </p>
              <p className="mt-2 text-sm font-semibold text-foreground-muted">
                Team SG Onderneming
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
