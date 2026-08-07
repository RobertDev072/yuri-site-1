/**
 * Universal WhatsApp affordance, fixed bottom-right on every viewport.
 * Deliberately keeps the recognisable WhatsApp green regardless of the
 * page's dark theme, since this is a well-known external convention.
 * The glyph is a small hand-drawn inline SVG — no icon font or network
 * fetch involved.
 */
export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/31611185395"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="focus-ring group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] transition-transform duration-200 hover:scale-110 sm:bottom-7 sm:right-7"
    >
      {/* Ambient glow: always-on but subtle, skipped entirely when the
          visitor has requested reduced motion (motion-safe: only applies
          the animation when that preference is NOT set). */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-40 blur-md motion-safe:animate-pulse [animation-duration:2.6s]"
      />
      {/* Extra ping ring on hover, same reduced-motion guard */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-0 transition-opacity duration-200 group-hover:opacity-60 motion-safe:group-hover:animate-ping"
      />
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M16 4C9.373 4 4 9.373 4 16c0 2.42.72 4.67 1.96 6.56L4.6 27.4l4.98-1.31C11.4 27.24 13.63 28 16 28c6.627 0 12-5.373 12-12S22.627 4 16 4Z"
          fill="#ffffff"
          fillOpacity="0.14"
        />
        <path
          d="M22.47 19.14c-.34-.17-2.02-1-2.34-1.11-.31-.12-.54-.17-.77.17-.22.34-.87 1.1-1.07 1.33-.2.22-.4.25-.74.08-2-.99-3.3-1.78-4.62-4.03-.35-.6.35-.56.99-1.87.11-.22.06-.42-.06-.6-.11-.17-.75-1.8-1.03-2.47-.27-.65-.55-.56-.75-.57-.2-.01-.42-.01-.65-.01-.22 0-.58.08-.9.42-.31.34-1.2 1.17-1.2 2.86 0 1.69 1.23 3.32 1.4 3.55.17.22 2.37 3.62 5.75 4.94 2.85 1.12 3.43.9 4.05.85.62-.06 2.02-.83 2.31-1.63.28-.8.28-1.48.2-1.63-.09-.15-.32-.24-.66-.4Z"
          fill="#ffffff"
        />
      </svg>
    </a>
  );
}
