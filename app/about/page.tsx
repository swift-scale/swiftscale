"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Target, Rocket, Zap, Globe, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-accent selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            About Swiftscale
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            We are a growth-focused digital marketing and technology platform helping businesses scale smarter through innovation and data-driven strategies.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="glass-panel p-10 rounded-3xl border-accent/20">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-display font-bold mb-4 text-white">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To become the global catalyst for business transformation, where technology and creativity converge to build sustainable, scalable empires for our partners.
              </p>
            </div>
            <div className="glass-panel p-10 rounded-3xl border-purple-500/20">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                <Rocket className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-display font-bold mb-4 text-white">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                Empowering brands with cutting-edge IT solutions, high-performance digital marketing, and expert training to navigate the complexities of the modern digital landscape.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-16 text-center">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Digital Marketing", desc: "Data-driven campaigns that drive ROI and brand visibility." },
              { title: "E-Commerce Ops", desc: "End-to-end management from inventory to warehousing." },
              { title: "IT Solutions", desc: "Custom software, cloud infrastructure, and cybersecurity." },
              { title: "Training Programs", desc: "Masterclasses in BI, Data Science, and Development." }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl glass-panel hover:border-accent/50 transition-colors">
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-16 text-center">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2" />
            {["Audit", "Strategy", "Execution", "Scale"].map((step, i) => (
              <div key={i} className="relative z-10 text-center">
                <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold mx-auto mb-6 shadow-[0_0_20px_rgba(58,154,255,0.5)]">
                  {i + 1}
                </div>
                <h4 className="text-xl font-bold mb-2 text-white">{step}</h4>
                <p className="text-sm text-muted-foreground">Phased methodology for predictable growth.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Swiftscale */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-16 text-center">Why Swiftscale?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Zap />, title: "Technology-first", desc: "Leveraging the latest stack for performance." },
              { icon: <Globe />, title: "Data-driven", desc: "Decisions backed by rigorous analytics." },
              { icon: <Target />, title: "ROI focused", desc: "Every dollar spent is optimized for returns." },
              { icon: <Shield />, title: "End-to-end", desc: "We handle the entire growth lifecycle." }
            ].map((item, i) => (
              <div key={i} className="text-center p-8">
                <div className="text-accent mb-6 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-accent">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-white">Ready to Scale With Us?</h2>
          <Button size="lg" className="bg-white text-accent hover:bg-white/90 rounded-full px-12 h-16 text-lg font-bold">
            Contact Us
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
