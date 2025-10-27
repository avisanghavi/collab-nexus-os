import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { 
  Mail, 
  Calendar, 
  MessageSquare, 
  GitBranch, 
  FileText, 
  Database,
  Sparkles,
  Inbox
} from "lucide-react";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToDemo = () => {
    document.getElementById("mission-control")?.scrollIntoView({ behavior: "smooth" });
  };

  // Calculate convergence based on scroll
  const convergenceProgress = Math.min(scrollY / 400, 1);

  const logos = [
    { Icon: Mail, name: "Gmail", color: "text-red-500", x: -30, y: -20 },
    { Icon: Inbox, name: "Outlook", color: "text-blue-600", x: 30, y: -30 },
    { Icon: Calendar, name: "Google Calendar", color: "text-blue-500", x: -40, y: 10 },
    { Icon: Calendar, name: "Outlook Calendar", color: "text-blue-700", x: 40, y: 15 },
    { Icon: MessageSquare, name: "Teams", color: "text-purple-600", x: -35, y: 30 },
    { Icon: MessageSquare, name: "Slack", color: "text-purple-500", x: 25, y: -15 },
    { Icon: FileText, name: "Jira", color: "text-blue-600", x: -25, y: -35 },
    { Icon: FileText, name: "Confluence", color: "text-blue-500", x: 35, y: 25 },
    { Icon: GitBranch, name: "GitHub", color: "text-gray-700", x: -20, y: 25 },
    { Icon: Database, name: "HubSpot", color: "text-orange-500", x: 20, y: -25 },
    { Icon: Sparkles, name: "OpenAI", color: "text-emerald-500", x: 0, y: -40 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-hero opacity-50" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 gradient-glow animate-glow-pulse" />
      
      {/* Floating logos that converge on scroll */}
      <div className="absolute inset-0 flex items-center justify-center">
        {logos.map((logo, index) => {
          const initialX = logo.x * 8;
          const initialY = logo.y * 8;
          const currentX = initialX * (1 - convergenceProgress);
          const currentY = initialY * (1 - convergenceProgress);
          const opacity = convergenceProgress > 0.8 ? 1 - (convergenceProgress - 0.8) * 5 : 0.6 + convergenceProgress * 0.4;

          return (
            <div
              key={index}
              className="absolute transition-all duration-700 ease-out"
              style={{
                transform: `translate(${currentX}px, ${currentY}px) scale(${1 - convergenceProgress * 0.3})`,
                opacity: opacity,
              }}
            >
              <div
                className={`p-4 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg hover-lift ${logo.color}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <logo.Icon className="w-8 h-8" />
              </div>
            </div>
          );
        })}

        {/* Central orb that appears as logos converge */}
        <div
          className="absolute w-32 h-32 rounded-full gradient-primary transition-all duration-700"
          style={{
            opacity: convergenceProgress * 0.8,
            transform: `scale(${convergenceProgress})`,
            boxShadow: `0 0 ${convergenceProgress * 100}px hsl(var(--primary-glow) / ${convergenceProgress * 0.6})`,
          }}
        />
      </div>

      <div className="container relative z-10 px-6 py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance">
            The Universal
            <span className="block mt-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Collaboration Layer
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Real-time clarity. Unified velocity. Seamless connection.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button 
              variant="hero" 
              size="xl"
              onClick={scrollToDemo}
              className="group"
            >
              See it in Action
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroOutline" size="xl">
              <Play className="mr-1" />
              Book a Demo
            </Button>
          </div>

          <div className="pt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
              <span>SOC 2 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary animate-glow-pulse" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-glow-pulse" />
              <span>Enterprise SSO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
