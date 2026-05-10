"use client";

import React, { useState } from "react";
import { AuditForm } from "@/components/audit-form";
import { AuditResults } from "@/components/audit-results";
import { AuditResult } from "@/types/audit";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Zap, TrendingDown, ArrowRight, CodeXml, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateAuditSummary } from "@/app/actions/audit";
import { saveAudit } from "@/app/actions/storage";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  const [view, setView] = useState<"landing" | "form" | "results">("landing");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(false);

  const startAudit = () => setView("form");
  
  const handleComplete = async (auditResult: AuditResult) => {
    setLoading(true);
    
    // Generate AI Summary
    const summary = await generateAuditSummary({
      tools: auditResult.recommendations.map(r => r.toolName),
      currentSpend: auditResult.totalMonthlySavings / 0.3, // Approximation for spend
      potentialSavings: auditResult.totalMonthlySavings,
      teamSize: 5, // Mocked for now
      useCase: "mixed"
    });

    const finalResult = { ...auditResult, personalizedSummary: summary };
    
    // Save to DB
    await saveAudit(finalResult);
    
    setResult(finalResult);
    setLoading(false);
    setView("results");
  };

  const restart = () => {
    setResult(null);
    setView("landing");
  };

  return (
    <main className="flex-1 relative overflow-hidden">
      <div className="hero-glow" />
      
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full z-10 relative">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black">
            <Zap size={18} fill="currentColor" />
          </div>
          Lumina <span className="text-white/50 font-normal">Audit</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          <a href="https://github.com/Kaustubh0043/lumina-audit/blob/master/PRICING_DATA.md" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Pricing Data</a>
          <a href="https://github.com/Kaustubh0043/lumina-audit/blob/master/ARCHITECTURE.md" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">How it works</a>
          <a href="https://credex.rocks" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-white font-semibold">Credex</a>
        </div>
        <a 
          href="https://github.com/Kaustubh0043/lumina-audit" 
          target="_blank" 
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline" }), "border-white/10 hover:bg-white/5 rounded-full px-5 flex items-center")}
        >
          <CodeXml size={16} className="mr-2" /> View Repo
        </a>
      </nav>

      <div className="container mx-auto px-6 pt-12 md:pt-24 relative z-10">
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[400px] space-y-6"
            >
              <div className="relative">
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
                <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-6 h-6 fill-current" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Generating Audit...</h2>
                <p className="text-muted-foreground animate-pulse">Running spend optimization engine and fetching AI summary</p>
              </div>
            </motion.div>
          )}

          {!loading && view === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto text-center space-y-10"
            >
              <div className="space-y-6">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]"
                >
                  STOP OVERPAYING <br />
                  <span className="gradient-text">FOR YOUR AI STACK.</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
                >
                  Get an instant, professional audit of your Cursor, Claude, and OpenAI spend. Discover savings of up to 30% in 2 minutes.
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col md:flex-row items-center justify-center gap-4"
              >
                <Button 
                  onClick={startAudit}
                  size="lg" 
                  className="bg-white text-black hover:bg-white/90 font-bold rounded-full h-14 px-10 text-lg shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                >
                  Start Free Audit <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <ShieldCheck size={16} className="text-green-500" /> No credit card required
                </div>
              </motion.div>

              {/* Social Proof */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
              >
                <div className="p-6 rounded-2xl glass border-white/5 space-y-3">
                  <div className="text-green-400 font-bold text-lg">30% Savings</div>
                  <p className="text-sm text-white/60">Average savings identified for Seed-stage startups this week.</p>
                </div>
                <div className="p-6 rounded-2xl glass border-white/5 space-y-3">
                  <div className="text-white font-bold text-lg">8+ AI Tools</div>
                  <p className="text-sm text-white/60">Support for Cursor, Copilot, Claude, OpenAI, Gemini, and more.</p>
                </div>
                <div className="p-6 rounded-2xl glass border-white/5 space-y-3">
                  <div className="text-white font-bold text-lg">Credex Optimized</div>
                  <p className="text-sm text-white/60">Instant access to discounted credit batches for high-spend users.</p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {!loading && view === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <AuditForm onComplete={handleComplete} />
            </motion.div>
          )}

          {!loading && view === "results" && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <AuditResults result={result} onRestart={restart} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-20 py-10 text-center text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Lumina Audit. Built for the Credex Intern Assignment.</p>
          <div className="flex gap-6">
            <a href="https://github.com/Kaustubh0043/lumina-audit/blob/master/LEGAL.md" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy</a>
            <a href="https://github.com/Kaustubh0043/lumina-audit/blob/master/LEGAL.md" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms</a>
            <a href="https://github.com/Kaustubh0043/lumina-audit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
