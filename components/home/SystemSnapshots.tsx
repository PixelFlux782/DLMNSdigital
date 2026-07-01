"use client";

import { cn } from "@/lib/utils";

type SnapshotProps = {
  className?: string;
};

function BlueprintGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 opacity-[0.22]", className)}
      style={{
        backgroundImage:
          "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
      aria-hidden="true"
    />
  );
}

export function ShophebelSnapshot({ className }: SnapshotProps) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden border border-border/50 bg-background/60",
        className,
      )}
      role="img"
      aria-label="Shophebel Analyse-Dashboard mit Score, Findings und Opportunity Engine"
    >
      <BlueprintGrid />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border/40 px-4 py-2.5 md:px-5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gold/70" aria-hidden="true" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
              Analyse Dashboard
            </span>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-gold/70">
            shophebel.app
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-3 md:flex-row md:gap-4 md:p-4">
          <div className="flex w-full flex-col gap-3 md:w-[38%]">
            <div className="border border-gold/20 bg-gold/[0.03] p-3">
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-gold-muted">
                Score
              </p>
              <div className="mt-2 flex items-end gap-2">
                <span className="font-display text-3xl font-semibold text-gold md:text-4xl">
                  72
                </span>
                <span className="pb-1 font-mono text-[10px] text-muted">/ 100</span>
              </div>
              <div className="mt-2 h-1.5 w-full bg-border/40">
                <div className="h-full w-[72%] bg-gradient-to-r from-gold/60 to-gold" />
              </div>
              <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.14em] text-muted">
                Conversion · Trust · UX
              </p>
            </div>

            <div className="flex-1 border border-border/40 bg-background/40 p-3">
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-cyan/70">
                Findings
              </p>
              <ul className="mt-2 space-y-1.5">
                {[
                  { severity: "high", text: "CTA unterhalb der Falz" },
                  { severity: "med", text: "Trust-Signale schwach" },
                  { severity: "low", text: "LCP 2.8s – optimierbar" },
                ].map((item) => (
                  <li
                    key={item.text}
                    className="flex items-center gap-2 font-mono text-[9px] text-foreground/80"
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full",
                        item.severity === "high"
                          ? "bg-gold"
                          : item.severity === "med"
                            ? "bg-cyan/70"
                            : "bg-muted/50",
                      )}
                      aria-hidden="true"
                    />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <div className="relative flex-1 border border-border/40 bg-background/30 p-3">
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted">
                Screenshot Intelligence
              </p>
              <svg
                viewBox="0 0 320 140"
                className="mt-2 h-full w-full min-h-[80px]"
                aria-hidden="true"
              >
                <rect
                  x="8"
                  y="8"
                  width="140"
                  height="100"
                  rx="4"
                  fill="none"
                  stroke="var(--color-gold)"
                  strokeOpacity="0.35"
                  strokeWidth="1"
                />
                <rect
                  x="160"
                  y="20"
                  width="140"
                  height="10"
                  rx="2"
                  fill="var(--color-foreground)"
                  opacity="0.1"
                />
                <rect
                  x="160"
                  y="38"
                  width="100"
                  height="8"
                  rx="2"
                  fill="var(--color-foreground)"
                  opacity="0.07"
                />
                <rect
                  x="20"
                  y="72"
                  width="60"
                  height="20"
                  rx="3"
                  fill="var(--color-gold)"
                  opacity="0.25"
                />
                <rect
                  x="160"
                  y="58"
                  width="120"
                  height="40"
                  rx="3"
                  fill="none"
                  stroke="var(--color-cyan)"
                  strokeOpacity="0.4"
                  strokeWidth="1"
                  strokeDasharray="4 3"
                />
                <text
                  x="220"
                  y="82"
                  textAnchor="middle"
                  fill="var(--color-cyan)"
                  opacity="0.6"
                  fontSize="8"
                  fontFamily="monospace"
                >
                  Hotspot
                </text>
              </svg>
            </div>

            <div className="border border-cyan/15 bg-cyan/[0.02] p-3">
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-cyan/70">
                Opportunity Engine
              </p>
              <div className="mt-2 space-y-1.5">
                <div className="flex items-center justify-between font-mono text-[9px]">
                  <span className="text-foreground/80">Trust-Badge oberhalb CTA</span>
                  <span className="text-gold">+12%</span>
                </div>
                <div className="flex items-center justify-between font-mono text-[9px]">
                  <span className="text-foreground/80">Hero-Struktur vereinfachen</span>
                  <span className="text-cyan">+8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SymbolraumSnapshot({ className }: SnapshotProps) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden border border-border/50 bg-background/60",
        className,
      )}
      role="img"
      aria-label="Symbolraum Meaning Graph mit Symbolnetz, hebräischer Ebene und Raumstruktur"
    >
      <BlueprintGrid />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border/40 px-4 py-2.5 md:px-5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan/70" aria-hidden="true" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
              Meaning Graph
            </span>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-cyan/70">
            symbolraum.app
          </span>
        </div>

        <div className="relative flex flex-1">
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <svg viewBox="0 0 400 220" className="h-full w-full" aria-hidden="true">
              <defs>
                <radialGradient id="sr-center" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect
                x="10"
                y="10"
                width="380"
                height="200"
                rx="6"
                fill="url(#sr-center)"
                stroke="var(--color-border)"
                strokeOpacity="0.3"
              />

              {[
                [200, 110, 120, 70],
                [200, 110, 280, 70],
                [200, 110, 320, 140],
                [200, 110, 80, 140],
                [200, 110, 200, 40],
                [120, 70, 80, 140],
                [280, 70, 320, 140],
              ].map(([x1, y1, x2, y2], i) => (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="var(--color-cyan)"
                  strokeOpacity="0.25"
                  strokeWidth="1"
                />
              ))}

              {[
                { cx: 200, cy: 110, r: 10, label: "א", central: true },
                { cx: 120, cy: 70, r: 6, label: "מים" },
                { cx: 280, cy: 70, r: 6, label: "אור" },
                { cx: 80, cy: 140, r: 5, label: "Baum" },
                { cx: 320, cy: 140, r: 5, label: "Stein" },
                { cx: 200, cy: 40, r: 5, label: "Himmel" },
              ].map((node) => (
                <g key={node.label}>
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r={node.r + 4}
                    fill={node.central ? "var(--color-gold)" : "var(--color-cyan)"}
                    opacity={node.central ? 0.12 : 0.06}
                  />
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r={node.r}
                    fill="var(--color-background)"
                    stroke={node.central ? "var(--color-gold)" : "var(--color-cyan)"}
                    strokeOpacity="0.6"
                    strokeWidth="1"
                  />
                  <text
                    x={node.cx}
                    y={node.cy + 3}
                    textAnchor="middle"
                    fill={node.central ? "var(--color-gold)" : "var(--color-foreground)"}
                    opacity="0.75"
                    fontSize={node.central ? "10" : "7"}
                    fontFamily="serif"
                  >
                    {node.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="relative z-10 flex w-[30%] flex-col border-r border-border/40 bg-background/50 p-3">
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-gold-muted">
              Raumstruktur
            </p>
            <ul className="mt-2 space-y-2">
              {["Codex", "Symbolnetz", "Journey"].map((room, i) => (
                <li
                  key={room}
                  className={cn(
                    "border px-2 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em]",
                    i === 1
                      ? "border-cyan/30 bg-cyan/[0.04] text-cyan"
                      : "border-border/40 text-muted",
                  )}
                >
                  {room}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 ml-auto flex w-[28%] flex-col justify-end p-3">
            <div className="border border-gold/20 bg-gold/[0.03] p-2.5">
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-gold-muted">
                Hebräische Ebene
              </p>
              <p className="mt-1 font-serif text-sm text-gold/80" dir="rtl">
                סמל → קשר → משמעות
              </p>
              <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.1em] text-muted">
                Symbol → Verbindung → Bedeutung
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
