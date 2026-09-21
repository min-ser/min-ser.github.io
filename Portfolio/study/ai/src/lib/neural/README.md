# Neural Engine

실제 수학/신경망 구현은 학습하면서 이 폴더에 추가한다.

현재 UI의 STEP 01/02 계산은 React 컴포넌트 내부에서 학습용으로 동작한다.
학습이 진행되면 계산 로직을 이 디렉터리로 분리하고 모든 Visualization이 동일한 Engine State를 사용하도록 리팩터링한다.

예정 구조:

```text
neural/
├─ neuron.ts
├─ activation.ts
├─ layer.ts
├─ matrix.ts
├─ network.ts
├─ loss.ts
├─ gradient.ts
├─ backpropagation.ts
├─ optimizer.ts
└─ transformer/
```
