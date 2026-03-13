import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login delay
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      setLocation("/admin"); // Redirect to admin panel for demo purposes
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-background selection:bg-accent selection:text-white">
      {/* Left Panel - Image/Branding */}
      <div className="hidden lg:flex w-1/2 relative bg-zinc-950 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay" />
        
        <div className="relative z-20 p-12 max-w-lg text-white">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer mb-12">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white shadow-lg">
                S
              </div>
              <span className="font-display font-bold text-2xl tracking-tight">Swiftscale</span>
            </div>
          </Link>
          
          <h1 className="text-4xl font-display font-bold mb-6 leading-tight">
            Welcome back to your <span className="text-accent">command center</span>.
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-8">
            Access your dashboard to manage services, view analytics, and control your enterprise operations from one secure location.
          </p>
          
          <div className="flex items-center gap-4 text-sm font-medium text-white/50">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center">
                  <span className="text-xs text-white/70">{String.fromCharCode(64 + i)}</span>
                </div>
              ))}
            </div>
            <span>Join 10,000+ teams</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative">
        <Link href="/" className="absolute top-8 left-8 lg:hidden">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white shadow-lg">
              S
            </div>
          </div>
        </Link>

        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-display font-bold text-white mb-2">Sign In</h2>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@company.com" 
                    className="pl-10 h-12 bg-white/5 border-white/10 text-white focus:border-accent focus:ring-accent/20"
                    required
                    defaultValue="admin@swiftscale.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white/80">Password</Label>
                  <Link href="/auth/forgot-password">
                    <span className="text-sm text-accent hover:text-accent/80 font-medium transition-colors cursor-pointer">
                      Forgot password?
                    </span>
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pl-10 pr-10 h-12 bg-white/5 border-white/10 text-white focus:border-accent focus:ring-accent/20"
                    required
                    defaultValue="password123"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" className="border-white/20 data-[state=checked]:bg-accent data-[state=checked]:border-accent" />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white/70"
              >
                Remember me for 30 days
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-accent hover:bg-accent/90 text-white font-semibold text-lg transition-all group relative overflow-hidden"
              disabled={isLoading}
            >
              <span className={`flex items-center justify-center gap-2 transition-transform duration-300 ${isLoading ? '-translate-y-12' : ''}`}>
                Sign In <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${isLoading ? 'translate-y-0' : 'translate-y-12'}`}>
                Authenticating...
              </span>
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/contact">
              <span className="text-white hover:text-accent font-medium transition-colors cursor-pointer">
                Contact support
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}