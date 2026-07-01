"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ctaCopy, siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function CTASection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section id="kontakt" className="pb-28 md:pb-36">
      <div
        className="pointer-events-none mx-auto mb-10 flex max-w-3xl flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted/40">
          System flow
        </span>
        <span className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-border-strong to-transparent" />
        <span className="font-mono text-[10px] text-muted/35">▼</span>
      </div>

      <motion.div
        className="relative overflow-hidden border border-border/60 bg-background/30"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"
          aria-hidden="true"
        />

        <div className="relative border-b border-border/50 px-6 py-4 md:px-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-muted">
              {ctaCopy.eyebrow}
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {ctaCopy.flowMeta.map((item) => (
                <p
                  key={item.key}
                  className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
                >
                  <span className="text-cyan/70">{item.key}</span>
                  <span className="text-muted/40"> / </span>
                  <span className="text-foreground/75">{item.value}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="relative px-6 py-12 md:px-10 md:py-16 lg:py-20">
          <h2 className="max-w-3xl font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl md:leading-[1.12] lg:text-[2.75rem]">
            {ctaCopy.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg md:leading-8">
            {ctaCopy.description}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              href={`mailto:${siteConfig.email}?subject=DLMNS%20Digital%20Project`}
              size="lg"
            >
              {ctaCopy.primaryCta}
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button
              href={`mailto:${siteConfig.email}?subject=DLMNS%20Digital%20First%20Look`}
              variant="secondary"
              size="lg"
            >
              {ctaCopy.secondaryCta}
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>

          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-muted/55">
            Entry / DLMNS Digital ·{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-foreground/70 underline decoration-border underline-offset-4 transition-colors hover:text-gold-light"
            >
              {siteConfig.email}
            </a>
          </p>
        </div>
      </motion.div>
    </Section>
  );
}
