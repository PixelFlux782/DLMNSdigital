"use client";

import { motion, useReducedMotion } from "motion/react";
import { trustMetrics } from "@/lib/site";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

export function TrustMetricsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      eyebrow="Glaubwürdigkeit"
      title="Was dahintersteht"
      description="Keine aufgeblähten Versprechen – sondern echte Eigenprojekte, durchgängige Umsetzung und Systeme, die im Einsatz sind."
      className="bg-surface/20"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trustMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Card hover className="flex h-full flex-col gap-3">
              <p className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {metric.value}
              </p>
              <p className="text-sm font-medium text-foreground">
                {metric.label}
              </p>
              <p className="mt-auto text-sm leading-relaxed text-muted">
                {metric.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
