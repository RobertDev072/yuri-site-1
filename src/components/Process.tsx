"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, FileText, ShieldCheck, Wrench } from "lucide-react";

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "Vrijblijvend advies",
    description:
      "We bespreken uw situatie en wensen en denken mee over de beste oplossing.",
  },
  {
    icon: FileText,
    title: "Offerte op maat",
    description: "Binnen 24 uur ontvangt u een heldere, persoonlijke offerte.",
  },
  {
    icon: Wrench,
    title: "Vakkundige installatie",
    description:
      "Onze eigen monteurs voeren de werkzaamheden netjes en zorgvuldig uit.",
  },
  {
    icon: ShieldCheck,
    title: "Service & garantie",
    description:
      "Ook na afronding staan we voor u klaar, met garantie op ons werk.",
  },
];

export default function Process() {
  return (
    <section
      id="over-ons"
      className="relative bg-background px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            Van A tot Z
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tighter text-foreground sm:text-5xl">
            Zo werken wij
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-lg">
            Een helder proces, van eerste gesprek tot jarenlange nazorg.
          </p>
        </motion.div>

        <div className="relative mt-16">
          {/* connecting line: horizontal on desktop, vertical on mobile */}
          <div
            aria-hidden="true"
            className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-accent/60 via-border-subtle to-transparent sm:left-6 lg:left-0 lg:top-6 lg:h-px lg:w-full lg:bg-gradient-to-r"
          />

          <ol className="relative grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  className="relative flex gap-5 pl-0 lg:flex-col lg:gap-0"
                >
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-background text-accent">
                    <Icon size={22} aria-hidden="true" />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-black">
                      {index + 1}
                    </span>
                  </div>
                  <div className="lg:mt-6">
                    <h3 className="text-lg font-bold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
