import type { Metadata } from "next";
import { SystemDetailPage } from "@/components/systems/SystemDetailPage";
import { systemDetails } from "@/lib/systems";

export const metadata: Metadata = {
  title: "Symbolraum",
  description:
    "Symbolraum ist ein interaktiver Bedeutungsraum von DLMNS für Symbole, Texte, Relationen und persönliche Pfade.",
};

export default function SymbolraumPage() {
  return <SystemDetailPage detail={systemDetails.symbolraum} />;
}
