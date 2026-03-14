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
              <span>Start Smart, Scale Swift.</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6 tracking-tight text-white">
              Elevating{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                Digital Commerce
              </span>{" "}
              & IT Infrastructure
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-xl">
              We empower brands and enterprises to build, launch, and dominate
              in the digital economy through end-to-end marketplace management
              and scalable technology solutions.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-14 font-semibold text-base shadow-[0_0_30px_-5px_rgba(36,27,235,0.4)] transition-all hover:scale-105"
              >
                Book Strategy Call
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <div className="relative animate-in fade-in slide-in-from-right-12 duration-1000 delay-200 hidden lg:block scale-90 lg:scale-[0.85] origin-right ml-auto">
            <div className="absolute -inset-10 bg-accent/20 blur-[120px] rounded-full animate-pulse" />
            <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group aspect-[4/3]">
              <img
                src={heroIllustration}
                alt="SwiftScale Digital Infrastructure"
                className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
