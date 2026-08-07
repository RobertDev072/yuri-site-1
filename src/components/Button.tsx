import { ArrowRight } from "lucide-react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary";
type Tone = "default" | "onAccent";
type Size = "md" | "sm";

type CommonProps = {
  variant?: Variant;
  tone?: Tone;
  size?: Size;
  icon?: boolean;
  className?: string;
  children: ReactNode;
};

type AnchorButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

const BASE =
  "focus-ring inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 hover:scale-105";

const SIZES: Record<Size, string> = {
  md: "px-8 py-4 text-base",
  sm: "px-6 py-3 text-sm",
};

const STYLES: Record<Tone, Record<Variant, string>> = {
  default: {
    primary:
      "bg-accent text-black hover:bg-accent-soft hover:shadow-[0_0_0_1px_rgba(255,122,26,0.5),0_14px_34px_-10px_rgba(255,122,26,0.65)]",
    // Outlined/ghost button with a colour-tinted (not neutral) border, so it
    // still reads as a deliberate secondary CTA rather than a flat outline.
    secondary:
      "border-2 border-accent/40 bg-white/5 text-foreground backdrop-blur-sm hover:border-accent hover:bg-white/10 hover:shadow-[0_0_0_1px_rgba(255,122,26,0.35),0_14px_34px_-12px_rgba(255,122,26,0.45)]",
  },
  onAccent: {
    primary:
      "bg-black text-white hover:bg-black/85 hover:shadow-[0_14px_34px_-10px_rgba(0,0,0,0.7)]",
    secondary:
      "border-2 border-black bg-transparent text-black hover:bg-black hover:text-white",
  },
};

/**
 * Consistent bold CTA pair used site-wide: a filled-accent primary button
 * with a trailing arrow, and an outlined/ghost secondary. Renders as an
 * <a> when given an `href`, otherwise as a native <button>.
 */
export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    tone = "default",
    size = "md",
    icon = true,
    className = "",
    children,
    ...htmlProps
  } = props;
  const classes = `${BASE} ${SIZES[size]} ${STYLES[tone][variant]} ${className}`;
  const arrow = icon ? <ArrowRight size={20} aria-hidden="true" /> : null;

  if (htmlProps.href) {
    return (
      <a className={classes} {...(htmlProps as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
        {arrow}
      </a>
    );
  }

  return (
    <button className={classes} {...(htmlProps as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      {arrow}
    </button>
  );
}
