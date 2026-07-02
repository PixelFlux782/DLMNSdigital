import { builtSystems } from "@/lib/site";

export type SystemDetailId = "shophebel" | "symbolraum";

export type SystemSection = {
  eyebrow: string;
  title: string;
  text: string;
  points?: readonly string[];
};

export type SystemDetail = {
  id: SystemDetailId;
  name: string;
  category: string;
  status: string;
  href: string;
  externalUrl?: string;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta?: string;
  };
  signalLine: readonly string[];
  sections: readonly SystemSection[];
  suitableFor?: readonly string[];
};

export const systemsOverview = {
  eyebrow: "Produktwelt",
  title: "Digitale Systeme von DLMNS",
  description:
    "DLMNS entwickelt eigene digitale Produkte, Analysewerkzeuge und individuelle Systeme. Jedes System verbindet Strategie, Interface, Datenstruktur und technische Umsetzung zu einem belastbaren Werkzeug.",
  systems: builtSystems,
} as const;

export const systemDetails: Record<SystemDetailId, SystemDetail> = {
  shophebel: {
    id: "shophebel",
    name: "Shophebel",
    category: "Analyse- und Optimierungssystem",
    status: "Live-MVP",
    href: "/systeme/shophebel",
    externalUrl: "https://shophebel.vercel.app/",
    hero: {
      eyebrow: "Shophebel / Onlineshop-Analyse",
      title: "Ein klares Diagnosesystem für bessere Shop-Entscheidungen.",
      description:
        "Shophebel analysiert Onlineshops entlang der Signale, die Vertrauen, Orientierung und Conversion beeinflussen. Aus vielen Einzelbeobachtungen entsteht eine priorisierte Handlungskarte.",
      primaryCta: "System anfragen",
      secondaryCta: "Live-System öffnen",
    },
    signalLine: ["Struktur", "Vertrauen", "Angebot", "Nutzerführung", "Conversion"],
    sections: [
      {
        eyebrow: "Problem",
        title: "Shops verlieren Umsatz, ohne die Ursachen klar zu sehen.",
        text:
          "Viele Onlineshops haben keine einzelne offensichtliche Schwachstelle. Der Umsatzverlust entsteht aus kleinen Brüchen: unklare Führung, schwache Vertrauenssignale, ein schwer lesbares Angebot oder technische Reibung im entscheidenden Moment.",
        points: [
          "Unklare Prioritäten zwischen Design, Technik und Angebot",
          "Conversion-Probleme ohne belastbare Diagnose",
          "Viele Meinungen, aber zu wenig strukturierte Evidenz",
        ],
      },
      {
        eyebrow: "Systemlogik",
        title: "Analyse von Struktur, Vertrauen, Angebot, Nutzerführung und Conversion-Signalen.",
        text:
          "Shophebel betrachtet den Shop nicht als einzelne Seite, sondern als System aus Wahrnehmung, Entscheidung und Handlung. Die Analyse verdichtet sichtbare und technische Signale zu einem nachvollziehbaren Bewertungsmodell.",
        points: [
          "Struktur: Informationsarchitektur, Lesbarkeit und Orientierung",
          "Vertrauen: Proof, Sicherheit, Klarheit und Markenwirkung",
          "Angebot: Nutzen, Differenzierung, Preislogik und Entscheidbarkeit",
          "Nutzerführung: Wege, Friktion, Fokus und nächste Schritte",
          "Conversion-Signale: Hemmnisse, Chancen und Priorität",
        ],
      },
      {
        eyebrow: "Ergebnis",
        title: "Score, Findings, Prioritäten und Handlungsempfehlungen.",
        text:
          "Das Ergebnis ist keine lose Ideensammlung. Shophebel liefert eine lesbare Diagnose mit Score, konkreten Findings, priorisierten Handlungsfeldern und Empfehlungen, die als Grundlage für Umsetzung oder Weiterentwicklung dienen.",
        points: [
          "Gesamtscore und Teilsignale",
          "Konkrete Findings statt abstrakter Bewertung",
          "Prioritäten nach Wirkung und Umsetzbarkeit",
          "Handlungsempfehlungen für Design, Content, Technik und Vertrauen",
        ],
      },
    ],
    suitableFor: [
      "Onlineshops mit unklarer Conversion-Performance",
      "Marken, die Vertrauen und Angebotsschärfe verbessern wollen",
      "Teams, die vor einem Redesign belastbare Prioritäten brauchen",
      "Agenturen oder Betreiber, die eine unabhängige Diagnose suchen",
    ],
  },
  symbolraum: {
    id: "symbolraum",
    name: "Symbolraum",
    category: "Interaktiver Bedeutungsraum",
    status: "Aktive Entwicklung",
    href: "/systeme/symbolraum",
    externalUrl: "https://bibel-symbolraum.vercel.app/",
    hero: {
      eyebrow: "Symbolraum / Bedeutungsarchitektur",
      title: "Ein interaktiver Raum für Symbole, Texte und verbundene Bedeutung.",
      description:
        "Symbolraum macht biblische Symbole nicht als starres Nachschlagewerk sichtbar, sondern als navigierbare Erfahrung aus Codex, Relationen, Räumen und persönlichem Pfad.",
      primaryCta: "System besprechen",
      secondaryCta: "Vorschau öffnen",
    },
    signalLine: ["Codex", "Symbolnetz", "Räume", "Relationen", "Persönlicher Pfad"],
    sections: [
      {
        eyebrow: "Idee",
        title: "Kein klassisches Bibellexikon, sondern ein erfahrbarer Bedeutungsraum.",
        text:
          "Symbolraum ordnet Bedeutung nicht nur alphabetisch oder linear. Das System zeigt, wie Symbole, Motive, Räume und Texte miteinander verbunden sind, und lässt Nutzer diese Beziehungen schrittweise erkunden.",
        points: [
          "Bedeutung wird über Beziehungen erfahrbar",
          "Texte, Symbole und Motive bleiben im Zusammenhang",
          "Die Oberfläche führt ruhig, ohne Bedeutung zu überladen",
        ],
      },
      {
        eyebrow: "Systemarchitektur",
        title: "Codex, Symbolnetz, Räume und persönlicher Pfad.",
        text:
          "Die Architektur verbindet kuratierte Inhalte mit einer relationalen Oberfläche. Der Codex hält Begriffe und Texte stabil, das Symbolnetz zeigt Verbindungen, Räume bündeln thematische Felder und der persönliche Pfad macht Orientierung individuell nachvollziehbar.",
        points: [
          "Codex: stabile Einträge, Begriffe und Textbezüge",
          "Symbolnetz: Relationen zwischen Symbolen, Motiven und Themen",
          "Räume: fokussierte Bedeutungsfelder statt endloser Listen",
          "Persönlicher Pfad: individuelle Navigation durch die Inhalte",
        ],
      },
      {
        eyebrow: "DLMNS-System",
        title: "Warum Symbolraum ein DLMNS-System ist.",
        text:
          "Symbolraum verbindet inhaltliche Tiefe mit digitaler Produktlogik. Das System braucht Struktur, Interface, Datenmodell und eine ruhige Interaktionsebene, damit komplexe Bedeutung zugänglich wird, ohne kitschig oder beliebig zu wirken.",
        points: [
          "Bedeutung wird als Produktarchitektur modelliert",
          "Das Interface dient der Orientierung, nicht der Inszenierung",
          "Technik, Inhalt und Erfahrung greifen als ein System ineinander",
        ],
      },
    ],
  },
} as const;
