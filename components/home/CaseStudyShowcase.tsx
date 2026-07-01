"use client";

import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { projects, type Project } from "@/lib/projects";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

function ProjectPreview({ project }: { project: Project }) {
  const isGold = project.accent === "gold";

  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-background",
        "before:absolute before:inset-0 before:opacity-60",
        isGold
          ? "before:bg-[linear-gradient(135deg,rgba(197,160,89,0.12)_0%,transparent_55%)]"
          : "before:bg-[linear-gradient(135deg,rgba(58,138,158,0.08)_0%,transparent_55%)]",
      )}
    >
      <svg
        viewBox="0 0 400 250"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={`grad-${project.id}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor={isGold ? "var(--color-gold)" : "var(--color-cyan)"}
              stopOpacity="0.5"
            />
            <stop offset="100%" stopColor="var(--color-foreground)" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {project.id === "shophebel" ? (
          <>
            <rect
              x="40"
              y="50"
              width="140"
              height="90"
              rx="8"
              fill="none"
              stroke={`url(#grad-${project.id})`}
              strokeWidth="1.5"
            />
            <rect
              x="200"
              y="70"
              width="160"
              height="12"
              rx="4"
              fill="var(--color-gold)"
              opacity="0.25"
            />
            <rect
              x="200"
              y="92"
              width="120"
              height="8"
              rx="3"
              fill="var(--color-foreground)"
              opacity="0.12"
            />
            <path
              d="M60 170 L120 130 L180 150 L260 90 L340 120"
              fill="none"
              stroke="var(--color-cyan)"
              strokeWidth="2"
              strokeOpacity="0.45"
            />
            <circle cx="120" cy="130" r="5" fill="var(--color-gold)" opacity="0.8" />
            <circle cx="260" cy="90" r="5" fill="var(--color-cyan)" opacity="0.8" />
          </>
        ) : (
          <>
            <circle
              cx="200"
              cy="125"
              r="48"
              fill="none"
              stroke={`url(#grad-${project.id})`}
              strokeWidth="1.5"
            />
            <circle cx="200" cy="125" r="8" fill="var(--color-gold)" opacity="0.85" />
            {[0, 60, 120, 180, 240, 300].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const x = 200 + Math.cos(rad) * 48;
              const y = 125 + Math.sin(rad) * 48;
              const x2 = 200 + Math.cos(rad) * 78;
              const y2 = 125 + Math.sin(rad) * 78;
              return (
                <g key={angle}>
                  <line
                    x1={x}
                    y1={y}
                    x2={x2}
                    y2={y2}
                    stroke="var(--color-cyan)"
                    strokeOpacity="0.35"
                    strokeWidth="1"
                  />
                  <circle
                    cx={x2}
                    cy={y2}
                    r="4"
                    fill="var(--color-foreground)"
                    opacity="0.35"
                  />
                </g>
              );
            })}
          </>
        )}
      </svg>
    </div>
  );
}

function CaseStudyField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
        {label}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-foreground">{children}</p>
    </div>
  );
}

function CaseStudyCard({ project, index }: { project: Project; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const isGold = project.accent === "gold";

  return (
    <motion.article
      id={project.id}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Card hover className="flex h-full flex-col gap-0 overflow-hidden p-0">
        <div className="p-2 pb-0">
          <ProjectPreview project={project} />
        </div>

        <div className="flex flex-1 flex-col gap-5 px-6 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground">
                {project.name}
              </h3>
              <span
                className={cn(
                  "mt-2 inline-flex rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                  project.status === "Live"
                    ? "border border-cyan/20 bg-cyan/8 text-cyan"
                    : "border border-gold/20 bg-gold/8 text-gold",
                )}
              >
                {project.statusLabel}
              </span>
            </div>
          </div>

          <div id={`${project.id}-study`} className="grid gap-4 sm:grid-cols-2">
            <CaseStudyField label="Problem">{project.problem}</CaseStudyField>
            <CaseStudyField label="Lösungsansatz">{project.approach}</CaseStudyField>
          </div>

          <CaseStudyField label="Tech Stack">
            <span className="flex flex-wrap gap-2 pt-1">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted"
                >
                  {tech}
                </span>
              ))}
            </span>
          </CaseStudyField>

          <CaseStudyField label="Ergebnis">
            {project.statusLabel}
          </CaseStudyField>

          <div className="mt-auto flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center">
            <Link
              href={`#${project.id}-study`}
              className={cn(
                "group inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300",
                isGold
                  ? "border-gold/25 text-gold hover:border-gold/50 hover:bg-gold/5"
                  : "border-cyan/20 text-cyan hover:border-cyan/30 hover:bg-cyan/5",
              )}
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Case Study ansehen
            </Link>
            <Button
              href={project.url}
              variant="secondary"
              size="sm"
              className="sm:ml-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live öffnen
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.article>
  );
}

export function CaseStudyShowcase() {
  return (
    <Section
      id="projekte"
      eyebrow="Case Studies"
      title="Systeme, die ich gebaut habe"
      description="Jedes Projekt löst ein konkretes Problem – mit eigener Produktlogik, technischer Tiefe und klarem Nutzen."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, index) => (
          <CaseStudyCard key={project.id} project={project} index={index} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button href="#kontakt" variant="secondary">
          Eigenes Projekt besprechen
        </Button>
      </div>
    </Section>
  );
}
