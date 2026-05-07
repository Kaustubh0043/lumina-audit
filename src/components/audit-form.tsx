"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { runAudit } from "@/lib/audit-engine";
import { AuditInput, ToolName, AIPlan, UseCase } from "@/types/audit";
import { CheckCircle2, ChevronRight, ChevronLeft, Zap, ShieldCheck, TrendingDown } from "lucide-react";

const TOOLS: ToolName[] = [
  "Cursor",
  "GitHub Copilot",
  "Claude",
  "ChatGPT",
  "Anthropic API",
  "OpenAI API",
  "Gemini",
  "v0",
];

const USE_CASES: UseCase[] = ["coding", "writing", "data", "research", "mixed"];

const schema = z.object({
  tools: z.array(z.object({
    name: z.string(),
    plan: z.string(),
    monthlySpend: z.number().min(0),
    seats: z.number().min(1),
  })),
  teamSize: z.number().min(1),
  primaryUseCase: z.string(),
});

type FormValues = z.infer<typeof schema>;

export function AuditForm({ onComplete }: { onComplete: (result: any) => void }) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      tools: [],
      teamSize: 1,
      primaryUseCase: "mixed",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tools",
  });

  const selectedTools = watch("tools");

  // Step 1: Tool Selection
  const toggleTool = (toolName: ToolName) => {
    const index = selectedTools.findIndex((t) => t.name === toolName);
    if (index === -1) {
      append({ name: toolName, plan: "pro", monthlySpend: 1600, seats: 1 });
    } else {
      remove(index);
    }
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = (data: FormValues) => {
    const result = runAudit(data as AuditInput);
    onComplete(result);
  };

  const progress = (step / totalSteps) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8 space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground mb-1">
          <span>Step {step} of {totalSteps}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <Card className="glass border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Zap className="text-yellow-400" /> Which tools are you using?
                </CardTitle>
                <CardDescription>Select the AI tools currently in your stack.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                {TOOLS.map((tool) => (
                  <div
                    key={tool}
                    onClick={() => toggleTool(tool)}
                    className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedTools.some((t) => t.name === tool)
                        ? "bg-white/10 border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                        : "bg-black/20 border-white/5 hover:border-white/20"
                    }`}
                  >
                    <Checkbox
                      checked={selectedTools.some((t) => t.name === tool)}
                      className="mr-3"
                    />
                    <span className="font-medium">{tool}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="justify-end">
                <Button 
                  onClick={nextStep} 
                  disabled={selectedTools.length === 0}
                  className="rounded-full px-8 bg-white text-black hover:bg-white/90"
                >
                  Continue <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <Card className="glass border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Configure Usage</CardTitle>
                <CardDescription>Enter the details for each selected tool.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {fields.map((field, index) => (
                  <div key={field.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-lg">{field.name}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Plan</Label>
                        <Select
                          onValueChange={(v) => v && setValue(`tools.${index}.plan`, v)}
                          defaultValue={field.plan}
                        >
                          <SelectTrigger className="bg-black/20 border-white/10">
                            <SelectValue placeholder="Select plan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hobby">Hobby / Free</SelectItem>
                            <SelectItem value="pro">Pro / Plus / Individual</SelectItem>
                            <SelectItem value="business">Business / Team</SelectItem>
                            <SelectItem value="enterprise">Enterprise</SelectItem>
                            <SelectItem value="api">API Direct</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Monthly Spend (₹)</Label>
                        <Input
                          type="number"
                          {...register(`tools.${index}.monthlySpend`, { valueAsNumber: true })}
                          className="bg-black/20 border-white/10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Seats / Users</Label>
                        <Input
                          type="number"
                          {...register(`tools.${index}.seats`, { valueAsNumber: true })}
                          className="bg-black/20 border-white/10"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="ghost" onClick={prevStep} className="hover:bg-white/5">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={nextStep} className="rounded-full px-8 bg-white text-black hover:bg-white/90">
                  Almost Done <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 3 && (
            <Card className="glass border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Team Context</CardTitle>
                <CardDescription>Tell us about your team to improve recommendation accuracy.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Total Team Size</Label>
                  <Input
                    type="number"
                    {...register("teamSize", { valueAsNumber: true })}
                    className="bg-black/20 border-white/10 h-12 text-lg"
                  />
                  <p className="text-xs text-muted-foreground">This helps identify if team plans are redundant.</p>
                </div>
                <div className="space-y-2">
                  <Label>Primary Use Case</Label>
                  <Select
                    onValueChange={(v) => v && setValue("primaryUseCase", v)}
                    defaultValue="mixed"
                  >
                    <SelectTrigger className="bg-black/20 border-white/10 h-12 text-lg">
                      <SelectValue placeholder="Select use case" />
                    </SelectTrigger>
                    <SelectContent>
                      {USE_CASES.map((uc) => (
                        <SelectItem key={uc} value={uc} className="capitalize">
                          {uc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="ghost" onClick={prevStep} className="hover:bg-white/5">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button 
                  onClick={handleSubmit(onSubmit)} 
                  className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  Generate Audit <Zap className="ml-2 h-4 w-4 fill-current" />
                </Button>
              </CardFooter>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
