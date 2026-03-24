import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 90, damping: 16 } },
};

export function FinalCta() {
  return (
    <section className="py-32 relative overflow-hidden group">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-background" />
      <div className="absolute inset-0 bg-[url('/are_u_ready.jpg')] bg-cover bg-center opacity-25 mix-blend-soft-light transition-transform duration-1000 ease-in-out group-hover:scale-110" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.apply/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-accent/30 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        className="container mx-auto px-6 relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-display font-bold mb-6 text-white tracking-tight">
          Ready to Scale Your Future?
        </motion.h2>
        <motion.p variants={itemVariants} className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
          Join thousands of developers building fast, secure, and scalable
          applications on Swiftscale.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 h-14 font-semibold text-base shadow-[0_0_40px_-5px_rgba(36,27,235,0.3)] transition-all hover:scale-105"
            >
              Talk to Sales
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
