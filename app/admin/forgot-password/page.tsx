"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, ShieldCheck, KeyRound } from "lucide-react";
import { toast } from "sonner";

export default function AdminForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [messageEmail, setMessageEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setMessageEmail(email);
        setIsSubmitted(true);
        toast.success("Verification Initiated", {
          description: "Instructions have been dispatched to your email."
        });
      } else {
        toast.error("Process Halted", {
          description: data.message || "We could not verify this identity."
        });
      }
    } catch (err) {
      console.error("Recovery failed:", err);
      toast.error("System Error", {
        description: "Communication failure. Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-theme min-h-screen flex bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-hidden">
      {/* Dynamic Left Panel */}
      <div className="hidden lg:flex w-[60%] relative bg-background items-center justify-center overflow-hidden">
        {/* Orbital Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/10 to-transparent z-10" />
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-primary/20 blur-[150px] rounded-full animate-pulse pointer-events-none" />
        
        {/* Cinematic Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?q=80&w=2034&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-screen scale-110 animate-slow-zoom" />
        
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-[10px] font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" /> Identity Recovery
            </div>
            <h1 className="text-4xl font-display font-black text-foreground leading-tight">
              Restore Your <br/>
              <span className="text-primary">Admin Access</span>.
            </h1>
            <p className="text-foreground/60 leading-relaxed">
              Initiate a secure credentials recovery process. For security reasons, we will only send instructions to registered administrator accounts.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-8 sm:p-20 bg-background">
        <div className="w-full max-w-md">
          <Link href="/admin/login" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-12 transition-colors uppercase text-[10px] font-bold tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back to Terminal
          </Link>

          {!isSubmitted ? (
            <div className="space-y-10">
              <div className="space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                  <KeyRound className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-display font-black text-foreground tracking-tight">Recover Identity</h2>
                <p className="text-muted-foreground text-lg">Enter your verified administrator email</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-foreground/50">Admin Identity</Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="admin@swiftscale.com" 
                      className="pl-12 h-14 bg-muted/30 border-border text-foreground focus:border-primary focus:ring-primary/10 rounded-2xl transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg rounded-2xl transition-all shadow-[0_10px_30px_rgba(36,27,235,0.3)]"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying Identity..." : "Send Recovery Link"}
                </Button>
              </form>
            </div>
          ) : (
            <div className="space-y-8 text-center sm:text-left">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto sm:mx-0">
                <ShieldCheck className="w-10 h-10 text-emerald-500" />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-display font-black text-foreground tracking-tight">Instructions Dispatched</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  If <span className="text-foreground font-bold">{messageEmail}</span> matches our records, you will receive a security key shortly. Check your encrypted inbox.
                </p>
              </div>
              <Button asChild variant="outline" className="w-full h-14 rounded-2xl border-border hover:bg-muted/50 text-foreground font-bold">
                <Link href="/admin/login">Return to Login</Link>
              </Button>
               <p className="text-sm text-muted-foreground pt-4">
                Haven't received anything? <button type="button" onClick={() => setIsSubmitted(false)} className="text-primary hover:underline font-bold">Try another email</button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
