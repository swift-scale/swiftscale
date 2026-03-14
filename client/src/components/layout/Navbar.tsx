"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Menu,
  ChevronDown,
  GraduationCap,
  ShoppingCart,
  Monitor,
  Briefcase,
  X,
  Sparkles,
  ArrowRight,
  Code,
  ShieldCheck,
  Globe,
  Zap,
  BookOpen,
  TrendingUp,
  BarChart,
  Activity,
} from "lucide-react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const serviceCategories = [
    {
      title: "E-Commerce",
      icon: <ShoppingCart className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
      services: [
        {
          name: "Marketplace Setup",
          href: "/services/ecommerce/registration",
          desc: "Expert seller onboarding.",
        },
        {
          name: "Account Management",
          href: "/services/ecommerce/ads",
          desc: "Daily performance ops.",
        },
        {
          name: "Inventory & Returns",
          href: "/services/ecommerce/logistics",
          desc: "Smart fulfillment systems.",
        },
        {
          name: "Sales Acceleration",
          href: "/services/ecommerce/warehousing",
          desc: "Ads & conversion focus.",
        },
      ],
    },
    {
      title: "IT Services",
      icon: <Monitor className="w-5 h-5" />,
      color: "from-emerald-500 to-teal-400",
      services: [
        {
          name: "App & Web Dev",
          href: "/services/it/dev",
          desc: "Scalable product engineering.",
        },
        {
          name: "UI/UX Design",
          href: "/services/it/marketing",
          desc: "Engaging digital experiences.",
        },
        {
          name: "Performance Mktg",
          href: "/services/it/cyber",
          desc: "Data-driven brand growth.",
        },
        {
          name: "AI & Business Intel",
          href: "/services/it/cloud",
          desc: "Automated insight engines.",
        },
      ],
    },
    {
      title: "Training",
      icon: <GraduationCap className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-400",
      services: [
        {
          name: "BI Master Program",
          href: "/services/training/bi",
          desc: "Data & visualization mastery.",
        },
        {
          name: "Full Stack Master",
          href: "/services/training/fullstack",
          desc: "End-to-end dev training.",
        },
        {
          name: "UI/UX Master",
          href: "/services/training/uiux",
          desc: "Modern design excellence.",
        },
        {
          name: "Data Science Master",
          href: "/services/training/datascience",
          desc: "Advanced predictive analytics.",
        },
      ],
    },
    {
      title: "Consulting",
      icon: <Briefcase className="w-5 h-5" />,
      color: "from-orange-500 to-yellow-500",
      services: [
        {
          name: "Payroll Management",
          href: "/services/consulting/payroll",
          desc: "Seamless workforce ops.",
        },
        {
          name: "Cloud & DevOps",
          href: "/services/consulting/strategy",
          desc: "Secure infra scaling.",
        },
        {
          name: "Cybersecurity",
          href: "/services/consulting/infra",
          desc: "Military-grade protection.",
        },
      ],
    },
  ];

  return (
    <header
      className={cn(
        "fixed left-0 right-0 z-50 flex justify-center px-4 md:px-6 pointer-events-none transition-all duration-500",
        isScrolled ? "top-2 md:top-6" : "top-4 md:top-8",
      )}
    >
      <div
        className={cn(
          "w-full max-w-7xl glass-panel rounded-full border border-white/10 shadow-2xl pointer-events-auto flex items-center justify-between px-4 md:px-8 bg-[#020205]/40 backdrop-blur-2xl transition-all duration-500 relative",
          isScrolled ? "h-14 md:h-18" : "h-16 md:h-20",
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group pointer-events-auto">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center font-black text-white shadow-lg transition-transform group-hover:scale-110">
                S
              </div>
              <span className="font-display font-black text-xl tracking-tighter text-white">
                Swiftscale
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 pointer-events-auto">
          <Link
            href="/"
            className="px-4 py-2 hover:text-white text-white/50 transition-colors text-[11px] font-black uppercase tracking-[0.2em]"
          >
            Home
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuPrimitive.Trigger className="px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors outline-none cursor-pointer">
                  Services
                </NavigationMenuPrimitive.Trigger>
                <NavigationMenuContent className="!bg-transparent">
                  <div className="w-[calc(100vw-2rem)] max-w-3xl p-6 grid grid-cols-4 gap-6 bg-[#020205]/95 backdrop-blur-[40px] rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-top-4 duration-500 !border-none">
                    {serviceCategories.map((cat, i) => (
                      <div key={i} className="space-y-5">
                        <div className="flex items-center gap-3 pb-4 border-b border-white/5 relative">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-[10px] bg-gradient-to-br flex items-center justify-center text-white shadow-xl transition-transform hover:scale-110",
                              cat.color,
                            )}
                          >
                            {React.cloneElement(
                              cat.icon as React.ReactElement<{
                                className?: string;
                              }>,
                              { className: "w-4 h-4" },
                            )}
                          </div>
                          <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">
                            {cat.title}
                          </span>
                          <div
                            className={cn(
                              "absolute bottom-0 left-0 h-[1.5px] w-8 bg-gradient-to-r",
                              cat.color,
                            )}
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          {cat.services.map((service, j) => (
                            <NavigationMenuLink asChild key={j}>
                              <Link
                                href={service.href}
                                className="group/item flex flex-col gap-1 hover:translate-x-1.5 transition-all duration-300"
                              >
                                <span className="text-xs font-bold text-white/70 group-hover/item:text-blue-400 transition-colors flex items-center gap-1.5">
                                  {service.name}
                                  <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all duration-300" />
                                </span>
                                <span className="text-[9px] text-white/30 font-medium leading-relaxed group-hover/item:text-white/50">
                                  {service.desc}
                                </span>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link
            href="/about"
            className="px-4 py-2 hover:text-white text-white/50 transition-colors text-[11px] font-black uppercase tracking-[0.2em]"
          >
            About
          </Link>
          <Link
            href="/partners"
            className="px-4 py-2 hover:text-white text-white/50 transition-colors text-[11px] font-black uppercase tracking-[0.2em]"
          >
            Clients
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 hover:text-white text-white/50 transition-colors text-[11px] font-black uppercase tracking-[0.2em]"
          >
            Contact
          </Link>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-2 md:gap-4 pointer-events-auto">
          <div className="hidden md:flex items-center gap-6">
            <Link href="/contact">
              <Button className="bg-white text-primary hover:bg-primary hover:text-white rounded-full px-6 font-black text-[9px] uppercase tracking-widest shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 h-10">
                Book Strategy Call
              </Button>
            </Link>
          </div>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="lg:hidden p-3 rounded-xl bg-white/5 text-white/80 hover:text-white transition-colors cursor-pointer group">
                <Menu className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#020205]/95 backdrop-blur-2xl border-white/10 text-white p-0 overflow-hidden w-full sm:max-w-md"
            >
              <div className="flex flex-col h-full bg-[radial-gradient(circle_at_top_right,_rgba(36,27,235,0.1)_0%,_transparent_50%)]">
                <div className="p-8 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-black text-white shadow-lg">
                      S
                    </div>
                    <span className="font-display font-black text-xl tracking-tighter text-white">
                      Swiftscale
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-3 rounded-xl bg-white/5 text-white/60 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-8 space-y-10">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-4xl font-black tracking-tighter hover:text-primary transition-colors"
                  >
                    Home
                  </Link>

                  <div className="space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                      Strategic Divisions
                    </p>
                    <div className="grid grid-cols-1 gap-8">
                      {serviceCategories.map((cat, i) => (
                        <div key={i} className="space-y-4">
                          <div className="flex items-center gap-3 italic">
                            <div
                              className={cn(
                                "w-1 h-1 rounded-full",
                                cat.color.replace("from-", "bg-").split(" ")[0],
                              )}
                            />
                            <p className="font-black text-lg text-white/60 uppercase tracking-widest">
                              {cat.title}
                            </p>
                          </div>
                          <div className="grid grid-cols-1 gap-3 pl-4 border-l border-white/10">
                            {cat.services.slice(0, 3).map((s, j) => (
                              <Link
                                key={j}
                                href={s.href}
                                className="text-sm font-bold text-white/40 hover:text-white transition-colors"
                              >
                                {s.name}
                              </Link>
                            ))}
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest pt-2">
                              View Division Blueprint →
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-4xl font-black tracking-tighter hover:text-primary transition-colors"
                  >
                    About
                  </Link>
                  <Link
                    href="/partners"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-4xl font-black tracking-tighter hover:text-primary transition-colors text-accent"
                  >
                    Partners
                  </Link>
                </nav>

                <div className="p-8 border-t border-white/10 bg-white/5 backdrop-blur-xl">
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-white text-primary py-8 rounded-2xl font-black text-xl shadow-2xl transition-all active:scale-95">
                      START EXPANSION
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
