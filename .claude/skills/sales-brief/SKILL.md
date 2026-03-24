---
name: sales-brief
description: "Generate a Sales Brief for the sales team when a product update affects customers. Creates a 7-section, 3-minute-scannable document with talk tracks, pricing impact, and objection handling."
disable-model-invocation: false
user-invocable: true
---

## Quick Start

**What to provide:** A product change that sales needs to communicate to customers. Can be rough context, a PRD link, or a GTM brief.

```
/sales-brief                                    → Start from scratch with guided questions
/sales-brief [paste change context]             → I'll skip questions you already answered
/sales-brief marketplace phase 1                → I'll check workspace context for details
```

**What you get:** A 7-section sales brief: 30-second summary, Before/After, Customer Impact, Talk Tracks, Pricing Impact, Objection Handling, Demo Tips. Saved to `outputs/sales-briefs/[YYYY-MM-DD]-[topic-kebab-case].md`. Based on `templates/sales-brief-template.md`.

**Time:** 5-8 minutes for first draft. Then iterate.

**Key principle:** Sales should be able to open this document in a customer meeting and use it immediately. Talk-track ready, conversation-ready.

---

# /sales-brief - Sales Brief Creation

When the PM types `/sales-brief`, guide them through creating a sales enablement brief for the sales team.

## Why This Skill Exists

Every release or sprint that includes customer-facing changes creates a need for three things:
- **Ready-to-use conversation scripts** for customer meetings
- **Upsell angles by customer segment**
- **Instant objection handling** for customer pushback

7 sections, 3-minute scan. Good enough for sales to skim 5 minutes before a meeting.

---

## Context Routing Logic (Internal)

**Automatic Context Checks:**

When this skill is invoked, immediately check in this priority order:

| Priority | Source | Files/Folders | What to Extract |
|----------|--------|---------------|-----------------|
| 1 | ICP | `context-library/strategy/icp-*.md`, `context-library/strategy/*.md` | Customer segments (Tier 1-3), JTBD, Pain Points, Disqualification Criteria, GTM Implications > Sales |
| 2 | GTM Brief | `outputs/gtm-briefs/*.md` | Changes, positioning, FAQ (build on if exists) |
| 3 | PRDs | `context-library/prds/*.md`, `outputs/prds/*.md` | Feature details, scope, before/after |
| 4 | Pricing/Strategy | `context-library/strategy/*.md`, `context-library/decisions/*.md` | Pricing structure, plan info, strategic context |
| 5 | Battlecards | `outputs/analyses/competitive-battlecard-*.md` | Competitive positioning, objection points |
| 6 | Previous Sales Briefs | `outputs/sales-briefs/*.md` | Format consistency, previous change continuity |
| 7 | Research | `context-library/research/*.md` | Customer language, Pain points for talk tracks |
| 8 | Business Info | `context-library/business-info.md` | Company context, product overview |

**ICP Integration (core):**
- ICP Tier 1-3 segments -> Section 3 (Customer Impact) row structure maps directly
- ICP JTBD + Pain Points -> Section 4 (Talk Tracks) conversation context
- ICP Disqualification Criteria -> Section 6 (Objection Handling) defense points
- ICP GTM Implications > Sales -> Sections 4, 6 throughout

**GTM Brief Build-On Logic:**
- GTM Brief exists: Restructure What Changed, Why, FAQ from a sales perspective
- GTM Brief does not exist: Write independently (extract directly from PRD + Strategy)

---

## Step 0: Check Workspace Context

Before asking questions, check what context already exists:

```
Checking related context before drafting the sales brief...

Checking:
- ICP definition (customer segments, JTBD)
- GTM Brief (build on if exists)
- PRD / decision docs
- Pricing/plan info
- Previous Sales Briefs (format consistency)
```

### Context Health Check

After reading context files, show what you found:

```
### Context Found

**ICP-based Customer Segments:**
- [Tier 1-3 segment summary]
- [Key JTBD, Pain Points]

**Change Context:**
- [What changed, from PRD/GTM Brief]
- [Pricing/plan impact]

**Existing GTM Brief:**
- [If exists: filename + content to leverage]
- [If not: standalone mode]

**Additional Info Needed:**
- [Gap list]
```

---

## Step 1: Clarifying Questions

**Adaptive rule:** Check what the PM already provided + workspace context. Skip answered questions.

If the PM provides enough context upfront, skip straight to Step 2.

When starting from scratch:

```
Let's create a sales brief. I'll check workspace context and use templates/sales-brief-template.md as the base.

A few things I need to confirm:

**Changes:**
1. What changed? (feature, pricing, plan, UI, etc.)
2. What's the visible Before/After for customers?

**Customer Impact:**
3. Which customer segments are most affected?
4. Any upsell or conversion angles?

**Pricing/Product:**
5. Any changes to pricing or plan structure? (If none, I'll note "no changes" explicitly)

Share what you have. I'll handle the structure.
```

### Follow-Up Questions

Based on what the PM shares, probe for gaps:

- **Talk track is thin:** "How should sales explain this to customers? If you give me one example in the tone you'd actually use, I'll match it."
- **No expected customer reactions:** "What's the first thing customers will ask about this change? What about negative reactions?"
- **Pricing impact unclear:** "Does this affect existing contracts? Does it change the deal structure for new deals?"
- **No demo info:** "Which screen should be shown when demoing this feature? Which screens should be avoided?"

### What NOT to Ask

- Marketing copy or positioning direction
- Technical implementation details (beyond what sales needs to know)
- Success metrics or experiment design

---

## Step 2: Generate the Brief

Once you have enough context:

```
Enough context gathered. Drafting the brief now:
- 7-section, 3-minute scannable Sales Brief
- Talk tracks in natural conversational tone
- Customer impact by ICP segment + upsell angles
- Pricing/product impact clearly stated (including "no change" where applicable)
- Based on templates/sales-brief-template.md

Saving to outputs/sales-briefs/[date]-[topic].md.
```

### Output Structure

Follow the exact template structure from `templates/sales-brief-template.md`. All 7 sections plus Footer.

Read the template file before generating to ensure you match the current format.

### Writing Guidelines

**Tone:**
- **Conversational first.** Write in the tone sales would actually use with customers.
- Natural, polite language. **Keep tone consistent throughout the entire document. Don't mix formal and informal styles.**
- Write as the PM, not as AI. Use "we" for the company.
- Include specific numbers, names, examples. No generics.

**Section-specific guidance:**

**1. 30-Second Summary** -- Sales should be able to explain this in an elevator in 30 seconds. What changed and why the customer should care. That's it.

**2. Changes (Before/After)** -- Only what's visible to customers. Exclude internal refactoring or backend changes. Table format required. **Time/cost comparisons must use specific numbers.** No vague phrases like "saves time" or "reduces cost." If numbers aren't available, ask the PM.

**3. Customer Impact** -- **Only include customers where this feature is a fit.** Don't list every ICP segment. Pick the segments where this change actually delivers value. Leaving out non-fit customers signals to sales: "don't push this to everyone." Decision criteria: (1) Does this feature directly solve that segment's JTBD or Pain Point? (2) Would that segment realistically use this feature? Only include if both are Yes. Upsell angle should be a one-liner sales can use immediately. **When the PRD has phases/priorities:** Customers who benefit at launch are "fit now"; customers who benefit in the next phase are "fit soon." "Fit soon" customers get a brief row for interest-building only, clearly marked as not active selling targets.

**4. Customer Talk Tracks** -- The most important section. **Write full scripts only for "fit now" customers from Section 3.** "Fit soon" customers get one short interest-building talk track. Don't write talk tracks for non-fit customer scenarios. Use natural language that sounds like a real conversation. Wrap in blockquotes (>) so they're immediately readable. Use ICP Pain Points as conversation openers. **Only promise features confirmed in the PRD scope.** Don't present Phase 2 or unconfirmed features as current benefits -- sales will promise things that don't exist yet.

**5. Pricing/Product Impact** -- The section sales is most sensitive about. State "no changes" explicitly when nothing changed. Cover existing contract impact, new deal structure, discounts/promotions. **Include a pricing framing guide:** A one-line instruction on how sales should frame the price to customers. (e.g., "Don't say 'discount' -- position marketplace pricing as the standard rate")

**6. Objection Handling** -- Focus on customer pushback. Prioritize negative/skeptical questions over positive ones. Use ICP Disqualification Criteria as defense points. Answers in conversational tone. **Must-include objection types:** (1) "We're already doing fine without this -- why do we need it?" (when the change challenges the customer's existing capabilities/pride), (2) "Doesn't [competitor] have this too?", (3) Value-for-money doubts. Experienced customers push back hardest on type 1.

**7. Demo Tips & Resources** -- Which screens to show, what to avoid. Related resource links.

### What to Avoid

- Overly promotional language
- Imperative tone ("Do X") -- not how sales talks to customers
- Excessive technical jargon (keep it at a level customers understand)
- **Internal PM/Product terminology leaking out:** "fake door", "P0/P1", "North Star", "Phase 2 scope" don't belong in sales documents. Convert to sales-friendly language: "coming soon", "included in the next update", "primary segment", "secondary segment"
- **Internal source attribution:** Don't include "per CEO feedback", "according to the PRD", or similar internal references in the output. Reflect the content naturally without citing internal sources
- Empty sections or "TBD" (if no pricing changes, write "No changes")

---

## Step 3: Review and Next Steps

After generating the brief:

```
Sales Brief complete. Saved to outputs/sales-briefs/[filename].md.

Review points:
- Section 4 (Talk Tracks) -- Could you actually say this to a customer?
- Section 5 (Pricing/Product) -- Any missing pricing info?
- Section 6 (Objection Handling) -- Any tougher questions to add?

Let me know what to revise.
```

---

## Iterating on the Brief

Common revision requests:

**"Talk tracks sound unnatural"**
-> More colloquial. Add natural sentence endings. If the PM gives one example, match the tone.

**"Need more granular customer segments"**
-> Pull additional segment info from ICP files and add rows.

**"Pricing section needs more detail"**
-> Add scenarios by deal size, contract length.

**"Not enough objection handling"**
-> Extract additional points from ICP Disqualification Criteria + competitive battlecards.

**"Make it shorter"**
-> Compress talk tracks to 1 key script each, FAQ to Top 3.

---

## Output Quality Self-Check

Before presenting the brief, verify:

- [ ] **All 7 sections filled:** No empty sections
- [ ] **3-minute scannable:** Each section contains only the essentials
- [ ] **Talk tracks are natural conversation:** Could actually be said to a customer
- [ ] **Only fit customers included:** "Fit now" and "fit soon" are distinguished; non-fit customers are excluded. No "this is great for everyone" lists
- [ ] **Pricing/product impact clear:** "No changes" stated explicitly where applicable
- [ ] **Objection handling is defensive:** Negative/skeptical questions prioritized over positive ones
- [ ] **Before/After table is specific:** Time/cost in numbers, no vague "saves time" language
- [ ] **Upsell angles included:** One-liner sales can use immediately
- [ ] **No internal PM terminology:** fake door, P0/P1, North Star, etc. not present in the sales document
- [ ] **No internal source attribution:** "CEO feedback", "per PRD" etc. not in the output body
- [ ] **Demo tips include "screens to avoid":** Unfinished UI or confusing screens called out
- [ ] **Saved to correct location:** `outputs/sales-briefs/[YYYY-MM-DD]-[topic].md`
- [ ] **Sounds human:** Read it aloud -- does it sound natural?
