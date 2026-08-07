"use client";

import { motion } from "framer-motion";
import {
  Sun,
  BatteryCharging,
  PlugZap,
  Home,
  Hammer,
  Bird,
  type LucideIcon,
} from "lucide-react";

type Solution = {
  icon: LucideIcon;
  title: string;
  description: string;
  flagship?: boolean;
};

const SOLUTIONS: Solution[] = [
  {
    icon: Sun,
    title: "Zonnepanelen",
    description:
      "Hoogrendement zonnepanelen op maat van uw dak, voor maximale opbrengst en snelle terugverdientijd.",
    flagship: true,
  },
  {
    icon: BatteryCharging,
    title: "Thuisbatterijen",
    description:
      "Sla zelf opgewekte stroom op en gebruik uw eigen energie wanneer u die nodig heeft, dag en nacht.",
    flagship: true,
  },
  {
    icon: PlugZap,
    title: "Laadoplossingen",
    description:
      "Laadpalen en laadstations voor thuis, veilig geïnstalleerd en afgestemd op uw zonnepanelen.",
  },
  {
    icon: Home,
    title: "Dakrenovatie",
    description:
      "Van reparatie tot volledige vernieuwing van uw dak, degelijk uitgevoerd en klaar voor de toekomst.",
  },
  {
    icon: Hammer,
    title: "Verbouwingen",
    description:
      "Verbouwingen en algemeen onderhoud aan uw woning, van klein klusje tot complete renovatie.",
  },
  {
    icon: Bird,
    title: "Vogelwering",
    description:
      "Vogelwerende mesh onder uw zonnepanelen tegen nesten en schade, netjes wegwerkt.",
  },
];

export default function Solutions() {
  return (
    <section
      id="oplossingen"
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
            Onze oplossingen
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tighter text-foreground sm:text-5xl">
            Alles voor een duurzame woning
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-lg">
            Van energieopwekking en -opslag tot bouwkundig onderhoud — wij
            regelen het van A tot Z, met eigen vakmensen op elk project.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SOLUTIONS.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: "easeOut" }}
                className={`group relative overflow-hidden rounded-2xl border border-border-subtle bg-background-alt/60 p-6 backdrop-blur-sm transition-colors hover:border-accent/40 ${
                  solution.flagship
                    ? "lg:col-span-2 sm:p-8"
                    : "lg:col-span-1"
                }`}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 -skew-x-[30deg] bg-gradient-to-r from-accent via-accent-soft to-[#1f6fb2] opacity-70 transition-opacity group-hover:opacity-100"
                />
                {solution.flagship && (
                  <span className="absolute right-5 top-5 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-black">
                    Populair
                  </span>
                )}
                <div
                  className={`inline-flex items-center justify-center rounded-xl bg-accent/10 text-accent ${
                    solution.flagship ? "h-14 w-14" : "h-12 w-12"
                  }`}
                >
                  <Icon
                    size={solution.flagship ? 28 : 24}
                    aria-hidden="true"
                  />
                </div>
                <h3
                  className={`mt-5 font-bold tracking-tight text-foreground ${
                    solution.flagship ? "text-2xl" : "text-xl"
                  }`}
                >
                  {solution.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted sm:text-base">
                  {solution.description}
                </p>
                <div
                  aria-hidden="true"
                  className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition-colors group-hover:bg-accent/10"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
