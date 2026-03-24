"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { CorePillars } from "@/components/sections/CorePillars";
import { AllServices } from "@/components/sections/AllServices";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Process } from "@/components/sections/Process";
import { Academy } from "@/components/sections/Academy";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";
import { NewsletterSection } from "@/components/sections/Newsletter";

/**
 * LazySection — mounts children only when they are ~300px away from the viewport.
 * Once mounted, the section stays rendered (never unmounts).
 * `minHeight` keeps a placeholder so the scroll-bar height feels natural.
 */
function LazySection({ children, minHeight = "60vh" }: { children: ReactNode; minHeight?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect(); // stop observing once rendered
        }
      },
      { rootMargin: "300px 0px" } // start loading 300px before entering viewport
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {shouldRender ? children : <div style={{ minHeight }} />}
    </div>
  );
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const img = new Image();
    img.src = "/images/hero-illustration.png";
    img.onload = () => {
      setTimeout(() => setIsLoaded(true), 1200);
    };

    const timer = setTimeout(() => setIsLoaded(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Premium Loader */}
      {!isLoaded && (
        <div className="fixed inset-0 z-[100] bg-[#020205] flex flex-col items-center justify-center transition-opacity duration-700">
          <div className="relative">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary via-accent to-secondary animate-spin blur-2xl opacity-10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-black text-2xl text-white shadow-2xl animate-pulse">
                S
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center gap-5">
            <div className="text-white/30 text-[10px] font-black uppercase tracking-[0.6em] animate-pulse">
              Calibrating Infrastructure
            </div>
            <div className="w-56 h-[2px] bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent animate-shimmer" style={{ width: '40%' }} />
            </div>
          </div>
        </div>
      )}

      <div className={`min-h-screen bg-background font-sans selection:bg-accent selection:text-white transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <Navbar />
        <main>
          {/* Hero always loads immediately — it's the first thing the user sees */}
          <Hero />

          {/* All subsequent sections lazy-load just before they scroll into view */}
          <LazySection minHeight="80vh">
            <CorePillars />
          </LazySection>

          <LazySection minHeight="80vh">
            <AllServices />
          </LazySection>

          <LazySection minHeight="70vh">
            <WhyChooseUs />
          </LazySection>

          <LazySection minHeight="60vh">
            <Process />
          </LazySection>

          <LazySection minHeight="70vh">
            <Academy />
          </LazySection>

          <LazySection minHeight="60vh">
            <Testimonials />
          </LazySection>

          <LazySection minHeight="50vh">
            <NewsletterSection />
          </LazySection>

          <LazySection minHeight="50vh">
            <FinalCta />
          </LazySection>
        </main>
        <Footer />
      </div>
    </>
  );
}


