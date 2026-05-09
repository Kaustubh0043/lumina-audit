# Metrics — Lumina Audit

## North Star Metric
**Total Potential Monthly Savings Identified ($)**
- Why: This measures the "Value Found" by the tool. If this number is high, the lead quality for Credex is high, and the user's "Aha!" moment is stronger.

## Input Metrics
1. **Audit Completion Rate (%)**: Percentage of users who start the form and reach the results page. This measures form friction.
2. **Lead Capture Rate (%)**: Percentage of users who submit their email after seeing their audit. This measures the "Value Exchange" efficacy.
3. **Viral Share Rate (%)**: Percentage of users who click "Share" or copy the public URL. This measures the "Organic Loop."

## Instrumentation
1. **PostHog**: For event tracking (form step completion, button clicks).
2. **Supabase Analytics**: For database growth and unique audit counts.
3. **Vercel Web Analytics**: For core web vitals and Lighthouse monitoring.

## Pivot Decision
If **Lead Capture Rate** drops below 3% for users with >$200/mo in savings, it triggers a pivot:
- **Hypothesis**: The "Email Gate" is positioned too late or the value proposition of the report isn't clear.
- **Pivot**: Offer an immediate "Download PDF" in exchange for email, or switch to a "Sign up to track this spend" model.
