"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Shield, Lock, Eye, Database, Globe, Scale } from "lucide-react";
import { useState, useEffect } from "react";

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("information-collection");

  const sections = [
    { id: "information-collection", title: "Information We Collect", icon: <Database className="w-4 h-4" /> },
    { id: "how-we-use", title: "How We Use Your Info", icon: <Eye className="w-4 h-4" /> },
    { id: "data-security", title: "Data Security", icon: <Lock className="w-4 h-4" /> },
    { id: "third-party", title: "Third-Party Services", icon: <Globe className="w-4 h-4" /> },
    { id: "your-rights", title: "Your Rights", icon: <Scale className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Simple scroll spy logic
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && scrollPosition >= element.offsetTop - 200) {
          setActiveSection(section.id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-white selection:bg-accent selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 relative overflow-hidden bg-background border-b border-white/5">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/10 text-white/80 text-sm font-medium mb-8">
              <Shield className="w-4 h-4 text-accent" />
              Legal Documentation
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Policy</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              We believe in transparency. This document outlines exactly how we handle your data, protect your privacy, and secure your digital footprint.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-white/60">Last updated: <strong className="text-white">March 12, 2026</strong></span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
              <span className="text-white/60">Effective from: <strong className="text-white">March 12, 2026</strong></span>
            </div>
          </div>
        </div>
      </section>

      <main className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sticky Sidebar Navigation */}
            <div className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-32 glass-panel p-6 rounded-2xl border border-white/5">
                <h3 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-4">Contents</h3>
                <nav className="flex flex-col gap-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`flex items-center gap-3 text-left px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                        activeSection === section.id 
                          ? "bg-accent/10 text-accent" 
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span className={activeSection === section.id ? "text-accent" : "text-white/40"}>
                        {section.icon}
                      </span>
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9 max-w-4xl">
              <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 space-y-16">
                
                {/* Intro */}
                <div className="prose prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed">
                  <p>
                    At Swiftscale, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                  </p>
                </div>

                <section id="information-collection" className="scroll-mt-32">
                  <h2 className="text-2xl font-display font-bold text-white mb-6 pb-4 border-b border-white/10 flex items-center gap-3">
                    <Database className="w-6 h-6 text-accent" />
                    1. Information We Collect
                  </h2>
                  <div className="prose prose-invert max-w-none text-muted-foreground">
                    <p>We collect information that you provide directly to us when you:</p>
                    <ul className="space-y-2 mt-4 marker:text-accent">
                      <li>Register for an account or subscription</li>
                      <li>Sign up for our training programs</li>
                      <li>Request customer support or technical assistance</li>
                      <li>Subscribe to our newsletter or marketing materials</li>
                      <li>Communicate with us via third-party social media sites</li>
                    </ul>
                    <div className="bg-white/5 p-6 rounded-xl border border-white/5 mt-6">
                      <h4 className="text-white font-semibold mb-2">Personal Data</h4>
                      <p className="text-sm">This information may include your name, email address, phone number, company name, billing information, and any other information you choose to provide.</p>
                    </div>
                  </div>
                </section>

                <section id="how-we-use" className="scroll-mt-32">
                  <h2 className="text-2xl font-display font-bold text-white mb-6 pb-4 border-b border-white/10 flex items-center gap-3">
                    <Eye className="w-6 h-6 text-accent" />
                    2. How We Use Your Information
                  </h2>
                  <div className="prose prose-invert max-w-none text-muted-foreground">
                    <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-background p-5 rounded-xl border border-white/5">
                        <span className="text-primary font-bold text-sm mb-2 block">01 / Operations</span>
                        <p className="text-sm">Provide, operate, and maintain our services and infrastructure.</p>
                      </div>
                      <div className="bg-background p-5 rounded-xl border border-white/5">
                        <span className="text-primary font-bold text-sm mb-2 block">02 / Transactions</span>
                        <p className="text-sm">Process your transactions and send related information including confirmations.</p>
                      </div>
                      <div className="bg-background p-5 rounded-xl border border-white/5">
                        <span className="text-primary font-bold text-sm mb-2 block">03 / Communication</span>
                        <p className="text-sm">Send you technical notices, updates, security alerts, and administrative messages.</p>
                      </div>
                      <div className="bg-background p-5 rounded-xl border border-white/5">
                        <span className="text-primary font-bold text-sm mb-2 block">04 / Analytics</span>
                        <p className="text-sm">Monitor and analyze trends, usage, and activities in connection with our Services.</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="data-security" className="scroll-mt-32">
                  <h2 className="text-2xl font-display font-bold text-white mb-6 pb-4 border-b border-white/10 flex items-center gap-3">
                    <Lock className="w-6 h-6 text-accent" />
                    3. Data Security
                  </h2>
                  <div className="prose prose-invert max-w-none text-muted-foreground">
                    <p>
                      We implement appropriate technical and organizational security measures designed to protect your personal information against accidental or unlawful destruction, loss, alteration, and unauthorized disclosure or access.
                    </p>
                    <p className="mt-4">
                      However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                    </p>
                  </div>
                </section>

                <section id="third-party" className="scroll-mt-32">
                  <h2 className="text-2xl font-display font-bold text-white mb-6 pb-4 border-b border-white/10 flex items-center gap-3">
                    <Globe className="w-6 h-6 text-accent" />
                    4. Third-Party Services
                  </h2>
                  <div className="prose prose-invert max-w-none text-muted-foreground">
                    <p>
                      We may use third-party service providers to process your information on our behalf. These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                    </p>
                    <ul className="space-y-2 mt-4">
                      <li><strong>Payment Processors:</strong> Stripe, PayPal</li>
                      <li><strong>Analytics:</strong> Google Analytics, Mixpanel</li>
                      <li><strong>Cloud Infrastructure:</strong> AWS, Google Cloud</li>
                    </ul>
                  </div>
                </section>

                <section id="your-rights" className="scroll-mt-32">
                  <h2 className="text-2xl font-display font-bold text-white mb-6 pb-4 border-b border-white/10 flex items-center gap-3">
                    <Scale className="w-6 h-6 text-accent" />
                    5. Your Rights
                  </h2>
                  <div className="prose prose-invert max-w-none text-muted-foreground">
                    <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
                    <ul className="space-y-3 mt-4">
                      <li><strong>Access:</strong> The right to access your personal data and receive copies.</li>
                      <li><strong>Rectification:</strong> The right to rectify inaccurate or incomplete data.</li>
                      <li><strong>Erasure:</strong> The right to request deletion of your data ("right to be forgotten").</li>
                      <li><strong>Restriction:</strong> The right to restrict or object to our processing of your data.</li>
                    </ul>
                    <p className="mt-6 text-sm bg-accent/5 text-accent p-4 rounded-lg border border-accent/20">
                      To exercise any of these rights, please contact our Data Protection Officer at privacy@swiftscale.com.
                    </p>
                  </div>
                </section>
                
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
