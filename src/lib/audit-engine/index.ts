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
  
  // Default: keep current
  let rec: Recommendation = {
    toolName: name,
    action: "keep",
    recommendedPlan: plan,
    monthlySavings: 0,
    reason: "You are already on the optimal plan for your usage.",
  };

  switch (name) {
    case "Cursor":
      if (plan === "business" && seats === 1) {
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
        // Claude Team is ₹2400/user but billed for min 5
        const currentCost = Math.max(seats, 5) * 2400;
        const proCost = seats * 20;
        rec = {
          toolName: name,
          action: "downgrade",
          recommendedPlan: "Pro",
          monthlySavings: currentCost - proCost,
          reason: `Claude Team requires a 5-seat minimum. Switching ${seats} users to Pro saves ₹${currentCost - proCost}/mo.`,
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
          reason: "Enterprise features like custom models are rarely used by small teams. Business tier offers the same core utility.",
        };
      }
      break;

    case "ChatGPT":
      if (plan === "enterprise" || plan === "business") {
        rec = {
          toolName: name,
          action: "credits",
          recommendedPlan: "Credex Credits",
          monthlySavings: monthlySpend * 0.25, // Assume 25% savings via credits
          reason: "You are at a scale where Credex credits can significantly reduce your OpenAI bill.",
        };
      }
      break;
      
    case "Anthropic API":
    case "OpenAI API":
      if (monthlySpend > 800) {
        rec = {
          toolName: name,
          action: "credits",
          recommendedPlan: "Credex Credits",
          monthlySavings: monthlySpend * 0.15,
          reason: "Even moderate API usage is eligible for 15% savings via Credex token optimization.",
        };
      }
      break;
  }

  // Ensure we don't show negative savings
  if (rec.monthlySavings < 0) {
    rec.monthlySavings = 0;
    rec.action = "keep";
  }

  return rec;
}
