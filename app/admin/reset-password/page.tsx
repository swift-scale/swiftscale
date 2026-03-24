"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, ShieldAlert, CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Suspense } from "react";

function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Validation Error", {
        description: "Security keys do not match.",
      });
      return;
    }

    const token = searchParams.get("token");

    if (!token) {
      toast.error("Invalid Request", {
        description: "No security token found in URL. Please use the original link from your email.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (data.success) {
        setIsSuccess(true);
        toast.success("Key Updated", {
          description: "Your security credentials have been successfully reset.",
        });
      } else {
        toast.error("Protocol Error", {
          description: data.message || "Unable to update credentials.",
        });
      }
    } catch (err) {
      console.error("Reset failed:", err);
      toast.error("System Error", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="admin-theme min-h-screen flex items-center justify-center bg-background text-foreground p-6">
        <div className="w-full max-w-lg glass-panel p-12 rounded-[2rem] border-emerald-500/20 text-center space-y-8">
          <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-display font-black text-foreground tracking-tight">Access Restored</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Your security key has been upgraded successfully. You can now access the admin terminal with your new credentials.
            </p>
          </div>
          <Button asChild className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-foreground font-black text-lg rounded-2xl shadow-[0_10px_20px_rgba(16,185,129,0.2)]">
            <Link href="/admin/login">Return to Terminal</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-theme min-h-screen flex bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-hidden">
      {/* Dynamic Left Panel */}
      <div className="hidden lg:flex w-[60%] relative bg-background items-center justify-center overflow-hidden">
        {/* Orbital Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-background to-transparent z-10" />
        <div className="absolute top-0 right-0 w-full h-full bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Cinematic Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-screen scale-110 animate-slow-zoom" />
        
        {/* Branding Overlay */}
        <div className="relative z-20 p-20 w-full max-w-2xl">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer mb-16 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-foreground shadow-[0_0_25px_rgba(36,27,235,0.5)] group-hover:scale-110 transition-transform">
                S
              </div>
              <span className="font-display font-black text-3xl tracking-tighter text-foreground">SWIFTSCALE</span>
            </div>
          </Link>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold uppercase tracking-widest">
              <ShieldAlert className="w-4 h-4" /> High-Security Zone
            </div>
            <h1 className="text-4xl font-display font-black text-foreground leading-tight">
              Security Key <br/>
              <span className="text-amber-500">Regeneration</span>.
            </h1>
            <p className="text-foreground/60 leading-relaxed max-w-sm mb-12">
              You are performing a sensitive operation. Ensure your new credentials follow the enterprise-grade complexity protocols.
            </p>

            <div className="space-y-4 pt-12 border-t border-border">
              <p className="text-[10px] text-foreground/40 uppercase font-black tracking-widest">Protocol Requirements</p>
              <ul className="space-y-3">
                {["12+ Characters", "Special Symbols", "Unique New Key", "No Re-use"].map((rule, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground/70 font-bold">
                    <div className="w-1 h-1 rounded-full bg-primary" /> {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-8 sm:p-20 relative bg-background">
        <div className="w-full max-w-sm space-y-10">
          <div className="space-y-2">
            <h2 className="text-4xl font-display font-black text-foreground tracking-tight">New Key</h2>
            <p className="text-muted-foreground font-medium text-lg">Define your new administrator session key</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-foreground/50">New Security Key</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pl-12 pr-12 h-14 bg-muted/30 border-border text-foreground focus:border-primary focus:ring-primary/10 rounded-2xl transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="confirm-password" className="text-xs font-bold uppercase tracking-widest text-foreground/50">Confirm Key</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="confirm-password" 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pl-12 pr-12 h-14 bg-muted/30 border-border text-foreground focus:border-primary focus:ring-primary/10 rounded-2xl transition-all"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg rounded-2xl transition-all shadow-[0_10px_30px_rgba(36,27,235,0.3)]"
              disabled={isLoading}
            >
              {isLoading ? "Regenerating Key..." : "Update Security Credentials"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminResetPassword() {
  return (
    <Suspense fallback={
      <div className="admin-theme min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Loading Security Protocol...</p>
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}

