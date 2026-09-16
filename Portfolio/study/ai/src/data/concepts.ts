import type { Concept } from "@/types/concept";

export const concepts: Record<string, Concept> = {
  input: {
    id:"input", term:"Input", korean:"입력", oneLine:"신경망이 계산을 시작하기 위해 받아들이는 값",
    beginner:"사진의 픽셀, 문장의 Token, 센서값처럼 모델이 판단의 재료로 받는 숫자입니다.",
    why:"AI가 무엇을 보고 판단하는지 이해하려면 Input이 어떤 숫자로 표현되는지 알아야 합니다. 데이터가 숫자로 바뀌는 순간부터 신경망 계산이 시작됩니다.",
    uses:["이미지 픽셀","음성 특징값","추천 시스템의 사용자/상품 특징","LLM의 Token Embedding"],
    simulation:"STEP 01에서는 x₁, x₂가 Input입니다. 슬라이더를 움직이면 같은 Weight에서도 뉴런 결과가 달라집니다.",
    change:"Input이 커지면 해당 Weight의 부호와 크기에 따라 뉴런에 전달되는 영향도 함께 변합니다.",
    formula:"z = x₁w₁ + x₂w₂ + b", example:"x₁=0.70, w₁=0.80 → contribution=0.56",
    later:["STEP 03 Layer","STEP 05 Forward","STEP 12 Token & Embedding"], related:["weight","neuron","embedding"]
  },
  weight: {
    id:"weight", term:"Weight", korean:"가중치", oneLine:"입력이 결과에 미치는 영향의 크기와 방향",
    beginner:"각 연결에 붙어 있는 조절 손잡이라고 생각하면 됩니다. 양수/음수는 영향의 방향을, 절댓값은 영향의 강도를 나타냅니다.",
    why:"신경망의 '학습'은 핵심적으로 Weight를 더 좋은 값으로 수정하는 과정입니다. Weight를 이해하면 AI가 경험을 통해 무엇을 바꾸는지 이해할 수 있습니다.",
    uses:["이미지 분류","음성 인식","추천 시스템","Transformer의 Linear Projection","LLM의 수많은 학습 파라미터"],
    simulation:"현재 Neuron 화면의 w₁, w₂가 Weight입니다. Input과 곱해져 뉴런에 들어가는 contribution을 만듭니다.",
    change:"+0.8이면 같은 방향으로 강하게 반영하고, 0이면 해당 입력을 거의 무시하며, -0.8이면 반대 방향으로 강하게 반영합니다.",
    training:"Backpropagation이 Weight별 Gradient를 계산하고 Optimizer가 그 값을 이용해 Weight를 조금씩 수정합니다.",
    formula:"z = Σ(xᵢwᵢ) + b", example:"0.70 × 0.80 = +0.56",
    later:["STEP 03 Layer","STEP 08 Backpropagation","STEP 09 Optimizer","STEP 13 Transformer"], related:["input","bias","gradient","optimizer"]
  },
  bias: {
    id:"bias", term:"Bias", korean:"편향", oneLine:"입력과 별개로 뉴런의 기준점을 이동시키는 학습 가능한 값",
    beginner:"모든 입력이 0이어도 뉴런이 반드시 0만 내놓지 않도록 계산 전체를 밀어주는 값입니다.",
    why:"Weight만으로는 표현하기 어려운 기준점 이동을 가능하게 해 모델의 표현력을 높입니다.",
    uses:["Dense/Linear Layer","CNN","Transformer Feed Forward Network","분류기의 출력층"],
    simulation:"STEP 01에서 Bias 슬라이더를 움직이면 x₁, x₂와 Weight를 그대로 둔 채 최종 Weighted Sum만 이동합니다.",
    change:"Bias를 높이면 전체 출력이 위로, 낮추면 아래로 이동합니다.",
    training:"Weight와 마찬가지로 학습 과정에서 Gradient에 의해 업데이트되는 파라미터입니다.",
    formula:"z = x₁w₁ + x₂w₂ + b", example:"contributions 0.56 + (-0.09) + bias 0.12 = 0.59",
    later:["STEP 03 Layer","STEP 05 Forward","STEP 08 Backpropagation"], related:["weight","weighted-sum","gradient"]
  },
  neuron: {
    id:"neuron", term:"Neuron", korean:"뉴런", oneLine:"여러 입력을 하나의 값으로 합치는 신경망의 기본 계산 단위",
    beginner:"입력마다 중요도를 적용하고 모두 더한 뒤 다음 단계로 넘기는 작은 계산기라고 보면 됩니다.",
    why:"Layer는 뉴런의 집합이고 Neural Network는 Layer의 연결입니다. 따라서 뉴런 하나를 이해하면 더 큰 신경망을 읽는 기반이 생깁니다.",
    uses:["Fully Connected Network","CNN의 채널 계산","분류기","Transformer의 Feed Forward Layer"],
    simulation:"두 Input이 각각 Weight와 곱해져 중앙의 Σ 노드로 모입니다. 이것이 현재 페이지에서 뉴런의 핵심 계산입니다.",
    formula:"z = Σ(xᵢwᵢ) + b", later:["STEP 03 Layer","STEP 05 Forward","STEP 11 Neural Visualizer"], related:["input","weight","bias","activation"]
  },
  "weighted-sum": {
    id:"weighted-sum", term:"Weighted Sum", korean:"가중합", oneLine:"각 Input×Weight 결과와 Bias를 모두 더한 값",
    beginner:"각 입력의 영향력을 계산한 뒤 한곳에 모은 뉴런의 중간 결과입니다.",
    why:"Activation Function에 들어가기 직전 값이며 Forward Propagation의 가장 기본적인 계산입니다.",
    uses:["Linear Layer","Dense Layer","Attention Projection","Transformer MLP"],
    simulation:"STEP 01 오른쪽 Inspector의 Weighted Sum이 바로 z입니다.",
    formula:"z = x₁w₁ + x₂w₂ + … + b", later:["STEP 02 Activation","STEP 03 Layer","STEP 05 Forward"], related:["neuron","activation","weight","bias"]
  },
  activation: {
    id:"activation", term:"Activation Function", korean:"활성화 함수", oneLine:"뉴런의 중간 결과를 다음 단계에 어떤 형태로 전달할지 결정하는 함수",
    beginner:"뉴런이 계산한 값을 그대로 넘길지, 0으로 막을지, 특정 범위로 압축할지 결정합니다.",
    why:"비선형성을 추가합니다. Activation이 없다면 Layer를 많이 쌓아도 복잡한 패턴을 표현하는 능력이 크게 제한됩니다.",
    uses:["신경망 Hidden Layer","CNN","Transformer Feed Forward Network","출력 확률 변환"],
    simulation:"STEP 02의 Input x 하나를 움직이면 ReLU, Sigmoid, Tanh가 같은 값에 서로 다르게 반응합니다.",
    change:"함수 종류에 따라 음수 처리, 출력 범위, Gradient 특성이 달라집니다.",
    formula:"a = f(z)", later:["STEP 03 Layer","STEP 05 Forward","STEP 13 Transformer"], related:["relu","sigmoid","tanh","weighted-sum"]
  },
  relu: {
    id:"relu", term:"ReLU", korean:"렐루", oneLine:"음수는 0, 양수는 그대로 통과시키는 Activation Function",
    beginner:"0보다 작으면 문을 닫고, 0보다 크면 그대로 통과시키는 간단한 게이트입니다.",
    why:"계산이 단순하고 깊은 신경망에서 효율적으로 학습되는 특성 때문에 널리 사용됩니다.",
    uses:["CNN","일반 Deep Neural Network","여러 MLP 구조"],
    simulation:"STEP 02에서 x가 음수가 되면 ReLU 출력이 0에 붙고, 양수가 되면 입력과 함께 증가합니다.",
    formula:"ReLU(x) = max(0, x)", later:["STEP 03 Layer","STEP 05 Forward"], related:["activation","sigmoid","tanh"]
  },
  sigmoid: {
    id:"sigmoid", term:"Sigmoid", korean:"시그모이드", oneLine:"어떤 실수 입력도 0과 1 사이로 압축하는 함수",
    beginner:"아주 큰 음수는 0에 가깝게, 큰 양수는 1에 가깝게 바꿉니다.",
    why:"0~1 범위가 필요한 이진 분류 출력 등을 이해하는 데 중요합니다.",
    uses:["Binary Classification 출력","Gate 구조의 일부","확률 형태의 출력"],
    simulation:"STEP 02에서 입력을 크게 움직여도 Sigmoid 출력은 0과 1을 벗어나지 않습니다.",
    formula:"σ(x) = 1 / (1 + e⁻ˣ)", later:["STEP 06 Loss","분류 모델"], related:["activation","relu","tanh"]
  },
  tanh: {
    id:"tanh", term:"Tanh", korean:"하이퍼볼릭 탄젠트", oneLine:"입력을 -1과 1 사이로 압축하는 Activation Function",
    beginner:"Sigmoid와 비슷하지만 중심이 0이라 음수와 양수를 모두 표현합니다.",
    why:"출력 중심이 0인 활성화의 성질과 과거 RNN 계열 구조를 이해하는 데 도움이 됩니다.",
    uses:["RNN 계열","일부 Gate/State 계산","기초 신경망 학습 예제"],
    simulation:"STEP 02에서 x=0이면 Tanh도 0이며, 양/음 입력에 대해 대칭적으로 움직입니다.",
    formula:"tanh(x) = (eˣ-e⁻ˣ)/(eˣ+e⁻ˣ)", later:["RNN 개념","Gradient 학습"], related:["activation","sigmoid","relu"]
  },
  gradient: {
    id:"gradient", term:"Gradient", korean:"기울기", oneLine:"Loss를 줄이기 위해 파라미터를 어느 방향으로 얼마나 움직여야 하는지 알려주는 값",
    beginner:"산 위에서 가장 가파른 방향을 알려주는 화살표와 비슷합니다.",
    why:"AI가 틀린 결과를 보고 Weight를 어떻게 고칠지 결정하는 핵심 정보입니다.",
    uses:["Backpropagation","SGD","Adam","모든 Gradient 기반 신경망 학습"],
    training:"Loss에서 시작해 뒤쪽 Layer부터 각 Weight까지 Gradient가 전달됩니다.",
    later:["STEP 07 Gradient","STEP 08 Backpropagation","STEP 09 Optimizer"], related:["weight","optimizer"]
  },
  optimizer: {
    id:"optimizer", term:"Optimizer", korean:"최적화 알고리즘", oneLine:"Gradient를 이용해 실제 파라미터를 업데이트하는 규칙",
    beginner:"Gradient가 방향을 알려주면 Optimizer는 실제로 얼마나 움직일지 결정합니다.",
    why:"Gradient를 계산하는 것만으로 모델은 바뀌지 않습니다. Optimizer가 Weight를 업데이트해야 학습이 일어납니다.",
    uses:["SGD","Adam","AdamW","Deep Learning Training"],
    formula:"w ← w - learningRate × gradient", later:["STEP 09 Optimizer","STEP 10 Training"], related:["gradient","weight"]
  },
  embedding: {
    id:"embedding", term:"Embedding", korean:"임베딩", oneLine:"Token 같은 이산적인 대상을 의미를 담는 숫자 Vector로 바꾸는 표현",
    beginner:"단어를 컴퓨터가 계산할 수 있는 여러 차원의 좌표로 바꾸는 과정입니다.",
    why:"LLM은 글자를 직접 계산하지 않습니다. Token을 Vector로 바꾼 뒤부터 신경망 계산을 수행합니다.",
    uses:["LLM","검색/RAG","추천 시스템","Semantic Similarity"],
    later:["STEP 12 Token & Embedding","STEP 13 Transformer"], related:["input"]
  }
};

export const getConcept = (id: string) => concepts[id];
