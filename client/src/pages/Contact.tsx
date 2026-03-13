import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  Calendar,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Sparkles,
} from "lucide-react";
import contactMapImage from "@/assets/images/contact-map.png";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-accent selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-80" />
        <div className="absolute top-[-30%] left-[-10%] w-[55%] h-[55%] bg-primary/25 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-35%] right-[-15%] w-[60%] h-[60%] bg-accent/25 blur-[160px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-border text-white/80 text-sm font-medium mb-8">
                <MessageSquare className="w-4 h-4 text-accent" />
                Contact Swiftscale
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700">
                Bring your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  next launch
                </span>{" "}
                to life.
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                Tell us what you are building. We will map the fastest, safest
                path from idea to shipped product.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-12 font-semibold"
                >
                  Schedule a Call
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 h-12 border-border/60 text-white hover:bg-white/10"
                >
                  Email Us
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass-panel p-4 rounded-2xl border border-border flex items-center gap-3">
                  <Clock className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-white/70">Response Time</p>
                    <p className="text-sm font-semibold text-white">
                      Under 24 hours
                    </p>
                  </div>
                </div>
                <div className="glass-panel p-4 rounded-2xl border border-border flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-white/70">Availability</p>
                    <p className="text-sm font-semibold text-white">
                      Mon–Fri, 9am–6pm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-8 -left-8 w-36 h-36 bg-secondary/30 blur-3xl rounded-full" />
              <div
                className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(11,26,48,0.6)] h-[440px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop')",
                }}
                aria-label="Team collaborating in a studio"
                role="img"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-transparent to-accent/20" />
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
                  <div className="glass-panel px-4 py-2 rounded-full text-xs text-white/80 border border-border flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    Product Strategy
                  </div>
                  <div className="glass-panel px-4 py-2 rounded-full text-xs text-white/80 border border-border">
                    San Francisco HQ
                  </div>
                  <div className="glass-panel px-4 py-2 rounded-full text-xs text-white/80 border border-border">
                    Global Delivery
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-3xl border border-border group hover:border-accent/60 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center text-accent mb-5 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Email our team
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                For proposals, partnerships, and general inquiries.
              </p>
              <a
                href="mailto:hello@swiftscale.tech"
                className="text-sm font-semibold text-white hover:text-accent transition-colors"
              >
                hello@swiftscale.tech
              </a>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-border group hover:border-primary/60 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Talk with us
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Schedule a call with a solutions architect.
              </p>
              <a
                href="tel:+1888SWIFTSCALE"
                className="text-sm font-semibold text-white hover:text-primary transition-colors"
              >
                +1 (888) SWIFT-SCALE
              </a>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-border group hover:border-secondary/60 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-secondary/15 flex items-center justify-center text-secondary mb-5 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Visit the studio
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Meet us in the heart of the tech district.
              </p>
              <p className="text-sm font-semibold text-white">
                101 Innovation Way, San Francisco
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-panel p-6 rounded-3xl border border-border relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
                <h2 className="text-xl font-display font-bold text-white mb-4">
                  Where to find us
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Drop by for a working session or reserve a private demo room.
                </p>
                <div className="rounded-2xl overflow-hidden border border-white/10 h-[220px] relative">
                  <img
                    src={contactMapImage}
                    alt="Office Location Map"
                    className="w-full h-full object-cover mix-blend-lighten opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="w-3 h-3 bg-accent rounded-full shadow-[0_0_15px_rgba(var(--accent),0.8)] animate-pulse" />
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs bg-card/80 backdrop-blur-md border-border/50 hover:bg-muted/30 text-white"
                    >
                      Get Directions
                    </Button>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-3xl border border-border">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Support Desk
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Enterprise clients get a dedicated success manager and
                  priority SLA.
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex items-center justify-between">
                    <span>Response SLA</span>
                    <span className="font-semibold text-white">4 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Timezone Coverage</span>
                    <span className="font-semibold text-white">
                      Americas + EMEA
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Support Email</span>
                    <span className="font-semibold text-white">
                      support@swiftscale.tech
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative">
                <h2 className="text-3xl font-display font-bold mb-2 text-white">
                  Send a Message
                </h2>
                <p className="text-muted-foreground mb-8">
                  We will route your request to the right team in minutes.
                </p>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">
                        First Name
                      </label>
                      <Input
                        placeholder="John"
                        className="bg-muted/50 border-border h-12 text-white focus:border-accent focus:ring-accent/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">
                        Last Name
                      </label>
                      <Input
                        placeholder="Doe"
                        className="bg-muted/50 border-border h-12 text-white focus:border-accent focus:ring-accent/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        placeholder="john@company.com"
                        className="bg-muted/50 border-border h-12 text-white focus:border-accent focus:ring-accent/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="bg-muted/50 border-border h-12 text-white focus:border-accent focus:ring-accent/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">
                      How can we help you?
                    </label>
                    <Select>
                      <SelectTrigger className="bg-muted/50 border-border h-12 text-white focus:border-accent focus:ring-accent/20 transition-all">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border text-white">
                        <SelectItem
                          value="training"
                          className="focus:bg-muted/30"
                        >
                          Training & Certification
                        </SelectItem>
                        <SelectItem
                          value="ecommerce"
                          className="focus:bg-muted/30"
                        >
                          E-Commerce Solutions
                        </SelectItem>
                        <SelectItem value="it" className="focus:bg-muted/30">
                          IT Services & Development
                        </SelectItem>
                        <SelectItem
                          value="consulting"
                          className="focus:bg-muted/30"
                        >
                          Consulting & Strategy
                        </SelectItem>
                        <SelectItem value="other" className="focus:bg-muted/30">
                          Other Inquiry
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">
                      Project Details
                    </label>
                    <Textarea
                      placeholder="Tell us about your goals, timeline, and success metrics..."
                      className="bg-muted/50 border-border min-h-[150px] text-white focus:border-accent focus:ring-accent/20 transition-all resize-y"
                    />
                  </div>

                  <Button className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl flex items-center justify-center gap-2 group transition-all text-lg mt-4 shadow-[0_0_25px_rgba(36,27,235,0.35)]">
                    Send Message
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    By submitting this form, you agree to our{" "}
                    <a
                      href="/privacy"
                      className="text-white/70 hover:text-white underline underline-offset-2"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - High-Impact Strategy Call Portal */}
      <section className="relative py-32 overflow-hidden border-t border-white/5">
        {/* Depth & Background Effects */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(36,27,235,0.1)_0%,_transparent_70%)] pointer-events-none" />
        
        {/* Floating Architectural Elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[15%] h-[1px] bg-gradient-to-r from-transparent to-white/10 hidden lg:block" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[15%] h-[1px] bg-gradient-to-l from-transparent to-white/10 hidden lg:block" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="glass-panel p-12 md:p-24 rounded-[3.5rem] border border-white/10 text-center relative overflow-hidden group">
              {/* Subtle Animated Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-accent/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="relative z-10 space-y-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-[10px] font-black uppercase tracking-[0.3em]">
                  <Sparkles className="w-4 h-4" /> Strategic Partnership
                </div>
                
                <h2 className="text-4xl md:text-7xl font-display font-extrabold text-white leading-tight tracking-tight">
                  Ready for a <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent italic">deeper dive?</span>
                </h2>
                
                <p className="text-white/40 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                  Schedule a private session with our senior architects to map your technical scaling strategy and success metrics.
                </p>
                
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-8">
                  <Button
                    size="lg"
                    className="h-16 px-12 bg-white text-primary hover:bg-white/90 rounded-2xl font-black text-lg transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)] group/btn relative overflow-hidden active:scale-95"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      BOOK STRATEGY CALL <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-12 h-12 rounded-full border-4 border-[#020205] bg-slate-800 overflow-hidden relative group/avatar">
                           <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                           <div className="w-full h-full flex items-center justify-center text-[10px] font-black text-white/40">ARCH</div>
                        </div>
                      ))}
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black text-white leading-none uppercase tracking-[0.2em] mb-1">Architects Live</p>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <p className="text-[9px] text-emerald-400 font-black uppercase tracking-widest">Line Frequency Optimal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
