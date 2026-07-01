"use client";

import { motion, useReducedMotion } from "motion/react";

type Node = {
  id: string;
  cx: number;
  cy: number;
  r: number;
  delay: number;
  tone: "gold" | "cyan";
  central?: boolean;
};

const centralNodes: Node[] = [
  { id: "core-gold", cx: 50, cy: 42, r: 5, delay: 0, tone: "gold", central: true },
  { id: "core-cyan-left", cx: 34, cy: 62, r: 4.5, delay: 0.6, tone: "cyan", central: true },
  { id: "core-cyan-right", cx: 66, cy: 62, r: 4.5, delay: 1.2, tone: "cyan", central: true },
];

const satelliteNodes: Node[] = [
  { id: "sat-1", cx: 18, cy: 28, r: 2.2, delay: 0.3, tone: "cyan" },
  { id: "sat-2", cx: 82, cy: 26, r: 2, delay: 0.9, tone: "gold" },
  { id: "sat-3", cx: 14, cy: 72, r: 1.8, delay: 1.5, tone: "gold" },
  { id: "sat-4", cx: 86, cy: 74, r: 2, delay: 0.5, tone: "cyan" },
  { id: "sat-5", cx: 50, cy: 16, r: 1.6, delay: 1.8, tone: "cyan" },
];

const nodes = [...centralNodes, ...satelliteNodes];

const edges: [string, string][] = [
  ["core-gold", "core-cyan-left"],
  ["core-gold", "core-cyan-right"],
  ["core-cyan-left", "core-cyan-right"],
  ["core-gold", "sat-5"],
  ["core-cyan-left", "sat-1"],
  ["core-cyan-left", "sat-3"],
  ["core-cyan-right", "sat-2"],
  ["core-cyan-right", "sat-4"],
  ["sat-1", "sat-5"],
  ["sat-2", "sat-5"],
];

const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

const toneFill: Record<Node["tone"], string> = {
  gold: "var(--color-gold)",
  cyan: "var(--color-cyan)",
};

export function SymbolNetwork() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="relative aspect-square w-full max-w-[420px] lg:max-w-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        className="relative h-full w-full"
        role="presentation"
      >
        <defs>
          <filter id="node-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect
          x="8"
          y="8"
          width="84"
          height="84"
          rx="20"
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="0.4"
          opacity="0.6"
        />

        {edges.map(([from, to], index) => {
          const a = nodeMap[from];
          const b = nodeMap[to];
          const isCore = a.central && b.central;

          return (
            <motion.line
              key={`${from}-${to}`}
              x1={a.cx}
              y1={a.cy}
              x2={b.cx}
              y2={b.cy}
              stroke={isCore ? "var(--color-gold)" : "var(--color-cyan)"}
              strokeOpacity={isCore ? 0.35 : 0.18}
              strokeWidth={isCore ? 0.4 : 0.25}
              initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1.4,
                delay: 0.2 + index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          );
        })}

        {nodes.map((node) => (
          <motion.g
            key={node.id}
            filter={node.central ? "url(#node-glow)" : undefined}
            animate={
              prefersReducedMotion
                ? undefined
                : { y: [0, node.central ? -0.8 : -0.4, 0] }
            }
            transition={{
              duration: node.central ? 6 : 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: node.delay,
            }}
          >
            {node.central && (
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r + 5}
                fill={toneFill[node.tone]}
                opacity={node.tone === "gold" ? 0.12 : 0.08}
              />
            )}
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill={toneFill[node.tone]}
              opacity={node.central ? 0.95 : 0.55}
            />
            {node.central && (
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r - 1.5}
                fill="var(--color-background)"
                opacity="0.35"
              />
            )}
          </motion.g>
        ))}

        <motion.polygon
          points="50,42 34,62 66,62"
          fill="none"
          stroke="var(--color-cyan)"
          strokeOpacity="0.12"
          strokeWidth="0.3"
          strokeDasharray="1.5 2.5"
          animate={prefersReducedMotion ? undefined : { opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
