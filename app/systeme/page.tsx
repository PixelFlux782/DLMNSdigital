import type { Metadata } from "next";
import { SystemOverviewPage } from "@/components/systems/SystemOverviewPage";

export const metadata: Metadata = {
  title: "Digitale Systeme von DLMNS",
  description:
    "Übersicht über Shophebel, Symbolraum und individuelle digitale Systeme von DLMNS Digital.",
};

export default function SystemePage() {
  return <SystemOverviewPage />;
}
