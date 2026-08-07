# SG Onderneming — website concept

A single-page marketing site for SG Onderneming ("Bouw & Verduurzaming"), built with Next.js 16 (App Router, TypeScript, Tailwind CSS v4). The design language — "Obsidian" — pairs near-black backgrounds with a single electric-orange accent, cinematic full-bleed photography and glassmorphism, evoking Polestar/Porsche-style configurator sites rather than a typical contractor page.

The signature moment is a scroll-driven reveal of the company's liveried work van (`VanReveal.tsx`), built with Framer Motion's `useScroll`/`useTransform` and a sticky inner wrapper, with a fully static fallback when `prefers-reduced-motion` is set. Content covers the full service range — zonnepanelen, thuisbatterijen, laadoplossingen, dakrenovatie, verbouwingen and vogelwering — with a project gallery, animated trust stats, a 4-step process timeline and a real `tel:`/`mailto:` contact band; no forms post to third-party services and no external fonts, scripts or API keys are used.

## Getting started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. Run `npm run build` to produce a production build.
