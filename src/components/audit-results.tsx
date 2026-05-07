"use client";

import React from "react";
import { motion } from "framer-motion";
import { AuditResult } from "@/types/audit";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingDown, Share2, Download, Mail, ExternalLink, ArrowRight } from "lucide-react";
import { LeadCapture } from "./lead-capture";
import { toast } from "sonner";

export function AuditResults({ result, onRestart }: { result: AuditResult; onRestart: () => void }) {
  const isHighSavings = result.totalMonthlySavings > 40000;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-medium mb-4">
          <TrendingDown size={18} /> Audit Complete
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          You could save <span className="text-green-400">₹{result.totalMonthlySavings.toLocaleString()}</span>/mo
        </h1>
        <p className="text-xl text-muted-foreground">
          That's <span className="text-white font-semibold">₹{result.totalAnnualSavings.toLocaleString()}</span> per year in pure optimization.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 glass border-white/10 overflow-hidden">
          <CardHeader>
            <CardTitle>Optimization Breakdown</CardTitle>
            <CardDescription>Step-by-step actions to reclaim your budget.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-white/10">
                  <TableHead className="text-white">Tool</TableHead>
                  <TableHead className="text-white">Recommendation</TableHead>
                  <TableHead className="text-right text-white">Monthly Savings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.recommendations.map((rec, i) => (
                  <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-colors">
                    <TableCell className="font-medium">
                      {rec.toolName}
                      {rec.monthlySavings > 0 && (
                        <div className="text-[10px] mt-1 text-green-400 uppercase tracking-wider font-bold">
                          Potential saving
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium text-white">{rec.action === 'keep' ? 'Already Optimized' : rec.reason}</div>
                      {rec.action !== 'keep' && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Recommended: {rec.recommendedPlan}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={rec.monthlySavings > 0 ? "text-green-400 font-bold" : "text-muted-foreground"}>
                        ₹{rec.monthlySavings.toLocaleString()}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {isHighSavings ? (
            <Card className="bg-primary text-primary-foreground border-none shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              <CardHeader>
                <CardTitle className="text-xl">Unlock More with Credex</CardTitle>
                <CardDescription className="text-primary-foreground/70">
                  Your savings profile qualifies for a free Credex consultation to unlock up to 40% off in credit batches.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-white text-black hover:bg-white/90 font-bold rounded-xl h-12">
                  Book Credex Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-xl">Stay Optimized</CardTitle>
                <CardDescription>
                  We'll notify you when new credit batches for your stack become available.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 h-12">
                  Join Notify List
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground">Personalized AI Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed italic text-white/80">
                {result.personalizedSummary || "Generating your personalized spend optimization strategy..."}
              </p>
            </CardContent>
          </Card>

          <LeadCapture auditId={result.id} savings={result.totalMonthlySavings} />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={onRestart} variant="ghost" className="text-muted-foreground hover:text-white">
          Reset Audit
        </Button>
        <Button 
          variant="outline" 
          className="border-white/10 hover:bg-white/5 rounded-full px-6"
          onClick={() => toast.success("Link copied to clipboard!")}
        >
          <Share2 className="mr-2 h-4 w-4" /> Share Results
        </Button>
        <Button 
          variant="outline" 
          className="border-white/10 hover:bg-white/5 rounded-full px-6"
          onClick={() => toast.info("PDF Generation is coming in Phase 2!")}
        >
          <Download className="mr-2 h-4 w-4" /> Download PDF
        </Button>
      </div>
    </div>
  );
}
