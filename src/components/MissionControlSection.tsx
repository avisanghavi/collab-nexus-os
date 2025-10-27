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
    offset: ["start end", "center center"]
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
    <section ref={containerRef} id="mission-control" className="relative overflow-visible bg-gradient-to-b from-muted/30 to-background -mt-[50rem]">
      {/* Top border with glow effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <ContainerScroll
        titleComponent={<div className="h-0"></div>}
      >
        <div className="h-full w-full bg-card p-6 relative">
          {/* Scattered logos that organize into the strip */}
          {connectedLogos.map((logo, index) => {
            const scattered = scatteredPositions[index];
            // Final position in organized strip at top
            const finalX = (index - 4.5) * 68;
            const finalY = -180; // Position at top of dashboard
            
            const logoX = useTransform(scrollYProgress, [0, 0.7], [scattered.x, finalX]);
            const logoY = useTransform(scrollYProgress, [0, 0.7], [scattered.y, finalY]);
            const logoRotate = useTransform(scrollYProgress, [0, 0.7], [scattered.rotate, 0]);
            const logoScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.85]);


            return (
              <motion.div
                key={`logo-${index}`}
                className="absolute top-1/2 left-1/2 z-20"
                style={{
                  x: logoX,
                  y: logoY,
                  rotate: logoRotate,
                  scale: logoScale,
                }}
              >
                <div className="w-14 h-14 rounded-xl bg-white shadow-lg p-2.5 relative group transition-transform hover:scale-110">
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


          {/* Dashboard content - only fades in after logos have organized */}
          <motion.div
            className="h-full"
            style={{
              opacity: useTransform(scrollYProgress, [0.5, 0.9], [0, 1]),
            }}
          >
            {/* Organized logos strip placeholder at top - hidden, just for spacing */}
            <div className="h-20 mb-6 border-b border-border bg-muted/30" />


            {/* Dashboard grid */}
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
          </motion.div>
        </div>
      </ContainerScroll>
    </section>
  );
};

export default MissionControlSection;
