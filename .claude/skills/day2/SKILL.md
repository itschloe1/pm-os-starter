---
name: day2
description: PM-OS 온보딩 Day 2 - 커뮤니케이션 스킬
user-invocable: true
---

# Day 2: 커뮤니케이션

> 소요 시간: 20-30분
> 배우는 것: /slack-message + /status-update + /action-items

---

## 오늘 할 것

어제 MCP를 연결했으니, 오늘은 그걸 활용해서 **팀과 소통하는 스킬**을 써봅니다.
Slack에 메시지 보내고, 주간보고 작성하고, 액션아이템을 추출합니다.

---

## 실습 1: /slack-message (5분)

팀에 공유할 내용이 있을 때 씁니다. 톤, 길이, 채널에 맞게 메시지를 만들어줍니다.

```
/slack-message

[상황을 설명하세요]
예: "어제 플랜 개편 미팅에서 결정된 사항을 제품팀 채널에 공유하고 싶어"
```

**기대 결과:**
- 채널과 톤에 맞는 Slack 메시지 초안
- Slack MCP 연결 시 → 바로 전송도 가능
- `outputs/slack-messages/`에 저장

> **Tip:** "이 메시지를 #product-team 채널에 보내줘"라고 하면 Slack MCP가 직접 전송합니다.

---

## 실습 2: /status-update (10분)

스테이크홀더에게 보내는 주간보고. Jira 데이터를 자동으로 반영합니다.

```
/status-update

이번 주에 한 일:
- [간단히 나열]

또는 그냥 "/status-update" 만 치면 Jira + 이번 주 미팅 노트에서 자동으로 뽑아줍니다.
```

**기대 결과:**
- "이번 주 완료 / 진행 중 / 다음 주 계획" 구조
- Jira 스프린트에서 티켓 상태 자동 반영 (연결된 경우)
- 읽는 사람(경영진, 팀)에 맞게 톤 조절
- `outputs/status-updates/`에 저장

> **Tip:** 금요일 오후에 `/status-update`를 루틴으로 쓰면 주간보고가 10분 안에 끝납니다.

---

## 실습 3: /action-items (5분)

미팅 노트나 문서에서 액션아이템만 쏙 뽑아줍니다.

```
/action-items

[미팅 노트나 Slack 스레드를 붙여넣으세요]
```

**기대 결과:**
- 토픽별로 그룹된 체크리스트
- 각 항목에 오너, 기한 자동 배정
- Jira 연동 시 티켓 생성 제안

> **Tip:** 어제 `/meeting-notes`로 만든 노트를 여기에 넣어보세요.

---

## 오늘 배운 것

- **/slack-message** = 채널과 톤에 맞는 메시지 자동 생성 + 직접 전송
- **/status-update** = Jira 데이터 기반 주간보고
- **/action-items** = 아무 텍스트에서 체크리스트 추출

**Day 1 + Day 2 조합의 위력:**
미팅 후 → `/meeting-notes` → `/action-items` → `/slack-message` 로 팀에 공유
이 플로우를 한번 해보면 PM-OS의 가치가 체감됩니다.

---

## 내일: /day3

내일은 **PM-OS를 나에게 맞게 튜닝**합니다:
- PM-OS가 나에 대해 물어보는 인터뷰
- 내 업무 스타일, 의사결정 기준, 주요 이해관계자 파악
- 인터뷰 후 /prd-draft 결과가 어떻게 달라지는지 Before/After 비교

**내일 `/day3`을 실행하세요.**
