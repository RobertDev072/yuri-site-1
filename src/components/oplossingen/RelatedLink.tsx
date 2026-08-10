import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type RelatedLinkProps = {
  href: string;
  label: string;
  description?: string;
};

/**
 * Small internal cross-link card used to connect related detail pages
 * (e.g. thuisbatterijen <-> zonnepanelen) without resorting to plain
 * inline text links.
 */
export default function RelatedLink({ href, label, description }: RelatedLinkProps) {
  return (
    <Link
      href={href}
      className="focus-ring group inline-flex w-full items-center justify-between gap-4 rounded-2xl border border-border-subtle bg-background-alt/60 p-5 transition-colors hover:border-accent/40 sm:w-auto"
    >
      <span>
        <span className="block text-sm font-bold text-foreground">{label}</span>
        {description && (
          <span className="mt-1 block max-w-xs text-sm text-foreground-muted">
            {description}
          </span>
        )}
      </span>
      <ArrowUpRight
        size={20}
        aria-hidden="true"
        className="shrink-0 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  );
}
