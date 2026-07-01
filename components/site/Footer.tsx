import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { footerCopy, siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/60 bg-surface/30">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-sm">
            <Link href="/" className="inline-block">
              <Image
                src="/DLMNSdigital.png"
                alt="DLMNS Digital"
                width={1774}
                height={887}
                className="h-auto w-[12rem] object-contain opacity-90"
                sizes="192px"
              />
            </Link>
            <p className="mt-5 font-display text-lg font-semibold tracking-tight text-foreground">
              {footerCopy.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16 lg:gap-20">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-muted">
                Projects
              </p>
              <ul className="mt-4 space-y-2.5">
                {projects.map((project) => (
                  <li key={project.id}>
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted transition-colors hover:text-gold-light"
                    >
                      {project.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-muted">
                Contact
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link
                    href="#kontakt"
                    className="text-sm text-muted transition-colors hover:text-gold-light"
                  >
                    Start a project
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

        <div className="mt-14 border-t border-border/50 pt-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
              {footerCopy.systemMeta.map((item) => (
                <p
                  key={item.key}
                  className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted/70"
                >
                  <span className="text-gold-muted/80">{item.key}</span>
                  <span className="text-muted/35"> / </span>
                  <span>{item.value}</span>
                </p>
              ))}
            </div>

            <p className="text-sm text-muted/80">
              © {year} DLMNS Digital. A digital branch of DLMNS.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
