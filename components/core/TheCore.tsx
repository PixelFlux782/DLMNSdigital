"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

/* ─── helpers ─────────────────────────────────────────────── */

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453;
  return Number((x - Math.floor(x)).toFixed(6));
}

function round(value: number) {
  return Number(value.toFixed(4));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function smoothstep(t: number) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

/** Five quiet transformation phases with readable holds. */
function phaseBlend(scroll: number, index: number) {
  const thresholds = [
    { start: 0, end: 0.16 },
    { start: 0.16, end: 0.34 },
    { start: 0.34, end: 0.56 },
    { start: 0.56, end: 0.76 },
    { start: 0.76, end: 0.92 },
  ];
  const { start, end } = thresholds[index];
  return smoothstep((scroll - start) / (end - start));
}

function activePhase(scroll: number) {
  if (scroll < 0.18) return 0;
  if (scroll < 0.38) return 1;
  if (scroll < 0.58) return 2;
  if (scroll < 0.8) return 3;
  return 4;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}

/* ─── geometry ────────────────────────────────────────────── */

const HEX_OUTER_R = 26;
const HEX_MID_R = 18;
const HEX_INNER_R = 9;

function hexPoints(cx: number, cy: number, r: number, rotation = -Math.PI / 2) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = rotation + (i / 6) * Math.PI * 2;
    return {
      x: round(cx + Math.cos(angle) * r),
      y: round(cy + Math.sin(angle) * r),
    };
  });
}

function hexPointString(
  cx: number,
  cy: number,
  r: number,
  rotation = -Math.PI / 2,
) {
  return hexPoints(cx, cy, r, rotation)
    .map((p) => `${p.x},${p.y}`)
    .join(" ");
}

/* ─── data ────────────────────────────────────────────────── */

const PHASES = [
  {
    id: "complexity",
    code: "P01",
    label: "Komplexität",
    detail: "Signale / Prozesse / Daten",
    finalX: 12,
    finalY: 15,
    chaosX: 22,
    chaosY: 38,
    tone: "cyan" as const,
  },
  {
    id: "analysis",
    code: "P02",
    label: "Analyse",
    detail: "Muster erkennen",
    finalX: 88,
    finalY: 15,
    chaosX: 74,
    chaosY: 42,
    tone: "cyan" as const,
  },
  {
    id: "modules",
    code: "P03",
    label: "Systemmodule",
    detail: "Layer bilden",
    finalX: 12,
    finalY: 85,
    chaosX: 28,
    chaosY: 68,
    tone: "gold" as const,
  },
  {
    id: "products",
    code: "P04",
    label: "Produktwelt",
    detail: "Shophebel / Flowbase",
    finalX: 88,
    finalY: 85,
    chaosX: 78,
    chaosY: 62,
    tone: "cyan" as const,
  },
  {
    id: "system",
    code: "P05",
    label: "DLMNS-System",
    detail: "Building Intelligent Systems",
    finalX: 50,
    finalY: 8,
    chaosX: 50,
    chaosY: 52,
    tone: "gold" as const,
  },
];

const SYSTEM_LAYERS = [
  { label: "Interface", x: 50, y: 33, w: 27, tone: "cyan" as const },
  { label: "Datenmodell", x: 50, y: 43, w: 32, tone: "gold" as const },
  { label: "Automatisierung", x: 50, y: 53, w: 36, tone: "cyan" as const },
  { label: "Produktlogik", x: 50, y: 63, w: 32, tone: "gold" as const },
];

const PRODUCTS = [
  { label: "Shophebel", x: 25, y: 31, tone: "gold" as const },
  { label: "Symbolraum", x: 75, y: 31, tone: "cyan" as const },
  { label: "Flowbase", x: 25, y: 72, tone: "cyan" as const },
  { label: "Custom Systems", x: 75, y: 72, tone: "gold" as const },
];

const SIGNAL_LABELS = [
  { label: "Analyse", x: 20, y: 49 },
  { label: "Score", x: 33, y: 22 },
  { label: "Workflow", x: 67, y: 24 },
  { label: "KI-Auswertung", x: 79, y: 50 },
  { label: "Dashboard", x: 35, y: 80 },
  { label: "Empfehlung", x: 63, y: 78 },
];

type Particle = {
  id: number;
  chaosX: number;
  chaosY: number;
  structX: number;
  structY: number;
  finalX: number;
  finalY: number;
  size: number;
  tone: "gold" | "cyan" | "muted";
};

function buildParticles(count: number): Particle[] {
  const ringSlots = hexPoints(50, 50, HEX_OUTER_R - 2);
  const midSlots = hexPoints(50, 50, HEX_MID_R, -Math.PI / 2 + Math.PI / 6);

  return Array.from({ length: count }, (_, i) => {
    const slot = i < ringSlots.length ? ringSlots[i] : midSlots[i % midSlots.length];
    const ring = i % 3;
    const angle =
      (i / count) * Math.PI * 2 + seededRandom(i * 2.1) * (ring === 0 ? 0.15 : 0.35);
    const structRadius = 18 + ring * 7 + seededRandom(i * 5.3) * 3;
    const finalRadius = HEX_OUTER_R - 1 - (i % 2) * 3;

    return {
      id: i,
      chaosX: 8 + seededRandom(i * 3.7) * 84,
      chaosY: 8 + seededRandom(i * 9.1) * 84,
      structX: 50 + Math.cos(angle) * structRadius * 0.85,
      structY: 50 + Math.sin(angle) * structRadius * 0.72,
      finalX: i < ringSlots.length + midSlots.length ? slot.x : 50 + Math.cos(angle) * finalRadius,
      finalY: i < ringSlots.length + midSlots.length ? slot.y : 50 + Math.sin(angle) * finalRadius,
      size: 0.22 + seededRandom(i * 11.3) * 0.38,
      tone: i % 7 === 0 ? "gold" : i % 4 === 0 ? "cyan" : "muted",
    };
  });
}

const PARTICLES_DESKTOP = buildParticles(54);
const PARTICLES_MOBILE = buildParticles(24);

type StructuralNode = {
  id: number;
  chaosX: number;
  chaosY: number;
  structX: number;
  structY: number;
  finalX: number;
  finalY: number;
  tone: "gold" | "cyan";
};

function buildStructuralNodes(count: number): StructuralNode[] {
  const hexVerts = hexPoints(50, 50, 26);
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    const structR = 26;
    const final = hexVerts[i % hexVerts.length];
    return {
      id: i,
      chaosX: 20 + seededRandom(i * 4.2) * 60,
      chaosY: 20 + seededRandom(i * 6.8) * 60,
      structX: 50 + Math.cos(angle) * structR,
      structY: 50 + Math.sin(angle) * structR,
      finalX: final.x,
      finalY: final.y,
      tone: i % 2 === 0 ? "gold" : "cyan",
    };
  });
}

const NODES_DESKTOP = buildStructuralNodes(8);
const NODES_MOBILE = buildStructuralNodes(6);

function buildWeakEdges(particles: Particle[]) {
  const edges: [number, number][] = [];
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].chaosX - particles[j].chaosX;
      const dy = particles[i].chaosY - particles[j].chaosY;
      if (Math.sqrt(dx * dx + dy * dy) < 16 && seededRandom(i * 17 + j) > 0.68) {
        edges.push([i, j]);
      }
    }
  }
  return edges;
}

const FRAGMENTS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  chaosX1: 15 + seededRandom(i * 1.3) * 70,
  chaosY1: 15 + seededRandom(i * 2.7) * 70,
  chaosX2: 15 + seededRandom(i * 3.9) * 70,
  chaosY2: 15 + seededRandom(i * 5.1) * 70,
  finalX1: 50 + Math.cos((i / 10) * Math.PI * 2) * HEX_MID_R,
  finalY1: 50 + Math.sin((i / 10) * Math.PI * 2) * HEX_MID_R,
  finalX2: 50 + Math.cos((i / 10) * Math.PI * 2 + 0.28) * HEX_OUTER_R,
  finalY2: 50 + Math.sin((i / 10) * Math.PI * 2 + 0.28) * HEX_OUTER_R,
}));

const WEAK_EDGES_DESKTOP = buildWeakEdges(PARTICLES_DESKTOP);
const WEAK_EDGES_MOBILE = buildWeakEdges(PARTICLES_MOBILE).slice(0, 5);

const toneColor = {
  gold: "var(--color-gold)",
  cyan: "var(--color-cyan)",
  muted: "var(--color-muted)",
};

/* ─── canvas ──────────────────────────────────────────────── */

function CoreCanvas({
  scrollProgress,
  mouseX,
  mouseY,
  hoveredPhase,
  isMobile,
}: {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
  hoveredPhase: string | null;
  isMobile: boolean;
}) {
  const particles = isMobile ? PARTICLES_MOBILE : PARTICLES_DESKTOP;
  const structuralNodes = isMobile ? NODES_MOBILE : NODES_DESKTOP;
  const weakEdges = isMobile ? WEAK_EDGES_MOBILE : WEAK_EDGES_DESKTOP;

  const pAnalysis = phaseBlend(scrollProgress, 1);
  const pModules = phaseBlend(scrollProgress, 2);
  const pProducts = phaseBlend(scrollProgress, 3);
  const pSystem = phaseBlend(scrollProgress, 4);
  const current = activePhase(scrollProgress);

  const parallax = (factor: number) => ({
    transform: `translate(${mouseX * factor}px, ${mouseY * factor}px)`,
  });

  const particlePos = (p: Particle) => {
    const layer = SYSTEM_LAYERS[p.id % SYSTEM_LAYERS.length];
    const product = PRODUCTS[p.id % PRODUCTS.length];
    const finalAngle = (p.id / particles.length) * Math.PI * 2;
    const moduleX = layer.x - layer.w / 2 + 4 + (p.id % 7) * (layer.w / 7);
    const moduleY = layer.y + ((p.id % 3) - 1) * 1.8;
    const productX = product.x + Math.cos(finalAngle) * (3.5 + (p.id % 2) * 2);
    const productY = product.y + Math.sin(finalAngle) * (2.5 + (p.id % 3) * 1.2);
    const networkX = 50 + Math.cos(finalAngle) * (HEX_MID_R + (p.id % 3) * 3);
    const networkY = 51 + Math.sin(finalAngle) * (HEX_MID_R + (p.id % 3) * 2);
    const x = lerp(
      lerp(lerp(p.chaosX, p.structX, pAnalysis), moduleX, pModules),
      lerp(productX, networkX, pSystem),
      pProducts,
    );
    const y = lerp(
      lerp(lerp(p.chaosY, p.structY, pAnalysis), moduleY, pModules),
      lerp(productY, networkY, pSystem),
      pProducts,
    );
    return { x: round(x), y: round(y) };
  };

  const nodePos = (n: StructuralNode) => {
    const product = PRODUCTS[n.id % PRODUCTS.length];
    const final = hexPoints(50, 51, HEX_OUTER_R)[n.id % 6];
    const x = lerp(
      lerp(lerp(n.chaosX, n.structX, pAnalysis), product.x, pProducts),
      final.x,
      pSystem,
    );
    const y = lerp(
      lerp(lerp(n.chaosY, n.structY, pAnalysis), product.y, pProducts),
      final.y,
      pSystem,
    );
    return { x: round(x), y: round(y) };
  };

  const structEdges: [number, number][] = structuralNodes.map((_, i) => [
    i,
    (i + 1) % structuralNodes.length,
  ]);

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      role="img"
      aria-label="DLMNS-Systemanimation: Von Komplexität über Analyse, Systemmodule und Produkte zu einem ruhigen digitalen System."
    >
      <defs>
        <pattern
          id="core-blueprint"
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 5 0 L 0 0 0 5"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="0.1"
          />
        </pattern>
        <radialGradient id="core-center-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.09" />
          <stop offset="45%" stopColor="var(--color-cyan)" stopOpacity="0.03" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="core-artifact-halo" cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor="transparent" stopOpacity="0" />
          <stop offset="78%" stopColor="var(--color-gold)" stopOpacity="0.06" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <filter id="core-node-soft" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="0.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="core-diffuse" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>

      {/* Layer 1 - signals */}
      <g style={parallax(0.28)} opacity={lerp(0.62, 0.32, pSystem)}>
        {particles.map((p) => {
          const { x, y } = particlePos(p);
          const drift = (1 - pAnalysis) * 0.6 * (1 - pSystem);
          const settled = pSystem > 0.65;
          return (
            <circle
              key={`pt-${p.id}`}
              cx={
                settled
                  ? x
                  : x + Math.sin(p.id * 1.7 + scrollProgress * 4) * drift
              }
              cy={
                settled
                  ? y
                  : y + Math.cos(p.id * 2.3 + scrollProgress * 3.5) * drift
              }
              r={p.size * lerp(1.15, 0.7, pSystem)}
              fill={toneColor[p.tone]}
              opacity={
                lerp(0.16, settled ? 0.48 : 0.56, pAnalysis) *
                (1 - pSystem * 0.18)
              }
            />
          );
        })}
      </g>

      {/* Layer 2 - pattern detection and system grid */}
      <g style={parallax(0.16)}>
        {weakEdges.map(([a, b], i) => {
          const pa = particlePos(particles[a]);
          const pb = particlePos(particles[b]);
          return (
            <line
              key={`weak-${i}`}
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              stroke="var(--color-muted)"
              strokeWidth="0.1"
              strokeOpacity={lerp(0.12, 0.02, pAnalysis) * (1 - pModules)}
              strokeDasharray="0.6 1.4"
            />
          );
        })}

        {structEdges.map(([a, b], i) => {
          const na = nodePos(structuralNodes[a]);
          const nb = nodePos(structuralNodes[b]);
          return (
            <line
              key={`struct-${i}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="var(--color-gold)"
              strokeWidth={lerp(0.12, 0.2, pSystem)}
              strokeOpacity={pAnalysis * lerp(0.26, 0.18, pSystem)}
            />
          );
        })}

        {!isMobile &&
          FRAGMENTS.map((f) => {
            const x1 = lerp(f.chaosX1, f.finalX1, pAnalysis);
            const y1 = lerp(f.chaosY1, f.finalY1, pAnalysis);
            const x2 = lerp(f.chaosX2, f.finalX2, pAnalysis);
            const y2 = lerp(f.chaosY2, f.finalY2, pAnalysis);
            return (
              <line
                key={`frag-${f.id}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--color-cyan)"
                strokeWidth="0.14"
                strokeOpacity={
                  lerp(0.04, 0.18, pAnalysis) * (1 - pSystem * 0.55)
                }
              />
            );
          })}

        <rect
          x="6"
          y="6"
          width="88"
          height="88"
          fill="url(#core-blueprint)"
          opacity={pModules * 0.32}
          rx="0.5"
        />

        <line
          x1="6"
          y1="50"
          x2="94"
          y2="50"
          stroke="var(--color-cyan)"
          strokeWidth="0.12"
          strokeOpacity={pModules * 0.18}
          strokeDasharray="1.2 2.4"
        />
        <line
          x1="50"
          y1="6"
          x2="50"
          y2="94"
          stroke="var(--color-cyan)"
          strokeWidth="0.12"
          strokeOpacity={pModules * 0.18}
          strokeDasharray="1.2 2.4"
        />

        <circle
          cx="50"
          cy="51"
          r={lerp(0, 32, pSystem)}
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="0.16"
          strokeOpacity={pSystem * 0.16}
          strokeDasharray="2 4"
        />
        <circle
          cx="50"
          cy="51"
          r={lerp(0, 20, pSystem)}
          fill="none"
          stroke="var(--color-cyan)"
          strokeWidth="0.12"
          strokeOpacity={pSystem * 0.18}
        />

        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const inner = 42;
          const outer = deg % 90 === 0 ? 47 : 45;
          return (
            <line
              key={`tick-${deg}`}
              x1={round(50 + Math.cos(rad) * inner)}
              y1={round(51 + Math.sin(rad) * inner)}
              x2={round(50 + Math.cos(rad) * outer)}
              y2={round(51 + Math.sin(rad) * outer)}
              stroke={deg % 90 === 0 ? "var(--color-gold)" : "var(--color-cyan)"}
              strokeWidth={deg % 90 === 0 ? "0.18" : "0.1"}
              strokeOpacity={pSystem * (deg % 90 === 0 ? 0.3 : 0.14)}
            />
          );
        })}
      </g>

      {/* Layer 3 - DLMNS layers and product nodes */}
      <g style={parallax(0.1)}>
        {structuralNodes.map((n) => {
          const { x, y } = nodePos(n);
          const nodeOpacity = lerp(0.12, 0.68, pAnalysis) * (1 - pSystem * 0.2);
          const r = lerp(0.5, 1.05, pAnalysis) * lerp(1, 0.82, pSystem);
          if (nodeOpacity < 0.02) return null;
          return (
            <g key={`node-${n.id}`}>
              <circle
                cx={x}
                cy={y}
                r={r + 1.8}
                fill={toneColor[n.tone]}
                opacity={nodeOpacity * 0.08}
              />
              <circle
                cx={x}
                cy={y}
                r={r}
                fill={toneColor[n.tone]}
                opacity={nodeOpacity}
              />
            </g>
          );
        })}

        <g opacity={pModules * (1 - pProducts * 0.28)}>
          {SYSTEM_LAYERS.map((layer, index) => (
            <g key={layer.label}>
              <rect
                x={layer.x - layer.w / 2}
                y={layer.y - 3.1}
                width={layer.w}
                height="6.2"
                rx="0.8"
                fill="var(--color-background)"
                fillOpacity="0.35"
                stroke={toneColor[layer.tone]}
                strokeWidth="0.16"
                strokeOpacity={0.18 + index * 0.04}
              />
              <text
                x={layer.x}
                y={layer.y + 0.8}
                textAnchor="middle"
                fill="var(--color-foreground)"
                fontSize={isMobile ? "2.8" : "1.85"}
                fontFamily="var(--font-mono)"
                opacity="0.72"
              >
                {layer.label}
              </text>
            </g>
          ))}
        </g>

        <g opacity={pProducts}>
          {PRODUCTS.map((product) => (
            <g key={product.label}>
              <line
                x1="50"
                y1="51"
                x2={product.x}
                y2={product.y}
                stroke={toneColor[product.tone]}
                strokeWidth="0.14"
                strokeOpacity={lerp(0.18, 0.28, pSystem)}
              />
              <circle
                cx={product.x}
                cy={product.y}
                r="6.5"
                fill={toneColor[product.tone]}
                opacity="0.05"
              />
              <circle
                cx={product.x}
                cy={product.y}
                r="1.7"
                fill={toneColor[product.tone]}
                opacity="0.78"
                filter="url(#core-node-soft)"
              />
              <text
                x={product.x}
                y={product.y + (product.y < 50 ? -7.2 : 8.8)}
                textAnchor="middle"
                fill="var(--color-foreground)"
                fontSize={isMobile ? "2.9" : "2"}
                fontFamily="var(--font-display)"
                opacity="0.86"
              >
                {product.label}
              </text>
            </g>
          ))}
        </g>

        <g opacity={pSystem}>
          <circle cx="50" cy="51" r="30" fill="url(#core-artifact-halo)" />
          <circle cx="50" cy="51" r="14" fill="url(#core-center-glow)" />

          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={`spoke-${deg}`}
                x1={round(50 + Math.cos(rad) * 4)}
                y1={round(51 + Math.sin(rad) * 4)}
                x2={round(50 + Math.cos(rad) * (HEX_INNER_R + 1))}
                y2={round(51 + Math.sin(rad) * (HEX_INNER_R + 1))}
                stroke="var(--color-cyan)"
                strokeWidth="0.1"
                strokeOpacity={0.2}
              />
            );
          })}

          <polygon
            points={hexPointString(50, 51, HEX_OUTER_R)}
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth="0.22"
            strokeOpacity="0.55"
          />
          <polygon
            points={hexPointString(50, 51, HEX_MID_R, -Math.PI / 2 + Math.PI / 6)}
            fill="none"
            stroke="var(--color-cyan)"
            strokeWidth="0.14"
            strokeOpacity="0.32"
            strokeDasharray="1.5 2"
          />
          <polygon
            points={hexPointString(50, 51, HEX_INNER_R)}
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth="0.18"
            strokeOpacity="0.45"
          />

          <circle
            cx="50"
            cy="51"
            r="1.6"
            fill="var(--color-gold)"
            opacity="0.75"
            filter="url(#core-node-soft)"
          />
          <circle
            cx="50"
            cy="51"
            r="3.8"
            fill="none"
            stroke="var(--color-cyan)"
            strokeWidth="0.14"
            strokeOpacity="0.28"
          />
          <text
            x="50"
            y="48.6"
            textAnchor="middle"
            fill="var(--color-gold-light)"
            fontSize={isMobile ? "3.2" : "2.6"}
            fontFamily="var(--font-display)"
            opacity="0.92"
          >
            DLMNS
          </text>
          <text
            x="50"
            y="56.8"
            textAnchor="middle"
            fill="var(--color-foreground)"
            fontSize={isMobile ? "1.9" : "1.45"}
            fontFamily="var(--font-mono)"
            opacity="0.56"
          >
            Building Intelligent Systems
          </text>
        </g>
      </g>

      {/* Layer 4 - deliberate semantic labels */}
      <g style={parallax(0.12)}>
        {!isMobile &&
          SIGNAL_LABELS.map((signal) => (
            <text
              key={signal.label}
              x={signal.x}
              y={signal.y}
              textAnchor="middle"
              fill="var(--color-muted)"
              fontSize="1.35"
              fontFamily="var(--font-mono)"
              opacity={(1 - pModules) * 0.36}
            >
              {signal.label}
            </text>
          ))}

        {PHASES.map((coord, index) => {
          const x = lerp(coord.chaosX, coord.finalX, pAnalysis);
          const y = lerp(coord.chaosY, coord.finalY, pAnalysis);
          const isActive = current === index;
          const isHovered = hoveredPhase === coord.id;
          if (isMobile && !isActive) return null;

          const anchor = x < 47 ? "start" : x > 53 ? "end" : "middle";
          const tickDir = x < 50 ? 1 : -1;
          const opacity = lerp(
            0.14,
            isActive || isHovered ? 0.92 : 0.38,
            Math.max(pAnalysis, isActive ? 0.55 : 0),
          );

          return (
            <g key={coord.id} opacity={opacity} className="pointer-events-none">
              <line
                x1={x - 3 * tickDir}
                y1={y + 1.5}
                x2={x + 5 * tickDir}
                y2={y + 1.5}
                stroke={toneColor[coord.tone]}
                strokeWidth="0.1"
                strokeOpacity="0.35"
              />
              <line
                x1={x}
                y1={y - 1}
                x2={x}
                y2={y + 4}
                stroke={toneColor[coord.tone]}
                strokeWidth="0.1"
                strokeOpacity="0.25"
              />

              <text
                x={x}
                y={y}
                textAnchor={anchor}
                fill={toneColor[coord.tone]}
                fontSize={isMobile ? "3.2" : "2.2"}
                fontFamily="var(--font-mono)"
                letterSpacing={isMobile ? "0.08em" : "0.14em"}
                opacity="0.9"
              >
                {coord.code}
              </text>
              <text
                x={x}
                y={y + 3.6}
                textAnchor={anchor}
                fill="var(--color-foreground)"
                fontSize={isMobile ? "2.85" : "1.55"}
                fontFamily="var(--font-mono)"
                opacity={isActive ? 0.82 : 0.42}
                letterSpacing={isMobile ? "0.04em" : "0.12em"}
              >
                {coord.label}
              </text>
              {!isMobile && (
                <text
                  x={x}
                  y={y + 6.2}
                  textAnchor={anchor}
                  fill="var(--color-muted)"
                  fontSize="1.1"
                  fontFamily="var(--font-mono)"
                  opacity={isActive ? 0.5 : 0.22}
                >
                  {coord.detail}
                </text>
              )}

              {isActive && (
                <g opacity={0.7}>
                  <circle
                    cx={x + tickDir * 10}
                    cy={y + 1.8}
                    r="0.45"
                    fill={toneColor[coord.tone]}
                  />
                  <line
                    x1={x + tickDir * 7}
                    y1={y + 1.8}
                    x2={x + tickDir * 13}
                    y2={y + 1.8}
                    stroke={toneColor[coord.tone]}
                    strokeWidth="0.08"
                  />
                </g>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* ─── section ─────────────────────────────────────────────── */

export function TheCore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const artifactRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [scrollValue, setScrollValue] = useState(0);
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 22 });

  const [parallaxX, setParallaxX] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);

  useMotionValueEvent(smoothX, "change", setParallaxX);
  useMotionValueEvent(smoothY, "change", setParallaxY);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const fogOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.75, 0.48, 0.22]);
  const entryOpacity = useTransform(scrollYProgress, [0, 0.1], [0.82, 1]);
  const entryScale = useTransform(
    scrollYProgress,
    [0, 0.12],
    prefersReducedMotion ? [1, 1] : [0.96, 1],
  );
  const coreScale = useTransform(
    scrollYProgress,
    [0, 0.28, 0.72, 1],
    prefersReducedMotion ? [1, 1, 1, 1] : [0.95, 1, 1.01, 1],
  );
  const lightIntensity = useTransform(scrollYProgress, [0, 0.5, 1], [0.22, 0.38, 0.48]);
  const heroBridgeOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!prefersReducedMotion) setScrollValue(v);
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !artifactRef.current) return;
      const rect = artifactRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x * 14);
      mouseY.set(y * 10);
    },
    [mouseX, mouseY, prefersReducedMotion],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const displayProgress = prefersReducedMotion ? 1 : scrollValue;
  const phase = activePhase(displayProgress);
  const currentPhase = PHASES[phase];

  return (
    <section
      id="the-core"
      ref={containerRef}
      className="relative -mt-6 border-t border-border/25 md:-mt-10"
      aria-label="DLMNS-Systemanimation"
    >
      {/* Hero → Core light bridge */}
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 md:-top-32 md:h-56" aria-hidden="true">
        <motion.div
          className="absolute left-1/2 top-0 h-[420px] w-[min(92vw,640px)] -translate-x-1/2 rounded-full bg-gold/[0.035] blur-[160px]"
          style={{ opacity: heroBridgeOpacity }}
        />
        <motion.div
          className="absolute right-[8%] top-6 h-[280px] w-[280px] rounded-full bg-cyan/[0.02] blur-[120px]"
          style={{ opacity: heroBridgeOpacity }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="sticky top-0 flex min-h-svh items-center justify-center overflow-hidden py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <motion.div
            className="absolute left-1/2 top-1/2 h-[min(88vw,680px)] w-[min(88vw,680px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.025] blur-[160px]"
            style={{ opacity: lightIntensity }}
          />
          <motion.div
            className="absolute left-[32%] top-[42%] h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/[0.018] blur-[130px]"
            style={{
              x: prefersReducedMotion ? 0 : parallaxX * 0.2,
              y: prefersReducedMotion ? 0 : parallaxY * 0.2,
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background"
            style={{ opacity: fogOpacity }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 52% 42% at 50% 48%, transparent 28%, var(--background) 88%)",
              opacity: fogOpacity,
            }}
          />
        </div>

        <motion.div
          ref={artifactRef}
          className="relative mx-auto w-full max-w-5xl px-5 sm:px-8"
          style={
            prefersReducedMotion
              ? undefined
              : { scale: coreScale, opacity: entryOpacity }
          }
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="pointer-events-none absolute -left-1 top-6 hidden font-mono text-[9px] uppercase tracking-[0.24em] text-muted/40 sm:block md:left-2"
            aria-hidden="true"
          >
            <span>DLMNS / SYSTEMREISE</span>
            <br />
            <span>{currentPhase.code} / {currentPhase.label}</span>
          </div>

          <div
            className="pointer-events-none absolute -right-1 bottom-6 hidden text-right font-mono text-[9px] uppercase tracking-[0.24em] text-muted/40 sm:block md:right-2"
            aria-hidden="true"
          >
            <span>LOGIK / PRODUKTSYSTEM</span>
            <br />
            <span>INTERFACE / DATEN / KI</span>
          </div>

          <motion.div
            className="relative aspect-[5/4] w-full sm:aspect-[4/3] md:aspect-[16/10]"
            style={prefersReducedMotion ? undefined : { scale: entryScale }}
          >
            <div
              className="absolute inset-[3%] rounded-sm border border-border/20"
              aria-hidden="true"
            />
            <div
              className="absolute inset-[3%] opacity-20 blueprint-grid"
              aria-hidden="true"
            />
            <div className="absolute inset-[5%] md:inset-[6%]">
              <CoreCanvas
                scrollProgress={displayProgress}
                mouseX={prefersReducedMotion ? 0 : parallaxX}
                mouseY={prefersReducedMotion ? 0 : parallaxY}
                hoveredPhase={hoveredPhase}
                isMobile={isMobile}
              />
            </div>

            <div
              className="pointer-events-none absolute inset-0 rounded-sm"
              style={{
                background:
                  "linear-gradient(160deg, rgba(197,160,89,0.025) 0%, transparent 38%, rgba(58,138,158,0.018) 100%)",
              }}
              aria-hidden="true"
            />
          </motion.div>

          <div
            className="mt-6 grid grid-cols-5 gap-2 sm:flex sm:justify-center sm:gap-5 md:mt-8 md:gap-12"
            role="list"
            aria-label="DLMNS-Transformationsphasen"
          >
            {PHASES.map((coord, index) => (
              <div
                key={coord.id}
                role="listitem"
                className={cn(
                  "flex min-w-0 flex-col items-center text-center font-mono text-[8px] uppercase tracking-[0.06em] sm:text-[8px] sm:tracking-[0.16em] md:text-[9px] md:tracking-[0.22em]",
                  phase === index
                    ? coord.tone === "gold"
                      ? "text-gold/80"
                      : "text-cyan/70"
                    : "text-muted/30",
                )}
                onMouseEnter={() => setHoveredPhase(coord.id)}
                onMouseLeave={() => setHoveredPhase(null)}
                aria-current={phase === index ? "step" : undefined}
              >
                <span className="opacity-80">{coord.code}</span>
                <span className="mt-0.5 max-w-full truncate text-[7px] tracking-[0.02em] opacity-60 sm:tracking-[0.12em] md:text-[8px]">
                  {coord.label}
                </span>
                <span
                  className={cn(
                    "mt-1.5 block h-px w-3",
                    phase === index
                      ? coord.tone === "gold"
                        ? "bg-gold/40"
                        : "bg-cyan/35"
                      : "bg-border/25",
                  )}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-background/60 to-background"
        aria-hidden="true"
      />

      <div
        className={cn(
          isMobile ? "h-[270vh]" : "h-[400vh]",
          prefersReducedMotion && "hidden",
        )}
        aria-hidden="true"
      />
    </section>
  );
}
