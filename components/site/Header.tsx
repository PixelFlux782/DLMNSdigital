"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { logoAssets, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        isScrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl backdrop-saturate-150"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <span className="flex h-12 w-[12.5rem] items-center justify-center overflow-hidden border border-border/55 bg-background/70 px-3 shadow-[0_0_28px_rgba(125,215,238,0.1)] transition-opacity group-hover:opacity-95 sm:h-14 sm:w-[15rem]">
            <Image
              src={logoAssets.digital.src}
              alt={logoAssets.digital.alt}
              width={logoAssets.digital.width}
              height={logoAssets.digital.height}
              loading="eager"
              fetchPriority="high"
              className="h-auto w-full object-contain opacity-100 brightness-125 drop-shadow-[0_0_20px_rgba(237,247,251,0.24)]"
              sizes="(max-width: 640px) 200px, 240px"
            />
          </span>
          <span className="hidden max-w-[10rem] border-l border-border/60 pl-3 text-[11px] leading-snug text-muted lg:block">
            Digitalstudio von DALEMANS
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Hauptnavigation"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-gold-light"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/#kontakt" variant="secondary" size="sm">
            Projekt anfragen
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-foreground backdrop-blur-sm md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? "Navigation schließen" : "Navigation öffnen"}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-x-0 top-16 bottom-0 border-t border-border bg-background/95 backdrop-blur-xl transition-all duration-300 sm:top-[4.5rem] md:hidden",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <nav
          className="flex flex-col gap-1 px-5 py-6"
          aria-label="Mobile Navigation"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-4 py-3 text-lg text-foreground transition-colors hover:bg-surface-elevated"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 px-4">
            <Button
              href="/#kontakt"
              variant="primary"
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              Projekt anfragen
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
