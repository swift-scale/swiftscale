import { GraduationCap, ShoppingCart, Monitor, Briefcase } from "lucide-react";

const pillars = [
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: "E-Commerce Services",
    description: "Comprehensive enablement from marketplace onboarding to supply chain and growth optimization."
  },
  {
    icon: <Monitor className="w-6 h-6" />,
    title: "IT & Tech Solutions",
    description: "Innovative software development and digital infrastructure built for enterprise-grade scalability."
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Professional Training",
    description: "Industry-focused master programs designed to build job-ready technology talent."
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Consulting & Payroll",
    description: "Strategic consulting and workforce management solutions that streamline operational efficiency."
  }
];

export function CorePillars() {
  return (
    <section className="py-24 bg-[#020205] relative z-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Our Core <span className="text-accent">Specializations</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We bridge the gap between technology expertise, digital commerce experience, and strategic business impact.
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
