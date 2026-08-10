"use client";

import { motion } from "framer-motion";
import { Bird } from "lucide-react";
import Button from "./Button";
import MoodPhoto from "./MoodPhoto";

const DAKRENOVATIE_FEATURE = {
  title: "Dakrenovatie",
  description:
    "Een verouderd of beschadigd dak vormt de basis van elk verduurzamingsplan. Wij vernieuwen uw dak grondig en vakkundig, zodat het klaar is voor de komende decennia — inclusief zonnepanelen.",
  photos: [
    {
      src: "/images/dakrenovatie/uitvoering-01.jpg",
      alt: "Dakwerk in uitvoering door een monteur van SG Onderneming",
    },
    {
      src: "/images/dakrenovatie/uitvoering-02.jpg",
      alt: "Dakrenovatie project van SG Onderneming in volle gang",
    },
    {
      src: "/images/dakrenovatie/uitvoering-03.jpg",
      alt: "Vakkundig uitgevoerd dakwerk, klaar voor zonnepanelen",
    },
  ],
};

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
          <h2 className="mt-4 font-display text-4xl font-black tracking-tighter text-foreground sm:text-5xl">
            Compleet ontzorgd
          </h2>
        </motion.div>

        <div className="mt-14 flex flex-col gap-16">
          {/* Dakrenovatie — real project photo */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14"
          >
            <div className="grid aspect-[16/10] w-full grid-cols-2 grid-rows-2 gap-2 lg:w-1/2">
              <div className="relative row-span-2 overflow-hidden rounded-2xl bg-background-alt">
                <MoodPhoto
                  src={DAKRENOVATIE_FEATURE.photos[0].src}
                  alt={DAKRENOVATIE_FEATURE.photos[0].alt}
                  fill
                  tint="edge"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  containerClassName="absolute inset-0"
                  imageClassName="object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-2xl bg-background-alt">
                <MoodPhoto
                  src={DAKRENOVATIE_FEATURE.photos[1].src}
                  alt={DAKRENOVATIE_FEATURE.photos[1].alt}
                  fill
                  tint="edge"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  containerClassName="absolute inset-0"
                  imageClassName="object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-2xl bg-background-alt">
                <MoodPhoto
                  src={DAKRENOVATIE_FEATURE.photos[2].src}
                  alt={DAKRENOVATIE_FEATURE.photos[2].alt}
                  fill
                  tint="edge"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  containerClassName="absolute inset-0"
                  imageClassName="object-cover"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h3 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {DAKRENOVATIE_FEATURE.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-lg">
                {DAKRENOVATIE_FEATURE.description}
              </p>
              <Button href="#contact" variant="secondary" size="sm" className="mt-6">
                Meer informatie
              </Button>
            </div>
          </motion.div>

          {/* Vogelwering — no project photo available yet, so the graphic
              panel leans on the same diagonal livery-stripe language as the
              van instead of a stock photo. */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-8 lg:flex-row-reverse lg:items-center lg:gap-14"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-background-deep lg:w-1/2">
              <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-y-0 left-[15%] w-16 -skew-x-[20deg] bg-gradient-to-b from-[#1f6fb2]/70 to-[#1f6fb2]/30" />
                <div className="absolute inset-y-0 left-[38%] w-24 -skew-x-[20deg] bg-gradient-to-b from-accent/80 to-accent-soft/40" />
                <div className="absolute inset-y-0 left-[58%] w-6 -skew-x-[20deg] bg-white/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-background-deep via-background-deep/40 to-transparent" />
              </div>
              <div className="relative z-10 flex h-full items-center justify-center">
                <Bird size={72} className="text-foreground drop-shadow-lg" aria-hidden="true" />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h3 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Vogelwering
              </h3>
              <p className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-lg">
                Vogels onder zonnepanelen zorgen voor overlast, nesten en
                schade. Met discrete vogelwerende mesh houden we uw
                installatie schoon, veilig en onderhoudsarm.
              </p>
              <Button href="#contact" variant="secondary" size="sm" className="mt-6">
                Meer informatie
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
