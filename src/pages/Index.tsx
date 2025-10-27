import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import MissionControlSection from "@/components/MissionControlSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ResultsSection from "@/components/ResultsSection";
import TrustSection from "@/components/TrustSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <MissionControlSection />
      <ProblemSection />
      <HowItWorksSection />
      <ResultsSection />
      <TrustSection />
      <CTASection />
    </main>
  );
};

export default Index;
