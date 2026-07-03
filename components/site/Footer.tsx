import Image from "next/image";
import Link from "next/link";
import { builtSystems, footerCopy, logoAssets, siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/60 bg-background/70">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16">
          <div className="max-w-md">
            <Link href="/" className="inline-flex">
              <span className="flex h-14 w-[13rem] items-center justify-center overflow-hidden">
                <Image
                  src={logoAssets.digital.src}
                  alt={logoAssets.digital.alt}
                  width={logoAssets.digital.width}
                  height={logoAssets.digital.height}
                  className="h-auto w-full object-contain opacity-95 drop-shadow-[0_0_22px_rgba(237,247,251,0.12)]"
                  sizes="208px"
                />
              </span>
            </Link>
            <p className="mt-5 max-w-xs font-display text-xl font-semibold leading-tight text-foreground">
              {footerCopy.tagline}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Digitale Produkte, Analysewerkzeuge und individuelle Systeme mit klarer Architektur.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-12">
            <div className="border-t border-border/50 pt-5 sm:border-t-0 sm:pt-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-muted">
                Produkte
              </p>
              <ul className="mt-4 space-y-2.5">
                {builtSystems.map((system) => (
                  <li key={system.id}>
                    <Link
                      href={system.url ?? "/systeme"}
                      className="text-sm text-muted transition-colors hover:text-gold-light"
                    >
                      {system.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border/50 pt-5 sm:border-t-0 sm:pt-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-muted">
                Kontakt
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link
                    href="#kontakt"
                    className="text-sm text-muted transition-colors hover:text-gold-light"
                  >
                    Projekt anfragen
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm text-muted transition-colors hover:text-gold-light"
                  >
                    {siteConfig.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/50 pt-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="grid gap-2 sm:grid-cols-3 sm:gap-4">
              {footerCopy.systemMeta.map((item) => (
                <div
                  key={item.key}
                  className="border border-border/40 bg-surface/20 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted/70"
                >
                  <span className="block text-gold-muted/80">{item.key}</span>
                  <span className="mt-1 block leading-relaxed">{item.value}</span>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted/70">
              © {year} DLMNS Digital. Digitalstudio von DALEMANS.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
