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
  Settings2,
} from "lucide-react";
import { useState, useEffect } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: LayoutList, label: "Services", href: "/admin/services" },
  { icon: MessageSquare, label: "Email Management", href: "/admin/emails", badge: 32 },
  { icon: Mail, label: "Subscribers", href: "/admin/subscribers" },
  { icon: BarChart, label: "Analytics", href: "/admin/analytics" },
];

const SidebarContent = ({ 
  collapsed = false, 
  pathname,
  setIsMobileOpen,
  onLogout,
  badgeCount = 0
}: { 
  collapsed?: boolean; 
  pathname: string | null;
  setIsMobileOpen?: (open: boolean) => void;
  onLogout: () => void;
  badgeCount?: number;
}) => (
  <div className={`flex h-full flex-col relative transition-all duration-500 ease-in-out border-r border-blue-50/50 backdrop-blur-md overflow-hidden w-full ${
    collapsed ? "bg-[#F0F9FF]/40" : "bg-white/20"
  }`}>
    {/* Background Decor */}
    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blue-50/30 to-transparent pointer-events-none" />
    
    <div className="relative z-10 flex flex-col h-full py-8">
      {/* Brand Header */}
      <div className={`flex items-center mb-12 transition-all duration-500 px-6 ${collapsed ? "justify-center" : ""}`}>
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-primary w-11 h-11 flex items-center justify-center font-black text-white shadow-[0_10px_20px_rgba(36,27,235,0.25)] shrink-0">
            S
          </div>
          {!collapsed && (
            <div className="transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap">
              <h2 className="text-xl font-black tracking-tight text-slate-900">Swift Scale</h2>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center">
        <div className="w-full">
          {!collapsed && (
            <div className="px-8 mb-6 transition-all duration-500 overflow-hidden">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 whitespace-nowrap">Main Menu</p>
            </div>
          )}
          
          <nav className="flex flex-col items-center gap-3 w-full">
            {SIDEBAR_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
              const currentBadge = item.label === "Email Management" ? badgeCount : undefined;
              return (
                <Link key={item.href} href={item.href} className="w-full px-4 flex justify-center" onClick={() => setIsMobileOpen?.(false)}>
                  <span
                    title={collapsed ? item.label : ""}
                    className={`flex items-center transition-all duration-300 cursor-pointer group rounded-[1.25rem] ${
                      collapsed 
                        ? "h-14 w-14 justify-center" 
                        : "h-14 w-full px-5 gap-4"
                    } ${
                      isActive 
                        ? "bg-primary text-white shadow-[0_10px_25px_rgba(36,27,235,0.25)]" 
                        : "text-slate-400 hover:text-primary hover:bg-white hover:shadow-[0_8px_30px_rgba(186,230,253,0.15)]"
                    }`}
                  >
                    <item.icon className="h-5 w-5 shrink-0 transition-colors" />
                    
                    {!collapsed && (
                      <div className="flex items-center gap-3 flex-1 transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap">
                        <span className="flex-1 text-[11px] font-bold uppercase tracking-widest">{item.label}</span>
                        {currentBadge !== undefined && currentBadge > 0 && (
                          <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black ${isActive ? 'bg-white text-primary' : 'bg-rose-500 text-white shadow-[0_4px_12px_rgba(244,63,94,0.3)]'}`}>
                            {currentBadge}
                          </span>
                        )}
                        {isActive && !item.badge && <ChevronRight className="h-4 w-4 opacity-50" />}
                      </div>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Section: Company Settings & Logout */}
      <div className={`mt-auto w-full py-8 flex flex-col border-t border-blue-50/30 px-4 ${collapsed ? "items-center" : ""}`}>
        <Link href="/admin/settings" className="w-full" onClick={() => setIsMobileOpen?.(false)}>
          <span
            title={collapsed ? "Company Details" : ""}
            className={`flex items-center transition-all duration-300 cursor-pointer group rounded-2xl ${
              collapsed 
                ? "h-14 w-14 justify-center" 
                : "h-14 w-full px-5 gap-4"
            } ${
              pathname === "/admin/settings"
                ? "bg-primary text-white shadow-[0_10px_25px_rgba(36,27,235,0.25)]" 
                : "text-slate-400 hover:text-primary hover:bg-white hover:shadow-[0_8px_30px_rgba(186,230,253,0.15)] border border-transparent hover:border-blue-50"
            }`}
          >
            <Settings className="h-5 w-5 shrink-0 transition-all group-hover:rotate-45" />
            {!collapsed && (
              <span className="text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">Company Details</span>
            )}
          </span>
        </Link>
        <button
          onClick={onLogout}
          className={`flex items-center mt-3 transition-all duration-300 cursor-pointer group rounded-2xl ${
            collapsed 
              ? "h-14 w-14 justify-center" 
              : "h-14 w-full px-5 gap-4"
          } text-slate-400 hover:text-rose-500 hover:bg-rose-50/50 border border-transparent hover:border-rose-100`}
        >
          <LogOut className="h-5 w-5 shrink-0 transition-all group-hover:-translate-x-1" />
          {!collapsed && (
            <span className="text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">Logout</span>
          )}
        </button>
      </div>
    </div>
  </div>
);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [stats, setStats] = useState({ newMessages: 0 });

  useEffect(() => {
    setMounted(true);
    fetchProfile();
    fetchStats();

    window.addEventListener('profileUpdate', fetchProfile);
    window.addEventListener('messagesUpdate', fetchStats);
    
    // Also fetch stats periodically (every 2 minutes)
    const interval = setInterval(fetchStats, 120000);

    return () => {
      window.removeEventListener('profileUpdate', fetchProfile);
      window.removeEventListener('messagesUpdate', fetchStats);
      clearInterval(interval);
    };
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/admin/profile");
      const data = await res.json();
      if (data.success) {
        setUser(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };

  const isAuthPage = pathname === "/admin/login" || 
                    pathname === "/admin/forgot-password" || 
                    pathname === "/admin/reset-password";

  if (isAuthPage) {
    return <>{children}</>;
  }

  const handleLogout = () => {
    setIsLogoutDialogOpen(true);
  };

  const onConfirmLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (response.ok) {
        setIsLogoutDialogOpen(false);
        toast.success("Session Terminated", {
          description: "Terminal disconnected. Your session has been securely closed."
        });
        router.push("/admin/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="admin-theme flex h-screen w-full bg-[#eef6ff] text-foreground overflow-hidden">
      {/* Desktop Sidebar with Hover Interaction */}
      <aside 
         onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}
        className={`hidden md:block transition-all duration-500 ease-in-out h-screen sticky top-0 z-40 ${isCollapsed ? "w-24" : "w-72"}`}
      >
        <SidebarContent 
          collapsed={isCollapsed} 
          pathname={pathname} 
          onLogout={handleLogout} 
          badgeCount={stats.newMessages}
        />
      </aside>

      {/* Mobile Sidebar */}
       <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="p-0 w-72">
          <SidebarContent 
            pathname={pathname} 
            setIsMobileOpen={setIsMobileOpen} 
            onLogout={handleLogout} 
            badgeCount={stats.newMessages}
          />
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
                <h1 className="text-3xl font-black tracking-tight text-slate-900">Swift Scale Admin</h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Start Smart, Scale Swift.</p>
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

              {/* Navbar Profile Dropdown - Wrapped in mounted check to prevent hydration mismatch */}
              {mounted && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button 
                      id="admin-profile-menu-trigger"
                      className="flex items-center p-1 bg-white rounded-2xl border border-blue-50 shadow-[0_10px_30px_rgba(186,230,253,0.15)] transition-all hover:shadow-[0_10px_40px_rgba(186,230,253,0.25)] cursor-pointer hover:scale-[1.05] active:scale-95 group outline-none"
                    >
                      <Avatar className="h-11 w-11 border-2 border-blue-50 ring-2 ring-primary/5 transition-all group-hover:ring-primary/10">
                        <AvatarImage src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + (user?.name || "AD")} />
                        <AvatarFallback className="bg-primary/10 text-primary font-black text-xs uppercase">
                          {user?.firstName?.[0] || 'A'}{user?.lastName?.[0] || 'D'}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 p-3 bg-white/80 backdrop-blur-xl border border-blue-50 shadow-[0_20px_50px_rgba(186,230,253,0.3)] rounded-[2rem] mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <DropdownMenuLabel className="p-4">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-black text-slate-900 leading-none">{user?.name || "Administrator"}</p>
                        <p className="text-[10px] font-black text-blue-400 mt-1 uppercase tracking-widest leading-none">{user?.title || "Administrator"}</p>
                        <p className="text-[10px] font-medium text-slate-400 mt-1">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-blue-50/50 mx-2" />
                    <div className="p-2 space-y-1">
                      <Link href="/admin/profile" className="block w-full cursor-pointer">
                        <DropdownMenuItem className="flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-600 hover:text-primary hover:bg-blue-50 cursor-pointer transition-all outline-none">
                          <UserCircle className="h-4 w-4" />
                          Profile Settings
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/admin/settings" className="block w-full cursor-pointer">
                        <DropdownMenuItem className="flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-600 hover:text-primary hover:bg-blue-50 cursor-pointer transition-all outline-none">
                          <Settings2 className="h-4 w-4" />
                          Company Settings
                        </DropdownMenuItem>
                      </Link>
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
              )}
            </div>
          </div>
        </header>

        <div className="relative flex-1 overflow-auto">

          <div className="relative p-4 md:p-8">
            {children}
          </div>
        </div>

        {/* Premium Logout Confirmation Dialog */}
        <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
          <AlertDialogContent className="bg-white/90 backdrop-blur-2xl border border-blue-50/50 shadow-[0_40px_80px_-15px_rgba(36,27,235,0.12)] rounded-[3rem] p-0 overflow-hidden max-w-[480px]">
            <div className="bg-gradient-to-br from-slate-50 to-white p-10">
              <AlertDialogHeader className="space-y-6 flex flex-col items-center">
                {/* Icon Reservoir */}
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                  <div className="relative w-20 h-20 rounded-[2rem] bg-primary flex items-center justify-center text-white shadow-[0_15px_35px_rgba(36,27,235,0.3)]">
                    <LogOut className="h-8 w-8 ml-1" />
                  </div>
                </div>

                <div className="space-y-2 text-center">
                  <AlertDialogTitle className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                    End Session?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] leading-relaxed max-w-[240px] mx-auto">
                    Securely disconnect from the administrative gateway
                  </AlertDialogDescription>
                </div>
              </AlertDialogHeader>

              <AlertDialogFooter className="flex flex-col gap-3 pt-10">
                <AlertDialogAction 
                  onClick={onConfirmLogout}
                  className="w-full h-16 rounded-[1.5rem] bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all hover:scale-[1.02] active:scale-95"
                >
                  Confirm Sign Out
                </AlertDialogAction>
                <AlertDialogCancel className="w-full h-16 rounded-[1.5rem] bg-white border-2 border-slate-50 hover:border-slate-100 font-black text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-slate-600 transition-all shadow-sm">
                  Stay Signed In
                </AlertDialogCancel>
              </AlertDialogFooter>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}
