export const siteConfig = {
  name: "DLMNS Digital",
  shortName: "DLMNS",
  description:
    "DLMNS Digital entwickelt intelligente Webprodukte, Analysewerkzeuge und digitale Infrastrukturen für Marken, Prozesse und neue Geschäftsmodelle.",
  url: "https://dlmn-sdigital.vercel.app",
  locale: "de_DE",
  author: "DLMNS Digital",
  email: "digital@dlmns.com",
  nav: [
    { label: "Systeme", href: "#systeme" },
    { label: "Produkte", href: "#artefakte" },
    { label: "Prozess", href: "#transformation" },
    { label: "Studio", href: "#atelier" },
    { label: "Kontakt", href: "#kontakt" },
  ],
} as const;

export const logoAssets = {
  digital: {
    src: "/DLMNSdigital-logo.png",
    alt: "DLMNS Digital - Building Intelligent Digital Systems",
    width: 1774,
    height: 887,
  },
  main: {
    src: "/DLMNSmainlogo.png",
    alt: "DLMNS",
    width: 1536,
    height: 1024,
  },
} as const;

export const heroCopy = {
  eyebrow: "DLMNS Digital · Digitalstudio von DALEMANS",
  headline: "Digitale Systeme, die Komplexität in Klarheit verwandeln.",
  subline:
    "DLMNS entwickelt intelligente Webprodukte, Analysewerkzeuge und digitale Infrastrukturen für Marken, Prozesse und neue Geschäftsmodelle.",
  primaryCta: "Digitale Produkte ansehen",
  secondaryCta: "Projekt anfragen",
} as const;

export type TransformationPhaseId =
  | "komplexitaet"
  | "struktur"
  | "orientierung"
  | "system";

export type TransformationPhase = {
  id: TransformationPhaseId;
  label: string;
  description: string;
  accent: "gold" | "cyan";
  examples: readonly string[];
};

export const transformationPhases = [
  {
    id: "komplexitaet",
    label: "Komplexität",
    description:
      "Ziele, Daten, Anforderungen und Arbeitsabläufe werden sichtbar, bevor eine digitale Lösung entsteht.",
    accent: "gold",
    examples: [
      "Unklare Performance-Signale",
      "Verteiltes Wissen und operative Reibung",
      "Viele Eingaben, wenig belastbare Orientierung",
    ],
  },
  {
    id: "struktur",
    label: "Struktur",
    description:
      "Muster, Relationen und Produktlogik werden geordnet und technisch nutzbar gemacht.",
    accent: "cyan",
    examples: [
      "Digitale Produktarchitektur",
      "Datenmodelle und Prozesslogik",
      "Schnittstellen, Regeln und Automatisierung",
    ],
  },
  {
    id: "orientierung",
    label: "Orientierung",
    description:
      "Interfaces, Dashboards und Workflows übersetzen Struktur in klare Handlung.",
    accent: "gold",
    examples: [
      "Analyse-Dashboards",
      "Interaktive Wissensräume",
      "Klare Informationsarchitektur",
    ],
  },
  {
    id: "system",
    label: "System",
    description:
      "Aus der Architektur entsteht ein belastbares Werkzeug, das im Alltag geführt, erweitert und gemessen werden kann.",
    accent: "cyan",
    examples: ["Shophebel", "Symbolraum", "Individuelle DLMNS-Systeme"],
  },
] as const satisfies readonly TransformationPhase[];

/** @deprecated Use transformationPhases */
export type ThinkingNodeId = TransformationPhaseId;

/** @deprecated Use TransformationPhase */
export type ThinkingNode = TransformationPhase;

export const thinkingModel = {
  phases: transformationPhases,
  flow: "Komplexität → Struktur → Orientierung → System",
} as const;

export const coreExperienceCopy = {
  eyebrow: "Prozess",
  title: "Von Komplexität zu belastbarer Produktlogik",
  description:
    "Ein ruhiger Systemprozess für Strategie, Design, Entwicklung, Analyse und Automatisierung.",
} as const;

export const systemThinkingCopy = {
  eyebrow: "Systemdenken",
  title: "Digitale Systeme statt isolierter Oberflächen",
  description:
    "DLMNS verbindet Strategie, Design und Entwicklung zu belastbaren digitalen Systemen mit klarer Logik.",
} as const;

export type SystemFlowStep = {
  label: string;
  detail?: string;
};

export type SystemFlow = {
  projectId: string;
  name: string;
  statusLabel: string;
  url: string;
  accent: "gold" | "cyan";
  steps: readonly SystemFlowStep[];
};

export type SystemCaseStudy = {
  projectId: string;
  name: string;
  statusLabel: string;
  url: string;
  accent: "gold" | "cyan";
  flowSteps: readonly string[];
  architectureStack: readonly string[];
  outcome: string;
};

export const systemCaseStudies: readonly SystemCaseStudy[] = [
  {
    projectId: "shophebel",
    name: "Shophebel",
    statusLabel: "Live-MVP",
    url: "https://shophebel.vercel.app/",
    accent: "cyan",
    flowSteps: ["Shop", "Analyse", "Bewertung", "Priorisierung", "Handlung"],
    architectureStack: [
      "Next.js",
      "Supabase",
      "Stripe",
      "Analyse-Engine",
      "KI-Ebene",
    ],
    outcome:
      "Onlineshop-Komplexität wird zu einer klaren Handlungskarte für Conversion, Vertrauen und technische Qualität.",
  },
  {
    projectId: "symbolraum",
    name: "Symbolraum",
    statusLabel: "Aktive Entwicklung",
    url: "https://bibel-symbolraum.vercel.app/",
    accent: "cyan",
    flowSteps: ["Symbol", "Raum", "Relation", "Bedeutung", "Erfahrung"],
    architectureStack: [
      "Meaning Graph",
      "Text- und Symbolcodex",
      "Symbol-Engine",
      "Interaktionsebene",
    ],
    outcome:
      "Komplexe Bedeutungsräume werden als navigierbare digitale Erfahrung zugänglich.",
  },
] as const;

/** @deprecated Use systemCaseStudies */
export const systemFlows: readonly SystemFlow[] = systemCaseStudies.map(
  (study) => ({
    projectId: study.projectId,
    name: study.name,
    statusLabel: study.statusLabel,
    url: study.url,
    accent: study.accent,
    steps: study.flowSteps.map((label) => ({ label })),
  }),
);

export type BuiltSystemStatus = "LIVE" | "IN ENTWICKLUNG" | "KONZEPT";

export type BuiltSystem = {
  id: string;
  title: string;
  systemType: string;
  description: string;
  technology: string;
  status: BuiltSystemStatus;
  accent: "gold" | "cyan";
  cta: string;
  url?: string;
};

export const builtSystems: readonly BuiltSystem[] = [
  {
    id: "shophebel",
    title: "Shophebel",
    systemType: "Analyse- und Optimierungssystem für Onlineshops",
    description:
      "Shophebel prüft Onlineshops auf Vertrauen, Conversion, technische Reibung und konkrete Optimierungspotenziale.",
    technology: "Next.js · Supabase · Stripe · KI",
    status: "LIVE",
    accent: "cyan",
    cta: "System ansehen",
    url: "https://shophebel.vercel.app/",
  },
  {
    id: "symbolraum",
    title: "Symbolraum",
    systemType: "Interaktiver Bedeutungsraum",
    description:
      "Symbolraum macht biblische Symbole, Räume und Texte als verbundenes Wissens- und Erfahrungsnetz zugänglich.",
    technology: "Meaning Graph · Codex · Next.js · React Flow",
    status: "IN ENTWICKLUNG",
    accent: "cyan",
    cta: "Vorschau öffnen",
    url: "https://bibel-symbolraum.vercel.app/",
  },
  {
    id: "custom-systems",
    title: "Weitere Systeme",
    systemType: "Individuelle digitale Produktarchitektur",
    description:
      "Maßgeschneiderte Werkzeuge für Prozesse, Analyse, Automatisierung und Markenaufbau - präzise geplant, sauber entwickelt, erweiterbar gedacht.",
    technology: "Strategie · Design · Fullstack · Automatisierung",
    status: "KONZEPT",
    accent: "cyan",
    cta: "Projekt anfragen",
  },
] as const;

export type MachineLayerDetail = {
  id: string;
  layerCode: string;
  title: string;
  components: readonly string[];
  relations: readonly string[];
  flow: string;
  accent: "gold" | "cyan";
};

export const insideTheMachineLayers: readonly MachineLayerDetail[] = [
  {
    id: "interface",
    layerCode: "L01",
    title: "Interface",
    components: ["Dashboard-UI", "Analyse-Views", "Report-Export"],
    relations: ["→ API-Routen", "→ Auth-Session", "→ Live-Updates"],
    flow: "Nutzer → Analyse-Request → Ergebnis-View",
    accent: "cyan",
  },
  {
    id: "data",
    layerCode: "L02",
    title: "Datenmodell",
    components: ["Analysen", "Findings", "Scores", "Accounts"],
    relations: ["Analysen 1:N Findings", "Accounts 1:N Analysen", "Scores → Reports"],
    flow: "Rohdaten → normalisierte Entitäten → relationale Abfragen",
    accent: "gold",
  },
  {
    id: "automation",
    layerCode: "L03",
    title: "Automatisierung",
    components: ["Crawl-Engine", "Screenshot-Intelligenz", "KI-Ebene"],
    relations: ["URL → Crawl-Job", "Screenshots → Vision API", "Signale → Scoring"],
    flow: "Website → Pipeline → strukturierte Signale",
    accent: "cyan",
  },
  {
    id: "logic",
    layerCode: "L04",
    title: "Produktlogik",
    components: ["Scoring-Regeln", "Opportunity-Engine", "Billing"],
    relations: ["Signale → Score", "Findings → Empfehlungen", "Pläne → Zugriff"],
    flow: "Diagnose → priorisierte Handlungsfelder → Umsetzung",
    accent: "gold",
  },
] as const;

export const atelierCurrentSystems = [
  { building: "SHOPHEBEL", status: "LIVE-MVP" },
  { building: "SYMBOLRAUM", status: "AKTIVE ENTWICKLUNG" },
  { building: "WEITERE SYSTEME", status: "PRODUKTARCHITEKTUR" },
] as const;

export const architectureLayers = [
  {
    id: "strategy",
    layerCode: "L01",
    layerLabel: "STRATEGIE",
    title: "Strategie",
    description:
      "Ziele, Nutzer, Geschäftslogik und technische Randbedingungen werden zu einer tragfähigen Produktentscheidung verdichtet.",
    accent: "cyan" as const,
  },
  {
    id: "interface",
    layerCode: "L02",
    layerLabel: "INTERFACE",
    title: "Interface",
    description:
      "Oberflächen verbinden Nutzerführung, Vertrauen und klare Interaktionslogik - ruhig, präzise und ohne unnötige Ablenkung.",
    accent: "gold" as const,
  },
  {
    id: "data",
    layerCode: "L03",
    layerLabel: "DATENMODELL",
    title: "Datenmodell",
    description:
      "Strukturierte Inhalte, Relationen und Zustände machen digitale Produkte skalierbar und anschlussfähig.",
    accent: "cyan" as const,
  },
  {
    id: "automation",
    layerCode: "L04",
    layerLabel: "AUTOMATISIERUNG",
    title: "Automatisierung / KI",
    description:
      "Workflows, API-Anbindungen und KI-gestützte Funktionen übernehmen echte Arbeit und bleiben in die Produktlogik eingebettet.",
    accent: "gold" as const,
  },
] as const;

/** @deprecated Use architectureLayers instead */
export const systemLayers = architectureLayers;

export const atelierContent = {
  eyebrow: "Studio",
  metaLabels: [
    { key: "MARKE", value: "DLMNS DIGITAL" },
    { key: "GRUPPE", value: "DALEMANS" },
    { key: "PRINZIP", value: "BUILDING INTELLIGENT SYSTEMS" },
  ],
  title: "DLMNS Digital",
  roles: ["Strategie", "Design", "Entwicklung", "Automatisierung"] as const,
  bio: "DLMNS Digital ist das digitale Studio von DALEMANS. Es entwickelt Webprodukte, Analysewerkzeuge, digitale Erfahrungen und Automatisierungsebenen, die Komplexität in Struktur, Orientierung und Handlung übersetzen.",
  architecturePoints: [
    "Strategie",
    "UX",
    "Frontend",
    "Backend",
    "KI-Integration",
    "Produktlogik",
  ] as const,
  portraitAlt: "DLMNS Digital",
  portraitPlaceholder: true,
} as const;

export const developerProfile = {
  name: atelierContent.title,
  role: atelierContent.roles.join(", "),
  bio: atelierContent.bio,
  trustFacts: [
    "Digitale Produktarchitektur von der Struktur bis zum Interface",
    "KI-Workflows mit echter Produktlogik statt isolierter Automatisierung",
    "Interaktive Erfahrungen als navigierbare Systeme",
    "Komplexität wird in klare Handlung und messbare Qualität übersetzt",
  ],
} as const;

export const ctaCopy = {
  eyebrow: "Kontakt",
  title: "Aus einer Idee wird ein belastbares digitales System.",
  description:
    "Bringen Sie eine Produktidee, einen Prozess, eine Marke oder eine bestehende digitale Oberfläche mit. DLMNS übersetzt sie in Struktur, Interface, Intelligenz und Handlung.",
  primaryCta: "Projekt anfragen",
  secondaryCta: "Ersten Blick anfordern",
  flowMeta: [
    { key: "EINGABE", value: "KOMPLEXITÄT" },
    { key: "PROZESS", value: "STRUKTUR" },
    { key: "ERGEBNIS", value: "SYSTEM" },
  ],
} as const;

export const footerCopy = {
  tagline: "Building Intelligent Systems.",
  systemMeta: [
    { key: "STUDIO", value: "DLMNS DIGITAL" },
    { key: "GRUPPE", value: "DALEMANS" },
    { key: "FELDER", value: "STRATEGIE · DESIGN · ENTWICKLUNG · AUTOMATISIERUNG" },
  ],
} as const;

export const trustMetrics = [
  {
    value: "2+",
    label: "aktive Eigenprodukte",
    description: "Eigene Systeme in Entwicklung und im Live-Betrieb.",
  },
  {
    value: "Fullstack",
    label: "von Konzept bis Deployment",
    description: "Von der ersten Idee bis zum produktiven System - ohne Hand-off-Lücken.",
  },
  {
    value: "Eine Hand",
    label: "UX, Code, KI und Produktlogik",
    description: "Design, Technik und Produktentscheidungen aus einem Guss.",
  },
  {
    value: "Live",
    label: "Projekte statt reine Mockups",
    description: "Echte Systeme im Einsatz - nicht nur Konzeptfolien.",
  },
] as const;

export const whyCustomPoints = [
  {
    title: "Individuelle Produktlogik",
    description:
      "Jedes Tool braucht eigene Regeln, Zustände und Workflows - keine generische Template-Struktur.",
  },
  {
    title: "Saubere technische Basis",
    description:
      "Moderner Stack, klare Architektur und wartbarer Code statt Plugin-Wildwuchs.",
  },
  {
    title: "Messbare Performance",
    description:
      "Schlanke Umsetzung ohne Baukasten-Overhead - schnell, messbar und zukunftsfähig.",
  },
  {
    title: "Erweiterbarkeit",
    description:
      "Systeme, die mitwachsen: neue Features, Integrationen und Datenmodelle ohne Neustart.",
  },
  {
    title: "Kontrolle über Code und Daten",
    description:
      "Volle Kontrolle über Architektur, Datenflüsse und Produktentscheidungen - ohne Lock-in.",
  },
] as const;

export const trustPoints = [
  "Echte Produkte statt reine Theorie",
  "Design, Code und Produktdenken aus einer Hand",
  "Schnelle Prototypen, saubere Umsetzung, klare Wirkung",
  "Fokus auf moderne Webtools, Analyse-Systeme und digitale Erlebnisse",
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Verstehen",
    description:
      "Ziele, Nutzer und Kontext werden geklärt, bevor eine Zeile Code geschrieben wird.",
  },
  {
    step: "02",
    title: "Strukturieren",
    description:
      "Architektur, Informationsfluss und visuelle Hierarchie bilden das belastbare Fundament.",
  },
  {
    step: "03",
    title: "Entwickeln",
    description:
      "Moderne Technologien, saubere Umsetzung und messbare Performance von Anfang an.",
  },
  {
    step: "04",
    title: "Verfeinern",
    description:
      "Details, Interaktion und Feinschliff, bis sich das Produkt im Alltag richtig anfühlt.",
  },
] as const;

export const techStack = [
  { name: "Next.js", category: "Framework" },
  { name: "TypeScript", category: "Sprache" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Motion", category: "Interaktion" },
  { name: "Supabase", category: "Backend" },
  { name: "Stripe", category: "Zahlungen" },
  { name: "KI- und API-Integrationen", category: "Intelligenz" },
  { name: "SEO und Performance", category: "Qualität" },
  { name: "UX/UI Design", category: "Design" },
] as const;
