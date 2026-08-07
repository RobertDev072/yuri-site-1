# SG Onderneming — website concept

A single-page marketing site for SG Onderneming ("Bouw & Verduurzaming"), built with Next.js 16 (App Router, TypeScript, Tailwind CSS v4). The design language — "Obsidian" — pairs near-black backgrounds with a single electric-orange accent, cinematic full-bleed photography and glassmorphism, evoking Polestar/Porsche-style configurator sites rather than a typical contractor page.

The signature moment is a scroll-driven, multi-beat drive sequence (`VanReveal.tsx` + `Van.tsx`): a hand-drawn inline SVG cargo van — no photography, carrying the real logo as a livery decal — drives across a pinned frame in several beats (cruise, dwell near a waypoint, cruise again) as three route callouts ("500+ installaties", "10+ jaar garantie", "Actief in heel Nederland") appear beside it, over a parallax light-streak backdrop and an animated dashed route line. It's built with Framer Motion's `useScroll`/`useTransform` (explicit keyframes anchored at both ends of the scroll range) and a sticky inner wrapper, with a fully static fallback when `prefers-reduced-motion` is set — native page scroll is never hijacked.

Real project photography (`MoodPhoto.tsx`) gets a dark, cinematic duotone treatment — desaturated, contrast-boosted and darkened, with layered gradient/tint overlays — so bright daylight snapshots read as premium rather than a plain contractor site; this is used throughout the project gallery (including a dedicated thuisbatterijen & elektra subsection) and the dakrenovatie feature block. `hero-dusk.jpg` keeps a lighter-touch gradient overlay instead, since it's an atmospheric banner rather than project documentation.

Content covers the full service range — zonnepanelen, thuisbatterijen, laadoplossingen, dakrenovatie, verbouwingen en vogelwering — with a project gallery, animated trust stats, a 4-step process timeline, a floating WhatsApp button, and a real contact form alongside direct `tel:`/`mailto:` buttons. The form builds a `mailto:` link client-side and submits nothing to a backend or third-party service; no external fonts, scripts or API keys are used anywhere on the site.

## Getting started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. Run `npm run build` to produce a production build.
