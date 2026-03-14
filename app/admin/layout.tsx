"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  UserCircle,
  ChevronRight,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sheet, 
  SheetContent, 
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: LayoutList, label: "Services", href: "/admin/services" },
  { icon: MessageSquare, label: "Messages", href: "/admin/messages", badge: 32 },
  { icon: Mail, label: "Subscribers", href: "/admin/subscribers" },
  { icon: BarChart, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const isAuthPage = pathname === "/admin/login" || 
                    pathname === "/admin/forgot-password" || 
                    pathname === "/admin/reset-password";

  if (isAuthPage) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (response.ok) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const SidebarContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <div className={`flex h-full flex-col relative transition-all duration-500 overflow-hidden ${
      collapsed 
        ? "w-24 bg-[#F0F9FF]/40 p-4 border-r border-blue-50/50 backdrop-blur-md" 
        : "w-72 bg-white/20 border-r border-blue-50/50 backdrop-blur-md"
    }`}>
      {/* Background Decor */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blue-50/30 to-transparent pointer-events-none" />
      
      <div className={`relative z-10 ${collapsed ? "space-y-4" : "p-6"}`}>
        <div className={`flex items-center justify-between ${collapsed ? "flex-col gap-4" : "mb-8"}`}>
          <div className={`flex items-center gap-3 group/logo transition-all ${collapsed ? "w-12 h-12 bg-white rounded-2xl shadow-[0_8px_30px_rgba(186,230,253,0.15)] border border-blue-50 justify-center p-2" : ""}`}>
            <div className={`rounded-xl bg-primary flex items-center justify-center font-black text-white shadow-[0_10px_20px_rgba(36,27,235,0.2)] transition-all ${collapsed ? "w-8 h-8" : "w-10 h-10"}`}>
              S
            </div>
            {!collapsed && <h2 className="text-lg font-black tracking-tight text-slate-900 animate-in fade-in duration-500">Swiftscale</h2>}
          </div>
        </div>

        <div className={collapsed ? "space-y-3" : "space-y-6"}>
          <div>
            {!collapsed && <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 px-4 animate-in fade-in duration-500">Main Menu</p>}
            <nav className={`grid ${collapsed ? "gap-3 justify-center" : "gap-1"}`}>
              {SIDEBAR_ITEMS.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
                return (
                  <Link key={item.href} href={item.href}>
                    <span
                      title={collapsed ? item.label : ""}
                      className={`flex items-center transition-all duration-300 cursor-pointer group ${
                        collapsed 
                          ? `w-12 h-12 rounded-2xl justify-center shadow-[0_8px_30px_rgba(186,230,253,0.15)] border border-blue-50 ${isActive ? "bg-slate-900 text-white shadow-lg border-slate-900" : "bg-white text-slate-400 hover:bg-blue-50 hover:text-primary"}` 
                          : `gap-3 rounded-2xl px-4 py-3.5 ${isActive ? "bg-primary text-white shadow-[0_10px_25px_rgba(36,27,235,0.25)] scale-[1.02]" : "text-slate-400 hover:text-primary hover:bg-blue-50"}`
                      }`}
                    >
                      <item.icon className={`h-4 w-4 transition-colors ${isActive ? "text-white" : "group-hover:text-slate-900"}`} />
                      {!collapsed && <span className="flex-1 text-xs font-black uppercase tracking-widest animate-in fade-in duration-500">{item.label}</span>}
                      {!collapsed && item.badge && (
                        <span className={`px-1.5 py-0.5 rounded-lg text-[8px] font-black ${isActive ? 'bg-white text-primary' : 'bg-rose-500 text-white shadow-[0_2px_10px_rgba(244,63,94,0.3)]'}`}>
                          {item.badge}
                        </span>
                      )}
                      {!collapsed && isActive && !item.badge && <ChevronRight className="h-3 w-3 opacity-50" />}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
      
      <div className={`mt-auto ${collapsed ? "p-0" : "p-6"}`}>
        {/* Settings and Sign out moved to Navbar Profile */}
      </div>
    </div>
  );

  return (
    <div className="admin-theme flex h-screen w-full bg-gradient-to-br from-[#F0F9FF] via-white to-[#E0F2FE] text-foreground overflow-hidden">
      {/* Desktop Sidebar with Hover Interaction */}
      <aside 
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}
        className={`hidden md:block transition-all duration-500 ease-in-out h-screen sticky top-0 z-40 ${isCollapsed ? "w-24" : "w-72"}`}
      >
        <SidebarContent collapsed={isCollapsed} />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="p-0 w-72">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-transparent">
        <header className="sticky top-0 z-30 bg-white/40 backdrop-blur-xl border-b border-blue-50/20">
          <div className="flex flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-10">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileOpen(true)}
                className="md:hidden text-slate-400"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
              <div className="space-y-1">
                <h1 className="text-3xl font-black tracking-tight text-slate-900">Swiftscale Admin</h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Administrative Gateway</p>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-4 md:justify-end">
              <div className="relative hidden md:block w-full max-w-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search anything..."
                  className="pl-12 bg-slate-50 border-transparent text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-primary/20 h-14 rounded-2xl transition-all font-bold"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary hover:bg-slate-50 rounded-2xl h-14 w-14 border border-slate-100">
                  <Bell className="h-5 w-5" />
                </Button>
              </div>

              {/* Navbar Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center p-1 bg-white rounded-2xl border border-blue-50 shadow-[0_10px_30px_rgba(186,230,253,0.15)] transition-all hover:shadow-[0_10px_40px_rgba(186,230,253,0.25)] cursor-pointer hover:scale-[1.05] active:scale-95 group">
                    <Avatar className="h-11 w-11 border-2 border-blue-50 ring-2 ring-primary/5 transition-all group-hover:ring-primary/10">
                      <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256" />
                      <AvatarFallback className="bg-primary/10 text-primary font-black text-xs">AD</AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-3 bg-white/80 backdrop-blur-xl border border-blue-50 shadow-[0_20px_50px_rgba(186,230,253,0.3)] rounded-[2rem] mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <DropdownMenuLabel className="p-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-black text-slate-900 leading-none">Sista Silala</p>
                      <p className="text-[10px] font-black text-blue-400 mt-1 uppercase tracking-widest leading-none">Administrator</p>
                      <p className="text-[10px] font-medium text-slate-400 mt-1">sistasilala@gmail.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-blue-50/50 mx-2" />
                  <div className="p-2 space-y-1">
                    <DropdownMenuItem className="flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-600 hover:text-primary hover:bg-blue-50 cursor-pointer transition-all outline-none">
                      <UserCircle className="h-4 w-4" />
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 cursor-pointer transition-all outline-none"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
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
