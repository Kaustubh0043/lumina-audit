# User Interviews — Lumina Audit

> [!IMPORTANT]
> These interviews were conducted to validate the core value proposition of Lumina Audit: reducing redundant AI spend and optimizing tool selection for developers.

## Interview 1: Sarvesh Khade
- **Role**: B.Tech 3rd Year CSE / Freelance Full-stack Developer
- **Company Stage**: Individual Developer / Student
- **Direct Quotes**:
  1. "I'm paying for Cursor, but I also have a GitHub Copilot subscription through my college project—I feel like I'm paying twice for the same autocomplete."
  2. "I love Claude for UI generation, but $20/month is a lot when I only use it heavily during 'crunch weeks' for my projects."
  3. "If there was a way to see exactly how much I'd save by switching to API-only usage, I’d take it in a heartbeat."
- **Surprising Insight**: Even as a student, he is juggling 3-4 different AI "free tiers" and 2 paid ones, often forgetting to cancel trials.
- **Design Changes**: Added a "Redundancy Alert" in the audit logic that flags when two tools (like Cursor and Copilot) have overlapping functionality.

## Interview 2: Pranay Pore
- **Role**: B.Tech 3rd Year CSE / Open Source Contributor
- **Company Stage**: Small Team Lead (College Project)
- **Direct Quotes**:
  1. "My biggest fear isn't the $20 subscription; it's leaving an API key in a script and waking up to a $100 bill from OpenAI."
  2. "We use ChatGPT for brainstorming but Claude for debugging. We don't really know if we need 'Pro' for both."
  3. "The 'Value-to-Spend' ratio is hard to calculate. Does ChatGPT Plus save me 10 hours a month? Probably, but I can't prove it."
- **Surprising Insight**: The user was more interested in "Safety and Budgeting" than just finding the cheapest tool.
- **Design Changes**: Improved the "Qualitative Analysis" section in the results to highlight "Risk/Safety" of API usage vs Subscription models.

## Interview 3: Shashank Deore
- **Role**: B.Tech 3rd Year CSE / Data Science Enthusiast
- **Company Stage**: Student Researcher
- **Direct Quotes**:
  1. "I use Gemini for long context research and ChatGPT for quick logic fixes. It's becoming a 'subscription maze'."
  2. "I'd love a dashboard that tells me: 'Hey, you're a heavy writer, use Tool X, but you're a light coder, use Tool Y's free tier'."
  3. "Most students are just 'Pro-tier curious'—they want the best features but don't have the steady income to justify $40/month in AI spend."
- **Surprising Insight**: He felt "guilty" for not using his paid subscriptions enough, leading to a "sunk cost fallacy" where he keeps paying just to "get his money's worth."
- **Design Changes**: Implemented a "Plan Downgrade" recommendation for tools with low-frequency usage patterns.
