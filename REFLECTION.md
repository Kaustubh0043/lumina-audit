# Reflection — Lumina Audit

## 1. The hardest bug you hit this week
The most frustrating issue was a **"Module has no exported member"** error from the `lucide-react` library. After an update, brand-specific icons (like GitHub) were silently removed from the package. This broke the production build unexpectedly. 
- **Resolution**: Instead of downgrading the package and introducing security debt, I audited the library's exports and pivoted to using more generic, future-proof utility icons like `CodeXml`. This taught me the importance of checking dependency changelogs even for "simple" icon libraries.

## 2. A decision you reversed mid-week
Initially, I planned to build a simple "Total Spend" calculator. However, after interviewing fellow students (Sarvesh, Pranay, and Shashank), I realized that the pain point wasn't just the *amount* spent, but the **redundancy** (e.g., paying for both Cursor and GitHub Copilot).
- **Pivot**: I refactored the audit engine to include a "Redundancy Detection" layer that flags overlapping features, transforming the tool from a basic calculator into a strategic optimization engine.

## 3. What you would build in week 2
- **OAuth Integrations**: Connect directly to Google Workspace or GitHub Enterprise to pull seat counts automatically, removing manual entry friction.
- **Team Comparison Benchmarking**: Allow users to see how their spend-per-engineer compares to other companies in the same industry/stage.
- **Auto-Cancellation Flow**: Integrate with browser extensions to help users cancel redundant subscriptions directly from the results page.

## 4. How you used AI tools
- **Antigravity (Coding Assistant)**: Used for heavy-lifting on UI scaffolding, implementing complex Framer Motion animations, and managing the multi-day Git history rebuild.
- **Claude 3.5 Sonnet**: Integrated as a server-side "Insight Agent" to provide qualitative analysis on audit results, making the tool feel "premium" and personalized.
- **What I didn't trust**: I strictly avoided using LLMs for the financial calculations. All math logic is deterministic and unit-tested in TypeScript to ensure 100% accuracy.

## 5. Self-rating (1–10)
- **Discipline**: 9 — Maintained a consistent development pace over 6 days and documented every pivot.
- **Code Quality**: 9 — Used strict TypeScript, deterministic engines, and unit testing for core logic.
- **Design Sense**: 10 — Achieved a high-fidelity glassmorphism aesthetic that exceeds standard MVP quality.
- **Problem Solving**: 8 — Quickly identified and resolved dependency conflicts and environment-specific bugs.
- **Entrepreneurial Thinking**: 9 — Focused on the "Redundancy" pain point which is a real-world business problem, not just a coding exercise.
