import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useState } from "react";

// Import all logos
import gmailLogo from "@/assets/logos/gmail.png";
import outlookLogo from "@/assets/logos/outlook.png";
import googleCalendarLogo from "@/assets/logos/google-calendar.png";
import teamsLogo from "@/assets/logos/teams.png";
import slackLogo from "@/assets/logos/slack.png";
import jiraLogo from "@/assets/logos/jira.png";
import confluenceLogo from "@/assets/logos/confluence.png";
import githubLogo from "@/assets/logos/github.png";
import hubspotLogo from "@/assets/logos/hubspot.png";
import openaiLogo from "@/assets/logos/openai.png";

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
    { src: gmailLogo, name: "Gmail", x: -30, y: -20 },
    { src: outlookLogo, name: "Outlook", x: 30, y: -30 },
    { src: googleCalendarLogo, name: "Google Calendar", x: -40, y: 10 },
    { src: googleCalendarLogo, name: "Outlook Calendar", x: 40, y: 15 },
    { src: teamsLogo, name: "Teams", x: -35, y: 30 },
    { src: slackLogo, name: "Slack", x: 25, y: -15 },
    { src: jiraLogo, name: "Jira", x: -25, y: -35 },
    { src: confluenceLogo, name: "Confluence", x: 35, y: 25 },
    { src: githubLogo, name: "GitHub", x: -20, y: 25 },
    { src: hubspotLogo, name: "HubSpot", x: 20, y: -25 },
    { src: openaiLogo, name: "OpenAI", x: 0, y: -40 },
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
              <div className="p-4 rounded-2xl bg-white shadow-lg hover-lift">
                <img 
                  src={logo.src} 
                  alt={logo.name}
                  className="w-12 h-12 object-contain"
                />
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
