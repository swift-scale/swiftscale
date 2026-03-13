import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, GraduationCap, ShoppingCart, Monitor, Briefcase } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 border-white/5 transition-all duration-300">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white shadow-lg">
                S
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">Swiftscale</span>
            </div>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/80">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:text-white transition-colors outline-none cursor-pointer">
              Services <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[800px] p-6 grid grid-cols-4 gap-6 bg-background/95 backdrop-blur-xl border-white/10 animate-in slide-in-from-top-2 duration-200">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-accent font-semibold mb-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Training</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Link href="/services/training/bi" className="text-white/60 hover:text-white text-xs">BI Master Program</Link>
                  <Link href="/services/training/fullstack" className="text-white/60 hover:text-white text-xs">Full Stack Master</Link>
                  <Link href="/services/training/uiux" className="text-white/60 hover:text-white text-xs">UI/UX Master</Link>
                  <Link href="/services/training/datascience" className="text-white/60 hover:text-white text-xs">Data Science</Link>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-accent font-semibold mb-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>E-Commerce</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Link href="/services/ecommerce/registration" className="text-white/60 hover:text-white text-xs">Registration</Link>
                  <Link href="/services/ecommerce/ads" className="text-white/60 hover:text-white text-xs">Sponsored Ads</Link>
                  <Link href="/services/ecommerce/logistics" className="text-white/60 hover:text-white text-xs">Logistics</Link>
                  <Link href="/services/ecommerce/warehousing" className="text-white/60 hover:text-white text-xs">Warehousing</Link>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-accent font-semibold mb-2">
                  <Monitor className="w-4 h-4" />
                  <span>IT Services</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Link href="/services/it/dev" className="text-white/60 hover:text-white text-xs">App/Web Dev</Link>
                  <Link href="/services/it/marketing" className="text-white/60 hover:text-white text-xs">Digital Marketing</Link>
                  <Link href="/services/it/cyber" className="text-white/60 hover:text-white text-xs">Cybersecurity</Link>
                  <Link href="/services/it/cloud" className="text-white/60 hover:text-white text-xs">Cloud & DevOps</Link>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-accent font-semibold mb-2">
                  <Briefcase className="w-4 h-4" />
                  <span>Consulting</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Link href="/services/consulting/payroll" className="text-white/60 hover:text-white text-xs">Payroll Management</Link>
                  <Link href="/services/consulting/strategy" className="text-white/60 hover:text-white text-xs">Growth Strategy</Link>
                  <Link href="/services/consulting/infra" className="text-white/60 hover:text-white text-xs">IT Infra Roles</Link>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/partners" className="hover:text-white transition-colors">Clients & Partners</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button className="bg-white text-primary hover:bg-white/90 rounded-full px-6 font-semibold shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-105">
            Book Strategy Call
          </Button>
        </div>

        <button className="lg:hidden text-white/80 hover:text-white">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
