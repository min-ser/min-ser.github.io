# NeuralScope v0.0.8

> Understand AI by Building It — AI의 전체 지식 지도를 따라 개념을 연결하고 직접 구현·시각화하는 학습 프로젝트.

## v0.0.17 — Curriculum first-pass complete

- 29 Chapters / 467 Topics 전체에 1차 명시적 학습 콘텐츠 완료
- Chapter 26 Modern AI Architecture 상세화
- Chapter 27 Build It Yourself 상세화
- Chapter 28 AI Research & Advanced Topics 상세화
- Architecture Composer / Build-Trace-Test / Research Evidence Explorer 추가
- 다음 단계: prerequisite/related graph와 핵심 전용 Interactive Lab 고도화


## v0.0.15 — RAG / Prompt / Agent Learning Expansion

- Chapter 17 RAG 20 Topics 상세 콘텐츠
- Chapter 18 Prompt & Context Engineering 14 Topics 상세 콘텐츠
- Chapter 19 AI Agent 17 Topics 상세 콘텐츠
- RAG Retrieval/Reranking Pipeline Lab
- Context Token Budget Composer
- Agent Tool-call State Machine Lab
- 누적 상세 콘텐츠 366 / 467 Topics (78.4%)


## v0.0.8 Curriculum Expansion

이번 버전은 **29 Chapters / 467 Topics**로 학습 범위를 확장했다. 기초 수학과 데이터에서 시작해 ML/DL, Computer Vision, NLP, Attention/Transformer, LLM, Fine-tuning, Embedding/Vector Search, RAG, Prompt/Context Engineering, Agent, Multimodal, Generative Models, AI System Engineering, LLM Performance, MLOps/LLMOps, Security/Governance, 직접 구현과 고급 주제까지 하나의 Curriculum으로 연결한다.

- 모든 Topic은 `CORE / RECOMMENDED / REFERENCE / ADVANCED` 학습 깊이를 가진다.
- 모든 Topic은 동적 Static Route로 미리 생성되어 앞으로 학습할 범위를 항상 볼 수 있다.
- Sidebar는 현재 Chapter만 펼치는 Accordion 구조를 유지한다.
- Global Learning Flow는 전체 Chapter와 현재 Topic 위치를 자동 계산한다.
- 상세 콘텐츠와 Interactive Lab은 이후 `0.0.x` 버전에서 누적한다.

자세한 전체 목록은 `docs/curriculum.md`, 진행 계획은 `docs/roadmap.md`를 기준 문서로 사용한다.

---

**Structure Foundation Release**

NeuralScope는 AI를 글로만 읽는 대신 **전체 위치를 확인하고 → 시각적으로 보고 → 직접 조작하고 → 왜 필요한지/어디에 쓰이는지 연결해서 이해하는 Interactive AI Learning Platform**을 목표로 합니다.

## v0.0.8 핵심

기존 평면형 21 Step 구조를 폐기하고 **Chapter → Topic → Concept** 계층형 구조로 재설계했습니다.

- 9 Chapters
- 110 Topics
- 전체 Topic Static Route 생성
- Chapter Accordion Navigation
- 현재 Chapter 자동 펼침
- 상단 Global Flow는 Chapter 단위
- Topic별 `CORE / RECOMMENDED / REFERENCE`
- 모든 Topic에 기본 학습 페이지/설명/Visual Skeleton
- 핵심 Topic은 실제 동적 시각화 포함

## Curriculum

```text
00 AI FOUNDATION
01 MACHINE LEARNING
02 DEEP LEARNING
03 AI MATHEMATICS
04 DL ARCHITECTURES
05 NLP
06 TRANSFORMER
07 LLM
08 MODERN AI
```

Machine Learning과 Deep Learning을 한두 페이지로 건너뛰지 않고 각각 독립 Chapter로 충분히 펼쳐두었습니다.

## Navigation

좌측은 모든 Topic을 한꺼번에 보여주지 않습니다.

```text
▼ 00 AI FOUNDATION
▶ 01 MACHINE LEARNING
▶ 02 DEEP LEARNING
▶ 03 AI MATHEMATICS
...
```

현재 페이지가 속한 Chapter는 자동으로 열립니다.

## Version Policy

현재는 **구조/토대 설계 단계**이므로:

```text
0.0.7 → 0.0.8 → 0.0.9 ...
```

처럼 마지막 자리만 증가시킵니다.

`0.1.0`은 구조가 확정되고 실제 학습 콘텐츠를 본격적으로 채우기 시작할 때 사용합니다.

## 실행

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## v0.0.17 — Inference · LLMOps · AI Trust
- Chapter 23~25의 53 Topics 상세 학습 데이터 추가 (누적 419/467, 89.7%).
- Prefill/Decode, KV Cache, Precision/Quantization, TTFT/TPS를 조작하는 LLM Inference Workbench 추가.
- ML lifecycle, Candidate traffic, Drift threshold를 조작하는 MLOps Release Control 추가.
- Prompt/RAG/Tool 위협과 Guardrail, 최소권한, Audit를 연결한 AI Trust Boundary Lab 추가.
- `docs/progress.md`를 v0.0.17 기준으로 갱신.
