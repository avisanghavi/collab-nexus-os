import { useState, useEffect } from "react";
import { Plug, Database, Users, Zap, Shield, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Import logos for visual previews
import gmailLogo from "@/assets/logos/gmail.png";
import slackLogo from "@/assets/logos/slack.png";
import jiraLogo from "@/assets/logos/jira.png";
import githubLogo from "@/assets/logos/github.png";

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: Plug,
      title: "Connect",
      description: "Plug into Slack, Jira, GitHub, Outlook",
      color: "from-primary to-primary-glow",
    },
    {
      icon: Database,
      title: "Centralize",
      description: "AI builds a live knowledge graph",
      color: "from-secondary to-secondary-glow",
    },
    {
      icon: Users,
      title: "Collaborate",
      description: "Unified dashboards & smart notifications",
      color: "from-accent to-accent/70",
    },
    {
      icon: Zap,
      title: "Execute",
      description: "Close the loop to the right system",
      color: "from-primary via-secondary to-accent",
    },
    {
      icon: Shield,
      title: "Secure",
      description: "SOC 2, GDPR, SSO/SAML, RBAC",
      color: "from-primary to-accent",
    },
  ];

  const results = [
    { value: "92%", label: "Stakeholder Satisfaction" },
    { value: "73%", label: "Rework Reduction" },
    { value: "2.5×", label: "Faster Time-to-Market" },
    { value: "340%", label: "Average First-Year ROI" },
  ];

  const renderStepPreview = () => {
    switch (activeStep) {
      case 0: // Connect
        return (
          <div className="flex items-center justify-center gap-8 flex-wrap p-8">
            {[gmailLogo, slackLogo, jiraLogo, githubLogo].map((logo, i) => (
              <div key={i} className="relative animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-16 h-16 rounded-xl bg-white shadow-md p-3">
                  <img src={logo} alt="Tool" className="w-full h-full object-contain" />
                </div>
                {i < 3 && (
                  <div className="absolute top-1/2 -right-8 w-8 h-px border-t-2 border-dashed border-primary/40" />
                )}
              </div>
            ))}
          </div>
        );
      
      case 1: // Centralize
        return (
          <div className="flex items-center justify-center p-8">
            <div className="relative w-64 h-64">
              {/* Central node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary shadow-glow flex items-center justify-center animate-scale-in">
                <Database className="w-10 h-10 text-white" />
              </div>
              {/* Orbiting nodes */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center animate-fade-in"
                  style={{
                    top: `${50 + 35 * Math.sin((i * Math.PI * 2) / 6)}%`,
                    left: `${50 + 35 * Math.cos((i * Math.PI * 2) / 6)}%`,
                    transform: 'translate(-50%, -50%)',
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
              ))}
            </div>
          </div>
        );
      
      case 2: // Collaborate
        return (
          <div className="p-6 space-y-3 animate-fade-in">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium text-sm">Review PR #234</div>
                <div className="text-xs text-muted-foreground">GitHub · Due today</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                <div className="text-2xl font-bold text-secondary">82%</div>
                <div className="text-xs text-muted-foreground">Sprint Progress</div>
              </div>
              <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                <div className="text-2xl font-bold text-accent">23</div>
                <div className="text-xs text-muted-foreground">Team Velocity</div>
              </div>
            </div>
          </div>
        );
      
      case 3: // Execute
        return (
          <div className="flex items-center justify-center p-8 animate-fade-in">
            <div className="space-y-4 w-full max-w-xs">
              <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Schedule Meeting</span>
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div className="text-xs text-muted-foreground">→ Added to Outlook Calendar</div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Create Ticket</span>
                  <Zap className="w-4 h-4 text-secondary" />
                </div>
                <div className="text-xs text-muted-foreground">→ Posted to Jira</div>
              </div>
            </div>
          </div>
        );
      
      case 4: // Secure
        return (
          <div className="flex items-center justify-center p-8 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center justify-center mb-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-accent">
                  <Shield className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {['SOC 2 Type II', 'GDPR Compliant', 'SSO/SAML', 'Role-Based Access'].map((item) => (
                  <div key={item} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Deploys in hours, not months. Teams keep their tools; HeyJarvis connects them.
            </p>
          </div>

          {/* Stepper + Preview */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left: Vertical Stepper */}
            <div className="space-y-2">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-full text-left p-6 rounded-xl transition-all ${
                    activeStep === index
                      ? 'bg-card border-2 border-primary shadow-md'
                      : 'bg-muted/30 border-2 border-transparent hover:border-border'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${step.color} flex-shrink-0`}>
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{step.title}</h3>
                        {activeStep === index && (
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Live Preview */}
            <div className="relative">
              <div className="sticky top-8">
                <Card className="p-8 min-h-[400px] flex items-center justify-center bg-gradient-to-br from-muted/30 to-background border-2">
                  <div className="w-full">
                    {renderStepPreview()}
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Results Band */}
          <div className="pt-12 border-t border-border">
            <div className="text-center mb-8">
              <p className="text-lg font-medium text-muted-foreground">
                From collaboration chaos to execution excellence
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map((result, index) => (
                <Card
                  key={index}
                  className="p-6 text-center hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
                    {result.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{result.label}</div>
                </Card>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-6">
              * Projected, based on industry benchmarks (McKinsey, PMI, Forrester, Gartner)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
