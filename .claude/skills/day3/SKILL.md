---
name: day3
description: PM-OS 온보딩 Day 3 - 맥락 채우기. PM-OS가 나에 대해 알아가는 인터뷰.
user-invocable: true
modifies-workspace: true
---

# Day 3: 맥락 채우기

> 소요 시간: 30-40분
> 배우는 것: Context Engineering의 힘. 개인 맥락이 채워지면 모든 스킬의 결과가 달라진다.

---

## 오늘 할 것

PM-OS의 진짜 힘은 **Context Engineering**입니다.
`context-library/`에 맥락이 채워질수록 모든 스킬의 output이 좋아집니다.

오늘은 PM-OS가 **나에 대해** 물어봅니다. 이 인터뷰가 끝나면 PM-OS가 나를 이해하고,
/prd-draft, /status-update 같은 스킬이 "내 스타일"로 결과를 만들어냅니다.

---

## 실습 1: "나에 대해 알려주기" 인터뷰 (20분)

아래 질문들에 답해주세요. 길게 쓸 필요 없습니다. 평소 쓰는 말투로 편하게.
대화하듯 답하면 됩니다. Claude가 후속 질문을 할 수 있습니다.

### 질문 1: 역할과 담당 범위
"어떤 제품/서비스를 담당하고 있나요? 주로 어떤 의사결정을 하나요?"

### 질문 2: 업무 스타일
"문서 중심인가요, 대화 중심인가요? 빠른 의사결정 쪽인가요, 숙고형인가요? 선호하는 커뮤니케이션 방식은?"

### 질문 3: 의사결정 기준
"PRD나 기획서 리뷰할 때 가장 먼저 보는 것은? 좋은 결과물의 기준은 뭔가요?"

### 질문 4: 주요 이해관계자
"누구와 가장 많이 협업하나요? 상위 의사결정자는 누구인가요? 각 사람의 특징이 있다면?"

### 질문 5: 현재 집중 영역
"이번 분기(또는 반기)에 가장 중요한 이니셔티브는 뭔가요? 왜 그게 중요한가요?"

### 질문 6: 글쓰기 스타일
"평소 문서 쓰는 톤이 어떤가요? 예시 문서가 있으면 공유해주세요."

---

### 인터뷰 처리 방법 (Internal - for Claude)

사용자의 답변을 바탕으로 아래 파일들을 `context-library/personal/` 하위에 자동 생성한다:

**1. `context-library/personal/working-preferences.md`**
```markdown
# Working Preferences

## Role & Scope
[질문 1 답변 기반]

## Working Style
[질문 2 답변 기반]

## Decision Criteria
[질문 3 답변 기반 - PRD 리뷰 기준, 좋은 결과물 기준]

## Writing Style
[질문 6 답변 기반]

## Communication Preferences
[질문 2에서 추출한 커뮤니케이션 선호]
```

**2. `context-library/personal/stakeholder-map.md`**
```markdown
# Key Stakeholders

[질문 4 답변 기반 - 이름, 역할, 특징, 커뮤니케이션 스타일]

| Name | Role | Relationship | Notes |
|------|------|-------------|-------|
| [Name] | [Role] | [협업 빈도/방식] | [특징, 선호] |
```

**3. `context-library/personal/current-focus.md`**
```markdown
# Current Focus

## This Quarter's Top Priorities
[질문 5 답변 기반]

## Why These Matter
[질문 5에서 추출한 이유/맥락]
```

파일 생성 후 사용자에게 확인:
```
인터뷰 완료! 아래 파일이 생성되었습니다:

- context-library/personal/working-preferences.md
- context-library/personal/stakeholder-map.md
- context-library/personal/current-focus.md

내용을 확인해보시고, 수정할 부분이 있으면 말씀해주세요.
이 파일들이 있으면 /prd-draft, /status-update, /slack-message 등
모든 스킬이 당신의 스타일과 맥락에 맞게 결과를 만들어냅니다.
```

---

## 실습 2: Before/After 비교 (10분)

이제 Context가 채워졌으니, 차이를 체감해봅니다.

```
/prd-draft

[아무 피처 아이디어를 말해보세요]
예: "사용자가 리포트를 자동으로 스케줄링할 수 있는 기능"
```

**주목할 점:**
- 인터뷰에서 말한 **의사결정 기준**이 PRD에 반영되는가?
- **이해관계자** 이름이 Review 섹션에 나오는가?
- **현재 집중 영역**과의 전략 정합성이 체크되는가?
- **글쓰기 톤**이 나와 비슷한가?

> Day 1에서 MCP 없이 /daily-plan 쳤을 때 vs 연결 후의 차이를 기억하시죠?
> 그것처럼, context-library가 채워지면 모든 스킬의 결과가 한 단계 올라갑니다.

---

## 오늘 배운 것

- **Context Engineering** = PM-OS의 핵심. 맥락이 많을수록 output이 정확해진다
- **개인 맥락 파일** = 내 업무 스타일, 이해관계자, 집중 영역이 모든 스킬에 반영됨
- **context-library/ 채우기** = 지금부터 전략 문서, PRD, 리서치 결과를 넣으면 계속 좋아짐

### context-library 더 채우기 (선택)

시간이 있다면:
- `context-library/strategy/`에 OKR, 분기 목표 문서 추가
- `context-library/prds/`에 완료된 PRD 추가
- `context-library/research/`에 유저 리서치 추가

**파일을 넣기만 하면 됩니다.** 스킬이 알아서 찾아 씁니다.

---

## 내일: /day4

내일은 **파워유저**가 됩니다:
- `/weekly-plan` + `/weekly-review` 주간 루틴
- 커스텀 스킬 만들기
- 전체 워크플로우 조합

**내일 `/day4`를 실행하세요.**
