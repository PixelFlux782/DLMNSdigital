import type { Metadata } from "next";
import { SystemDetailPage } from "@/components/systems/SystemDetailPage";
import { systemDetails } from "@/lib/systems";

export const metadata: Metadata = {
  title: "Shophebel",
  description:
    "Shophebel ist ein Analyse- und Optimierungssystem von DLMNS für Onlineshops, Conversion-Signale und klare Handlungsempfehlungen.",
};

export default function ShophebelPage() {
  return <SystemDetailPage detail={systemDetails.shophebel} />;
}
