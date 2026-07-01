"use client";

import { motion, useReducedMotion } from "motion/react";
import { insideTheMachineLayers } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

function LayerBlueprint({
  layer,
  index,
}: {
  layer: (typeof insideTheMachineLayers)[number];
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const isGold = layer.accent === "gold";
  const isLast = index === insideTheMachineLayers.length - 1;

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
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
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:gap-10">
          <div className="lg:w-48 lg:shrink-0">
            <p
              className={cn(
                "font-mono text-[10px] uppercase tracking-[0.24em]",
                isGold ? "text-gold-muted" : "text-cyan/80",
              )}
            >
              {layer.layerCode}
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold uppercase tracking-tight text-foreground md:text-3xl">
              {layer.title}
            </h3>
          </div>

          <div className="grid flex-1 gap-5 sm:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Komponenten
              </p>
              <ul className="mt-3 space-y-2">
                {layer.components.map((component) => (
                  <li
                    key={component}
                    className="flex items-center gap-2 font-mono text-[11px] text-foreground/85"
                  >
                    <span
                      className={cn(
                        "h-1 w-1 shrink-0",
                        isGold ? "bg-gold/70" : "bg-cyan/70",
                      )}
                      aria-hidden="true"
                    />
                    {component}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Relationen
              </p>
              <ul className="mt-3 space-y-2">
                {layer.relations.map((relation) => (
                  <li
                    key={relation}
                    className="font-mono text-[10px] leading-relaxed text-muted"
                  >
                    {relation}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Systemfluss
              </p>
              <div
                className={cn(
                  "mt-3 border px-3 py-2.5 font-mono text-[10px] leading-relaxed",
                  isGold
                    ? "border-gold/15 bg-gold/[0.02] text-gold-light/80"
                    : "border-cyan/12 bg-cyan/[0.02] text-foreground/80",
                )}
              >
                {layer.flow}
              </div>
            </div>
          </div>
        </div>

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

      {!isLast && (
        <div
          className="flex items-center gap-3 py-3 pl-6 md:pl-8"
          aria-hidden="true"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/40">
            ↓
          </span>
          <span className="h-px flex-1 max-w-xs bg-border/40" />
        </div>
      )}
    </motion.div>
  );
}

export function InsideTheMachine() {
  return (
    <Section
      id="inside-the-machine"
      eyebrow="Inside the Machine"
      title="Below the interface"
      description="A system view of a real product: layers, relations and data flows behind the visible experience."
      titleClassName="uppercase tracking-tight"
    >
      <div className="relative mx-auto max-w-4xl">
        <div
          className="pointer-events-none absolute left-[1.125rem] top-8 bottom-8 hidden w-px md:left-6 md:block"
          aria-hidden="true"
        >
          <div className="h-full w-full bg-gradient-to-b from-cyan/20 via-gold/15 to-gold/10" />
        </div>

        <div className="relative mb-8 border border-border/40 bg-background/20 px-5 py-4 md:px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Reference system / Shophebel
          </p>
          <p className="mt-2 font-mono text-[11px] leading-relaxed text-foreground/80">
            Interface → Datenmodell → Automatisierung → Produktlogik
          </p>
        </div>

        <div className="flex flex-col md:pl-16">
          {insideTheMachineLayers.map((layer, index) => (
            <LayerBlueprint key={layer.id} layer={layer} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}
