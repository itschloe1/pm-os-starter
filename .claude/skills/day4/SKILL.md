---
name: day4
description: PM-OS 온보딩 Day 4 - 파워유저. 주간 루틴 + 커스텀 스킬.
user-invocable: true
---

# Day 4: 파워유저

> 소요 시간: 30-40분
> 배우는 것: 주간 루틴 + context-library 확장 + 커스텀 스킬

---

## 오늘 할 것

4일간의 온보딩 마지막 날입니다.
오늘은 **주간 루틴**을 세팅하고, PM-OS를 **나만의 방식으로 확장**하는 법을 배웁니다.

---

## 실습 1: /weekly-plan (10분)

매주 월요일 아침에 쓰는 스킬. 이번 주 우선순위를 잡아줍니다.

```
/weekly-plan
```

**기대 결과:**
- 이번 주 Top 3 priorities
- 캘린더에서 주요 미팅 자동 가져오기
- 전략 목표 대비 이번 주 할 일 정렬
- Jira 스프린트 연동 (연결된 경우)
- `outputs/weekly-plans/`에 저장

---

## 실습 2: /weekly-review (10분)

매주 금요일에 쓰는 스킬. 한 주를 돌아봅니다.

```
/weekly-review
```

**기대 결과:**
- Plan vs Actual 비교 (이번 주 계획 대비 실제)
- 이번 주 미팅 노트에서 핵심 결정사항 종합
- 잘한 것 / 개선할 것 / 다음 주에 이어갈 것
- 주간 보고에 바로 쓸 수 있는 포맷
- `outputs/weekly-reviews/`에 저장

**주간 루틴 조합:**
```
월요일 아침: /weekly-plan → 이번 주 우선순위
매일 아침:   /daily-plan  → 오늘 우선순위
미팅 후:     /meeting-notes → 정리 + 액션아이템
금요일:      /weekly-review → 회고
금요일:      /status-update → 스테이크홀더 보고
```

---

## 실습 3: context-library 확장 (10분)

PM-OS의 진짜 파워는 `context-library/`가 풍성해질수록 나옵니다.

**지금 넣으면 좋은 것들:**

| 폴더 | 넣을 파일 | 효과 |
|------|----------|------|
| `strategy/` | OKR, 분기 목표, 비전 문서 | /prd-draft가 전략 정합성 자동 체크 |
| `prds/` | 완료된 PRD | 새 PRD 작성 시 톤, 구조 참고 |
| `research/` | 유저 인터뷰, 경쟁사 분석 | PRD에 실제 유저 인용구 자동 삽입 |
| `metrics/` | 핵심 지표, 대시보드 매핑 | /status-update, /weekly-review에 지표 반영 |
| `meetings/` | 중요 미팅 기록 | 결정 맥락 참조 |
| `decisions/` | 과거 의사결정 로그 | 새 결정 시 일관성 유지 |

**파일을 넣기만 하면 됩니다.** 형식은 자유. 스킬이 알아서 찾아 씁니다.

> **Tip:** 완벽하지 않아도 괜찮습니다. 하나씩 넣어가면 됩니다.
> 가장 임팩트 큰 순서: strategy/ → prds/ → research/

---

## 보너스: 커스텀 스킬 만들기

PM-OS의 스킬은 마크다운 파일입니다. 나만의 스킬을 만들 수 있습니다.

### 만드는 법

1. `.claude/skills/[skill-name]/SKILL.md` 파일 생성
2. 아래 구조를 따라 작성:

```markdown
---
name: my-custom-skill
description: 이 스킬이 하는 일을 한 줄로
user-invocable: true
---

# 스킬 이름

## Quick Start
[사용법]

## Workflow
[Claude가 따라야 할 단계]

## Template Output
[결과물 형식]
```

3. Claude Code 재시작하면 `/my-custom-skill`로 사용 가능

### 예시 아이디어

- `/sprint-retro` → 스프린트 회고 자동화
- `/competitor-watch` → 매주 경쟁사 모니터링
- `/1on1-prep` → 1:1 미팅 준비 노트
- `/release-notes` → 릴리즈 노트 자동 생성

> 스킬 만들기가 어렵다면 `claude install anthropics/skill-creator`로 스킬 생성 도우미를 설치할 수 있습니다.

---

## 온보딩 완료!

4일 동안 배운 것:

| Day | 테마 | 핵심 |
|-----|------|------|
| Day 1 | 연결하고 바로 쓰기 | MCP 연결 → /daily-plan, /meeting-notes |
| Day 2 | 커뮤니케이션 | /slack-message, /status-update, /action-items |
| Day 3 | 맥락 채우기 | 개인 인터뷰 → context-library → /prd-draft 개인화 |
| Day 4 | 파워유저 | 주간 루틴 + context-library 확장 + 커스텀 스킬 |

### 매일 쓰면 좋은 스킬 Top 3

1. `/daily-plan` → 매일 아침
2. `/meeting-notes` → 미팅 후
3. `/slack-message` → 팀 소통 시

### 가끔 쓰면 좋은 스킬

- `/weekly-plan` + `/weekly-review` → 주간 루틴
- `/prd-draft` + `/prd-review-panel` → 새 피처
- `/meeting-cleanup` → 미팅 많은 날
- `/status-update` → 주간보고
- `/impact-sizing` → 우선순위 논의 전
- `/decision-doc` → 중요한 결정 시

### 더 알고 싶다면

- `docs/onboarding.md` → 전체 스킬 목록과 워크플로우
- `/connect-mcps` → 추가 도구 연결
- 기존 스킬 파일 읽기 → `.claude/skills/[skill-name]/SKILL.md`

---

> PM-OS는 쓸수록 강해집니다. context-library를 채우고, 스킬을 만들고, 루틴을 쌓아가세요.
