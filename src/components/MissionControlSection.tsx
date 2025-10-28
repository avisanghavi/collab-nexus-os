import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContainerScroll } from "@/components/ui/container-scroll";
import { useScroll, useTransform, motion, useInView } from "framer-motion";

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
    offset: ["start end", "end start"] // Animation uses full extended section height
  });

  // Animation values - complete by 55% when dashboard is fully visible and settled
  const logoProgress = useTransform(scrollYProgress, [0.05, 0.35], [0, 1]);
  const dashboardOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const dashboardY = useTransform(scrollYProgress, [0.2, 0.55], [400, 80]);
  const inView = useInView(containerRef, { amount: 0.3 });

  // SIMPLIFIED LOGGING - Track only at key milestones
  useEffect(() => {
    let lastLoggedMilestone = -1;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const currentMilestone = Math.floor(latest * 10); // Log every 10%

      if (currentMilestone !== lastLoggedMilestone) {
        lastLoggedMilestone = currentMilestone;

        const rect = containerRef.current?.getBoundingClientRect();
        console.log(`📊 ${(latest * 100).toFixed(0)}% | Logo:${logoProgress.get().toFixed(2)} Opacity:${dashboardOpacity.get().toFixed(2)} Y:${dashboardY.get().toFixed(0)} | Top:${rect?.top.toFixed(0)} Bottom:${rect?.bottom.toFixed(0)} Height:${rect?.height.toFixed(0)}`);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, logoProgress, dashboardOpacity, dashboardY]);

  // Scattered initial positions - maximally spread to fill all available space
  const scatteredPositions = [
    { x: -380, y: -180, rotate: -25 },  // Gmail - extreme left top
    { x: -150, y: -240, rotate: 28 },   // Outlook - left top
    { x: 80, y: -220, rotate: -18 },    // Calendar - center top
    { x: 340, y: -160, rotate: 32 },    // Teams - extreme right top
    { x: -340, y: 0, rotate: 20 },      // Slack - extreme left middle
    { x: -80, y: -100, rotate: -24 },   // Jira - center left
    { x: 180, y: -60, rotate: 22 },     // Confluence - center right
    { x: 400, y: 20, rotate: -20 },     // GitHub - extreme right middle
    { x: -260, y: 180, rotate: 26 },    // HubSpot - left bottom
    { x: 240, y: 160, rotate: -28 },    // OpenAI - right bottom
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
    <section ref={containerRef} id="mission-control" className="relative overflow-visible bg-gradient-to-b from-muted/30 to-background -mt-[50rem] pt-48 min-h-[150vh]" aria-label="Mission Control: Unified Dashboard with Connected Apps">
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
            
            const logoX = useTransform(logoProgress, [0, 1], [scattered.x, finalX]);
            const logoY = useTransform(logoProgress, [0, 1], [scattered.y, finalY]);
            const logoRotate = useTransform(logoProgress, [0, 1], [scattered.rotate, 0]);
            const logoScale = useTransform(logoProgress, [0, 1], [1, 0.95]);


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
                    alt={`${logo.name} logo - integrated app`}
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
            initial={{ opacity: 0, y: 400 }}
            style={{
              opacity: dashboardOpacity,
              y: dashboardY,
            }}
          >
            {/* Organized logos strip placeholder at top - hidden, just for spacing */}
            <div className="h-16 mb-8 border-b border-border/50" />


            {/* Dashboard grid - Enhanced spacing and design */}
            <div className="grid lg:grid-cols-3 gap-8 px-2">
              {/* Left: My Tasks */}
              <Card className="p-7 space-y-5 border-primary/20 bg-gradient-to-br from-card to-card/50 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">My Tasks</h3>
                  <Badge variant="secondary" className="text-xs font-semibold px-3 py-1">Live</Badge>
                </div>
                <div className="space-y-3.5">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 rounded-xl bg-muted/50 hover:bg-muted/70 transition-all hover:scale-[1.02] group border border-transparent hover:border-primary/10"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate mb-2">{task.title}</p>
                          <div className="flex items-center gap-2.5 mt-1.5">
                            <Badge variant="outline" className="text-xs font-medium px-2.5 py-0.5">
                              {task.source}
                            </Badge>
                            <span className="text-xs text-muted-foreground font-medium">{task.status}</span>
                          </div>
                        </div>
                        <div className={`w-2.5 h-2.5 rounded-full mt-1 ${
                          task.status === "Complete" ? "bg-primary shadow-lg shadow-primary/50" :
                          task.status === "In Progress" ? "bg-secondary animate-pulse shadow-lg shadow-secondary/50" :
                          "bg-muted-foreground"
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Center: Metrics */}
              <Card className="p-7 space-y-5 border-secondary/20 bg-gradient-to-br from-card to-card/50 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold">Real-Time Metrics</h3>
                </div>
                <div className="space-y-5">
                  {metrics.map((metric, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{metric.trend}</span>
                      </div>
                      <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold tracking-tight">{metric.value}</span>
                      </div>
                      <div className="h-2.5 bg-muted/70 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full transition-all duration-1000 shadow-lg"
                          style={{ width: metric.value.includes('%') ? metric.value : '70%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Right: Smart Suggestions */}
              <Card className="p-7 space-y-5 border-accent/20 bg-gradient-to-br from-card to-card/50 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-lg shadow-accent/50" />
                  <h3 className="text-lg font-bold">AI Suggestions</h3>
                </div>
                <div className="space-y-3.5">
                  <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 hover:bg-accent/15 hover:border-accent/30 transition-all hover:scale-[1.02] cursor-pointer">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold mb-1.5">Unread in Outlook</p>
                      <p className="text-xs text-muted-foreground font-medium">3 emails need review</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20 hover:bg-secondary/15 hover:border-secondary/30 transition-all hover:scale-[1.02] cursor-pointer">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold mb-1.5">Schedule sync</p>
                      <p className="text-xs text-muted-foreground font-medium">Team standup in 15 min</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/15 hover:border-primary/30 transition-all hover:scale-[1.02] cursor-pointer">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold mb-1.5">Code review ready</p>
                      <p className="text-xs text-muted-foreground font-medium">2 PRs awaiting approval</p>
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
