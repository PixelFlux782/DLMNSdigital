"use client";

import { motion, useReducedMotion } from "motion/react";
import { architectureLayers } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const architectureSignals = [
  "Eigene Produkte",
  "Analyse-Engines",
  "Produktlogik",
  "KI-gestützte Auswertung",
  "Skalierbare Websysteme",
] as const;

export function ArchitectureLayers() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="architektur"
      eyebrow="Architektur"
      title="Systemarchitektur statt Einzelbausteine."
      description="DLMNS verbindet Interface, Datenmodell, Automatisierung und Produktlogik zu digitalen Werkzeugen, die im Alltag funktionieren."
      className="overflow-hidden border-t border-border/60 bg-surface/20"
    >
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-0 -mx-8 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
          aria-hidden="true"
        />

        <div className="relative mb-6 grid gap-2 border border-border/50 bg-background/35 p-3 sm:grid-cols-5 sm:p-4">
          {architectureSignals.map((signal) => (
            <p
              key={signal}
              className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.13em] text-muted/80"
            >
              {signal}
            </p>
          ))}
        </div>

        <div className="relative grid gap-4 lg:grid-cols-2">
          {architectureLayers.map((layer, index) => {
            const isGold = layer.accent === "gold";

            return (
              <motion.article
                key={layer.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative min-h-full"
              >
                <div
                  className={cn(
                    "relative h-full overflow-hidden border border-border/50 bg-background/42 p-5 transition-colors duration-500 md:p-6",
                    isGold ? "hover:border-gold/25" : "hover:border-cyan/25",
                  )}
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-x-0 top-0 h-px",
                      isGold
                        ? "bg-gradient-to-r from-gold/45 to-transparent"
                        : "bg-gradient-to-r from-cyan/45 to-transparent",
                    )}
                    aria-hidden="true"
                  />

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p
                          className={cn(
                            "font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em]",
                            isGold ? "text-gold-muted" : "text-cyan/80",
                          )}
                        >
                          {layer.layerCode} / {layer.layerLabel}
                        </p>
                        <h3 className="mt-2 font-display text-2xl font-semibold text-foreground md:text-3xl">
                          {layer.title}
                        </h3>
                      </div>

                      <span
                        className={cn(
                          "hidden shrink-0 border px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] sm:block",
                          isGold ? "border-gold/15 text-gold/45" : "border-cyan/15 text-cyan/45",
                        )}
                        aria-hidden="true"
                      >
                        Ebene {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
                      {layer.description}
                    </p>

                    <div className="mt-6">
                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted/70">
                        Komponenten
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {layer.components.map((component) => (
                          <span
                            key={component}
                            className={cn(
                              "border px-2.5 py-1.5 text-xs leading-relaxed",
                              isGold
                                ? "border-gold/15 bg-gold/[0.03] text-gold-light/80"
                                : "border-cyan/15 bg-cyan/[0.025] text-cyan-light/80",
                            )}
                          >
                            {component}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 border-t border-border/50 pt-5 md:grid-cols-2">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted/70">
                          Nutzen
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/86">
                          {layer.benefit}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted/70">
                          Produktbezug
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {layer.reference}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="relative mt-6 border border-border/50 bg-background/35 p-5 md:p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan/75">
            Ergebnis
          </p>
          <p className="mt-3 max-w-3xl font-display text-xl font-semibold leading-snug text-foreground md:text-2xl">
            DLMNS baut nicht nur Oberflächen, sondern vollständige digitale Systeme:
            sichtbar im Interface, belastbar im Datenmodell, schneller durch
            Automatisierung und skalierbar durch Produktlogik.
          </p>
        </div>
      </div>
    </Section>
  );
}
