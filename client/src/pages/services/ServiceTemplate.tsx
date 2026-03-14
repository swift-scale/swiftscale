import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle2, 
  PlayCircle,
  BarChart3,
  Layers,
  Zap,
  Target,
  ArrowUpRight,
  Sparkles,
  Shield,
  Clock,
  Lightbulb,
  AlertCircle,
  TrendingUp
} from "lucide-react";

import abstractHero from "@/assets/images/abstract-hero.png";
import abstractOrb from "@/assets/images/abstract-orb.png";
import abstractGrid from "@/assets/images/abstract-grid.png";

interface ServiceTemplateProps {
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  process: string[];
  benefits: string[];
  forWho: string[];
  image?: string;
}

export default function ServiceTemplate({ 
  title, 
  category, 
  description, 
  problem, 
  solution, 
  process, 
  benefits, 
  forWho,
  image
}: ServiceTemplateProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroImage = image || abstractHero;

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

    // Preload hero image
    const img = new Image();
    img.src = heroImage;
    img.onload = () => {
      // Small delay for smooth transition even on fast connections
      setTimeout(() => setIsLoaded(true), 800);
    };

    // Fallback if image takes too long or fails
    const timer = setTimeout(() => setIsLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, [heroImage]);

  return (
    <>
      {/* Premium Loader */}
      {!isLoaded && (
        <div className="fixed inset-0 z-[100] bg-[#020205] flex flex-col items-center justify-center transition-opacity duration-700">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary via-accent to-secondary animate-spin blur-xl opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-black text-white shadow-2xl animate-pulse">
                S
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="text-white/40 text-xs font-black uppercase tracking-[0.4em] animate-pulse">
              Architecting {title}
            </div>
            <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden text-left">
              <div className="h-full bg-gradient-to-r from-primary to-accent animate-shimmer" style={{ width: '60%' }} />
            </div>
          </div>
        </div>
      )}

      <div className={`min-h-screen bg-background text-white selection:bg-accent selection:text-white font-sans overflow-x-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <Navbar />
        
        {/* 1. Epic Hero Section */}
        <section className="relative pt-40 pb-20 md:pt-52 md:pb-40 min-h-[90vh] flex flex-col justify-center border-b border-white/5 overflow-hidden">
          {/* Immersive Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
            <img 
              src={heroImage} 
              alt={title} 
              className="w-full h-full object-cover opacity-50 mix-blend-screen scale-105 animate-in fade-in zoom-in duration-[2000ms]"
            />
            {/* Glowing Orbs */}
            <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full mix-blend-screen animate-pulse" />
            <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-accent/20 blur-[150px] rounded-full mix-blend-screen animate-pulse delay-700" />
          </div>

          <div className="container mx-auto px-6 relative z-20 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-medium tracking-wide uppercase text-sm mb-10 backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.05)] animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent font-bold tracking-widest">{category}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-display font-bold tracking-tighter leading-[1.05] mb-8 max-w-6xl mx-auto drop-shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
              {title}
            </h1>
            
            <p className="text-xl md:text-3xl text-white/60 font-light leading-relaxed max-w-3xl mx-auto mb-14 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              {description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 w-full sm:w-auto">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-full px-12 h-16 text-lg font-bold transition-all shadow-[0_0_40px_rgba(var(--accent-rgb),0.4)] hover:scale-105 hover:shadow-[0_0_60px_rgba(var(--accent-rgb),0.6)] group w-full sm:w-auto text-left">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-lg font-medium border-white/20 bg-white/[0.03] text-white hover:bg-white/10 hover:text-white backdrop-blur-md transition-all hover:scale-105 w-full sm:w-auto text-left">
                <PlayCircle className="w-6 h-6 mr-3 text-white/80" />
                Watch Demo
              </Button>
            </div>
          </div>
        </section>

        {/* 2. Visual Bento Grid: Challenge & Solution */}
        <section className="py-32 relative z-10">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto text-left">
              
              {/* The Challenge */}
              <div className="lg:col-span-5 bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/10 rounded-[2.5rem] p-10 lg:p-14 relative overflow-hidden group hover:border-white/20 transition-all duration-500 shadow-2xl flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-rose-500/20 transition-colors duration-700" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-10 group-hover:scale-110 transition-transform">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white mb-6">
                    The Challenge
                  </h3>
                  <p className="text-xl text-white/60 leading-relaxed font-light">
                    {problem}
                  </p>
                </div>
              </div>

              {/* The Solution */}
              <div className="lg:col-span-7 bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/30 rounded-[2.5rem] p-10 lg:p-14 relative overflow-hidden group hover:border-primary/50 transition-all duration-500 shadow-[0_0_50px_rgba(var(--primary-rgb),0.1)]">
                {/* Background Image Mask */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-40 mix-blend-screen pointer-events-none transition-transform duration-1000 group-hover:scale-105 origin-right">
                  <img src={abstractOrb} alt="Glowing Orb" className="w-full h-full object-cover object-right" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-0" />
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-10 shadow-[0_0_30px_rgba(16,185,129,0.2)] group-hover:scale-110 transition-transform">
                      <Lightbulb className="w-8 h-8" />
                    </div>
                    <h3 className="text-4xl font-display font-bold text-white mb-6">
                      Our Solution
                    </h3>
                    <p className="text-2xl text-white/90 leading-relaxed font-light mb-12 max-w-2xl">
                      {solution}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10 mt-auto">
                    <div className="flex items-center gap-4 bg-black/40 p-5 rounded-2xl border border-white/5 backdrop-blur-md">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg">Scalable</h4>
                        <p className="text-sm text-white/50">Built for enterprise</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-black/40 p-5 rounded-2xl border border-white/5 backdrop-blur-md">
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                        <Layers className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg">Integrated</h4>
                        <p className="text-sm text-white/50">Zero friction</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. High-End Features Grid */}
        <section className="py-32 border-y border-white/5 bg-background/50 relative overflow-hidden">
          {/* Glowing Grid Background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img src={abstractGrid} alt="Grid Background" className="w-full h-full object-cover mix-blend-screen" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="text-center max-w-4xl mx-auto mb-20">
              <h2 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-8 text-white">
                Unmatched Advantages
              </h2>
              <p className="text-xl text-white/50 font-light leading-relaxed">
                Unlock the full potential of your operations with strategic implementation designed specifically for high-growth enterprises.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {benefits.map((benefit, i) => (
                <div key={i} className="group p-10 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-xl hover:-translate-y-2 flex flex-col items-center text-center shadow-lg hover:shadow-2xl">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-white mb-8 group-hover:from-primary group-hover:to-accent group-hover:border-primary/50 transition-all shadow-lg shadow-black/50">
                    {i % 4 === 0 && <BarChart3 className="w-8 h-8" />}
                    {i % 4 === 1 && <Shield className="w-8 h-8" />}
                    {i % 4 === 2 && <Clock className="w-8 h-8" />}
                    {i % 4 === 3 && <Zap className="w-8 h-8" />}
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">{benefit}</h4>
                  <p className="text-base text-white/60 font-light leading-relaxed">
                    Streamline processes and achieve measurable ROI through targeted execution.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Glassmorphism Process Timeline */}
        <section className="py-32 bg-background relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/15 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="container mx-auto px-6 relative z-10 text-left">
            <div className="flex flex-col lg:flex-row gap-20 max-w-7xl mx-auto items-center">
              <div className="lg:w-1/3">
                <h2 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-8 text-white">
                  How We Execute
                </h2>
                <p className="text-xl text-white/50 font-light mb-12 leading-relaxed">
                  A clear, actionable roadmap to transform your business from the ground up, built for maximum efficiency.
                </p>
                <div className="hidden lg:block w-32 h-1.5 bg-gradient-to-r from-accent to-transparent rounded-full" />
              </div>

              <div className="lg:w-2/3 w-full">
                <div className="space-y-6 text-left">
                  {process.map((step, i) => (
                    <div key={i} className="flex gap-6 md:gap-8 group">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-2xl md:text-3xl font-display font-bold text-white/40 group-hover:text-accent group-hover:border-accent/50 group-hover:bg-accent/10 transition-all shrink-0 shadow-lg">
                          {i + 1}
                        </div>
                        {i !== process.length - 1 && (
                          <div className="w-1 h-full bg-gradient-to-b from-white/10 to-transparent my-4 rounded-full" />
                        )}
                      </div>
                      <div className="bg-white/[0.03] border border-white/5 p-8 md:p-10 rounded-3xl flex-1 backdrop-blur-md hover:bg-white/[0.06] hover:border-white/10 transition-all transform group-hover:translate-x-2">
                        <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">{step}</h4>
                        <p className="text-lg text-white/60 font-light leading-relaxed">
                          Comprehensive planning and execution tailored precisely to your specific requirements, ensuring zero downtime and maximum efficiency.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Target Audience Cards */}
        <section className="py-32 border-t border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-16 tracking-tight text-white">
              Built for High-Growth Teams
            </h2>
            
            <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
              {forWho.map((target, i) => (
                <div key={i} className="px-8 py-5 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-lg font-medium hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all cursor-default shadow-lg flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  {target}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Massive CTA */}
        <section className="py-40 relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 z-0 text-left">
            <img 
              src="/images/cta_bg.jpg" 
              alt="CTA Background" 
              className="w-full h-full object-cover opacity-20 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(var(--accent-rgb),0.2),transparent_70%)]" />
          </div>
          
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent border border-white/20 text-white mb-12 shadow-[0_0_60px_rgba(var(--accent-rgb),0.5)]">
              <Zap className="w-12 h-12" />
            </div>
            
            <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-display font-bold mb-10 tracking-tighter max-w-5xl mx-auto leading-[1.05] text-white">
              Ready to transform your <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient-x">{title.toLowerCase()}?</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/50 font-light max-w-3xl mx-auto mb-14">
              Join the hundreds of forward-thinking businesses accelerating their growth with Swiftscale today.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-full px-14 h-16 text-xl font-bold transition-all shadow-[0_0_40px_rgba(var(--accent-rgb),0.3)] hover:scale-105 text-left">
                Start Your Project
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-14 h-16 text-xl font-medium border-white/20 bg-white/[0.05] text-white hover:bg-white/10 hover:text-white backdrop-blur-md transition-all hover:scale-105 text-left">
                Contact Sales
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}