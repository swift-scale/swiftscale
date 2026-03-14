import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
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

type MotionVariant = {
  initial: { opacity: number; y?: number; x?: number; scale?: number };
  animate: { opacity: number; y?: number; x?: number; scale?: number };
  transition: { duration: number; ease: [number, number, number, number] };
};

const sectionVariants: MotionVariant[] = [
  { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] } },
  { initial: { opacity: 0, y: 12, scale: 0.98 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  { initial: { opacity: 0, x: -18 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
  { initial: { opacity: 0, x: 18 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
  { initial: { opacity: 0, y: 18, scale: 0.99 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { duration: 0.46, ease: [0.2, 0.8, 0.2, 1] } },
  { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease: [0.2, 0.7, 0.2, 1] } },
  { initial: { opacity: 0, x: -12, scale: 0.99 }, animate: { opacity: 1, x: 0, scale: 1 }, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.44, ease: [0.2, 0.8, 0.2, 1] } },
  { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.44, ease: [0.2, 0.8, 0.2, 1] } },
];

function MotionSection({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: MotionVariant;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={shouldReduceMotion ? false : variant.initial}
      whileInView={shouldReduceMotion ? { opacity: 1 } : variant.animate}
      transition={variant.transition}
      viewport={{ once: false, amount: 0.4 }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.section>
  );
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

    // Preload hero illustration
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
        <MotionSection variant={sectionVariants[0]}>
          <Hero />
        </MotionSection>
        <MotionSection variant={sectionVariants[1]}>
          <CorePillars />
        </MotionSection>
        <MotionSection variant={sectionVariants[2]}>
          <AllServices />
        </MotionSection>
        <MotionSection variant={sectionVariants[3]}>
          <WhyChooseUs />
        </MotionSection>
        <MotionSection variant={sectionVariants[4]}>
          <Process />
        </MotionSection>
        <MotionSection variant={sectionVariants[5]}>
          <Academy />
        </MotionSection>
        <MotionSection variant={sectionVariants[6]}>
          <Testimonials />
        </MotionSection>
        <MotionSection variant={sectionVariants[7]}>
          <NewsletterSection />
        </MotionSection>
        <MotionSection variant={sectionVariants[8]}>
          <FinalCta />
        </MotionSection>
      </main>
      <Footer />
      </div>
    </>
  );
}

