import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Send, MessageSquare, ArrowRight } from "lucide-react";
import contactMapImage from "@/assets/images/contact-map.png";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-accent selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 relative overflow-hidden bg-background">
        {/* Abstract Background Shapes */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/10 text-white/80 text-sm font-medium mb-8">
            <MessageSquare className="w-4 h-4 text-accent" />
            Get in touch
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700">
            Let's build something <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">extraordinary</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            Whether you need a custom software solution, enterprise training, or a complete digital transformation strategy, our team is ready to help you scale.
          </p>
        </div>
      </section>

      <section className="py-12 pb-24 relative z-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Contact Info (Left Column) */}
            <div className="lg:col-span-2 space-y-8">
              <div className="glass-panel p-8 rounded-3xl border border-white/10 h-full relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
                
                <h2 className="text-2xl font-display font-bold mb-8 text-white">Contact Information</h2>
                
                <div className="space-y-8">
                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Email Us</h3>
                      <a href="mailto:hello@swiftscale.tech" className="text-lg font-semibold text-white hover:text-accent transition-colors block">
                        hello@swiftscale.tech
                      </a>
                      <a href="mailto:support@swiftscale.tech" className="text-sm text-white/70 hover:text-white transition-colors">
                        support@swiftscale.tech
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform duration-300 delay-75">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Call Us</h3>
                      <a href="tel:+1888SWIFTSCALE" className="text-lg font-semibold text-white hover:text-primary transition-colors block">
                        +1 (888) SWIFT-SCALE
                      </a>
                      <p className="text-sm text-white/70">Mon-Fri, 9am - 6pm EST</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0 group-hover:scale-110 transition-transform duration-300 delay-150">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Visit Us</h3>
                      <p className="text-lg font-semibold text-white">
                        101 Innovation Way
                      </p>
                      <p className="text-sm text-white/70">Tech District, San Francisco<br/>CA 94103</p>
                    </div>
                  </div>
                </div>

                {/* Map Image */}
                <div className="mt-12 rounded-2xl overflow-hidden border border-white/10 h-[200px] relative">
                  <img 
                    src={contactMapImage} 
                    alt="Office Location Map" 
                    className="w-full h-full object-cover mix-blend-lighten opacity-80 hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="w-3 h-3 bg-accent rounded-full shadow-[0_0_15px_rgba(var(--accent),0.8)] animate-pulse" />
                    <Button size="sm" variant="outline" className="h-8 text-xs bg-black/50 backdrop-blur-md border-white/20 hover:bg-white/10 text-white">
                      Get Directions
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form (Right Column) */}
            <div className="lg:col-span-3">
              <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative">
                <h2 className="text-3xl font-display font-bold mb-2 text-white">Send a Message</h2>
                <p className="text-muted-foreground mb-8">We usually respond within 24 hours.</p>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">First Name</label>
                      <Input placeholder="John" className="bg-white/5 border-white/10 h-12 text-white focus:border-accent focus:ring-accent/20 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">Last Name</label>
                      <Input placeholder="Doe" className="bg-white/5 border-white/10 h-12 text-white focus:border-accent focus:ring-accent/20 transition-all" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">Email Address</label>
                      <Input type="email" placeholder="john@company.com" className="bg-white/5 border-white/10 h-12 text-white focus:border-accent focus:ring-accent/20 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">Phone Number</label>
                      <Input type="tel" placeholder="+1 (555) 000-0000" className="bg-white/5 border-white/10 h-12 text-white focus:border-accent focus:ring-accent/20 transition-all" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">How can we help you?</label>
                    <Select>
                      <SelectTrigger className="bg-white/5 border-white/10 h-12 text-white focus:border-accent focus:ring-accent/20 transition-all">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-white/10 text-white">
                        <SelectItem value="training" className="focus:bg-white/10">Training & Certification</SelectItem>
                        <SelectItem value="ecommerce" className="focus:bg-white/10">E-Commerce Solutions</SelectItem>
                        <SelectItem value="it" className="focus:bg-white/10">IT Services & Development</SelectItem>
                        <SelectItem value="consulting" className="focus:bg-white/10">Consulting & Strategy</SelectItem>
                        <SelectItem value="other" className="focus:bg-white/10">Other Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Project Details</label>
                    <Textarea 
                      placeholder="Tell us about your project, timeline, and budget..." 
                      className="bg-white/5 border-white/10 min-h-[150px] text-white focus:border-accent focus:ring-accent/20 transition-all resize-y" 
                    />
                  </div>
                  
                  <Button className="w-full h-14 bg-white text-primary hover:bg-white/90 font-bold rounded-xl flex items-center justify-center gap-2 group transition-all text-lg mt-4 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    Send Message
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    By submitting this form, you agree to our <a href="/privacy" className="text-white/70 hover:text-white underline underline-offset-2">Privacy Policy</a>.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-card border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-bold mb-8 text-white">Ready for a deeper dive?</h2>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-10 h-14 font-bold">
            Book Strategy Call
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
