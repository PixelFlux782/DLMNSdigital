import Link from "next/link";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import { type SystemDetail } from "@/lib/systems";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type SystemDetailPageProps = {
  detail: SystemDetail;
};

function SystemPreview({ detail }: SystemDetailPageProps) {
  const isDashboard = detail.visualVariant === "dashboard";

  return (
    <div className="relative overflow-hidden border border-border/60 bg-background/40 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-[0.08]" />
      <div className="relative">
        <div className="flex items-center justify-between border-b border-border/50 pb-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            {isDashboard ? "Analyse-Konsole" : "Bedeutungsraum"}
          </p>
          <span className="h-2 w-2 bg-cyan" aria-hidden="true" />
        </div>

        {isDashboard ? (
          <div className="mt-6 grid gap-4">
            <div className="grid gap-3 sm:grid-cols-[1fr_7rem]">
              <div className="border border-cyan/20 bg-cyan/[0.045] p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-light/80">
                  Shop Score
                </p>
                <p className="mt-3 font-display text-5xl font-semibold text-foreground">
                  74
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Starke Basis, aber klare Hebel in Vertrauen und Führung.
                </p>
              </div>
              <div className="grid gap-2">
                {["Trust", "CTA", "Tech"].map((item, index) => (
                  <div key={item} className="border border-border/50 bg-surface/35 p-3">
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                      {item}
                    </p>
                    <div className="mt-3 h-1.5 bg-border/60">
                      <div
                        className="h-full bg-cyan"
                        style={{ width: `${[68, 82, 56][index]}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-2">
              {["Checkout-Vertrauen stärken", "Angebot früher schärfen", "Mobile Reibung reduzieren"].map(
                (finding, index) => (
                  <div
                    key={finding}
                    className="flex items-center justify-between gap-4 border border-border/45 bg-surface/25 px-3 py-2.5"
                  >
                    <span className="text-xs text-foreground/85">{finding}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-gold-muted">
                      P{index + 1}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <div className="relative min-h-72 border border-border/50 bg-surface/20 p-5">
              <div className="absolute left-1/2 top-1/2 h-px w-[72%] -translate-x-1/2 bg-cyan/20" />
              <div className="absolute left-1/2 top-1/2 h-[66%] w-px -translate-y-1/2 bg-cyan/20" />
              {[
                ["Codex", "left-6 top-7"],
                ["Symbolnetz", "right-6 top-16"],
                ["Räume", "left-10 bottom-10"],
                ["Pfad", "right-10 bottom-8"],
                ["Text", "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"],
              ].map(([label, position]) => (
                <div
                  key={label}
                  className={cn(
                    "absolute border border-cyan/25 bg-background/80 px-3 py-2 shadow-[0_0_28px_rgba(84,200,232,0.08)]",
                    position,
                  )}
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-light">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              Inhalte werden nicht linear abgelegt, sondern über Beziehungen,
              Räume und wieder auffindbare Pfade erschlossen.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function SystemDetailPage({ detail }: SystemDetailPageProps) {
  return (
    <div className="pt-24 md:pt-28">
      <section className="relative overflow-hidden border-b border-border/60 py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-[0.07]" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <Link
            href="/systeme"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-gold-light"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Zurück zur Systemübersicht
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_24rem] lg:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-muted">
                {detail.hero.eyebrow}
              </p>
              <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.05] text-foreground md:text-6xl">
                {detail.hero.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg md:leading-8">
                {detail.hero.description}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  href={detail.externalUrl ?? "/#kontakt"}
                  size="lg"
                  target={detail.externalUrl ? "_blank" : undefined}
                  rel={detail.externalUrl ? "noopener noreferrer" : undefined}
                >
                  {detail.hero.primaryCta}
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                {detail.hero.secondaryCta && (
                  <Button href="/#kontakt" variant="secondary" size="lg">
                    {detail.hero.secondaryCta}
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="mt-8 grid gap-3 border-y border-border/50 py-4 sm:grid-cols-3">
                {[
                  ["Produkt", detail.name],
                  ["Status", detail.status],
                  ["Nächster Schritt", detail.hero.secondaryCta ? "Ansehen oder anfragen" : "Gespräch anfragen"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-cyan/75">
                      {label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/86">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="border border-border/60 bg-background/35 p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                Systemprofil
              </p>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan/75">
                    Kategorie
                  </dt>
                  <dd className="mt-1 text-sm text-foreground">{detail.category}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan/75">
                    Status
                  </dt>
                  <dd className="mt-1 text-sm text-foreground">{detail.status}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan/75">
                    Logik
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {detail.signalLine.map((signal) => (
                      <span
                        key={signal}
                        className="border border-border bg-surface/60 px-2 py-1 font-mono text-[10px] text-muted"
                      >
                        {signal}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {detail.metrics.map((metric) => (
              <div key={metric.label} className="border border-border/50 bg-surface/25 p-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                  {metric.label}
                </p>
                <p className="mt-2 font-display text-2xl font-semibold text-foreground">
                  {metric.value}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-muted">
              Systemlogik
            </p>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold text-foreground md:text-4xl">
              {detail.id === "shophebel"
                ? "Von der Website zur priorisierten Handlung."
                : "Von Inhalten zu einem erfahrbaren Bedeutungsraum."}
            </h2>
            <div className="mt-8 grid gap-3">
              {detail.logicSteps.map((step, index) => (
                <div
                  key={step.label}
                  className="grid gap-3 border-l border-cyan/35 bg-surface/20 px-4 py-3 sm:grid-cols-[4rem_1fr]"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {step.label}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <SystemPreview detail={detail} />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="space-y-10">
            {detail.sections.map((section, index) => (
              <article
                key={section.eyebrow}
                className="grid gap-8 border-t border-border/60 pt-10 md:grid-cols-[15rem_1fr] lg:grid-cols-[18rem_1fr]"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan/75">
                    {String(index + 1).padStart(2, "0")} / {section.eyebrow}
                  </p>
                </div>
                <div className="max-w-3xl">
                  <h2 className="font-display text-2xl font-semibold text-foreground md:text-4xl md:leading-[1.12]">
                    {section.title}
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-muted md:text-lg md:leading-8">
                    {section.text}
                  </p>
                  {section.points && (
                    <ul className="mt-7 grid gap-3">
                      {section.points.map((point) => (
                        <li
                          key={point}
                          className="border-l border-cyan/40 bg-surface/20 px-4 py-3 text-sm leading-relaxed text-foreground/85"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-surface/20 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-8 md:grid-cols-[18rem_1fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-muted">
                {detail.id === "shophebel" ? "Analysebereiche" : "Nutzen"}
              </p>
              <h2 className="mt-4 font-display text-2xl font-semibold text-foreground md:text-3xl">
                {detail.id === "shophebel"
                  ? "Die Bewertung trennt Signale, bevor sie priorisiert werden."
                  : "Der Raum macht Zusammenhänge erfahrbar, ohne sie zu überladen."}
              </h2>
            </div>
            <div className="grid gap-px overflow-hidden border border-border/60 sm:grid-cols-2 lg:grid-cols-3">
              {detail.focusAreas.map((area) => (
                <div key={area} className="bg-background/45 p-5">
                  <p className="font-display text-lg font-semibold text-foreground">
                    {area}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {detail.resultItems && (
            <div className="mt-12 grid gap-8 border-t border-border/60 pt-10 md:grid-cols-[18rem_1fr]">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan/75">
                  {detail.id === "shophebel" ? "Ergebnislogik" : "Wirkung"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {detail.resultItems.map((item) => (
                  <span
                    key={item}
                    className="border border-cyan/20 bg-cyan/[0.035] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-light/85"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {detail.suitableFor && (
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-8 md:grid-cols-[18rem_1fr]">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-muted">
                  Für wen geeignet
                </p>
                <h2 className="mt-4 font-display text-2xl font-semibold text-foreground md:text-3xl">
                  {detail.suitableForTitle}
                </h2>
              </div>
              <div className="grid gap-px overflow-hidden border border-border/60 md:grid-cols-2">
                {detail.suitableFor.map((item) => (
                  <div key={item} className="bg-background/45 p-5">
                    <p className="text-sm leading-relaxed text-foreground/85">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="border border-border/60 bg-background/35 px-6 py-10 md:px-10 md:py-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-muted">
              Nächster Schritt
            </p>
            <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="max-w-2xl font-display text-3xl font-semibold text-foreground md:text-4xl">
                  {detail.id === "shophebel"
                    ? "Shop prüfen oder ein ähnliches Analysesystem planen."
                    : "Symbolraum ansehen oder ein ähnliches Wissenssystem planen."}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                  DLMNS kann das bestehende Produkt schärfen, eine verwandte
                  Produktarchitektur entwickeln oder aus einem komplexen Inhalt ein
                  nutzbares digitales System machen.
                </p>
              </div>
              <Button href="/#kontakt" size="lg">
                Gespräch anfragen
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
