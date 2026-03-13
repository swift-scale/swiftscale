import { CheckCircle2 } from "lucide-react";

const features = [
  "Zero-configuration deployment pipelines",
  "Automated global edge caching",
  "Real-time collaborative workspaces",
  "Granular role-based access control",
  "Integrated observability and logging",
  "Custom domain management with auto-SSL"
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Why Forward-Thinking Teams Choose <span className="text-accent">Swiftscale</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              We eliminated the complexity of modern cloud infrastructure so your team can focus on what matters: building incredible products that users love.
            </p>
            
            <ul className="space-y-4 mb-10">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                  <span className="text-white/80">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 mt-8">
              <div className="glass-panel p-6 rounded-2xl glow-effect">
                <h4 className="text-4xl font-display font-bold text-white mb-2">99.99%</h4>
                <p className="text-sm text-muted-foreground">Guaranteed Uptime SLA</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl">
                <h4 className="text-4xl font-display font-bold text-white mb-2">&lt;50ms</h4>
                <p className="text-sm text-muted-foreground">Global Latency</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="glass-panel p-6 rounded-2xl">
                <h4 className="text-4xl font-display font-bold text-white mb-2">10x</h4>
                <p className="text-sm text-muted-foreground">Faster Deployments</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl border-accent/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-accent/10 group-hover:bg-accent/20 transition-colors" />
                <div className="relative z-10">
                  <h4 className="text-4xl font-display font-bold text-white mb-2">24/7</h4>
                  <p className="text-sm text-muted-foreground">Expert Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
