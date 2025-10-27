import { Shield, Lock, Zap, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TrustSection = () => {
  const certifications = [
    {
      icon: Shield,
      title: "SOC 2 Type II",
      description: "Enterprise-grade security certified",
    },
    {
      icon: Lock,
      title: "GDPR Compliant",
      description: "Privacy-first data handling",
    },
    {
      icon: Zap,
      title: "Enterprise SSO",
      description: "Seamless authentication integration",
    },
    {
      icon: Globe,
      title: "Global Infrastructure",
      description: "99.9% uptime SLA guaranteed",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="px-4 py-2">
              Enterprise-Grade Trust
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Built for the World's Most
              <span className="block mt-2">Demanding Organizations</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border hover-lift text-center space-y-3"
              >
                <div className="inline-flex p-4 rounded-xl bg-primary/10">
                  <cert.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust logos placeholder */}
          <div className="text-center space-y-6">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              Trusted by Fortune 500 Companies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-32 h-12 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground"
                >
                  Enterprise {i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
