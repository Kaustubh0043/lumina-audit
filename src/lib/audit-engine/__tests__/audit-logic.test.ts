import { describe, it, expect } from "vitest";
import { runAudit } from "../index";
import { AuditInput } from "@/types/audit";

describe("Audit Engine Logic", () => {
  it("should identify savings for Cursor Business with 1 seat", () => {
    const input: AuditInput = {
      tools: [
        { name: "Cursor", plan: "business", monthlySpend: 40, seats: 1 }
      ],
      teamSize: 1,
      primaryUseCase: "coding"
    };
    
    const result = runAudit(input);
    const cursorRec = result.recommendations.find(r => r.toolName === "Cursor");
    
    expect(cursorRec?.action).toBe("downgrade");
    expect(cursorRec?.monthlySavings).toBe(20);
    expect(result.totalMonthlySavings).toBe(20);
  });

  it("should identify savings for Claude Team with fewer than 5 seats", () => {
    const input: AuditInput = {
      tools: [
        { name: "Claude", plan: "team", monthlySpend: 150, seats: 2 }
      ],
      teamSize: 2,
      primaryUseCase: "writing"
    };
    
    const result = runAudit(input);
    const claudeRec = result.recommendations.find(r => r.toolName === "Claude");
    
    // Claude Team is $30/user but min 5 seats = $150.
    // 2 Pro seats = 2 * $20 = $40.
    // Savings = 150 - 40 = 110.
    expect(claudeRec?.action).toBe("downgrade");
    expect(claudeRec?.monthlySavings).toBe(110);
  });

  it("should recommend Credex credits for high API spend", () => {
    const input: AuditInput = {
      tools: [
        { name: "OpenAI API", plan: "api", monthlySpend: 1000, seats: 1 }
      ],
      teamSize: 10,
      primaryUseCase: "mixed"
    };
    
    const result = runAudit(input);
    const apiRec = result.recommendations.find(r => r.toolName === "OpenAI API");
    
    expect(apiRec?.action).toBe("credits");
    expect(apiRec?.monthlySavings).toBe(200); // 20% of 1000
  });

  it("should show $0 savings for already optimized stacks", () => {
    const input: AuditInput = {
      tools: [
        { name: "Cursor", plan: "pro", monthlySpend: 20, seats: 1 }
      ],
      teamSize: 1,
      primaryUseCase: "coding"
    };
    
    const result = runAudit(input);
    expect(result.totalMonthlySavings).toBe(0);
    expect(result.recommendations[0].action).toBe("keep");
  });
});
