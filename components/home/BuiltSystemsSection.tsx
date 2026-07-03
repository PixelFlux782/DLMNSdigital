"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { builtSystems, type BuiltSystem, type BuiltSystemStatus } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const statusStyles: Record<
  BuiltSystemStatus,
  { label: string; className: string }
> = {
  LIVE: {
    label: "LIVE",
    className: "border-cyan/25 bg-cyan/[0.06] text-cyan",
  },
  "IN ENTWICKLUNG": {
    label: "IN ENTWICKLUNG",
    className: "border-gold/25 bg-gold/[0.06] text-gold",
  },
  KONZEPT: {
    label: "VORBEREITET",
    className: "border-border bg-background/50 text-muted",
  },
};

function ArtifactEntry({
  system,
  index,
  isLast,
}: {
  system: BuiltSystem;
  index: number;
  isLast: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const isGold = system.accent === "gold";
  const status = statusStyles[system.status];

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      <div className="relative border border-border/50 bg-background/30 px-6 py-7 md:px-8 md:py-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />

        <div
          className={cn(
            "pointer-events-none absolute left-0 top-0 h-full w-px",
            isGold ? "bg-gold/20" : "bg-cyan/15",
          )}
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-10">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                Produkt {String(index + 1).padStart(2, "0")}
              </p>
              <span
                className={cn(
                  "inline-flex px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em]",
                  status.className,
                )}
              >
                {status.label}
              </span>
            </div>

            <h3 className="mt-3 font-display text-2xl font-semibold uppercase text-foreground md:text-3xl">
              {system.title}
            </h3>

            <p
              className={cn(
                "mt-2 font-mono text-[11px] uppercase tracking-[0.14em]",
                isGold ? "text-gold-muted" : "text-cyan/75",
              )}
            >
              {system.systemType}
            </p>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
              {system.description}
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-4 md:w-56 md:items-end md:text-right">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Architektur
              </p>
              <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-foreground/85">
                {system.technology}
              </p>
            </div>

            {system.url ? (
              <Link
                href={system.url}
                className={cn(
                  "group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors",
                  isGold
                    ? "text-gold hover:text-gold-light"
                    : "text-cyan hover:text-cyan-light",
                )}
              >
                {system.cta}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <Link
                href="#kontakt"
                className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-cyan transition-colors hover:text-cyan-light"
              >
                {system.cta}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {!isLast && (
        <div
          className="flex items-center gap-3 py-4 pl-6 md:pl-8"
          aria-hidden="true"
        >
          <span className="font-mono text-[10px] text-muted/35">│</span>
          <span className="h-px flex-1 max-w-xs bg-border/30" />
        </div>
      )}
    </motion.div>
  );
}

export function BuiltSystemsSection() {
  return (
    <Section
      id="artefakte"
      eyebrow="Produktwelt"
      title="Digitale Produkte von DLMNS"
      description="Eigene Systeme und vorbereitete Produktarchitekturen für Analyse, Bedeutung, Prozesse und digitale Wertschöpfung."
      className="border-t border-border/60 bg-surface/20"
      titleClassName="uppercase"
    >
      <div className="relative mx-auto max-w-3xl">
        {builtSystems.map((system, index) => (
          <ArtifactEntry
            key={system.id}
            system={system}
            index={index}
            isLast={index === builtSystems.length - 1}
          />
        ))}

        <div className="mt-10 flex justify-center">
          <Link
            href="/systeme"
            className="group inline-flex items-center gap-2 border border-border bg-surface/50 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground transition-colors hover:border-cyan/35 hover:text-cyan-light"
          >
            Alle Systeme ansehen
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
