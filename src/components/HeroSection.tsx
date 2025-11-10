const HeroSection = () => {
  return (
    <section className="relative min-h-screen md:h-screen flex items-center justify-center overflow-hidden pb-[20rem] -mt-20 md:-mt-0">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-hero opacity-50" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 gradient-glow animate-glow-pulse" />


      <div className="container relative z-10 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Productivity Reimagined
            </span>
          </h1>

          <p className="hidden md:block text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Context united. Clarity unlocked. Progress accelerated.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
