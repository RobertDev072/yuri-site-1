"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

export default function VanReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(scrollYProgress, [0, 0.65, 1], [-420, 0, 0]);
  const rawRotateY = useTransform(scrollYProgress, [0, 0.65, 1], [-28, 0, 0]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.35, 0.7], [0, 0.5, 1]);
  const rawScale = useTransform(scrollYProgress, [0, 0.65, 1], [0.82, 1, 1]);
  const settledOpacity = useTransform(
    scrollYProgress,
    [0.65, 0.85, 1],
    [0, 1, 1]
  );
  const streakOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.4]);

  const x = prefersReducedMotion ? 0 : rawX;
  const rotateY = prefersReducedMotion ? 0 : rawRotateY;
  const opacity = prefersReducedMotion ? 1 : rawOpacity;
  const scale = prefersReducedMotion ? 1 : rawScale;
  const logoOpacity = prefersReducedMotion ? 1 : settledOpacity;

  return (
    <section
      ref={sectionRef}
      aria-label="De SG Onderneming bedrijfswagen"
      className="relative h-[220vh] bg-background-deep"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        {/* Diagonal accent light streaks, pure CSS gradients */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,122,26,0.08),transparent_60%)]" />
          <motion.div
            style={{ opacity: streakOpacity }}
            className="absolute -left-1/4 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-b from-transparent via-accent/15 to-transparent blur-2xl"
          />
          <motion.div
            style={{ opacity: streakOpacity }}
            className="absolute left-1/4 top-0 h-full w-[10%] -skew-x-12 bg-gradient-to-b from-transparent via-white/10 to-transparent blur-xl"
          />
          <motion.div
            style={{ opacity: streakOpacity }}
            className="absolute right-[-10%] top-0 h-full w-1/4 -skew-x-12 bg-gradient-to-b from-transparent via-accent/10 to-transparent blur-2xl"
          />
        </div>

        <p className="relative z-10 mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-foreground-muted sm:mb-10">
          Op de weg voor heel Nederland
        </p>

        <div
          className="relative z-10 w-full px-6"
          style={{ perspective: "1400px" }}
        >
          <motion.div
            style={{ x, rotateY, scale, opacity }}
            className="relative mx-auto aspect-[16/9] w-full max-w-5xl"
          >
            <Image
              src="/images/van-hero.jpg"
              alt="Zwarte bedrijfswagen van SG Onderneming met oranje-blauwe belettering"
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="rounded-2xl object-cover shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]"
            />
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: logoOpacity }}
          className="relative z-10 mt-8 flex flex-col items-center gap-2 text-center sm:mt-12"
        >
          <span className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            SG <span className="text-accent">ONDERNEMING</span>
          </span>
          <span className="text-sm font-medium tracking-wide text-foreground-muted">
            Van A tot Z geregeld
          </span>
        </motion.div>
      </div>
    </section>
  );
}
