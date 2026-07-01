"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  systemThinkingCopy,
  transformationPhases,
  type TransformationPhaseId,
} from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

function ThinkingFlow({
  activePhase,
  onSelect,
}: {
  activePhase: TransformationPhaseId | null;
  onSelect: (id: TransformationPhaseId | null) => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="relative"
      role="group"
      aria-label="Interaktives Modell digitaler Systeme"
    >
      <div
        className="pointer-events-none absolute inset-x-8 top-1/2 hidden h-px -translate-y-1/2 bg-border/40 md:block"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-0 md:flex-row md:items-stretch md:justify-between">
        {transformationPhases.map((phase, index) => {
          const isActive = activePhase === phase.id;
          const isDimmed = activePhase !== null && !isActive;
          const isGold = phase.accent === "gold";

          return (
            <div key={phase.id} className="relative flex flex-1 flex-col items-center">
              {index > 0 && (
                <div
                  className="flex items-center py-2 md:hidden"
                  aria-hidden="true"
                >
                  <span className="font-mono text-[10px] text-muted/40">↓</span>
                </div>
              )}

              <button
                type="button"
                className={cn(
                  "group relative w-full border px-5 py-6 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 md:px-4 md:py-8 md:text-center",
                  isActive
                    ? isGold
                      ? "border-gold/35 bg-gold/[0.04]"
                      : "border-cyan/30 bg-cyan/[0.03]"
                    : "border-border/50 bg-transparent hover:border-border-strong hover:bg-surface/30",
                  isDimmed && "opacity-35",
                )}
                aria-pressed={isActive}
                aria-expanded={isActive}
                aria-controls={`thinking-detail-${phase.id}`}
                onMouseEnter={() => onSelect(phase.id)}
                onMouseLeave={() => onSelect(null)}
                onFocus={() => onSelect(phase.id)}
                onBlur={() => onSelect(null)}
                onClick={() => onSelect(isActive ? null : phase.id)}
              >
                <p
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-[0.22em]",
                    isGold ? "text-gold-muted" : "text-cyan/75",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p
                  className={cn(
                    "mt-2 font-display text-lg font-semibold uppercase tracking-wide md:text-xl",
                    isActive ? "text-foreground" : "text-foreground/80",
                  )}
                >
                  {phase.label}
                </p>

                <span
                  className={cn(
                    "mx-auto mt-4 block h-px w-8 transition-all duration-300",
                    isActive
                      ? isGold
                        ? "w-12 bg-gold/60"
                        : "w-12 bg-cyan/50"
                      : "bg-border/50 group-hover:w-10",
                  )}
                  aria-hidden="true"
                />
              </button>

              {index < transformationPhases.length - 1 && (
                <span
                  className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 font-mono text-[10px] text-muted/30 md:block"
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </div>
          );
        })}
      </div>

      <motion.p
        className="mt-8 text-center font-mono text-xs tracking-[0.12em] text-muted/70"
        animate={prefersReducedMotion ? undefined : { opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        Komplexität → Struktur → Orientierung → System
      </motion.p>
    </div>
  );
}

function ExamplePanel({
  activePhase,
}: {
  activePhase: TransformationPhaseId | null;
}) {
  const phase = transformationPhases.find((p) => p.id === activePhase);

  return (
    <div
      className="relative min-h-[160px] border border-border/50 bg-background/30 px-6 py-7 md:px-8"
      aria-live="polite"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <AnimatePresence mode="wait">
        {phase ? (
          <motion.div
            key={phase.id}
            id={`thinking-detail-${phase.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <p
              className={cn(
                "font-mono text-[10px] uppercase tracking-[0.22em]",
                phase.accent === "gold" ? "text-gold" : "text-cyan",
              )}
            >
              Beispiele / {phase.label}
            </p>
            <ul className="mt-5 space-y-3">
              {phase.examples.map((example, index) => (
                <motion.li
                  key={example}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.25 }}
                  className="flex items-start gap-3 text-sm text-foreground md:text-base"
                >
                  <span
                    className={cn(
                      "mt-1 font-mono text-[10px]",
                      phase.accent === "gold" ? "text-gold" : "text-cyan",
                    )}
                    aria-hidden="true"
                  >
                    →
                  </span>
                  {example}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative flex h-full flex-col justify-center"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              Systemmodell
            </p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted md:text-base">
              {systemThinkingCopy.description} Wählen Sie eine Phase, um die
              Logik in konkreten Systemen zu sehen.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SystemThinkingSection() {
  const [activePhase, setActivePhase] = useState<TransformationPhaseId | null>(
    null,
  );
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="denkweise"
      eyebrow={systemThinkingCopy.eyebrow}
      title={systemThinkingCopy.title}
      description={systemThinkingCopy.description}
      className="border-t border-border/60 bg-surface/20"
      titleClassName="uppercase"
    >
      <div className="flex flex-col gap-10">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <ThinkingFlow activePhase={activePhase} onSelect={setActivePhase} />
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <ExamplePanel activePhase={activePhase} />
        </motion.div>
      </div>
    </Section>
  );
}
