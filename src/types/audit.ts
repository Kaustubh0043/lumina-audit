export type AIPlan = 'hobby' | 'pro' | 'business' | 'enterprise' | 'team' | 'plus' | 'individual' | 'free' | 'api';

export type ToolName = 
  | 'Cursor' 
  | 'GitHub Copilot' 
  | 'Claude' 
  | 'ChatGPT' 
  | 'Anthropic API' 
  | 'OpenAI API' 
  | 'Gemini' 
  | 'v0';

export interface ToolUsage {
  name: ToolName;
  plan: AIPlan;
  monthlySpend: number;
  seats: number;
}

export type UseCase = 'coding' | 'writing' | 'data' | 'research' | 'mixed';

export interface AuditInput {
  tools: ToolUsage[];
  teamSize: number;
  primaryUseCase: UseCase;
}

export interface Recommendation {
  toolName: ToolName;
  action: 'downgrade' | 'switch' | 'optimize' | 'keep' | 'credits';
  recommendedPlan: string;
  monthlySavings: number;
  reason: string;
}

export interface AuditResult {
  id: string;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  recommendations: Recommendation[];
  personalizedSummary?: string;
  timestamp: number;
}
