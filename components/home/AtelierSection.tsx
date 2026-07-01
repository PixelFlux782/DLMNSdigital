"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  atelierContent,
  atelierCurrentSystems,
  developerProfile,
  logoAssets,
} from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

function OperatorFrame() {
  return (
    <div className="relative mx-auto w-full max-w-[280px] lg:mx-0">
      <div
        className="pointer-events-none absolute -inset-3 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="relative border border-border/60 bg-background/40">
        <div
          className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-gold/35"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-gold/35"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-gold/35"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-gold/35"
          aria-hidden="true"
        />

        <div className="border-b border-border/50 px-4 py-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-muted">
            Rahmen / Studio
          </p>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.04] via-transparent to-cyan/[0.03]" />
          <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
            <div className="relative flex aspect-[3/2] w-full items-center justify-center overflow-hidden border border-border-strong bg-background/80">
              <Image
                src={logoAssets.main.src}
                alt={logoAssets.main.alt}
                width={logoAssets.main.width}
                height={logoAssets.main.height}
                className="h-full w-full object-cover opacity-90"
                sizes="280px"
              />
            </div>
            {atelierContent.portraitPlaceholder && (
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                DALEMANS / DLMNS
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchitecturePoints() {
  const prefersReducedMotion = useReducedMotion();
  const points = atelierContent.architecturePoints;

  return (
    <div className="relative mt-8 border-t border-border/50 pt-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
        Architekturpunkte
      </p>

      <div className="relative mt-5">
        <div
          className="pointer-events-none absolute left-0 right-0 top-[7px] hidden h-px bg-border/40 sm:block"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-0">
          {points.map((point, index) => (
            <motion.div
              key={point}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.35,
                delay: 0.08 + index * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex items-center gap-3 sm:flex-1 sm:min-w-[calc(33.333%-1rem)] sm:flex-col sm:gap-2 sm:px-2 sm:text-center lg:min-w-0 lg:flex-1"
            >
              <span
                className="relative z-10 flex h-3.5 w-3.5 shrink-0 items-center justify-center border border-gold/40 bg-background"
                aria-hidden="true"
              >
                <span className="h-1 w-1 bg-gold shadow-[0_0_6px_var(--color-gold-glow)]" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/90">
                {point}
              </span>
              {index < points.length - 1 && (
                <span
                  className="font-mono text-[10px] text-muted/35 sm:hidden"
                  aria-hidden="true"
                >
                  ↓
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CurrentSystemsLog() {
  return (
    <div className="mt-10 border border-border/50 bg-background/50">
      <div className="border-b border-border/40 px-4 py-2.5">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-muted">
          Aktuelle Systeme
        </p>
      </div>

      <div className="space-y-0 px-4 py-3 font-mono text-[11px] leading-relaxed">
        {atelierCurrentSystems.map((entry, index) => (
          <div
            key={entry.building}
            className={cn(
              "flex flex-col gap-0.5 py-2 sm:flex-row sm:gap-6",
              index < atelierCurrentSystems.length - 1 && "border-b border-border/25",
            )}
          >
            <p className="text-muted">
              <span className="text-gold/60">SYSTEM</span>
              <span className="text-muted/40"> / </span>
              <span className="text-foreground/85">{entry.building}</span>
            </p>
            <p className="text-muted sm:ml-auto">
              <span className="text-cyan/60">STATUS</span>
              <span className="text-muted/40"> / </span>
              <span className="text-foreground/85">{entry.status}</span>
            </p>
          </div>
        ))}

        <p className="mt-3 border-t border-border/25 pt-3 text-[10px] uppercase tracking-[0.14em] text-muted/45">
          dlmns.digital · DALEMANS · Systemprotokoll
        </p>
      </div>
    </div>
  );
}

function SystemSignals() {
  const prefersReducedMotion = useReducedMotion();
  const facts = developerProfile.trustFacts;

  return (
    <div className="mt-10 border-t border-border/50 pt-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan/70">
        Systemsignale
      </p>

      <div className="relative mt-6 space-y-0">
        <div
          className="pointer-events-none absolute left-[5px] top-3 bottom-3 hidden w-px bg-gradient-to-b from-gold/20 via-cyan/15 to-transparent md:block"
          aria-hidden="true"
        />

        {facts.map((fact, index) => (
          <motion.div
            key={fact}
            initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.4,
              delay: 0.12 + index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex items-start gap-4 py-3 md:pl-8"
          >
            <span
              className={cn(
                "relative z-10 mt-1 flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-full border bg-background",
                index % 2 === 0 ? "border-gold/45" : "border-cyan/40",
              )}
              aria-hidden="true"
            >
              <span
                className={cn(
                  "h-1 w-1 rounded-full",
                  index % 2 === 0 ? "bg-gold" : "bg-cyan",
                )}
              />
            </span>

            <div className="min-w-0 flex-1 border-b border-border/30 pb-3 last:border-b-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted/60">
                Signal {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-foreground md:text-base">
                {fact}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function AtelierSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="atelier"
      eyebrow={atelierContent.eyebrow}
      title="Digitalstudio von DALEMANS"
      description="DLMNS Digital entwickelt digitale Systeme, die Strategie, Design, Entwicklung und Automatisierung verbinden."
      className="border-t border-border/60 bg-surface/20"
      titleClassName="uppercase"
    >
      <motion.div
        className="relative overflow-hidden border border-border/60 bg-background/30"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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

        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-gold/25 via-transparent to-cyan/15"
          aria-hidden="true"
        />

        <div className="relative grid gap-10 p-6 md:p-10 lg:grid-cols-[280px_1fr] lg:gap-16 lg:p-12">
          <OperatorFrame />

          <div className="flex flex-col">
            <div className="flex flex-col gap-2 border-b border-border/50 pb-6 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2">
              {atelierContent.metaLabels.map((label) => (
                <p
                  key={label.key}
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted"
                >
                  <span className="text-gold-muted">{label.key}</span>
                  <span className="text-muted/40"> / </span>
                  <span className="text-foreground/80">{label.value}</span>
                </p>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="font-display text-3xl font-semibold uppercase text-foreground md:text-4xl">
                {atelierContent.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {atelierContent.roles.map((role, index) => (
                  <span key={role} className="flex items-center gap-5">
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-gold-muted">
                      {role}
                    </span>
                    {index < atelierContent.roles.length - 1 && (
                      <span
                        className="hidden h-px w-4 bg-border/50 sm:block"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {atelierContent.bio}
            </p>

            <ArchitecturePoints />
            <CurrentSystemsLog />
            <SystemSignals />
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
