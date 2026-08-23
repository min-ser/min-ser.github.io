# NeuralScope v0.1.0 Architecture

## 방향

기존의 문서 중심 구조를 폐기하고 **Simulation First** 구조로 변경한다.

```text
Visualization
    ↓
Interaction
    ↓
Actual Calculation
    ↓
Live Inspector
    ↓
짧은 개념 설명
    ↓
TypeScript 구현
```

## 페이지 원칙

- STEP 00~15 전체 라우팅은 처음부터 존재한다.
- STEP 01 Neuron은 실제 인터랙티브 시뮬레이션으로 구현한다.
- STEP 02 Activation도 실제 인터랙티브 시뮬레이션으로 구현한다.
- STEP 03~15는 단순 텍스트 Coming Soon이 아니라 각 개념의 시각적 Schematic Preview를 제공한다.
- 학습할 때 Preview를 실제 계산 Engine과 연결하며 완성한다.

## 최종 구조

```text
Neural Engine
   │
   ├─ state / calculation
   ▼
Visualization Layer
   ├─ SVG
   ├─ Canvas
   └─ Three.js (Step 11 이후)
   │
   ├─ Live Inspector
   └─ Explanation
```
