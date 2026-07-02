"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { heroCopy, logoAssets } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 80]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 1.06]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.6, prefersReducedMotion ? 0.6 : 0.25]);
  const lightShift = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -40]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/25 to-transparent" />
        <motion.div
          className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan/[0.045] blur-[120px]"
          style={{ opacity: glowOpacity }}
        />
        <motion.div
          className="absolute right-0 top-1/4 h-[360px] w-[360px] rounded-full bg-cyan/[0.04] blur-[100px]"
          style={{ x: lightShift }}
        />
        <div className="absolute bottom-0 left-0 h-[280px] w-[280px] rounded-full bg-cyan/[0.025] blur-[80px]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 xl:gap-20">
        <div className="relative z-10">
          <motion.p
            className="mb-5 max-w-[19rem] font-mono text-[11px] uppercase leading-relaxed tracking-[0.26em] text-gold-muted sm:max-w-none"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {heroCopy.eyebrow}
          </motion.p>

          <motion.h1
            className="max-w-[11ch] font-display text-4xl font-semibold leading-[1.06] text-foreground sm:max-w-none sm:text-5xl lg:text-[3.75rem] lg:leading-[1.02]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {heroCopy.headline}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-[20rem] text-base leading-relaxed text-muted sm:max-w-xl md:text-lg"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {heroCopy.subline}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button href="#artefakte" size="lg">
              {heroCopy.primaryCta}
              <ArrowDown className="h-4 w-4" />
            </Button>
            <Button href="#kontakt" variant="secondary" size="lg">
              {heroCopy.secondaryCta}
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative mx-auto aspect-[1.06/1] w-full max-w-[22rem] sm:max-w-[34rem]">
            <motion.div
              className="absolute inset-[12%] rounded-full bg-cyan/[0.055] blur-[70px]"
              aria-hidden="true"
              style={{ opacity: glowOpacity }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { scale: [1, 1.05, 1], opacity: [0.5, 0.7, 0.5] }
              }
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -inset-6 rounded-full bg-cyan/[0.035] blur-[90px] md:-inset-10"
              aria-hidden="true"
              animate={
                prefersReducedMotion
                  ? undefined
                  : { scale: [1, 1.08, 1] }
              }
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="relative h-full w-full"
              style={{
                y: imageY,
                scale: imageScale,
              }}
            >
              <div className="relative z-10 h-full border border-border/60 bg-background/55 p-5 shadow-[0_32px_80px_rgba(0,0,0,0.48)] backdrop-blur-xl sm:p-6">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.16]"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
                    backgroundSize: "34px 34px",
                  }}
                  aria-hidden="true"
                />

                <div className="relative flex h-full flex-col justify-between gap-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="overflow-hidden border border-border/70 bg-black/80 px-4 py-3 shadow-[inset_0_1px_0_rgba(237,247,251,0.06)]">
                      <Image
                        src={logoAssets.digital.src}
                        alt={logoAssets.digital.alt}
                        width={logoAssets.digital.width}
                        height={logoAssets.digital.height}
                        priority
                        sizes="220px"
                        className="h-auto w-[11.5rem] object-contain sm:w-[13rem]"
                      />
                    </div>
                    <p className="hidden max-w-[8rem] text-right font-mono text-[9px] uppercase tracking-[0.2em] text-muted/60 sm:block">
                      Systemstudio / DLMNS
                    </p>
                  </div>

                  <div>
                    <p className="font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                      Building Intelligent Systems.
                    </p>
                    <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-muted sm:max-w-sm">
                      Strategie, Interface, Datenstruktur und Automatisierung als ein belastbares System.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {["Eigene Produkte", "Analyse", "Automatisierung"].map(
                      (signal) => (
                        <div
                          key={signal}
                          className="border border-border/50 bg-surface/35 px-3 py-3"
                        >
                          <span className="mb-3 block h-1 w-6 bg-cyan/75" />
                          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                            {signal}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
