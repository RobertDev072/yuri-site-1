"use client";

import { useEffect, useRef, type RefObject } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useInView,
  animate,
  type MotionValue,
} from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";

// Real company van photo (clean pre-made cutout, transparent background) —
// 640x271 source, so every wrapper below locks that same aspect ratio and
// lets the image scale via `fill` instead of intrinsic width/height,
// matching how the old drawn <Van /> scaled responsively.
const VAN_ASPECT = "640 / 271";

// Where the tires touch the ground, as a percentage down the van photo's own
// bounding box (measured on the source image). The road line below is
// anchored to this exact height so it reads as the wheels meeting asphalt,
// not a strip floating under the van.
const WHEEL_LINE_PCT = 91.9;

function VanPhoto({
  className = "",
  dashOffset,
}: {
  className?: string;
  // Drives the road line's dash parallax. Omitted (reduced motion) renders a
  // static line instead of an animated one.
  dashOffset?: MotionValue<string>;
}) {
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: VAN_ASPECT }}>
      {/* Ambient light bloom behind the van — sits under the photo (negative
          z-index within this positioned wrapper) so it reads as a glow the
          van is driving through, not a highlight painted on top of it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 scale-125 bg-[radial-gradient(ellipse_at_center,rgba(255,122,26,0.4),transparent_65%)] blur-2xl"
      />
      <Image
        src="/images/van/van-cutout.png"
        alt="Bedrijfswagen van SG Onderneming met oranje-blauwe wrap-belettering"
        fill
        sizes="(max-width: 768px) 90vw, 640px"
        className="object-contain drop-shadow-[0_0_40px_rgba(255,122,26,0.45)]"
      />
      {/* Road line, anchored inside the van's own bounding box at wheel
          height so it bobs/tilts/translates as one rigid unit with the van
          (it's a descendant of the same transformed wrapper) instead of
          drifting off the tires. Sized well beyond the van on both sides so
          it reads as a road disappearing off-frame, not a wheel-width patch. */}
      <div
        aria-hidden="true"
        style={{ top: `${WHEEL_LINE_PCT}%` }}
        className="pointer-events-none absolute left-1/2 h-0 w-[220vw] -translate-x-1/2"
      >
        {/* Soft glow base, sells "premium" over a hard cartoon stripe */}
        <div className="absolute inset-x-0 top-0 h-[3px] -translate-y-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-[2px]" />
        {dashOffset ? (
          <motion.div
            style={{ backgroundPositionX: dashOffset }}
            className="absolute inset-x-0 top-0 h-px -translate-y-1/2 bg-[repeating-linear-gradient(90deg,rgba(255,122,26,0.55)_0px,rgba(255,122,26,0.55)_16px,transparent_16px,transparent_42px)] opacity-80"
          />
        ) : (
          <div className="absolute inset-x-0 top-0 h-px -translate-y-1/2 bg-[repeating-linear-gradient(90deg,rgba(255,122,26,0.55)_0px,rgba(255,122,26,0.55)_16px,transparent_16px,transparent_42px)] opacity-80" />
        )}
      </div>
    </div>
  );
}

/**
 * Time-progress checkpoints shared by every transform below (0 = start of
 * one drive-by loop, 1 = end). Keeping one canonical list of "beats" — and
 * always anchoring index 0 to progress 0 and the last index to progress 1 —
 * means every `useTransform` call stays fully defined across [0, 1] and
 * never snaps to a default/clamped value outside its own keyframes (a
 * common framer-motion gotcha).
 *
 * The gaps between beats are deliberately uneven: short gaps ("dwell" beats,
 * e.g. 0.26 -> 0.34) make the van barely move while a callout is passing, and
 * long gaps (e.g. 0.34 -> 0.50) make it cruise quickly to the next waypoint —
 * that unevenness is what turns a single linear glide into a multi-beat
 * drive sequence. This same beat map used to be driven by scroll progress;
 * it now runs on a self-looping timer instead (see `useDriveProgress`), so
 * the van drives automatically without the visitor needing to scroll.
 */
// framer-motion's `useTransform` types its input/output ranges as mutable
// arrays, so these are deliberately plain `number[]` (not `as const` tuples)
// to avoid a readonly-vs-mutable type mismatch at the call sites below.
const BEATS: number[] = [0, 0.1, 0.26, 0.34, 0.5, 0.58, 0.74, 0.82, 1];

// Horizontal travel (vw units): off-screen left -> cruise -> dwell at
// waypoint 1 -> cruise -> dwell at waypoint 2 -> cruise -> dwell at
// waypoint 3 -> drives on and off-screen right.
const X_VW: number[] = [-42, -6, 14, 18, 46, 50, 80, 84, 108];
// Small vertical bob suggesting suspension travel while moving.
const Y_PX: number[] = [0, -5, 3, -4, 4, -3, 4, -3, 0];
// Slight nose-up/nose-down rotation on acceleration and braking.
const ROTATE_DEG: number[] = [0, -1.6, 1, -1.2, 0.9, -1, 0.9, -0.9, 0];

// One full drive-by loop, in seconds — long enough to read each callout
// comfortably before the van cycles back to the start.
const LOOP_DURATION = 11;

/** Drives a 0->1 progress value on a repeating timer once the section first
 *  scrolls into view (rather than the previous scroll-scrubbed version) —
 *  "de busje automatisch laten rijden" per the client's request. Returns a
 *  plain 0 value (no animation) when reduced motion is preferred. */
function useDriveProgress(
  sectionRef: RefObject<HTMLElement | null>,
  prefersReducedMotion: boolean
) {
  const progress = useMotionValue(0);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (prefersReducedMotion || !isInView) return;
    const controls = animate(progress, [0, 1], {
      duration: LOOP_DURATION,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
    return () => controls.stop();
  }, [isInView, prefersReducedMotion, progress]);

  return progress;
}

type StatCallout = {
  kind: "stat";
  value: string;
  label: string;
  center: number;
  top: string;
  left: string;
};

type TextCallout = {
  kind: "text";
  text: string;
  center: number;
  top: string;
  left: string;
};

type Callout = StatCallout | TextCallout;

// Centered on the three "dwell" beats above (0.30, 0.54, 0.78) so each card
// appears just as the van is passing that waypoint, matching the left%
// position the van has reached at that point in its travel.
const CALLOUTS: Callout[] = [
  { kind: "stat", value: "500+", label: "installaties", center: 0.3, top: "14%", left: "16%" },
  { kind: "stat", value: "10+", label: "jaar garantie", center: 0.54, top: "64%", left: "48%" },
  { kind: "text", text: "Actief in heel Nederland", center: 0.78, top: "20%", left: "82%" },
];

function CalloutBubble({
  callout,
  progress,
}: {
  callout: Callout;
  progress: MotionValue<number>;
}) {
  const spread = 0.1;
  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  const range: [number, number, number, number] = [
    clamp(callout.center - spread),
    clamp(callout.center - spread * 0.35),
    clamp(callout.center + spread * 0.35),
    clamp(callout.center + spread),
  ];
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [18, 0, 0, -14]);

  return (
    <motion.div
      style={{ opacity, y, top: callout.top, left: callout.left }}
      className="absolute z-20 -translate-x-1/2 rounded-2xl border border-white/15 bg-background-alt/90 px-5 py-4 text-center shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-sm"
    >
      {callout.kind === "stat" ? (
        <>
          <p className="font-display text-2xl font-black tracking-tighter text-accent sm:text-3xl">
            {callout.value}
          </p>
          <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-foreground-muted sm:text-sm">
            {callout.label}
          </p>
        </>
      ) : (
        <p className="flex items-center gap-2 text-sm font-bold tracking-tight text-foreground sm:text-base">
          <MapPin size={18} className="shrink-0 text-accent" aria-hidden="true" />
          {callout.text}
        </p>
      )}
    </motion.div>
  );
}

export default function VanReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const progress = useDriveProgress(sectionRef, Boolean(prefersReducedMotion));
  const animating = !prefersReducedMotion;

  const x = useTransform(progress, BEATS, X_VW.map((v) => `${v}vw`));
  const y = useTransform(progress, BEATS, Y_PX.map((v) => `${v}px`));
  const rotate = useTransform(progress, BEATS, ROTATE_DEG);

  const streakOpacity = useTransform(progress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  // Streaks travel a much larger horizontal distance than the van across the
  // same [0, 1] progress range, so they visibly overtake it — cheap parallax.
  const streakX = useTransform(progress, [0, 1], ["8vw", "-160vw"]);
  // The road line's dashes reuse the exact same BEATS/progress checkpoints as
  // the van's own `x` travel above, scaled up and flipped in sign. That
  // keeps them mathematically in sync with the van (same cruise/dwell
  // timing) while drifting the opposite way and faster than it, so the road
  // reads as passing backward beneath a forward-moving van rather than a
  // static line painted under it.
  const ROAD_PARALLAX_MULT = -2.4;
  const roadDashOffset = useTransform(
    progress,
    BEATS,
    X_VW.map((v) => `${v * ROAD_PARALLAX_MULT}vw`)
  );

  return (
    <section
      ref={sectionRef}
      aria-label="De SG Onderneming bedrijfswagen op de weg"
      className="relative bg-background-deep"
    >
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-24">
        {/* Diagonal light streaks / speed lines, pure CSS gradients */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,122,26,0.07),transparent_60%)]" />
          {animating && (
            <>
              <motion.div
                style={{ opacity: streakOpacity, x: streakX }}
                className="absolute left-0 top-[38%] h-[3px] w-1/4 -skew-y-1 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-[1px]"
              />
              <motion.div
                style={{ opacity: streakOpacity, x: streakX }}
                className="absolute left-[10%] top-[52%] h-[2px] w-1/3 -skew-y-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent blur-[1px]"
              />
              <motion.div
                style={{ opacity: streakOpacity, x: streakX }}
                className="absolute left-[20%] top-[64%] h-[2px] w-1/5 -skew-y-1 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-[1px]"
              />
              <div className="absolute -left-1/4 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-b from-transparent via-accent/10 to-transparent blur-2xl" />
              <div className="absolute right-[-10%] top-0 h-full w-1/4 -skew-x-12 bg-gradient-to-b from-transparent via-accent/10 to-transparent blur-2xl" />
            </>
          )}
        </div>

        <p className="relative z-10 mb-8 text-xs font-semibold uppercase tracking-[0.3em] text-foreground-muted sm:mb-10">
          Op de weg voor heel Nederland
        </p>

        <div className="relative z-10 h-[46vh] w-full min-h-[220px] max-h-[420px]">
          {animating ? (
            <motion.div
              style={{ x, y, rotate }}
              className="absolute top-1/2 w-[46vw] min-w-[320px] max-w-[640px] -translate-y-1/2"
            >
              <VanPhoto className="w-full" dashOffset={roadDashOffset} />
            </motion.div>
          ) : (
            <div className="flex h-full items-center justify-center px-6">
              <VanPhoto className="w-full max-w-2xl" />
            </div>
          )}

          {animating &&
            CALLOUTS.map((callout) => (
              <CalloutBubble
                key={callout.kind === "stat" ? callout.label : callout.text}
                callout={callout}
                progress={progress}
              />
            ))}
        </div>

        {!animating && (
          <div className="relative z-10 mt-4 flex flex-wrap items-center justify-center gap-4 px-6">
            {CALLOUTS.map((callout) => (
              <div
                key={callout.kind === "stat" ? callout.label : callout.text}
                className="rounded-2xl border border-white/15 bg-background-alt/90 px-5 py-4 text-center"
              >
                {callout.kind === "stat" ? (
                  <>
                    <p className="font-display text-2xl font-black tracking-tighter text-accent sm:text-3xl">
                      {callout.value}
                    </p>
                    <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-foreground-muted sm:text-sm">
                      {callout.label}
                    </p>
                  </>
                ) : (
                  <p className="flex items-center gap-2 text-sm font-bold tracking-tight text-foreground sm:text-base">
                    <MapPin size={18} className="shrink-0 text-accent" aria-hidden="true" />
                    {callout.text}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="relative z-10 mt-10 flex flex-col items-center gap-2 text-center sm:mt-12">
          <span className="font-display text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            SG <span className="text-accent">ONDERNEMING</span>
          </span>
          <span className="text-sm font-medium tracking-wide text-foreground-muted">
            Van A tot Z geregeld
          </span>
        </div>
      </div>
    </section>
  );
}
