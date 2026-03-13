import { GraduationCap, ShoppingCart, Monitor, Briefcase, ChevronRight } from "lucide-react";
import Link from "next/link";

const serviceCategories = [
  {
    title: "Training",
    icon: <GraduationCap className="w-8 h-8" />,
    description: "Master industry-leading skills with our comprehensive programs.",
    services: [
      { name: "BI Master Program", href: "/services/training/bi" },
      { name: "Full Stack Master", href: "/services/training/fullstack" },
      { name: "UI/UX Master", href: "/services/training/uiux" },
      { name: "Data Science", href: "/services/training/datascience" },
    ]
  },
  {
    title: "E-Commerce",
    icon: <ShoppingCart className="w-8 h-8" />,
    description: "End-to-end solutions to launch and scale your online business.",
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
    description: "Robust technology solutions to drive your digital transformation.",
    services: [
      { name: "App/Web Dev", href: "/services/it/dev" },
      { name: "Digital Marketing", href: "/services/it/marketing" },
      { name: "Cybersecurity", href: "/services/it/cyber" },
      { name: "Cloud & DevOps", href: "/services/it/cloud" },
    ]
  },
  {
    title: "Consulting",
    icon: <Briefcase className="w-8 h-8" />,
    description: "Strategic guidance to optimize operations and accelerate growth.",
    services: [
      { name: "Payroll Management", href: "/services/consulting/payroll" },
      { name: "Growth Strategy", href: "/services/consulting/strategy" },
      { name: "IT Infra Roles", href: "/services/consulting/infra" },
    ]
  }
];

export function AllServices() {
  return (
    <section className="py-24 bg-background relative z-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Comprehensive <span className="text-accent">Solutions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to build, scale, and manage your business across all domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceCategories.map((category, i) => (
            <div 
              key={i} 
              className="glass-panel p-8 rounded-2xl border border-white/5 relative group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <h3 className="text-2xl font-display font-semibold mb-3 text-white">
                {category.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-6 h-10">
                {category.description}
              </p>
              
              <div className="space-y-3">
                {category.services.map((service, idx) => (
                  <Link key={idx} href={service.href}>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group/item">
                      <span className="text-white/80 font-medium text-sm group-hover/item:text-white">
                        {service.name}
                      </span>
                      <ChevronRight className="w-4 h-4 text-white/40 group-hover/item:text-accent group-hover/item:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}