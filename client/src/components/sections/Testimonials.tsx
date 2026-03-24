"use client";

import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Switching to Swiftscale halved our deployment times and significantly reduced our infrastructure overhead. The platform is phenomenally intuitive.",
    author: "Priya Sharma"
  },
  {
    quote: "The reliability is unmatched. We process millions of events daily and haven't experienced a single minute of downtime since migrating.",
    author: "Rahul Desai"
  },
  {
    quote: "Swiftscale's edge network gave our application a global footprint instantly. The performance gains in APAC and EU regions were incredible.",
    author: "Ananya Patel"
  },
  {
    quote: "The training programs completely transformed our engineering team's approach to deployment. Highly recommend their curriculum.",
    author: "Karthik Iyer"
  },
  {
    quote: "Their E-Commerce solutions allowed us to scale from thousands to millions of users without breaking a sweat.",
    author: "Neha Gupta"
  },
  {
    quote: "Incredible support and strategic guidance. They understand the intersection of business and technology perfectly.",
    author: "Vikram Singh"
  }
];

export function Testimonials() {
  // Duplicate array once so we can seamlessly loop 50% of the total width
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-[#020205] overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Trusted by <span className="text-accent">Ambitious Minds</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Join the growing network of individuals relying on Swiftscale.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full flex overflow-hidden">
        {/* Shadow overlays for smooth fading edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#020205] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#020205] to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex w-max gap-8 px-4 py-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "loop", 
            duration: 40, 
            ease: "linear" 
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {duplicatedTestimonials.map((t, i) => (
            <div 
              key={i} 
              className="glass-panel p-8 rounded-2xl relative shrink-0 w-[350px] md:w-[450px] group hover:scale-[1.02] hover:bg-white/10 hover:border-primary/50 transition-all duration-500 border border-white/5 shadow-lg hover:shadow-[0_0_30px_rgba(58,154,255,0.2)]"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5 group-hover:text-primary/30 transition-colors duration-500" />
              
              <p className="text-white/80 leading-relaxed mb-8 relative z-10 text-sm md:text-base group-hover:text-white transition-colors duration-300">
                "{t.quote}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div>
                  <h4 className="font-display font-bold text-white text-base group-hover:text-accent transition-colors duration-300">
                    {t.author}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
