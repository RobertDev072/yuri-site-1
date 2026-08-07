"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";

type Stat = {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 10, suffix: "+", label: "jaar garantie" },
  { value: 500, suffix: "+", label: "installaties" },
  { value: 24, suffix: "/7", label: "service" },
  { value: 100, suffix: "%", label: "duurzaam" },
];

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, stat.value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, stat.value]);

  return (
    <span ref={ref} className="tabular-nums">
      {stat.prefix}
      {display}
      {stat.suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative bg-background-deep px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border-subtle bg-white/[0.03] p-6 text-center backdrop-blur-sm sm:p-8"
            >
              <div className="text-4xl font-black tracking-tighter text-accent sm:text-5xl">
                <Counter stat={stat} />
              </div>
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-foreground-muted sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
