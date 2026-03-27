---
name: start
description: PM-OS 첫 시작. MCP 연결 → 첫 경험 → 온보딩 안내까지 한번에.
user-invocable: true
modifies-workspace: true
---

# `/start` - PM-OS 시작하기

PM-OS를 처음 쓰는 사람을 위한 원스톱 온보딩. MCP 도구를 연결하고, 바로 첫 결과물을 만들어본다.

## Quick Start

```
/start        → 전체 온보딩 (MCP 연결 + 첫 경험 + 안내)
```

**소요 시간:** 15-20분
**결과:** MCP 3개 연결 + 오늘의 Daily Plan 생성 + 4-Day 온보딩 안내

---

## 온보딩 플로우

### Phase 1: 환영 + MCP 연결 (10분)

사용자에게 아래와 같이 안내한다:

```
PM-OS에 온 걸 환영합니다!

PM-OS는 캘린더, Slack, Jira 같은 업무 도구와 연결되어 있을 때 가장 강력합니다.
먼저 도구 3개를 연결할게요. 각각 2-3분이면 됩니다.
```

**연결 순서 (이 순서를 따를 것):**

1. **Google Calendar** (가장 먼저 - /daily-plan의 핵심)
   - `claude mcp add google-calendar -- npx -y @anthropic-ai/google-calendar-mcp@latest` 실행 안내
   - 브라우저에서 Google OAuth 인증 진행
   - 연결 확인: 오늘 일정 조회 테스트

2. **Slack** (커뮤니케이션)
   - Claude.ai의 Integrations에서 Slack 연결 또는 MCP 서버 설치 안내
   - 연결 확인: 채널 목록 조회 테스트

3. **Atlassian (Jira/Confluence)** (프로젝트 관리)
   - Claude.ai의 Integrations에서 Atlassian 연결 또는 MCP 서버 설치 안내
   - 연결 확인: Jira 프로젝트 목록 조회 테스트

**MCP 연결 가이드라인:**
- 각 MCP 연결 시 사용자에게 단계별로 안내한다
- 연결이 안 되는 MCP가 있으면 건너뛰고 다음으로 진행한다 ("나중에 /connect-mcps로 언제든 추가할 수 있어요")
- 최소 1개(Google Calendar)만 연결되어도 Phase 2로 넘어간다
- 이미 연결된 MCP가 있으면 건너뛴다

**연결 완료 후:**

```
연결 완료!
- ✅ Google Calendar → 오늘 일정을 자동으로 읽어옵니다
- ✅ Slack → 메시지 초안을 바로 전송할 수 있습니다
- ✅ Jira → 티켓과 스프린트 정보를 참조합니다

이제 PM-OS가 어떻게 동작하는지 바로 보여드릴게요.
```

(연결 못한 항목은 ❌로 표시하고 "나중에 /connect-mcps로 추가 가능" 메모)

---

### Phase 2: 첫 경험 (5분)

**MCP 연결 직후 바로 `/daily-plan` 실행.**

사용자에게 안내:
```
방금 연결한 캘린더 데이터로 오늘의 플랜을 만들어 볼게요.
```

`/daily-plan` 스킬을 실행한다. 이때:
- Google Calendar가 연결되어 있으면 오늘 미팅을 자동으로 가져온다
- Jira가 연결되어 있으면 할당된 티켓도 참조한다
- 결과를 `outputs/daily-plans/` 에 저장한다

**결과물 보여준 후:**

```
이게 PM-OS입니다.
방금 만든 Daily Plan은 캘린더, Jira에서 데이터를 가져와서 만든 거예요.
context-library/에 회사 전략, PRD, 리서치 결과를 넣으면 더 정확해집니다.

핵심 루틴 두 가지:
- 매일 아침: /daily-plan → 오늘의 우선순위
- 미팅 후: /meeting-notes → 미팅 노트 정리 + 액션아이템
```

---

### Phase 3: 다음 스텝 안내

```
PM-OS는 4일이면 파워유저가 됩니다.

📅 Day 1: /day1 → 도구 연결 + 핵심 스킬 실습 (오늘 이미 시작!)
📅 Day 2: /day2 → Slack 메시지, 주간보고, 액션아이템
📅 Day 3: /day3 → 나를 알려주기 (PM-OS가 나에 맞게 튜닝됨)
📅 Day 4: /day4 → 주간 루틴 + 커스텀 스킬 만들기

지금 바로 /day1 을 실행해도 좋고, 내일 아침에 시작해도 됩니다.

Tip: /day1은 오늘 한 것과 겹치는 부분이 있어서,
미팅 끝나고 /meeting-notes부터 써보는 것도 좋습니다.
```

---

## 예외 처리

### MCP가 하나도 연결 안 되는 경우

```
MCP 연결이 잘 안 되네요. 괜찮습니다.
PM-OS는 MCP 없이도 동작합니다.

대신 이렇게 해볼게요:
- 가장 최근 미팅 노트나 메모가 있나요? 아무거나 붙여넣어주세요.
```

→ /meeting-notes를 첫 경험으로 대체 실행
→ raw 텍스트 → 구조화된 미팅 노트 생성
→ "MCP를 연결하면 이 결과가 더 좋아집니다. 나중에 /connect-mcps로 추가하세요."

### 이미 MCP가 연결된 사용자

Phase 1의 해당 MCP를 건너뛰고, 연결된 MCP를 활용해 바로 Phase 2로.

### business-info.md가 비어있거나 템플릿 상태인 경우

Phase 2에서 /daily-plan 실행 후:
```
context-library/business-info.md에 회사 정보가 아직 채워지지 않았네요.
괜찮습니다 - Day 3(/day3)에서 PM-OS가 여러분에 대해 물어보고
자동으로 맥락 파일을 만들어줍니다. 그러면 모든 스킬의 결과가 더 좋아져요.
```

---

## Output Quality Self-Check

- [ ] MCP 최소 1개 연결됨 (또는 fallback 실행)
- [ ] 첫 결과물(daily-plan 또는 meeting-notes) 생성됨
- [ ] outputs/ 폴더에 파일 저장됨
- [ ] 4-Day 온보딩 안내 제공됨
- [ ] 사용자가 다음 스텝을 알고 있음
