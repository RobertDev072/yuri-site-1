"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Button from "./Button";

// Real company van photo (clean pre-made cutout, transparent background) —
// 640x271 source. Locking that aspect ratio on the wrapper lets the image
// scale responsively via `fill` instead of hardcoded intrinsic dimensions.
// Same asset as VanReveal.tsx's scroll-driven drive sequence, but this is a
// separate, much simpler static composite — just parked in the scene.
const VAN_ASPECT = "640 / 271";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Gentle depth cue as the hero scrolls out of view — the van drifts a few
  // pixels slower/later than the rest of the frame. Purely decorative, so
  // the resulting motion value is simply left unbound (see `style` below)
  // rather than skipped, when the visitor prefers reduced motion.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const vanDrift = useTransform(scrollYProgress, [0, 1], [0, 56]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100vh] w-full items-center overflow-hidden bg-background-deep"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero-dusk.jpg"
          alt="Moderne woonwijk in de schemering met zonnepanelen op de daken en warm verlicht interieur"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
      </div>

      {/* Decorative hexagon texture, low-opacity, faded toward the corner —
          purely ornamental, never obscures content. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="pointer-events-none absolute right-0 top-0 z-[1] h-40 w-40 opacity-[0.16] [mask-image:radial-gradient(circle_at_top_right,black,transparent_72%)] sm:h-64 sm:w-64 md:h-80 md:w-80"
      >
        <defs>
          <pattern id="hero-hex-grid" width="30" height="26" patternUnits="userSpaceOnUse">
            <path
              d="M15 0 30 7.5 30 22.5 15 30 0 22.5 0 7.5 Z"
              fill="none"
              stroke="#ff7a1a"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#hero-hex-grid)" />
      </svg>

      {/* Single thin diagonal light-streak, pure CSS gradients — a bright
          hairline core plus a softer blurred glow, crossing the upper-right
          of the frame like a lens-flare trail. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div className="absolute left-[64%] top-[-20%] h-[140%] w-px rotate-[16deg] bg-gradient-to-b from-transparent via-accent/70 to-transparent" />
        <div className="absolute left-[64%] top-[-20%] h-[140%] w-4 -translate-x-1/2 rotate-[16deg] bg-gradient-to-b from-transparent via-accent/25 to-transparent blur-md" />
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

      {/* Van composite — parked lower-right of the frame, on the same
          street/driveway band as the vehicles already visible in the base
          photo. Sits above the gradient overlays (so it stays crisp) but
          below the text/CTA layer (z-10), which keeps it clear of the
          headline even if the two ever overlap on an odd viewport. */}
      <div className="absolute inset-x-0 bottom-[11%] z-[6] flex justify-center px-5 sm:bottom-[7%] sm:justify-end sm:px-10 md:bottom-[9%] md:pr-16 lg:pr-24">
        <motion.div
          style={prefersReducedMotion ? undefined : { y: vanDrift }}
          className="relative w-[30vw] max-w-[120px] sm:w-[36vw] sm:max-w-[380px] md:max-w-[440px] lg:max-w-[500px]"
        >
          {/* Soft contact-shadow blur so the van reads as sitting on the
              ground rather than floating/pasted-on. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-[8%] bottom-[8%] h-[20%] rounded-[50%] bg-black/70 blur-xl"
          />
          <div className="relative w-full" style={{ aspectRatio: VAN_ASPECT }}>
            <Image
              src="/images/van-cutout.png"
              alt="Bedrijfswagen van SG Onderneming geparkeerd bij een woning in de schemering"
              fill
              sizes="(max-width: 640px) 30vw, (max-width: 1024px) 36vw, 500px"
              className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
            />
          </div>
        </motion.div>
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
