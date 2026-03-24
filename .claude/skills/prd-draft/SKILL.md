---
name: prd-draft
description: Create a modern, AI-era PRD for features and initiatives. Guides through clarifying questions, generates draft, and offers multi-agent review.
disable-model-invocation: false
user-invocable: true
---

## Quick Start

**What to provide:** A feature idea, problem statement, or rough brief. Can be detailed or rough.

```
/prd-draft                                → Start from scratch with guided questions
/prd-draft [paste your feature idea]      → I'll skip questions you already answered
/prd-draft --stage "team kickoff"         → Set the PRD stage upfront
/prd-draft --ai                           → Include AI behavior specification sections
```

**What you get:** A 1-2 page modern PRD with problem, hypothesis, strategic fit, non-goals, success metrics, rollout plan, and optional behavior examples. Saved to `outputs/prds/[feature-name-kebab-case]-[stage].md`. Based on `templates/prd-template.md`.

**Time:** 10-20 minutes for first draft. Then iterate.

**Filename convention:** `[feature-name-kebab-case]-[stage].md` (e.g., `voice-task-capture-team-kickoff.md`)

---

# /prd-draft - Modern PRD Creation

When the PM types `/prd-draft`, guide them through creating a modern, AI-era PRD.

## Context Routing Logic (Internal - for Claude)

**Automatic Context Checks:**
When this skill is invoked, immediately check:

| Source | Files/Folders | Search Terms | What to Extract |
|--------|---------------|--------------|-----------------|
| ICP | `context-library/strategy/*.md` | target user, segment | Target user definition, Tier structure, JTBD, Pain Points |
| Strategy Docs | `context-library/strategy/*.md` | feature name from chat | Strategic pillar alignment |
| Related PRDs | `context-library/prds/*.md` | feature dependencies | Related features and cross-functional impact |
| User Research | `context-library/research/*.md` | problem related to feature | User pain points, quotes, validation |
| Business Model | `context-library/business-info.md` | pricing, revenue, metrics | Revenue impact, North Star alignment |
| Competitor Analysis | `context-library/research/competitive-*.md` | feature name | Competitive positioning if relevant |

**Context Priority:**
1. Strategic fit and related PRDs FIRST
2. User research and problem statement SECOND
3. Business context and metrics THIRD
4. Competitive positioning FOURTH

**Cross-Skill Links:**
- If PRD is approved → `/create-tickets` to break into engineering tickets
- If GTM needed → `/sales-brief` for sales enablement
- If visualization needed → `/generate-ai-prototype` for prototype
- After meetings about the PRD → capture feedback and update the PRD
- If stuck on a section → reference `context-library/nova-playbook.md` for Nova's review criteria

---

## Step 0: Understanding Your Feature Context

Before we draft, let me check what context exists...

**Checking:**
- `context-library/prds/` for any related feature PRDs
- `context-library/strategy/` for strategic alignment
- `context-library/research/` for user validation
- `context-library/business-info.md` for business context

### Context Health Check

After reading context files, verify they contain real data (not placeholder brackets):

**If `business-info.md` contains unfilled placeholders** (e.g., `[Your Company]`, `[Your Product]`):
```
I notice your business context hasn't been filled out yet. Your PRD will be much stronger with real company context.

Want to:
1. **Fill it out now** (5 min) - I'll ask you the key questions
2. **Proceed without it** - I'll draft the PRD but flag where company context would improve it
```

**If strategy docs are empty/missing:**
Flag this and ask the PM to fill in strategy context first.

**Based on what I find, I'll show you:**

### What We Know About This Feature

**Strategic Context:**
- [Which strategic pillar does this support? From your strategy doc]
- [Expected user impact: # of users affected]
- [Business outcome: revenue, retention, or engagement impact]

**User & Problem Validation:**
- [User research confirming this problem: quotes, frequency]
- [Current workaround: how users solve this today]
- [Problem severity: pain level from research]

**Feature Dependencies:**
- [Related features: what needs to ship first]
- [Cross-functional impact: which teams are involved]
- [Timing constraints: market window, competitive pressure]

### PM-Specific Diagnosis Questions

1. **Problem Validation:** Is this problem validated with real users, or hypothesis?
2. **Strategic Clarity:** Do you know how this fits into your quarterly roadmap?
3. **Scope Clarity:** Is this a small v1 or full-featured release?
4. **Success Metrics:** Do you know what success looks like?
5. **Execution Readiness:** Do engineering and design understand the scope?

---

## When to Use

- Starting a new feature or initiative
- Need to align cross-functional stakeholders
- Moving from prototype to formal spec
- Preparing for planning/prioritization review

## How It Works

This is a 3-step conversational workflow:

### Step 1: Clarifying Questions
### Step 2: Generate First Draft
### Step 3: Agent Teams Review

---

## Step 1: Clarifying Questions

**Adaptive Questions Rule:** Before asking clarifying questions, check what the PM has already provided in their prompt. Skip questions that are already answered. Start with: "Based on what you shared, I have [X, Y, Z]. Let me confirm: [summary]. A few remaining questions: [only the gaps]."

If the PM provided a detailed brief, you may have enough to skip straight to Step 2. Only ask what's genuinely missing.

When the PM types `/prd-draft` with no additional context, start with:

```
Let's create a modern PRD together. I'll reference your company context and PRD template from this workspace.

Before I draft anything, I need to understand the initiative. Don't worry about structure, just talk through it. Use dictation if that's easier.

**Required context:**
1. What problem are we solving? (Be specific about the user pain)
2. What's the hypothesis? (If we build X, then Y will happen because Z)
3. How does this fit our current strategy? (Reference specific goals from business-info.md)
4. What stage is this PRD at? (Team kickoff / Planning review / XFN kickoff / Solution review / Launch readiness / Impact review)

**Important details:**
5. Is this an A/B test or full launch?
6. What are the non-goals? (What are we explicitly NOT doing?)
7. What are the success metrics? (How will we know this worked?)
8. Who are the key stakeholders?

**AI-specific (if applicable):**
9. What are example prompts or user inputs?
10. How should it handle edge cases or weird inputs?
11. What should it NEVER do? (Rejection criteria)

Take your time. I'll ask follow-up questions if needed.
```

### Follow-Up Questions

Based on what the PM shares, ask:

- **If strategy fit is unclear:** "I see this solves [problem], but how does it ladder up to our [specific strategy goal]? Or is this a bet on a new direction?"

- **If non-goals are missing:** "What are we explicitly NOT including in v1? Any trade-offs you're making?"

- **If metrics are vague:** "When you say 'increase engagement,' what's the specific metric? What's the target? What's the guardrail (metric we can't harm)?"

- **If rollout plan is missing:** "Should this be an A/B test first? What's the passing criteria to roll out to everyone?"

- **If AI behavior is unclear:** "Can you give me 3 example inputs: one that should work great, one that's borderline, and one that should be rejected?"

### What NOT to Ask

- Don't ask about technical implementation details yet (that's for engineers)
- Don't ask for exhaustive edge case lists (capture the pattern, not every scenario)
- Don't ask for final copy or UI details (PRD is about "what" not "how exactly")

---

## Step 2: Generate First Draft

Once you have enough context, say:

```
Great, I have enough to draft a first version. This will be:
- Short (1-2 pages max)
- Focused on the key sections for this stage
- At the [STAGE] stage of evolution
- Using your [AUDIENCE] writing style
- Based on templates/prd-template.md

I'll create it now and save it to `outputs/prds/[feature-name-kebab-case]-[stage].md`.

After you review, we can iterate or get multi-perspective feedback.
```

### PRD Structure

**Reference the full template at `templates/prd-template.md`.** Include only sections relevant to the current stage. Use this structure:

```markdown
# [Feature Name]

**Stage:** [Team Kickoff / Planning Review / XFN Kickoff / Solution Review / Launch Readiness / Impact Review]
**Last Updated:** [Date]
**Owner:** [PM Name]
**Status:** [Draft / In Review / Approved]

---

## Problem and Hypothesis

**Problem** (2 sentences max):
[What user pain exists? Be specific about who feels it and how often.]

**Hypothesis:**
**If we** [build X],
**then** [Y will happen],
**because** [Z assumption about user behavior].

**Strategy Fit:**
This supports [specific strategic bet/pillar] because [why now, not later].

**Supporting Evidence:**
- [Data point or user quote]
- [Data point or user quote]

---

## Strategic Fit

**Why this? Why now?**

This supports our [Q# Goal/Strategy] by [specific connection].

**Impact Sizing:**

> Use the 4-step framework: Estimate Usage → Calculate Impact → Identify Risks → Define Takeaways

**Step 1: Estimate Usage (Funnel)**
| Stage | Users | Drop-off Reason |
|-------|-------|-----------------|
| Total users who see feature | [number] | - |
| Users eligible for feature | [number] | [reason for ineligibility] |
| Users who engage | [number] | [why they don't engage] |
| Users who complete action | [number] | [friction points] |

**Step 2: Calculate Impact**
- *Engagement Impact:* [DAU/MAU/Retention change]
- *Top-Line Impact:* [Revenue/GMV change]
- *Bottom-Line Impact:* [Contribution margin/profit change]

**Step 3: Confidence Assessment**
| Assumption | Confidence | Risk Level | De-risking Action |
|------------|------------|------------|-------------------|
| [Key assumption 1] | High/Med/Low | [risk] | [action to validate] |
| [Key assumption 2] | High/Med/Low | [risk] | [action to validate] |

**Summary:**
- Users affected: [number or %]
- Revenue impact: [estimate with confidence level]
- Strategic value: [High/Medium/Low]

**Alternatives Considered:**
- [Alternative A] - Not doing because [reason]
- [Alternative B] - Not doing because [reason]

---

## Scope

**AS-IS vs TO-BE** (ASCII diagram):
> Write the AS-IS based on the actual current product UI, then contrast with TO-BE visually. No guessing -- use real screens or descriptions.

### Key Changes Summary
| Area | AS-IS | TO-BE |
|------|-------|-------|
| [Area] | [Current] | [After change] |

> Detailed Before/After implementation spec: [Implementation Spec link] (written after PRD approval)

### Phase Definition
| # | Feature | Why needed |
|---|---------|------------|
| 1 | [Feature/requirement] | [Why it's needed for hypothesis validation] |
| 2 | [Feature/requirement] | [Why it's needed] |

If phased, define each phase separately (e.g., Phase 1-A, Phase 1-B).

---

## Non-Goals

What we are explicitly NOT doing in v1:
- [Non-goal 1] - [Why it's out of scope]
- [Non-goal 2] - [Why it's out of scope]

**Trade-offs Made:**
- [Trade-off] - [Rationale]

---

## Success Metrics

**Primary Metric:** [Metric name]
- Current: [baseline]
- Target: [goal]
- Timeline: [when we expect to see impact]

**Guardrail Metrics:** (Must not harm)
- [Metric 1]: [acceptable range]
- [Metric 2]: [acceptable range]

**Kill Criteria:**
If [specific condition], we will [rollback plan].

---

## Rollout Plan

**Approach:** [A/B Test / Phased Rollout / Full Launch]

**Phase 1:** [Who gets it first, when]
- Passing criteria: [What has to be true to move to Phase 2]

**Phase 2:** [Expand to, when]
- Passing criteria: [What has to be true to move to Phase 3]

**Rollback Plan:**
If [scenario], we will [specific action].

---

## AI Behavior Contract (AI features only)

> Include for AI/ML features. Delete for non-AI features. See `templates/prd-template.md` Section 3 for the full contract format.

| Dimension | Specification |
|-----------|--------------|
| **Primary Task(s)** | summarize / extract / classify / generate / route |
| **Inputs Available** | [fields, context, tools, RAG sources] |
| **Constraints** | [brand, privacy, compliance] |
| **Disallowed** | [PII echo, policy violations, jailbreak classes] |
| **Latency Budget** | P50: [X]ms / P95: [Y]ms |

**Behavior Examples:**

| Scenario | User Input | Expected Output | Rejection Criteria |
|----------|------------|-----------------|-------------------|
| Happy path | [Example 1] | [What should happen] | N/A |
| Edge case | [Example 2] | [Graceful handling] | N/A |
| Should reject | [Example 3] | [Error/refusal] | [Why rejected] |

---

## Solution Overview (non-AI features only)

> Include for non-AI features. Delete for AI features (use Behavior Contract above).

**User Flow:**
1. [Step 1: User does X]
2. [Step 2: System responds with Y]
3. [Step 3: User completes Z]

**Key Interactions:**
- [Interaction]: [What happens and why]

**Edge Cases:**
- [Edge case]: [How we handle it]

**Mockup/Prototype:** [Link or embed]

---

## Risks and Recovery

| Risk | Detection | Fallback | Kill Switch |
|------|-----------|----------|-------------|
| [Risk 1] | [signal/threshold] | [fallback plan] | [who owns] |
| [Risk 2] | [signal/threshold] | [fallback plan] | [who owns] |

---

## Open Questions

- [ ] [Question 1] - @[stakeholder]
- [ ] [Question 2] - @[stakeholder]

---

## Appendix

[Supporting context, research data, impact sizing detail, alternatives considered, changelog]
```

### Conditional Sections (added by skill based on context)

These sections are not in the template but the skill adds them automatically when the feature warrants it:

**Access Level Section** -- between Scope and Non-Goals
- **When to add:** Features with role-based access control (e.g., Creator/Viewer, Admin/Member)
- **Include:** Permission flow diagram (ASCII), permission matrix table, phase-specific open questions
- **Skip when:** Single role, no access control needed

**Growth Loop / Flywheel Diagram** -- inside Strategic Fit section
- **When to add:** Features with network effects, viral loops, or accumulating value at the core hypothesis
- **Include:** ASCII diagram visualizing the cycle

**MECE Verification for Structure:**
- When proposing sections or IA structures, verify they are on the same axis (don't mix verbs and nouns at the same level)
- Example: "AI Conversation (action) / Data Source (content) / Output (content)" is not MECE -- separate into content layers + tool layer

### Writing Guidelines for the Draft

**Tone:**
- Use the appropriate writing style from `context-library/writing-style-*.md`
- Write like the PM would write (human, not AI-generated)
- Be direct and crisp

**Content:**
- Use exact quotes from user research when available
- Reference specific data from `context-library/business-info.md`
- Call out stakeholders by name
- Flag controversial decisions explicitly
- Leadership/executive statements: paraphrase into product team language. Don't quote word-by-word (e.g., write "Company direction is Monetization first" not "CEO said 'This year is about Monetization not AI'"). The person quoted may feel uncomfortable seeing their exact words in a document.

**What to Include:**
- Real user quotes (from research): "I'm frustrated when..."
- Actual numbers: "47% of users abandon at this step"
- Specific references: "This supports our Q2 goal of [X]"

**What to Avoid:**
- Generic statements: "Users want a better experience"
- Vague goals: "Increase engagement"
- Corporate jargon: "Leverage synergies to unlock value"
- Direct quotes from leadership/executives (paraphrase their direction instead)

---

## Step 2.5: Generate Prototype (Optional)

After drafting the PRD, offer to create a quick prototype:

```
Want me to help you visualize this feature before engineering review?

**The $1-$10-$100 Rule:**
- $1: PM creates napkin sketch → catches issues early
- $10: Designer reworks based on feedback → moderate cost
- $100: Engineering builds wrong thing → expensive waste

Quick prototype options:
1. **Napkin Sketch** - ASCII wireframe right here
2. **v0.dev Prompt** - Generate a prompt for Vercel's v0
3. **Lovable Prompt** - Generate a prompt for Lovable.dev
4. **Figma Description** - Detailed spec for designer handoff
5. **User Flow Diagram** - Step-by-step flow visualization

Which would be helpful?
```

### Prototype Templates

**Napkin Sketch (ASCII):**
```
+-----------------------------+
|  Header / Navigation        |
+-----------------------------+
|                             |
|  [Main Content Area]        |
|                             |
|  +---------+  +---------+  |
|  | Card 1  |  | Card 2  |  |
|  +---------+  +---------+  |
|                             |
|  [ Primary CTA Button ]    |
|                             |
+-----------------------------+
```

**v0.dev / Lovable Prompt Template:**
```
Create a [component type] for [product context].

**User Goal:** [What the user is trying to accomplish]

**Key Elements:**
- [Element 1 with behavior]
- [Element 2 with behavior]
- [Element 3 with behavior]

**Interactions:**
- When user [action], [result]
- When user [action], [result]

**Style:** [Modern/minimal/playful] with [brand colors if known]

**Edge Cases:**
- Empty state: [what to show]
- Error state: [what to show]
- Loading state: [what to show]
```

**User Flow Diagram:**
```
[Entry Point] → [Step 1] → [Decision Point]
                              ↓ Yes      ↓ No
                          [Step 2A]   [Step 2B]
                              ↓           ↓
                          [Success]   [Recovery]
```

---

## Step 3: Agent Teams Review

After generating the draft, offer:

```
First draft created! Saved to `outputs/prds/[feature-name]-[stage].md`.

Want me to review this from multiple perspectives?
- Engineer (technical feasibility, implementation concerns)
- Designer (UX/UI, user experience)
- Executive (strategic alignment, business impact)
- Skeptic (devil's advocate)

Just let me know which perspectives would be helpful.
```

### How to Run Agent Teams Review

Claude Code의 Agent Teams 기능을 사용해서 가상 리뷰어를 생성합니다. Each agent provides a focused review from their domain expertise.

When the PM requests review:

1. **Create virtual reviewers using Agent Teams:**
   ```
   I'll spin up review agents for the perspectives you requested.
   Each agent will review the PRD from their specific domain lens.
   ```

2. **For each reviewer, provide:**
   - What looks good
   - Concerns or risks
   - Suggestions for improvement
   - Clarifying questions

3. **Synthesize at the end:**
   ```
   **Summary of Feedback:**
   - All reviewers agree: [common feedback]
   - Conflicting perspectives: [engineer says X, but designer says Y]
   - Highest priority fixes: [what to address first]

   Want me to update the PRD with this feedback, or would you like to iterate on specific sections?
   ```

---

## Iterating on the PRD

The PM will likely want to refine sections. Common requests:

**"Make the hypothesis stronger"**
→ Add more specific user pain, quantify the problem, tie to data

**"Add more behavior examples"**
→ Create the Good/Bad/Reject table with real scenarios

**"The non-goals aren't clear"**
→ Make them more specific, add rationale for each

**"This needs to be shorter"**
→ Move supporting details to Appendix, tighten language

**"Make it sound more like me"**
→ Reference their writing style, use their voice patterns

---

## Stage-Specific Length Guidance

Match document length to stage. Shorter is always better -- expand only as the initiative matures.

| Stage | Word Count | Focus | What to Skip |
|-------|-----------|-------|--------------|
| Team Kickoff | 300-500 words | Problem, hypothesis, high-level approach | Detailed metrics, rollout plan |
| Planning Review | 500-800 words | Strategic fit, impact sizing, alternatives | Detailed behavior examples |
| XFN Kickoff | 800-1200 words | Aligned solution, initial data, mockups | Deep edge cases |
| Solution Review | 1000-1500 words | In-depth justification, edge cases, behavior | Nothing -- this is the full spec |
| Launch Readiness | 1500-2000 words | Final details, rollback, kill criteria, go/no-go | Problem exploration (decided already) |
| Impact Review | 500-800 words | Results vs. targets, learnings, next steps | Future roadmap detail |

**Rule of thumb:** If the PRD exceeds the word count for its stage, move supporting details to the Appendix.

---

## Stage-Specific Adjustments

### Team Kickoff Stage
- Focus on: Problem, hypothesis, high-level approach
- Skip: Detailed metrics, rollout plan
- Include: Lots of open questions

### Planning Review Stage
- Focus on: Strategic fit, impact sizing, alternatives considered
- Include: Rough success metrics, estimated effort
- Skip: Detailed behavior examples

### XFN Kickoff Stage
- Focus on: Aligned solution, initial data/research
- Include: Mockups or prototype link
- Add: Stakeholder sign-offs needed

### Solution Review Stage
- Focus on: In-depth justification, edge cases, behavior examples
- Include: Detailed metrics, rollout plan
- Add: Technical feasibility assessment

### Launch Readiness Stage
- Focus on: Final details, rollback plan, kill criteria
- Include: Go/no-go checklist
- Add: Launch communication plan

### Impact Review Stage
- Focus on: Results, learnings, next steps
- Include: Actual vs. target metrics
- Add: What we'd do differently

---

## Tips for Great PRDs

**Keep gossiping to me:**
After stakeholder meetings, user research, or team discussions, tell me what happened. I'll help keep the PRD updated with:
- New insights
- Changed requirements
- Stakeholder concerns
- Shifted priorities

**Use dictation:**
Talking is faster than typing. Just ramble about the feature and I'll structure it.

**Don't aim for perfect:**
PRDs evolve. Ship the draft, get feedback, iterate.

**Add real examples:**
The best PRDs have real user quotes, actual data, and concrete examples.

**Make it yours:**
Customize the template for your company. Add sections that matter to your team.

---

## Common Pitfalls to Avoid

- **Too long** - If it's over 2 pages, move details to Appendix
- **Too generic** - Use specific data, quotes, and stakeholders
- **No non-goals** - Always clarify what you're NOT doing
- **Vague metrics** - "Increase engagement" is not specific enough
- **No rollout plan** - A/B test vs full launch matters
- **Missing kill criteria** - How will you know if this failed?
- **Sounds like AI** - Write like a human, not a chatbot

---

## After the PRD is Done

```
Great work! Your PRD is ready for review.

**Next steps:**
1. Share with stakeholders for feedback
2. Walk through it in your XFN kickoff
3. Update it as you learn more (gossip to me!)
4. Move it to the next stage when ready

**Want me to:**
- `/create-tickets` -- Turn this PRD into engineering tickets
- `/sales-brief` -- Create a sales enablement brief from this PRD
- `/generate-ai-prototype` -- Create a prototype prompt from this spec
```

---

## Output Quality Self-Check

Before presenting the PRD draft to the PM, verify:

- [ ] **Filename follows convention:** `[feature-name-kebab-case]-[stage].md` (e.g., `voice-task-capture-team-kickoff.md`)
- [ ] **Saved to correct location:** `outputs/prds/` (NOT `context-library/prds/`)
- [ ] **Word count matches stage:** Check against the Stage-Specific Length Guidance table
- [ ] **Hypothesis is testable:** Contains a clear "If we... then... because..." statement
- [ ] **Strategic fit references actual strategy:** Cites specific goals from `context-library/strategy/`, not generic strategy language
- [ ] **Non-goals are specific:** Each non-goal explains WHY it's excluded, not just what it is
- [ ] **Success metrics have baselines and targets:** Not just "increase X" but "X from [current] to [target] by [date]"
- [ ] **Kill criteria are realistic:** Would the team actually pull the plug at this threshold?
- [ ] **Behavior Examples vs Solution Overview:** AI features have the behavior table; non-AI features have the solution overview
- [ ] **Sounds human:** Read it aloud -- does it sound like the PM wrote it, or like an AI generated it?
- [ ] **User quotes included:** If user research exists in `context-library/research/`, at least one real quote is referenced
- [ ] **Open questions have owners:** Every open question has a @stakeholder assigned

---

**Remember:** The PRD is a tool for alignment, not a work of art. Ship it, discuss it, iterate on it.
