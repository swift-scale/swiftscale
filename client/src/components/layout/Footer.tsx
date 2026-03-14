 "use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Newsletter } from "@/client/src/components/sections/Newsletter";

export function Footer() {
  const [pathname, setPathname] = useState("/");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname || "/");
    }
  }, []);

  const serviceCatalog = useMemo(
    () => ({
      ecommerce: [
        { label: "Marketplace Setup", href: "/services/ecommerce/registration" },
        { label: "Account Management", href: "/services/ecommerce/management" },
        { label: "Inventory & Returns", href: "/services/ecommerce/logistics" },
        { label: "Ads & Sales Boosting", href: "/services/ecommerce/ads" },
      ],
      it: [
        { label: "App & Web Dev", href: "/services/it/dev" },
        { label: "UI/UX Design", href: "/services/it/design" },
        { label: "AI & BI Systems", href: "/services/it/ai" },
        { label: "Data Analytics", href: "/services/it/analytics" },
      ],
      training: [
        { label: "BI Master Program", href: "/services/training/bi" },
        { label: "Full Stack Master", href: "/services/training/fullstack" },
        { label: "UI/UX Master Program", href: "/services/training/uiux" },
        { label: "Data Science Master", href: "/services/training/datascience" },
      ],
      consulting: [
        { label: "Software Development", href: "/services/consulting/dev" },
        { label: "Cloud & DevOps", href: "/services/consulting/cloud" },
        { label: "Cybersecurity", href: "/services/consulting/cyber" },
        { label: "IT Support & Infra", href: "/services/consulting/infra" },
      ],
    }),
    [],
  );

  const allServices = useMemo(
    () => [
      ...serviceCatalog.ecommerce,
      ...serviceCatalog.it,
      ...serviceCatalog.training,
      ...serviceCatalog.consulting,
    ],
    [serviceCatalog],
  );

  const servicesSection = useMemo(() => {
    if (pathname === "/" || pathname === "/home") {
      return { title: "E-Commerce", items: serviceCatalog.ecommerce };
    }
    if (pathname.startsWith("/services/ecommerce")) {
      return { title: "Services", items: allServices };
    }
    if (pathname.startsWith("/services/it")) {
      return { title: "Training", items: serviceCatalog.training };
    }
    if (pathname.startsWith("/services/training")) {
      return { title: "Consulting", items: serviceCatalog.consulting };
    }
    if (pathname.startsWith("/services/consulting")) {
      return { title: "E-Commerce", items: serviceCatalog.ecommerce };
    }
    return { title: "E-Commerce", items: serviceCatalog.ecommerce };
  }, [allServices, pathname, serviceCatalog]);

  return (
    <footer className="bg-background border-t border-white/10 border-border pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white shadow-lg">
                S
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                Swiftscale
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Start Smart, Scale Swift. Empowering businesses to build, launch,
              and scale in the digital economy through technology and commerce solutions.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white/70 hover:text-white hover:bg-muted/30 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white/70 hover:text-white hover:bg-muted/30 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white/70 hover:text-white hover:bg-muted/30 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6">
              {servicesSection.title}
            </h4>
            <ul className="space-y-4">
              {servicesSection.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-white transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Company</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-white transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-white transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-white transition-colors text-sm"
                >
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6">
              Stay Updated
            </h4>
            <p className="text-muted-foreground text-sm mb-6">
              Subscribe to our newsletter for the latest tech insights.
            </p>
            <Newsletter variant="footer" source="footer" />
          </div>
        </div>

        <div className="pt-8 border-t border-white/50 border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Swiftscale Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
