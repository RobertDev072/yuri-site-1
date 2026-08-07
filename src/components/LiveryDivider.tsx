/**
 * Thin section divider echoing the van's diagonal wrap stripes, so the
 * livery graphic language reappears throughout the page rather than only
 * on the van itself.
 */
export default function LiveryDivider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-px w-full overflow-hidden bg-border-subtle ${className}`}
    >
      <div className="absolute inset-y-0 left-[8%] w-10 -skew-x-[30deg] bg-accent" />
      <div className="absolute inset-y-0 left-[calc(8%+2.5rem)] w-3 -skew-x-[30deg] bg-accent-soft" />
      <div className="absolute inset-y-0 right-[8%] w-6 -skew-x-[30deg] bg-[#1f6fb2]" />
    </div>
  );
}
