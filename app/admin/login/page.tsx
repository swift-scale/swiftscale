"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, Cpu, Globe, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Access Granted",
        description: "Welcome back, Administrator.",
      });
      router.push("/admin");
    }, 1500);
  };

  return (
    <div className="admin-theme min-h-screen relative flex items-center justify-center bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-hidden font-sans">
      {/* Cinematic Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen pointer-events-none"
      >
        <source src="/videos/login_bg_vd.mp4" type="video/mp4" />
      </video>
      
      {/* Dynamic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-transparent to-background/80" />
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full animate-pulse delay-1000" />

      <div className="relative z-20 w-full max-w-5xl px-6 animate-in fade-in zoom-in-95 duration-1000">
        {/* The "Bridge" Glass Console */}
        <div className="glass-panel overflow-hidden rounded-[3rem] border border-border/60 shadow-[0_40px_120px_rgba(0,0,0,0.7)] backdrop-blur-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left Column: Branding & Value prop */}
            <div className="hidden lg:flex flex-col justify-between p-16 bg-card/40 border-r border-border/60 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <Link href="/">
                  <div className="flex items-center gap-3 mb-16 cursor-pointer group/logo">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-foreground shadow-[0_0_20px_rgba(36,27,235,0.4)] group-hover/logo:scale-110 transition-all duration-500 text-lg">
                      S
                    </div>
                    <span className="font-display font-black text-2xl tracking-tighter text-foreground">SWIFTSCALE</span>
                  </div>
                </Link>

                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-[10px] font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-3.5 h-3.5" /> Enterprise Core
                  </div>
                  <h1 className="text-5xl font-display font-black text-foreground leading-tight tracking-tight">
                    Professional <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">Operations</span>.
                  </h1>
                  <p className="text-foreground/50 text-lg leading-relaxed max-w-xs font-medium">
                    Experience the next generation of infrastructure management. Secure, scalable, and surgical.
                  </p>
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-3 gap-4 pt-10 border-t border-border/60">
                <div className="space-y-1">
                  <div className="text-primary"><Globe className="w-4 h-4" /></div>
                  <p className="text-[10px] font-black text-foreground/40 uppercase tracking-widest">Global</p>
                </div>
                <div className="space-y-1">
                  <div className="text-accent"><Cpu className="w-4 h-4" /></div>
                  <p className="text-[10px] font-black text-foreground/40 uppercase tracking-widest">Compute</p>
                </div>
                <div className="space-y-1">
                  <div className="text-emerald-500"><Zap className="w-4 h-4" /></div>
                  <p className="text-[10px] font-black text-foreground/40 uppercase tracking-widest">Edge</p>
                </div>
              </div>
            </div>

            {/* Right Column: The Login Form */}
            <div className="p-12 lg:p-16 relative bg-card/60">
              <div className="max-w-sm mx-auto space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-display font-black text-foreground tracking-tight">Sign In</h2>
                  <p className="text-foreground/50 font-medium">Access your administrative board</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 ml-1">Admin Identity</Label>
                      <div className="relative group/input">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/30 group-focus-within/input:text-primary transition-colors" />
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="admin@swiftscale.com" 
                          className="pl-12 h-14 bg-card/40 border-border/60 text-foreground placeholder:text-foreground/20 focus:border-primary/50 focus:ring-primary/10 rounded-2xl transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between ml-1">
                        <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">Security Key</Label>
                        <Link href="/admin/forgot-password">
                          <span className="text-[10px] text-primary hover:text-foreground font-black transition-colors cursor-pointer uppercase tracking-[0.1em]">
                            Recover?
                          </span>
                        </Link>
                      </div>
                      <div className="relative group/input">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/30 group-focus-within/input:text-primary transition-colors" />
                        <Input 
                          id="password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                          className="pl-12 pr-12 h-14 bg-card/40 border-border/60 text-foreground placeholder:text-foreground/20 focus:border-primary/50 focus:ring-primary/10 rounded-2xl transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 ml-1">
                    <Checkbox id="remember" className="w-5 h-5 border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-lg" />
                    <label
                      htmlFor="remember"
                      className="text-xs font-bold text-foreground/50 leading-none cursor-pointer hover:text-foreground/80 transition-colors uppercase tracking-widest"
                    >
                      Trust Device
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-15 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg rounded-2xl transition-all group relative overflow-hidden shadow-[0_15px_40px_rgba(36,27,235,0.4)]"
                    disabled={isLoading}
                  >
                    <div className={`flex items-center justify-center gap-3 transition-transform duration-500 ${isLoading ? '-translate-y-16' : ''}`}>
                      AUTHENTICATE <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className={`absolute inset-0 flex items-center justify-center gap-3 transition-transform duration-500 ${isLoading ? 'translate-y-0' : 'translate-y-16'}`}>
                      <div className="w-5 h-5 border-2 border-border/60 border-t-foreground rounded-full animate-spin" />
                    </div>
                  </Button>
                </form>

                <div className="pt-8 text-center">
                  <p className="text-[10px] text-foreground/30 font-black uppercase tracking-[0.3em]">
                    Log Id: SSO-942-821
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/" className="text-foreground/40 hover:text-primary text-xs font-black uppercase tracking-[0.3em] transition-all">
            Return to Public Gateway
          </Link>
        </div>
      </div>
    </div>
  );
}
