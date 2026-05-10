# Lumina Audit — AI Spend Optimization

**Live Demo**: [https://lumina-audit.vercel.app/](https://lumina-audit.vercel.app/)  
**GitHub Repository**: [https://github.com/Kaustubh0043/lumina-audit](https://github.com/Kaustubh0043/lumina-audit)

---

## 🚀 Overview
Lumina Audit is a premium, high-fidelity platform designed for startup founders and CTOs to audit their AI infrastructure spending. In an era where AI "SaaS tax" is a growing burden, Lumina provides a deterministic, data-driven engine to identify redundant subscriptions and optimize tool usage.

### **Key Features**
- 🇮🇳 **Full INR Localization**: All audit math and pricing data is localized for the Indian market (₹).
- 🧠 **AI-Powered Insights**: Integrated with **Google Gemini** for qualitative ROI summaries.
- 📊 **Deterministic Engine**: 100% accurate savings calculations for Cursor, Claude, ChatGPT, and OpenAI APIs.
- 💾 **Supabase Persistence**: Automatic saving of audits and lead generation.
- ✨ **Premium UI**: Dark-mode glassmorphism aesthetic built with Framer Motion and Shadcn/UI.

---

## 🛠️ Technical Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS + Shadcn/UI
- **Database**: Supabase (PostgreSQL)
- **AI Engine**: Google Gemini 1.5 Pro
- **Animations**: Framer Motion
- **Deployment**: Vercel

---

## 📂 Repository Structure (Required Documentation)
All strategic documentation required for the Credex Round 1 assignment is present at the root:

- **`ARCHITECTURE.md`**: Technical design and system flow.
- **`DEVLOG.md`**: A chronological record of the build process and bug resolution.
- **`REFLECTION.md`**: Critical self-assessment and technical trade-offs.
- **`TESTS.md`**: Testing strategy and logic validation.
- **`PRICING_DATA.md`**: Localized INR (₹) pricing benchmarks for AI tools.
- **`PROMPTS.md`**: Engineering prompts used for AI generation.
- **`GTM.md`**: Go-to-market strategy for the Indian startup ecosystem.
- **`ECONOMICS.md`**: Unit economics and LTV/CAC projections.
- **`USER_INTERVIEWS.md`**: Qualitative feedback from three target users.
- **`LEGAL.md`**: Privacy and Terms of Service documentation.

---

## ⚙️ Local Setup
1. **Clone & Install**:
   ```bash
   git clone https://github.com/Kaustubh0043/lumina-audit
   cd lumina-audit
   npm install
   ```
2. **Environment Variables**:
   Create a `.env.local` file with the following:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GEMINI_API_KEY`
3. **Run**:
   ```bash
   npm run dev
   ```

---

## 🛡️ Decisions & Trade-offs
1. **Deterministic Logic vs. LLMs**: I intentionally avoided using LLMs for the primary savings math to ensure 100% defensibility and accuracy. LLMs are used only for qualitative interpretation.
2. **No-Auth Frictionless Flow**: To maximize lead generation, I implemented a public-URL sharing model that doesn't require a login, stripping PII to maintain privacy.

---
© 2026 Lumina Audit. Built for the Credex Intern Assignment.
