# PM-OS Starter 온보딩 가이드

> 이 워크스페이스를 처음 쓰는 PM을 위한 가이드. 15분이면 충분합니다.

---

## 1. PM-OS가 뭔가요?

Claude Code 기반의 PM 작업 환경입니다. 슬래시 커맨드(`/prd-draft` 같은)를 치면, AI가 회사 컨텍스트를 자동으로 참고해서 PRD, Sales Brief 등을 작성해줍니다.

**핵심 원리: Context Engineering**
AI에게 "PRD 써줘"라고만 하면 제네릭한 결과가 나옵니다. 하지만 `context-library/`에 회사 정보, 전략 문서, 리서치 결과를 넣어두면, 스킬이 자동으로 참고해서 우리 회사에 맞는 결과를 만들어냅니다.

---

## 2. 시작하기 (5분)

### Step 1: Claude Code 설치
- [Claude Code 설치 가이드](https://docs.anthropic.com/en/docs/claude-code)
- 터미널에서 `claude` 명령어가 동작하는지 확인

### Step 2: 워크스페이스 열기
```bash
cd [PM-OS-Starter 경로]
claude
```

### Step 3: 첫 번째 스킬 실행
```
/prd-draft
```
피처 아이디어를 말해보세요. AI가 회사 맥락을 참조해서 PRD 초안을 작성합니다.

---

## 3. 사용 가능한 스킬 (5개)

| 스킬 | 용도 | 언제 쓰나 |
|------|------|----------|
| `/prd-draft` | PRD 작성 | 새 피처 시작할 때 |
| `/sales-brief` | 세일즈 브리프 | 제품 변경이 고객에게 영향줄 때 |
| `/create-tickets` | Jira 티켓 생성 | PRD → 엔지니어링 티켓 변환 |
| `/generate-ai-prototype` | 프로토타입 프롬프트 | v0/Lovable/Bolt로 빠른 프로토타입 |
| `/ask-nova` | Nova 관점 시뮬레이션 | 산출물을 Nova에게 보내기 전 셀프 점검 |

---

## 4. Context Library 채우기 (가장 중요!)

`context-library/` 폴더에 파일이 많을수록 스킬 결과가 좋아집니다.

### 이미 있는 파일
- `business-info.md` - 회사/제품 개요, 플랜 구조, ICP, 경쟁 환경
- `nova-playbook.md` - Nova의 PM 기준, 리뷰 관점, 코칭 철학
- `nova-prd-review-criteria.md` - PRD 리뷰 체크리스트

### 추가하면 좋은 파일

| 폴더 | 추가할 파일 | 효과 |
|------|-----------|------|
| `strategy/` | ICP 문서, 비전 문서, OKR | `/prd-draft`가 전략 정합성 자동 체크 |
| `prds/` | 완료된 PRD (참고용) | 새 PRD 작성 시 기존 PRD 패턴 참고 |
| `research/` | 유저 인터뷰, 경쟁사 분석 | PRD에 실제 유저 인용구 자동 삽입 |

**Tip:** 파일을 context-library/에 넣기만 하면 됩니다. 스킬이 알아서 찾아 씁니다.

---

## 5. Outputs 폴더 구조

스킬이 생성하는 모든 파일은 `outputs/`에 저장됩니다.

```
outputs/
├── prds/           ← /prd-draft 결과
├── analyses/       ← 분석 문서
├── sales-briefs/   ← /sales-brief 결과
└── prototypes/     ← /generate-ai-prototype 결과
```

파일명 규칙: `[YYYY-MM-DD]-[topic-kebab-case].md`

---

## 6. MCP 연동 (선택사항)

MCP를 연결하면 실시간 데이터를 스킬에서 활용할 수 있습니다.

| MCP | 효과 |
|-----|------|
| **Jira** | `/create-tickets`가 Jira에 직접 티켓 생성 |
| **Slack** | 브리프를 Slack 채널에 공유 |
| **Google Calendar** | 스프린트 일정 자동 파악 |
| **Superset** | 대시보드 데이터 참조 |

MCP 없어도 모든 스킬은 동작합니다. context-library/ 파일을 기반으로 fallback합니다.

---

## 7. Agent Teams (가상 리뷰 팀)

PRD를 여러 관점에서 리뷰받고 싶을 때, Claude Code가 가상 리뷰어를 생성합니다.

```
이 PRD를 엔지니어, 디자이너, 경영진 관점에서 리뷰해줘
```

Agent Teams가 활성화되어 있어서 별도 설정 없이 사용 가능합니다.

---

## 8. 추천 워크플로우

### 새 피처 시작
1. `/prd-draft` → PRD 초안
2. `/ask-nova` → Nova 관점 셀프 점검
3. Agent Teams로 리뷰
4. `/create-tickets` → 엔지니어링 티켓
5. `/generate-ai-prototype` → 빠른 프로토타입

### 릴리즈 전
1. `/sales-brief` → 세일즈팀 브리프

---

## 9. 피드백 & 개선

`feedback/` 폴더에 스킬 사용 후 피드백을 남겨주세요.

예시:
- "prd-draft 스킬에서 AS-IS 구조도를 더 자세히 써줬으면 좋겠다"
- "새로운 스킬 아이디어: /sprint-retro"

파일명: `feedback/[YYYY-MM-DD]-[topic].md`

이 피드백이 PM-OS를 개선하는 데 직접 반영됩니다.

---

## 10. FAQ

**Q: context-library/ 파일을 수정해도 되나요?**
A: 네. 정보가 업데이트되면 수정하세요. 스킬이 항상 최신 파일을 읽습니다.

**Q: 새로운 스킬을 만들 수 있나요?**
A: 네! `.claude/skills/[skill-name]/SKILL.md` 파일을 만들면 됩니다. 기존 스킬을 참고해서 만들어보세요. Anthropic 공식 스킬 `anthropics-skill-creator`를 설치하면 스킬 생성, 수정, 성능 테스트까지 도와줍니다. 설치: `claude install anthropics/skill-creator`

**Q: outputs/ 파일이 쌓이면 어떻게 하나요?**
A: 완료된 작업물은 `context-library/`로 옮기면 다음 스킬 실행 시 참고 자료로 활용됩니다.

**Q: 여러 명이 같은 워크스페이스를 쓸 수 있나요?**
A: 각자 복사본을 만들어서 쓰는 걸 권장합니다. context-library/는 공유하되, outputs/는 개인별로.

---

> **시작이 반이다.** 일단 `/prd-draft`부터 써보세요. 한 번 써보면 감이 옵니다.
