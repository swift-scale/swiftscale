import { motion } from "framer-motion";

const steps = [
  {
    num: "1",
    title: "Documentation",
    desc: "Comprehensive planning and execution tailored precisely to your specific requirements, ensuring zero downtime and maximum efficiency.",
  },
  {
    num: "2",
    title: "Account Setup",
    desc: "Seamless platform integration and strategic account positioning to establish a robust foundation for your digital operations.",
  },
  {
    num: "3",
    title: "Verification",
    desc: "Rigorous quality assurance and technical validation protocols to ensure all systems meet our high-performance scaling standards.",
  },
  {
    num: "4",
    title: "Store Launch",
    desc: "Full-scale deployment and operational go-live, followed by continuous monitoring and performance optimization for peak growth.",
  },
];

export function Process() {
  return (
    <section className="py-32 bg-[#020205] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Left Side: Content */}
          <div className="lg:w-1/3 pt-12 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-display font-black leading-tight text-white mb-8">
                How We <br />
                <span className="text-white">Execute</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-sm">
                A clear, actionable roadmap to transform your business from the ground up, built for maximum efficiency.
              </p>
              
              {/* Progress Pillar Pill */}
              <div className="w-24 h-[6px] rounded-full bg-white/5 relative overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-primary to-accent"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Side: Vertical Timeline */}
          <div className="flex-1 w-full space-y-8 relative">
            {/* Connecting Line */}
            <div className="absolute left-6 md:left-[2.75rem] top-8 bottom-8 w-[1px] bg-gradient-to-b from-primary/40 via-accent/40 to-transparent lg:block hidden" />

            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-8 md:gap-12 relative group"
              >
                {/* Number Circle */}
                <div className="relative z-10 flex-shrink-0 lg:block hidden">
                  <div className="w-12 md:w-14 h-12 md:h-14 rounded-full bg-[#0A0A15] border border-white/10 flex items-center justify-center text-white/40 font-black text-lg md:text-xl transition-all duration-500 group-hover:border-primary group-hover:text-primary group-hover:shadow-[0_0_20px_rgba(36,27,235,0.3)]">
                    {step.num}
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 bg-white/5 backdrop-blur-3xl border border-white/5 p-8 md:p-10 rounded-[2.5rem] hover:bg-white/[0.08] hover:border-white/10 transition-all duration-500 group/card">
                  <div className="flex flex-col gap-4">
                    {/* Mobile Number Indicator */}
                    <div className="lg:hidden text-[10px] font-black uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                       <span className="w-5 h-[1px] bg-primary" /> Step 0{step.num}
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white group-hover/card:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-white/50 text-sm md:text-base leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
