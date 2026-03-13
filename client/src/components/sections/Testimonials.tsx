import { Quote } from "lucide-react";
import avatar1 from "@/assets/images/avatar-1.png";
import avatar2 from "@/assets/images/avatar-2.png";
import avatar3 from "@/assets/images/avatar-3.png";

const testimonials = [
  {
    quote: "Switching to Swiftscale halved our deployment times and significantly reduced our infrastructure overhead. The platform is phenomenally intuitive.",
    author: "Sarah Chen",
    role: "CTO, DataSync",
    avatar: avatar1
  },
  {
    quote: "The reliability is unmatched. We process millions of events daily and haven't experienced a single minute of downtime since migrating.",
    author: "Marcus Johnson",
    role: "VP Engineering, FlowState",
    avatar: avatar2
  },
  {
    quote: "Swiftscale's edge network gave our application a global footprint instantly. The performance gains in APAC and EU regions were incredible.",
    author: "Elena Rodriguez",
    role: "Lead Architect, Nexus",
    avatar: avatar3
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-background overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Trusted by <span className="text-accent">Innovators</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            See why leading engineering teams rely on Swiftscale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-panel p-8 rounded-2xl relative group hover:-translate-y-2 transition-transform duration-300">
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5 group-hover:text-accent/20 transition-colors" />
              
              <p className="text-white/80 leading-relaxed mb-8 relative z-10 text-sm md:text-base">
                "{t.quote}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={t.avatar} 
                  alt={t.author} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/10"
                />
                <div>
                  <h4 className="font-display font-semibold text-white text-sm">{t.author}</h4>
                  <p className="text-accent text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
