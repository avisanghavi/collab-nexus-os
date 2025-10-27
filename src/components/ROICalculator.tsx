import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ROICalculator = () => {
  const [teamSize, setTeamSize] = useState("50");
  const [toolsCount, setToolsCount] = useState("8");
  const [avgSalary, setAvgSalary] = useState("120000");
  const [meetingsPerWeek, setMeetingsPerWeek] = useState("12");
  const [showResults, setShowResults] = useState(false);

  const calculateROI = () => {
    const team = parseInt(teamSize) || 50;
    const tools = parseInt(toolsCount) || 8;
    const salary = parseInt(avgSalary) || 120000;
    const meetings = parseInt(meetingsPerWeek) || 12;

    // Based on deck metrics: 58% meeting reduction, 73% rework reduction, 2.5× velocity
    const hourlyRate = salary / 2080; // Annual hours
    const meetingHoursSaved = meetings * 0.5 * 0.58 * 52; // 58% reduction, 30min avg
    const reworkHoursSaved = 10 * 0.73 * 52; // 73% rework reduction, 10 hrs/week baseline
    const totalHoursSaved = meetingHoursSaved + reworkHoursSaved;
    const annualSavings = Math.round(totalHoursSaved * hourlyRate * team);
    const paybackMonths = Math.max(4, Math.min(6, 12 - Math.floor(tools * 0.5)));
    const roi = Math.round((annualSavings / (team * 1200)) * 100); // Assuming $100/user/month

    return { annualSavings, paybackMonths, roi };
  };

  const handleCalculate = () => {
    setShowResults(true);
    toast({
      title: "ROI Calculated",
      description: "See your personalized results below",
    });
  };

  const results = calculateROI();

  return (
    <section id="roi-calculator" className="py-24 lg:py-32 bg-background">
      <div className="container px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 mb-12 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Calculator className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm font-medium text-primary">ROI Calculator</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Calculate Your{" "}
              <span className="bg-gradient-accent bg-clip-text text-transparent">Savings</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              See how much time and money your team could save with HeyJarvis
            </p>
          </div>

          {/* Calculator Form */}
          <div className="p-8 lg:p-12 rounded-3xl bg-gradient-card border border-border shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <Label htmlFor="teamSize">Team Size</Label>
                <Input
                  id="teamSize"
                  type="number"
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  placeholder="50"
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="toolsCount">Number of Tools Used</Label>
                <Input
                  id="toolsCount"
                  type="number"
                  value={toolsCount}
                  onChange={(e) => setToolsCount(e.target.value)}
                  placeholder="8"
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avgSalary">Average Salary ($)</Label>
                <Input
                  id="avgSalary"
                  type="number"
                  value={avgSalary}
                  onChange={(e) => setAvgSalary(e.target.value)}
                  placeholder="120000"
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meetingsPerWeek">Meetings per Week</Label>
                <Input
                  id="meetingsPerWeek"
                  type="number"
                  value={meetingsPerWeek}
                  onChange={(e) => setMeetingsPerWeek(e.target.value)}
                  placeholder="12"
                  min="1"
                />
              </div>
            </div>

            <Button
              onClick={handleCalculate}
              className="w-full text-base py-6 bg-gradient-accent text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Calculate ROI
            </Button>

            {/* Results */}
            {showResults && (
              <div className="mt-8 pt-8 border-t border-border space-y-6 animate-fade-in-up">
                <h3 className="text-2xl font-bold text-foreground mb-6">Your Projected Savings</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-background/50">
                    <p className="text-sm text-muted-foreground mb-2">Annual Savings</p>
                    <p className="text-3xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                      ${results.annualSavings.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-background/50">
                    <p className="text-sm text-muted-foreground mb-2">Payback Period</p>
                    <p className="text-3xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                      {results.paybackMonths} months
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-background/50">
                    <p className="text-sm text-muted-foreground mb-2">ROI</p>
                    <p className="text-3xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                      {results.roi}%
                    </p>
                  </div>
                </div>
                <div className="pt-4">
                  <Button
                    onClick={() => {
                      const element = document.getElementById("cta");
                      if (element) element.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full text-base py-6 bg-foreground text-background hover:bg-foreground/90"
                  >
                    Book Demo with My ROI
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
