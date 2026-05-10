# Pricing Data — Lumina Audit

This document outlines the deterministic pricing data used by the Lumina Audit engine (as of May 2026). All values are in **Indian Rupees (₹)** using a standard conversion rate of 1 USD = ₹80.

## 1. Development Tools
| Tool | Pro/Individual Plan | Business/Team Plan | Enterprise Plan |
| :--- | :--- | :--- | :--- |
| **Cursor** | ₹1,600 /mo | ₹3,200 /mo | Custom |
| **GitHub Copilot** | ₹800 /mo | ₹1,500 /mo | ₹3,100 /mo |
| **v0.dev** | ₹1,600 /mo | ₹2,400 /mo | Custom |

## 2. General Purpose AI
| Tool | Plus/Pro Plan | Team Plan | Enterprise Plan |
| :--- | :--- | :--- | :--- |
| **ChatGPT** | ₹1,600 /mo | ₹2,000 /mo (min 2) | ₹4,800 /mo |
| **Claude** | ₹1,600 /mo | ₹2,400 /mo (min 5) | Custom |
| **Gemini** | ₹1,600 /mo | ₹1,600 /mo | ₹2,400 /mo |

## 3. API Pricing (Sample Rates)
Lumina flags "High API Usage" optimization for monthly spends exceeding **₹40,000**.

| Provider | Model | Input (per 1M tokens) | Output (per 1M tokens) |
| :--- | :--- | :--- | :--- |
| **OpenAI** | GPT-4o | ₹400 | ₹1,200 |
| **Anthropic** | Claude 3.5 Sonnet | ₹240 | ₹1,200 |
| **Google** | Gemini 1.5 Pro | ₹280 | ₹840 |

## 4. Audit Logic Rules
- **Redundancy**: If a user has both Cursor Pro and GitHub Copilot, Lumina suggests consolidating to one to save ~₹800-1,600/mo.
- **Seat Optimization**: If a team has < 5 seats on a Claude Team plan, Lumina suggests individual Pro seats to save ₹4,000+/mo (due to 5-seat minimum).
- **Credit Batches**: For API spends > ₹40,000, Lumina recommends Credex Credit Batches for an average of 20% flat discount.
