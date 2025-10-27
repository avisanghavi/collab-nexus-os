import { CheckCircle2, GitBranch, Mail, Calendar, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MissionControlSection = () => {
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
    <section id="mission-control" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
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
