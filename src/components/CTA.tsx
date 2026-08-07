"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

export default function CTA() {
  return (
    <section id="contact" className="relative bg-accent px-5 py-20 sm:px-8 sm:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden opacity-20"
      >
        <div className="absolute -left-1/4 top-0 h-full w-1/3 -skew-x-12 bg-black/30 blur-xl" />
        <div className="absolute right-[-5%] top-0 h-full w-1/4 -skew-x-12 bg-black/20 blur-xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto max-w-4xl text-center"
      >
        <h2 className="text-4xl font-black tracking-tighter text-black sm:text-5xl">
          Klaar om te verduurzamen?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base font-medium leading-relaxed text-black/80 sm:text-lg">
          Vraag vrijblijvend advies aan of ontvang binnen 24 uur een offerte
          op maat. Wij regelen het van A tot Z.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="tel:+31611185395"
            className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-base font-bold text-white transition-transform hover:scale-105 sm:w-auto"
          >
            <Phone size={20} aria-hidden="true" />
            06 11 18 53 95
          </a>
          <a
            href="mailto:info@sgonderneming.nl"
            className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-black bg-transparent px-8 py-4 text-base font-bold text-black transition-colors hover:bg-black hover:text-white sm:w-auto"
          >
            <Mail size={20} aria-hidden="true" />
            info@sgonderneming.nl
          </a>
        </div>

        <p className="mt-6 text-sm font-semibold text-black/70">
          Actief in heel Nederland
        </p>
      </motion.div>
    </section>
  );
}
