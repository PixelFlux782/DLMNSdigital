"use client";

import { motion, useReducedMotion } from "motion/react";
import { whyCustomPoints } from "@/lib/site";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

export function WhyCustomSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      eyebrow="Warum nicht Baukasten?"
      title="Individuelle Systeme statt Template-Lösungen"
      description="Baukästen sind schnell – aber sie begrenzen Produktlogik, Performance und langfristige Erweiterbarkeit. Ich setze auf maßgeschneiderte digitale Werkzeuge."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {whyCustomPoints.map((point, index) => (
          <motion.div
            key={point.title}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={index === 4 ? "md:col-span-2 lg:col-span-1" : undefined}
          >
            <Card hover className="h-full">
              <h3 className="font-display text-base font-semibold text-foreground">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {point.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
