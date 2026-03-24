import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#020205] -mt-16 md:-mt-20">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-illustration.png"
          alt="SwiftScale Digital Infrastructure"
          className="w-full h-full object-cover opacity-80 scale-105 animate-in fade-in zoom-in duration-1000"
        />
        {/* Gradient overlays to make text readable on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020205] via-[#020205]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#020205] from-20% to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#020205] to-transparent pointer-events-none opacity-40" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 pt-24 md:pt-28">
        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-accent text-xs font-medium mb-6 border border-white/10 shadow-2xl backdrop-blur-md">
            <Sparkles className="w-3 h-3" />
            <span>Start Smart, Scale Swift.</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] mb-5 tracking-tight text-white drop-shadow-2xl">
            Elevating{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
              Digital Commerce
            </span>{" "}
            <br className="hidden md:block" />& IT Infrastructure
          </h1>

          <p className="text-base md:text-lg text-white/80 mb-8 leading-relaxed max-w-xl font-medium drop-shadow-lg">
            We empower brands and enterprises to build, launch, and dominate in
            the digital economy through end-to-end marketplace management and
            scalable technology solutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-12 font-semibold text-sm shadow-[0_0_30px_-5px_rgba(36,27,235,0.4)] transition-all hover:scale-105"
              >
                Book Strategy Call
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
