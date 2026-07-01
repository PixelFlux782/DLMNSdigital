"use client";

import { motion, useReducedMotion } from "motion/react";
import { architectureLayers } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export function ArchitectureLayers() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="architektur"
      eyebrow="Architektur"
      title="Von Strategie bis Systemlogik"
      description="Jedes digitale Produkt von DLMNS entsteht in klaren Ebenen: Strategie, Interface, Datenmodell, Automatisierung und Produktlogik."
      className="border-t border-border/60 bg-surface/20"
      titleClassName="uppercase"
    >
      <div className="relative mx-auto max-w-3xl">
        <div
          className="pointer-events-none absolute left-[1.125rem] top-8 bottom-8 hidden w-px md:left-6 md:block"
          aria-hidden="true"
        >
          <div className="h-full w-full bg-gradient-to-b from-cyan/20 via-gold/15 to-gold/10" />
        </div>

        <div className="flex flex-col">
          {architectureLayers.map((layer, index) => {
            const isGold = layer.accent === "gold";
            const isLast = index === architectureLayers.length - 1;
            const depth = architectureLayers.length - index;

            return (
              <motion.div
                key={layer.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                <div
                  className="relative pl-0 md:pl-16"
                  style={{
                    transform: prefersReducedMotion
                      ? undefined
                      : `translateX(${(depth - 1) * 4}px)`,
                  }}
                >
                  <div
                    className={cn(
                      "relative border border-border/50 bg-background/30 px-6 py-7 md:px-8 md:py-8",
                      "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px",
                      isGold
                        ? "before:bg-gradient-to-r before:from-gold/30 before:to-transparent"
                        : "before:bg-gradient-to-r before:from-cyan/25 before:to-transparent",
                    )}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.2]"
                      style={{
                        backgroundImage:
                          "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                      }}
                      aria-hidden="true"
                    />

                    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p
                          className={cn(
                            "font-mono text-[10px] uppercase tracking-[0.24em]",
                            isGold ? "text-gold-muted" : "text-cyan/80",
                          )}
                        >
                          {layer.layerCode} / {layer.layerLabel}
                        </p>
                        <h3 className="mt-2 font-display text-2xl font-semibold uppercase text-foreground md:text-3xl">
                          {layer.title}
                        </h3>
                      </div>

                      <span
                        className={cn(
                          "hidden font-mono text-[9px] uppercase tracking-[0.2em] sm:block",
                          isGold ? "text-gold/40" : "text-cyan/35",
                        )}
                        aria-hidden="true"
                      >
                        Tiefe / {String(depth).padStart(2, "0")}
                      </span>
                    </div>

                    <p className="relative mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
                      {layer.description}
                    </p>

                    <div
                      className={cn(
                        "absolute -left-px top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center md:flex",
                      )}
                      aria-hidden="true"
                    >
                      <span
                        className={cn(
                          "flex h-3 w-3 items-center justify-center rounded-full border-2 bg-background",
                          isGold ? "border-gold/50" : "border-cyan/45",
                        )}
                      >
                        <span
                          className={cn(
                            "h-1 w-1 rounded-full",
                            isGold ? "bg-gold" : "bg-cyan",
                          )}
                        />
                      </span>
                    </div>
                  </div>
                </div>

                {!isLast && (
                  <div
                    className="flex items-center gap-3 py-3 pl-6 md:pl-16"
                    aria-hidden="true"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/40">
                      ▼
                    </span>
                    <span className="h-px flex-1 max-w-xs bg-border/40" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
