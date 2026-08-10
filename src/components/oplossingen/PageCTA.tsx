"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import Button from "@/components/Button";

/**
 * Closing CTA band for each "/oplossingen/*" detail page. Visually a
 * lighter variant of the homepage <CTA> (same accent band + livery
 * stripes), but links back to the real contact form on the homepage
 * (id="contact" in src/components/CTA.tsx) instead of duplicating the
 * full form on every page.
 */
export default function PageCTA({ headline }: { headline: string }) {
  return (
    <section className="relative bg-accent px-5 py-20 sm:px-8 sm:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden opacity-20"
      >
        <div className="absolute -left-1/4 top-0 h-full w-1/3 -skew-x-12 bg-black/30 blur-xl" />
        <div className="absolute left-[35%] top-0 h-full w-1/12 -skew-x-12 bg-[#1f6fb2]/40 blur-lg" />
        <div className="absolute right-[-5%] top-0 h-full w-1/4 -skew-x-12 bg-black/20 blur-xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto max-w-3xl text-center"
      >
        <h2 className="font-display text-3xl font-black tracking-tighter text-black sm:text-4xl">
          {headline}
        </h2>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/#contact" tone="onAccent" className="w-full sm:w-auto">
            Offerte aanvragen
          </Button>
          <Button
            href="tel:+31611185395"
            variant="secondary"
            tone="onAccent"
            icon={false}
            className="w-full sm:w-auto"
          >
            <Phone size={20} aria-hidden="true" />
            06 11 18 53 95
          </Button>
        </div>

        <p className="mt-6 text-sm font-semibold text-black/70">
          Actief in heel Nederland
        </p>
      </motion.div>
    </section>
  );
}
