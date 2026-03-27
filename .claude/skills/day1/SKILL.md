---
name: day1
description: PM-OS 온보딩 Day 1 - 도구 연결하고 바로 쓰기
user-invocable: true
modifies-workspace: true
---

# Day 1: 연결하고 바로 쓰기

> 소요 시간: 30-40분
> 배우는 것: MCP 연결 + /daily-plan + /meeting-notes

---

## 오늘 할 것

PM-OS의 핵심은 **내 업무 도구가 연결되어 있다는 것**입니다.
오늘은 도구를 연결하고, 연결된 데이터로 바로 결과물을 만들어봅니다.

---

## 실습 1: MCP 연결 (10분)

> /start를 이미 실행했다면 MCP가 연결되어 있을 수 있습니다. 연결된 MCP를 확인하고, 안 된 것만 추가하세요.

**연결할 도구 3개:**

### 1. Google Calendar
내 캘린더를 PM-OS가 읽을 수 있게 합니다. /daily-plan의 핵심.

```
claude mcp add google-calendar -- npx -y @anthropic-ai/google-calendar-mcp@latest
```

브라우저에서 Google 인증 → 완료.

**확인:** "오늘 일정 보여줘" 라고 말해보세요. 캘린더 데이터가 나오면 성공.

### 2. Slack
Slack 채널과 메시지를 PM-OS에서 읽고 보낼 수 있게 합니다.

Claude.ai > Settings > Integrations에서 Slack 연결하거나,
`/connect-mcps connect to slack`으로 설정.

**확인:** "Slack 채널 목록 보여줘" 라고 말해보세요.

### 3. Atlassian (Jira/Confluence)
Jira 티켓과 Confluence 문서를 PM-OS에서 참조합니다.

Claude.ai > Settings > Integrations에서 Atlassian 연결하거나,
`/connect-mcps connect to atlassian`으로 설정.

**확인:** "Jira 프로젝트 목록 보여줘" 라고 말해보세요.

> 연결이 잘 안 되는 도구가 있으면 건너뛰세요. 나중에 `/connect-mcps`로 언제든 추가할 수 있습니다.

---

## 실습 2: /daily-plan (5분)

MCP가 연결됐으니, 진짜 데이터로 오늘의 플랜을 만들어봅니다.

```
/daily-plan
```

**기대 결과:**
- 오늘 캘린더에서 미팅을 자동으로 가져옴
- 미팅별 컨텍스트 (참석자, 안건 추정)
- 우선순위가 정리된 오늘의 Top 3
- Jira에서 할당된 티켓 참조 (연결된 경우)

**결과물은 `outputs/daily-plans/`에 저장됩니다.**

> MCP 없이도 동작하지만, 캘린더 데이터가 있을 때와 없을 때의 차이를 느껴보세요.

---

## 실습 3: /meeting-notes (10분)

오늘 미팅이 끝나면 (또는 어제 미팅 노트가 있다면) 바로 써보세요.

```
/meeting-notes

[여기에 미팅 노트를 붙여넣으세요.
 음성 메모 텍스트, 자유 형식 메모, 녹음 전사 등 아무거나 OK.]
```

**기대 결과:**
- 구조화된 미팅 노트 (요약, 결정사항, 액션아이템)
- 각 액션아이템에 오너와 기한 자동 배정
- `outputs/meeting-notes/`에 파일 저장

> **Tip:** 미팅 직후에 바로 쓰는 게 가장 좋습니다. 기억이 생생할 때.

---

## 오늘 배운 것

- **MCP 연결** = PM-OS가 내 실제 데이터를 읽을 수 있게 하는 것
- **/daily-plan** = 매일 아침 루틴. 캘린더 + Jira 기반 우선순위
- **/meeting-notes** = 미팅 후 루틴. raw 노트 → 구조화된 결과물

---

## 내일: /day2

내일은 **커뮤니케이션** 스킬을 배웁니다:
- `/slack-message` → Slack에 바로 보낼 수 있는 메시지 작성
- `/status-update` → Jira 데이터가 반영된 주간보고
- `/action-items` → 미팅 노트에서 체크리스트 추출

**내일 아침에 `/day2`를 실행하세요.**
