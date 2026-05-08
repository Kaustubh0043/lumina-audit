"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateAuditSummary(data: {
  tools: string[];
  currentSpend: number;
  potentialSavings: number;
  teamSize: number;
  useCase: string;
}) {
  if (!process.env.GEMINI_API_KEY) {
    return "Lumina has identified significant optimization opportunities in your AI stack. By switching redundant seats and leveraging credit batches, you can reduce your monthly spend while maintaining full productivity.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are a senior financial auditor specializing in SaaS and AI infrastructure. Write a concise ~100-word summary of this audit:
    - Tools: ${data.tools.join(", ")}
    - Monthly Spend: ₹${data.currentSpend.toLocaleString()}
    - Potential Savings: ₹${data.potentialSavings.toLocaleString()}
    - Team Size: ${data.teamSize}
    - Use Case: ${data.useCase}
    
    Focus on ROI and efficiency. One paragraph. Keep it professional and punchy.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Summary generation failed:", error);
    return "Lumina has identified significant optimization opportunities in your AI stack. Your personalized spend strategy is ready for review below.";
  }
}
