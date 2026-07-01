"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  titleClassName?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  containerClassName,
  titleClassName,
}: SectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id={id} className={cn("relative py-20 md:py-28", className)}>
      <div
        className={cn(
          "mx-auto w-full max-w-6xl px-5 sm:px-8",
          containerClassName,
        )}
      >
        {(eyebrow || title || description) && (
          <motion.header
            className="mb-12 max-w-2xl md:mb-16"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {eyebrow && (
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-gold-muted">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={cn(
                  "font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl md:leading-[1.06]",
                  titleClassName,
                )}
              >
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-5 text-base leading-relaxed text-muted md:text-lg md:leading-8">
                {description}
              </p>
            )}
          </motion.header>
        )}
        {children}
      </div>
    </section>
  );
}
