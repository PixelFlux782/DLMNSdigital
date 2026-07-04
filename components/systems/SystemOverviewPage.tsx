import Link from "next/link";
import { ArrowUpRight, Layers3 } from "lucide-react";
import { systemsOverview } from "@/lib/systems";
import { type BuiltSystemStatus } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const statusLabels: Record<BuiltSystemStatus, string> = {
  LIVE: "Live",
  "IN ENTWICKLUNG": "In Entwicklung",
  KONZEPT: "Konzept",
};

export function SystemOverviewPage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="relative overflow-hidden border-b border-border/60 py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-[0.07]" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <div className="max-w-3xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-muted">
                {systemsOverview.eyebrow}
              </p>
              <h1 className="mt-5 max-w-[12ch] font-display text-4xl font-semibold leading-[1.05] text-foreground sm:max-w-none sm:text-5xl md:text-6xl">
                {systemsOverview.title}
              </h1>
              <p className="mt-6 max-w-[21rem] text-base leading-relaxed text-muted sm:max-w-2xl md:text-lg md:leading-8">
                {systemsOverview.description}
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/systeme/shophebel" size="lg">
                Shophebel verstehen
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button href="/#kontakt" variant="secondary" size="lg">
                Systemprojekt anfragen
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-10 grid gap-3 border-y border-border/60 py-5 sm:grid-cols-3">
              {["Eigene Produkte", "Analysewerkzeuge", "Individuelle Systeme"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 bg-cyan" aria-hidden="true" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      {item}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="relative border border-border/60 bg-background/45 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.35)] md:p-6">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.14]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
              aria-hidden="true"
            />
            <div className="relative">
              <div className="flex items-center justify-between gap-4 border-b border-border/50 pb-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-muted">
                  Produktarchitektur
                </p>
                <span className="h-2 w-2 bg-cyan" aria-hidden="true" />
              </div>

              <div className="mt-6 grid gap-3">
                {systemsOverview.systems.map((system, index) => (
                  <div
                    key={system.id}
                    className="grid gap-4 border border-border/50 bg-surface/25 px-4 py-4 sm:grid-cols-[9.25rem_1fr] sm:items-center"
                  >
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted/70">
                        System {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-1 font-display text-xl font-semibold uppercase text-foreground">
                        {system.title}
                      </p>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {["Problem", "Kern", "Handlung"].map((node) => (
                        <span
                          key={node}
                          className="border border-border/45 bg-background/35 px-2.5 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted"
                        >
                          {node}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {["Produkte", "Analyse", "Systembau"].map((signal) => (
                  <span
                    key={signal}
                    className="border border-cyan/20 bg-cyan/[0.035] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-light/80"
                  >
                    {signal}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="space-y-6">
            {systemsOverview.systems.map((system, index) => (
              <article
                key={system.id}
                className={cn(
                  "group relative overflow-hidden border border-border/60 bg-background/35 shadow-[0_24px_90px_rgba(0,0,0,0.22)]",
                  index === 0 && "md:ml-0",
                  index === 1 && "md:ml-8",
                  index === 2 && "md:ml-16",
                  index === 3 && "md:ml-8",
                )}
              >
                <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-[0.08]" />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-cyan/50" />
                <div className="relative grid gap-8 px-6 py-7 md:grid-cols-[0.82fr_1.3fr_0.9fr] md:px-8 md:py-9 lg:gap-12">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                        System {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="border border-border bg-surface/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-light">
                        {statusLabels[system.status]}
                      </span>
                    </div>
                    <h2 className="mt-4 font-display text-3xl font-semibold uppercase text-foreground md:text-4xl">
                      {system.title}
                    </h2>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-gold-muted">
                      {system.category}
                    </p>
                  </div>

                  <div className="grid gap-5">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted/75">
                        Problem
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
                        {system.problem}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan/75">
                        Nutzen
                      </p>
                      <p className="mt-2 text-base leading-relaxed text-foreground/90 md:text-lg">
                        {system.benefit}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-muted">
                        Systemkern
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
                        {system.systemCore}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-7 md:border-l md:border-border/50 md:pl-8">
                    <div>
                      <div className="flex items-center gap-2 text-cyan/80">
                        <Layers3 className="h-4 w-4" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                          Architektur
                        </span>
                      </div>
                      <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted">
                        {system.technology}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-muted">
                        {system.description}
                      </p>
                    </div>

                    {system.url && (
                      <Link
                        href={system.url}
                        className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan transition-colors hover:text-cyan-light"
                      >
                        {system.cta}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 border-t border-border/60 pt-10">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <p className="max-w-xl text-sm leading-relaxed text-muted md:text-base">
                Ein eigenes System beginnt mit einer klaren Diagnose: Welche Aufgabe
                soll es übernehmen, welche Daten braucht es und wie wird daraus
                eine nutzbare Oberfläche?
              </p>
              <Button href="/#kontakt" variant="secondary">
                Systemprojekt anfragen
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
