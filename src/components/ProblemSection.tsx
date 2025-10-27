import { useRef } from "react";

const ProblemSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      value: "73%",
      label: "of projects fail due to poor communication between teams",
    },
    {
      value: "58%",
      label: "of work time spent searching for information across tools",
    },
    {
      value: "100+",
      label: "tools used by the average enterprise team",
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              You already have the right tools.
              <span className="block mt-3 text-muted-foreground font-normal text-2xl md:text-3xl">
                So why does work still feel so hard?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your team isn't struggling because they lack tools. They're struggling because those tools don't talk to each other.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center space-y-4 p-8 rounded-2xl bg-muted/30 border border-border hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div>
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <p className="text-muted-foreground leading-relaxed">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center max-w-2xl mx-auto space-y-4">
            <p className="text-lg text-muted-foreground">
              Every new tool was supposed to make things easier. Instead, your team is spending more time managing the tools than doing the work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
