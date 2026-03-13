const steps = [
  {
    num: "01",
    title: "Connect",
    desc: "Link your repository with a single click. We automatically detect your framework and configuration."
  },
  {
    num: "02",
    title: "Configure",
    desc: "Set your environment variables and deployment preferences through our intuitive dashboard."
  },
  {
    num: "03",
    title: "Deploy",
    desc: "Push your code and watch as it's built, optimized, and deployed globally in seconds."
  },
  {
    num: "04",
    title: "Scale",
    desc: "As traffic grows, our elastic infrastructure automatically scales to handle any load."
  }
];

export function Process() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            From Code to Global <br/><span className="text-accent">in Minutes</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our streamlined deployment process takes the headache out of shipping.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {steps.map((step, i) => (
              <div key={i} className="relative pt-8 md:pt-0">
                <div className="hidden md:flex absolute top-12 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-background border-2 border-accent shadow-[0_0_15px_rgba(58,154,255,0.5)] z-10" />
                
                <div className="md:mt-24 text-center">
                  <div className="text-5xl font-display font-bold text-white/5 mb-6 md:mb-4 inline-block">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3 text-white">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
