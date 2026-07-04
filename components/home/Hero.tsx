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
import { backgroundAssets, heroCopy, logoAssets } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const systemModules = [
  "Shophebel",
  "Symbolraum",
  "Flowbase",
  "Custom Systems",
] as const;

const systemLayers = [
  {
    title: "Interface",
    detail: "Bedienbare Oberflächen und Dashboards",
    nodes: ["Analyse", "Interface"],
  },
  {
    title: "Datenmodell",
    detail: "Entitäten, Scores, Zustände, Beziehungen",
    nodes: ["Datenmodell", "Produktlogik"],
  },
  {
    title: "Automatisierung",
    detail: "Workflows, Schnittstellen und KI-Auswertung",
    nodes: ["Automatisierung", "KI-Ebene"],
  },
] as const;

const proofSignals = [
  "Eigene Produkte",
  "Analyse-Engines",
  "Automatisierte Prozesse",
  "Skalierbare Websysteme",
] as const;

const heroTrustSignals = [
  { label: "Wer", value: "Digitalstudio von DALEMANS" },
  { label: "Baut", value: "Webprodukte, Analyse und Automatisierung" },
  { label: "Live", value: "Shophebel im MVP-Betrieb" },
] as const;

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 80]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 1.06]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 52]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.03, prefersReducedMotion ? 1.03 : 1.08]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 1], [0.9, prefersReducedMotion ? 0.9 : 0.54]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute inset-0"
          style={{ y: backgroundY, scale: backgroundScale, opacity: backgroundOpacity }}
        >
          <Image
            src={backgroundAssets.cinematic.src}
            alt={backgroundAssets.cinematic.alt}
            fill
            preload
            sizes="100vw"
            className="object-cover object-[23%_center] md:object-[50%_center]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-background/46" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_64%_52%_at_36%_42%,rgba(3,7,11,0.14)_0%,rgba(3,7,11,0.66)_66%,rgba(3,7,11,0.94)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-background via-background/72 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-b from-transparent via-background/78 to-background" />
        <div className="absolute inset-y-0 left-0 w-[72%] bg-gradient-to-r from-background/70 via-background/32 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/25 to-transparent" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100svh-7rem)] max-w-6xl items-center gap-12 px-5 sm:px-8 md:min-h-[calc(100svh-9rem)] lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 xl:gap-20">
        <div className="relative z-10">
          <motion.p
            className="mb-5 max-w-[19rem] font-mono text-[11px] uppercase leading-relaxed tracking-[0.26em] text-gold-light/80 sm:max-w-none"
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

          <motion.div
            className="mt-8 grid gap-2 border-y border-border/45 py-4 sm:grid-cols-3"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {heroTrustSignals.map((signal) => (
              <div key={signal.label} className="min-w-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-cyan/75">
                  {signal.label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/86">
                  {signal.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative mx-auto aspect-[0.92/1] w-full max-w-[23rem] sm:aspect-[1.08/1] sm:max-w-[35rem] lg:aspect-[1.02/1]">
            <motion.div
              className="relative h-full w-full"
              style={{
                y: imageY,
                scale: imageScale,
              }}
            >
              <div className="relative z-10 h-full overflow-hidden border border-border/50 bg-background/56 p-4 shadow-[0_32px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-6">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.12]"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
                    backgroundSize: "34px 34px",
                  }}
                  aria-hidden="true"
                />
                <Image
                  src={logoAssets.digital.src}
                  alt=""
                  width={logoAssets.digital.width}
                  height={logoAssets.digital.height}
                  aria-hidden="true"
                  sizes="360px"
                  className="pointer-events-none absolute -right-20 top-7 w-[22rem] opacity-[0.055] grayscale sm:-right-12 sm:w-[25rem]"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/45 to-transparent"
                  aria-hidden="true"
                />

                <div className="relative flex h-full flex-col gap-4 sm:gap-5">
                  <div className="flex items-start justify-between gap-4 border-b border-border/50 pb-4">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan/75 sm:text-[10px]">
                        DLMNS Systemkonsole
                      </p>
                      <p className="mt-2 max-w-[18rem] font-display text-xl font-semibold leading-tight text-foreground sm:text-2xl">
                        Produktarchitektur für echte Arbeitsabläufe.
                      </p>
                    </div>
                    <span className="shrink-0 border border-cyan/20 bg-cyan/[0.04] px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-light/80">
                      Live-Logik
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {systemModules.map((module, index) => (
                      <div
                        key={module}
                        className={cn(
                          "border bg-surface/28 px-3 py-3",
                          index === 0
                            ? "border-cyan/35 text-cyan-light"
                            : "border-border/50 text-muted",
                        )}
                      >
                        <span className="mb-3 block h-px w-8 bg-current opacity-50" />
                        <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em]">
                          {module}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="relative flex-1 border border-border/50 bg-background/38 p-3 sm:p-4">
                    <div className="absolute left-4 right-4 top-1/2 h-px bg-border/50" aria-hidden="true" />
                    <div className="absolute bottom-4 top-4 left-1/2 w-px bg-border/50" aria-hidden="true" />
                    <div className="relative grid h-full gap-3">
                      {systemLayers.map((layer, index) => (
                        <div
                          key={layer.title}
                          className="grid gap-3 sm:grid-cols-[0.8fr_1.2fr] sm:items-center"
                        >
                          <div className="border border-border/45 bg-surface/30 px-3 py-3">
                            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                              Ebene {String(index + 1).padStart(2, "0")}
                            </p>
                            <p className="mt-1 font-display text-base font-semibold text-foreground">
                              {layer.title}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-muted">
                              {layer.detail}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {layer.nodes.map((node) => (
                              <div
                                key={node}
                                className="border border-cyan/15 bg-cyan/[0.025] px-3 py-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.13em] text-cyan-light/80"
                              >
                                {node}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-border/50 pt-4 sm:grid-cols-4">
                    {proofSignals.map((signal) => (
                      <p
                        key={signal}
                        className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.13em] text-muted/80"
                      >
                        {signal}
                      </p>
                    ))}
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
