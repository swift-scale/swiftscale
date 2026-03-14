import { GraduationCap, ShoppingCart, Monitor, Briefcase, ChevronRight } from "lucide-react";
import Link from "next/link";

const serviceCategories = [
  {
    title: "E-Commerce",
    icon: <ShoppingCart className="w-8 h-8" />,
    description: "End-to-end solutions for marketplace presence and operational excellence.",
    services: [
      { name: "Registration", href: "/services/ecommerce/registration" },
      { name: "Sponsored Ads", href: "/services/ecommerce/ads" },
      { name: "Logistics", href: "/services/ecommerce/logistics" },
      { name: "Warehousing", href: "/services/ecommerce/warehousing" },
    ]
  },
  {
    title: "IT Services",
    icon: <Monitor className="w-8 h-8" />,
    description: "Modern technology platforms tailored to your business needs.",
    services: [
      { name: "App/Web Dev", href: "/services/it/dev" },
      { name: "Digital Marketing", href: "/services/it/marketing" },
      { name: "Cybersecurity", href: "/services/consulting/cyber" },
      { name: "Cloud & DevOps", href: "/services/consulting/devops" },
    ]
  },
  {
    title: "Training",
    icon: <GraduationCap className="w-8 h-8" />,
    description: "Master high-demand fields through expert-led master programs.",
    services: [
      { name: "BI Master Program", href: "/services/training/bi" },
      { name: "Full Stack Master", href: "/services/training/fullstack" },
      { name: "UI/UX Master", href: "/services/training/uiux" },
      { name: "Data Science", href: "/services/training/datascience" },
    ]
  },
  {
    title: "Consulting & Payroll",
    icon: <Briefcase className="w-8 h-8" />,
    description: "Strategic workforce and operational efficiency solutions.",
    services: [
      { name: "Payroll Management", href: "/services/consulting/payroll" },
      { name: "Growth Strategy", href: "/services/consulting/dev" },
      { name: "IT Infra Roles", href: "/services/consulting/infra" },
    ]
  }
];

export function AllServices() {
  return (
    <section className="py-32 bg-[#020205] relative z-20 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-primary text-xs font-black tracking-[0.2em] uppercase mb-6 border border-white/10 shadow-2xl">
            Our Ecosystem
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black leading-tight tracking-tight text-white mb-6">
            Comprehensive <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary italic pr-2">
              Solutions
            </span>
          </h2>
          <p className="text-white/50 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Everything you need to build, scale, and manage your business across all domains, engineered for infinite growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCategories.map((category, i) => (
            <div 
              key={i} 
              className="relative p-[1px] rounded-[2rem] bg-gradient-to-br from-white/10 to-white/0 group hover:-translate-y-3 transition-all duration-500 overflow-hidden shadow-2xl hover:shadow-[0_20px_40px_-15px_rgba(36,27,235,0.3)]"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Card Glow background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative h-full bg-[#05050A]/90 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/5 z-10 flex flex-col">
                {/* Floating blob inside card */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-[50px] group-hover:bg-primary/30 group-hover:scale-150 transition-all duration-700 pointer-events-none" />
                
                <div className="w-14 h-14 rounded-[1.25rem] bg-gradient-to-br from-white/5 to-white/0 border border-white/10 flex items-center justify-center text-white mb-5 group-hover:scale-110 group-hover:border-primary/50 group-hover:text-primary transition-all duration-500 relative z-20 shadow-[0_0_15px_-3px_rgba(255,255,255,0.1)] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 scale-90">
                    {category.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-display font-bold mb-2 text-white relative z-20 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all">
                  {category.title}
                </h3>
                
                <p className="text-white/40 text-xs mb-6 relative z-20 h-10 group-hover:text-white/60 transition-colors duration-300 font-medium leading-relaxed">
                  {category.description}
                </p>
                
                <div className="space-y-2 relative z-20 mt-auto">
                  {category.services.map((service, idx) => (
                    <Link key={idx} href={service.href} className="block group/link">
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/0 group-hover/link:border-white/10 group-hover/link:bg-white/10 transition-all duration-300 cursor-pointer">
                        <span className="text-white/60 font-semibold text-xs group-hover/link:text-white transition-colors duration-300">
                          {service.name}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-primary group-hover/link:shadow-[0_0_15px_rgba(36,27,235,0.5)] transition-all duration-300">
                          <ChevronRight className="w-3 h-3 text-white/40 group-hover/link:text-white group-hover/link:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}