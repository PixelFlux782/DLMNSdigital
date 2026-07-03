import { builtSystems } from "@/lib/site";

export type SystemDetailId = "shophebel" | "symbolraum";

export type SystemSection = {
  eyebrow: string;
  title: string;
  text: string;
  points?: readonly string[];
};

export type SystemMetric = {
  label: string;
  value: string;
  detail: string;
};

export type SystemLogicStep = {
  label: string;
  detail: string;
};

export type SystemDetail = {
  id: SystemDetailId;
  name: string;
  category: string;
  status: string;
  href: string;
  externalUrl?: string;
  visualVariant: "dashboard" | "meaning";
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta?: string;
  };
  signalLine: readonly string[];
  metrics: readonly SystemMetric[];
  logicSteps: readonly SystemLogicStep[];
  focusAreas: readonly string[];
  resultItems?: readonly string[];
  suitableForTitle?: string;
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
    visualVariant: "dashboard",
    hero: {
      eyebrow: "Shophebel / Onlineshop-Analyse",
      title: "Analyse- und Optimierungssystem für Onlineshops.",
      description:
        "Shophebel macht sichtbar, wo ein Shop Umsatz verliert: in Vertrauen, Angebot, Nutzerführung, Conversion, Technik oder Struktur. Aus vielen Signalen entsteht ein Score mit priorisierten Empfehlungen.",
      primaryCta: "Shop analysieren",
      secondaryCta: "System anfragen",
    },
    signalLine: ["Erfassen", "Analysieren", "Bewerten", "Priorisieren", "Empfehlen"],
    metrics: [
      {
        label: "Diagnose",
        value: "6 Bereiche",
        detail: "Trust, Angebot, Führung, Conversion, Technik und Struktur.",
      },
      {
        label: "Output",
        value: "Score + Findings",
        detail: "Verdichtete Bewertung mit konkreten Handlungsfeldern.",
      },
      {
        label: "Logik",
        value: "Priorisiert",
        detail: "Empfehlungen werden nach Wirkung und Umsetzbarkeit geordnet.",
      },
    ],
    logicSteps: [
      {
        label: "Website erfassen",
        detail: "Shop-Struktur, Seitenzustand und sichtbare Conversion-Signale werden gesammelt.",
      },
      {
        label: "Signale analysieren",
        detail: "Trust, Angebot, Nutzerführung, Technik und Struktur werden getrennt bewertet.",
      },
      {
        label: "Score bilden",
        detail: "Ein nachvollziehbares Bewertungsmodell verdichtet die Einzelsignale.",
      },
      {
        label: "Empfehlungen priorisieren",
        detail: "Findings werden in konkrete nächste Schritte übersetzt.",
      },
    ],
    focusAreas: [
      "Vertrauen",
      "Angebot",
      "Nutzerführung",
      "Conversion",
      "Technik",
      "Struktur",
    ],
    resultItems: [
      "Score",
      "Findings",
      "Prioritäten",
      "Handlungsempfehlungen",
      "Optionaler KI-Report",
    ],
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
        title: "Website erfassen, Signale analysieren, Score bilden, Empfehlungen priorisieren.",
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
          "Das Ergebnis ist keine lose Ideensammlung. Shophebel liefert eine lesbare Diagnose mit Score, konkreten Findings, priorisierten Handlungsfeldern und Empfehlungen, die als Grundlage für Umsetzung oder Weiterentwicklung dienen. Optional kann daraus ein KI-Report entstehen, der Entscheidungen für Betreiber, Teams oder Dienstleister leichter macht.",
        points: [
          "Gesamtscore und Teilsignale",
          "Konkrete Findings statt abstrakter Bewertung",
          "Prioritäten nach Wirkung und Umsetzbarkeit",
          "Handlungsempfehlungen für Design, Content, Technik und Vertrauen",
        ],
      },
    ],
    suitableForTitle:
      "Besonders sinnvoll für Shops, die ihr Conversion-Potenzial nicht mehr aus dem Bauch heraus bewerten wollen.",
    suitableFor: [
      "Kleine Shops, die wissen müssen, welche Verbesserungen zuerst zählen.",
      "Wachsende Onlineshops, die Vertrauen, Angebot und Nutzerführung sauberer steuern wollen.",
      "Händler mit unklarem Conversion-Potenzial und vielen offenen Vermutungen.",
      "Teams, die vor Redesign, Relaunch oder Kampagnen eine belastbare Diagnose brauchen.",
    ],
  },
  symbolraum: {
    id: "symbolraum",
    name: "Symbolraum",
    category: "Interaktiver Bedeutungsraum",
    status: "Aktive Entwicklung",
    href: "/systeme/symbolraum",
    externalUrl: "https://bibel-symbolraum.vercel.app/",
    visualVariant: "meaning",
    hero: {
      eyebrow: "Symbolraum / Bedeutungsarchitektur",
      title: "Digitale Erfahrungsarchitektur für Symbole, Räume, Wörter und Texte.",
      description:
        "Symbolraum ist kein normales Bibellexikon. Das System übersetzt biblische Symbole, Räume, Wörter und Texte in einen verknüpften Bedeutungsraum, der ruhig erkundet werden kann.",
      primaryCta: "Symbolraum ansehen",
      secondaryCta: "Ähnliches System anfragen",
    },
    signalLine: ["Codex", "Symbolnetz", "Räume", "Relationen", "Persönlicher Pfad"],
    metrics: [
      {
        label: "Struktur",
        value: "Codex",
        detail: "Begriffe, Symbole und Textbezüge bleiben stabil geordnet.",
      },
      {
        label: "Erfahrung",
        value: "Räume",
        detail: "Bedeutungsfelder werden nicht nur gelesen, sondern räumlich erkundet.",
      },
      {
        label: "Orientierung",
        value: "Pfad",
        detail: "Nutzer folgen einem persönlichen Weg durch verbundene Inhalte.",
      },
    ],
    logicSteps: [
      {
        label: "Codex",
        detail: "Stabile Einträge für Symbole, Wörter, Räume und Textbezüge.",
      },
      {
        label: "Symbolnetz",
        detail: "Relationen zeigen, welche Motive und Bedeutungen zusammenwirken.",
      },
      {
        label: "Räume",
        detail: "Thematische Felder bündeln Inhalte zu ruhigen Erfahrungsbereichen.",
      },
      {
        label: "Persönlicher Pfad",
        detail: "Navigation wird als eigener Weg durch Bedeutung nachvollziehbar.",
      },
      {
        label: "Archiv",
        detail: "Gesehene Inhalte, Verbindungen und Vertiefungen bleiben wieder auffindbar.",
      },
    ],
    focusAreas: ["Codex", "Symbolnetz", "Räume", "Persönlicher Pfad", "Archiv"],
    resultItems: [
      "Zusammenhänge entdecken",
      "Texte tiefer verstehen",
      "Bedeutungen räumlich erfahren",
    ],
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
        title: "Codex, Symbolnetz, Räume, persönlicher Pfad und Archiv.",
        text:
          "Die Architektur verbindet kuratierte Inhalte mit einer relationalen Oberfläche. Der Codex hält Begriffe und Texte stabil, das Symbolnetz zeigt Verbindungen, Räume bündeln thematische Felder, das Archiv bewahrt Spuren und der persönliche Pfad macht Orientierung individuell nachvollziehbar.",
        points: [
          "Codex: stabile Einträge, Begriffe und Textbezüge",
          "Symbolnetz: Relationen zwischen Symbolen, Motiven und Themen",
          "Räume: fokussierte Bedeutungsfelder statt endloser Listen",
          "Persönlicher Pfad: individuelle Navigation durch die Inhalte",
          "Archiv: wieder auffindbare Verbindungen und Vertiefungen",
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
    suitableForTitle:
      "Geeignet für Inhalte, die zu komplex für lineare Listen sind und trotzdem präzise bleiben müssen.",
    suitableFor: [
      "Menschen, die biblische Texte in Zusammenhängen statt isolierten Begriffen verstehen wollen.",
      "Redaktionen, Bildungsprojekte oder Communities mit kuratierten Wissensbeständen.",
      "Organisationen, die komplexe Inhalte als digitale Erfahrung zugänglich machen wollen.",
      "Projekte, die Tiefe brauchen, aber keine überladene oder esoterische Oberfläche.",
    ],
  },
} as const;
