import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FileText, CheckCircle2, UserCheck, Key, CreditCard, AlertTriangle, Scale, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5 } 
  }
};

export default function Terms() {
  const [activeSection, setActiveSection] = useState("acceptance");

  const sections = [
    { id: "acceptance", title: "Acceptance of Terms", icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: "services", title: "Description of Services", icon: <FileText className="w-4 h-4" /> },
    { id: "accounts", title: "User Accounts", icon: <UserCheck className="w-4 h-4" /> },
    { id: "intellectual", title: "Intellectual Property", icon: <Key className="w-4 h-4" /> },
    { id: "billing", title: "Payments & Billing", icon: <CreditCard className="w-4 h-4" /> },
    { id: "liability", title: "Limitation of Liability", icon: <AlertTriangle className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
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
    <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 relative overflow-hidden bg-background border-b border-white/5 -mt-16 md:-mt-20">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="max-w-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/10 text-white/80 text-sm font-medium mb-8">
              <Scale className="w-4 h-4 text-primary" />
              Terms of Service
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">
              Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Conditions</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-muted-foreground leading-relaxed mb-6">
              The rules, guidelines, and agreements that govern your use of the Swiftscale platform and our associated services.
            </motion.p>
            <motion.div variants={itemVariants} className="flex items-center gap-4 text-sm">
              <span className="text-white/60">Last updated: <strong className="text-white">March 12, 2026</strong></span>
            </motion.div>
          </motion.div>
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
                          ? "bg-primary/10 text-primary" 
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span className={activeSection === section.id ? "text-primary" : "text-white/40"}>
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
                    These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Swiftscale ("we," "us" or "our"), concerning your access to and use of the Swiftscale website and services.
                  </p>
                </div>

                <section id="acceptance" className="scroll-mt-32">
                  <h2 className="text-2xl font-display font-bold text-white mb-6 pb-4 border-b border-white/10 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                    1. Acceptance of Terms
                  </h2>
                  <div className="prose prose-invert max-w-none text-muted-foreground">
                    <p>
                      By accessing or using our website and services, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you disagree with any part of these terms, you may not access our services.
                    </p>
                    <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl mt-4 text-sm text-primary-foreground">
                      <strong>Note:</strong> We reserve the right, at our sole discretion, to make changes or modifications to these Terms of Service at any time and for any reason.
                    </div>
                  </div>
                </section>

                <section id="services" className="scroll-mt-32">
                  <h2 className="text-2xl font-display font-bold text-white mb-6 pb-4 border-b border-white/10 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-primary" />
                    2. Description of Services
                  </h2>
                  <div className="prose prose-invert max-w-none text-muted-foreground">
                    <p>
                      Swiftscale provides technology consulting, software development, e-commerce solutions, and professional training programs. We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice.
                    </p>
                    <p className="mt-4">
                      We are not responsible for any modifications, price changes, suspension, or discontinuation of the Services.
                    </p>
                  </div>
                </section>

                <section id="accounts" className="scroll-mt-32">
                  <h2 className="text-2xl font-display font-bold text-white mb-6 pb-4 border-b border-white/10 flex items-center gap-3">
                    <UserCheck className="w-6 h-6 text-primary" />
                    3. User Accounts
                  </h2>
                  <div className="prose prose-invert max-w-none text-muted-foreground">
                    <p>When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.</p>
                    <p className="mt-4">You are responsible for:</p>
                    <ul className="space-y-2 mt-4 marker:text-primary">
                      <li>Safeguarding the password and credentials that you use to access the Service</li>
                      <li>Any activities or actions under your password</li>
                      <li>Notifying us immediately upon becoming aware of any breach of security</li>
                    </ul>
                  </div>
                </section>

                <section id="intellectual" className="scroll-mt-32">
                  <h2 className="text-2xl font-display font-bold text-white mb-6 pb-4 border-b border-white/10 flex items-center gap-3">
                    <Key className="w-6 h-6 text-primary" />
                    4. Intellectual Property
                  </h2>
                  <div className="prose prose-invert max-w-none text-muted-foreground">
                    <p>
                      The Services and their original content, features, and functionality are and will remain the exclusive property of Swiftscale and its licensors. The Services are protected by copyright, trademark, and other laws of both the United States and foreign countries.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                        <h4 className="text-white font-semibold mb-2">Software Code</h4>
                        <p className="text-sm">Custom developed code rights are outlined in specific Statement of Work (SOW) documents.</p>
                      </div>
                      <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                        <h4 className="text-white font-semibold mb-2">Training Materials</h4>
                        <p className="text-sm">Course materials provided during training are for personal use only and cannot be redistributed.</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="billing" className="scroll-mt-32">
                  <h2 className="text-2xl font-display font-bold text-white mb-6 pb-4 border-b border-white/10 flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-primary" />
                    5. Payments and Billing
                  </h2>
                  <div className="prose prose-invert max-w-none text-muted-foreground">
                    <p>
                      For paid services or training programs, you agree to provide current, complete, and accurate purchase and account information. We reserve the right to refuse or cancel any order for any reason.
                    </p>
                    <p className="mt-4">
                      Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current billing period. Refunds are handled on a case-by-case basis as detailed in our separate Refund Policy.
                    </p>
                  </div>
                </section>

                <section id="liability" className="scroll-mt-32">
                  <h2 className="text-2xl font-display font-bold text-white mb-6 pb-4 border-b border-white/10 flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-primary" />
                    6. Limitation of Liability
                  </h2>
                  <div className="prose prose-invert max-w-none text-muted-foreground">
                    <p>
                      In no event shall Swiftscale, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                    </p>
                    <p className="mt-4 uppercase text-xs tracking-wider font-bold">
                      Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE" basis.
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
