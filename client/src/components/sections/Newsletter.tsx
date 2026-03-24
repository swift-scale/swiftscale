"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

interface NewsletterProps {
  /** Optional variant for different placements */
  variant?: "hero" | "footer" | "inline";
  source?: string;
}

export function Newsletter({ variant = "inline", source = "website" }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), source }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setState("success");
        setEmail("");
      } else {
        setErrorMsg(data.message || "Something went wrong. Please try again.");
        setState("error");
      }
    } catch {
      setErrorMsg("Connection error. Please try again.");
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="text-sm font-semibold">You're subscribed! Check your inbox for a welcome email.</p>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
        <div className="relative flex-1">
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state === "error") setState("idle");
            }}
            placeholder="Your email address"
            disabled={state === "loading"}
            className="w-full h-12 px-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all disabled:opacity-60"
            aria-label="Email address for newsletter"
            aria-describedby={state === "error" ? "newsletter-error" : undefined}
          />
        </div>

        <button
          type="submit"
          disabled={state === "loading" || !email}
          className="h-12 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-white text-sm font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(36,27,235,0.3)] whitespace-nowrap"
          aria-label="Subscribe to newsletter"
        >
          {state === "loading" ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Subscribe <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {state === "error" && errorMsg && (
        <motion.p
          id="newsletter-error"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          className="mt-2 text-xs text-red-400 font-medium pl-1"
        >
          {errorMsg}
        </motion.p>
      )}
    </div>
  );
}

// ── Full section variant ─────────────────────────────────────────────────────
export function NewsletterSection() {
  return (
    <section className="py-24 bg-[#020205] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(36,27,235,0.08)_0%,_transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/10 text-accent text-xs font-medium mb-6">
            <Sparkles className="w-3 h-3" />
            Stay in the loop
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-white">
            Stay{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
              Updated
            </span>
          </h2>

          <p className="text-white/50 text-lg mb-10 leading-relaxed">
            Subscribe to our newsletter for the latest tech insights, e-commerce strategies, and SwiftScale updates.
          </p>

          <div className="max-w-md mx-auto">
            <Newsletter source="newsletter-section" />
          </div>

          <p className="text-white/20 text-xs mt-4">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
