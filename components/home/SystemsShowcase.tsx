"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { systemCaseStudies, type SystemCaseStudy } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { ShophebelSnapshot, SymbolraumSnapshot } from "./SystemSnapshots";

function FlowConnector({ accent }: { accent: "gold" | "cyan" }) {
  return (
    <div className="flex flex-col items-center py-0.5" aria-hidden="true">
      <span
        className={cn(
          "h-4 w-px",
          accent === "gold" ? "bg-gold/25" : "bg-cyan/20",
        )}
      />
      <span className="font-mono text-[10px] text-muted/40">↓</span>
      <span
        className={cn(
          "h-4 w-px",
          accent === "gold" ? "bg-gold/25" : "bg-cyan/20",
        )}
      />
    </div>
  );
}

function SectionLabel({
  code,
  label,
  accent,
}: {
  code: string;
  label: string;
  accent: "gold" | "cyan";
}) {
  return (
    <p
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.22em]",
        accent === "gold" ? "text-gold-muted" : "text-cyan/75",
      )}
    >
      {code} / {label}
    </p>
  );
}

function SystemSnapshotPanel({ study }: { study: SystemCaseStudy }) {
  if (study.projectId === "shophebel") {
    return <ShophebelSnapshot />;
  }
  return <SymbolraumSnapshot />;
}

function SystemCaseStudyBlock({
  study,
  index,
}: {
  study: SystemCaseStudy;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const isGold = study.accent === "gold";

  return (
    <motion.article
      id={study.projectId}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      <div className="relative overflow-hidden border border-border/60 bg-background/40">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />

        <div
          className={cn(
            "pointer-events-none absolute left-0 top-0 h-full w-px",
            isGold ? "bg-gold/15" : "bg-cyan/12",
          )}
          aria-hidden="true"
        />

        <div className="relative px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-col gap-4 border-b border-border/50 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
                System {String(index + 1).padStart(2, "0")} / Produkt
              </p>
              <h3 className="mt-2 font-display text-3xl font-semibold uppercase text-foreground md:text-4xl">
                {study.name}
              </h3>
            </div>
            <span
              className={cn(
                "inline-flex w-fit font-mono text-[10px] uppercase tracking-[0.18em]",
                isGold ? "text-gold" : "text-cyan",
              )}
            >
              {study.statusLabel}
            </span>
          </div>

          <div className="mt-10 space-y-10">
            <div>
              <SectionLabel code="01" label="Systemansicht" accent={study.accent} />
              <div className="mt-4">
                <SystemSnapshotPanel study={study} />
              </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
              <div>
                <SectionLabel code="02" label="Systemfluss" accent={study.accent} />
                <div className="mt-5 flex flex-col items-start">
                  {study.flowSteps.map((step, stepIndex) => (
                    <div key={step} className="w-full">
                      <div
                        className={cn(
                          "border px-4 py-3 font-display text-base font-semibold uppercase tracking-wide md:text-lg",
                          isGold
                            ? "border-gold/20 bg-gold/[0.03] text-gold-light/90"
                            : "border-cyan/15 bg-cyan/[0.02] text-foreground",
                        )}
                      >
                        {step}
                      </div>
                      {stepIndex < study.flowSteps.length - 1 && (
                        <FlowConnector accent={study.accent} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel
                  code="03"
                  label="Technische Architektur"
                  accent={study.accent}
                />
                <div className="relative mt-5">
                  <div
                    className="pointer-events-none absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-border-strong to-transparent"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col pl-8">
                    {study.architectureStack.map((layer, layerIndex) => (
                      <div key={layer} className="relative">
                        <span
                          className={cn(
                            "absolute -left-[1.375rem] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border bg-background",
                            isGold ? "border-gold/50" : "border-cyan/45",
                          )}
                          aria-hidden="true"
                        >
                          <span
                            className={cn(
                              "absolute inset-[2px] rounded-full",
                              isGold ? "bg-gold/70" : "bg-cyan/70",
                            )}
                          />
                        </span>
                        <div className="border border-border/40 bg-background/30 px-4 py-3">
                          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                            Ebene {String(layerIndex + 1).padStart(2, "0")}
                          </p>
                          <p className="mt-1 font-display text-lg font-semibold uppercase tracking-wide text-foreground">
                            {layer}
                          </p>
                        </div>
                        {layerIndex < study.architectureStack.length - 1 && (
                          <FlowConnector accent={study.accent} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border/50 pt-8">
              <SectionLabel code="04" label="Ergebnis" accent={study.accent} />
              <p className="mt-4 max-w-2xl font-display text-2xl font-semibold uppercase text-foreground md:text-3xl">
                {study.outcome}
              </p>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-border/50 pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
              Systemstatus / {study.statusLabel}
            </p>
            <Link
              href={study.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group inline-flex items-center gap-2 text-sm font-medium transition-colors",
                isGold
                  ? "text-gold hover:text-gold-light"
                  : "text-cyan hover:text-cyan-light",
              )}
            >
              System live ansehen
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function SystemsShowcase() {
  return (
    <Section
      id="systeme"
      eyebrow="Systeme"
      title="Systeme in der Praxis"
      description="Ausgewählte Produktarchitekturen von DLMNS: sichtbare Interfaces, Systemflüsse, technische Ebenen und konkrete Ergebnisse."
      titleClassName="uppercase"
    >
      <div className="flex flex-col gap-16 md:gap-20">
        {systemCaseStudies.map((study, index) => (
          <SystemCaseStudyBlock key={study.projectId} study={study} index={index} />
        ))}
      </div>

      <div className="mt-14 text-center">
        <Button href="#kontakt" variant="secondary">
          System anfragen
        </Button>
      </div>
    </Section>
  );
}
