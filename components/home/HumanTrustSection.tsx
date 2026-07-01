"use client";

import { User } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { developerProfile } from "@/lib/site";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

export function HumanTrustSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="ueber-mich"
      eyebrow="About"
      title="Systems, not isolated surfaces"
      description="DLMNS Digital is the digital branch of DLMNS, connecting design, code, AI and product logic in one system practice."
      className="bg-surface/20"
    >
      <div className="grid items-start gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="surface-panel relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl lg:mx-0">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-cyan/4" />
            <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-border-strong bg-background/80">
                <User className="h-10 w-10 text-muted" aria-hidden="true" />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                Profilbild folgt
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-6"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {developerProfile.name}
            </h3>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-gold-muted">
              {developerProfile.role}
            </p>
          </div>

          <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {developerProfile.bio}
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {developerProfile.trustFacts.map((fact, index) => (
              <motion.div
                key={fact}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.4,
                  delay: 0.15 + index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Card className="flex h-full items-center gap-3 px-4 py-3.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold shadow-[0_0_8px_var(--color-gold-glow)]" />
                  <span className="text-sm text-foreground">{fact}</span>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
