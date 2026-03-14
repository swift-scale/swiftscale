import Link from "next/link";
import { ArrowLeft, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B1A30] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Dynamic Full Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
          alt="Analytics Data Background" 
          className="w-full h-full object-cover opacity-20 transform scale-105 animate-slow-zoom mix-blend-luminosity"
        />
        {/* Dark gradients to ensure text remains readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A30]/95 via-[#0B1A30]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1A30]/40 to-transparent" />
        
        {/* Aesthetic Overlay Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] z-10 pointer-events-none" />
      </div>

      {/* Center glowing orb behind content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-primary/10 rounded-full blur-[100px] animate-pulse pointer-events-none z-0" />

      {/* Main Content Container (Centered & Scaled Down) */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Aesthetic Lines & Status indicator */}
        <div className="mb-8 flex items-center justify-center gap-4 md:gap-6 opacity-80 mix-blend-plus-lighter w-full">
          <div className="w-12 md:w-24 h-[1px] bg-gradient-to-r from-transparent to-primary/50" />
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(36,27,235,1)]" />
            <span className="text-[9px] font-black tracking-[0.3em] uppercase text-primary">0% Conversion Rate</span>
          </div>
          <div className="w-12 md:w-24 h-[1px] bg-gradient-to-l from-transparent to-primary/50" />
        </div>

        {/* Floating Icon Graphic */}
        <div className="relative mb-6 group cursor-default">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-125 group-hover:bg-primary/40 transition-colors duration-1000 animate-pulse" />
          <div className="w-20 h-20 md:w-24 md:h-24 glass-panel rounded-2xl flex items-center justify-center relative overflow-hidden shadow-[0_0_80px_rgba(36,27,235,0.2)] transition-transform duration-500 group-hover:scale-110 border-primary/30 bg-[#0B1A30]/50 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />
            <TrendingDown className="w-10 h-10 md:w-12 md:h-12 text-primary drop-shadow-[0_0_10px_rgba(36,27,235,0.5)]" strokeWidth={1.5} />
          </div>
        </div>

        {/* Huge 404 Text */}
        <div className="relative mb-2">
          <h1 className="text-[100px] md:text-[140px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/10 select-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            404
          </h1>
        </div>
        
        <div className="space-y-4 max-w-xl relative -top-6 md:-top-10">
          <h2 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-widest leading-tight">
            Target <span className="text-primary">Lost</span>
          </h2>
          
          <p className="text-white/60 text-sm md:text-base font-medium leading-relaxed mt-2 px-4">
            The landing page or campaign you requested has been paused, relocated, or failed to yield conversions. Check your tracking parameters or return to the main hub.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-0 flex flex-col sm:flex-row items-center gap-4 relative z-20 pointer-events-auto">
          <Link href="/">
            <Button className="rounded-full bg-primary text-white hover:bg-primary/80 px-8 h-12 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:scale-105 active:scale-95 group shadow-[0_0_30px_rgba(36,27,235,0.4)]">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1.5 transition-transform" />
              Recalculate Strategy
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
