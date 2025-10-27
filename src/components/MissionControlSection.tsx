import { useEffect, useRef, useState } from "react";
import { CheckCircle2, GitBranch, Mail, Calendar, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Import logos for the connected dashboard
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

const MissionControlSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const connectedLogos = [
    { src: gmailLogo, name: "Gmail" },
    { src: outlookLogo, name: "Outlook" },
    { src: googleCalendarLogo, name: "Calendar" },
    { src: teamsLogo, name: "Teams" },
    { src: slackLogo, name: "Slack" },
    { src: jiraLogo, name: "Jira" },
    { src: confluenceLogo, name: "Confluence" },
    { src: githubLogo, name: "GitHub" },
    { src: hubspotLogo, name: "HubSpot" },
    { src: openaiLogo, name: "OpenAI" },
  ];
  const tasks = [
    { id: 1, title: "Fix authentication bug", status: "In Progress", source: "JIRA" },
    { id: 2, title: "Review PR #234", status: "Pending", source: "GitHub" },
    { id: 3, title: "Update API docs", status: "Complete", source: "Notion" },
  ];

  const metrics = [
    { label: "Sprint Progress", value: "82%", trend: "+12%" },
    { label: "Team Velocity", value: "23", trend: "+5" },
    { label: "Active Tasks", value: "47", trend: "-3" },
  ];

  return (
    <section ref={sectionRef} id="mission-control" className="py-32 relative overflow-hidden bg-gradient-to-b from-muted/30 to-background">
      {/* Top border with glow effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
      
      <div className="container px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              Mission Control Layer
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold">
              The Single Source of Truth for
              <span className="block mt-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Cross-Team Collaboration
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              HeyJarvis doesn't replace your tools — it connects them.
            </p>
          </div>

          {/* Connected logos strip - positioned between heading and dashboard */}
          <div className="flex items-center justify-center mb-12">
            <div className={`flex items-center gap-3 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border shadow-elegant transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              {connectedLogos.map((logo, index) => (
                <div
                  key={index}
                  className="relative"
                  style={{ 
                    animationDelay: `${index * 0.08}s`,
                    animation: isVisible ? 'fade-in-up 0.6s ease-out forwards' : 'none',
                  }}
                >
                  <div className="w-14 h-14 rounded-xl bg-white shadow-md p-2.5 relative group transition-transform hover:scale-110 hover:shadow-lg">
                    <img 
                      src={logo.src} 
                      alt={logo.name}
                      className="w-full h-full object-contain"
                    />
                    {/* Tooltip */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="text-xs font-medium text-muted-foreground whitespace-nowrap bg-card px-3 py-1.5 rounded-lg shadow-lg border border-border">
                        {logo.name}
                      </div>
                    </div>
                  </div>
                  {/* Connection lines between logos */}
                  {index < connectedLogos.length - 1 && (
                    <div className="absolute top-1/2 -right-3 w-3 h-px bg-gradient-to-r from-primary/50 to-secondary/50 animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Vertical connection lines from logos to dashboard */}
          <div className={`relative h-12 mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full">
              {/* Multiple lines fanning down to dashboard */}
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 h-full w-px bg-gradient-to-b from-primary/20 to-transparent"
                  style={{
                    left: `${15 + i * 12}%`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
          </div>
          {/* Dashboard Demo */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-elegant animate-fade-in-up">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left: My Tasks */}
              <Card className="p-6 space-y-4 border-primary/20">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    My Tasks
                  </h3>
                  <Badge variant="secondary" className="text-xs">Live</Badge>
                </div>
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{task.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {task.source}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{task.status}</span>
                          </div>
                        </div>
                        <div className={`w-2 h-2 rounded-full mt-1.5 ${
                          task.status === "Complete" ? "bg-primary" :
                          task.status === "In Progress" ? "bg-secondary animate-pulse" :
                          "bg-muted-foreground"
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Center: Metrics */}
              <Card className="p-6 space-y-4 border-secondary/20">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  <h3 className="font-semibold">Real-Time Metrics</h3>
                </div>
                <div className="space-y-4">
                  {metrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{metric.label}</span>
                        <span className="text-xs font-medium text-primary">{metric.trend}</span>
                      </div>
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-bold">{metric.value}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                          style={{ width: metric.value.includes('%') ? metric.value : '70%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Right: Smart Suggestions */}
              <Card className="p-6 space-y-4 border-accent/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <h3 className="font-semibold">AI Suggestions</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-accent mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium mb-1">Unread in Outlook</p>
                        <p className="text-xs text-muted-foreground">3 emails need review</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-secondary mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium mb-1">Schedule sync</p>
                        <p className="text-xs text-muted-foreground">Team standup in 15 min</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <GitBranch className="w-4 h-4 text-primary mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium mb-1">Code review ready</p>
                        <p className="text-xs text-muted-foreground">2 PRs awaiting approval</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionControlSection;
