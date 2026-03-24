"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const steps = [
  {
    num: "01",
    title: "Strategy",
    desc: "We analyze your business objectives to design bespoke digital and technology roadmaps tailored for scale.",
  },
  {
    num: "02",
    title: "Implementation",
    desc: "Our engineering squad deploys high-performance e-commerce platforms and robust digital infrastructure.",
  },
  {
    num: "03",
    title: "Optimization",
    desc: "Continuous performance audits and data-driven refinements ensure your systems operate at peak efficiency.",
  },
  {
    num: "04",
    title: "Growth",
    desc: "We accelerate your market expansion through advanced digital marketing and operational scaling strategies.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 120, damping: 14 } 
  },
};

export function Process() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            From Code to Global <br />
            <span className="text-accent">in Minutes</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our streamlined deployment process takes the headache out of
            shipping.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {steps.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <motion.div key={i} variants={itemVariants} className="relative pt-8 md:pt-0">
                  {/* Connector dot — highlights when active */}
                  <div 
                    className={`hidden md:flex absolute top-12 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-background border-2 z-10 transition-all duration-500 ${
                      isActive 
                        ? "border-accent scale-150 shadow-[0_0_20px_rgba(58,154,255,0.9)]" 
                        : "border-accent/30 shadow-[0_0_6px_rgba(58,154,255,0.2)]"
                    }`} 
                  />

                  <div className="md:mt-24 text-center">
                    {/* Step number — glows when active */}
                    <div 
                      className={`text-5xl font-display font-bold mb-6 md:mb-4 inline-block transition-all duration-500 ${
                        isActive 
                          ? "text-accent drop-shadow-[0_0_20px_rgba(58,154,255,0.8)] scale-110" 
                          : "text-white/10"
                      }`}
                    >
                      {step.num}
                    </div>
                    <h3 className={`text-xl font-display font-semibold mb-3 transition-colors duration-500 ${isActive ? "text-accent" : "text-white"}`}>
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

