"use client";

import { Database, Layers, Sparkles, Workflow } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { systemLayers } from "@/lib/site";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const layerIcons = {
  interface: Layers,
  data: Database,
  automation: Sparkles,
  logic: Workflow,
} as const;

export function SystemArchitectureSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="systeme"
      eyebrow="Architektur"
      title="Von Oberfläche bis Systemlogik"
      description="Ich baue digitale Produkte in Ebenen – nicht als lose zusammengesetzte Seiten, sondern als durchdachte Systeme mit klarer Struktur."
    >
      <div className="relative">
        <div
          className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border-strong to-transparent lg:block"
          aria-hidden="true"
        />

        <div className="grid gap-4 md:grid-cols-2 lg:gap-5">
          {systemLayers.map((layer, index) => {
            const Icon = layerIcons[layer.id as keyof typeof layerIcons];
            const isCyan = layer.accent === "cyan";

            return (
              <motion.div
                key={layer.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Card
                  hover
                  className={cn(
                    "relative h-full overflow-hidden",
                    isCyan
                      ? "hover:border-cyan/25"
                      : "hover:border-gold/25",
                  )}
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl",
                      isCyan ? "bg-cyan/5" : "bg-gold/5",
                    )}
                    aria-hidden="true"
                  />

                  <div className="relative flex items-start gap-4">
                    <div
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border",
                        isCyan
                          ? "border-cyan/20 bg-cyan/5 text-cyan"
                          : "border-gold/20 bg-gold/5 text-gold",
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                        Ebene {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
                        {layer.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {layer.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
