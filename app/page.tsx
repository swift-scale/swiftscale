"use client";

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
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-accent selection:text-white">
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
  );
}

