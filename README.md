# Lumina Audit — AI Spend Optimization

**Live Demo**: [https://lumina-audit.vercel.app/](https://lumina-audit.vercel.app/)  
**GitHub Repository**: [https://github.com/Kaustubh0043/lumina-audit](https://github.com/Kaustubh0043/lumina-audit)

## Project Summary
Lumina Audit is a premium tool designed for startup founders and engineering managers to audit their AI tool spending. By analyzing current usage across major providers like Cursor, Claude, and OpenAI, Lumina provides actionable insights to reduce costs through plan optimization, credit sourcing, and alternative tool recommendations.

## Screenshots / Demo
[Insert Loom Link Here]
[Insert Screenshots Here]

## Quick Start
1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Set up environment variables**: Copy `.env.example` to `.env` and add your Anthropic API key.
4. **Run locally**: `npm run dev`
5. **Deploy**: Push to Vercel/Netlify.

## Decisions & Trade-offs
1. **Next.js App Router**: Chosen for its superior performance and SEO (Open Graph) capabilities, which are critical for the "viral loop" requirement.
2. **Supabase for Persistence**: Used for lead storage and unique audit URLs. It provides a "zero-config" backend that allows for rapid shipping without compromising on reliability.
3. **Hardcoded Audit Logic**: Decided against using LLMs for the core audit math to ensure 100% accuracy and defensibility. LLMs are reserved for the qualitative summary.
4. **Tailwind + shadcn/ui**: Selected to achieve the "premium" aesthetic requirement while maintaining a high Lighthouse score through optimized CSS.
5. **No Auth Requirement**: To minimize friction and maximize lead generation, audits are accessible via unique public URLs without a login, using PII stripping for privacy.

## Deployed URL
[Insert Deployed URL Here]
