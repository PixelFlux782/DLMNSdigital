"use client";

import { motion, useReducedMotion } from "motion/react";
import { techStack } from "@/lib/site";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

export function TechStackSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="tech-stack"
      eyebrow="Technologie"
      title="Modern, belastbar, durchdacht"
      description="Ich arbeite mit einem bewusst gewählten Stack: schnell in der Entwicklung, stabil im Betrieb und offen für intelligente Erweiterungen."
      className="bg-surface/20"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {techStack.map((item, index) => (
          <motion.div
            key={item.name}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Card
              hover
              className="flex items-center justify-between gap-4 px-5 py-4"
            >
              <span className="font-medium text-foreground">{item.name}</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                {item.category}
              </span>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
