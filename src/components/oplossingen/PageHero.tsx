"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  intro: string;
  imageSrc: string;
  imageAlt: string;
  backHref?: string;
  backLabel?: string;
};

/**
 * Shared hero band for the "/oplossingen/*" detail pages: a shorter,
 * single-photo variant of the homepage <Hero>, with a back-link to the
 * oplossingen overview tucked in right under the fixed <Header>.
 */
export default function PageHero({
  eyebrow,
  title,
  intro,
  imageSrc,
  imageAlt,
  backHref = "/#oplossingen",
  backLabel = "Terug naar oplossingen",
}: PageHeroProps) {
  return (
    <section className="relative flex min-h-[58vh] w-full items-center overflow-hidden bg-background-deep sm:min-h-[66vh]">
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/35 to-background/55" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-5 pt-28 pb-16 sm:px-8 sm:pt-32">
        <Link
          href={backHref}
          className="focus-ring inline-flex w-fit items-center gap-2 text-sm font-semibold text-foreground-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {backLabel}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-8 max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-display text-4xl font-black leading-[1.02] tracking-tighter text-foreground sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-foreground-muted sm:text-lg">
            {intro}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
