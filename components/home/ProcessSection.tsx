"use client";

import { motion, useReducedMotion } from "motion/react";
import { processSteps } from "@/lib/site";
import { Section } from "@/components/ui/Section";

export function ProcessSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="prozess"
      eyebrow="Prozess"
      title="Vom Verständnis zum fertigen Produkt"
      description="Ein klarer Ablauf – ohne Buzzwords. Ich arbeite Schritt für Schritt und halte den Fokus auf Wirkung, nicht auf Oberflächen."
    >
      <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div
          className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent lg:block"
          aria-hidden="true"
        />

        {processSteps.map((step, index) => (
          <motion.div
            key={step.step}
            className="relative"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-surface-elevated font-mono text-xs text-gold">
                {step.step}
              </span>
              <span className="hidden h-px flex-1 bg-border lg:block" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
