import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
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
              Building the next generation of scalable SaaS solutions for
              forward-thinking technology companies worldwide.
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
              Platform
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-white transition-colors text-sm"
                >
                  Overview
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-white transition-colors text-sm"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-white transition-colors text-sm"
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-white transition-colors text-sm"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest"
                >
                  Admin Terminal
                </Link>
              </li>
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
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-white transition-colors text-sm"
                >
                  Blog
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
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to our newsletter for the latest tech insights.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your email"
                className="bg-muted/50 border-border text-white placeholder:text-white/40 focus-visible:ring-accent"
              />
              <Button
                size="icon"
                className="bg-accent hover:bg-accent/90 shrink-0"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
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
