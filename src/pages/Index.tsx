import { useState, useEffect } from "react";
import { Navbar1 } from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MissionControlSectionNew from "@/components/MissionControlSectionNew";
import LoadingScreen from "@/components/LoadingScreen";
// import ProblemSection from "@/components/ProblemSection";
// import OneLayerSection from "@/components/OneLayerSection";
// import HowItWorksSection from "@/components/HowItWorksSection";
// import ResultsSection from "@/components/ResultsSection";
// import ROICalculator from "@/components/ROICalculator";
// import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Check if user has already seen loading screen this session
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoading');
    if (hasSeenLoading) {
      setShowLoading(false);
      setHasLoaded(true);
    }
  }, []);

  const handleLoadingFinish = () => {
    setShowLoading(false);
    setHasLoaded(true);
    sessionStorage.setItem('hasSeenLoading', 'true');
  };

  return (
    <>
      {showLoading && <LoadingScreen onFinish={handleLoadingFinish} />}
      {hasLoaded && (
        <>
          <Navbar1 />
          <main className="min-h-screen">
            <HeroSection />
            <MissionControlSectionNew />
            {/* <ProblemSection />
            <OneLayerSection />
            <HowItWorksSection />
            <ResultsSection />
            <ROICalculator />
            <FinalCTA /> */}
          </main>
        </>
      )}
    </>
  );
};

export default Index;
