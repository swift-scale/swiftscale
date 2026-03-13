import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroIllustration from "@/assets/images/hero-illustration.png";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-hero">
      {/* Background radial overlays for depth */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-accent text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Next-Gen SaaS Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6 tracking-tight text-white">
              Scale Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">Ambition</span> With Swiftscale
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-xl">
              The enterprise-grade platform built for technology-driven companies. 
              Accelerate your growth, streamline operations, and build the future faster.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 rounded-full px-8 h-14 font-semibold text-base shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)] transition-all hover:scale-105">
                Start Building Free
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 h-14 font-semibold text-base border-white/20 hover:bg-white/10 text-white transition-all">
                Book Strategy Call
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-8 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                14-day free trial
              </div>
            </div>
          </div>
          
          <div className="relative animate-in fade-in slide-in-from-right-12 duration-1000 delay-200 hidden lg:block">
            <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full" />
            <img 
              src={heroIllustration} 
              alt="Swiftscale Platform Illustration" 
              className="relative z-10 w-full h-auto object-contain transform hover:scale-[1.02] transition-transform duration-700 drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
