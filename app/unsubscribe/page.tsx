"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MailX, CheckCircle2, AlertCircle, ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleUnsubscribe = async () => {
    if (!email) return;
    
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setMessage(data.message || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch (error) {
      setMessage("Connection error. Please try again later.");
      setStatus("error");
    }
  };

  // If email is present, we can either auto-unsubscribe or ask for confirmation.
  // Industry standard often asks for confirmation to prevent accidental clicks.
  
  return (
    <div className="min-h-screen bg-[#020205] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-panel border border-white/10 p-10 rounded-[2.5rem] relative z-10 text-center shadow-2xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-[10px] font-black uppercase tracking-widest mb-8">
          <Sparkles className="w-3 h-3" />
          Newsletter Preference
        </div>

        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <MailX className="w-10 h-10 text-white/40" />
              </div>
              <h1 className="text-3xl font-display font-bold text-white">Unsubscribe?</h1>
              <p className="text-white/50 text-sm leading-relaxed">
                We're sorry to see you go. Are you sure you want to stop receiving updates at <span className="text-white font-medium">{email}</span>?
              </p>
              
              {!email ? (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                  Invalid unsubscribe link. No email address provided.
                </div>
              ) : (
                <div className="flex flex-col gap-3 pt-4">
                  <Button 
                    onClick={handleUnsubscribe}
                    className="h-14 rounded-2xl bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest text-xs"
                  >
                    Confirm Unsubscribe
                  </Button>
                  <Button 
                    variant="ghost"
                    asChild
                    className="h-14 rounded-2xl text-white/50 hover:text-white hover:bg-white/5 font-bold"
                  >
                    <Link href="/">Nevermind, keep me in!</Link>
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {status === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 flex flex-col items-center justify-center space-y-4"
            >
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-white/40 font-medium animate-pulse">Processing your request...</p>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h1 className="text-3xl font-display font-bold text-white">Unsubscribed</h1>
              <p className="text-white/50 text-sm leading-relaxed">
                You have been successfully removed from our mailing list. You won't receive any more emails from us.
              </p>
              <div className="pt-6">
                <Button 
                  asChild
                  className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs"
                >
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-red-400" />
              </div>
              <h1 className="text-3xl font-display font-bold text-white">Oops!</h1>
              <p className="text-white/50 text-sm leading-relaxed">
                {message}
              </p>
              <div className="flex flex-col gap-3 pt-6">
                <Button 
                  onClick={() => setStatus("idle")}
                  className="h-14 rounded-2xl bg-white/10 text-white hover:bg-white/20 font-bold"
                >
                  Try Again
                </Button>
                <Button 
                  variant="ghost"
                  asChild
                  className="h-14 rounded-2xl text-white/50 hover:text-white font-bold"
                >
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]"
      >
        © 2026 SwiftScale Inc.
      </motion.div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#020205] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    }>
      <UnsubscribeContent />
    </Suspense>
  );
}
