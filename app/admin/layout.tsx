"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  MessageSquare,
  BarChart,
  LogOut,
  Menu,
  LayoutList,
  Bell,
  Search,
  Plus,
  UserCircle,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sheet, 
  SheetContent, 
} from "@/components/ui/sheet";

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: LayoutList, label: "Services", href: "/admin/services" },
  { icon: MessageSquare, label: "Messages", href: "/admin/messages" },
  { icon: BarChart, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isAuthPage = pathname === "/admin/login" || 
                    pathname === "/admin/forgot-password" || 
                    pathname === "/admin/reset-password";

  if (isAuthPage) {
    return <>{children}</>;
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-sidebar border-r border-sidebar-border text-sidebar-foreground">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-sidebar-foreground shadow-[0_0_20px_rgba(36,27,235,0.4)]">
            S
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sidebar-foreground/50">Swiftscale</p>
            <h2 className="text-lg font-semibold tracking-tight">Admin Console</h2>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-4">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}>
                <span
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer ${
                    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[0_8px_20px_rgba(36,27,235,0.2)]" : "text-sidebar-foreground/70"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-4 pb-4">
        <div className="rounded-2xl border border-sidebar-border bg-sidebar/60 p-4">
          <div className="flex items-center gap-2 text-xs text-sidebar-foreground/60 uppercase tracking-[0.2em]">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Live Status
          </div>
          <p className="mt-3 text-sm text-sidebar-foreground/80">All systems operational.</p>
          <p className="text-xs text-sidebar-foreground/50">Last check: 2 minutes ago</p>
        </div>
      </div>
      
      <div className="p-4 mt-auto border-t border-sidebar-border">
        <Link href="/">
          <span className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer">
            <LogOut className="h-4 w-4" />
            Back to Site
          </span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="admin-theme flex min-h-screen w-full bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 md:block">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="sticky top-0 z-30 border-b border-border/60 bg-card/60 backdrop-blur-xl">
          <div className="flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileOpen(true)}
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-foreground/60">Swiftscale Admin</p>
                <h1 className="text-lg font-semibold tracking-tight">Command Center</h1>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-3 md:justify-end">
              <div className="relative hidden md:block w-full max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-foreground/40" />
                <Input
                  placeholder="Search anything..."
                  className="pl-10 bg-muted/60 border-border text-foreground focus:border-accent focus:ring-accent/20 h-10"
                />
              </div>
              <Button variant="outline" className="border-border/60 bg-transparent text-foreground hover:bg-foreground/10">
                <Plus className="mr-2 h-4 w-4" /> New Task
              </Button>
              <Button variant="ghost" size="icon" className="text-foreground/60 hover:text-foreground hover:bg-foreground/10">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1.5">
                <UserCircle className="h-5 w-5 text-foreground/70" />
                <div className="text-xs">
                  <p className="font-semibold text-foreground">Admin</p>
                  <p className="text-foreground/60">Root Access</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="relative flex-1 overflow-auto">
          <div className="absolute inset-0 bg-gradient-radial opacity-30" />
          <div className="relative p-4 md:p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
