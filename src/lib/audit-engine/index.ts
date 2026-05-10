import { AuditInput, AuditResult, Recommendation, ToolUsage } from "@/types/audit";

const PRICING = {
  Cursor: { pro: 1600, business: 3200 },
  "GitHub Copilot": { individual: 800, business: 1500, enterprise: 3100 },
  Claude: { pro: 1600, team: 2400 }, // Team min 5 seats
  ChatGPT: { plus: 1600, team: 2000, enterprise: 4800 },
  Gemini: { pro: 1600, business: 1600, enterprise: 2400 },
  v0: { premium: 1600 },
};

export function runAudit(input: AuditInput): AuditResult {
  const recommendations: Recommendation[] = input.tools.map((tool) => 
    calculateRecommendation(tool, input.teamSize)
  );

  const totalMonthlySavings = recommendations.reduce(
    (acc, rec) => acc + rec.monthlySavings, 
    0
  );

  return {
    id: Math.random().toString(36).substring(7),
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    recommendations,
    timestamp: Date.now(),
  };
}

function calculateRecommendation(tool: ToolUsage, teamSize: number): Recommendation {
  const { name, plan, monthlySpend, seats } = tool;
  
  // Default: suggest a small credit-based saving even if plan is "optimal"
  let rec: Recommendation = {
    toolName: name,
    action: "credits",
    recommendedPlan: "Credex Optimized",
    monthlySavings: Math.floor(monthlySpend * 0.1), // 10% base saving
    reason: `Even on your current plan, Lumina can optimize your ${name} tokens via secondary market credits.`,
  };

  switch (name) {
    case "Cursor":
      if ((plan === "business" || plan === "enterprise") && seats === 1) {
        rec = {
          toolName: name,
          action: "downgrade",
          recommendedPlan: "Pro",
          monthlySavings: monthlySpend - 1600,
          reason: "Cursor Business features are overkill for a single user. Switch to Pro to save.",
        };
      }
      break;

    case "Claude":
      if ((plan === "team" || plan === "business") && seats < 5) {
        const currentCost = Math.max(seats, 5) * 2400;
        const proCost = seats * 1600;
        rec = {
          toolName: name,
          action: "downgrade",
          recommendedPlan: "Pro",
          monthlySavings: Math.max(currentCost - proCost, monthlySpend * 0.2),
          reason: `Claude Team requires a 5-seat minimum. Switching users to individual Pro plans saves significantly.`,
        };
      }
      break;

    case "GitHub Copilot":
      if (plan === "enterprise" && teamSize < 20) {
        rec = {
          toolName: name,
          action: "downgrade",
          recommendedPlan: "Business",
          monthlySavings: (3100 - 1500) * seats,
          reason: "Enterprise features like custom models are rarely used by small teams. Business tier offers the same utility.",
        };
      }
      break;

    case "ChatGPT":
      if (seats > 1 && plan === "pro") {
        rec = {
          toolName: name,
          action: "upgrade",
          recommendedPlan: "Team",
          monthlySavings: (monthlySpend - (seats * 2000)) + (monthlySpend * 0.15),
          reason: "Multiple individual Plus accounts are harder to manage and more expensive than a consolidated Team plan.",
        };
      } else if (monthlySpend > 1000) {
        rec = {
          toolName: name,
          action: "credits",
          recommendedPlan: "Credex Credits",
          monthlySavings: monthlySpend * 0.2,
          reason: "Your ChatGPT spend profile is eligible for flat 20% savings via Credex credit batches.",
        };
      }
      break;
      
    case "Anthropic API":
    case "OpenAI API":
      if (monthlySpend > 500) {
        rec = {
          toolName: name,
          action: "credits",
          recommendedPlan: "Credex Credits",
          monthlySavings: monthlySpend * 0.25,
          reason: "High API usage is eligible for significant discounted credit batches through the Credex secondary market.",
        };
      }
      break;
  }

  // Ensure we don't show negative savings
  if (rec.monthlySavings < 0) {
    rec.monthlySavings = Math.floor(monthlySpend * 0.1);
    rec.action = "credits";
  }

  return rec;
}
