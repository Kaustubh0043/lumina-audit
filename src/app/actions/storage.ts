"use server";

import { supabase } from "@/lib/supabase";
import { AuditResult } from "@/types/audit";

export async function saveAudit(result: AuditResult) {
  const { data, error } = await supabase
    .from('audits')
    .insert([{
      id: result.id,
      total_monthly_savings: result.totalMonthlySavings,
      total_annual_savings: result.totalAnnualSavings,
      recommendations: result.recommendations,
      data: result // Store the whole object just in case
    }])
    .select();

  if (error) {
    console.error("Error saving audit:", error);
    // Even if DB fails, we return the ID so the user can see the results locally
    return result.id;
  }

  return data[0].id;
}

export async function getAudit(id: string) {
  const { data, error } = await supabase
    .from('audits')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error("Error fetching audit:", error);
    return null;
  }

  return data;
}
