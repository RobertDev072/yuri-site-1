"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const FEATURES = [
  {
    src: "/images/dakrenovatie-promo.jpg",
    alt: "Voor en na vergelijking van een dakrenovatie door SG Onderneming",
    title: "Dakrenovatie",
    description:
      "Een verouderd of beschadigd dak vormt de basis van elk verduurzamingsplan. Wij vernieuwen uw dak grondig en vakkundig, zodat het klaar is voor de komende decennia — inclusief zonnepanelen.",
  },
  {
    src: "/images/birdblockers-promo.jpg",
    alt: "Vogelwerende mesh aangebracht onder zonnepanelen",
    title: "Vogelwering",
    description:
      "Vogels onder zonnepanelen zorgen voor overlast, nesten en schade. Met discrete vogelwerende mesh houden we uw installatie schoon, veilig en onderhoudsarm.",
  },
];

export default function FeatureStrip() {
  return (
    <section className="relative bg-background px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            Meer dan zonnepanelen
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tighter text-foreground sm:text-5xl">
            Compleet ontzorgd
          </h2>
        </motion.div>

        <div className="mt-14 flex flex-col gap-16">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-background-alt lg:w-1/2">
                <Image
                  src={feature.src}
                  alt={feature.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain"
                />
              </div>
              <div className="w-full lg:w-1/2">
                <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {feature.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-lg">
                  {feature.description}
                </p>
                <a
                  href="#contact"
                  className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-soft"
                >
                  Meer informatie
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
