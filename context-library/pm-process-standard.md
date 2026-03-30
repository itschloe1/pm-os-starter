# 표준 PM 프로세스

> Discovery부터 론치까지, PM이 챙겨야 할 프로세스 표준.
> 2주 스프린트 (월 2회) 기준. PM-OS 스킬과 연결.

---

## 전체 프로세스 맵

```
Discovery              PRD                설계                개발              검증             론치              사후
────                   ────               ────               ────             ────            ────             ────

 ┌──────────┐    ┌─────────┐    ┌─────────────┐    ┌───────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
 │ 0. Disc- │    │ 1. PRD  │    │ 2. 설계     │    │ 3. 스프린트│    │ 4. 검증  │    │ 5. 론치  │    │ 6. 사후  │
 │   overy/ │───>│   Lock  │───>│   SRS+Figma │───>│   개발     │───>│   QA+    │───>│   배포+  │───>│   임팩트  │
 │   Shaping│    │         │    │             │    │           │    │   보안    │    │   Comms  │    │   리뷰   │
 └──────────┘    └─────────┘    └─────────────┘    └───────────┘    └──────────┘    └──────────┘    └──────────┘
   3~5일          ~1주            ~1주              ~2주 (1sp)        ~1주            D-day          +1w, +4w
                                                  or 4주 (2sp)                                           or 4주 (2sp)

 PM 역할:          PM 역할:           PM 역할:          PM 역할:          PM 역할:         PM 역할:         PM 역할:
 문제 정의          리뷰 취합          SRS/Figma 트래킹  스프린트 플래닝    QA 플랜 확인     론치 계획 정리    메트릭 리뷰
 프로토타입 검증    피드백 반영        Open Q 해소       진행 트래킹       보안 검토 확인    Comms doc        피드백 종합
 PRD 필요성 판단   스코프 확정        요구사항 확정일    블로커 해소       Dogfood 운영     CS 브리핑        Go/Kill 판정
                                     합의                                롤백 계획       MKT 핸드오프     Lessons learned
```

---

## Phase별 상세

### Phase 0: Discovery / Shaping (3~5일)

PRD를 쓸지 말지를 판단하는 단계. "뭘 만들까"가 아니라 "이걸 만들 가치가 있나, 어떤 형태여야 하나"를 검증한다. 스프린트 시작 기준 Week -2.5~-2 에 해당.

```
PM이 해야 할 것                              산출물                    오너
─────────────────                           ─────                    ────
[1] 문제 정의 + 유저 리서치                    리서치 종합 문서           PM
    - 인터뷰, 데이터, CS 피드백 등
    - 해결할 가치가 있는 문제인지 판단
[2] Impact Sizing                            임팩트 사이징 문서         PM
    - 기회의 크기 추정
    - 우선순위 근거 확보
[3] 프로토타입 제작                            프로토타입                PM + UX
    - Experience Layer: UI 플로우, 인터랙션
    - Figma, HTML 목업, 또는 napkin sketch
    - 시스템 전체가 아닌 "사용자가 만지는 부분"만
[4] Constraint Doc 작성                       Constraint Doc (1장)     PM
    - Logic Layer: 권한, 과금, 데이터 모델 규칙
    - "Creator만 생성 가능" 같은 규칙 목록
    - PRD가 아님. 시스템 제약 조건만 나열
[5] 에이전트 UX 시뮬레이션 (1차 검증)                                     PM
    - ICP 페르소나별 반응 시뮬레이션 (Creator, Viewer, 신규 유저 등)
    - 플로우별 예상 반응, 혼란 지점, 이탈 지점 탐지
    - 엣지 케이스 시나리오 (빈 상태, 대량 데이터, 권한 경계 등)
    - 시뮬레이션 결과로 프로토타입 수정 → 빠른 이터레이션
[6] 프로토타입 검증 (2차, 실제 사람)                                       PM
    - 고객/내부 이해관계자에게 프로토타입 시연
    - 피드백 수집 + 방향 확정 or 피봇
[7] PRD 필요성 판단                            Gate 판정                PM
```

**Gate 판정 기준 — PRD가 필요한가?**

핵심 질문: **되돌리기 어렵거나, 정렬이 필요한 이해관계자가 많은가?**

```
프로토타입 + Constraint Doc으로 충분한 경우:        PRD가 필요한 경우:
──────────────────────────────────              ──────────────────
- Experience Layer만 변경                        - Integration Layer 변경 (API 계약, 외부 연동)
- Logic Layer 중 단순 규칙 추가/변경               - Logic Layer 중 구조적 변경
  (기존 권한 모델 내 조건 추가 등)                    (과금 체계 변경, 역할 모델 재설계, 새 권한 체계)
- 기존 데이터 모델 변경 없음                       - 데이터 모델 변경 or 마이그레이션
- 단일 팀 내 작업                                 - 크로스팀 협업 필요
- 롤백이 쉬움 (feature flag)                      - 롤백이 어려움 (DB 스키마, 외부 계약)
```

**B2B SaaS에서의 레이어 구분:**

```
┌─────────────────────────────────┐
│  Experience Layer (프로토타입 O) │  UI, 플로우, 인터랙션, 카피
│  → 프로토타입으로 검증           │  PRD 없이 진행 가능
├─────────────────────────────────┤
│  Logic Layer (Constraint Doc)   │  권한, 과금, 데이터 접근 범위
│  → 규칙 목록 1장이면 충분        │  PRD 불필요, 제약 조건만 명시
├─────────────────────────────────┤
│  Integration Layer (PRD 필요)   │  API 계약, 마이그레이션, SSO
│  → 여러 시스템이 엮임            │  명세 없이 진행하면 사고남
└─────────────────────────────────┘
```

**Definition of Done:**
- [ ] 문제 정의 완료 (해결할 가치 확인)
- [ ] Impact Sizing 완료 (우선순위 근거)
- [ ] 프로토타입으로 방향 검증됨 (고객 or 내부 피드백)
- [ ] Constraint Doc 작성 (Logic Layer 제약 정리)
- [ ] PRD 필요성 판정 완료 → Phase 1로 진행 or 바로 Phase 2(설계)로 스킵

**참조:** `/user-research-synthesis`, `/impact-sizing`, `/prototype`, `/napkin-sketch`, `/interview-guide`, `/simulate-user`

**Phase 0 → Phase 1 스킵 조건:**
Experience Layer만 변경되거나, Logic Layer 변경이 기존 구조 내 단순 규칙 추가/변경 수준인 건은 PRD를 생략하고 Constraint Doc + 프로토타입을 설계 단계의 입력물로 직접 사용할 수 있다. Logic Layer라도 구조적 변경(과금 체계, 역할 모델 재설계 등)이면 PRD가 필요하다. 스킵 시 PM Director에게 사유를 공유한다 (Silence = Approval).

---

### Phase 1: PRD Lock (~1주)

```
PM이 해야 할 것                              산출물                    오너
─────────────────                           ─────                    ────
[1] 리뷰어에게 PRD 배포                       PRD 최종본               PM
[2] 리뷰 피드백 취합 (3일 데드라인)             리뷰 코멘트 종합          PM
[3] 피드백 반영 + 스코프 확정                                          PM
[4] PRD Lock 선언 (팀 공지)                    Lock 공지                PM
    PM Director에게 공유 (24h 이의 없으면 확정)
```

**Definition of Done:**
- [ ] 전 리뷰어 피드백 반영 완료
- [ ] 스코프 (In/Out) 확정
- [ ] 성공 지표 + Kill criteria 정의
- [ ] PM Director에게 공유 완료 (24h Silence = Approval)
- [ ] PRD Stage → "Approved"로 변경

**참조:** `templates/prd-template.md` (Quality Checklist - Launch Readiness Stage)

---

### Phase 2: 설계 - SRS + Figma (~1주)

```
PM이 해야 할 것                              산출물                    오너
─────────────────                           ─────                    ────
[1] PRD Lock을 TL/UX에 공지                                          PM
[2] SRS 업로드 확인 (GitHub)                  SRS (기술 설계서)         TL (GitHub에 올림)
[3] UX에게 Figma 작업 요청                    Figma 디자인             UX
[4] Open Questions 해소 트래킹                                        PM
[5] SRS 내용 확인 (PRD 스코프와 정합)                                   PM
[6] Figma 리뷰 (PM + PM Director)                                    PM
[7] 개발/QA와 요구사항 확정일 합의             요구사항 확정일            PM
[8] 보안 검토 요청 (SecOps)                   보안 검토 결과            SecOps
```

**Definition of Done:**
- [ ] SRS GitHub에 업로드됨 + PRD 스코프와 정합 확인
- [ ] Figma 확정 (PM + UX 합의)
- [ ] 요구사항 확정일 합의 (개발/QA 서명)
- [ ] 보안 검토 시작됨 (완료 아니어도 OK, 병렬)
- [ ] Open Questions 전부 해소 or 해소 계획 있음

**병렬 가능:** SRS(TL이 GitHub에)와 Figma(UX)는 동시 진행. 보안 검토도 병렬.
**PM 역할:** SRS를 직접 작성하거나 트래킹하는 게 아니라, 업로드된 SRS가 PRD 스코프와 맞는지 확인하는 것.

---

### Phase 3: 스프린트 개발 (~2주 or 4주)

```
PM이 해야 할 것                              산출물                    오너
─────────────────                           ─────                    ────
[1] 스프린트 티켓 생성 (Jira)                  Jira 티켓               PM
[2] 스프린트 플래닝 참여                       스프린트 목표             PM + TL
[3] 데일리/주간 진행 트래킹                                            PM
[4] 블로커 해소 (의사결정, 스코프 조정)                                  PM
[5] 중간 데모 확인                                                     PM
[6] 론치 체크리스트 작성 시작                   론치 체크리스트           PM
[7] Analytics instrumentation 확인            이벤트 정의서             PM + Data
```

**Definition of Done:**
- [ ] 스프린트 목표 기능 개발 완료
- [ ] 론치 체크리스트 초안 완성
- [ ] Analytics 이벤트 구현 확인
- [ ] 다음 Phase(검증)에 필요한 환경 준비

**참조:** `/launch-checklist` 스킬로 체크리스트 생성. 이 체크리스트가 Phase 4(검증), Phase 5(론치)의 마스터 트래킹 문서가 된다.

**`/launch-checklist`의 역할:**
- Phase 3에서 초안 생성 → Phase 4의 QA/보안/Dogfood 항목 포함 → Phase 5의 Comms/브리핑 항목까지 커버
- P0(론치 블로커) / P1(해야 함) / P2(nice-to-have) 우선순위 + 오너 + 데드라인
- Critical path 식별: 가장 긴 의존성 체인 + 론치일까지 slack 계산
- 롤백 기준 + Kill criteria 포함

---

### Phase 4: 검증 - QA + 보안 (~1주)

```
PM이 해야 할 것                              산출물                    오너
─────────────────                           ─────                    ────
[1] QA 테스트 플랜 확인                        QA 테스트 결과           QA
[2] 보안 검토 완료 확인                        보안 검토 완료            SecOps
[3] Dogfood 운영 (내부 테스트)                 Dogfood 피드백           PM + 전팀
[4] Dogfood 피드백 트리아지                    수정 목록                PM + Eng
[5] 성능 테스트 확인                                                   Eng
[6] 롤백 계획 확인                             롤백 runbook            Eng + PM
[7] 롤백 기준 확정                                                     PM
[8] Kill criteria 알럿 세팅 확인               대시보드 + 알럿          Data
```

**Definition of Done:**
- [ ] Critical bug 0건
- [ ] 보안 검토 통과
- [ ] 롤백 계획 + 기준 문서화
- [ ] Kill criteria 대시보드 라이브
- [ ] Dogfood 피드백 반영 완료
- [ ] **PM Director 론치 Go/No-Go 승인 (🔒 필수)**

---

### Phase 5: 론치 준비 + 배포 (~1주 + D-day)

```
PM이 해야 할 것                              산출물                    오너
─────────────────                           ─────                    ────

[론치 1주 전]
[1] 론치 계획 정리                             론치 계획서               PM
    - 뭘, 언제, 누구에게, 어떤 순서로
    - 용어 정의
    - 다른 론치와의 순서/경계
[2] 론치 커뮤니케이션 패키지 생성 (/launch-comms)                         PM
    → PRD 입력 1회로 아래 5개 동시 생성:
    ┌─ GTM Brief (Comms doc + MKT 핸드오프)     → MKT
    ├─ Sales Brief                              → Biz 팀
    ├─ CS 브리핑                                → CS 팀
    ├─ 전사 공지                                → #general
    └─ 고객 이메일/인앱 안내 초안                 → 고객
[3] 약관 변경 고지 (해당 시, 14일 전)            고지 내용               Legal + PM

[D-day]
[4] Feature flag 활성화                                                Eng
[5] 실시간 모니터링 시작                                               PM + Data
[6] CS 모니터링                                                       CS
[7] 론치 comms 발송                                                   MKT
```

**Definition of Done:**
- [ ] Comms doc 완성 + MKT 핸드오프
- [ ] CS 브리핑 완료
- [ ] Sales Brief 공유
- [ ] Feature flag on
- [ ] 모니터링 대시보드 라이브

**참조:** `/launch-comms` (5개 문서 동시 생성), `/launch-checklist` (Phase 3에서 시작한 체크리스트로 트래킹), `/status-update`

---

### Phase 6: 사후 - 모니터링 + 임팩트 리뷰

```
PM이 해야 할 것                              산출물                    오너          시점
─────────────────                           ─────                    ────         ────

[T+1주]
[1] 일간 메트릭 리뷰                           메트릭 리포트             PM           매일
[2] 유저 피드백 수집 + 트리아지                  피드백 종합              PM + CS      매일
[3] 버그 트리아지                               수정 목록               PM + Eng     매일
[4] 스테이크홀더 업데이트                        업데이트 메시지           PM           +3일

[T+4주]
[5] Primary Metrics 판정                      임팩트 리뷰 문서          PM
[6] Success criteria 달성 여부                                         PM + Data
[7] **Go/Kill/Iterate 판정 (🔒 PM Director 승인 필수)**                  PM Director
[8] Lessons learned                           회고 문서                PM
[9] V1.1 백로그 정리                           백로그                   PM
[10] 팀 회고                                                          PM
```

**Definition of Done:**
- [ ] Primary Metric 판정 완료
- [ ] **Go/Kill/Iterate 결정 (🔒 PM Director 승인 필수)**
- [ ] Lessons learned 문서화
- [ ] 다음 iteration 백로그 정리

**참조:** `/feature-results`, `/weekly-review` 스킬 활용

---

## 스프린트 캘린더 (2주 기준)

한 기능이 2주 스프린트 1회에 들어갈 때의 이상적 타임라인:

```
Week -2.5~-2   Week -1.5      Week -1        Week 0         Week 1         Week 2         Week 3~4      Week 5~8
──────         ──────         ──────         ──────         ──────         ──────         ──────         ──────
Discovery      PRD Lock       설계            스프린트 시작    스프린트 끝      검증+론치 준비   론치            사후
리서치+사이징   (필요시)       SRS+Figma      개발            개발 완료       QA+Dogfood     D-day          모니터링
프로토타입      리뷰 취합      요구사항 합의   티켓 생성       중간 데모       Comms doc      배포            임팩트 리뷰
검증                                                                       CS 브리핑
                                                                           Sales Brief

PM 집중:       PM 집중:       PM 집중:       PM 집중:       PM 집중:       PM 집중:       PM 집중:       PM 집중:
문제 검증       리뷰 취합      설계 트래킹     플래닝         블로커 해소     론치 계획       실시간 모니터링  메트릭 판정
프로토타입      스코프 확정    Open Q 해소    진행 트래킹     데모 확인       QA 확인        CS 모니터링     Go/Kill
PRD 판정
```

**PRD 스킵 시 (Experience + Logic Layer만 변경):**

```
Week -2.5~-2   Week -1        Week 0         Week 1         Week 2         Week 3~4      Week 5~8
──────         ──────         ──────         ──────         ──────         ──────         ──────
Discovery      설계            스프린트 시작    스프린트 끝      검증+론치 준비   론치            사후
프로토타입      SRS+Figma      개발            개발 완료       QA+Dogfood     D-day          모니터링
+ Constraint   (프로토타입이                                  론치 준비       배포            임팩트 리뷰
  Doc           입력물)
```

대형 기능 (2 스프린트 = 4주):

```
Week -2        Week -1        Week 0~1       Week 2~3       Week 4         Week 5         Week 6~9
──────         ──────         ──────         ──────         ──────         ──────         ──────
PRD Lock       설계            스프린트 1      스프린트 2      검증            론치            사후
               SRS+Figma      개발 Phase 1   개발 Phase 2   QA+Dogfood     D-day          임팩트 리뷰
                              중간 리뷰       최종 개발      론치 준비
```

---

## Phase 간 전환 체크포인트

```
Discovery ─── Gate 0 ────> PRD Lock (or 설계로 스킵)
                           "문제 검증됨, 프로토타입 피드백 확보, PRD 필요성 판정"
                           📢 PM Director 공유 (스킵 시 사유 포함)

PRD Lock ──── Gate 1 ────> 설계
                           "리뷰어 전원 피드백 반영, PM이 Lock 선언"
                           📢 PM Director 공유 (24h Silence = Approval)

설계 ──────── Gate 2 ────> 스프린트
                           "SRS GitHub 업로드 + PRD 정합 확인, Figma 확정, 요구사항 확정일 합의"
                           📢 PM Director 공유

스프린트 ──── Gate 3 ────> 검증
                           "스프린트 목표 기능 완료, 론치 체크리스트 초안"
                           📢 PM Director 공유

검증 ────── Gate 4 ────> 론치
                          "Critical bug 0, 보안 통과, 롤백 계획"
                          🔒 PM Director 론치 Go/No-Go 승인 필수

론치 ────── Gate 5 ────> 사후
                          "배포 완료, 모니터링 라이브, Comms 발송"
                          📢 PM Director 공유

사후 ────── Gate 6 ────> 다음 iteration or Kill
                          "Primary Metric 판정"
                          🔒 PM Director Go/Kill/Iterate 판정 필수
```

---

## PM Director vs PM 역할 구분

**원칙: PM Director는 병목이 되지 않는다.**
- 대부분의 Phase는 PM이 자율 진행. PM Director에게 공유만.
- PM Director가 블로킹하는 건 **되돌리기 어려운 결정** 2가지뿐.
- 나머지는 **Silence = Approval** (24시간 내 이의 없으면 자동 진행)

| Phase | PM이 한다 | PM Director |
|-------|---------|------------|
| Discovery | 문제 정의, 리서치, 임팩트 사이징, 프로토타입 제작+검증, PRD 필요성 판정 | 📢 공유 받음 (PRD 스킵 시 사유 포함, Silence = Approval) |
| PRD Lock | PRD 작성, 리뷰 취합, 피드백 반영, **Lock 선언** | 📢 공유 받음 (이의 있으면 24h 내 제기) |
| 설계 | SRS 정합 확인, Figma 리뷰, Open Q 해소, 요구사항 확정 | 📢 공유 받음 |
| 스프린트 | 플래닝, 진행 트래킹, 블로커 해소 | 📢 주간 진행 상황 공유 받음. 크로스팀 블로커 에스컬레이션 |
| 검증 | QA 트래킹, Dogfood 운영, 롤백 계획 | **🔒 론치 Go/No-Go 판정** (승인 필요) |
| 론치 | 론치 계획, Comms doc, CS 브리핑, Sales Brief | 📢 공유 받음. MKT 핸드오프 조율 |
| 사후 | 메트릭 리뷰, 피드백 종합 | **🔒 Go/Kill/Iterate 최종 판정** (승인 필요) |

**🔒 = PM Director 승인 필요 (2개만)**
**📢 = PM이 진행하고 공유만. 24h 이의 없으면 자동 진행**

---

## 기존 도구/스킬 연결

| Phase | 활용 스킬/템플릿 |
|-------|-------------|
| Discovery | `/user-research-synthesis`, `/impact-sizing`, `/prototype`, `/napkin-sketch`, `/interview-guide` |
| PRD Lock | `templates/prd-template.md`, `/prd-review-panel` |
| 설계 | SRS는 TL이 GitHub에 올림. PM은 PRD 정합 확인만 |
| 스프린트 | `/create-tickets` (Jira 생성) |
| 검증 | `/launch-checklist` (Phase 3에서 시작, 여기서 QA/보안 항목 트래킹) |
| 론치 | `/launch-comms` (5개 동시 생성), `/launch-checklist` (마스터 트래킹) |
| 사후 | `/feature-results`, `/weekly-review` |

**Note:** SRS는 TL이 GitHub에서 관리. PM은 별도 템플릿 불필요.

---

*스프린트 주기: 2주 (월 2회)*
*본인 팀 상황에 맞게 기간, 역할, 체크포인트를 조정해서 사용하세요.*
