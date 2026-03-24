import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Academy() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <section className="py-24 bg-card relative border-y border-border/50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="order-2 lg:order-1 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
          >
            <div className="absolute -inset-4 bg-accent/10 blur-2xl rounded-3xl" />
            <img 
              src="/images/academy.png" 
              alt="Swiftscale Academy Team" 
              className="relative z-10 rounded-2xl shadow-2xl border border-border/50 w-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-accent text-sm font-medium mb-6">
              Learn & Grow
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">
              Swiftscale <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">Academy</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We offer industry-focused technology training programs designed to build job-ready professionals in high-demand fields. Master the skills needed for the modern digital economy.
            </motion.p>
            
            <motion.ul variants={itemVariants} className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Business Intelligence Master Program
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Full Stack Development Master Program
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                UI/UX Design Master Program
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Data Science & Visualization
              </li>
            </motion.ul>
            
            <motion.div variants={itemVariants}>
              <Button size="lg" className="rounded-full px-8 h-14 font-semibold text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_-5px_rgba(36,27,235,0.4)]">
                Explore Academy
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
