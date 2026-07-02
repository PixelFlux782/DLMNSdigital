import Link from "next/link";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import { type SystemDetail } from "@/lib/systems";
import { Button } from "@/components/ui/Button";

type SystemDetailPageProps = {
  detail: SystemDetail;
};

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

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_22rem] lg:items-end">
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
                <Button href="/#kontakt" size="lg">
                  {detail.hero.primaryCta}
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                {detail.externalUrl && detail.hero.secondaryCta && (
                  <Button
                    href={detail.externalUrl}
                    variant="secondary"
                    size="lg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {detail.hero.secondaryCta}
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                )}
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

      {detail.suitableFor && (
        <section className="border-y border-border/60 bg-surface/20 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-8 md:grid-cols-[18rem_1fr]">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-muted">
                  Für wen geeignet
                </p>
                <h2 className="mt-4 font-display text-2xl font-semibold text-foreground md:text-3xl">
                  Besonders sinnvoll, wenn Analyse in klare Entscheidung führen soll.
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
                  Ein digitales System beginnt mit einer präzisen Frage.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                  DLMNS kann ein bestehendes Produkt schärfen, ein neues System
                  konzipieren oder eine erste belastbare Produktarchitektur
                  entwickeln.
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
