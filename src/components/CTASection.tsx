import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 gradient-glow animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" />

      <div className="container px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold">
            Ready for Full
            <span className="block mt-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Organizational Clarity?
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join forward-thinking teams who've transformed their collaboration layer
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button variant="hero" size="xl" className="group">
              Book a Demo
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroOutline" size="xl">
              <Calculator className="mr-1" />
              Calculate Your ROI
            </Button>
          </div>

          {/* Stats bar */}
          <div className="pt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">100+</div>
              <div className="text-sm text-muted-foreground">Integrations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-1">10M+</div>
              <div className="text-sm text-muted-foreground">Tasks Unified</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Teams Onboarded</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
