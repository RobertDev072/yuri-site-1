"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sun,
  BatteryCharging,
  Home,
  Blinds,
  type LucideIcon,
} from "lucide-react";
import MoodPhoto from "./MoodPhoto";

/**
 * Which corner of a desktop tile the icon-and-line "callout" sits on. The
 * callout is a small square positioned half on / half off that corner of
 * the tile: the point that overlaps the photo ("dot") gets a small marker,
 * the point that overhangs empty space ("badge") gets the circular icon,
 * and a thin line connects the two — the signature device from the
 * client's mockup, rebuilt with our own real project photos.
 */
type Corner = "tl" | "tr" | "bl" | "br";

type CollageTile = {
  id: string;
  href: string;
  icon: LucideIcon;
  label: string;
  /** Extra line shown only on the larger anchor tile. */
  description?: string;
  src: string;
  alt: string;
  /** Desktop-only: position within the collage, as % of the container. */
  top: string;
  left: string;
  width: string;
  height: string;
  /** Desktop-only: slight tilt so the tile reads as a placed panel. */
  rotate: number;
  /** Desktop-only: diagonal corner cut, echoing the livery-bar skew. */
  clipPath: string;
  corner: Corner;
  /** The large lead tile gets special treatment on both layouts. */
  flagship?: boolean;
};

// Corner -> where the callout's on-photo dot and off-photo badge land,
// expressed as a percentage position inside the callout's own square (so
// the same four configs work for any tile, regardless of its size).
const CORNER_CONFIG: Record<
  Corner,
  { wrapperClassName: string; dot: { x: number; y: number }; badge: { x: number; y: number } }
> = {
  tl: { wrapperClassName: "-left-3 -top-3", dot: { x: 78, y: 78 }, badge: { x: 20, y: 20 } },
  tr: { wrapperClassName: "-right-3 -top-3", dot: { x: 22, y: 78 }, badge: { x: 80, y: 20 } },
  bl: { wrapperClassName: "-left-3 -bottom-3", dot: { x: 78, y: 22 }, badge: { x: 20, y: 80 } },
  br: { wrapperClassName: "-right-3 -bottom-3", dot: { x: 22, y: 22 }, badge: { x: 80, y: 80 } },
};

// Real job photos only — same assets already used in Projects.tsx / the
// /oplossingen detail pages. Alt text is copied verbatim from wherever each
// photo already appears elsewhere on the site, for consistency.
const TILES: CollageTile[] = [
  {
    id: "zonnepanelen",
    href: "/oplossingen/zonnepanelen",
    icon: Sun,
    label: "Zonnepanelen",
    description: "Volledig belegd dak, hoog rendement",
    src: "/images/zonnepanelen/02.jpg",
    alt: "Woning met volledig belegd zonnepanelendak",
    top: "0%",
    left: "0%",
    width: "53%",
    height: "100%",
    rotate: -1,
    clipPath: "polygon(0 0, 92% 0, 100% 9%, 100% 100%, 0 100%)",
    corner: "tl",
    flagship: true,
  },
  {
    id: "thuisbatterijen",
    href: "/oplossingen/thuisbatterijen",
    icon: BatteryCharging,
    label: "Thuisbatterijen",
    src: "/images/thuisbatterijen/batterij-01.jpg",
    alt: "AlphaESS thuisbatterij geïnstalleerd bij een particuliere woning",
    top: "2%",
    left: "46%",
    width: "32%",
    height: "45%",
    rotate: 2,
    clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0 100%, 0 12%)",
    corner: "tr",
  },
  {
    id: "zonwering",
    href: "/oplossingen/zonwering",
    icon: Blinds,
    label: "Zonwering",
    src: "/images/zonwering/01.jpg",
    alt: "Geïnstalleerd uitvalscherm boven een terras aan de achterzijde van een woning",
    top: "2%",
    left: "80%",
    width: "20%",
    height: "45%",
    rotate: -2,
    clipPath: "polygon(0 0, 100% 0, 100% 88%, 92% 100%, 0 100%)",
    corner: "tr",
  },
  {
    id: "dakwerk-in-uitvoering",
    href: "/oplossingen/dakrenovatie",
    icon: Home,
    label: "Dakwerk in uitvoering",
    src: "/images/dakrenovatie/uitvoering-01.jpg",
    alt: "Dakwerk in uitvoering door een monteur van SG Onderneming",
    top: "53%",
    left: "46%",
    width: "32%",
    height: "45%",
    rotate: -2,
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 12% 100%, 0 85%)",
    corner: "br",
  },
  {
    id: "dakrenovatie",
    href: "/oplossingen/dakrenovatie",
    icon: Home,
    label: "Dakrenovatie",
    src: "/images/dakrenovatie/01.jpg",
    alt: "Dakkapel met dakramen tijdens een dakrenovatieproject",
    top: "53%",
    left: "80%",
    width: "20%",
    height: "45%",
    rotate: 2,
    clipPath: "polygon(0 12%, 8% 0, 100% 0, 100% 100%, 0 100%)",
    corner: "br",
  },
];

/** The icon-and-line callout: a dot on the photo, a thin orange line, and a
 * small circular badge with the category icon hanging just off the tile's
 * corner. Purely decorative — the caption text already carries the meaning
 * — so the whole thing is aria-hidden. */
function Callout({ tile }: { tile: CollageTile }) {
  const Icon = tile.icon;
  const config = CORNER_CONFIG[tile.corner];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute h-16 w-16 ${config.wrapperClassName}`}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        <line
          x1={config.dot.x}
          y1={config.dot.y}
          x2={config.badge.x}
          y2={config.badge.y}
          stroke="#ff7a1a"
          strokeWidth={2.5}
          strokeLinecap="round"
          opacity={0.9}
        />
        <circle cx={config.dot.x} cy={config.dot.y} r={4} fill="#ff7a1a" />
      </svg>
      <span
        style={{ top: `${config.badge.y}%`, left: `${config.badge.x}%` }}
        className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-black shadow-[0_4px_14px_-4px_rgba(255,122,26,0.7)] ring-2 ring-background sm:h-9 sm:w-9"
      >
        <Icon size={16} />
      </span>
    </div>
  );
}

/** Desktop / large-viewport collage: an angular, overlapping arrangement —
 * one large anchor tile plus four smaller tiles, each diagonally clipped
 * and gently rotated so it reads as a placed panel rather than a grid
 * cell. Dropped entirely below `lg`, in favour of the flat grid below. */
function DesktopCollage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="relative mt-16 hidden lg:block"
      style={{ aspectRatio: "16 / 7" }}
    >
      {TILES.map((tile, index) => (
        <motion.div
          key={tile.id}
          className="absolute"
          style={{ top: tile.top, left: tile.left, width: tile.width, height: tile.height }}
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20, scale: 0.96 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
        >
          <Link
            href={tile.href}
            className="focus-ring group relative block h-full w-full"
            style={{ transform: `rotate(${tile.rotate}deg)` }}
          >
            <div className="absolute inset-0" style={{ clipPath: tile.clipPath }}>
              <MoodPhoto
                src={tile.src}
                alt={tile.alt}
                fill
                tint="edge"
                sizes={
                  tile.flagship
                    ? "(min-width: 1024px) 50vw, 100vw"
                    : "(min-width: 1024px) 25vw, 50vw"
                }
                containerClassName="absolute inset-0"
                imageClassName="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
              >
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <p
                    className={`font-display font-bold tracking-tight text-white ${
                      tile.flagship ? "text-lg sm:text-2xl" : "text-sm sm:text-base"
                    }`}
                  >
                    {tile.label}
                  </p>
                  {tile.description && (
                    <p className="mt-1 hidden text-sm text-white/75 sm:block">
                      {tile.description}
                    </p>
                  )}
                </div>
              </MoodPhoto>
            </div>
            <Callout tile={tile} />
          </Link>
        </motion.div>
      ))}

      {/* Subtle dot-grid texture accent, echoing the mockup's corner
          texture without copying it — pure CSS, no image asset. Anchored
          bottom-left (not bottom-right) so it never sits under the fixed
          WhatsApp button, which lives in the viewport's bottom-right. */}
      <div
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(#ff7a1a 1px, transparent 1.5px)",
          backgroundSize: "16px 16px",
        }}
        className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 opacity-[0.14] [mask-image:radial-gradient(circle_at_bottom_left,black,transparent_70%)]"
      />
    </div>
  );
}

/** Mobile / tablet fallback: a flat, non-overlapping grid — the flagship
 * tile spans both columns, the rest reflow into a plain 2-column grid.
 * No rotation, no clip-path, no hover-only information: every badge and
 * caption is always visible, matching how Solutions.tsx / Projects.tsx
 * already reflow below `lg`. */
function MobileGrid() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
      {TILES.map((tile, index) => {
        const Icon = tile.icon;
        return (
          <motion.div
            key={tile.id}
            className={tile.flagship ? "col-span-2" : ""}
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: (index % 4) * 0.06, ease: "easeOut" }}
          >
            <Link
              href={tile.href}
              className={`focus-ring group relative block overflow-hidden rounded-2xl bg-background-alt ${
                tile.flagship ? "aspect-[16/10]" : "aspect-square"
              }`}
            >
              <MoodPhoto
                src={tile.src}
                alt={tile.alt}
                fill
                tint="edge"
                sizes="(min-width: 640px) 50vw, 100vw"
                containerClassName="absolute inset-0"
                imageClassName="object-cover"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-black shadow-[0_4px_14px_-4px_rgba(255,122,26,0.7)] ring-2 ring-background"
                >
                  <Icon size={15} />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p
                    className={`font-display font-bold tracking-tight text-white ${
                      tile.flagship ? "text-xl" : "text-sm"
                    }`}
                  >
                    {tile.label}
                  </p>
                  {tile.flagship && tile.description && (
                    <p className="mt-1 text-sm text-white/75">{tile.description}</p>
                  )}
                </div>
              </MoodPhoto>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function WorkCollage() {
  return (
    <section className="relative overflow-hidden bg-background-deep px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            Echt werk, geen stockfoto&apos;s
          </p>
          <h2 className="mt-4 font-display text-4xl font-black tracking-tighter text-foreground sm:text-5xl">
            Duurzame oplossingen voor wonen &amp; werken
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-lg">
            Elke foto hieronder komt van een eigen project van SG
            Onderneming. Klik op een tegel voor meer over die oplossing.
          </p>
        </motion.div>

        <DesktopCollage />
        <MobileGrid />
      </div>
    </section>
  );
}
