---
name: meeting-cleanup
description: Batch process multiple meetings from a single day. Consolidates action items and insights across meetings.
disable-model-invocation: false
user-invocable: true
---

## Quick Start

Upload or paste all of today's meeting transcripts, and I'll:
1. Summarize each meeting in 3 bullets
2. Extract all decisions and action items with owners
3. Deduplicate action items across meetings
4. Flag conflicts and cross-meeting patterns
5. Create a single consolidated action item list

**Shortcut:** Just paste your transcripts and say `/meeting-cleanup` -- I'll handle the rest.

---

# Meeting Day Cleanup Workflow

Process all your meetings in one batch at the end of the day using AI.

## Context Routing Logic (Internal - for Claude)

**Automatic Context Checks:**
When this skill is invoked, immediately check:

| Source | Files/Folders | Search Terms | What to Extract |
|--------|---------------|--------------|-----------------|
| Business Info | `context-library/business-info.md` | company, product, team | Company context for interpreting discussions |
| Stakeholder Profiles | `context-library/stakeholders/*.md` | attendees' names | Communication preferences, roles, decision authority |
| Active PRDs | `context-library/prds/*.md` | features discussed | Link action items to active PRDs |
| Previous Meetings | `context-library/meetings/*.md`, `outputs/meeting-notes/` | same meeting name, same attendees | Carry-over items, open questions from last time |
| Strategy | `context-library/strategy/*.md` | strategic pillars, OKRs | Align decisions to strategic context |
| Decisions | `context-library/decisions/*.md` | related decisions | Check for conflicts with past decisions |

**Context Priority:**
1. Previous meeting notes for same recurring meetings FIRST
2. Active PRDs and strategy docs SECOND
3. Stakeholder profiles THIRD
4. Business info for general context FOURTH

---

## Workflow

### Step 1: Gather All Meeting Transcripts

사용자에게 오늘 미팅 노트를 모두 붙여넣거나 업로드하도록 안내한다.

- Otter.ai, Clova Note, Zoom, Meet, Teams 등 어디서든 가져올 수 있음
- 텍스트 파일, 복사-붙여넣기, 파일 업로드 모두 OK

### Step 2: Batch Process (10 min)

각 미팅에 대해:
1. Summary (3 bullets)
2. Decisions made
3. Action items (with owners)
4. Open questions
5. Follow-up needed

### Per-Meeting Quality Checks

각 미팅 처리 후 검증:

1. **모든 결정에 오너가 있는가** -- 오너 없으면 플래그
2. **모든 액션아이템에 기한이 있는가** -- 없으면 합리적 기한 제안 후 플래그
3. **미팅 간 중복 액션아이템 없는가** -- 중복이면 하나로 합치고 출처 표기
4. **미팅 간 상충되는 결정 없는가** -- 있으면 명시적으로 플래그
5. **전략 정합성 체크** -- context-library/strategy/ 참조

### Step 3: Update Systems (5 min)

- [ ] Jira/Linear에 액션아이템 추가 (MCP 연결 시 자동)
- [ ] 팔로업 미팅 캘린더에 등록
- [ ] 필요한 곳에 요약 공유
- [ ] 프로젝트 문서 업데이트

---

## Template Output

```markdown
# Meeting Cleanup - [Date]

## Quick Stats
- Meetings attended: [X]
- Total time in meetings: [Y hours]
- Action items generated: [Z]

## Meeting 1: [Title] ([Time])
**Attendees:** [Names]
**Summary:** [3 bullets]
**Decisions:**
- [Decision 1]
- [Decision 2]

**Action Items:**
- [ ] [Action] - Owner: [Name] - Due: [Date]

**Follow-up:** [Schedule next meeting? Send docs?]

---

[Repeat for each meeting]

---

## My Action Items (Consolidated)
1. [ ] [Action from Meeting 1]
2. [ ] [Action from Meeting 3]

## Waiting On Others
1. [Name] to [action] by [date]

## Parking Lot (Questions/Ideas)
- [Question raised but not resolved]

---

## Cross-Meeting Intelligence

### Recurring Topics
- **[HIGH]** [Topic] came up in [Meeting 1] and [Meeting 3]
- **[NORMAL]** [Topic] mentioned in [Meeting 2]

### Stakeholder Load
| Person | Action Items | Meetings Involved |
|--------|-------------|-------------------|
| [Name] | [Count] | [Meeting list] |

**Overloaded?** 5+ 액션아이템이면 플래그.

### Timeline Conflicts
- [Name] has items due [Date A] (from Meeting 1) and [Date A] (from Meeting 3) -- both achievable?

### Decisions Summary
| Decision | Made In | Owner | Strategic Alignment |
|----------|---------|-------|-------------------|
| [Decision] | [Meeting] | [Name] | [Pillar/OKR] |

### Cross-Meeting Conflict Detection
- **Timeline conflicts:** Meeting A says "2 weeks" vs Meeting B says "3 weeks"
- **Scope conflicts:** Feature scope expanded without noting the change
- **Owner conflicts:** Same task assigned to different people
- **Priority conflicts:** Same feature called different priority levels
```

---

## Output Quality Self-Check

- [ ] 모든 결정에 오너 있음
- [ ] 모든 액션아이템에 기한 있음
- [ ] 중복 액션아이템 없음
- [ ] 상충 결정 플래그됨
- [ ] 전략 정합성 노트됨
- [ ] 크로스미팅 인텔리전스 포함
- [ ] 이전 미팅 맥락 참조됨
- [ ] 통합 액션 리스트 완성됨
- [ ] 파킹랏 캡처됨
- [ ] `outputs/meeting-notes/cleanup-[date].md`에 저장됨
