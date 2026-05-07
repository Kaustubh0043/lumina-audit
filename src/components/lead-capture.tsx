import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { storeLead } from "@/lib/supabase";
import { toast } from "sonner";
import { Loader2, MailCheck } from "lucide-react";

export function LeadCapture({ auditId, savings }: { auditId: string; savings: number }) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await storeLead(email, { company, audit_id: auditId, savings });
      setSubmitted(true);
      toast.success("Report Captured", {
        description: "We've sent a detailed breakdown to your email.",
      });
    } catch (error) {
      toast.error("Error", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card className="glass border-green-500/30 bg-green-500/5">
        <CardContent className="pt-6 text-center space-y-3">
          <div className="mx-auto w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
            <MailCheck size={24} />
          </div>
          <CardTitle>Report Sent!</CardTitle>
          <CardDescription>Check your inbox for the full PDF report and optimization guide.</CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass border-white/10 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
      <CardHeader>
        <CardTitle>Capture Your Audit Report</CardTitle>
        <CardDescription>
          Enter your email to save this audit and receive a detailed PDF breakdown.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Work Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/20 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company Name (Optional)</Label>
            <Input
              id="company"
              placeholder="Acme Inc."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="bg-black/20 border-white/10"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-white text-black hover:bg-white/90 font-bold">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Send Full Report"}
          </Button>
          <p className="text-[10px] text-center text-muted-foreground">
            By clicking, you agree to receive a one-time audit report and occasional AI optimization tips from Credex.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
