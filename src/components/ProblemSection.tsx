import { useEffect, useRef, useState } from "react";
import { TrendingDown, AlertCircle, Clock, MessagesSquare } from "lucide-react";

const ProblemSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counter, setCounter] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && counter < 3.1) {
      const timer = setTimeout(() => {
        setCounter((prev) => Math.min(prev + 0.1, 3.1));
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [isVisible, counter]);

  const stats = [
    {
      icon: TrendingDown,
      value: "73%",
      label: "Projects fail due to miscommunication",
      color: "text-destructive",
    },
    {
      icon: Clock,
      value: "58%",
      label: "Time lost searching for information",
      color: "text-accent",
    },
    {
      icon: MessagesSquare,
      value: "100+",
      label: "Average tools per enterprise team",
      color: "text-secondary",
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-muted/30">
      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive mb-4">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">The Hidden Cost of Collaboration Chaos</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold">
              <span className="text-destructive">$3.1 Trillion</span>
              <span className="block mt-2 text-foreground">of Lost Productivity Annually</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Animated counter */}
            <div className="text-center md:text-left space-y-6">
              <div className="relative">
                <div className="text-8xl md:text-9xl font-bold text-destructive/20">
                  ${counter.toFixed(1)}T
                </div>
                <div className="absolute inset-0 text-8xl md:text-9xl font-bold bg-gradient-to-br from-destructive to-destructive/60 bg-clip-text text-transparent animate-fade-in">
                  ${counter.toFixed(1)}T
                </div>
              </div>
              <p className="text-xl text-muted-foreground max-w-md">
                Lost every year to fragmented tools, miscommunication, and context switching
              </p>
            </div>

            {/* Right: Stats grid */}
            <div className="space-y-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
