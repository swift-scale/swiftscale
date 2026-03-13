import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import academyImg from "@/assets/images/academy.png";

export function Academy() {
  return (
    <section className="py-24 bg-card relative border-y border-border/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-4 bg-accent/10 blur-2xl rounded-3xl" />
            <img 
              src={academyImg} 
              alt="Swiftscale Academy Team" 
              className="relative z-10 rounded-2xl shadow-2xl border border-border/50 w-full object-cover"
            />
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-accent text-sm font-medium mb-6">
              Learn & Grow
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">
              Swiftscale <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">Academy</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Master modern infrastructure with our comprehensive learning hub. From fundamental concepts to advanced deployment strategies, empower your team to build better software.
            </p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Expert-led video courses
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Interactive coding environments
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Official certifications
              </li>
            </ul>
            
            <Button size="lg" className="rounded-full px-8 h-14 font-semibold text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_-5px_rgba(36,27,235,0.4)]">
              Explore Academy
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
