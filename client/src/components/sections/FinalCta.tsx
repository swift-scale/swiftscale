import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-background" />
      <div className="absolute inset-0 bg-[url('/are_u_ready.jpg')] bg-cover bg-center opacity-25 mix-blend-soft-light" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.apply/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-accent/30 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white tracking-tight">
          Ready to Scale Your Future?
        </h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
          Join thousands of developers building fast, secure, and scalable applications on Swiftscale.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 h-14 font-semibold text-base shadow-[0_0_40px_-5px_rgba(36,27,235,0.3)] transition-all hover:scale-105">
            Start Building Free
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-10 h-14 font-semibold text-base border-border hover:bg-muted/30 text-white transition-all backdrop-blur-sm">
            Talk to Sales
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
