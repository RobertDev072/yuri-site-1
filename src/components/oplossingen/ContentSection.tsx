"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "base" | "alt" | "deep";

const VARIANT_BG: Record<Variant, string> = {
  base: "bg-background",
  alt: "bg-background-alt",
  deep: "bg-background-deep",
};

type ContentSectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  variant?: Variant;
  children?: ReactNode;
  className?: string;
};

/**
 * Shared body-section wrapper for the "/oplossingen/*" detail pages,
 * mirroring the eyebrow + heading + intro pattern used on the homepage
 * (see <Solutions>, <Projects>, <Process>). `variant` alternates the
 * section background so long detail pages keep the same visual rhythm as
 * the homepage instead of reading as one flat wall of content.
 */
export default function ContentSection({
  id,
  eyebrow,
  title,
  description,
  variant = "base",
  children,
  className = "",
}: ContentSectionProps) {
  return (
    <section
      id={id}
      className={`relative ${VARIANT_BG[variant]} px-5 py-20 sm:px-8 sm:py-28 ${className}`}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
              {eyebrow}
            </p>
          )}
          <h2
            className={`font-display text-3xl font-black tracking-tighter text-foreground sm:text-4xl ${
              eyebrow ? "mt-4" : ""
            }`}
          >
            {title}
          </h2>
          {description && (
            <div className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-lg">
              {description}
            </div>
          )}
        </motion.div>

        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}
