import { Hero } from "@/components/home/Hero";
import { TheCore } from "@/components/core/TheCore";
import { CoreExperience } from "@/components/home/CoreExperience";
import { SystemThinkingSection } from "@/components/home/SystemThinkingSection";
import { SystemsShowcase } from "@/components/home/SystemsShowcase";
import { BuiltSystemsSection } from "@/components/home/BuiltSystemsSection";
import { InsideTheMachine } from "@/components/home/InsideTheMachine";
import { ArchitectureLayers } from "@/components/home/ArchitectureLayers";
import { AtelierSection } from "@/components/home/AtelierSection";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <TheCore />
      <CoreExperience />
      <SystemThinkingSection />
      <SystemsShowcase />
      <BuiltSystemsSection />
      <InsideTheMachine />
      <ArchitectureLayers />
      <AtelierSection />
      <CTASection />
    </>
  );
}
