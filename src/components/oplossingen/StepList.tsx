"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type Step = {
  // A pre-rendered icon element (e.g. `<Cpu size={22} aria-hidden="true" />`)
  // rather than a bare component reference: the step data is defined in
  // server-component pages and passed into this client component as a
  // prop, and a raw component/function reference can't cross that
  // boundary — only already-rendered elements can.
  icon: ReactNode;
  title: string;
  description: string;
};

// Literal class names (not template-interpolated) so Tailwind's static
// content scan can find them at build time.
const COLS: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/**
 * Numbered step timeline, generalised from the homepage <Process> layout
 * (connecting line + numbered icon badge) so the same "how it works"
 * pattern can be reused with different step content per detail page.
 */
export default function StepList({ steps }: { steps: Step[] }) {
  const colsClass = COLS[steps.length] ?? "lg:grid-cols-4";

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-accent/60 via-border-subtle to-transparent lg:left-0 lg:top-6 lg:h-px lg:w-full lg:bg-gradient-to-r"
      />

      <ol className={`relative grid grid-cols-1 gap-10 ${colsClass} lg:gap-6`}>
        {steps.map((step, index) => (
          <motion.li
            key={step.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="relative flex gap-5 pl-0 lg:flex-col lg:gap-0"
          >
            <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-background text-accent">
              {step.icon}
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-black">
                {index + 1}
              </span>
            </div>
            <div className="lg:mt-6">
              <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                {step.description}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
