import { Navbar1 } from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import OneLayerSection from "@/components/OneLayerSection";
import MissionControlSectionNew from "@/components/MissionControlSectionNew";
import HowItWorksSection from "@/components/HowItWorksSection";
import ResultsSection from "@/components/ResultsSection";
import ROICalculator from "@/components/ROICalculator";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <>
      <Navbar1 />
      <main className="min-h-screen">
        <HeroSection />
        <MissionControlSectionNew />
        <ProblemSection />
        <OneLayerSection />
        <HowItWorksSection />
        <ResultsSection />
        <ROICalculator />
        <FinalCTA />
      </main>
    </>
  );
};

export default Index;
