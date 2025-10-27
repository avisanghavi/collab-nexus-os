import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContainerScroll } from "@/components/ui/container-scroll";
import { useScroll, useTransform, motion } from "framer-motion";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Scattered initial positions for logos (circular-ish scattered pattern)
  const scatteredPositions = [
    { x: -120, y: -40, rotate: -15 },
    { x: 80, y: -80, rotate: 20 },
    { x: -50, y: 20, rotate: 10 },
    { x: 140, y: -20, rotate: -25 },
    { x: -150, y: -90, rotate: 15 },
    { x: 30, y: -120, rotate: -10 },
    { x: -90, y: 60, rotate: 25 },
    { x: 120, y: 40, rotate: -20 },
    { x: -30, y: -100, rotate: 12 },
    { x: 90, y: -50, rotate: -8 },
  ];

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
    <section ref={containerRef} id="mission-control" className="min-h-screen relative overflow-hidden bg-gradient-to-b from-muted/30 to-background py-20">
      {/* Top border with glow effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
      
      <div className="container px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-20 space-y-4">
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

          {/* Scattered logos preview area - floats above dashboard */}
          <div className="relative h-64 mb-[-200px] flex items-center justify-center">
            <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-border/30 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">See it in Action</p>
            </div>
            
            {connectedLogos.map((logo, index) => {
              const scattered = scatteredPositions[index];
              // Calculate final organized position in the dashboard header
              const finalX = (index - 4.5) * 70;
              const finalY = 280; // Distance to drop into dashboard
              
              const logoX = useTransform(scrollYProgress, [0, 0.4], [scattered.x, finalX]);
              const logoY = useTransform(scrollYProgress, [0, 0.4], [scattered.y, finalY]);
              const logoRotate = useTransform(scrollYProgress, [0, 0.4], [scattered.rotate, 0]);
              const logoScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);

              return (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    x: logoX,
                    y: logoY,
                    rotate: logoRotate,
                    scale: logoScale,
                  }}
                >
                  <div className="w-14 h-14 rounded-xl bg-white shadow-md p-2.5 relative group transition-transform hover:scale-110 hover:shadow-lg">
                    <img 
                      src={logo.src} 
                      alt={logo.name}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                      <div className="text-xs font-medium text-muted-foreground whitespace-nowrap bg-card px-3 py-1.5 rounded-lg shadow-lg border border-border">
                        {logo.name}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Dashboard - logos will land at its top */}
          <motion.div 
            className="rounded-2xl border border-border bg-card shadow-elegant overflow-hidden"
            style={{
              opacity: useTransform(scrollYProgress, [0.2, 0.5], [0.3, 1]),
            }}
          >
            {/* Dashboard header where logos land */}
            <div className="h-20 border-b border-border bg-muted/30 flex items-center justify-center">
              <div className="text-sm font-medium text-muted-foreground">Connected Tools</div>
            </div>
            
            {/* Dashboard content */}
            <div className="p-8">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Left: My Tasks */}
                <Card className="p-6 space-y-4 border-primary/20">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">My Tasks</h3>
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
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium mb-1">Unread in Outlook</p>
                        <p className="text-xs text-muted-foreground">3 emails need review</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium mb-1">Schedule sync</p>
                        <p className="text-xs text-muted-foreground">Team standup in 15 min</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium mb-1">Code review ready</p>
                        <p className="text-xs text-muted-foreground">2 PRs awaiting approval</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionControlSection;
