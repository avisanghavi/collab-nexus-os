import { useEffect, useRef, useState } from "react";

const ResultsSection = () => {
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

  const results = [
    {
      value: "92%",
      label: "Stakeholder Satisfaction",
    },
    {
      value: "73%",
      label: "Rework Reduction",
    },
    {
      value: "2.5×",
      label: "Faster Time-to-Market",
    },
    {
      value: "340%",
      label: "Return on Investment",
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] gradient-glow opacity-30" />

      <div className="container px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold">
              From Collaboration Chaos to
              <span className="block mt-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Execution Excellence
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real results from teams that unified their collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((result, index) => (
              <div
                key={index}
                className={`relative group ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Card */}
                <div className="p-8 rounded-2xl bg-card border border-border hover-lift text-center space-y-4 relative overflow-hidden">
                  {/* Value */}
                  <div className="space-y-2 relative z-10">
                    <div className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                      {result.value}
                    </div>
                    <div className="text-muted-foreground text-sm font-medium">
                      {result.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Supporting quote */}
          <div className="mt-16 text-center">
            <blockquote className="max-w-3xl mx-auto">
              <p className="text-2xl font-medium text-muted-foreground italic">
                "The future of work isn't about more tools — it's about better connections between the tools you already have."
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
