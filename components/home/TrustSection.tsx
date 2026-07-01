"use client";

import { CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { trustPoints } from "@/lib/site";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

export function TrustSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      eyebrow="Vertrauen"
      title="Gebaut für echte Projekte"
      description="Keine leeren Versprechen – sondern durchdachte Umsetzung, klare Kommunikation und Produkte, die im Alltag funktionieren."
      className="bg-surface/20"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {trustPoints.map((point, index) => (
          <motion.div
            key={point}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Card className="flex h-full items-start gap-4">
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-gold"
                aria-hidden="true"
              />
              <p className="text-sm leading-relaxed text-foreground md:text-base">
                {point}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
