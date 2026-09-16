import type { Step } from "@/types/learning";

export const steps: Step[] = [
  { id: 0, slug: "00-introduction", title: "Introduction", subtitle: "AI 내부를 직접 관찰하는 학습 방식", group: "FOUNDATION", status: "completed", visual: "overview", topics: ["AI / ML / Deep Learning", "전체 학습 흐름"] },
  { id: 1, slug: "01-neuron", title: "Neuron", subtitle: "입력·가중치·Bias가 하나의 출력으로 합쳐지는 과정", group: "FOUNDATION", status: "current", visual: "neuron", topics: ["Input", "Weight", "Bias", "Weighted Sum"] },
  { id: 2, slug: "02-activation", title: "Activation", subtitle: "같은 입력이 함수에 따라 어떻게 달라지는가", group: "FOUNDATION", status: "planned", visual: "activation", topics: ["ReLU", "Sigmoid", "Tanh"] },
  { id: 3, slug: "03-layer", title: "Layer", subtitle: "여러 뉴런이 동시에 계산되는 모습", group: "FOUNDATION", status: "planned", visual: "layer", topics: ["Neuron Group", "Activation", "Connectivity"] },
  { id: 4, slug: "04-vector-matrix", title: "Vector & Matrix", subtitle: "수많은 연결을 행렬 하나로 계산하기", group: "FOUNDATION", status: "planned", visual: "matrix", topics: ["Vector", "Matrix", "Dot Product", "XW + B"] },
  { id: 5, slug: "05-forward-propagation", title: "Forward Propagation", subtitle: "신호가 Layer를 지나 Output까지 흐르는 과정", group: "FOUNDATION", status: "planned", visual: "forward", topics: ["Forward Pass", "Signal Flow", "Activation"] },
  { id: 6, slug: "06-loss", title: "Loss", subtitle: "예측과 정답 사이의 차이를 숫자로 보기", group: "LEARNING", status: "planned", visual: "loss", topics: ["Prediction", "Target", "Error", "Loss"] },
  { id: 7, slug: "07-gradient", title: "Gradient", subtitle: "Loss가 줄어드는 방향을 시각적으로 찾기", group: "LEARNING", status: "planned", visual: "gradient", topics: ["Derivative", "Slope", "Gradient"] },
  { id: 8, slug: "08-backpropagation", title: "Backpropagation", subtitle: "오차가 뒤에서 앞으로 되돌아오는 과정", group: "LEARNING", status: "planned", visual: "backprop", topics: ["Backward Pass", "Chain Rule", "Gradient Flow"] },
  { id: 9, slug: "09-optimizer", title: "Optimizer", subtitle: "Gradient를 이용해 Weight를 실제로 이동시키기", group: "LEARNING", status: "planned", visual: "optimizer", topics: ["Learning Rate", "SGD", "Adam"] },
  { id: 10, slug: "10-training", title: "Training", subtitle: "Forward → Loss → Backward → Update 반복", group: "LEARNING", status: "planned", visual: "training", topics: ["Epoch", "Training Loop", "Loss Curve"] },
  { id: 11, slug: "11-neural-visualizer", title: "Neural Visualizer", subtitle: "전체 신경망 내부 상태를 한 화면에서 관찰하기", group: "VISUALIZATION", status: "planned", visual: "network", topics: ["2D", "3D", "Activation", "Weight", "Inspector"] },
  { id: 12, slug: "12-token-embedding", title: "Token & Embedding", subtitle: "문장이 숫자 벡터로 변하는 과정", group: "TRANSFORMER", status: "planned", visual: "token", topics: ["Token", "Token ID", "Embedding"] },
  { id: 13, slug: "13-transformer", title: "Transformer", subtitle: "Transformer Block 내부에서 정보가 흐르는 방식", group: "TRANSFORMER", status: "planned", visual: "transformer", topics: ["Attention", "Residual", "Feed Forward"] },
  { id: 14, slug: "14-self-attention", title: "Self Attention", subtitle: "각 Token이 다른 Token을 얼마나 참고하는가", group: "TRANSFORMER", status: "planned", visual: "attention", topics: ["Query", "Key", "Value", "Softmax"] },
  { id: 15, slug: "15-mini-language-model", title: "Mini Language Model", subtitle: "입력 문장에서 Next Token이 결정되는 전체 흐름", group: "TRANSFORMER", status: "planned", visual: "llm", topics: ["Tokenize", "Embed", "Transformer", "Logits", "Next Token"] }
];

export const getStep = (id: number) => steps.find((step) => step.id === id);
