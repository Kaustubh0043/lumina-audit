# Tests — Lumina Audit

## Automated Tests
All tests are located in `src/lib/audit-engine/__tests__/`.

| Filename | Coverage | How to run |
|----------|----------|------------|
| `audit-logic.test.ts` | Core savings calculations for all 8 tools | `npm test` |
| `plan-optimizer.test.ts` | Downgrade logic for teams/enterprise | `npm test` |
| `currency.test.ts` | Formatting and edge cases for spend inputs | `npm test` |
| `api-usage.test.ts` | API cost estimation logic | `npm test` |
| `results-generator.test.ts` | Final report object construction | `npm test` |

## Manual Test Cases
1. **The "Optimal" Case**: User is on the best plans. Audit should show $0 savings and give a "You're well optimized" message.
2. **The "Wasteful" Case**: User has Enterprise seats for 2 people. Audit should suggest downgrading to Team/Pro.
3. **The "Mixed" Case**: Mix of individual and team plans across 5 tools.
4. **Mobile Responsive Check**: Form and results page on iOS/Android viewports.
