"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  coreExperienceCopy,
  transformationPhases,
  type TransformationPhaseId,
} from "@/lib/site";
import { cn } from "@/lib/utils";

const NODE_COUNT = 28;

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

type NodeState = {
  id: number;
  chaosX: number;
  chaosY: number;
  structX: number;
  structY: number;
  cluster: number;
  tone: "gold" | "cyan";
  size: number;
};

const nodes: NodeState[] = Array.from({ length: NODE_COUNT }, (_, i) => {
  const cluster = i % 4;
  const structAngle = (cluster / 4) * Math.PI * 2 + (i % 3) * 0.35;
  const structRadius = 14 + (i % 5) * 4;
  return {
    id: i,
    chaosX: 12 + seededRandom(i * 3.1) * 76,
    chaosY: 12 + seededRandom(i * 7.3) * 76,
    structX: 50 + Math.cos(structAngle) * structRadius,
    structY: 50 + Math.sin(structAngle) * structRadius,
    cluster,
    tone: i % 3 === 0 ? "gold" : "cyan",
    size: 0.8 + seededRandom(i * 11.7) * 1.4,
  };
});

const chaosEdges: [number, number][] = [];
for (let i = 0; i < NODE_COUNT; i++) {
  for (let j = i + 1; j < NODE_COUNT; j++) {
    const dx = nodes[i].chaosX - nodes[j].chaosX;
    const dy = nodes[i].chaosY - nodes[j].chaosY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 22 && seededRandom(i * 13 + j) > 0.55) {
      chaosEdges.push([i, j]);
    }
  }
}

const structEdges: [number, number][] = [];
for (let i = 0; i < NODE_COUNT; i++) {
  const sameCluster = nodes
    .map((n, idx) => (n.cluster === nodes[i].cluster ? idx : -1))
    .filter((idx) => idx >= 0 && idx !== i);
  sameCluster.slice(0, 2).forEach((j) => structEdges.push([i, j]));
}

const interfaceRects = [
  { x: 28, y: 30, w: 18, h: 12, label: "Dashboard" },
  { x: 54, y: 28, w: 16, h: 14, label: "Karte" },
  { x: 36, y: 56, w: 28, h: 10, label: "Wissensraum" },
];

const experienceSystems = [
  { x: 32, y: 42, name: "Shophebel", accent: "gold" as const },
  { x: 62, y: 52, name: "Symbolraum", accent: "cyan" as const },
  { x: 48, y: 68, name: "Weitere Systeme", accent: "gold" as const },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function phaseProgress(scroll: number, index: number) {
  const start = index * 0.25;
  return clamp01((scroll - start) / 0.25);
}

function activePhaseIndex(scroll: number): number {
  return Math.min(3, Math.floor(scroll * 4));
}

function TransformationCanvas({ scrollProgress }: { scrollProgress: number }) {
  const pStruct = phaseProgress(scrollProgress, 1);
  const pOrient = phaseProgress(scrollProgress, 2);
  const pExperience = phaseProgress(scrollProgress, 3);

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      role="img"
      aria-label="Visualisierung der Systemtransformation"
    >
      <defs>
        <pattern
          id="blueprint-grid"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 10 0 L 0 0 0 10"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="0.15"
            opacity="0.4"
          />
        </pattern>
        <filter id="core-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect
        x="4"
        y="4"
        width="92"
        height="92"
        fill="url(#blueprint-grid)"
        opacity={0.3 + pStruct * 0.4}
        rx="1"
      />

      <rect
        x="4"
        y="4"
        width="92"
        height="92"
        fill="none"
        stroke="var(--color-border-strong)"
        strokeWidth="0.3"
        rx="1"
        opacity={0.5 + pStruct * 0.3}
      />

      {chaosEdges.map(([a, b], i) => {
        const ax = lerp(nodes[a].chaosX, nodes[a].structX, pStruct);
        const ay = lerp(nodes[a].chaosY, nodes[a].structY, pStruct);
        const bx = lerp(nodes[b].chaosX, nodes[b].structX, pStruct);
        const by = lerp(nodes[b].chaosY, nodes[b].structY, pStruct);

        return (
          <line
            key={`chaos-${i}`}
            x1={ax}
            y1={ay}
            x2={bx}
            y2={by}
            stroke="var(--color-muted)"
            strokeWidth="0.2"
            strokeOpacity={lerp(0.08, 0, pStruct)}
          />
        );
      })}

      {structEdges.map(([a, b], i) => {
        const ax = lerp(nodes[a].chaosX, nodes[a].structX, pStruct);
        const ay = lerp(nodes[a].chaosY, nodes[a].structY, pStruct);
        const bx = lerp(nodes[b].chaosX, nodes[b].structX, pStruct);
        const by = lerp(nodes[b].chaosY, nodes[b].structY, pStruct);

        return (
          <line
            key={`struct-${i}`}
            x1={ax}
            y1={ay}
            x2={bx}
            y2={by}
            stroke={
              nodes[a].tone === "gold"
                ? "var(--color-gold)"
                : "var(--color-cyan)"
            }
            strokeWidth="0.25"
            strokeOpacity={pStruct * 0.45 * (1 - pExperience * 0.5)}
          />
        );
      })}

      {interfaceRects.map((rect) => (
        <g key={rect.label} opacity={pOrient * (1 - pExperience * 0.6)}>
          <rect
            x={rect.x}
            y={rect.y}
            width={rect.w}
            height={rect.h}
            fill="none"
            stroke="var(--color-cyan)"
            strokeWidth="0.3"
            strokeOpacity={0.5}
            rx="0.5"
          />
          <line
            x1={rect.x}
            y1={rect.y + 3}
            x2={rect.x + rect.w}
            y2={rect.y + 3}
            stroke="var(--color-cyan)"
            strokeWidth="0.15"
            strokeOpacity={0.25}
          />
          <text
            x={rect.x + 1.5}
            y={rect.y + 2.2}
            fill="var(--color-cyan)"
            fontSize="2"
            fontFamily="var(--font-mono)"
            opacity={0.7}
          >
            {rect.label}
          </text>
        </g>
      ))}

      {experienceSystems.map((system) => (
        <g key={system.name} opacity={pExperience}>
          <circle
            cx={system.x}
            cy={system.y}
            r="5"
            fill={
              system.accent === "gold"
                ? "var(--color-gold)"
                : "var(--color-cyan)"
            }
            opacity={0.12}
          />
          <circle
            cx={system.x}
            cy={system.y}
            r="1.8"
            fill={
              system.accent === "gold"
                ? "var(--color-gold)"
                : "var(--color-cyan)"
            }
            filter="url(#core-glow)"
          />
          <text
            x={system.x}
            y={system.y + 8}
            textAnchor="middle"
            fill="var(--color-foreground)"
            fontSize="2.2"
            fontFamily="var(--font-display)"
            opacity={0.85}
          >
            {system.name}
          </text>
        </g>
      ))}

      {nodes.map((node) => {
        const cx = lerp(node.chaosX, node.structX, pStruct);
        const cy = lerp(node.chaosY, node.structY, pStruct);

        return (
          <circle
            key={node.id}
            cx={cx}
            cy={cy}
            r={node.size * 0.5}
            fill={
              node.tone === "gold" ? "var(--color-gold)" : "var(--color-cyan)"
            }
            opacity={lerp(0.35, 0.75, pStruct) * (1 - pExperience * 0.4)}
          />
        );
      })}
    </svg>
  );
}

function PhaseIndicator({
  phase,
  index,
  scrollProgress,
}: {
  phase: (typeof transformationPhases)[number];
  index: number;
  scrollProgress: number;
}) {
  const activeIndex = activePhaseIndex(scrollProgress);
  const isActive = activeIndex === index;
  const isPast = activeIndex > index;
  const isGold = phase.accent === "gold";

  return (
    <div
      className={cn(
        "relative border-l py-5 pl-6 transition-all duration-500 md:pl-8",
        isActive
          ? isGold
            ? "border-gold/60"
            : "border-cyan/50"
          : isPast
            ? "border-border-strong/40"
            : "border-border/30",
      )}
    >
      <p
        className={cn(
          "font-mono text-[10px] uppercase tracking-[0.24em] transition-colors duration-500",
          isActive
            ? isGold
              ? "text-gold"
              : "text-cyan"
            : "text-muted/60",
        )}
      >
        Phase {String(index + 1).padStart(2, "0")}
      </p>
      <h3
        className={cn(
          "mt-2 font-display text-2xl font-semibold uppercase transition-all duration-500 md:text-3xl lg:text-4xl",
          isActive ? "text-foreground" : "text-foreground/35",
        )}
      >
        {phase.label}
      </h3>
      <p
        className={cn(
          "mt-3 max-w-sm text-sm leading-relaxed transition-colors duration-500 md:text-base",
          isActive ? "text-muted" : "text-muted/40",
        )}
      >
        {phase.description}
      </p>
    </div>
  );
}

function ScrollLinkedCanvas({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const [value, setValue] = useState(0);

  useMotionValueEvent(progress, "change", (v) => setValue(v));

  return <TransformationCanvas scrollProgress={value} />;
}

export function CoreExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [scrollValue, setScrollValue] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const canvasOpacity = useTransform(scrollYProgress, [0, 0.12], [0.55, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!prefersReducedMotion) setScrollValue(v);
  });

  const displayProgress = prefersReducedMotion ? 1 : scrollValue;

  return (
    <section
      id="transformation"
      ref={containerRef}
      className="relative -mt-4 border-t border-border/30 md:-mt-6"
      aria-label={coreExperienceCopy.title}
    >
      <div className="sticky top-0 flex min-h-svh flex-col justify-center overflow-hidden py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.03] blur-[120px]" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
          <header className="mb-10 max-w-2xl md:mb-14">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-gold-muted">
              {coreExperienceCopy.eyebrow}
            </p>
            <h2 className="font-display text-3xl font-semibold text-foreground md:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
              {coreExperienceCopy.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              {coreExperienceCopy.description}
            </p>
          </header>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              {transformationPhases.map((phase, index) => (
                <PhaseIndicator
                  key={phase.id as TransformationPhaseId}
                  phase={phase}
                  index={index}
                  scrollProgress={displayProgress}
                />
              ))}
            </div>

            <motion.div
              className="relative aspect-square w-full max-w-lg justify-self-center lg:max-w-none"
              style={prefersReducedMotion ? undefined : { opacity: canvasOpacity }}
            >
              <div
                className="absolute inset-0 rounded-sm border border-border/40"
                aria-hidden="true"
              />
              <div className="absolute inset-0 p-4 md:p-6">
                {prefersReducedMotion ? (
                  <TransformationCanvas scrollProgress={1} />
                ) : (
                  <ScrollLinkedCanvas progress={scrollYProgress} />
                )}
              </div>

              <div
                className="pointer-events-none absolute -right-3 top-8 hidden font-mono text-[9px] uppercase tracking-[0.2em] text-muted/50 md:block"
                aria-hidden="true"
              >
                <span>SYS / 01</span>
                <br />
                <span>VIEW / TRANSFORM</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div
        className={cn("h-[300vh]", prefersReducedMotion && "hidden")}
        aria-hidden="true"
      />
    </section>
  );
}
