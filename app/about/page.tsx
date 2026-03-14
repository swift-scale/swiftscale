import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Rocket, 
  Zap, 
  Globe, 
  Shield, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Layers, 
  TrendingUp,
  Award,
  Command,
  Activity,
  Box,
  Binary,
  Workflow
} from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

    // Preload tech background
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop";
    img.onload = () => {
      setTimeout(() => setIsLoaded(true), 1000);
    };

    const timer = setTimeout(() => setIsLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

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
              Syncing Methodology
            </div>
            <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent animate-shimmer" style={{ width: '60%' }} />
            </div>
          </div>
        </div>
      )}

      <div className={`min-h-screen bg-[#020205] text-white selection:bg-primary selection:text-white overflow-x-hidden font-sans transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <Navbar />
      
      {/* SECTION 1: THE MANIFESTO (Midnight Black) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="relative pt-52 pb-32 overflow-hidden bg-[#020205] border-b border-white/5"
      >
        {/* Architectural Backdrop */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(36,27,235,0.08)_0%,_transparent_70%)] pointer-events-none" />

        {/* Floating Icons Background layer */}
        <div className="absolute top-20 -left-10 opacity-[0.03] pointer-events-none transform -rotate-12 scale-[4] text-primary">
          <Globe className="w-64 h-64" strokeWidth={0.5} />
        </div>
        <div className="absolute bottom-10 -right-10 opacity-[0.02] pointer-events-none transform rotate-12 scale-[5] text-accent">
          <Cpu className="w-64 h-64" strokeWidth={0.5} />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 w-full max-w-7xl">
          <div className="max-w-4xl space-y-8 mb-20">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.4em]">
              <Sparkles className="w-4 h-4" /> Start Smart, Scale Swift
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-6xl md:text-9xl font-display font-black leading-none tracking-tight text-white">
              Powering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                Commerce
              </span>
              <br />
              & Tech.
            </motion.h1>
            <motion.p variants={itemVariants} className="text-white/40 text-xl md:text-2xl font-medium max-w-3xl leading-relaxed">
              SwiftScale is a technology-driven company specializing in E-Commerce enablement and IT solutions that help businesses build, launch, and scale in the digital economy.
            </motion.p>
          </div>

          {/* Quick Stats Dashboard */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Global Nodes",
                value: "15+",
                icon: <Globe className="w-4 h-4" />,
              },
              {
                label: "Success Rate",
                value: "99%",
                icon: <Award className="w-4 h-4" />,
              },
              {
                label: "Scale Velocity",
                value: "x4",
                icon: <TrendingUp className="w-4 h-4" />,
              },
              {
                label: "Ops Vigilance",
                value: "24/7",
                icon: <Shield className="w-4 h-4" />,
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="glass-panel p-8 rounded-[2rem] border border-white/10 group hover:border-primary/40 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <p className="text-4xl font-display font-black text-white mb-1 tracking-tighter">
                  {stat.value}
                </p>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* SECTION 2: IDENTITY & VISION (Deep Navy: #080B16) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="relative py-40 overflow-hidden bg-[#080B16] border-y border-white/5"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="order-2 lg:order-1 relative">
              <motion.div variants={itemVariants} className="absolute -inset-10 bg-primary/20 blur-[120px] rounded-full" />
              <motion.div 
                variants={itemVariants}
                className="relative rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl h-[600px] group"
              >
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                  alt="Deep Tech" 
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080B16] via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-12 left-12 right-12">
                   <div className="glass-panel p-8 rounded-3xl border border-white/20 backdrop-blur-xl">
                      <Binary className="text-primary mb-4 w-8 h-8" />
                      <p className="text-xl font-bold text-white mb-2">Immutable Integrity</p>
                      <p className="text-sm text-white/50 leading-relaxed font-medium">Protecting the digital backbone of the world's most critical infrastructures since day one.</p>
                   </div>
                </div>
              </motion.div>
            </div>

            <div className="order-1 lg:order-2 space-y-16">
              <motion.div variants={itemVariants} className="space-y-8">
                <div className="w-16 h-1 bg-primary rounded-full" />
                <h2 className="text-5xl md:text-7xl font-display font-black leading-tight tracking-tight text-white">
                  Strategizing for <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent italic">Digital Success</span>.
                </h2>
                <p className="text-white/40 text-xl leading-relaxed font-medium">
                  We combine technical proficiency with digital commerce agility to build platforms that accelerate growth and maximize operational efficiency. Our vision is to become the leading partner for businesses scaling through innovation and data.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 gap-10">
                {[
                  { title: "Our Mission", text: "To empower businesses and professionals through end-to-end e-commerce solutions, scalable technology platforms, and industry-ready talent development.", icon: <Target className="text-primary" /> },
                  { title: "Our Core Vision", text: "To be the engine behind digital transformation, helping organizations transform bold ideas into successful ventures through innovation and data.", icon: <Zap className="text-accent" /> }
                ].map((item, i) => (
                  <motion.div key={i} variants={itemVariants} className="flex gap-8 group">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-white">{item.title}</h3>
                      <p className="text-white/30 leading-relaxed font-medium">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 3: ENGINEERING STUDIO (Silver-Slate: #F1F5F9) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="relative py-40 overflow-hidden bg-[#F1F5F9] text-slate-900 shadow-[0_-20px_50px_rgba(0,0,0,0.02)]"
      >
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="text-center mb-32 space-y-6">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">
              <Cpu className="w-3.5 h-3.5" /> High-Accuracy Methods
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-5xl md:text-8xl font-display font-black text-slate-950 tracking-tighter">
              Precision <span className="text-primary italic">Architecture</span>.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { title: "Stateless Design", desc: "Decoupling logic from infrastructure to ensure infinite horizontal scalability.", icon: <Layers className="w-6 h-6" /> },
              { title: "Latency Crushing", desc: "Global edge deployment that brings response times down to single-digit ms.", icon: <Zap className="w-6 h-6" /> },
              { title: "Hardened Security", desc: "Military-grade encryption and real-time threat detection protocols.", icon: <Shield className="w-6 h-6" /> }
            ].map((box, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="p-12 rounded-[3.5rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/40 group hover:border-primary/30 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-primary mb-10 group-hover:scale-110 transition-transform">
                  {box.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 text-slate-950">{box.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{box.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 4: THE PROTOCOL (White: #FFFFFF) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="relative py-40 overflow-hidden bg-white text-slate-900 border-t border-slate-100"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-16">
              <div className="space-y-6">
                 <motion.p variants={itemVariants} className="text-primary font-black text-[10px] uppercase tracking-[0.5em]">The Execution Engine</motion.p>
                 <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-display font-black text-slate-950 leading-tight tracking-tight">
                    Phase-Based <br/>
                    <span className="text-primary italic">Deployment</span>.
                 </motion.h2>
              </div>
              
              <div className="space-y-4">
                {[
                  { id: "01", title: "Discovery & Stress Test", desc: "We push your current limits to find the point of failure." },
                  { id: "02", title: "Infrastructure Mapping", desc: "A custom technical blueprint designed for your scale goals." },
                  { id: "03", title: "Global Integration", desc: "Seamless rollout across our worldwide network of nodes." },
                  { id: "04", title: "Autonomous Scale", desc: "Continuous optimization through our proprietary AI engine." }
                ].map((step, i) => (
                  <motion.div 
                    key={i} 
                    variants={itemVariants}
                    className="p-8 rounded-3xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 group flex gap-8 items-start"
                  >
                    <div className="text-3xl font-display font-black text-slate-200 group-hover:text-primary transition-colors">{step.id}</div>
                    <div>
                       <h4 className="text-xl font-bold text-slate-950 mb-1">{step.title}</h4>
                       <p className="text-slate-400 font-medium">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div variants={itemVariants} className="relative">
              <div className="absolute -inset-10 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative p-12 rounded-[4rem] bg-slate-50 border border-slate-200 shadow-inner group">
                <Workflow className="w-full h-full text-slate-200 group-hover:text-primary/20 transition-all duration-1000" strokeWidth={0.5} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white rounded-full shadow-2xl flex items-center justify-center">
                   <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl animate-pulse">
                      <Rocket className="w-8 h-8" />
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 5: FINAL STRATEGY (Radiant Dark Gradient) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="relative py-48 overflow-hidden bg-gradient-to-b from-[#020205] to-[#0A0A1F]"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="container mx-auto px-6 text-center relative z-10 space-y-16">
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/10 text-accent text-[10px] font-black uppercase tracking-[0.3em]">
              <Sparkles className="w-4 h-4" /> Final Strategy Cycle
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-6xl md:text-9xl font-display font-black text-white tracking-tighter leading-[0.85]">
              Redefine Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary italic">Momentum</span>.
            </motion.h2>
          </div>

          <motion.div 
            variants={itemVariants}
            className="max-w-2xl mx-auto p-12 md:p-20 rounded-[4rem] glass-panel border border-white/10 relative overflow-hidden group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <p className="text-white/40 text-xl font-medium mb-12 relative z-10 leading-relaxed">
              Accepting enterprise partners for the next technical expansion sprint.
            </p>
            <Link href="/contact" className="relative z-10">
              <Button className="w-full h-24 bg-white text-primary hover:bg-primary hover:text-white rounded-[2rem] font-black text-2xl flex items-center gap-4 transition-all duration-500 shadow-[0_20px_50px_rgba(255,255,255,0.1)]">
                BOOK STRATEGY CALL <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
      </div>
    </>
  );
}
