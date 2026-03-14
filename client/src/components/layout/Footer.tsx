 "use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
} from "lucide-react";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Newsletter } from "@/components/sections/Newsletter";

export function Footer() {
  const pathname = usePathname();

  const serviceCatalog = useMemo(
    () => ({
      ecommerce: [
        { label: "Registration", href: "/services/ecommerce/registration" },
        { label: "Sponsored Ads", href: "/services/ecommerce/ads" },
        { label: "Logistics", href: "/services/ecommerce/logistics" },
        { label: "Warehousing", href: "/services/ecommerce/warehousing" },
      ],
      it: [
        { label: "App/Web Dev", href: "/services/it/dev" },
        { label: "Digital Marketing", href: "/services/it/marketing" },
        { label: "Cybersecurity", href: "/services/consulting/cyber" },
        { label: "Cloud & DevOps", href: "/services/consulting/devops" },
      ],
      training: [
        { label: "BI Master Program", href: "/services/training/bi" },
        { label: "Full Stack Master", href: "/services/training/fullstack" },
        { label: "UI/UX Master", href: "/services/training/uiux" },
        { label: "Data Science", href: "/services/training/datascience" },
      ],
      consulting: [
        { label: "Payroll Management", href: "/services/consulting/payroll" },
        { label: "Growth Strategy", href: "/services/consulting/dev" },
        { label: "IT Infra Roles", href: "/services/consulting/infra" },
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
    if (!pathname) return { title: "E-Commerce", items: serviceCatalog.ecommerce };

    if (pathname === "/" || pathname === "/home") {
      return { title: "E-Commerce", items: serviceCatalog.ecommerce };
    }
    if (pathname.startsWith("/services/ecommerce")) {
      return { title: "E-Commerce", items: serviceCatalog.ecommerce };
    }
    if (pathname.startsWith("/services/it")) {
      return { title: "IT Services", items: serviceCatalog.it };
    }
    if (pathname.startsWith("/services/training")) {
      return { title: "Training", items: serviceCatalog.training };
    }
    if (pathname.startsWith("/services/consulting")) {
      return { title: "Consulting", items: serviceCatalog.consulting };
    }
    return { title: "E-Commerce", items: serviceCatalog.ecommerce };
  }, [pathname, serviceCatalog]);

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
