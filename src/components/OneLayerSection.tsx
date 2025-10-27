import { Card } from "@/components/ui/card";

const OneLayerSection = () => {
  const features = [
    {
      title: "Universal Layer",
      description: "We don't replace your tools—we unify them into one intelligent workspace",
    },
    {
      title: "Real-Time Sync",
      description: "Every update across all platforms reflects instantly in your Mission Control",
    },
    {
      title: "Smart Connections",
      description: "AI automatically links tasks, PRs, docs, and conversations into actionable context",
    },
    {
      title: "Enterprise Security",
      description: "SOC 2 Type II, GDPR compliant, with granular access controls",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold">
              One Layer.{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Infinite Clarity.
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              HeyJarvis sits above your existing stack—Slack, Jira, GitHub, Notion, Salesforce—and transforms them into a unified productivity engine.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-8 hover-lift group relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative z-10 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Customer Quote */}
          <div className="relative p-8 md:p-12 rounded-2xl bg-card border border-border shadow-md">
            <blockquote className="text-center space-y-4">
              <p className="text-2xl md:text-3xl font-medium">
                "Instead of jumping between 11 tools, our team now has{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-semibold">
                  one source of truth.
                </span>
                "
              </p>
              <footer className="text-muted-foreground">
                — Enterprise Customer
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OneLayerSection;
