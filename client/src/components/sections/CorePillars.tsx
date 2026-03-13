import { Cpu, Zap, Shield, Globe } from "lucide-react";

const pillars = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning Fast",
    description: "Built on edge infrastructure to deliver sub-50ms response times globally. Speed is our foundation."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Enterprise Security",
    description: "Bank-grade encryption, SOC2 compliance, and continuous threat monitoring keep your data safe."
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "AI-Powered Core",
    description: "Intelligent automation and predictive analytics built directly into the heart of the platform."
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Infinite Scale",
    description: "From your first 100 users to your next 10 million, our architecture scales elastically with you."
  }
];

export function CorePillars() {
  return (
    <section className="py-24 bg-background relative z-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            The Foundation of <span className="text-accent">Scale</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Four core pillars designed to provide maximum velocity and reliability for modern technology stacks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <div 
              key={i} 
              className="glass-panel p-8 rounded-2xl hover-glow transition-all duration-300 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-accent/20">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-white">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
