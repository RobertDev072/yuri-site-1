"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Project = {
  src: string;
  alt: string;
  caption: string;
};

const PROJECTS: Project[] = [
  {
    src: "/images/projecten/project-01.jpg",
    alt: "Particuliere woning met nieuw geïnstalleerde zonnepanelen op het dak",
    caption: "Zonnepanelen · Particuliere woning",
  },
  {
    src: "/images/projecten/project-02.jpg",
    alt: "Woning met volledig belegd zonnepanelendak",
    caption: "Volledig zonnepanelendak",
  },
  {
    src: "/images/projecten/project-03.jpg",
    alt: "Zonnepanelen op maat geplaatst op een schuin dak",
    caption: "Zonnepanelen op maat",
  },
  {
    src: "/images/projecten/project-04.jpg",
    alt: "Woning met zonnepanelen voor duurzame energieopwekking",
    caption: "Duurzame energieopwekking",
  },
  {
    src: "/images/projecten/project-05.jpg",
    alt: "Recent afgeronde zonnepanelen installatie op een particuliere woning",
    caption: "Zonnepanelen installatie",
  },
  {
    src: "/images/projecten/project-06-batterij.jpg",
    alt: "Thuisbatterij geïnstalleerd bij een particuliere woning",
    caption: "Thuisbatterij installatie",
  },
  {
    src: "/images/projecten/project-07-batterij.jpg",
    alt: "Energieopslagsysteem geplaatst in een woning",
    caption: "Energieopslag thuis",
  },
  {
    src: "/images/projecten/project-08-batterij.jpg",
    alt: "Thuisbatterij naast de meterkast van een woning",
    caption: "Thuisbatterij & meterkast",
  },
  {
    src: "/images/projecten/project-09-batterij.jpg",
    alt: "Slim energieopslagsysteem voor thuisgebruik",
    caption: "Slimme energieopslag",
  },
  {
    src: "/images/projecten/project-10-dak.jpg",
    alt: "Dakwerk in uitvoering door een monteur van SG Onderneming",
    caption: "Dakwerk in uitvoering",
  },
  {
    src: "/images/projecten/project-11-dak.jpg",
    alt: "Dakrenovatie project in volle gang",
    caption: "Dakrenovatie",
  },
  {
    src: "/images/projecten/project-12-dak.jpg",
    alt: "Vakkundig uitgevoerd dakwerk",
    caption: "Vakkundig dakwerk",
  },
];

export default function Projects() {
  return (
    <section
      id="projecten"
      className="relative bg-background-deep px-5 py-24 sm:px-8 sm:py-32"
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
            Onze projecten
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tighter text-foreground sm:text-5xl">
            Recent opgeleverd
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-lg">
            Een greep uit onze afgeronde installaties en projecten, verspreid
            over heel Nederland.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.4,
                delay: (index % 4) * 0.06,
                ease: "easeOut",
              }}
              className="group relative aspect-square overflow-hidden rounded-xl bg-background-alt"
            >
              <Image
                src={project.src}
                alt={project.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-80 transition-opacity group-hover:opacity-100" />
              <p className="absolute bottom-0 left-0 right-0 p-3 text-xs font-semibold text-white sm:text-sm">
                {project.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
