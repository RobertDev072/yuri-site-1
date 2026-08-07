import Image, { type ImageProps } from "next/image";
import type { ReactNode } from "react";

type MoodPhotoProps = Omit<ImageProps, "className"> & {
  /** Extra classes for the outer wrapper (aspect ratio, rounding, etc). */
  containerClassName?: string;
  /** Extra classes for the <Image> itself. */
  imageClassName?: string;
  /** "edge" adds a subtle warm accent wash in one corner on top of the base duotone. */
  tint?: "none" | "edge";
  /** Optional content (captions, badges) layered above the overlay. */
  children?: ReactNode;
};

/**
 * Wraps next/image with a cinematic dark duotone treatment so bright,
 * plain daylight snapshots read as moody and premium, consistent with the
 * "Obsidian" dark theme used across the rest of the site.
 */
export default function MoodPhoto({
  // Default to "relative" so the overlay divs below (all `absolute inset-0`)
  // always have a positioned ancestor to anchor against. Callers that need
  // `fill` images inside an already-positioned parent pass
  // containerClassName="absolute inset-0" instead — deliberately NOT
  // combined with a hardcoded "relative" here, since having both a
  // "relative" and an "absolute" position utility in the same class list
  // is a real Tailwind footgun: they both set the same CSS `position`
  // property, so whichever rule happens to win the cascade silently
  // determines behaviour, and if "relative" wins, `inset-0` becomes a
  // no-op and the whole wrapper (and the fill image inside it) collapses
  // to zero height.
  containerClassName = "relative",
  imageClassName = "",
  tint = "none",
  children,
  alt,
  ...imageProps
}: MoodPhotoProps) {
  return (
    <div className={`overflow-hidden ${containerClassName}`}>
      <Image
        alt={alt}
        {...imageProps}
        className={`[filter:grayscale(0.35)_contrast(1.15)_brightness(0.72)_saturate(1.1)] ${imageClassName}`}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-transparent"
      />
      {tint === "edge" && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-accent/25 mix-blend-overlay"
        />
      )}
      {children}
    </div>
  );
}
