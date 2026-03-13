"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Zap,
  Globe,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import contactMapImage from "@/assets/images/contact-map.png";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#020205] text-white selection:bg-primary selection:text-white overflow-hidden font-sans">
      <Navbar />

      {/* SECTION 1: Get in Touch (Top - Dark Theme) */}
      <section className="relative pt-44 pb-32 bg-[#020205]">
        {/* Architectural Backdrop */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none bg-cover bg-center scale-105 animate-slow-zoom"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')",
          }}
        />

        <div className="container mx-auto px-6 relative z-10 w-full max-w-7xl font-sans">
          {/* Headline Suite */}
          <div className="mb-16 space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.4em]">
              <Sparkles className="w-4 h-4" /> Professional Solutions
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-black leading-none tracking-tight text-white">
              Let's build{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                Extraordinary
              </span>
              <br />
              things together.
            </h1>
            <p className="text-white/40 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
              Ready to take your project to the next level? Our team of experts
              is standing by to help you scale and succeed.
            </p>
          </div>

          <div className="glass-panel rounded-[3.5rem] border border-white/15 overflow-hidden shadow-[0_50px_150px_rgba(0,0,0,0.8)] backdrop-blur-3xl animate-in fade-in zoom-in-95 duration-1000 delay-200">
            <div className="grid grid-cols-1 lg:grid-cols-10">
              {/* Left Side: Contact Methods (40%) */}
              <div className="lg:col-span-4 p-12 lg:p-16 bg-white/5 border-b lg:border-b-0 lg:border-r border-white/10">
                <div className="h-full flex flex-col justify-between space-y-12">
                  <div className="space-y-6">
                    <h2 className="text-3xl font-display font-black tracking-tight">
                      Get in <span className="text-primary italic">Touch</span>
                    </h2>
                    <p className="text-white/40 text-sm font-medium leading-relaxed max-w-xs">
                      Choose your preferred way to connect. We typically respond
                      within 24 hours.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        icon: <Mail />,
                        title: "Email Address",
                        data: "hello@swiftscale.tech",
                        color: "primary",
                      },
                      {
                        icon: <Phone />,
                        title: "Phone Support",
                        data: "+1 (888) SWIFT-SCALE",
                        color: "accent",
                      },
                      {
                        icon: <MapPin />,
                        title: "Main Office",
                        data: "San Francisco HQ",
                        color: "secondary",
                      },
                    ].map((channel, i) => (
                      <div
                        key={i}
                        className="group p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-500 cursor-pointer"
                      >
                        <div className="flex items-center gap-6">
                          <div
                            className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-${channel.color} group-hover:scale-110 transition-transform`}
                          >
                            {channel.icon}
                          </div>
                          <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-0.5">
                              {channel.title}
                            </p>
                            <p className="text-sm font-bold text-white tracking-tight">
                              {channel.data}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                        Support: Online
                      </span>
                    </div>
                    <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                      Global Support
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Message Form (60%) */}
              <div className="lg:col-span-6 p-12 lg:p-16 relative bg-white/[0.02]">
                <form className="space-y-8 max-w-lg mx-auto">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2.5">
                        <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">
                          First Name
                        </Label>
                        <Input
                          placeholder="John"
                          className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/10 rounded-2xl focus:border-primary/50 focus:ring-primary/10 transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-2.5 pt-6 sm:pt-0">
                        <Label className="hidden sm:block text-[9px] font-black uppercase tracking-[0.2em] text-white/30 ml-1 opacity-0">
                          Spacer
                        </Label>
                        <Input
                          placeholder="Doe"
                          className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/10 rounded-2xl focus:border-primary/50 focus:ring-primary/10 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">
                        Email Address
                      </Label>
                      <Input
                        type="email"
                        placeholder="john@company.com"
                        className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/10 rounded-2xl focus:border-primary/50 focus:ring-primary/10 transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-2.5">
                      <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">
                        Service Required
                      </Label>
                      <Select>
                        <SelectTrigger className="h-14 bg-white/5 border-white/10 text-white rounded-2xl focus:border-primary/50 focus:ring-primary/10 transition-all font-medium">
                          <SelectValue placeholder="What can we help with?" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-white/20 text-white backdrop-blur-xl">
                          <SelectItem
                            value="scaling"
                            className="focus:bg-primary/20"
                          >
                            Scaling Strategy
                          </SelectItem>
                          <SelectItem
                            value="infra"
                            className="focus:bg-primary/20"
                          >
                            Infrastructure Audit
                          </SelectItem>
                          <SelectItem
                            value="growth"
                            className="focus:bg-primary/20"
                          >
                            Growth Consulting
                          </SelectItem>
                          <SelectItem
                            value="partnership"
                            className="focus:bg-primary/20"
                          >
                            Business Partnership
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2.5">
                      <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">
                        Project Details
                      </Label>
                      <Textarea
                        placeholder="Tell us about your project, goals, and timeline..."
                        className="bg-white/5 border-white/10 min-h-[160px] text-white placeholder:text-white/10 rounded-[2rem] focus:border-primary/50 focus:ring-primary/10 transition-all font-medium resize-none p-6"
                      />
                    </div>
                  </div>

                  <Button className="w-full h-16 bg-primary text-primary-foreground hover:bg-primary/95 font-black text-lg rounded-2xl transition-all group shadow-[0_20px_50px_rgba(36,27,235,0.4)] relative overflow-hidden">
                    <div className="relative z-10 flex items-center justify-center gap-3">
                      SEND MESSAGE{" "}
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
