export type ProjectStatus = "Live" | "In Entwicklung" | "Konzept";

export type Project = {
  id: string;
  name: string;
  description: string;
  problem: string;
  approach: string;
  systemLogic: string;
  outcome: string;
  techStack: string[];
  status: ProjectStatus;
  statusLabel: string;
  url: string;
  tags: string[];
  accent: "gold" | "cyan";
};

export const projects: Project[] = [
  {
    id: "shophebel",
    name: "Shophebel",
    description:
      "Analyse- und Optimierungssystem für Onlineshops mit Fokus auf Conversion, Vertrauen und klare Handlung.",
    problem:
      "Viele Shops verlieren Umsatz, ohne präzise zu sehen, wo Vertrauen, Orientierung oder technische Qualität brechen.",
    approach:
      "Ein Diagnosesystem macht UX-, Trust-, Conversion- und Techniksignale sichtbar und übersetzt sie in priorisierte Empfehlungen.",
    systemLogic: "Analyse → Scoring → Handlung",
    outcome:
      "Live-MVP mit messbarer Shopdiagnose und KI-gestützten Optimierungshinweisen.",
    techStack: ["Next.js", "Supabase", "Stripe", "KI"],
    status: "Live",
    statusLabel: "Live-MVP",
    url: "https://shophebel.vercel.app/",
    tags: ["E-Commerce", "Conversion", "Analyse"],
    accent: "cyan",
  },
  {
    id: "symbolraum",
    name: "Symbolraum",
    description:
      "Interaktiver Bedeutungsraum für biblische Symbole, Räume, Texte und verbundene Wissensstrukturen.",
    problem:
      "Komplexe Bedeutungsnetze sind in linearen Interfaces schwer zugänglich und verlieren schnell ihren Zusammenhang.",
    approach:
      "Eine digitale Erfahrung stellt Symbole, Relationen und Bedeutung als navigierbares Netzwerk dar.",
    systemLogic: "Symbol → Relation → Bedeutung → Erfahrung",
    outcome:
      "Aktive Entwicklung eines verbundenen Bedeutungsraums mit Codex- und Erfahrungsebenen.",
    techStack: ["Meaning Graph", "Text-Codex", "React Flow", "Next.js"],
    status: "In Entwicklung",
    statusLabel: "Aktive Entwicklung",
    url: "https://bibel-symbolraum.vercel.app/",
    tags: ["Experience", "Wissen", "Interaktion"],
    accent: "cyan",
  },
];
