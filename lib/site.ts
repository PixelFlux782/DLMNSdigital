export const siteConfig = {
  name: "DLMNS Digital",
  shortName: "DLMNS Digital",
  description:
    "Software, AI, digital experiences and automation systems by DLMNS Digital.",
  url: "https://dlmns-digital.vercel.app",
  locale: "de_DE",
  author: "DLMNS Digital",
  email: "digital@dlmns.com",
  nav: [
    { label: "Systems", href: "#systeme" },
    { label: "Projects", href: "#artefakte" },
    { label: "Process", href: "#transformation" },
    { label: "About", href: "#atelier" },
    { label: "Contact", href: "#kontakt" },
  ],
} as const;

export const heroCopy = {
  eyebrow: "DLMNS Digital · Digital branch of DLMNS",
  headline: "DLMNS Digital",
  subline:
    "Building intelligent digital systems. We design and build software, AI workflows, digital experiences and automation systems that turn complexity into clarity, structure and action.",
  primaryCta: "Explore systems",
  secondaryCta: "Start a project",
} as const;

export type TransformationPhaseId =
  | "komplexitaet"
  | "struktur"
  | "orientierung"
  | "erfahrung";

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
      "Signals, fragments and requirements before a digital system takes shape.",
    accent: "gold",
    examples: [
      "Unclear performance signals",
      "Distributed knowledge and business context",
      "Many inputs, little operational orientation",
    ],
  },
  {
    id: "struktur",
    label: "Struktur",
    description:
      "Patterns, relations and product logic become visible and technically usable.",
    accent: "cyan",
    examples: [
      "Software Systems",
      "AI & Automation",
      "Data models and process logic",
    ],
  },
  {
    id: "orientierung",
    label: "Orientierung",
    description:
      "Interfaces, dashboards and workflows make structure navigable and actionable.",
    accent: "gold",
    examples: [
      "Diagnostic dashboards",
      "Digital experiences",
      "Clear information architecture",
    ],
  },
  {
    id: "erfahrung",
    label: "Erfahrung",
    description:
      "Production-ready systems that turn complexity into daily-use tools.",
    accent: "cyan",
    examples: ["Shophebel", "Symbolraum", "Automation Systems"],
  },
] as const satisfies readonly TransformationPhase[];

/** @deprecated Use transformationPhases */
export type ThinkingNodeId = TransformationPhaseId;

/** @deprecated Use TransformationPhase */
export type ThinkingNode = TransformationPhase;

export const thinkingModel = {
  phases: transformationPhases,
  flow: "Komplexität → Struktur → Orientierung → Erfahrung",
} as const;

export const coreExperienceCopy = {
  eyebrow: "Process",
  title: "From complexity to action",
  description:
    "A quiet systems process for software, AI, experiences and automation.",
} as const;

export const systemThinkingCopy = {
  eyebrow: "Systems",
  title: "Digital systems, not isolated screens",
  description: "DLMNS Digital builds systems that connect interface, data, automation and product logic.",
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
    statusLabel: "Live MVP",
    url: "https://shophebel.vercel.app/",
    accent: "cyan",
    flowSteps: ["Website", "Analyse", "Bewertung", "Empfehlung", "Handlung"],
    architectureStack: [
      "Next.js",
      "Supabase",
      "Stripe",
      "Analyse Engine",
      "AI Layer",
    ],
    outcome: "E-commerce complexity becomes a clear action map.",
  },
  {
    projectId: "symbolraum",
    name: "Symbolraum",
    statusLabel: "Aktive Entwicklung",
    url: "https://bibel-symbolraum.vercel.app/",
    accent: "cyan",
    flowSteps: ["Symbol", "Verbindung", "Bedeutung", "Erfahrung"],
    architectureStack: [
      "Meaning Graph",
      "Codex",
      "Symbol Engine",
      "Journey Layer",
    ],
    outcome: "Complex meaning spaces become navigable digital experiences.",
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

export type BuiltSystemStatus = "LIVE" | "IN DEVELOPMENT" | "RESEARCH";

export type BuiltSystem = {
  id: string;
  title: string;
  systemType: string;
  description: string;
  technology: string;
  status: BuiltSystemStatus;
  accent: "gold" | "cyan";
};

export const builtSystems: readonly BuiltSystem[] = [
  {
    id: "shophebel",
    title: "Shophebel",
    systemType: "E-Commerce Tools",
    description:
      "Website-Diagnose mit Score, Findings und KI-gestützten Handlungsempfehlungen für Conversion und Trust.",
    technology: "Next.js · Supabase · Stripe · AI",
    status: "LIVE",
    accent: "cyan",
  },
  {
    id: "symbolraum",
    title: "Symbolraum",
    systemType: "Digital Experiences",
    description:
      "Interaktiver Bedeutungsgraph mit hebräischer Ebene, Codex und navigierbaren Symbolnetzen.",
    technology: "Meaning Graph · Codex · Next.js · React Flow",
    status: "IN DEVELOPMENT",
    accent: "cyan",
  },
  {
    id: "automation-systems",
    title: "Automation Systems",
    systemType: "AI & Automation",
    description:
      "Reusable workflow architecture for AI-assisted operations, integrations and structured handovers.",
    technology: "Next.js · TypeScript · Motion · Design System",
    status: "RESEARCH",
    accent: "cyan",
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
    components: ["Dashboard UI", "Analyse-Views", "Report Export"],
    relations: ["→ API Routes", "→ Auth Session", "→ Realtime Updates"],
    flow: "Nutzer → Analyse-Request → Ergebnis-View",
    accent: "cyan",
  },
  {
    id: "data",
    layerCode: "L02",
    title: "Datenmodell",
    components: ["Analyses", "Findings", "Scores", "Users"],
    relations: ["Analyses 1:N Findings", "Users 1:N Analyses", "Scores → Reports"],
    flow: "Rohdaten → normalisierte Entitäten → relationale Abfragen",
    accent: "gold",
  },
  {
    id: "automation",
    layerCode: "L03",
    title: "Automatisierung",
    components: ["Crawl Engine", "Screenshot Intelligence", "AI Layer"],
    relations: ["URL → Crawl Job", "Screenshots → Vision API", "Signals → Scoring"],
    flow: "Website → Pipeline → strukturierte Signale",
    accent: "cyan",
  },
  {
    id: "logic",
    layerCode: "L04",
    title: "Produktlogik",
    components: ["Scoring Rules", "Opportunity Engine", "Stripe Billing"],
    relations: ["Signale → Score", "Findings → Empfehlungen", "Plans → Access"],
    flow: "Diagnose → priorisierte Handlungsfelder → Abrechnung",
    accent: "gold",
  },
] as const;

export const atelierCurrentSystems = [
  { building: "SHOPHEBEL", status: "LIVE SYSTEM" },
  { building: "SYMBOLRAUM", status: "ACTIVE DEVELOPMENT" },
  { building: "AUTOMATION SYSTEMS", status: "LABS" },
] as const;

export const architectureLayers = [
  {
    id: "interface",
    layerCode: "L01",
    layerLabel: "INTERFACE",
    title: "Interface",
    description:
      "Oberflächen, die nicht nur gut aussehen, sondern Nutzerführung, Vertrauen und klare Interaktionslogik verbinden.",
    accent: "cyan" as const,
  },
  {
    id: "data",
    layerCode: "L02",
    layerLabel: "DATA MODEL",
    title: "Datenmodell",
    description:
      "Strukturierte Inhalte, Relationen und Zustände – damit Produkte skalieren und nicht an starren Seiten hängen.",
    accent: "gold" as const,
  },
  {
    id: "automation",
    layerCode: "L03",
    layerLabel: "AUTOMATION",
    title: "Automatisierung / KI",
    description:
      "Intelligente Workflows, API-Anbindungen und KI-gestützte Funktionen, die echte Arbeit abnehmen – nicht nur dekorieren.",
    accent: "cyan" as const,
  },
  {
    id: "logic",
    layerCode: "L04",
    layerLabel: "PRODUCT LOGIC",
    title: "Produktlogik",
    description:
      "Regeln, Zustände und Geschäftslogik, die ein Tool zu einem System machen – nicht zu einer statischen Präsentation.",
    accent: "gold" as const,
  },
] as const;

/** @deprecated Use architectureLayers instead */
export const systemLayers = architectureLayers;

export const atelierContent = {
  eyebrow: "About",
  metaLabels: [
    { key: "BRAND", value: "DLMNS DIGITAL" },
    { key: "GROUP", value: "DLMNS" },
    { key: "MODE", value: "BUILDING INTELLIGENT DIGITAL SYSTEMS" },
  ],
  title: "DLMNS Digital",
  roles: ["Software", "AI", "Experiences", "Automation"] as const,
  bio: "DLMNS Digital is the digital branch of DLMNS. It designs and builds software systems, AI workflows, digital experiences and automation layers that turn complexity into clarity, structure and action.",
  architecturePoints: [
    "Strategy",
    "UX",
    "Frontend",
    "Backend",
    "AI Integration",
    "Product Logic",
  ] as const,
  portraitAlt: "DLMNS Digital",
  portraitPlaceholder: true,
} as const;

export const developerProfile = {
  name: atelierContent.title,
  role: atelierContent.roles.join(", "),
  bio: atelierContent.bio,
  trustFacts: [
    "Software systems designed from structure to interface",
    "AI workflows connected to real product logic",
    "Digital experiences built as navigable systems",
    "Complexity translated into clarity and action",
  ],
} as const;

export const ctaCopy = {
  eyebrow: "Contact",
  title: "Build the system behind the idea.",
  description:
    "Bring an idea, workflow, product or existing digital surface. DLMNS Digital turns it into a clear system of structure, interface, intelligence and action.",
  primaryCta: "Start a project",
  secondaryCta: "Request first look",
  flowMeta: [
    { key: "INPUT", value: "COMPLEXITY" },
    { key: "PROCESS", value: "STRUCTURE" },
    { key: "OUTPUT", value: "SYSTEM" },
  ],
} as const;

export const footerCopy = {
  tagline: "Building intelligent digital systems.",
  systemMeta: [
    { key: "BRANCH", value: "DLMNS DIGITAL" },
    { key: "GROUP", value: "DLMNS ECOSYSTEM" },
    { key: "FIELDS", value: "SOFTWARE · AI · EXPERIENCES · AUTOMATION" },
  ],
} as const;

export const trustMetrics = [
  {
    value: "2+",
    label: "aktive Eigenprojekte",
    description: "Eigene Produkte in Entwicklung und im Live-Betrieb.",
  },
  {
    value: "Fullstack",
    label: "von Konzept bis Deployment",
    description: "Von der ersten Idee bis zum produktiven System – ohne Hand-off-Lücken.",
  },
  {
    value: "Eine Hand",
    label: "UX, Code, KI & Produktlogik",
    description: "Design, Technik und Produktentscheidungen aus einem Guss.",
  },
  {
    value: "Live",
    label: "Projekte statt reine Mockups",
    description: "Echte Systeme im Einsatz – nicht nur Konzeptfolien.",
  },
] as const;

export const whyCustomPoints = [
  {
    title: "Individuelle Produktlogik",
    description:
      "Jedes Tool braucht eigene Regeln, Zustände und Workflows – keine generische Template-Struktur.",
  },
  {
    title: "Saubere technische Basis",
    description:
      "Moderner Stack, klare Architektur und wartbarer Code statt Plugin-Wildwuchs.",
  },
  {
    title: "Bessere Performance",
    description:
      "Schlanke Umsetzung ohne Baukasten-Overhead – schnell, messbar und zukunftsfähig.",
  },
  {
    title: "Erweiterbarkeit",
    description:
      "Systeme, die mitwachsen: neue Features, Integrationen und Datenmodelle ohne Neustart.",
  },
  {
    title: "Eigene Tools statt Template-Abhängigkeit",
    description:
      "Volle Kontrolle über Code, Daten und Produktentscheidungen – kein Lock-in.",
  },
] as const;

export const trustPoints = [
  "Echte Projekte statt nur Theorie",
  "Design, Code und Produktdenken aus einer Hand",
  "Schnelle Prototypen, saubere Umsetzung, klare Wirkung",
  "Fokus auf moderne Webtools, Analyse-Systeme und digitale Erlebnisse",
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Verstehen",
    description:
      "Ich kläre Ziele, Nutzer und Kontext – bevor eine Zeile Code geschrieben wird.",
  },
  {
    step: "02",
    title: "Strukturieren",
    description:
      "Architektur, Informationsfluss und visuelle Hierarchie als belastbares Fundament.",
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
      "Details, Animationen und Feinschliff – bis sich das Produkt im Alltag richtig anfühlt.",
  },
] as const;

export const techStack = [
  { name: "Next.js", category: "Framework" },
  { name: "TypeScript", category: "Sprache" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Motion", category: "Animation" },
  { name: "Supabase", category: "Backend" },
  { name: "Stripe", category: "Payments" },
  { name: "AI / API Integrationen", category: "Intelligenz" },
  { name: "SEO / Performance", category: "Qualität" },
  { name: "UX / UI Design", category: "Design" },
] as const;
