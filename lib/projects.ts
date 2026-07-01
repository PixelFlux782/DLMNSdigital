export type ProjectStatus = "Live" | "In Entwicklung" | "Beta";

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
      "E-commerce and website analysis tool for clearer conversion, trust and action priorities.",
    problem:
      "Many shops and websites lose customers without knowing where friction appears.",
    approach:
      "A tool system that makes UX, trust, conversion and technical signals visible and translates them into practical recommendations.",
    systemLogic: "Analysis → Scoring → Action",
    outcome: "Live MVP — measurable website diagnosis with AI-supported recommendations.",
    techStack: ["Next.js", "Supabase", "Stripe", "AI"],
    status: "Live",
    statusLabel: "Live MVP",
    url: "https://shophebel.vercel.app/",
    tags: ["E-Commerce", "Conversion", "AI"],
    accent: "cyan",
  },
  {
    id: "symbolraum",
    name: "Symbolraum",
    description:
      "An interactive meaning space for symbols, Hebrew language layers and connected knowledge.",
    problem:
      "Complex meaning networks are difficult to access through linear interfaces.",
    approach:
      "A digital experience that presents symbols, relations and meaning as a navigable network.",
    systemLogic: "Symbol → Relation → Meaning → Experience",
    outcome: "Active development — connected meaning space with codex and experience layers.",
    techStack: ["Meaning Graph", "Hebrew Codex", "React Flow", "Next.js"],
    status: "In Entwicklung",
    statusLabel: "Aktive Entwicklung",
    url: "https://bibel-symbolraum.vercel.app/",
    tags: ["Experience", "Knowledge", "Interactive"],
    accent: "cyan",
  },
];
