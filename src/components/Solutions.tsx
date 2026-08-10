"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sun,
  BatteryCharging,
  PlugZap,
  Home,
  Hammer,
  Bird,
  Blinds,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

type Solution = {
  icon: LucideIcon;
  title: string;
  description: string;
  flagship?: boolean;
  /** Link to the deep-dive detail page, if one exists yet. */
  href?: string;
  /** A real photo of this exact kind of work. Left unset for the two
   *  solutions (Laadoplossingen, Vogelwering) we don't have a real photo
   *  for yet — those keep the plain icon-only card rather than a stock or
   *  invented image. Deliberately NOT run through <MoodPhoto>'s dark
   *  duotone treatment here: the client specifically asked for the
   *  solutions grid to feel brighter/more informative, so these render at
   *  natural brightness instead of the moodier look used elsewhere. */
  photo?: { src: string; alt: string; objectPosition?: string; zoom?: boolean };
};

const FLAGSHIP_SOLUTIONS: Solution[] = [
  {
    icon: Sun,
    title: "Zonnepanelen",
    description:
      "Hoogrendement zonnepanelen op maat van uw dak, voor maximale opbrengst en snelle terugverdientijd.",
    flagship: true,
    href: "/oplossingen/zonnepanelen",
    photo: {
      src: "/images/zonnepanelen/02.jpg",
      alt: "Woning met volledig belegd zonnepanelendak",
    },
  },
  {
    icon: BatteryCharging,
    title: "Thuisbatterijen",
    description:
      "Sla zelf opgewekte stroom op en gebruik uw eigen energie wanneer u die nodig heeft, dag en nacht.",
    flagship: true,
    href: "/oplossingen/thuisbatterijen",
    photo: {
      src: "/images/thuisbatterijen/batterij-01.jpg",
      alt: "AlphaESS thuisbatterij geïnstalleerd bij een particuliere woning",
    },
  },
];

const OTHER_SOLUTIONS: Solution[] = [
  {
    icon: PlugZap,
    title: "Laadoplossingen",
    description:
      "Laadpalen en laadstations voor thuis, veilig geïnstalleerd en afgestemd op uw zonnepanelen.",
    href: "/oplossingen/laadoplossingen",
  },
  {
    icon: Home,
    title: "Dakrenovatie",
    description:
      "Van reparatie tot volledige vernieuwing van uw dak, degelijk uitgevoerd en klaar voor de toekomst.",
    href: "/oplossingen/dakrenovatie",
    photo: {
      src: "/images/dakrenovatie/01.jpg",
      alt: "Dakkapel met dakramen tijdens een dakrenovatieproject",
    },
  },
  {
    icon: Hammer,
    title: "Verbouwingen",
    description:
      "Verbouwingen en algemeen onderhoud aan uw woning, van klein klusje tot complete renovatie.",
    href: "/oplossingen/verbouwingen",
    // This source image is the designer pack's version, which has small
    // icon-badge/caption decoration baked into two opposite corners —
    // zoomed in (see `zoom` below) so both margins fall outside the crop
    // instead of trading one visible corner for the other.
    photo: {
      src: "/images/verbouwingen/card-aanbouw.webp",
      alt: "Aanbouw met grote glazen puntgevel aan de achterzijde van een woning",
      zoom: true,
    },
  },
  {
    icon: Bird,
    title: "Vogelwering",
    description:
      "Vogelwerende mesh onder uw zonnepanelen tegen nesten en schade, netjes wegwerkt.",
  },
  {
    icon: Blinds,
    title: "Zonwering",
    description:
      "Screens, zonneschermen en rolluiken op maat, voor een koel huis en een comfortabel terras op de warmste dagen.",
    href: "/oplossingen/zonwering",
    photo: {
      src: "/images/zonwering/01.jpg",
      alt: "Geïnstalleerd zonnescherm boven een terras aan de achterzijde van een woning",
    },
  },
];

/**
 * Renders a single solution card. Cards with an `href` become a real
 * Next.js <Link> (so the whole card is clickable and keyboard-focusable);
 * cards without one — solutions that don't have a dedicated page yet —
 * render as a plain, non-interactive div.
 */
function SolutionCard({ solution }: { solution: Solution }) {
  const Icon = solution.icon;
  const surfaceClassName = `group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-background-alt/60 backdrop-blur-sm transition-colors hover:border-accent/40`;
  const bodyPadding = solution.flagship ? "p-6 sm:p-8" : "p-6";

  const content = (
    <>
      {solution.photo ? (
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
          <Image
            src={solution.photo.src}
            alt={solution.photo.alt}
            fill
            sizes={solution.flagship ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            style={solution.photo.objectPosition ? { objectPosition: solution.photo.objectPosition } : undefined}
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${solution.photo.zoom ? "scale-125" : ""}`}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-background-alt via-background-alt/10 to-transparent"
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 -skew-x-[30deg] bg-gradient-to-r from-accent via-accent-soft to-[#1f6fb2] opacity-70 transition-opacity group-hover:opacity-100"
        />
      )}
      {solution.flagship && (
        <span className="absolute right-5 top-5 z-10 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-black">
          Populair
        </span>
      )}
      <div className={`relative flex flex-1 flex-col ${bodyPadding}`}>
        <div
          className={`inline-flex items-center justify-center rounded-xl bg-accent/10 text-accent ${
            solution.flagship ? "h-14 w-14" : "h-12 w-12"
          }`}
        >
          <Icon size={solution.flagship ? 28 : 24} aria-hidden="true" />
        </div>
        <h3
          className={`mt-5 font-display font-bold tracking-tight text-foreground ${
            solution.flagship ? "text-2xl" : "text-xl"
          }`}
        >
          {solution.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground-muted sm:text-base">
          {solution.description}
        </p>
        {solution.href && (
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
            Meer informatie
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        )}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition-colors group-hover:bg-accent/10"
      />
    </>
  );

  if (solution.href) {
    return (
      <Link href={solution.href} className={`focus-ring ${surfaceClassName}`}>
        {content}
      </Link>
    );
  }

  return <div className={surfaceClassName}>{content}</div>;
}

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
          <h2 className="mt-4 font-display text-4xl font-black tracking-tighter text-foreground sm:text-5xl">
            Alles voor een duurzame woning
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-lg">
            Van energieopwekking en -opslag tot bouwkundig onderhoud — wij
            regelen het van A tot Z, met eigen vakmensen op elk project.
          </p>
        </motion.div>

        {/* Flagship duo: our two headline offerings, full-width side by side. */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {FLAGSHIP_SOLUTIONS.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              className="h-full"
            >
              <SolutionCard solution={solution} />
            </motion.div>
          ))}
        </div>

        {/* Remaining services reflow into a balanced 3-column block instead
            of a lone trailing card in a 4-column grid. */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {OTHER_SOLUTIONS.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: "easeOut" }}
              className="h-full"
            >
              <SolutionCard solution={solution} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
