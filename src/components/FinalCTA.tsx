import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

const FinalCTA = () => {
  return (
    <section id="cta" className="py-24 lg:py-32 bg-background">
      <div className="container px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 lg:p-16 rounded-3xl bg-gradient-hero overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center space-y-8 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                Ready to Transform
                <br />
                Your Workflow?
              </h2>
              <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
                Join teams achieving 340% ROI and 2.5× velocity with HeyJarvis
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                <Button
                  size="lg"
                  className="text-base px-8 py-6 bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-lg"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book a Personalized Demo
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    const element = document.getElementById("roi-calculator");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-base px-8 py-6 bg-background/90 backdrop-blur-sm border-2 border-foreground/20 hover:bg-background hover:border-foreground/40 transition-colors"
                >
                  Calculate Your ROI
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              {/* Trust Signals */}
              <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-foreground/70">
                <div className="flex items-center gap-2">
                  ✓ No credit card required
                </div>
                <div className="flex items-center gap-2">
                  ✓ 14-day pilot program
                </div>
                <div className="flex items-center gap-2">
                  ✓ White-glove onboarding
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
