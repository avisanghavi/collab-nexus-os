import { Plug, Database, Users, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Plug,
      title: "Connect",
      description: "Integrate with 100+ tools in minutes",
      details: "Slack, JIRA, GitHub, Teams, Notion, and more",
      color: "from-primary to-primary-glow",
    },
    {
      icon: Database,
      title: "Centralize",
      description: "AI builds a live knowledge graph",
      details: "Real-time sync across all platforms",
      color: "from-secondary to-secondary-glow",
    },
    {
      icon: Users,
      title: "Collaborate",
      description: "Unified dashboards and smart notifications",
      details: "Context-aware insights for every team member",
      color: "from-accent to-accent/70",
    },
    {
      icon: Zap,
      title: "Execute",
      description: "Zero context loss, faster decisions",
      details: "340% ROI on average",
      color: "from-primary via-secondary to-accent",
    },
  ];

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to transform your team's collaboration
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="p-6 hover-lift group relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${step.color}`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-4xl font-bold text-muted-foreground/20">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {step.description}
                    </p>
                    <p className="text-xs text-muted-foreground/80">
                      {step.details}
                    </p>
                  </div>

                  {/* Connection line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 -right-3 w-6 h-0.5 bg-gradient-to-r from-border to-transparent" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
