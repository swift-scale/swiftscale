import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Quote, Star, ArrowRight, Building2, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

import avatar1 from "@/assets/images/avatar-1.png";
import avatar2 from "@/assets/images/avatar-2.png";
import avatar3 from "@/assets/images/avatar-3.png";

const PARTNERS = [
  { name: "TechCorp", logo: "TC" },
  { name: "Innovate AI", logo: "IA" },
  { name: "Global Systems", logo: "GS" },
  { name: "Future Finance", logo: "FF" },
  { name: "Nexus Health", logo: "NH" },
  { name: "Quantum Retail", logo: "QR" },
];

const METRICS = [
  { label: "Client Retention", value: "98%", icon: <Users className="w-6 h-6" /> },
  { label: "Avg. ROI Increase", value: "315%", icon: <TrendingUp className="w-6 h-6" /> },
  { label: "Enterprise Partners", value: "500+", icon: <Building2 className="w-6 h-6" /> },
];

const DETAILED_TESTIMONIALS = [
  {
    quote: "Partnering with Swiftscale completely transformed our digital infrastructure. Their team didn't just deliver a product; they delivered a scalable foundation that handled our 300% YoY growth effortlessly.",
    author: "Sarah Chen",
    role: "Chief Technology Officer",
    company: "DataSync Enterprise",
    avatar: avatar1,
    impact: "Reduced deployment time by 60% and cut server costs by 40%."
  },
  {
    quote: "The strategic consulting we received was world-class. They identified bottlenecks we didn't even know we had. Within six months of implementing their solutions, our operational efficiency skyrocketed.",
    author: "Marcus Johnson",
    role: "VP of Operations",
    company: "FlowState Global",
    avatar: avatar2,
    impact: "Increased team output by 2x without adding headcount."
  },
  {
    quote: "As an e-commerce brand, downtime means lost revenue. Swiftscale's cloud architecture gave us the reliability we needed during our highest traffic events like Black Friday. Flawless execution.",
    author: "Elena Rodriguez",
    role: "E-Commerce Director",
    company: "Nexus Retail",
    avatar: avatar3,
    impact: "Zero downtime during peak season, processing 50k+ orders."
  }
];

export default function Partners() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

    // Preload avatars
    const getSrc = (img: any) => typeof img === "string" ? img : img.src;
    const imagesToPreload = [avatar1, avatar2, avatar3].map(getSrc);
    let loadedCount = 0;

    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imagesToPreload.length) {
          setTimeout(() => setIsLoaded(true), 1000);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === imagesToPreload.length) {
          setIsLoaded(true);
        }
      };
    });

    // Fallback
    const timer = setTimeout(() => setIsLoaded(true), 3500);
    return () => clearTimeout(timer);
  }, []);

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
              Syncing Partner Ecosystem
            </div>
            <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent animate-shimmer" style={{ width: '60%' }} />
            </div>
          </div>
        </div>
      )}

      <div className={`min-h-screen bg-background text-white selection:bg-accent selection:text-white transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 relative overflow-hidden bg-background">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/10 text-white/80 text-sm font-medium mb-8">
            <Star className="w-4 h-4 text-accent fill-accent" />
            Client Success
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700">
            Trusted by industry <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">leaders worldwide</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            We don't just build software—we build partnerships. Discover how we've helped companies across the globe scale their operations and dominate their markets.
          </p>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
            {METRICS.map((metric, i) => (
              <div key={i} className="py-6 md:py-0 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
                  {metric.icon}
                </div>
                <h3 className="text-4xl font-display font-bold text-white mb-2">{metric.value}</h3>
                <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-24 overflow-hidden relative">
        <div className="container mx-auto px-6 mb-12 text-center">
          <h2 className="text-2xl font-display font-bold text-white/80">Our Strategic Partners</h2>
        </div>
        
        {/* Scrolling Logo Carousel Mockup */}
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
            {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, i) => (
              <li key={i} className="flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <div className="h-16 px-8 rounded-xl border border-white/10 glass-panel flex items-center justify-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-white">
                    {partner.logo}
                  </div>
                  <span className="font-display font-bold text-xl text-white">{partner.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Detailed Testimonials / Case Studies */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
              Client Stories
            </h2>
            <p className="text-muted-foreground text-lg">
              Read how we've partnered with visionary teams to solve complex challenges and drive measurable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {DETAILED_TESTIMONIALS.map((t, i) => (
              <div key={i} className="glass-panel p-8 md:p-10 rounded-3xl relative group border border-white/5 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 flex flex-col">
                <div className="absolute -top-5 right-8 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/20">
                  <Quote className="w-5 h-5 fill-current" />
                </div>
                
                <div className="mb-8 flex-1">
                  <p className="text-lg text-white/90 leading-relaxed font-medium">
                    "{t.quote}"
                  </p>
                </div>
                
                <div className="bg-white/5 rounded-xl p-5 mb-8 border border-white/5">
                  <div className="text-xs uppercase tracking-wider text-accent font-bold mb-1">Impact</div>
                  <p className="text-sm text-white/80 font-medium">{t.impact}</p>
                </div>
                
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/10">
                  <img 
                    src={typeof t.avatar === "string" ? t.avatar : t.avatar.src} 
                    alt={t.author} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-white/10 group-hover:border-accent transition-colors"
                  />
                  <div>
                    <h4 className="font-display font-bold text-white">{t.author}</h4>
                    <p className="text-white/60 text-sm">{t.role}</p>
                    <p className="text-accent text-xs font-medium uppercase tracking-wider mt-0.5">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">Join our network of innovators</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Ready to become our next success story? Let's discuss how we can accelerate your business.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-10 h-14 font-bold group">
            Start the Conversation
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <Footer />
      </div>
    </>
  );
}
