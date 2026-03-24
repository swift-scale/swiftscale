import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const features = [
  "End-to-end e-commerce solutions and enablement",
  "Innovative and scalable technology platforms",
  "Industry-ready talent development programs",
  "Tailored consulting and workforce transitions",
  "Data-driven performance and growth audits",
  "End-to-end logistics and marketplace management"
];

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 100 } }
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
};

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Empowering Success in the <span className="text-accent">Digital World</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              At SwiftScale, we partner with businesses at every stage of their journey—from strategic blueprinting to operational scaling and global market expansion.
            </p>
            
            <motion.ul 
              className="space-y-4 mb-10"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {features.map((feature, i) => (
                <motion.li key={i} variants={itemVariants} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                  <span className="text-white/80">{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 gap-4"
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="space-y-4 mt-8">
              <motion.div variants={cardVariants} className="glass-panel p-6 rounded-2xl glow-effect">
                <h4 className="text-4xl font-display font-bold text-white mb-2">99.99%</h4>
                <p className="text-sm text-muted-foreground">Guaranteed Uptime SLA</p>
              </motion.div>
              <motion.div variants={cardVariants} className="glass-panel p-6 rounded-2xl">
                <h4 className="text-4xl font-display font-bold text-white mb-2">&lt;50ms</h4>
                <p className="text-sm text-muted-foreground">Global Latency</p>
              </motion.div>
            </div>
            <div className="space-y-4">
              <motion.div variants={cardVariants} className="glass-panel p-6 rounded-2xl">
                <h4 className="text-4xl font-display font-bold text-white mb-2">10x</h4>
                <p className="text-sm text-muted-foreground">Faster Deployments</p>
              </motion.div>
              <motion.div variants={cardVariants} className="glass-panel p-6 rounded-2xl border-accent/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-accent/10 group-hover:bg-accent/20 transition-colors" />
                <div className="relative z-10">
                  <h4 className="text-4xl font-display font-bold text-white mb-2">24/7</h4>
                  <p className="text-sm text-muted-foreground">Expert Support</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
