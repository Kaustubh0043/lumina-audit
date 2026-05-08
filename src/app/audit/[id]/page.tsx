import { getAudit } from "@/app/actions/storage";
import { AuditResults } from "@/components/audit-results";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const audit = await getAudit(params.id);

  if (!audit) return { title: "Audit Not Found" };

  return {
    title: `AI Spend Audit: $${audit.total_monthly_savings}/mo Savings Found`,
    description: `Check out this AI spend audit identifying $${audit.total_monthly_savings} in monthly savings. Audit your own stack at Lumina Audit.`,
    openGraph: {
      title: `Lumina Audit: $${audit.total_monthly_savings}/mo Savings`,
      description: `We found $${audit.total_annual_savings} in annual savings for this AI stack. Audit yours now.`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `AI Spend Audit: $${audit.total_monthly_savings}/mo Savings`,
      description: `Identified $${audit.total_annual_savings} in annual savings.`,
    },
  };
}

export default async function AuditPage({ params }: Props) {
  const audit = await getAudit(params.id);

  if (!audit) {
    notFound();
  }

  // Convert DB format back to types
  const result = {
    id: audit.id,
    totalMonthlySavings: audit.total_monthly_savings,
    totalAnnualSavings: audit.total_annual_savings,
    recommendations: audit.recommendations,
    timestamp: new Date(audit.created_at).getTime(),
  };

  return (
    <main className="min-h-screen pt-20 px-6">
      <div className="max-w-4xl mx-auto mb-8">
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 text-sm text-center">
          You are viewing a shared audit report. <a href="/" className="font-bold underline">Audit your own stack →</a>
        </div>
      </div>
      <AuditResults result={result} onRestart={() => {}} />
    </main>
  );
}
