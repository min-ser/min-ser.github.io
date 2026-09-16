# NeuralScope v0.6.0

v0.6.0은 학습 Navigation Architecture를 통합한 Minor Release입니다.

## 문제

v0.5.0에서는 상단 Global Learning Flow는 전체 Curriculum을 사용했지만,
좌측 Navigation은 페이지 종류에 따라 서로 다른 데이터 구조를 사용했습니다.

- Foundation: `FoundationSidebar`
- Neuron ~ Transformer: 기존 `Sidebar`
- 상단 Flow: `curriculum.ts`

따라서 같은 학습 경로인데 화면마다 목차와 번호 체계가 달라지는 충돌이 있었습니다.

## v0.6.0 변경

이제 학습 UI는 모두 `src/data/curriculum.ts` 하나를 기준으로 동작합니다.

```text
curriculum.ts
   │
   ├─ GlobalLearningFlow
   ├─ CommonLearningNav
   └─ CurriculumStepNav
```

### 모든 /learn 페이지 공통

- 상단: 전체 Global Learning Flow
- 좌측: 전체 21 Step Navigation
- 중앙: 현재 학습 콘텐츠
- 하단: Curriculum 기준 Previous / Next

Foundation, Neuron, Training, Transformer, LLM에서 모두 같은 Navigation 구조를 사용합니다.

## 전체 Curriculum

AI → ML → DL → Neural Network
→ Neuron → Activation → Layer → Vector & Matrix → Forward
→ Loss → Gradient → Backpropagation → Optimizer → Training
→ Token & Embedding → Transformer → Self Attention → Language Model
→ Generative AI → RAG → AI Agent

## 실행

```bash
npm install
npm run dev
```

## 버전 정책

- 기능/구조 변경: Minor (`v0.6.0`)
- 버그 수정: Patch (`v0.6.1`)
- Stable Release: `v1.0.0`
