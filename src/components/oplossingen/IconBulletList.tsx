"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type IconBulletItem = {
  // A pre-rendered icon element (e.g. `<Ruler size={22} aria-hidden="true" />`)
  // rather than a bare component reference: the item data is defined in
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
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
};

/**
 * Icon + title + description bullet grid, used for spec lists and short
 * "types of X" breakdowns across the detail pages. Visually a smaller,
 * denser cousin of the homepage <Solutions> cards.
 */
export default function IconBulletList({
  items,
  columns = 2,
}: {
  items: IconBulletItem[];
  columns?: 2 | 3;
}) {
  const colsClass = COLS[columns] ?? COLS[2];

  return (
    <ul className={`grid grid-cols-1 gap-5 ${colsClass}`}>
      {items.map((item, index) => (
        <motion.li
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: "easeOut" }}
          className="flex gap-4 rounded-2xl border border-border-subtle bg-background-alt/60 p-5"
        >
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
            {item.icon}
          </span>
          <div>
            <h3 className="font-display text-base font-bold tracking-tight text-foreground">
              {item.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
              {item.description}
            </p>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
