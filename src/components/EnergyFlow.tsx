"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Sun,
  BatteryCharging,
  Home,
  Lightbulb,
  Car,
  Zap,
  type LucideIcon,
} from "lucide-react";

type Node = {
  id: string;
  icon: LucideIcon;
  label: string;
  sub: string;
  /** Position on the 0–100 diagram canvas, matched 1:1 between the SVG
   *  connector lines and the absolutely-positioned icon badges. */
  x: number;
  y: number;
  size: "lg" | "md";
};

const NODES: Node[] = [
  { id: "zon", icon: Sun, label: "Zonnepanelen", sub: "Wekt groene stroom op", x: 8, y: 20, size: "md" },
  { id: "batterij", icon: BatteryCharging, label: "Thuisbatterij", sub: "Slaat overschot op", x: 8, y: 80, size: "md" },
  { id: "huis", icon: Home, label: "Slimme meterkast", sub: "Stuurt de stroom aan", x: 50, y: 50, size: "lg" },
  { id: "verlichting", icon: Lightbulb, label: "Verlichting & apparaten", sub: "Verbruikt direct", x: 92, y: 15, size: "md" },
  { id: "laadpaal", icon: Car, label: "Laadpaal", sub: "Laadt uw auto op", x: 92, y: 50, size: "md" },
  { id: "net", icon: Zap, label: "Elektriciteitsnet", sub: "Vangnet & teruglevering", x: 92, y: 85, size: "md" },
];

// Connector lines between node ids, using the same NODES x/y coordinates.
// `bidirectional` gets a two-tone dash (grid can both supply and receive).
const CONNECTIONS: { from: string; to: string; bidirectional?: boolean }[] = [
  { from: "zon", to: "huis" },
  { from: "batterij", to: "huis" },
  { from: "huis", to: "verlichting" },
  { from: "huis", to: "laadpaal" },
  { from: "huis", to: "net", bidirectional: true },
];

const NODE_MAP = Object.fromEntries(NODES.map((n) => [n.id, n]));

function ConnectorLines() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
    >
      {CONNECTIONS.map(({ from, to, bidirectional }) => {
        const a = NODE_MAP[from];
        const b = NODE_MAP[to];
        return (
          <line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={bidirectional ? "#a1a1aa" : "#ff7a1a"}
            strokeWidth={0.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="flow-line"
            opacity={0.8}
          />
        );
      })}
    </svg>
  );
}

function NodeBadge({ node, index }: { node: Node; index: number }) {
  const Icon = node.icon;
  const badgeSize = node.size === "lg" ? "h-16 w-16 sm:h-20 sm:w-20" : "h-12 w-12 sm:h-14 sm:w-14";
  const iconSize = node.size === "lg" ? 26 : 20;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      style={{ top: `${node.y}%`, left: `${node.x}%` }}
      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-center"
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-full border-2 border-accent/40 bg-background-alt text-accent shadow-[0_0_24px_-6px_rgba(255,122,26,0.5)] ${badgeSize}`}
      >
        <Icon size={iconSize} aria-hidden="true" />
      </span>
      <span className="max-w-[7rem] text-xs font-bold leading-tight text-foreground sm:max-w-[8.5rem] sm:text-sm">
        {node.label}
      </span>
      <span className="hidden max-w-[7.5rem] text-[11px] leading-snug text-foreground-muted sm:block">
        {node.sub}
      </span>
    </motion.div>
  );
}

/** Desktop/tablet diagram: nodes placed on a percentage canvas, connected
 *  by animated dashed lines simulating current flow — an original diagram
 *  in this site's own dark/orange language, inspired by (not copied from)
 *  a battery-brand's product schematic the client shared as a reference. */
function DesktopDiagram() {
  return (
    <div className="relative mt-16 hidden aspect-[16/8] w-full lg:block">
      <ConnectorLines />
      {NODES.map((node, index) => (
        <NodeBadge key={node.id} node={node} index={index} />
      ))}
    </div>
  );
}

/** Mobile/tablet fallback: the same six nodes as a simple vertical flow
 *  list with connecting arrows — no absolute positioning, no diagram math
 *  that could break on a narrow viewport, matching this codebase's other
 *  mobile-fallback components. */
function MobileFlowList() {
  const prefersReducedMotion = useReducedMotion();
  const order = ["zon", "batterij", "huis", "verlichting", "laadpaal", "net"];

  return (
    <ol className="mt-12 flex flex-col items-center gap-3 lg:hidden">
      {order.map((id, index) => {
        const node = NODE_MAP[id];
        const Icon = node.icon;
        return (
          <li key={id} className="flex w-full max-w-sm flex-col items-center">
            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              className="flex w-full items-center gap-4 rounded-2xl border border-border-subtle bg-background-alt/60 p-4"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-accent/40 bg-background-alt text-accent">
                <Icon size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">{node.label}</p>
                <p className="text-xs text-foreground-muted">{node.sub}</p>
              </div>
            </motion.div>
            {index < order.length - 1 && (
              <span aria-hidden="true" className="my-1 h-6 w-px bg-accent/40" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default function EnergyFlow() {
  return (
    <section className="relative overflow-hidden bg-background-deep px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            Hoe het samenwerkt
          </p>
          <h2 className="mt-4 font-display text-4xl font-black tracking-tighter text-foreground sm:text-5xl">
            Van zonnepanelen tot stopcontact
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-lg">
            Zonnepanelen en thuisbatterij werken samen met uw meterkast om
            stroom slim te verdelen — naar uw apparaten, uw laadpaal, of het
            net wanneer dat nodig is.
          </p>
        </motion.div>

        <DesktopDiagram />
        <MobileFlowList />
      </div>
    </section>
  );
}
