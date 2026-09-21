export type TopicContent = {
  summary: string;
  why: string;
  usedFor: string[];
  keyPoints: string[];
  questions: string[];
  visualType?: "ai-map" | "ml-flow" | "dl-network" | "neuron" | "activation" | "matrix" | "transformer" | "llm" | "generic";
};

export const topicContent: Record<string, TopicContent> = {
  "00.01": {
    summary:"AI는 하나의 기술명이 아니라 판단, 예측, 생성, 계획 같은 지능적 작업을 컴퓨터가 수행하게 만드는 넓은 분야입니다.",
    why:"Machine Learning, Deep Learning, LLM, Agent가 모두 어디에 위치하는지 먼저 알아야 이후 용어가 서로 섞이지 않습니다.",
    usedFor:["추천","검색","이미지 인식","음성","LLM","로봇","AI Agent"],
    keyPoints:["AI는 큰 범주","Rule-based AI도 AI에 포함","ML은 AI의 한 접근법","LLM은 AI 전체가 아니라 특정 모델 계열"],
    questions:["AI와 ML은 같은 말인가?","LLM은 AI 전체인가?","규칙 기반 AI와 학습 기반 AI는 무엇이 다른가?"],
    visualType:"ai-map"
  },
  "03.01": {
    summary:"Machine Learning은 사람이 모든 규칙을 직접 작성하는 대신 데이터에서 패턴과 판단 기준을 학습하는 방식입니다.",
    why:"AI가 '학습한다'는 말을 실제 개발 관점에서 이해하는 첫 단계입니다.",
    usedFor:["예측","분류","추천","이상 탐지","수요 예측"],
    keyPoints:["Data","Feature","Target","Training","Inference"],
    questions:["프로그램과 ML은 무엇이 다른가?","학습 결과로 실제 무엇이 만들어지는가?"],
    visualType:"ml-flow"
  },
  "06.01": {
    summary:"Deep Learning은 여러 Layer의 Neural Network로 데이터 표현 자체를 단계적으로 학습하는 Machine Learning의 한 분야입니다.",
    why:"현대 Vision, Speech, Transformer, LLM 대부분이 Deep Learning 위에서 동작합니다.",
    usedFor:["이미지","음성","자연어","Transformer","LLM","생성형 AI"],
    keyPoints:["Representation Learning","Hidden Layer","Forward","Backpropagation"],
    questions:["ML과 DL의 경계는?","왜 Deep이라고 부르는가?","Layer가 많으면 무엇이 달라지는가?"],
    visualType:"dl-network"
  },
  "06.05": {
    summary:"Neuron은 여러 Input에 Weight를 적용하고 Bias를 더해 하나의 값을 만드는 신경망의 기본 계산 단위입니다.",
    why:"Layer와 Network 전체가 결국 이 기본 계산을 대량으로 반복하기 때문입니다.",
    usedFor:["MLP","CNN 내부 계산","Transformer Feed Forward","분류기"],
    keyPoints:["Input","Weight","Bias","Weighted Sum"],
    questions:["Weight가 음수면?","Bias는 왜 필요한가?","Neuron 하나가 무엇을 학습하는가?"],
    visualType:"neuron"
  },
  "06.08": {
    summary:"Activation Function은 뉴런 계산에 비선형성을 넣어 복잡한 패턴을 표현할 수 있게 합니다.",
    why:"Activation이 없으면 여러 Linear Layer를 쌓아도 하나의 Linear 변환으로 합쳐질 수 있습니다.",
    usedFor:["Deep Neural Network","CNN","Transformer FFN","분류 출력"],
    keyPoints:["ReLU","Sigmoid","Tanh","Non-linearity"],
    questions:["왜 ReLU가 흔한가?","Sigmoid는 언제 쓰나?"],
    visualType:"activation"
  },
  "01.03": {
    summary:"Matrix는 많은 숫자를 행과 열로 묶어 표현하며, Neural Network의 대량 계산을 한 번에 다루는 핵심 표현입니다.",
    why:"GPU가 AI에서 중요한 이유를 이해하려면 대규모 Matrix Multiplication을 이해해야 합니다.",
    usedFor:["Linear Layer","Attention Q/K/V","Embedding","GPU 연산"],
    keyPoints:["Rows","Columns","Shape","Matrix Multiplication"],
    questions:["뉴런 여러 개가 왜 Matrix가 되는가?","GPU는 왜 행렬 계산에 강한가?"],
    visualType:"matrix"
  },
  "12.02": {
    summary:"Transformer Block은 Self Attention과 Feed Forward Network를 Residual/Normalization과 함께 반복하는 구조입니다.",
    why:"GPT 같은 현대 LLM의 내부 계산 단위이므로 LLM의 실제 구조를 이해하는 핵심입니다.",
    usedFor:["GPT","번역","요약","코드 모델","멀티모달"],
    keyPoints:["Self Attention","Multi-Head","Residual","LayerNorm","FFN"],
    questions:["한 Block 안에서 Token은 어떻게 변하는가?","Block을 여러 개 쌓으면 무엇이 달라지는가?"],
    visualType:"transformer"
  },
  "14.01": {
    summary:"LLM은 매우 큰 언어 데이터를 이용해 Token의 패턴과 관계를 학습한 대규모 Language Model입니다.",
    why:"ChatGPT 같은 시스템을 단순히 'AI'라고만 부르지 않고 어떤 계산 계열인지 정확히 이해할 수 있습니다.",
    usedFor:["대화","문서 이해","코드","번역","요약"],
    keyPoints:["Token","Transformer","Next Token Prediction","Parameters","Context"],
    questions:["LLM은 어떻게 문장을 생성하는가?","모델이 '기억'하는 것은 무엇인가?"],
    visualType:"llm"
  },
  "00.02": {
    summary:"History of AI(AI의 역사와 발전)은 AI 전체 구조에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"AI·ML·DL·생성형 AI의 관계를 잡는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["AI 분야 지도", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["History of AI", "AI의 역사와 발전", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 개념을 다른 AI 분야와 구분할 수 있는가?", "History of AI의 입력과 출력은 무엇인가?", "AI의 역사와 발전를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "00.03": {
    summary:"Rule-based vs Learning(규칙 기반과 학습 기반)은 AI 전체 구조에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"AI·ML·DL·생성형 AI의 관계를 잡는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["AI 분야 지도", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Rule-based vs Learning", "규칙 기반과 학습 기반", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 개념을 다른 AI 분야와 구분할 수 있는가?", "Rule-based vs Learning의 입력과 출력은 무엇인가?", "규칙 기반과 학습 기반를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "00.04": {
    summary:"AI vs ML vs DL(AI·ML·DL 관계)은 AI 전체 구조에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"AI·ML·DL·생성형 AI의 관계를 잡는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["AI 분야 지도", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["AI vs ML vs DL", "AI·ML·DL 관계", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 개념을 다른 AI 분야와 구분할 수 있는가?", "AI vs ML vs DL의 입력과 출력은 무엇인가?", "AI·ML·DL 관계를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "00.05": {
    summary:"Generative AI & Foundation Models(생성형 AI와 파운데이션 모델)은 AI 전체 구조에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"AI·ML·DL·생성형 AI의 관계를 잡는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["AI 분야 지도", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Generative AI & Foundation Models", "생성형 AI와 파운데이션 모델", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 개념을 다른 AI 분야와 구분할 수 있는가?", "Generative AI & Foundation Models의 입력과 출력은 무엇인가?", "생성형 AI와 파운데이션 모델를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "00.06": {
    summary:"LLM & AI Agent Overview(LLM과 AI Agent 개요)은 AI 전체 구조에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"AI·ML·DL·생성형 AI의 관계를 잡는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["AI 분야 지도", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["LLM & AI Agent Overview", "LLM과 AI Agent 개요", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 개념을 다른 AI 분야와 구분할 수 있는가?", "LLM & AI Agent Overview의 입력과 출력은 무엇인가?", "LLM과 AI Agent 개요를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "00.07": {
    summary:"AI Problem Types(AI가 푸는 문제 유형)은 AI 전체 구조에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"AI·ML·DL·생성형 AI의 관계를 잡는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["AI 분야 지도", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["AI Problem Types", "AI가 푸는 문제 유형", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 개념을 다른 AI 분야와 구분할 수 있는가?", "AI Problem Types의 입력과 출력은 무엇인가?", "AI가 푸는 문제 유형를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "00.08": {
    summary:"Training vs Inference(학습과 추론)은 AI 전체 구조에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"AI·ML·DL·생성형 AI의 관계를 잡는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["AI 분야 지도", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Training vs Inference", "학습과 추론", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 개념을 다른 AI 분야와 구분할 수 있는가?", "Training vs Inference의 입력과 출력은 무엇인가?", "학습과 추론를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "00.09": {
    summary:"Model / Data / Compute(모델·데이터·컴퓨팅)은 AI 전체 구조에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"AI·ML·DL·생성형 AI의 관계를 잡는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["AI 분야 지도", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Model / Data / Compute", "모델·데이터·컴퓨팅", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 개념을 다른 AI 분야와 구분할 수 있는가?", "Model / Data / Compute의 입력과 출력은 무엇인가?", "모델·데이터·컴퓨팅를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "00.10": {
    summary:"AI Field Map(AI 전체 분야 지도)은 AI 전체 구조에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"AI·ML·DL·생성형 AI의 관계를 잡는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["AI 분야 지도", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["AI Field Map", "AI 전체 분야 지도", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 개념을 다른 AI 분야와 구분할 수 있는가?", "AI Field Map의 입력과 출력은 무엇인가?", "AI 전체 분야 지도를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "01.01": {
    summary:"Number, Scalar & Tensor(수·스칼라·텐서)은 AI 수학에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 내부 계산을 그림과 수식으로 연결하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["신경망·최적화·Attention 계산", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Number, Scalar & Tensor", "수·스칼라·텐서", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 수학 개념이 모델의 어떤 계산으로 바뀌는가?", "Number, Scalar & Tensor의 입력과 출력은 무엇인가?", "수·스칼라·텐서를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "01.02": {
    summary:"Vector(벡터)은 AI 수학에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 내부 계산을 그림과 수식으로 연결하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["신경망·최적화·Attention 계산", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Vector", "벡터", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 수학 개념이 모델의 어떤 계산으로 바뀌는가?", "Vector의 입력과 출력은 무엇인가?", "벡터를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "01.04": {
    summary:"Tensor Shape & Dimension(텐서 Shape과 차원)은 AI 수학에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 내부 계산을 그림과 수식으로 연결하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["신경망·최적화·Attention 계산", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Tensor Shape & Dimension", "텐서 Shape과 차원", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 수학 개념이 모델의 어떤 계산으로 바뀌는가?", "Tensor Shape & Dimension의 입력과 출력은 무엇인가?", "텐서 Shape과 차원를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "01.05": {
    summary:"Vector Operations(벡터 연산)은 AI 수학에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 내부 계산을 그림과 수식으로 연결하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["신경망·최적화·Attention 계산", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Vector Operations", "벡터 연산", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 수학 개념이 모델의 어떤 계산으로 바뀌는가?", "Vector Operations의 입력과 출력은 무엇인가?", "벡터 연산를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "01.06": {
    summary:"Dot Product(내적)은 AI 수학에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 내부 계산을 그림과 수식으로 연결하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["신경망·최적화·Attention 계산", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Dot Product", "내적", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 수학 개념이 모델의 어떤 계산으로 바뀌는가?", "Dot Product의 입력과 출력은 무엇인가?", "내적를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "01.07": {
    summary:"Matrix Multiplication(행렬 곱)은 AI 수학에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 내부 계산을 그림과 수식으로 연결하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["신경망·최적화·Attention 계산", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Matrix Multiplication", "행렬 곱", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 수학 개념이 모델의 어떤 계산으로 바뀌는가?", "Matrix Multiplication의 입력과 출력은 무엇인가?", "행렬 곱를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "01.08": {
    summary:"Transpose & Identity Matrix(전치·단위행렬)은 AI 수학에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 내부 계산을 그림과 수식으로 연결하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["신경망·최적화·Attention 계산", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Transpose & Identity Matrix", "전치·단위행렬", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 수학 개념이 모델의 어떤 계산으로 바뀌는가?", "Transpose & Identity Matrix의 입력과 출력은 무엇인가?", "전치·단위행렬를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "01.09": {
    summary:"Norm & Distance(노름과 거리)은 AI 수학에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 내부 계산을 그림과 수식으로 연결하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["신경망·최적화·Attention 계산", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Norm & Distance", "노름과 거리", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 수학 개념이 모델의 어떤 계산으로 바뀌는가?", "Norm & Distance의 입력과 출력은 무엇인가?", "노름과 거리를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "01.10": {
    summary:"Linear Transformation(선형 변환)은 AI 수학에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 내부 계산을 그림과 수식으로 연결하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["신경망·최적화·Attention 계산", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Linear Transformation", "선형 변환", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 수학 개념이 모델의 어떤 계산으로 바뀌는가?", "Linear Transformation의 입력과 출력은 무엇인가?", "선형 변환를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "01.11": {
    summary:"Eigenvalue & Eigenvector(고유값과 고유벡터)은 AI 수학에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 내부 계산을 그림과 수식으로 연결하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["신경망·최적화·Attention 계산", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Eigenvalue & Eigenvector", "고유값과 고유벡터", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 수학 개념이 모델의 어떤 계산으로 바뀌는가?", "Eigenvalue & Eigenvector의 입력과 출력은 무엇인가?", "고유값과 고유벡터를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "01.12": {
    summary:"Function(함수)은 AI 수학에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 내부 계산을 그림과 수식으로 연결하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["신경망·최적화·Attention 계산", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Function", "함수", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 수학 개념이 모델의 어떤 계산으로 바뀌는가?", "Function의 입력과 출력은 무엇인가?", "함수를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "01.13": {
    summary:"Derivative(미분)은 AI 수학에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 내부 계산을 그림과 수식으로 연결하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["신경망·최적화·Attention 계산", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Derivative", "미분", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 수학 개념이 모델의 어떤 계산으로 바뀌는가?", "Derivative의 입력과 출력은 무엇인가?", "미분를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "01.14": {
    summary:"Partial Derivative(편미분)은 AI 수학에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 내부 계산을 그림과 수식으로 연결하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["신경망·최적화·Attention 계산", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Partial Derivative", "편미분", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 수학 개념이 모델의 어떤 계산으로 바뀌는가?", "Partial Derivative의 입력과 출력은 무엇인가?", "편미분를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "01.15": {
    summary:"Chain Rule(연쇄 법칙)은 AI 수학에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 내부 계산을 그림과 수식으로 연결하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["신경망·최적화·Attention 계산", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Chain Rule", "연쇄 법칙", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 수학 개념이 모델의 어떤 계산으로 바뀌는가?", "Chain Rule의 입력과 출력은 무엇인가?", "연쇄 법칙를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "01.16": {
    summary:"Gradient(기울기)은 AI 수학에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 내부 계산을 그림과 수식으로 연결하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["신경망·최적화·Attention 계산", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Gradient", "기울기", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 수학 개념이 모델의 어떤 계산으로 바뀌는가?", "Gradient의 입력과 출력은 무엇인가?", "기울기를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "01.17": {
    summary:"Probability Basics(확률 기초)은 AI 수학에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 내부 계산을 그림과 수식으로 연결하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["신경망·최적화·Attention 계산", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Probability Basics", "확률 기초", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 수학 개념이 모델의 어떤 계산으로 바뀌는가?", "Probability Basics의 입력과 출력은 무엇인가?", "확률 기초를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "01.18": {
    summary:"Conditional Probability & Bayes(조건부확률과 베이즈)은 AI 수학에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 내부 계산을 그림과 수식으로 연결하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["신경망·최적화·Attention 계산", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Conditional Probability & Bayes", "조건부확률과 베이즈", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 수학 개념이 모델의 어떤 계산으로 바뀌는가?", "Conditional Probability & Bayes의 입력과 출력은 무엇인가?", "조건부확률과 베이즈를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "01.19": {
    summary:"Random Variable & Distribution(확률변수와 분포)은 AI 수학에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 내부 계산을 그림과 수식으로 연결하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["신경망·최적화·Attention 계산", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Random Variable & Distribution", "확률변수와 분포", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 수학 개념이 모델의 어떤 계산으로 바뀌는가?", "Random Variable & Distribution의 입력과 출력은 무엇인가?", "확률변수와 분포를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "01.20": {
    summary:"Mean, Variance & Standard Deviation(평균·분산·표준편차)은 AI 수학에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 내부 계산을 그림과 수식으로 연결하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["신경망·최적화·Attention 계산", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Mean, Variance & Standard Deviation", "평균·분산·표준편차", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 수학 개념이 모델의 어떤 계산으로 바뀌는가?", "Mean, Variance & Standard Deviation의 입력과 출력은 무엇인가?", "평균·분산·표준편차를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "01.21": {
    summary:"Logarithm & Exponential(로그와 지수)은 AI 수학에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 내부 계산을 그림과 수식으로 연결하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["신경망·최적화·Attention 계산", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Logarithm & Exponential", "로그와 지수", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 수학 개념이 모델의 어떤 계산으로 바뀌는가?", "Logarithm & Exponential의 입력과 출력은 무엇인가?", "로그와 지수를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "01.22": {
    summary:"Entropy & Cross Entropy(엔트로피와 교차 엔트로피)은 AI 수학에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 내부 계산을 그림과 수식으로 연결하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["신경망·최적화·Attention 계산", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Entropy & Cross Entropy", "엔트로피와 교차 엔트로피", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 수학 개념이 모델의 어떤 계산으로 바뀌는가?", "Entropy & Cross Entropy의 입력과 출력은 무엇인가?", "엔트로피와 교차 엔트로피를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "01.23": {
    summary:"KL Divergence(KL Divergence)은 AI 수학에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 내부 계산을 그림과 수식으로 연결하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["신경망·최적화·Attention 계산", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["KL Divergence", "KL Divergence", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 수학 개념이 모델의 어떤 계산으로 바뀌는가?", "KL Divergence의 입력과 출력은 무엇인가?", "KL Divergence를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "01.24": {
    summary:"Softmax Mathematics(Softmax 수학)은 AI 수학에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 내부 계산을 그림과 수식으로 연결하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["신경망·최적화·Attention 계산", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Softmax Mathematics", "Softmax 수학", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 수학 개념이 모델의 어떤 계산으로 바뀌는가?", "Softmax Mathematics의 입력과 출력은 무엇인가?", "Softmax 수학를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "02.01": {
    summary:"Dataset(데이터셋)은 데이터 처리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 성능 이전에 입력 데이터의 품질과 형태를 통제하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["학습 데이터 준비·파이프라인", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Dataset", "데이터셋", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["잘못 처리하면 학습 결과에 어떤 문제가 생기는가?", "Dataset의 입력과 출력은 무엇인가?", "데이터셋를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "02.02": {
    summary:"Sample / Feature / Label(샘플·특징·정답)은 데이터 처리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 성능 이전에 입력 데이터의 품질과 형태를 통제하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["학습 데이터 준비·파이프라인", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Sample / Feature / Label", "샘플·특징·정답", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["잘못 처리하면 학습 결과에 어떤 문제가 생기는가?", "Sample / Feature / Label의 입력과 출력은 무엇인가?", "샘플·특징·정답를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "02.03": {
    summary:"Structured vs Unstructured Data(정형·비정형 데이터)은 데이터 처리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 성능 이전에 입력 데이터의 품질과 형태를 통제하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["학습 데이터 준비·파이프라인", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Structured vs Unstructured Data", "정형·비정형 데이터", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["잘못 처리하면 학습 결과에 어떤 문제가 생기는가?", "Structured vs Unstructured Data의 입력과 출력은 무엇인가?", "정형·비정형 데이터를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "02.04": {
    summary:"Data Collection(데이터 수집)은 데이터 처리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 성능 이전에 입력 데이터의 품질과 형태를 통제하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["학습 데이터 준비·파이프라인", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Data Collection", "데이터 수집", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["잘못 처리하면 학습 결과에 어떤 문제가 생기는가?", "Data Collection의 입력과 출력은 무엇인가?", "데이터 수집를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "02.05": {
    summary:"Data Quality(데이터 품질)은 데이터 처리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 성능 이전에 입력 데이터의 품질과 형태를 통제하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["학습 데이터 준비·파이프라인", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Data Quality", "데이터 품질", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["잘못 처리하면 학습 결과에 어떤 문제가 생기는가?", "Data Quality의 입력과 출력은 무엇인가?", "데이터 품질를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "02.06": {
    summary:"Missing Values(결측치)은 데이터 처리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 성능 이전에 입력 데이터의 품질과 형태를 통제하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["학습 데이터 준비·파이프라인", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Missing Values", "결측치", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["잘못 처리하면 학습 결과에 어떤 문제가 생기는가?", "Missing Values의 입력과 출력은 무엇인가?", "결측치를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "02.07": {
    summary:"Outliers(이상치)은 데이터 처리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 성능 이전에 입력 데이터의 품질과 형태를 통제하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["학습 데이터 준비·파이프라인", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Outliers", "이상치", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["잘못 처리하면 학습 결과에 어떤 문제가 생기는가?", "Outliers의 입력과 출력은 무엇인가?", "이상치를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "02.08": {
    summary:"Categorical Encoding(범주형 인코딩)은 데이터 처리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 성능 이전에 입력 데이터의 품질과 형태를 통제하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["학습 데이터 준비·파이프라인", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Categorical Encoding", "범주형 인코딩", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["잘못 처리하면 학습 결과에 어떤 문제가 생기는가?", "Categorical Encoding의 입력과 출력은 무엇인가?", "범주형 인코딩를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "02.09": {
    summary:"Scaling & Standardization(스케일링과 표준화)은 데이터 처리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 성능 이전에 입력 데이터의 품질과 형태를 통제하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["학습 데이터 준비·파이프라인", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Scaling & Standardization", "스케일링과 표준화", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["잘못 처리하면 학습 결과에 어떤 문제가 생기는가?", "Scaling & Standardization의 입력과 출력은 무엇인가?", "스케일링과 표준화를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "02.10": {
    summary:"Normalization(정규화)은 데이터 처리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 성능 이전에 입력 데이터의 품질과 형태를 통제하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["학습 데이터 준비·파이프라인", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Normalization", "정규화", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["잘못 처리하면 학습 결과에 어떤 문제가 생기는가?", "Normalization의 입력과 출력은 무엇인가?", "정규화를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "02.11": {
    summary:"Feature Engineering(특징 공학)은 데이터 처리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 성능 이전에 입력 데이터의 품질과 형태를 통제하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["학습 데이터 준비·파이프라인", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Feature Engineering", "특징 공학", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["잘못 처리하면 학습 결과에 어떤 문제가 생기는가?", "Feature Engineering의 입력과 출력은 무엇인가?", "특징 공학를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "02.12": {
    summary:"Feature Selection(특징 선택)은 데이터 처리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 성능 이전에 입력 데이터의 품질과 형태를 통제하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["학습 데이터 준비·파이프라인", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Feature Selection", "특징 선택", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["잘못 처리하면 학습 결과에 어떤 문제가 생기는가?", "Feature Selection의 입력과 출력은 무엇인가?", "특징 선택를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "02.13": {
    summary:"Train / Validation / Test(학습·검증·테스트 분리)은 데이터 처리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 성능 이전에 입력 데이터의 품질과 형태를 통제하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["학습 데이터 준비·파이프라인", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Train / Validation / Test", "학습·검증·테스트 분리", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["잘못 처리하면 학습 결과에 어떤 문제가 생기는가?", "Train / Validation / Test의 입력과 출력은 무엇인가?", "학습·검증·테스트 분리를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "02.14": {
    summary:"Data Leakage(데이터 누수)은 데이터 처리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 성능 이전에 입력 데이터의 품질과 형태를 통제하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["학습 데이터 준비·파이프라인", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Data Leakage", "데이터 누수", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["잘못 처리하면 학습 결과에 어떤 문제가 생기는가?", "Data Leakage의 입력과 출력은 무엇인가?", "데이터 누수를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "02.15": {
    summary:"Class Imbalance(클래스 불균형)은 데이터 처리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 성능 이전에 입력 데이터의 품질과 형태를 통제하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["학습 데이터 준비·파이프라인", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Class Imbalance", "클래스 불균형", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["잘못 처리하면 학습 결과에 어떤 문제가 생기는가?", "Class Imbalance의 입력과 출력은 무엇인가?", "클래스 불균형를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "02.16": {
    summary:"Data Augmentation(데이터 증강)은 데이터 처리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 성능 이전에 입력 데이터의 품질과 형태를 통제하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["학습 데이터 준비·파이프라인", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Data Augmentation", "데이터 증강", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["잘못 처리하면 학습 결과에 어떤 문제가 생기는가?", "Data Augmentation의 입력과 출력은 무엇인가?", "데이터 증강를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "02.17": {
    summary:"Data Pipeline(데이터 파이프라인)은 데이터 처리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"모델 성능 이전에 입력 데이터의 품질과 형태를 통제하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["학습 데이터 준비·파이프라인", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Data Pipeline", "데이터 파이프라인", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["잘못 처리하면 학습 결과에 어떤 문제가 생기는가?", "Data Pipeline의 입력과 출력은 무엇인가?", "데이터 파이프라인를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "03.02": {
    summary:"Learning from Data(데이터에서 학습한다는 것)은 머신러닝 원리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"데이터에서 패턴을 학습하는 기본 메커니즘을 이해하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["예측·분류·추천·이상탐지", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Learning from Data", "데이터에서 학습한다는 것", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["학습 단계와 추론 단계에서 각각 어떤 역할을 하는가?", "Learning from Data의 입력과 출력은 무엇인가?", "데이터에서 학습한다는 것를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "03.03": {
    summary:"Training & Inference(학습과 추론)은 머신러닝 원리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"데이터에서 패턴을 학습하는 기본 메커니즘을 이해하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["예측·분류·추천·이상탐지", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Training & Inference", "학습과 추론", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["학습 단계와 추론 단계에서 각각 어떤 역할을 하는가?", "Training & Inference의 입력과 출력은 무엇인가?", "학습과 추론를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "03.04": {
    summary:"Supervised Learning(지도학습)은 머신러닝 원리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"데이터에서 패턴을 학습하는 기본 메커니즘을 이해하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["예측·분류·추천·이상탐지", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Supervised Learning", "지도학습", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["학습 단계와 추론 단계에서 각각 어떤 역할을 하는가?", "Supervised Learning의 입력과 출력은 무엇인가?", "지도학습를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "03.05": {
    summary:"Regression(회귀)은 머신러닝 원리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"데이터에서 패턴을 학습하는 기본 메커니즘을 이해하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["예측·분류·추천·이상탐지", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Regression", "회귀", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["학습 단계와 추론 단계에서 각각 어떤 역할을 하는가?", "Regression의 입력과 출력은 무엇인가?", "회귀를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "03.06": {
    summary:"Classification(분류)은 머신러닝 원리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"데이터에서 패턴을 학습하는 기본 메커니즘을 이해하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["예측·분류·추천·이상탐지", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Classification", "분류", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["학습 단계와 추론 단계에서 각각 어떤 역할을 하는가?", "Classification의 입력과 출력은 무엇인가?", "분류를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "03.07": {
    summary:"Unsupervised Learning(비지도학습)은 머신러닝 원리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"데이터에서 패턴을 학습하는 기본 메커니즘을 이해하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["예측·분류·추천·이상탐지", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Unsupervised Learning", "비지도학습", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["학습 단계와 추론 단계에서 각각 어떤 역할을 하는가?", "Unsupervised Learning의 입력과 출력은 무엇인가?", "비지도학습를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "03.08": {
    summary:"Clustering(군집화)은 머신러닝 원리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"데이터에서 패턴을 학습하는 기본 메커니즘을 이해하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["예측·분류·추천·이상탐지", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Clustering", "군집화", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["학습 단계와 추론 단계에서 각각 어떤 역할을 하는가?", "Clustering의 입력과 출력은 무엇인가?", "군집화를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "03.09": {
    summary:"Dimensionality Reduction(차원 축소)은 머신러닝 원리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"데이터에서 패턴을 학습하는 기본 메커니즘을 이해하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["예측·분류·추천·이상탐지", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Dimensionality Reduction", "차원 축소", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["학습 단계와 추론 단계에서 각각 어떤 역할을 하는가?", "Dimensionality Reduction의 입력과 출력은 무엇인가?", "차원 축소를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "03.10": {
    summary:"Semi-supervised Learning(준지도학습)은 머신러닝 원리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"데이터에서 패턴을 학습하는 기본 메커니즘을 이해하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["예측·분류·추천·이상탐지", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Semi-supervised Learning", "준지도학습", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["학습 단계와 추론 단계에서 각각 어떤 역할을 하는가?", "Semi-supervised Learning의 입력과 출력은 무엇인가?", "준지도학습를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "03.11": {
    summary:"Self-supervised Learning(자기지도학습)은 머신러닝 원리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"데이터에서 패턴을 학습하는 기본 메커니즘을 이해하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["예측·분류·추천·이상탐지", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Self-supervised Learning", "자기지도학습", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["학습 단계와 추론 단계에서 각각 어떤 역할을 하는가?", "Self-supervised Learning의 입력과 출력은 무엇인가?", "자기지도학습를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "03.12": {
    summary:"Reinforcement Learning(강화학습)은 머신러닝 원리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"데이터에서 패턴을 학습하는 기본 메커니즘을 이해하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["예측·분류·추천·이상탐지", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Reinforcement Learning", "강화학습", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["학습 단계와 추론 단계에서 각각 어떤 역할을 하는가?", "Reinforcement Learning의 입력과 출력은 무엇인가?", "강화학습를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "03.13": {
    summary:"Generalization(일반화)은 머신러닝 원리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"데이터에서 패턴을 학습하는 기본 메커니즘을 이해하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["예측·분류·추천·이상탐지", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Generalization", "일반화", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["학습 단계와 추론 단계에서 각각 어떤 역할을 하는가?", "Generalization의 입력과 출력은 무엇인가?", "일반화를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "03.14": {
    summary:"Overfitting & Underfitting(과적합과 과소적합)은 머신러닝 원리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"데이터에서 패턴을 학습하는 기본 메커니즘을 이해하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["예측·분류·추천·이상탐지", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Overfitting & Underfitting", "과적합과 과소적합", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["학습 단계와 추론 단계에서 각각 어떤 역할을 하는가?", "Overfitting & Underfitting의 입력과 출력은 무엇인가?", "과적합과 과소적합를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "03.15": {
    summary:"Bias & Variance(편향과 분산)은 머신러닝 원리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"데이터에서 패턴을 학습하는 기본 메커니즘을 이해하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["예측·분류·추천·이상탐지", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Bias & Variance", "편향과 분산", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["학습 단계와 추론 단계에서 각각 어떤 역할을 하는가?", "Bias & Variance의 입력과 출력은 무엇인가?", "편향과 분산를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "03.16": {
    summary:"Parameters vs Hyperparameters(파라미터와 하이퍼파라미터)은 머신러닝 원리에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"데이터에서 패턴을 학습하는 기본 메커니즘을 이해하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["예측·분류·추천·이상탐지", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Parameters vs Hyperparameters", "파라미터와 하이퍼파라미터", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["학습 단계와 추론 단계에서 각각 어떤 역할을 하는가?", "Parameters vs Hyperparameters의 입력과 출력은 무엇인가?", "파라미터와 하이퍼파라미터를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "04.01": {
    summary:"Linear Regression(선형 회귀)은 전통 ML 알고리즘에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"문제와 데이터에 맞는 모델의 작동 방식을 비교하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["정형 데이터 예측·분류·군집화", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Linear Regression", "선형 회귀", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 알고리즘은 어떤 가정으로 경계를 만들거나 값을 예측하는가?", "Linear Regression의 입력과 출력은 무엇인가?", "선형 회귀를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "04.02": {
    summary:"Polynomial Regression(다항 회귀)은 전통 ML 알고리즘에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"문제와 데이터에 맞는 모델의 작동 방식을 비교하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["정형 데이터 예측·분류·군집화", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Polynomial Regression", "다항 회귀", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 알고리즘은 어떤 가정으로 경계를 만들거나 값을 예측하는가?", "Polynomial Regression의 입력과 출력은 무엇인가?", "다항 회귀를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "04.03": {
    summary:"Logistic Regression(로지스틱 회귀)은 전통 ML 알고리즘에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"문제와 데이터에 맞는 모델의 작동 방식을 비교하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["정형 데이터 예측·분류·군집화", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Logistic Regression", "로지스틱 회귀", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 알고리즘은 어떤 가정으로 경계를 만들거나 값을 예측하는가?", "Logistic Regression의 입력과 출력은 무엇인가?", "로지스틱 회귀를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "04.04": {
    summary:"k-Nearest Neighbors(k-NN)은 전통 ML 알고리즘에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"문제와 데이터에 맞는 모델의 작동 방식을 비교하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["정형 데이터 예측·분류·군집화", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["k-Nearest Neighbors", "k-NN", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 알고리즘은 어떤 가정으로 경계를 만들거나 값을 예측하는가?", "k-Nearest Neighbors의 입력과 출력은 무엇인가?", "k-NN를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "04.05": {
    summary:"Naive Bayes(나이브 베이즈)은 전통 ML 알고리즘에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"문제와 데이터에 맞는 모델의 작동 방식을 비교하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["정형 데이터 예측·분류·군집화", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Naive Bayes", "나이브 베이즈", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 알고리즘은 어떤 가정으로 경계를 만들거나 값을 예측하는가?", "Naive Bayes의 입력과 출력은 무엇인가?", "나이브 베이즈를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "04.06": {
    summary:"Decision Tree(결정 트리)은 전통 ML 알고리즘에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"문제와 데이터에 맞는 모델의 작동 방식을 비교하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["정형 데이터 예측·분류·군집화", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Decision Tree", "결정 트리", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 알고리즘은 어떤 가정으로 경계를 만들거나 값을 예측하는가?", "Decision Tree의 입력과 출력은 무엇인가?", "결정 트리를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "04.07": {
    summary:"Random Forest(랜덤 포레스트)은 전통 ML 알고리즘에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"문제와 데이터에 맞는 모델의 작동 방식을 비교하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["정형 데이터 예측·분류·군집화", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Random Forest", "랜덤 포레스트", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 알고리즘은 어떤 가정으로 경계를 만들거나 값을 예측하는가?", "Random Forest의 입력과 출력은 무엇인가?", "랜덤 포레스트를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "04.08": {
    summary:"Gradient Boosting(그래디언트 부스팅)은 전통 ML 알고리즘에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"문제와 데이터에 맞는 모델의 작동 방식을 비교하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["정형 데이터 예측·분류·군집화", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Gradient Boosting", "그래디언트 부스팅", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 알고리즘은 어떤 가정으로 경계를 만들거나 값을 예측하는가?", "Gradient Boosting의 입력과 출력은 무엇인가?", "그래디언트 부스팅를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "04.09": {
    summary:"XGBoost / LightGBM Concepts(XGBoost·LightGBM 개념)은 전통 ML 알고리즘에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"문제와 데이터에 맞는 모델의 작동 방식을 비교하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["정형 데이터 예측·분류·군집화", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["XGBoost / LightGBM Concepts", "XGBoost·LightGBM 개념", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 알고리즘은 어떤 가정으로 경계를 만들거나 값을 예측하는가?", "XGBoost / LightGBM Concepts의 입력과 출력은 무엇인가?", "XGBoost·LightGBM 개념를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "04.10": {
    summary:"Support Vector Machine(SVM)은 전통 ML 알고리즘에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"문제와 데이터에 맞는 모델의 작동 방식을 비교하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["정형 데이터 예측·분류·군집화", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Support Vector Machine", "SVM", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 알고리즘은 어떤 가정으로 경계를 만들거나 값을 예측하는가?", "Support Vector Machine의 입력과 출력은 무엇인가?", "SVM를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "04.11": {
    summary:"k-Means(k-Means)은 전통 ML 알고리즘에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"문제와 데이터에 맞는 모델의 작동 방식을 비교하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["정형 데이터 예측·분류·군집화", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["k-Means", "k-Means", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 알고리즘은 어떤 가정으로 경계를 만들거나 값을 예측하는가?", "k-Means의 입력과 출력은 무엇인가?", "k-Means를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "04.12": {
    summary:"Hierarchical Clustering(계층적 군집화)은 전통 ML 알고리즘에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"문제와 데이터에 맞는 모델의 작동 방식을 비교하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["정형 데이터 예측·분류·군집화", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Hierarchical Clustering", "계층적 군집화", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 알고리즘은 어떤 가정으로 경계를 만들거나 값을 예측하는가?", "Hierarchical Clustering의 입력과 출력은 무엇인가?", "계층적 군집화를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "04.13": {
    summary:"DBSCAN(DBSCAN)은 전통 ML 알고리즘에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"문제와 데이터에 맞는 모델의 작동 방식을 비교하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["정형 데이터 예측·분류·군집화", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["DBSCAN", "DBSCAN", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 알고리즘은 어떤 가정으로 경계를 만들거나 값을 예측하는가?", "DBSCAN의 입력과 출력은 무엇인가?", "DBSCAN를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "04.14": {
    summary:"PCA(주성분 분석)은 전통 ML 알고리즘에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"문제와 데이터에 맞는 모델의 작동 방식을 비교하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["정형 데이터 예측·분류·군집화", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["PCA", "주성분 분석", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 알고리즘은 어떤 가정으로 경계를 만들거나 값을 예측하는가?", "PCA의 입력과 출력은 무엇인가?", "주성분 분석를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "04.15": {
    summary:"Ensemble Learning(앙상블 학습)은 전통 ML 알고리즘에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"문제와 데이터에 맞는 모델의 작동 방식을 비교하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["정형 데이터 예측·분류·군집화", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Ensemble Learning", "앙상블 학습", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["이 알고리즘은 어떤 가정으로 경계를 만들거나 값을 예측하는가?", "Ensemble Learning의 입력과 출력은 무엇인가?", "앙상블 학습를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "05.01": {
    summary:"Loss vs Metric(손실과 평가 지표)은 모델 평가에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"좋아 보이는 모델과 실제로 일반화하는 모델을 구분하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["검증·튜닝·모델 선택", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Loss vs Metric", "손실과 평가 지표", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["지표 값이 좋아져도 놓칠 수 있는 실패는 무엇인가?", "Loss vs Metric의 입력과 출력은 무엇인가?", "손실과 평가 지표를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "05.02": {
    summary:"MAE / MSE / RMSE(회귀 평가 지표)은 모델 평가에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"좋아 보이는 모델과 실제로 일반화하는 모델을 구분하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["검증·튜닝·모델 선택", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["MAE / MSE / RMSE", "회귀 평가 지표", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["지표 값이 좋아져도 놓칠 수 있는 실패는 무엇인가?", "MAE / MSE / RMSE의 입력과 출력은 무엇인가?", "회귀 평가 지표를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "05.03": {
    summary:"Accuracy(정확도)은 모델 평가에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"좋아 보이는 모델과 실제로 일반화하는 모델을 구분하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["검증·튜닝·모델 선택", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Accuracy", "정확도", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["지표 값이 좋아져도 놓칠 수 있는 실패는 무엇인가?", "Accuracy의 입력과 출력은 무엇인가?", "정확도를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "05.04": {
    summary:"Confusion Matrix(혼동 행렬)은 모델 평가에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"좋아 보이는 모델과 실제로 일반화하는 모델을 구분하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["검증·튜닝·모델 선택", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Confusion Matrix", "혼동 행렬", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["지표 값이 좋아져도 놓칠 수 있는 실패는 무엇인가?", "Confusion Matrix의 입력과 출력은 무엇인가?", "혼동 행렬를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "05.05": {
    summary:"Precision / Recall / F1(정밀도·재현율·F1)은 모델 평가에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"좋아 보이는 모델과 실제로 일반화하는 모델을 구분하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["검증·튜닝·모델 선택", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Precision / Recall / F1", "정밀도·재현율·F1", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["지표 값이 좋아져도 놓칠 수 있는 실패는 무엇인가?", "Precision / Recall / F1의 입력과 출력은 무엇인가?", "정밀도·재현율·F1를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "05.06": {
    summary:"ROC & AUC(ROC와 AUC)은 모델 평가에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"좋아 보이는 모델과 실제로 일반화하는 모델을 구분하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["검증·튜닝·모델 선택", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["ROC & AUC", "ROC와 AUC", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["지표 값이 좋아져도 놓칠 수 있는 실패는 무엇인가?", "ROC & AUC의 입력과 출력은 무엇인가?", "ROC와 AUC를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "05.07": {
    summary:"Threshold(분류 임계값)은 모델 평가에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"좋아 보이는 모델과 실제로 일반화하는 모델을 구분하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["검증·튜닝·모델 선택", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Threshold", "분류 임계값", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["지표 값이 좋아져도 놓칠 수 있는 실패는 무엇인가?", "Threshold의 입력과 출력은 무엇인가?", "분류 임계값를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "05.08": {
    summary:"Cross Validation(교차 검증)은 모델 평가에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"좋아 보이는 모델과 실제로 일반화하는 모델을 구분하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["검증·튜닝·모델 선택", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Cross Validation", "교차 검증", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["지표 값이 좋아져도 놓칠 수 있는 실패는 무엇인가?", "Cross Validation의 입력과 출력은 무엇인가?", "교차 검증를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "05.09": {
    summary:"Baseline Model(베이스라인 모델)은 모델 평가에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"좋아 보이는 모델과 실제로 일반화하는 모델을 구분하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["검증·튜닝·모델 선택", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Baseline Model", "베이스라인 모델", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["지표 값이 좋아져도 놓칠 수 있는 실패는 무엇인가?", "Baseline Model의 입력과 출력은 무엇인가?", "베이스라인 모델를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "05.10": {
    summary:"Hyperparameter Tuning(하이퍼파라미터 튜닝)은 모델 평가에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"좋아 보이는 모델과 실제로 일반화하는 모델을 구분하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["검증·튜닝·모델 선택", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Hyperparameter Tuning", "하이퍼파라미터 튜닝", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["지표 값이 좋아져도 놓칠 수 있는 실패는 무엇인가?", "Hyperparameter Tuning의 입력과 출력은 무엇인가?", "하이퍼파라미터 튜닝를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "05.11": {
    summary:"Grid / Random Search(Grid·Random Search)은 모델 평가에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"좋아 보이는 모델과 실제로 일반화하는 모델을 구분하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["검증·튜닝·모델 선택", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Grid / Random Search", "Grid·Random Search", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["지표 값이 좋아져도 놓칠 수 있는 실패는 무엇인가?", "Grid / Random Search의 입력과 출력은 무엇인가?", "Grid·Random Search를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "05.12": {
    summary:"Regularization(규제)은 모델 평가에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"좋아 보이는 모델과 실제로 일반화하는 모델을 구분하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["검증·튜닝·모델 선택", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Regularization", "규제", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["지표 값이 좋아져도 놓칠 수 있는 실패는 무엇인가?", "Regularization의 입력과 출력은 무엇인가?", "규제를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "05.13": {
    summary:"L1 & L2(L1·L2 규제)은 모델 평가에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"좋아 보이는 모델과 실제로 일반화하는 모델을 구분하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["검증·튜닝·모델 선택", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["L1 & L2", "L1·L2 규제", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["지표 값이 좋아져도 놓칠 수 있는 실패는 무엇인가?", "L1 & L2의 입력과 출력은 무엇인가?", "L1·L2 규제를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "05.14": {
    summary:"Learning Curve(학습 곡선)은 모델 평가에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"좋아 보이는 모델과 실제로 일반화하는 모델을 구분하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["검증·튜닝·모델 선택", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Learning Curve", "학습 곡선", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["지표 값이 좋아져도 놓칠 수 있는 실패는 무엇인가?", "Learning Curve의 입력과 출력은 무엇인가?", "학습 곡선를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "05.15": {
    summary:"Error Analysis(오류 분석)은 모델 평가에서 반드시 위치와 역할을 이해해야 하는 개념입니다. 정의만 암기하지 않고 입력이 어떻게 변하고 결과에 어떤 영향을 주는지 단계적으로 확인합니다.",
    why:"좋아 보이는 모델과 실제로 일반화하는 모델을 구분하는 데 필요한 핵심 Topic입니다. 이후 개념에서 다시 등장할 때 계산 흐름을 놓치지 않게 해줍니다.",
    usedFor:["검증·튜닝·모델 선택", "Interactive Lab", "후속 Topic 선수지식"],
    keyPoints:["Error Analysis", "오류 분석", "입력 → 처리 → 결과", "실제 AI에서의 연결"],
    questions:["지표 값이 좋아져도 놓칠 수 있는 실패는 무엇인가?", "Error Analysis의 입력과 출력은 무엇인가?", "오류 분석를 실제 AI 사례 하나로 설명할 수 있는가?"],
    visualType:"generic"
  },
  "06.02": {
    summary:"ML vs Deep Learning(ML과 DL 비교)은 신경망이 입력을 내부 표현으로 바꾸는 과정의 핵심 구성요소입니다. 개별 계산이 Layer와 Network로 확장되는 흐름 속에서 이해합니다.",
    why:"딥러닝의 Forward 계산을 구성하는 핵심 요소입니다. 이 구조를 이해해야 Loss와 Backpropagation에서 어떤 값이 왜 바뀌는지 추적할 수 있습니다.",
    usedFor:["Neural Network", "Forward Propagation", "Deep Learning", "후속 학습 구조"],
    keyPoints:["ML vs Deep Learning", "ML과 DL 비교", "입력 → 변환 → 출력", "Neuron과 Layer의 연결"],
    questions:["ML과 DL 비교은 신경망의 어느 위치에서 동작하는가?", "ML vs Deep Learning의 입력과 출력은 무엇인가?", "값이나 구조를 바꾸면 Forward 결과는 어떻게 달라지는가?"],
    visualType:"dl-network"
  },
  "06.03": {
    summary:"Representation Learning(표현 학습)은 신경망이 입력을 내부 표현으로 바꾸는 과정의 핵심 구성요소입니다. 개별 계산이 Layer와 Network로 확장되는 흐름 속에서 이해합니다.",
    why:"딥러닝의 Forward 계산을 구성하는 핵심 요소입니다. 이 구조를 이해해야 Loss와 Backpropagation에서 어떤 값이 왜 바뀌는지 추적할 수 있습니다.",
    usedFor:["Neural Network", "Forward Propagation", "Deep Learning", "후속 학습 구조"],
    keyPoints:["Representation Learning", "표현 학습", "입력 → 변환 → 출력", "Neuron과 Layer의 연결"],
    questions:["표현 학습은 신경망의 어느 위치에서 동작하는가?", "Representation Learning의 입력과 출력은 무엇인가?", "값이나 구조를 바꾸면 Forward 결과는 어떻게 달라지는가?"],
    visualType:"dl-network"
  },
  "06.04": {
    summary:"Perceptron(퍼셉트론)은 신경망이 입력을 내부 표현으로 바꾸는 과정의 핵심 구성요소입니다. 개별 계산이 Layer와 Network로 확장되는 흐름 속에서 이해합니다.",
    why:"딥러닝의 Forward 계산을 구성하는 핵심 요소입니다. 이 구조를 이해해야 Loss와 Backpropagation에서 어떤 값이 왜 바뀌는지 추적할 수 있습니다.",
    usedFor:["Neural Network", "Forward Propagation", "Deep Learning", "후속 학습 구조"],
    keyPoints:["Perceptron", "퍼셉트론", "입력 → 변환 → 출력", "Neuron과 Layer의 연결"],
    questions:["퍼셉트론은 신경망의 어느 위치에서 동작하는가?", "Perceptron의 입력과 출력은 무엇인가?", "값이나 구조를 바꾸면 Forward 결과는 어떻게 달라지는가?"],
    visualType:"dl-network"
  },
  "06.06": {
    summary:"Input / Weight / Bias(입력·가중치·편향)은 신경망이 입력을 내부 표현으로 바꾸는 과정의 핵심 구성요소입니다. 개별 계산이 Layer와 Network로 확장되는 흐름 속에서 이해합니다.",
    why:"딥러닝의 Forward 계산을 구성하는 핵심 요소입니다. 이 구조를 이해해야 Loss와 Backpropagation에서 어떤 값이 왜 바뀌는지 추적할 수 있습니다.",
    usedFor:["Neural Network", "Forward Propagation", "Deep Learning", "후속 학습 구조"],
    keyPoints:["Input / Weight / Bias", "입력·가중치·편향", "입력 → 변환 → 출력", "Neuron과 Layer의 연결"],
    questions:["입력·가중치·편향은 신경망의 어느 위치에서 동작하는가?", "Input / Weight / Bias의 입력과 출력은 무엇인가?", "값이나 구조를 바꾸면 Forward 결과는 어떻게 달라지는가?"],
    visualType:"dl-network"
  },
  "06.07": {
    summary:"Weighted Sum(가중합)은 신경망이 입력을 내부 표현으로 바꾸는 과정의 핵심 구성요소입니다. 개별 계산이 Layer와 Network로 확장되는 흐름 속에서 이해합니다.",
    why:"딥러닝의 Forward 계산을 구성하는 핵심 요소입니다. 이 구조를 이해해야 Loss와 Backpropagation에서 어떤 값이 왜 바뀌는지 추적할 수 있습니다.",
    usedFor:["Neural Network", "Forward Propagation", "Deep Learning", "후속 학습 구조"],
    keyPoints:["Weighted Sum", "가중합", "입력 → 변환 → 출력", "Neuron과 Layer의 연결"],
    questions:["가중합은 신경망의 어느 위치에서 동작하는가?", "Weighted Sum의 입력과 출력은 무엇인가?", "값이나 구조를 바꾸면 Forward 결과는 어떻게 달라지는가?"],
    visualType:"dl-network"
  },
  "06.09": {
    summary:"Sigmoid / Tanh / ReLU(대표 활성화 함수)은 신경망이 입력을 내부 표현으로 바꾸는 과정의 핵심 구성요소입니다. 개별 계산이 Layer와 Network로 확장되는 흐름 속에서 이해합니다.",
    why:"딥러닝의 Forward 계산을 구성하는 핵심 요소입니다. 이 구조를 이해해야 Loss와 Backpropagation에서 어떤 값이 왜 바뀌는지 추적할 수 있습니다.",
    usedFor:["Neural Network", "Forward Propagation", "Deep Learning", "후속 학습 구조"],
    keyPoints:["Sigmoid / Tanh / ReLU", "대표 활성화 함수", "입력 → 변환 → 출력", "Neuron과 Layer의 연결"],
    questions:["대표 활성화 함수은 신경망의 어느 위치에서 동작하는가?", "Sigmoid / Tanh / ReLU의 입력과 출력은 무엇인가?", "값이나 구조를 바꾸면 Forward 결과는 어떻게 달라지는가?"],
    visualType:"dl-network"
  },
  "06.10": {
    summary:"Layer(레이어)은 신경망이 입력을 내부 표현으로 바꾸는 과정의 핵심 구성요소입니다. 개별 계산이 Layer와 Network로 확장되는 흐름 속에서 이해합니다.",
    why:"딥러닝의 Forward 계산을 구성하는 핵심 요소입니다. 이 구조를 이해해야 Loss와 Backpropagation에서 어떤 값이 왜 바뀌는지 추적할 수 있습니다.",
    usedFor:["Neural Network", "Forward Propagation", "Deep Learning", "후속 학습 구조"],
    keyPoints:["Layer", "레이어", "입력 → 변환 → 출력", "Neuron과 Layer의 연결"],
    questions:["레이어은 신경망의 어느 위치에서 동작하는가?", "Layer의 입력과 출력은 무엇인가?", "값이나 구조를 바꾸면 Forward 결과는 어떻게 달라지는가?"],
    visualType:"dl-network"
  },
  "06.11": {
    summary:"Hidden Layer(은닉층)은 신경망이 입력을 내부 표현으로 바꾸는 과정의 핵심 구성요소입니다. 개별 계산이 Layer와 Network로 확장되는 흐름 속에서 이해합니다.",
    why:"딥러닝의 Forward 계산을 구성하는 핵심 요소입니다. 이 구조를 이해해야 Loss와 Backpropagation에서 어떤 값이 왜 바뀌는지 추적할 수 있습니다.",
    usedFor:["Neural Network", "Forward Propagation", "Deep Learning", "후속 학습 구조"],
    keyPoints:["Hidden Layer", "은닉층", "입력 → 변환 → 출력", "Neuron과 Layer의 연결"],
    questions:["은닉층은 신경망의 어느 위치에서 동작하는가?", "Hidden Layer의 입력과 출력은 무엇인가?", "값이나 구조를 바꾸면 Forward 결과는 어떻게 달라지는가?"],
    visualType:"dl-network"
  },
  "06.12": {
    summary:"Neural Network(신경망)은 신경망이 입력을 내부 표현으로 바꾸는 과정의 핵심 구성요소입니다. 개별 계산이 Layer와 Network로 확장되는 흐름 속에서 이해합니다.",
    why:"딥러닝의 Forward 계산을 구성하는 핵심 요소입니다. 이 구조를 이해해야 Loss와 Backpropagation에서 어떤 값이 왜 바뀌는지 추적할 수 있습니다.",
    usedFor:["Neural Network", "Forward Propagation", "Deep Learning", "후속 학습 구조"],
    keyPoints:["Neural Network", "신경망", "입력 → 변환 → 출력", "Neuron과 Layer의 연결"],
    questions:["신경망은 신경망의 어느 위치에서 동작하는가?", "Neural Network의 입력과 출력은 무엇인가?", "값이나 구조를 바꾸면 Forward 결과는 어떻게 달라지는가?"],
    visualType:"dl-network"
  },
  "06.13": {
    summary:"Forward Propagation(순전파)은 신경망이 입력을 내부 표현으로 바꾸는 과정의 핵심 구성요소입니다. 개별 계산이 Layer와 Network로 확장되는 흐름 속에서 이해합니다.",
    why:"딥러닝의 Forward 계산을 구성하는 핵심 요소입니다. 이 구조를 이해해야 Loss와 Backpropagation에서 어떤 값이 왜 바뀌는지 추적할 수 있습니다.",
    usedFor:["Neural Network", "Forward Propagation", "Deep Learning", "후속 학습 구조"],
    keyPoints:["Forward Propagation", "순전파", "입력 → 변환 → 출력", "Neuron과 Layer의 연결"],
    questions:["순전파은 신경망의 어느 위치에서 동작하는가?", "Forward Propagation의 입력과 출력은 무엇인가?", "값이나 구조를 바꾸면 Forward 결과는 어떻게 달라지는가?"],
    visualType:"dl-network"
  },
  "06.14": {
    summary:"Output Layer(출력층)은 신경망이 입력을 내부 표현으로 바꾸는 과정의 핵심 구성요소입니다. 개별 계산이 Layer와 Network로 확장되는 흐름 속에서 이해합니다.",
    why:"딥러닝의 Forward 계산을 구성하는 핵심 요소입니다. 이 구조를 이해해야 Loss와 Backpropagation에서 어떤 값이 왜 바뀌는지 추적할 수 있습니다.",
    usedFor:["Neural Network", "Forward Propagation", "Deep Learning", "후속 학습 구조"],
    keyPoints:["Output Layer", "출력층", "입력 → 변환 → 출력", "Neuron과 Layer의 연결"],
    questions:["출력층은 신경망의 어느 위치에서 동작하는가?", "Output Layer의 입력과 출력은 무엇인가?", "값이나 구조를 바꾸면 Forward 결과는 어떻게 달라지는가?"],
    visualType:"dl-network"
  },
  "06.15": {
    summary:"Universal Approximation Intuition(범용 근사 직관)은 신경망이 입력을 내부 표현으로 바꾸는 과정의 핵심 구성요소입니다. 개별 계산이 Layer와 Network로 확장되는 흐름 속에서 이해합니다.",
    why:"딥러닝의 Forward 계산을 구성하는 핵심 요소입니다. 이 구조를 이해해야 Loss와 Backpropagation에서 어떤 값이 왜 바뀌는지 추적할 수 있습니다.",
    usedFor:["Neural Network", "Forward Propagation", "Deep Learning", "후속 학습 구조"],
    keyPoints:["Universal Approximation Intuition", "범용 근사 직관", "입력 → 변환 → 출력", "Neuron과 Layer의 연결"],
    questions:["범용 근사 직관은 신경망의 어느 위치에서 동작하는가?", "Universal Approximation Intuition의 입력과 출력은 무엇인가?", "값이나 구조를 바꾸면 Forward 결과는 어떻게 달라지는가?"],
    visualType:"dl-network"
  },
  "07.01": {
    summary:"Loss Function(손실 함수)은 예측 오차를 줄이기 위해 신경망 파라미터를 갱신하는 학습 과정의 핵심 개념입니다. 계산 그래프에서 Gradient가 어떻게 전달되고 Weight가 어떻게 바뀌는지 연결해 봅니다.",
    why:"신경망이 단순히 예측하는 것을 넘어 오차를 이용해 스스로 파라미터를 개선하는 원리를 이해하는 데 필요합니다.",
    usedFor:["Model Training", "Backpropagation", "Optimizer", "Training Loop"],
    keyPoints:["Loss Function", "손실 함수", "Forward → Loss → Backward → Update", "파라미터 변화와 학습 안정성"],
    questions:["손실 함수은 학습 루프의 어느 단계에서 필요한가?", "Loss Function이 Weight 업데이트에 어떤 영향을 주는가?", "설정을 잘못하면 학습이 어떤 형태로 실패하는가?"],
    visualType:"dl-network"
  },
  "07.02": {
    summary:"Gradient Descent(경사하강법)은 예측 오차를 줄이기 위해 신경망 파라미터를 갱신하는 학습 과정의 핵심 개념입니다. 계산 그래프에서 Gradient가 어떻게 전달되고 Weight가 어떻게 바뀌는지 연결해 봅니다.",
    why:"신경망이 단순히 예측하는 것을 넘어 오차를 이용해 스스로 파라미터를 개선하는 원리를 이해하는 데 필요합니다.",
    usedFor:["Model Training", "Backpropagation", "Optimizer", "Training Loop"],
    keyPoints:["Gradient Descent", "경사하강법", "Forward → Loss → Backward → Update", "파라미터 변화와 학습 안정성"],
    questions:["경사하강법은 학습 루프의 어느 단계에서 필요한가?", "Gradient Descent이 Weight 업데이트에 어떤 영향을 주는가?", "설정을 잘못하면 학습이 어떤 형태로 실패하는가?"],
    visualType:"dl-network"
  },
  "07.03": {
    summary:"Chain Rule in Networks(신경망의 연쇄 법칙)은 예측 오차를 줄이기 위해 신경망 파라미터를 갱신하는 학습 과정의 핵심 개념입니다. 계산 그래프에서 Gradient가 어떻게 전달되고 Weight가 어떻게 바뀌는지 연결해 봅니다.",
    why:"신경망이 단순히 예측하는 것을 넘어 오차를 이용해 스스로 파라미터를 개선하는 원리를 이해하는 데 필요합니다.",
    usedFor:["Model Training", "Backpropagation", "Optimizer", "Training Loop"],
    keyPoints:["Chain Rule in Networks", "신경망의 연쇄 법칙", "Forward → Loss → Backward → Update", "파라미터 변화와 학습 안정성"],
    questions:["신경망의 연쇄 법칙은 학습 루프의 어느 단계에서 필요한가?", "Chain Rule in Networks이 Weight 업데이트에 어떤 영향을 주는가?", "설정을 잘못하면 학습이 어떤 형태로 실패하는가?"],
    visualType:"dl-network"
  },
  "07.04": {
    summary:"Backpropagation(역전파)은 예측 오차를 줄이기 위해 신경망 파라미터를 갱신하는 학습 과정의 핵심 개념입니다. 계산 그래프에서 Gradient가 어떻게 전달되고 Weight가 어떻게 바뀌는지 연결해 봅니다.",
    why:"신경망이 단순히 예측하는 것을 넘어 오차를 이용해 스스로 파라미터를 개선하는 원리를 이해하는 데 필요합니다.",
    usedFor:["Model Training", "Backpropagation", "Optimizer", "Training Loop"],
    keyPoints:["Backpropagation", "역전파", "Forward → Loss → Backward → Update", "파라미터 변화와 학습 안정성"],
    questions:["역전파은 학습 루프의 어느 단계에서 필요한가?", "Backpropagation이 Weight 업데이트에 어떤 영향을 주는가?", "설정을 잘못하면 학습이 어떤 형태로 실패하는가?"],
    visualType:"dl-network"
  },
  "07.05": {
    summary:"Computational Graph(계산 그래프)은 예측 오차를 줄이기 위해 신경망 파라미터를 갱신하는 학습 과정의 핵심 개념입니다. 계산 그래프에서 Gradient가 어떻게 전달되고 Weight가 어떻게 바뀌는지 연결해 봅니다.",
    why:"신경망이 단순히 예측하는 것을 넘어 오차를 이용해 스스로 파라미터를 개선하는 원리를 이해하는 데 필요합니다.",
    usedFor:["Model Training", "Backpropagation", "Optimizer", "Training Loop"],
    keyPoints:["Computational Graph", "계산 그래프", "Forward → Loss → Backward → Update", "파라미터 변화와 학습 안정성"],
    questions:["계산 그래프은 학습 루프의 어느 단계에서 필요한가?", "Computational Graph이 Weight 업데이트에 어떤 영향을 주는가?", "설정을 잘못하면 학습이 어떤 형태로 실패하는가?"],
    visualType:"dl-network"
  },
  "07.06": {
    summary:"SGD(확률적 경사하강법)은 예측 오차를 줄이기 위해 신경망 파라미터를 갱신하는 학습 과정의 핵심 개념입니다. 계산 그래프에서 Gradient가 어떻게 전달되고 Weight가 어떻게 바뀌는지 연결해 봅니다.",
    why:"신경망이 단순히 예측하는 것을 넘어 오차를 이용해 스스로 파라미터를 개선하는 원리를 이해하는 데 필요합니다.",
    usedFor:["Model Training", "Backpropagation", "Optimizer", "Training Loop"],
    keyPoints:["SGD", "확률적 경사하강법", "Forward → Loss → Backward → Update", "파라미터 변화와 학습 안정성"],
    questions:["확률적 경사하강법은 학습 루프의 어느 단계에서 필요한가?", "SGD이 Weight 업데이트에 어떤 영향을 주는가?", "설정을 잘못하면 학습이 어떤 형태로 실패하는가?"],
    visualType:"dl-network"
  },
  "07.07": {
    summary:"Momentum(모멘텀)은 예측 오차를 줄이기 위해 신경망 파라미터를 갱신하는 학습 과정의 핵심 개념입니다. 계산 그래프에서 Gradient가 어떻게 전달되고 Weight가 어떻게 바뀌는지 연결해 봅니다.",
    why:"신경망이 단순히 예측하는 것을 넘어 오차를 이용해 스스로 파라미터를 개선하는 원리를 이해하는 데 필요합니다.",
    usedFor:["Model Training", "Backpropagation", "Optimizer", "Training Loop"],
    keyPoints:["Momentum", "모멘텀", "Forward → Loss → Backward → Update", "파라미터 변화와 학습 안정성"],
    questions:["모멘텀은 학습 루프의 어느 단계에서 필요한가?", "Momentum이 Weight 업데이트에 어떤 영향을 주는가?", "설정을 잘못하면 학습이 어떤 형태로 실패하는가?"],
    visualType:"dl-network"
  },
  "07.08": {
    summary:"Adam(Adam)은 예측 오차를 줄이기 위해 신경망 파라미터를 갱신하는 학습 과정의 핵심 개념입니다. 계산 그래프에서 Gradient가 어떻게 전달되고 Weight가 어떻게 바뀌는지 연결해 봅니다.",
    why:"신경망이 단순히 예측하는 것을 넘어 오차를 이용해 스스로 파라미터를 개선하는 원리를 이해하는 데 필요합니다.",
    usedFor:["Model Training", "Backpropagation", "Optimizer", "Training Loop"],
    keyPoints:["Adam", "Adam", "Forward → Loss → Backward → Update", "파라미터 변화와 학습 안정성"],
    questions:["Adam은 학습 루프의 어느 단계에서 필요한가?", "Adam이 Weight 업데이트에 어떤 영향을 주는가?", "설정을 잘못하면 학습이 어떤 형태로 실패하는가?"],
    visualType:"dl-network"
  },
  "07.09": {
    summary:"Learning Rate(학습률)은 예측 오차를 줄이기 위해 신경망 파라미터를 갱신하는 학습 과정의 핵심 개념입니다. 계산 그래프에서 Gradient가 어떻게 전달되고 Weight가 어떻게 바뀌는지 연결해 봅니다.",
    why:"신경망이 단순히 예측하는 것을 넘어 오차를 이용해 스스로 파라미터를 개선하는 원리를 이해하는 데 필요합니다.",
    usedFor:["Model Training", "Backpropagation", "Optimizer", "Training Loop"],
    keyPoints:["Learning Rate", "학습률", "Forward → Loss → Backward → Update", "파라미터 변화와 학습 안정성"],
    questions:["학습률은 학습 루프의 어느 단계에서 필요한가?", "Learning Rate이 Weight 업데이트에 어떤 영향을 주는가?", "설정을 잘못하면 학습이 어떤 형태로 실패하는가?"],
    visualType:"dl-network"
  },
  "07.10": {
    summary:"Epoch / Batch / Iteration(에폭·배치·이터레이션)은 예측 오차를 줄이기 위해 신경망 파라미터를 갱신하는 학습 과정의 핵심 개념입니다. 계산 그래프에서 Gradient가 어떻게 전달되고 Weight가 어떻게 바뀌는지 연결해 봅니다.",
    why:"신경망이 단순히 예측하는 것을 넘어 오차를 이용해 스스로 파라미터를 개선하는 원리를 이해하는 데 필요합니다.",
    usedFor:["Model Training", "Backpropagation", "Optimizer", "Training Loop"],
    keyPoints:["Epoch / Batch / Iteration", "에폭·배치·이터레이션", "Forward → Loss → Backward → Update", "파라미터 변화와 학습 안정성"],
    questions:["에폭·배치·이터레이션은 학습 루프의 어느 단계에서 필요한가?", "Epoch / Batch / Iteration이 Weight 업데이트에 어떤 영향을 주는가?", "설정을 잘못하면 학습이 어떤 형태로 실패하는가?"],
    visualType:"dl-network"
  },
  "07.11": {
    summary:"Mini-batch Training(미니배치 학습)은 예측 오차를 줄이기 위해 신경망 파라미터를 갱신하는 학습 과정의 핵심 개념입니다. 계산 그래프에서 Gradient가 어떻게 전달되고 Weight가 어떻게 바뀌는지 연결해 봅니다.",
    why:"신경망이 단순히 예측하는 것을 넘어 오차를 이용해 스스로 파라미터를 개선하는 원리를 이해하는 데 필요합니다.",
    usedFor:["Model Training", "Backpropagation", "Optimizer", "Training Loop"],
    keyPoints:["Mini-batch Training", "미니배치 학습", "Forward → Loss → Backward → Update", "파라미터 변화와 학습 안정성"],
    questions:["미니배치 학습은 학습 루프의 어느 단계에서 필요한가?", "Mini-batch Training이 Weight 업데이트에 어떤 영향을 주는가?", "설정을 잘못하면 학습이 어떤 형태로 실패하는가?"],
    visualType:"dl-network"
  },
  "07.12": {
    summary:"Weight Initialization(가중치 초기화)은 예측 오차를 줄이기 위해 신경망 파라미터를 갱신하는 학습 과정의 핵심 개념입니다. 계산 그래프에서 Gradient가 어떻게 전달되고 Weight가 어떻게 바뀌는지 연결해 봅니다.",
    why:"신경망이 단순히 예측하는 것을 넘어 오차를 이용해 스스로 파라미터를 개선하는 원리를 이해하는 데 필요합니다.",
    usedFor:["Model Training", "Backpropagation", "Optimizer", "Training Loop"],
    keyPoints:["Weight Initialization", "가중치 초기화", "Forward → Loss → Backward → Update", "파라미터 변화와 학습 안정성"],
    questions:["가중치 초기화은 학습 루프의 어느 단계에서 필요한가?", "Weight Initialization이 Weight 업데이트에 어떤 영향을 주는가?", "설정을 잘못하면 학습이 어떤 형태로 실패하는가?"],
    visualType:"dl-network"
  },
  "07.13": {
    summary:"Vanishing Gradient(기울기 소실)은 예측 오차를 줄이기 위해 신경망 파라미터를 갱신하는 학습 과정의 핵심 개념입니다. 계산 그래프에서 Gradient가 어떻게 전달되고 Weight가 어떻게 바뀌는지 연결해 봅니다.",
    why:"신경망이 단순히 예측하는 것을 넘어 오차를 이용해 스스로 파라미터를 개선하는 원리를 이해하는 데 필요합니다.",
    usedFor:["Model Training", "Backpropagation", "Optimizer", "Training Loop"],
    keyPoints:["Vanishing Gradient", "기울기 소실", "Forward → Loss → Backward → Update", "파라미터 변화와 학습 안정성"],
    questions:["기울기 소실은 학습 루프의 어느 단계에서 필요한가?", "Vanishing Gradient이 Weight 업데이트에 어떤 영향을 주는가?", "설정을 잘못하면 학습이 어떤 형태로 실패하는가?"],
    visualType:"dl-network"
  },
  "07.14": {
    summary:"Exploding Gradient(기울기 폭주)은 예측 오차를 줄이기 위해 신경망 파라미터를 갱신하는 학습 과정의 핵심 개념입니다. 계산 그래프에서 Gradient가 어떻게 전달되고 Weight가 어떻게 바뀌는지 연결해 봅니다.",
    why:"신경망이 단순히 예측하는 것을 넘어 오차를 이용해 스스로 파라미터를 개선하는 원리를 이해하는 데 필요합니다.",
    usedFor:["Model Training", "Backpropagation", "Optimizer", "Training Loop"],
    keyPoints:["Exploding Gradient", "기울기 폭주", "Forward → Loss → Backward → Update", "파라미터 변화와 학습 안정성"],
    questions:["기울기 폭주은 학습 루프의 어느 단계에서 필요한가?", "Exploding Gradient이 Weight 업데이트에 어떤 영향을 주는가?", "설정을 잘못하면 학습이 어떤 형태로 실패하는가?"],
    visualType:"dl-network"
  },
  "07.15": {
    summary:"Batch Normalization(배치 정규화)은 예측 오차를 줄이기 위해 신경망 파라미터를 갱신하는 학습 과정의 핵심 개념입니다. 계산 그래프에서 Gradient가 어떻게 전달되고 Weight가 어떻게 바뀌는지 연결해 봅니다.",
    why:"신경망이 단순히 예측하는 것을 넘어 오차를 이용해 스스로 파라미터를 개선하는 원리를 이해하는 데 필요합니다.",
    usedFor:["Model Training", "Backpropagation", "Optimizer", "Training Loop"],
    keyPoints:["Batch Normalization", "배치 정규화", "Forward → Loss → Backward → Update", "파라미터 변화와 학습 안정성"],
    questions:["배치 정규화은 학습 루프의 어느 단계에서 필요한가?", "Batch Normalization이 Weight 업데이트에 어떤 영향을 주는가?", "설정을 잘못하면 학습이 어떤 형태로 실패하는가?"],
    visualType:"dl-network"
  },
  "07.16": {
    summary:"Layer Normalization(레이어 정규화)은 예측 오차를 줄이기 위해 신경망 파라미터를 갱신하는 학습 과정의 핵심 개념입니다. 계산 그래프에서 Gradient가 어떻게 전달되고 Weight가 어떻게 바뀌는지 연결해 봅니다.",
    why:"신경망이 단순히 예측하는 것을 넘어 오차를 이용해 스스로 파라미터를 개선하는 원리를 이해하는 데 필요합니다.",
    usedFor:["Model Training", "Backpropagation", "Optimizer", "Training Loop"],
    keyPoints:["Layer Normalization", "레이어 정규화", "Forward → Loss → Backward → Update", "파라미터 변화와 학습 안정성"],
    questions:["레이어 정규화은 학습 루프의 어느 단계에서 필요한가?", "Layer Normalization이 Weight 업데이트에 어떤 영향을 주는가?", "설정을 잘못하면 학습이 어떤 형태로 실패하는가?"],
    visualType:"dl-network"
  },
  "07.17": {
    summary:"Dropout(드롭아웃)은 예측 오차를 줄이기 위해 신경망 파라미터를 갱신하는 학습 과정의 핵심 개념입니다. 계산 그래프에서 Gradient가 어떻게 전달되고 Weight가 어떻게 바뀌는지 연결해 봅니다.",
    why:"신경망이 단순히 예측하는 것을 넘어 오차를 이용해 스스로 파라미터를 개선하는 원리를 이해하는 데 필요합니다.",
    usedFor:["Model Training", "Backpropagation", "Optimizer", "Training Loop"],
    keyPoints:["Dropout", "드롭아웃", "Forward → Loss → Backward → Update", "파라미터 변화와 학습 안정성"],
    questions:["드롭아웃은 학습 루프의 어느 단계에서 필요한가?", "Dropout이 Weight 업데이트에 어떤 영향을 주는가?", "설정을 잘못하면 학습이 어떤 형태로 실패하는가?"],
    visualType:"dl-network"
  },
  "07.18": {
    summary:"Early Stopping(조기 종료)은 예측 오차를 줄이기 위해 신경망 파라미터를 갱신하는 학습 과정의 핵심 개념입니다. 계산 그래프에서 Gradient가 어떻게 전달되고 Weight가 어떻게 바뀌는지 연결해 봅니다.",
    why:"신경망이 단순히 예측하는 것을 넘어 오차를 이용해 스스로 파라미터를 개선하는 원리를 이해하는 데 필요합니다.",
    usedFor:["Model Training", "Backpropagation", "Optimizer", "Training Loop"],
    keyPoints:["Early Stopping", "조기 종료", "Forward → Loss → Backward → Update", "파라미터 변화와 학습 안정성"],
    questions:["조기 종료은 학습 루프의 어느 단계에서 필요한가?", "Early Stopping이 Weight 업데이트에 어떤 영향을 주는가?", "설정을 잘못하면 학습이 어떤 형태로 실패하는가?"],
    visualType:"dl-network"
  },
  "07.19": {
    summary:"Training Loop(전체 학습 루프)은 예측 오차를 줄이기 위해 신경망 파라미터를 갱신하는 학습 과정의 핵심 개념입니다. 계산 그래프에서 Gradient가 어떻게 전달되고 Weight가 어떻게 바뀌는지 연결해 봅니다.",
    why:"신경망이 단순히 예측하는 것을 넘어 오차를 이용해 스스로 파라미터를 개선하는 원리를 이해하는 데 필요합니다.",
    usedFor:["Model Training", "Backpropagation", "Optimizer", "Training Loop"],
    keyPoints:["Training Loop", "전체 학습 루프", "Forward → Loss → Backward → Update", "파라미터 변화와 학습 안정성"],
    questions:["전체 학습 루프은 학습 루프의 어느 단계에서 필요한가?", "Training Loop이 Weight 업데이트에 어떤 영향을 주는가?", "설정을 잘못하면 학습이 어떤 형태로 실패하는가?"],
    visualType:"dl-network"
  },
  "08.01": {
    summary:"MLP(다층 퍼셉트론)은 문제와 데이터 구조에 맞춰 발전한 딥러닝 아키텍처의 한 단계입니다. 계산 흐름, 장점, 한계와 다음 구조로 이어지는 이유를 함께 학습합니다.",
    why:"데이터 특성에 따라 왜 서로 다른 신경망 구조가 만들어졌는지 이해하면 CNN, RNN에서 Attention과 Transformer로 이어지는 발전 흐름을 연결할 수 있습니다.",
    usedFor:["Computer Vision", "Sequence Modeling", "Representation Learning", "Generative Models"],
    keyPoints:["MLP", "다층 퍼셉트론", "구조가 해결하려는 문제", "입력 → 내부 상태/특징 → 출력"],
    questions:["다층 퍼셉트론은 어떤 데이터/문제를 위해 등장했는가?", "MLP의 핵심 정보 흐름은 무엇인가?", "이 구조의 한계가 다음 아키텍처에 어떤 영향을 주었는가?"],
    visualType:"dl-network"
  },
  "08.02": {
    summary:"CNN Overview(CNN 개요)은 문제와 데이터 구조에 맞춰 발전한 딥러닝 아키텍처의 한 단계입니다. 계산 흐름, 장점, 한계와 다음 구조로 이어지는 이유를 함께 학습합니다.",
    why:"데이터 특성에 따라 왜 서로 다른 신경망 구조가 만들어졌는지 이해하면 CNN, RNN에서 Attention과 Transformer로 이어지는 발전 흐름을 연결할 수 있습니다.",
    usedFor:["Computer Vision", "Sequence Modeling", "Representation Learning", "Generative Models"],
    keyPoints:["CNN Overview", "CNN 개요", "구조가 해결하려는 문제", "입력 → 내부 상태/특징 → 출력"],
    questions:["CNN 개요은 어떤 데이터/문제를 위해 등장했는가?", "CNN Overview의 핵심 정보 흐름은 무엇인가?", "이 구조의 한계가 다음 아키텍처에 어떤 영향을 주었는가?"],
    visualType:"dl-network"
  },
  "08.03": {
    summary:"Convolution(합성곱)은 문제와 데이터 구조에 맞춰 발전한 딥러닝 아키텍처의 한 단계입니다. 계산 흐름, 장점, 한계와 다음 구조로 이어지는 이유를 함께 학습합니다.",
    why:"데이터 특성에 따라 왜 서로 다른 신경망 구조가 만들어졌는지 이해하면 CNN, RNN에서 Attention과 Transformer로 이어지는 발전 흐름을 연결할 수 있습니다.",
    usedFor:["Computer Vision", "Sequence Modeling", "Representation Learning", "Generative Models"],
    keyPoints:["Convolution", "합성곱", "구조가 해결하려는 문제", "입력 → 내부 상태/특징 → 출력"],
    questions:["합성곱은 어떤 데이터/문제를 위해 등장했는가?", "Convolution의 핵심 정보 흐름은 무엇인가?", "이 구조의 한계가 다음 아키텍처에 어떤 영향을 주었는가?"],
    visualType:"dl-network"
  },
  "08.04": {
    summary:"Pooling(풀링)은 문제와 데이터 구조에 맞춰 발전한 딥러닝 아키텍처의 한 단계입니다. 계산 흐름, 장점, 한계와 다음 구조로 이어지는 이유를 함께 학습합니다.",
    why:"데이터 특성에 따라 왜 서로 다른 신경망 구조가 만들어졌는지 이해하면 CNN, RNN에서 Attention과 Transformer로 이어지는 발전 흐름을 연결할 수 있습니다.",
    usedFor:["Computer Vision", "Sequence Modeling", "Representation Learning", "Generative Models"],
    keyPoints:["Pooling", "풀링", "구조가 해결하려는 문제", "입력 → 내부 상태/특징 → 출력"],
    questions:["풀링은 어떤 데이터/문제를 위해 등장했는가?", "Pooling의 핵심 정보 흐름은 무엇인가?", "이 구조의 한계가 다음 아키텍처에 어떤 영향을 주었는가?"],
    visualType:"dl-network"
  },
  "08.05": {
    summary:"RNN(RNN)은 문제와 데이터 구조에 맞춰 발전한 딥러닝 아키텍처의 한 단계입니다. 계산 흐름, 장점, 한계와 다음 구조로 이어지는 이유를 함께 학습합니다.",
    why:"데이터 특성에 따라 왜 서로 다른 신경망 구조가 만들어졌는지 이해하면 CNN, RNN에서 Attention과 Transformer로 이어지는 발전 흐름을 연결할 수 있습니다.",
    usedFor:["Computer Vision", "Sequence Modeling", "Representation Learning", "Generative Models"],
    keyPoints:["RNN", "RNN", "구조가 해결하려는 문제", "입력 → 내부 상태/특징 → 출력"],
    questions:["RNN은 어떤 데이터/문제를 위해 등장했는가?", "RNN의 핵심 정보 흐름은 무엇인가?", "이 구조의 한계가 다음 아키텍처에 어떤 영향을 주었는가?"],
    visualType:"dl-network"
  },
  "08.06": {
    summary:"Hidden State(은닉 상태)은 문제와 데이터 구조에 맞춰 발전한 딥러닝 아키텍처의 한 단계입니다. 계산 흐름, 장점, 한계와 다음 구조로 이어지는 이유를 함께 학습합니다.",
    why:"데이터 특성에 따라 왜 서로 다른 신경망 구조가 만들어졌는지 이해하면 CNN, RNN에서 Attention과 Transformer로 이어지는 발전 흐름을 연결할 수 있습니다.",
    usedFor:["Computer Vision", "Sequence Modeling", "Representation Learning", "Generative Models"],
    keyPoints:["Hidden State", "은닉 상태", "구조가 해결하려는 문제", "입력 → 내부 상태/특징 → 출력"],
    questions:["은닉 상태은 어떤 데이터/문제를 위해 등장했는가?", "Hidden State의 핵심 정보 흐름은 무엇인가?", "이 구조의 한계가 다음 아키텍처에 어떤 영향을 주었는가?"],
    visualType:"dl-network"
  },
  "08.07": {
    summary:"LSTM(LSTM)은 문제와 데이터 구조에 맞춰 발전한 딥러닝 아키텍처의 한 단계입니다. 계산 흐름, 장점, 한계와 다음 구조로 이어지는 이유를 함께 학습합니다.",
    why:"데이터 특성에 따라 왜 서로 다른 신경망 구조가 만들어졌는지 이해하면 CNN, RNN에서 Attention과 Transformer로 이어지는 발전 흐름을 연결할 수 있습니다.",
    usedFor:["Computer Vision", "Sequence Modeling", "Representation Learning", "Generative Models"],
    keyPoints:["LSTM", "LSTM", "구조가 해결하려는 문제", "입력 → 내부 상태/특징 → 출력"],
    questions:["LSTM은 어떤 데이터/문제를 위해 등장했는가?", "LSTM의 핵심 정보 흐름은 무엇인가?", "이 구조의 한계가 다음 아키텍처에 어떤 영향을 주었는가?"],
    visualType:"dl-network"
  },
  "08.08": {
    summary:"GRU(GRU)은 문제와 데이터 구조에 맞춰 발전한 딥러닝 아키텍처의 한 단계입니다. 계산 흐름, 장점, 한계와 다음 구조로 이어지는 이유를 함께 학습합니다.",
    why:"데이터 특성에 따라 왜 서로 다른 신경망 구조가 만들어졌는지 이해하면 CNN, RNN에서 Attention과 Transformer로 이어지는 발전 흐름을 연결할 수 있습니다.",
    usedFor:["Computer Vision", "Sequence Modeling", "Representation Learning", "Generative Models"],
    keyPoints:["GRU", "GRU", "구조가 해결하려는 문제", "입력 → 내부 상태/특징 → 출력"],
    questions:["GRU은 어떤 데이터/문제를 위해 등장했는가?", "GRU의 핵심 정보 흐름은 무엇인가?", "이 구조의 한계가 다음 아키텍처에 어떤 영향을 주었는가?"],
    visualType:"dl-network"
  },
  "08.09": {
    summary:"Encoder / Decoder(인코더·디코더)은 문제와 데이터 구조에 맞춰 발전한 딥러닝 아키텍처의 한 단계입니다. 계산 흐름, 장점, 한계와 다음 구조로 이어지는 이유를 함께 학습합니다.",
    why:"데이터 특성에 따라 왜 서로 다른 신경망 구조가 만들어졌는지 이해하면 CNN, RNN에서 Attention과 Transformer로 이어지는 발전 흐름을 연결할 수 있습니다.",
    usedFor:["Computer Vision", "Sequence Modeling", "Representation Learning", "Generative Models"],
    keyPoints:["Encoder / Decoder", "인코더·디코더", "구조가 해결하려는 문제", "입력 → 내부 상태/특징 → 출력"],
    questions:["인코더·디코더은 어떤 데이터/문제를 위해 등장했는가?", "Encoder / Decoder의 핵심 정보 흐름은 무엇인가?", "이 구조의 한계가 다음 아키텍처에 어떤 영향을 주었는가?"],
    visualType:"dl-network"
  },
  "08.10": {
    summary:"Seq2Seq(Seq2Seq)은 문제와 데이터 구조에 맞춰 발전한 딥러닝 아키텍처의 한 단계입니다. 계산 흐름, 장점, 한계와 다음 구조로 이어지는 이유를 함께 학습합니다.",
    why:"데이터 특성에 따라 왜 서로 다른 신경망 구조가 만들어졌는지 이해하면 CNN, RNN에서 Attention과 Transformer로 이어지는 발전 흐름을 연결할 수 있습니다.",
    usedFor:["Computer Vision", "Sequence Modeling", "Representation Learning", "Generative Models"],
    keyPoints:["Seq2Seq", "Seq2Seq", "구조가 해결하려는 문제", "입력 → 내부 상태/특징 → 출력"],
    questions:["Seq2Seq은 어떤 데이터/문제를 위해 등장했는가?", "Seq2Seq의 핵심 정보 흐름은 무엇인가?", "이 구조의 한계가 다음 아키텍처에 어떤 영향을 주었는가?"],
    visualType:"dl-network"
  },
  "08.11": {
    summary:"Attention Transition(Attention으로의 전환)은 문제와 데이터 구조에 맞춰 발전한 딥러닝 아키텍처의 한 단계입니다. 계산 흐름, 장점, 한계와 다음 구조로 이어지는 이유를 함께 학습합니다.",
    why:"데이터 특성에 따라 왜 서로 다른 신경망 구조가 만들어졌는지 이해하면 CNN, RNN에서 Attention과 Transformer로 이어지는 발전 흐름을 연결할 수 있습니다.",
    usedFor:["Computer Vision", "Sequence Modeling", "Representation Learning", "Generative Models"],
    keyPoints:["Attention Transition", "Attention으로의 전환", "구조가 해결하려는 문제", "입력 → 내부 상태/특징 → 출력"],
    questions:["Attention으로의 전환은 어떤 데이터/문제를 위해 등장했는가?", "Attention Transition의 핵심 정보 흐름은 무엇인가?", "이 구조의 한계가 다음 아키텍처에 어떤 영향을 주었는가?"],
    visualType:"dl-network"
  },
  "08.12": {
    summary:"Autoencoder(오토인코더)은 문제와 데이터 구조에 맞춰 발전한 딥러닝 아키텍처의 한 단계입니다. 계산 흐름, 장점, 한계와 다음 구조로 이어지는 이유를 함께 학습합니다.",
    why:"데이터 특성에 따라 왜 서로 다른 신경망 구조가 만들어졌는지 이해하면 CNN, RNN에서 Attention과 Transformer로 이어지는 발전 흐름을 연결할 수 있습니다.",
    usedFor:["Computer Vision", "Sequence Modeling", "Representation Learning", "Generative Models"],
    keyPoints:["Autoencoder", "오토인코더", "구조가 해결하려는 문제", "입력 → 내부 상태/특징 → 출력"],
    questions:["오토인코더은 어떤 데이터/문제를 위해 등장했는가?", "Autoencoder의 핵심 정보 흐름은 무엇인가?", "이 구조의 한계가 다음 아키텍처에 어떤 영향을 주었는가?"],
    visualType:"dl-network"
  },
  "08.13": {
    summary:"Variational Autoencoder(VAE)은 문제와 데이터 구조에 맞춰 발전한 딥러닝 아키텍처의 한 단계입니다. 계산 흐름, 장점, 한계와 다음 구조로 이어지는 이유를 함께 학습합니다.",
    why:"데이터 특성에 따라 왜 서로 다른 신경망 구조가 만들어졌는지 이해하면 CNN, RNN에서 Attention과 Transformer로 이어지는 발전 흐름을 연결할 수 있습니다.",
    usedFor:["Computer Vision", "Sequence Modeling", "Representation Learning", "Generative Models"],
    keyPoints:["Variational Autoencoder", "VAE", "구조가 해결하려는 문제", "입력 → 내부 상태/특징 → 출력"],
    questions:["VAE은 어떤 데이터/문제를 위해 등장했는가?", "Variational Autoencoder의 핵심 정보 흐름은 무엇인가?", "이 구조의 한계가 다음 아키텍처에 어떤 영향을 주었는가?"],
    visualType:"dl-network"
  },
  "08.14": {
    summary:"GAN(GAN)은 문제와 데이터 구조에 맞춰 발전한 딥러닝 아키텍처의 한 단계입니다. 계산 흐름, 장점, 한계와 다음 구조로 이어지는 이유를 함께 학습합니다.",
    why:"데이터 특성에 따라 왜 서로 다른 신경망 구조가 만들어졌는지 이해하면 CNN, RNN에서 Attention과 Transformer로 이어지는 발전 흐름을 연결할 수 있습니다.",
    usedFor:["Computer Vision", "Sequence Modeling", "Representation Learning", "Generative Models"],
    keyPoints:["GAN", "GAN", "구조가 해결하려는 문제", "입력 → 내부 상태/특징 → 출력"],
    questions:["GAN은 어떤 데이터/문제를 위해 등장했는가?", "GAN의 핵심 정보 흐름은 무엇인가?", "이 구조의 한계가 다음 아키텍처에 어떤 영향을 주었는가?"],
    visualType:"dl-network"
  },
  "08.15": {
    summary:"Transformer Transition(Transformer로의 전환)은 문제와 데이터 구조에 맞춰 발전한 딥러닝 아키텍처의 한 단계입니다. 계산 흐름, 장점, 한계와 다음 구조로 이어지는 이유를 함께 학습합니다.",
    why:"데이터 특성에 따라 왜 서로 다른 신경망 구조가 만들어졌는지 이해하면 CNN, RNN에서 Attention과 Transformer로 이어지는 발전 흐름을 연결할 수 있습니다.",
    usedFor:["Computer Vision", "Sequence Modeling", "Representation Learning", "Generative Models"],
    keyPoints:["Transformer Transition", "Transformer로의 전환", "구조가 해결하려는 문제", "입력 → 내부 상태/특징 → 출력"],
    questions:["Transformer로의 전환은 어떤 데이터/문제를 위해 등장했는가?", "Transformer Transition의 핵심 정보 흐름은 무엇인가?", "이 구조의 한계가 다음 아키텍처에 어떤 영향을 주었는가?"],
    visualType:"dl-network"
  },
};

// v0.0.12 CONTENT START
Object.assign(topicContent, {
  "09.01": {
    summary: "이미지는 컴퓨터 안에서 높이×너비×채널의 숫자 배열(Tensor)로 표현됩니다. 픽셀의 색과 밝기가 숫자가 되는 순간부터 Vision 모델의 계산이 시작됩니다.",
    why: "Vision 모델이 픽셀에서 의미 있는 표현을 만드는 과정을 단계적으로 이해하기 위해 필요합니다.",
    usedFor: ["Vision 모델", "CNN/ViT", "이미지 검색", "객체 인식"],
    keyPoints: ["Height × Width × Channel", "RGB 값", "Tensor shape", "배치 차원"],
    questions: ["RGB 이미지의 shape은 왜 H×W×3인가?", "픽셀 값의 변화가 모델 입력에 어떤 변화를 만드는가?"],
    visualType: "generic"
  },
  "09.02": {
    summary: "Channels & Pixels(채널과 픽셀)은 Computer Vision의 전체 흐름에서 중요한 단계입니다. 이미지를 숫자 텐서로 바꾸고 공간적 특징을 추출해 분류·탐지·분할하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "Vision 모델이 픽셀에서 의미 있는 표현을 만드는 과정을 단계적으로 이해하기 위해 필요합니다.",
    usedFor: ["Vision 모델", "CNN/ViT", "이미지 검색", "객체 인식"],
    keyPoints: ["Channels & Pixels", "채널과 픽셀", "이미지 텐서 → 지역 특징 → 공간 표현 → 예측", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Channels & Pixels은 전체 Computer Vision 흐름의 어느 위치에 있는가?", "채널과 픽셀의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "generic"
  },
  "09.03": {
    summary: "Convolution Kernel은 작은 가중치 격자를 이미지 위로 이동시키며 주변 픽셀의 패턴을 검사합니다. 같은 Kernel을 여러 위치에 공유해 edge·texture 같은 지역 특징을 찾습니다.",
    why: "Vision 모델이 픽셀에서 의미 있는 표현을 만드는 과정을 단계적으로 이해하기 위해 필요합니다.",
    usedFor: ["Vision 모델", "CNN/ViT", "이미지 검색", "객체 인식"],
    keyPoints: ["Kernel", "Sliding window", "Element-wise multiply", "Weight sharing"],
    questions: ["Kernel이 이동할 때 같은 가중치를 재사용하는 이유는?", "Edge kernel의 부호가 바뀌면 무엇이 달라지는가?"],
    visualType: "generic"
  },
  "09.04": {
    summary: "Feature Map은 Kernel이 각 위치에서 계산한 결과를 공간적으로 모은 출력입니다. 원본 픽셀 대신 모델이 발견한 특징의 위치와 강도를 나타냅니다.",
    why: "Vision 모델이 픽셀에서 의미 있는 표현을 만드는 과정을 단계적으로 이해하기 위해 필요합니다.",
    usedFor: ["Vision 모델", "CNN/ViT", "이미지 검색", "객체 인식"],
    keyPoints: ["Activation map", "Spatial feature", "Channel", "Receptive field"],
    questions: ["Feature Map의 한 셀은 입력 이미지의 어느 영역을 보는가?", "여러 Kernel을 쓰면 왜 여러 Feature Map이 생기는가?"],
    visualType: "generic"
  },
  "09.05": {
    summary: "Stride & Padding(Stride와 Padding)은 Computer Vision의 전체 흐름에서 중요한 단계입니다. 이미지를 숫자 텐서로 바꾸고 공간적 특징을 추출해 분류·탐지·분할하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "Vision 모델이 픽셀에서 의미 있는 표현을 만드는 과정을 단계적으로 이해하기 위해 필요합니다.",
    usedFor: ["Vision 모델", "CNN/ViT", "이미지 검색", "객체 인식"],
    keyPoints: ["Stride & Padding", "Stride와 Padding", "이미지 텐서 → 지역 특징 → 공간 표현 → 예측", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Stride & Padding은 전체 Computer Vision 흐름의 어느 위치에 있는가?", "Stride와 Padding의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "generic"
  },
  "09.06": {
    summary: "Pooling(풀링)은 Computer Vision의 전체 흐름에서 중요한 단계입니다. 이미지를 숫자 텐서로 바꾸고 공간적 특징을 추출해 분류·탐지·분할하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "Vision 모델이 픽셀에서 의미 있는 표현을 만드는 과정을 단계적으로 이해하기 위해 필요합니다.",
    usedFor: ["Vision 모델", "CNN/ViT", "이미지 검색", "객체 인식"],
    keyPoints: ["Pooling", "풀링", "이미지 텐서 → 지역 특징 → 공간 표현 → 예측", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Pooling은 전체 Computer Vision 흐름의 어느 위치에 있는가?", "풀링의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "generic"
  },
  "09.07": {
    summary: "Image Classification(이미지 분류)은 Computer Vision의 전체 흐름에서 중요한 단계입니다. 이미지를 숫자 텐서로 바꾸고 공간적 특징을 추출해 분류·탐지·분할하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "Vision 모델이 픽셀에서 의미 있는 표현을 만드는 과정을 단계적으로 이해하기 위해 필요합니다.",
    usedFor: ["Vision 모델", "CNN/ViT", "이미지 검색", "객체 인식"],
    keyPoints: ["Image Classification", "이미지 분류", "이미지 텐서 → 지역 특징 → 공간 표현 → 예측", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Image Classification은 전체 Computer Vision 흐름의 어느 위치에 있는가?", "이미지 분류의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "generic"
  },
  "09.08": {
    summary: "Transfer Learning(전이 학습)은 Computer Vision의 전체 흐름에서 중요한 단계입니다. 이미지를 숫자 텐서로 바꾸고 공간적 특징을 추출해 분류·탐지·분할하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "Vision 모델이 픽셀에서 의미 있는 표현을 만드는 과정을 단계적으로 이해하기 위해 필요합니다.",
    usedFor: ["Vision 모델", "CNN/ViT", "이미지 검색", "객체 인식"],
    keyPoints: ["Transfer Learning", "전이 학습", "이미지 텐서 → 지역 특징 → 공간 표현 → 예측", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Transfer Learning은 전체 Computer Vision 흐름의 어느 위치에 있는가?", "전이 학습의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "generic"
  },
  "09.09": {
    summary: "Object Detection은 이미지 안에 무엇이 있는지뿐 아니라 어디에 있는지까지 예측합니다. 보통 class score와 bounding box를 함께 출력합니다.",
    why: "Vision 모델이 픽셀에서 의미 있는 표현을 만드는 과정을 단계적으로 이해하기 위해 필요합니다.",
    usedFor: ["Vision 모델", "CNN/ViT", "이미지 검색", "객체 인식"],
    keyPoints: ["Class prediction", "Bounding box", "Confidence", "NMS"],
    questions: ["Classification과 Detection의 출력 차이는?", "한 객체에 여러 box가 생기면 어떻게 정리하는가?"],
    visualType: "generic"
  },
  "09.10": {
    summary: "IoU는 예측 Bounding Box와 정답 Box가 얼마나 겹치는지 교집합/합집합으로 측정합니다. Detection의 위치 정확도를 판단하는 핵심 지표입니다.",
    why: "Vision 모델이 픽셀에서 의미 있는 표현을 만드는 과정을 단계적으로 이해하기 위해 필요합니다.",
    usedFor: ["Vision 모델", "CNN/ViT", "이미지 검색", "객체 인식"],
    keyPoints: ["Intersection", "Union", "IoU", "Box coordinates"],
    questions: ["IoU=1은 무엇을 뜻하는가?", "겹치지 않는 두 Box의 IoU는 얼마인가?"],
    visualType: "generic"
  },
  "09.11": {
    summary: "Image Segmentation(이미지 분할)은 Computer Vision의 전체 흐름에서 중요한 단계입니다. 이미지를 숫자 텐서로 바꾸고 공간적 특징을 추출해 분류·탐지·분할하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "Vision 모델이 픽셀에서 의미 있는 표현을 만드는 과정을 단계적으로 이해하기 위해 필요합니다.",
    usedFor: ["Vision 모델", "CNN/ViT", "이미지 검색", "객체 인식"],
    keyPoints: ["Image Segmentation", "이미지 분할", "이미지 텐서 → 지역 특징 → 공간 표현 → 예측", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Image Segmentation은 전체 Computer Vision 흐름의 어느 위치에 있는가?", "이미지 분할의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "generic"
  },
  "09.12": {
    summary: "Data Augmentation for Vision(비전 데이터 증강)은 Computer Vision의 전체 흐름에서 중요한 단계입니다. 이미지를 숫자 텐서로 바꾸고 공간적 특징을 추출해 분류·탐지·분할하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "Vision 모델이 픽셀에서 의미 있는 표현을 만드는 과정을 단계적으로 이해하기 위해 필요합니다.",
    usedFor: ["Vision 모델", "CNN/ViT", "이미지 검색", "객체 인식"],
    keyPoints: ["Data Augmentation for Vision", "비전 데이터 증강", "이미지 텐서 → 지역 특징 → 공간 표현 → 예측", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Data Augmentation for Vision은 전체 Computer Vision 흐름의 어느 위치에 있는가?", "비전 데이터 증강의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "generic"
  },
  "09.13": {
    summary: "Vision Transformer(Vision Transformer)은 Computer Vision의 전체 흐름에서 중요한 단계입니다. 이미지를 숫자 텐서로 바꾸고 공간적 특징을 추출해 분류·탐지·분할하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "Vision 모델이 픽셀에서 의미 있는 표현을 만드는 과정을 단계적으로 이해하기 위해 필요합니다.",
    usedFor: ["Vision 모델", "CNN/ViT", "이미지 검색", "객체 인식"],
    keyPoints: ["Vision Transformer", "Vision Transformer", "이미지 텐서 → 지역 특징 → 공간 표현 → 예측", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Vision Transformer은 전체 Computer Vision 흐름의 어느 위치에 있는가?", "Vision Transformer의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "generic"
  },
  "09.14": {
    summary: "Image Embedding(이미지 임베딩)은 Computer Vision의 전체 흐름에서 중요한 단계입니다. 이미지를 숫자 텐서로 바꾸고 공간적 특징을 추출해 분류·탐지·분할하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "Vision 모델이 픽셀에서 의미 있는 표현을 만드는 과정을 단계적으로 이해하기 위해 필요합니다.",
    usedFor: ["Vision 모델", "CNN/ViT", "이미지 검색", "객체 인식"],
    keyPoints: ["Image Embedding", "이미지 임베딩", "이미지 텐서 → 지역 특징 → 공간 표현 → 예측", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Image Embedding은 전체 Computer Vision 흐름의 어느 위치에 있는가?", "이미지 임베딩의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "generic"
  },
  "10.01": {
    summary: "What is NLP?(자연어 처리란?)은 NLP의 전체 흐름에서 중요한 단계입니다. 사람의 텍스트를 모델이 계산 가능한 Token과 Vector의 Sequence로 변환하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "NLP을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["텍스트 분석", "검색", "번역", "Language Model"],
    keyPoints: ["What is NLP?", "자연어 처리란?", "문장 → Token → ID → Vector → Sequence Model", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["What is NLP?은 전체 NLP 흐름의 어느 위치에 있는가?", "자연어 처리란?의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "generic"
  },
  "10.02": {
    summary: "Corpus & Document(코퍼스와 문서)은 NLP의 전체 흐름에서 중요한 단계입니다. 사람의 텍스트를 모델이 계산 가능한 Token과 Vector의 Sequence로 변환하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "NLP을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["텍스트 분석", "검색", "번역", "Language Model"],
    keyPoints: ["Corpus & Document", "코퍼스와 문서", "문장 → Token → ID → Vector → Sequence Model", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Corpus & Document은 전체 NLP 흐름의 어느 위치에 있는가?", "코퍼스와 문서의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "generic"
  },
  "10.03": {
    summary: "Text Preprocessing(텍스트 전처리)은 NLP의 전체 흐름에서 중요한 단계입니다. 사람의 텍스트를 모델이 계산 가능한 Token과 Vector의 Sequence로 변환하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "NLP을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["텍스트 분석", "검색", "번역", "Language Model"],
    keyPoints: ["Text Preprocessing", "텍스트 전처리", "문장 → Token → ID → Vector → Sequence Model", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Text Preprocessing은 전체 NLP 흐름의 어느 위치에 있는가?", "텍스트 전처리의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "generic"
  },
  "10.04": {
    summary: "Tokenization은 문자열을 모델이 처리할 수 있는 Token 단위로 분해하는 과정입니다. 현대 LLM은 흔히 단어 전체보다 Subword 단위를 사용합니다.",
    why: "NLP을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["텍스트 분석", "검색", "번역", "Language Model"],
    keyPoints: ["Token", "Tokenizer", "Subword", "Special token"],
    questions: ["왜 단어 단위만 사용하지 않는가?", "같은 문장도 tokenizer에 따라 token 수가 달라지는 이유는?"],
    visualType: "generic"
  },
  "10.05": {
    summary: "Word·Subword·Character는 텍스트를 나누는 서로 다른 단위입니다. 단위가 작아질수록 미등록 단어 문제는 줄지만 Sequence가 길어지는 trade-off가 있습니다.",
    why: "NLP을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["텍스트 분석", "검색", "번역", "Language Model"],
    keyPoints: ["Word", "Subword", "Character", "Sequence length"],
    questions: ["Character tokenization의 장단점은?", "Subword가 LLM에서 유용한 이유는?"],
    visualType: "generic"
  },
  "10.06": {
    summary: "Vocabulary는 Token과 정수 ID의 대응표입니다. 모델은 문자열 자체가 아니라 Vocabulary를 통해 변환된 Token ID를 입력으로 받습니다.",
    why: "NLP을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["텍스트 분석", "검색", "번역", "Language Model"],
    keyPoints: ["Vocabulary", "Token ID", "Unknown token", "Vocabulary size"],
    questions: ["Vocabulary가 커지면 embedding table은 어떻게 변하는가?", "새 문자열이 vocabulary에 없으면 tokenizer는 어떻게 처리할 수 있는가?"],
    visualType: "generic"
  },
  "10.07": {
    summary: "Token ID(토큰 ID)은 NLP의 전체 흐름에서 중요한 단계입니다. 사람의 텍스트를 모델이 계산 가능한 Token과 Vector의 Sequence로 변환하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "NLP을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["텍스트 분석", "검색", "번역", "Language Model"],
    keyPoints: ["Token ID", "토큰 ID", "문장 → Token → ID → Vector → Sequence Model", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Token ID은 전체 NLP 흐름의 어느 위치에 있는가?", "토큰 ID의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "generic"
  },
  "10.08": {
    summary: "One-hot Encoding(원-핫 인코딩)은 NLP의 전체 흐름에서 중요한 단계입니다. 사람의 텍스트를 모델이 계산 가능한 Token과 Vector의 Sequence로 변환하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "NLP을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["텍스트 분석", "검색", "번역", "Language Model"],
    keyPoints: ["One-hot Encoding", "원-핫 인코딩", "문장 → Token → ID → Vector → Sequence Model", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["One-hot Encoding은 전체 NLP 흐름의 어느 위치에 있는가?", "원-핫 인코딩의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "generic"
  },
  "10.09": {
    summary: "Bag of Words(Bag of Words)은 NLP의 전체 흐름에서 중요한 단계입니다. 사람의 텍스트를 모델이 계산 가능한 Token과 Vector의 Sequence로 변환하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "NLP을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["텍스트 분석", "검색", "번역", "Language Model"],
    keyPoints: ["Bag of Words", "Bag of Words", "문장 → Token → ID → Vector → Sequence Model", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Bag of Words은 전체 NLP 흐름의 어느 위치에 있는가?", "Bag of Words의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "generic"
  },
  "10.10": {
    summary: "TF-IDF(TF-IDF)은 NLP의 전체 흐름에서 중요한 단계입니다. 사람의 텍스트를 모델이 계산 가능한 Token과 Vector의 Sequence로 변환하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "NLP을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["텍스트 분석", "검색", "번역", "Language Model"],
    keyPoints: ["TF-IDF", "TF-IDF", "문장 → Token → ID → Vector → Sequence Model", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["TF-IDF은 전체 NLP 흐름의 어느 위치에 있는가?", "TF-IDF의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "generic"
  },
  "10.11": {
    summary: "Word Embedding은 이산적인 Token ID를 연속적인 실수 Vector로 바꿉니다. 학습을 통해 의미나 사용 문맥이 비슷한 Token이 공간에서 관련된 표현을 갖게 됩니다.",
    why: "NLP을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["텍스트 분석", "검색", "번역", "Language Model"],
    keyPoints: ["Embedding table", "Dense vector", "Semantic relation", "Dimension"],
    questions: ["Token ID 자체로는 왜 의미적 거리를 표현하기 어려운가?", "Embedding dimension은 무엇을 의미하는가?"],
    visualType: "generic"
  },
  "10.12": {
    summary: "Word2Vec(Word2Vec)은 NLP의 전체 흐름에서 중요한 단계입니다. 사람의 텍스트를 모델이 계산 가능한 Token과 Vector의 Sequence로 변환하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "NLP을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["텍스트 분석", "검색", "번역", "Language Model"],
    keyPoints: ["Word2Vec", "Word2Vec", "문장 → Token → ID → Vector → Sequence Model", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Word2Vec은 전체 NLP 흐름의 어느 위치에 있는가?", "Word2Vec의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "generic"
  },
  "10.13": {
    summary: "Sequence(시퀀스)은 NLP의 전체 흐름에서 중요한 단계입니다. 사람의 텍스트를 모델이 계산 가능한 Token과 Vector의 Sequence로 변환하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "NLP을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["텍스트 분석", "검색", "번역", "Language Model"],
    keyPoints: ["Sequence", "시퀀스", "문장 → Token → ID → Vector → Sequence Model", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Sequence은 전체 NLP 흐름의 어느 위치에 있는가?", "시퀀스의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "generic"
  },
  "10.14": {
    summary: "Language Modeling(언어 모델링)은 NLP의 전체 흐름에서 중요한 단계입니다. 사람의 텍스트를 모델이 계산 가능한 Token과 Vector의 Sequence로 변환하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "NLP을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["텍스트 분석", "검색", "번역", "Language Model"],
    keyPoints: ["Language Modeling", "언어 모델링", "문장 → Token → ID → Vector → Sequence Model", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Language Modeling은 전체 NLP 흐름의 어느 위치에 있는가?", "언어 모델링의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "generic"
  },
  "10.15": {
    summary: "NLP Evaluation Basics(NLP 평가 기초)은 NLP의 전체 흐름에서 중요한 단계입니다. 사람의 텍스트를 모델이 계산 가능한 Token과 Vector의 Sequence로 변환하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "NLP을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["텍스트 분석", "검색", "번역", "Language Model"],
    keyPoints: ["NLP Evaluation Basics", "NLP 평가 기초", "문장 → Token → ID → Vector → Sequence Model", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["NLP Evaluation Basics은 전체 NLP 흐름의 어느 위치에 있는가?", "NLP 평가 기초의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "generic"
  },
  "11.01": {
    summary: "Why Attention?(왜 Attention인가?)은 Attention의 전체 흐름에서 중요한 단계입니다. 현재 Query가 다른 Token의 Key와 비교되어 어떤 Value를 얼마나 참고할지 계산하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "Attention을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["Transformer", "LLM", "Vision Transformer", "멀티모달"],
    keyPoints: ["Why Attention?", "왜 Attention인가?", "Q·K·V → Score → Scale → Softmax → Weighted Sum", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Why Attention?은 전체 Attention 흐름의 어느 위치에 있는가?", "왜 Attention인가?의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "transformer"
  },
  "11.02": {
    summary: "Seq2Seq Bottleneck(Seq2Seq 병목)은 Attention의 전체 흐름에서 중요한 단계입니다. 현재 Query가 다른 Token의 Key와 비교되어 어떤 Value를 얼마나 참고할지 계산하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "Attention을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["Transformer", "LLM", "Vision Transformer", "멀티모달"],
    keyPoints: ["Seq2Seq Bottleneck", "Seq2Seq 병목", "Q·K·V → Score → Scale → Softmax → Weighted Sum", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Seq2Seq Bottleneck은 전체 Attention 흐름의 어느 위치에 있는가?", "Seq2Seq 병목의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "transformer"
  },
  "11.03": {
    summary: "Attention Intuition(Attention 직관)은 Attention의 전체 흐름에서 중요한 단계입니다. 현재 Query가 다른 Token의 Key와 비교되어 어떤 Value를 얼마나 참고할지 계산하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "Attention을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["Transformer", "LLM", "Vision Transformer", "멀티모달"],
    keyPoints: ["Attention Intuition", "Attention 직관", "Q·K·V → Score → Scale → Softmax → Weighted Sum", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Attention Intuition은 전체 Attention 흐름의 어느 위치에 있는가?", "Attention 직관의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "transformer"
  },
  "11.04": {
    summary: "Query는 내가 찾는 정보, Key는 각 Token이 가진 검색용 특징, Value는 실제로 가져올 정보라고 볼 수 있습니다. Attention은 Q와 K의 관계로 V의 혼합 비율을 결정합니다.",
    why: "Attention을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["Transformer", "LLM", "Vision Transformer", "멀티모달"],
    keyPoints: ["Query", "Key", "Value", "Projection matrix"],
    questions: ["Q와 K가 점수를 만들고 V가 결과에 쓰이는 이유는?", "한 Token에서 Q/K/V가 각각 어떻게 만들어지는가?"],
    visualType: "transformer"
  },
  "11.05": {
    summary: "Similarity Score는 Query와 각 Key가 얼마나 관련 있는지를 수치화합니다. Dot Product Attention에서는 벡터 내적으로 이 점수를 계산합니다.",
    why: "Attention을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["Transformer", "LLM", "Vision Transformer", "멀티모달"],
    keyPoints: ["Dot product", "Similarity", "Score matrix", "Token relation"],
    questions: ["내적 값이 커진다는 것은 어떤 관계를 뜻하는가?", "모든 Token 쌍을 비교하면 행렬 shape은 어떻게 되는가?"],
    visualType: "transformer"
  },
  "11.06": {
    summary: "Dot-product Attention(내적 Attention)은 Attention의 전체 흐름에서 중요한 단계입니다. 현재 Query가 다른 Token의 Key와 비교되어 어떤 Value를 얼마나 참고할지 계산하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "Attention을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["Transformer", "LLM", "Vision Transformer", "멀티모달"],
    keyPoints: ["Dot-product Attention", "내적 Attention", "Q·K·V → Score → Scale → Softmax → Weighted Sum", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Dot-product Attention은 전체 Attention 흐름의 어느 위치에 있는가?", "내적 Attention의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "transformer"
  },
  "11.07": {
    summary: "Scaling(Scaling)은 Attention의 전체 흐름에서 중요한 단계입니다. 현재 Query가 다른 Token의 Key와 비교되어 어떤 Value를 얼마나 참고할지 계산하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "Attention을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["Transformer", "LLM", "Vision Transformer", "멀티모달"],
    keyPoints: ["Scaling", "Scaling", "Q·K·V → Score → Scale → Softmax → Weighted Sum", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Scaling은 전체 Attention 흐름의 어느 위치에 있는가?", "Scaling의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "transformer"
  },
  "11.08": {
    summary: "Softmax는 Attention score들을 합이 1인 양의 가중치로 변환합니다. 어떤 Token을 상대적으로 더 많이 참고할지 해석 가능한 비율을 만듭니다.",
    why: "Attention을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["Transformer", "LLM", "Vision Transformer", "멀티모달"],
    keyPoints: ["Softmax", "Attention weight", "Probability-like weights", "Normalization"],
    questions: ["한 score가 커지면 다른 token의 weight는 어떻게 되는가?", "왜 단순 score를 그대로 Value에 곱하지 않는가?"],
    visualType: "transformer"
  },
  "11.09": {
    summary: "Weighted Sum of Values(Value 가중합)은 Attention의 전체 흐름에서 중요한 단계입니다. 현재 Query가 다른 Token의 Key와 비교되어 어떤 Value를 얼마나 참고할지 계산하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "Attention을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["Transformer", "LLM", "Vision Transformer", "멀티모달"],
    keyPoints: ["Weighted Sum of Values", "Value 가중합", "Q·K·V → Score → Scale → Softmax → Weighted Sum", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Weighted Sum of Values은 전체 Attention 흐름의 어느 위치에 있는가?", "Value 가중합의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "transformer"
  },
  "11.10": {
    summary: "Self-Attention은 같은 Sequence 안의 Token들이 서로를 참고해 각 Token 표현을 문맥에 맞게 다시 만드는 연산입니다.",
    why: "Attention을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["Transformer", "LLM", "Vision Transformer", "멀티모달"],
    keyPoints: ["Token-to-token relation", "Contextual representation", "Q/K/V", "Weighted sum"],
    questions: ["Self라는 말은 무엇을 의미하는가?", "같은 단어도 문맥에 따라 출력 vector가 달라지는 이유는?"],
    visualType: "transformer"
  },
  "11.11": {
    summary: "Causal Mask는 생성 모델이 현재 위치에서 미래 Token을 보지 못하도록 Attention score를 가립니다. Next-token prediction의 정보 누수를 막습니다.",
    why: "Attention을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["Transformer", "LLM", "Vision Transformer", "멀티모달"],
    keyPoints: ["Causal mask", "Future token blocking", "Autoregressive", "-∞ before softmax"],
    questions: ["학습 중 정답 문장이 모두 있어도 미래 token을 가려야 하는 이유는?", "Mask가 softmax 전에 적용되는 이유는?"],
    visualType: "transformer"
  },
  "11.12": {
    summary: "Multi-Head Attention은 Attention을 여러 Head로 나누어 서로 다른 projection 공간에서 관계를 동시에 학습한 뒤 다시 결합합니다.",
    why: "Attention을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["Transformer", "LLM", "Vision Transformer", "멀티모달"],
    keyPoints: ["Attention head", "Parallel relations", "Projection", "Concatenation"],
    questions: ["Head가 여러 개면 어떤 종류의 관계를 나눠 볼 수 있는가?", "각 Head 결과는 최종적으로 어떻게 합쳐지는가?"],
    visualType: "transformer"
  },
  "11.13": {
    summary: "Attention Matrix(Attention 행렬)은 Attention의 전체 흐름에서 중요한 단계입니다. 현재 Query가 다른 Token의 Key와 비교되어 어떤 Value를 얼마나 참고할지 계산하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "Attention을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["Transformer", "LLM", "Vision Transformer", "멀티모달"],
    keyPoints: ["Attention Matrix", "Attention 행렬", "Q·K·V → Score → Scale → Softmax → Weighted Sum", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Attention Matrix은 전체 Attention 흐름의 어느 위치에 있는가?", "Attention 행렬의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "transformer"
  },
  "11.14": {
    summary: "Attention Complexity(Attention 계산 복잡도)은 Attention의 전체 흐름에서 중요한 단계입니다. 현재 Query가 다른 Token의 Key와 비교되어 어떤 Value를 얼마나 참고할지 계산하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "Attention을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["Transformer", "LLM", "Vision Transformer", "멀티모달"],
    keyPoints: ["Attention Complexity", "Attention 계산 복잡도", "Q·K·V → Score → Scale → Softmax → Weighted Sum", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Attention Complexity은 전체 Attention 흐름의 어느 위치에 있는가?", "Attention 계산 복잡도의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "transformer"
  },
  "12.01": {
    summary: "Transformer는 RNN처럼 Token을 하나씩 순차 처리하지 않고 Attention을 중심으로 Sequence의 관계를 병렬 계산하도록 설계된 아키텍처입니다.",
    why: "Transformer을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["GPT", "BERT 계열", "번역", "LLM", "멀티모달"],
    keyPoints: ["Parallel sequence processing", "Self-Attention", "Long-range relation", "Encoder/Decoder"],
    questions: ["RNN의 순차 계산 병목을 Transformer는 어떻게 줄였는가?", "Attention만으로는 Token 순서를 왜 알기 어려운가?"],
    visualType: "transformer"
  },
  "12.02": {
    summary: "Transformer Overview(Transformer 전체 구조)은 Transformer의 전체 흐름에서 중요한 단계입니다. Attention과 FFN을 Residual/Normalization으로 연결해 Token 표현을 반복적으로 갱신하는 구조 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "Transformer을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["GPT", "BERT 계열", "번역", "LLM", "멀티모달"],
    keyPoints: ["Transformer Overview", "Transformer 전체 구조", "Token → Embedding+Position → Attention → FFN → Output", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Transformer Overview은 전체 Transformer 흐름의 어느 위치에 있는가?", "Transformer 전체 구조의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "transformer"
  },
  "12.03": {
    summary: "Input Embedding은 Token ID를 d_model 차원의 Vector로 변환해 Transformer가 계산할 수 있는 연속 표현을 만듭니다.",
    why: "Transformer을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["GPT", "BERT 계열", "번역", "LLM", "멀티모달"],
    keyPoints: ["Token ID", "Embedding table", "d_model", "Vector representation"],
    questions: ["Vocabulary size와 embedding matrix shape의 관계는?", "같은 token ID는 입력 단계에서 어떤 vector를 얻는가?"],
    visualType: "transformer"
  },
  "12.04": {
    summary: "Positional Encoding은 Attention 자체에는 없는 Token 순서 정보를 입력 표현에 추가합니다. 위치에 따라 다른 패턴을 더해 Sequence 순서를 구별하게 합니다.",
    why: "Transformer을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["GPT", "BERT 계열", "번역", "LLM", "멀티모달"],
    keyPoints: ["Position", "Sequence order", "Sin/Cos or learned position", "Embedding addition"],
    questions: ["왜 Attention만으로 순서를 자동으로 알 수 없는가?", "Position 정보는 embedding과 어떻게 결합되는가?"],
    visualType: "transformer"
  },
  "12.05": {
    summary: "Encoder Block은 Self-Attention으로 Token 간 정보를 섞고 FFN으로 각 Token 표현을 변환하며 Residual과 Normalization을 통해 안정적으로 쌓입니다.",
    why: "Transformer을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["GPT", "BERT 계열", "번역", "LLM", "멀티모달"],
    keyPoints: ["Self-Attention", "Add & Norm", "FFN", "Residual"],
    questions: ["Encoder에서 모든 token이 서로를 볼 수 있는 이유는?", "Attention 뒤 FFN은 무엇을 추가로 처리하는가?"],
    visualType: "transformer"
  },
  "12.06": {
    summary: "Decoder Block은 Causal Self-Attention으로 미래 정보를 막고, 필요하면 Encoder 출력에 Cross-Attention한 뒤 FFN을 통과합니다.",
    why: "Transformer을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["GPT", "BERT 계열", "번역", "LLM", "멀티모달"],
    keyPoints: ["Masked Self-Attention", "Cross-Attention", "FFN", "Autoregressive"],
    questions: ["Decoder-only GPT와 원래 Transformer decoder의 차이는?", "Causal mask가 어느 연산에 적용되는가?"],
    visualType: "transformer"
  },
  "12.07": {
    summary: "Multi-Head Attention(Multi-Head Attention)은 Transformer의 전체 흐름에서 중요한 단계입니다. Attention과 FFN을 Residual/Normalization으로 연결해 Token 표현을 반복적으로 갱신하는 구조 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "Transformer을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["GPT", "BERT 계열", "번역", "LLM", "멀티모달"],
    keyPoints: ["Multi-Head Attention", "Multi-Head Attention", "Token → Embedding+Position → Attention → FFN → Output", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Multi-Head Attention은 전체 Transformer 흐름의 어느 위치에 있는가?", "Multi-Head Attention의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "transformer"
  },
  "12.08": {
    summary: "Feed Forward Network(Feed Forward Network)은 Transformer의 전체 흐름에서 중요한 단계입니다. Attention과 FFN을 Residual/Normalization으로 연결해 Token 표현을 반복적으로 갱신하는 구조 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "Transformer을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["GPT", "BERT 계열", "번역", "LLM", "멀티모달"],
    keyPoints: ["Feed Forward Network", "Feed Forward Network", "Token → Embedding+Position → Attention → FFN → Output", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Feed Forward Network은 전체 Transformer 흐름의 어느 위치에 있는가?", "Feed Forward Network의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "transformer"
  },
  "12.09": {
    summary: "Residual Connection은 Block 입력을 변환 결과에 더해 깊은 Network에서도 원래 신호와 Gradient가 흐를 경로를 제공합니다.",
    why: "Transformer을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["GPT", "BERT 계열", "번역", "LLM", "멀티모달"],
    keyPoints: ["Skip connection", "x + F(x)", "Gradient flow", "Deep network"],
    questions: ["F(x)가 작아도 입력 정보가 유지되는 이유는?", "Residual이 깊은 모델 학습에 왜 유리한가?"],
    visualType: "transformer"
  },
  "12.10": {
    summary: "Layer Normalization은 한 Token의 feature 차원을 기준으로 값을 정규화해 깊은 Transformer의 학습과 activation scale을 안정화합니다.",
    why: "Transformer을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["GPT", "BERT 계열", "번역", "LLM", "멀티모달"],
    keyPoints: ["Mean", "Variance", "Feature normalization", "Scale/shift"],
    questions: ["BatchNorm과 정규화 축이 어떻게 다른가?", "Transformer에서 LayerNorm이 자주 쓰이는 이유는?"],
    visualType: "transformer"
  },
  "12.11": {
    summary: "Causal Mask(Causal Mask)은 Transformer의 전체 흐름에서 중요한 단계입니다. Attention과 FFN을 Residual/Normalization으로 연결해 Token 표현을 반복적으로 갱신하는 구조 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "Transformer을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["GPT", "BERT 계열", "번역", "LLM", "멀티모달"],
    keyPoints: ["Causal Mask", "Causal Mask", "Token → Embedding+Position → Attention → FFN → Output", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Causal Mask은 전체 Transformer 흐름의 어느 위치에 있는가?", "Causal Mask의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "transformer"
  },
  "12.12": {
    summary: "Cross Attention(Cross Attention)은 Transformer의 전체 흐름에서 중요한 단계입니다. Attention과 FFN을 Residual/Normalization으로 연결해 Token 표현을 반복적으로 갱신하는 구조 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "Transformer을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["GPT", "BERT 계열", "번역", "LLM", "멀티모달"],
    keyPoints: ["Cross Attention", "Cross Attention", "Token → Embedding+Position → Attention → FFN → Output", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Cross Attention은 전체 Transformer 흐름의 어느 위치에 있는가?", "Cross Attention의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "transformer"
  },
  "12.13": {
    summary: "Output Projection(출력 Projection)은 Transformer의 전체 흐름에서 중요한 단계입니다. Attention과 FFN을 Residual/Normalization으로 연결해 Token 표현을 반복적으로 갱신하는 구조 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "Transformer을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["GPT", "BERT 계열", "번역", "LLM", "멀티모달"],
    keyPoints: ["Output Projection", "출력 Projection", "Token → Embedding+Position → Attention → FFN → Output", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Output Projection은 전체 Transformer 흐름의 어느 위치에 있는가?", "출력 Projection의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "transformer"
  },
  "12.14": {
    summary: "Transformer Training Flow(Transformer 학습 흐름)은 Transformer의 전체 흐름에서 중요한 단계입니다. Attention과 FFN을 Residual/Normalization으로 연결해 Token 표현을 반복적으로 갱신하는 구조 안에서 이 개념이 어떤 입력을 받고 무엇을 출력하는지 연결해서 이해합니다.",
    why: "Transformer을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["GPT", "BERT 계열", "번역", "LLM", "멀티모달"],
    keyPoints: ["Transformer Training Flow", "Transformer 학습 흐름", "Token → Embedding+Position → Attention → FFN → Output", "앞 단계의 출력이 다음 단계의 입력으로 연결됨"],
    questions: ["Transformer Training Flow은 전체 Transformer 흐름의 어느 위치에 있는가?", "Transformer 학습 흐름의 입력과 출력은 무엇인가?", "이 개념이 빠지면 다음 단계에서 어떤 문제가 생기는가?"],
    visualType: "transformer"
  },
  "12.15": {
    summary: "Transformer 추론에서는 Prompt Token을 처리한 뒤 마지막 위치의 logits에서 다음 Token을 선택하고, 선택한 Token을 다시 입력에 붙이는 과정을 반복합니다.",
    why: "Transformer을 이름만 암기하지 않고 실제 데이터가 변환되는 과정을 이해하기 위한 핵심 연결점입니다. 이후 Transformer·LLM 학습에서 이 흐름이 반복해서 사용됩니다.",
    usedFor: ["GPT", "BERT 계열", "번역", "LLM", "멀티모달"],
    keyPoints: ["Prompt", "Logits", "Next token", "Autoregressive loop", "KV cache"],
    questions: ["한 번의 forward로 긴 답 전체가 바로 생성되지 않는 이유는?", "생성된 token이 다음 step의 입력에 어떻게 쓰이는가?"],
    visualType: "transformer"
  },
});
// v0.0.12 CONTENT END


// v0.0.15 — Multimodal AI / Generative Models / AI System Engineering explicit learning content
Object.assign(topicContent, {
  "20.01": {"summary": "What is Multimodal AI?(멀티모달 AI란?)은 멀티모달 AI에서 중요한 개념입니다. 이미지·텍스트·음성·비디오처럼 표현 방식이 다른 신호를 각각 인코딩하고, 공통 표현 또는 상호작용 구조에서 결합해 하나의 모델이 함께 추론하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "멀티모달 AI란?을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Vision-Language Model", "Multimodal Search", "Visual QA", "Speech / Audio AI"], "keyPoints": ["What is Multimodal AI?: 입력 → 처리 → 출력", "멀티모달 AI란?이 전체 멀티모달 AI 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["What is Multimodal AI?의 입력과 출력은 무엇인가?", "멀티모달 AI란?이 전체 멀티모달 AI에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "20.02": {"summary": "Modality(모달리티)은 멀티모달 AI에서 중요한 개념입니다. 이미지·텍스트·음성·비디오처럼 표현 방식이 다른 신호를 각각 인코딩하고, 공통 표현 또는 상호작용 구조에서 결합해 하나의 모델이 함께 추론하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "모달리티을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Vision-Language Model", "Multimodal Search", "Visual QA", "Speech / Audio AI"], "keyPoints": ["Modality: 입력 → 처리 → 출력", "모달리티이 전체 멀티모달 AI 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Modality의 입력과 출력은 무엇인가?", "모달리티이 전체 멀티모달 AI에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "20.03": {"summary": "Image + Text Representation(이미지·텍스트 표현)은 멀티모달 AI에서 중요한 개념입니다. 이미지·텍스트·음성·비디오처럼 표현 방식이 다른 신호를 각각 인코딩하고, 공통 표현 또는 상호작용 구조에서 결합해 하나의 모델이 함께 추론하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "이미지·텍스트 표현을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Vision-Language Model", "Multimodal Search", "Visual QA", "Speech / Audio AI"], "keyPoints": ["Image + Text Representation: 입력 → 처리 → 출력", "이미지·텍스트 표현이 전체 멀티모달 AI 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Image + Text Representation의 입력과 출력은 무엇인가?", "이미지·텍스트 표현이 전체 멀티모달 AI에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "20.04": {"summary": "Vision Encoder는 픽셀 배열을 모델이 다룰 수 있는 feature/token representation으로 변환합니다.", "why": "Vision Encoder을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Vision-Language Model", "Multimodal Search", "Visual QA", "Speech / Audio AI"], "keyPoints": ["Pixels → patches/features → vectors", "이미지 해상도와 encoder 구조가 표현 비용과 정보량에 영향을 줍니다.", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Vision Encoder의 입력과 출력은 무엇인가?", "Vision Encoder이 전체 멀티모달 AI에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "20.05": {"summary": "Vision-Language Model(Vision-Language Model)은 멀티모달 AI에서 중요한 개념입니다. 이미지·텍스트·음성·비디오처럼 표현 방식이 다른 신호를 각각 인코딩하고, 공통 표현 또는 상호작용 구조에서 결합해 하나의 모델이 함께 추론하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "Vision-Language Model을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Vision-Language Model", "Multimodal Search", "Visual QA", "Speech / Audio AI"], "keyPoints": ["Vision-Language Model: 입력 → 처리 → 출력", "Vision-Language Model이 전체 멀티모달 AI 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Vision-Language Model의 입력과 출력은 무엇인가?", "Vision-Language Model이 전체 멀티모달 AI에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "20.06": {"summary": "Image Captioning(이미지 캡셔닝)은 멀티모달 AI에서 중요한 개념입니다. 이미지·텍스트·음성·비디오처럼 표현 방식이 다른 신호를 각각 인코딩하고, 공통 표현 또는 상호작용 구조에서 결합해 하나의 모델이 함께 추론하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "이미지 캡셔닝을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Vision-Language Model", "Multimodal Search", "Visual QA", "Speech / Audio AI"], "keyPoints": ["Image Captioning: 입력 → 처리 → 출력", "이미지 캡셔닝이 전체 멀티모달 AI 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Image Captioning의 입력과 출력은 무엇인가?", "이미지 캡셔닝이 전체 멀티모달 AI에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "20.07": {"summary": "Visual Question Answering(Visual QA)은 멀티모달 AI에서 중요한 개념입니다. 이미지·텍스트·음성·비디오처럼 표현 방식이 다른 신호를 각각 인코딩하고, 공통 표현 또는 상호작용 구조에서 결합해 하나의 모델이 함께 추론하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "Visual QA을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Vision-Language Model", "Multimodal Search", "Visual QA", "Speech / Audio AI"], "keyPoints": ["Visual Question Answering: 입력 → 처리 → 출력", "Visual QA이 전체 멀티모달 AI 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Visual Question Answering의 입력과 출력은 무엇인가?", "Visual QA이 전체 멀티모달 AI에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "20.08": {"summary": "OCR vs Vision Model(OCR과 Vision Model)은 멀티모달 AI에서 중요한 개념입니다. 이미지·텍스트·음성·비디오처럼 표현 방식이 다른 신호를 각각 인코딩하고, 공통 표현 또는 상호작용 구조에서 결합해 하나의 모델이 함께 추론하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "OCR과 Vision Model을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Vision-Language Model", "Multimodal Search", "Visual QA", "Speech / Audio AI"], "keyPoints": ["OCR vs Vision Model: 입력 → 처리 → 출력", "OCR과 Vision Model이 전체 멀티모달 AI 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["OCR vs Vision Model의 입력과 출력은 무엇인가?", "OCR과 Vision Model이 전체 멀티모달 AI에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "20.09": {"summary": "Speech Recognition(음성 인식)은 멀티모달 AI에서 중요한 개념입니다. 이미지·텍스트·음성·비디오처럼 표현 방식이 다른 신호를 각각 인코딩하고, 공통 표현 또는 상호작용 구조에서 결합해 하나의 모델이 함께 추론하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "음성 인식을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Vision-Language Model", "Multimodal Search", "Visual QA", "Speech / Audio AI"], "keyPoints": ["Speech Recognition: 입력 → 처리 → 출력", "음성 인식이 전체 멀티모달 AI 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Speech Recognition의 입력과 출력은 무엇인가?", "음성 인식이 전체 멀티모달 AI에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "20.10": {"summary": "Text to Speech(TTS)은 멀티모달 AI에서 중요한 개념입니다. 이미지·텍스트·음성·비디오처럼 표현 방식이 다른 신호를 각각 인코딩하고, 공통 표현 또는 상호작용 구조에서 결합해 하나의 모델이 함께 추론하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "TTS을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Vision-Language Model", "Multimodal Search", "Visual QA", "Speech / Audio AI"], "keyPoints": ["Text to Speech: 입력 → 처리 → 출력", "TTS이 전체 멀티모달 AI 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Text to Speech의 입력과 출력은 무엇인가?", "TTS이 전체 멀티모달 AI에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "20.11": {"summary": "Audio Representation(오디오 표현)은 멀티모달 AI에서 중요한 개념입니다. 이미지·텍스트·음성·비디오처럼 표현 방식이 다른 신호를 각각 인코딩하고, 공통 표현 또는 상호작용 구조에서 결합해 하나의 모델이 함께 추론하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "오디오 표현을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Vision-Language Model", "Multimodal Search", "Visual QA", "Speech / Audio AI"], "keyPoints": ["Audio Representation: 입력 → 처리 → 출력", "오디오 표현이 전체 멀티모달 AI 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Audio Representation의 입력과 출력은 무엇인가?", "오디오 표현이 전체 멀티모달 AI에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "20.12": {"summary": "Multimodal Embedding은 이미지와 텍스트 등 서로 다른 입력을 비교 가능한 벡터 공간에 정렬합니다.", "why": "멀티모달 임베딩을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Vision-Language Model", "Multimodal Search", "Visual QA", "Speech / Audio AI"], "keyPoints": ["Image/Text → encoder → shared vector space", "짝이 맞는 이미지·텍스트의 표현은 가깝게, 관련 없는 표현은 멀게 학습할 수 있습니다.", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Multimodal Embedding의 입력과 출력은 무엇인가?", "멀티모달 임베딩이 전체 멀티모달 AI에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "20.13": {"summary": "Multimodal Transformer는 여러 modality의 token을 Attention으로 연결해 서로의 정보를 참조하게 합니다.", "why": "멀티모달 Transformer을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Vision-Language Model", "Multimodal Search", "Visual QA", "Speech / Audio AI"], "keyPoints": ["Visual tokens + text tokens → attention → fused representation", "Early/Late fusion 등 결합 위치에 따라 계산 구조가 달라질 수 있습니다.", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Multimodal Transformer의 입력과 출력은 무엇인가?", "멀티모달 Transformer이 전체 멀티모달 AI에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "20.14": {"summary": "Video Understanding(비디오 이해)은 멀티모달 AI에서 중요한 개념입니다. 이미지·텍스트·음성·비디오처럼 표현 방식이 다른 신호를 각각 인코딩하고, 공통 표현 또는 상호작용 구조에서 결합해 하나의 모델이 함께 추론하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "비디오 이해을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Vision-Language Model", "Multimodal Search", "Visual QA", "Speech / Audio AI"], "keyPoints": ["Video Understanding: 입력 → 처리 → 출력", "비디오 이해이 전체 멀티모달 AI 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Video Understanding의 입력과 출력은 무엇인가?", "비디오 이해이 전체 멀티모달 AI에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "21.01": {"summary": "Generative vs Discriminative(생성·판별 모델)은 생성 모델에서 중요한 개념입니다. 데이터의 분포나 잠재 구조를 학습해 기존 입력을 분류하는 데서 그치지 않고 새로운 샘플을 생성하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "생성·판별 모델을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Image Generation", "Representation Learning", "Synthetic Data", "Generative AI"], "keyPoints": ["Generative vs Discriminative: 입력 → 처리 → 출력", "생성·판별 모델이 전체 생성 모델 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Generative vs Discriminative의 입력과 출력은 무엇인가?", "생성·판별 모델이 전체 생성 모델에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "21.02": {"summary": "Latent Representation(잠재 표현)은 생성 모델에서 중요한 개념입니다. 데이터의 분포나 잠재 구조를 학습해 기존 입력을 분류하는 데서 그치지 않고 새로운 샘플을 생성하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "잠재 표현을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Image Generation", "Representation Learning", "Synthetic Data", "Generative AI"], "keyPoints": ["Latent Representation: 입력 → 처리 → 출력", "잠재 표현이 전체 생성 모델 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Latent Representation의 입력과 출력은 무엇인가?", "잠재 표현이 전체 생성 모델에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "21.03": {"summary": "Autoencoder는 입력을 작은 Latent Representation으로 압축한 뒤 다시 복원하도록 Encoder와 Decoder를 함께 학습합니다.", "why": "오토인코더을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Image Generation", "Representation Learning", "Synthetic Data", "Generative AI"], "keyPoints": ["x → encoder → z → decoder → x̂", "복원 오차를 줄이는 과정에서 z가 입력의 중요한 구조를 담도록 유도합니다.", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Autoencoder의 입력과 출력은 무엇인가?", "오토인코더이 전체 생성 모델에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "21.04": {"summary": "Variational Autoencoder(VAE)은 생성 모델에서 중요한 개념입니다. 데이터의 분포나 잠재 구조를 학습해 기존 입력을 분류하는 데서 그치지 않고 새로운 샘플을 생성하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "VAE을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Image Generation", "Representation Learning", "Synthetic Data", "Generative AI"], "keyPoints": ["Variational Autoencoder: 입력 → 처리 → 출력", "VAE이 전체 생성 모델 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Variational Autoencoder의 입력과 출력은 무엇인가?", "VAE이 전체 생성 모델에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "21.05": {"summary": "GAN은 Generator가 가짜 샘플을 만들고 Discriminator가 진짜와 가짜를 구분하는 경쟁을 통해 생성 능력을 학습합니다.", "why": "GAN 개요을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Image Generation", "Representation Learning", "Synthetic Data", "Generative AI"], "keyPoints": ["noise → Generator → sample ↔ Discriminator", "두 모델의 균형이 무너지면 학습 불안정이나 mode collapse가 발생할 수 있습니다.", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["GAN Overview의 입력과 출력은 무엇인가?", "GAN 개요이 전체 생성 모델에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "21.06": {"summary": "Generator & Discriminator(Generator와 Discriminator)은 생성 모델에서 중요한 개념입니다. 데이터의 분포나 잠재 구조를 학습해 기존 입력을 분류하는 데서 그치지 않고 새로운 샘플을 생성하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "Generator와 Discriminator을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Image Generation", "Representation Learning", "Synthetic Data", "Generative AI"], "keyPoints": ["Generator & Discriminator: 입력 → 처리 → 출력", "Generator와 Discriminator이 전체 생성 모델 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Generator & Discriminator의 입력과 출력은 무엇인가?", "Generator와 Discriminator이 전체 생성 모델에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "21.07": {"summary": "Diffusion은 데이터에 점진적으로 Noise를 추가하는 과정과, Noise에서 구조를 복원하는 역과정을 학습하는 생성 모델 계열입니다.", "why": "Diffusion 개요을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Image Generation", "Representation Learning", "Synthetic Data", "Generative AI"], "keyPoints": ["data → noise / noise → denoise → sample", "생성 시 여러 denoising step을 반복한다는 점이 핵심입니다.", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Diffusion Overview의 입력과 출력은 무엇인가?", "Diffusion 개요이 전체 생성 모델에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "21.08": {"summary": "Forward Noise Process(Forward Noise 과정)은 생성 모델에서 중요한 개념입니다. 데이터의 분포나 잠재 구조를 학습해 기존 입력을 분류하는 데서 그치지 않고 새로운 샘플을 생성하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "Forward Noise 과정을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Image Generation", "Representation Learning", "Synthetic Data", "Generative AI"], "keyPoints": ["Forward Noise Process: 입력 → 처리 → 출력", "Forward Noise 과정이 전체 생성 모델 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Forward Noise Process의 입력과 출력은 무엇인가?", "Forward Noise 과정이 전체 생성 모델에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "21.09": {"summary": "Reverse Denoising은 현재 noisy sample에서 제거해야 할 noise 또는 복원 방향을 모델이 예측해 한 단계 더 깨끗한 상태로 이동하는 과정입니다.", "why": "역방향 Denoising을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Image Generation", "Representation Learning", "Synthetic Data", "Generative AI"], "keyPoints": ["xₜ → noise prediction → xₜ₋₁", "이 과정을 반복하면 무작위 noise에서 구조화된 sample이 나타납니다.", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Reverse Denoising의 입력과 출력은 무엇인가?", "역방향 Denoising이 전체 생성 모델에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "21.10": {"summary": "Latent Diffusion(Latent Diffusion)은 생성 모델에서 중요한 개념입니다. 데이터의 분포나 잠재 구조를 학습해 기존 입력을 분류하는 데서 그치지 않고 새로운 샘플을 생성하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "Latent Diffusion을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Image Generation", "Representation Learning", "Synthetic Data", "Generative AI"], "keyPoints": ["Latent Diffusion: 입력 → 처리 → 출력", "Latent Diffusion이 전체 생성 모델 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Latent Diffusion의 입력과 출력은 무엇인가?", "Latent Diffusion이 전체 생성 모델에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "21.11": {"summary": "Text Conditioning(텍스트 Conditioning)은 생성 모델에서 중요한 개념입니다. 데이터의 분포나 잠재 구조를 학습해 기존 입력을 분류하는 데서 그치지 않고 새로운 샘플을 생성하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "텍스트 Conditioning을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Image Generation", "Representation Learning", "Synthetic Data", "Generative AI"], "keyPoints": ["Text Conditioning: 입력 → 처리 → 출력", "텍스트 Conditioning이 전체 생성 모델 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Text Conditioning의 입력과 출력은 무엇인가?", "텍스트 Conditioning이 전체 생성 모델에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "21.12": {"summary": "Sampling Steps & Guidance(Sampling Step과 Guidance)은 생성 모델에서 중요한 개념입니다. 데이터의 분포나 잠재 구조를 학습해 기존 입력을 분류하는 데서 그치지 않고 새로운 샘플을 생성하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "Sampling Step과 Guidance을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Image Generation", "Representation Learning", "Synthetic Data", "Generative AI"], "keyPoints": ["Sampling Steps & Guidance: 입력 → 처리 → 출력", "Sampling Step과 Guidance이 전체 생성 모델 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Sampling Steps & Guidance의 입력과 출력은 무엇인가?", "Sampling Step과 Guidance이 전체 생성 모델에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "21.13": {"summary": "Generative Model Comparison(생성 모델 비교)은 생성 모델에서 중요한 개념입니다. 데이터의 분포나 잠재 구조를 학습해 기존 입력을 분류하는 데서 그치지 않고 새로운 샘플을 생성하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "생성 모델 비교을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Image Generation", "Representation Learning", "Synthetic Data", "Generative AI"], "keyPoints": ["Generative Model Comparison: 입력 → 처리 → 출력", "생성 모델 비교이 전체 생성 모델 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Generative Model Comparison의 입력과 출력은 무엇인가?", "생성 모델 비교이 전체 생성 모델에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "22.01": {"summary": "AI Application Architecture(AI 애플리케이션 아키텍처)은 AI 시스템 엔지니어링에서 중요한 개념입니다. 학습된 모델을 실제 요청에 안정적으로 제공하기 위해 Compute, Memory, Queue, Batching, API, Scaling, Observability를 함께 설계하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "AI 애플리케이션 아키텍처을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Model Serving", "Inference API", "Scalable AI", "Production Operations"], "keyPoints": ["AI Application Architecture: 입력 → 처리 → 출력", "AI 애플리케이션 아키텍처이 전체 AI 시스템 엔지니어링 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["AI Application Architecture의 입력과 출력은 무엇인가?", "AI 애플리케이션 아키텍처이 전체 AI 시스템 엔지니어링에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "22.02": {"summary": "Training vs Serving(Training과 Serving)은 AI 시스템 엔지니어링에서 중요한 개념입니다. 학습된 모델을 실제 요청에 안정적으로 제공하기 위해 Compute, Memory, Queue, Batching, API, Scaling, Observability를 함께 설계하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "Training과 Serving을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Model Serving", "Inference API", "Scalable AI", "Production Operations"], "keyPoints": ["Training vs Serving: 입력 → 처리 → 출력", "Training과 Serving이 전체 AI 시스템 엔지니어링 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Training vs Serving의 입력과 출력은 무엇인가?", "Training과 Serving이 전체 AI 시스템 엔지니어링에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "22.03": {"summary": "CPU와 GPU는 모두 계산 장치지만, GPU는 많은 병렬 연산을 처리하는 구조 때문에 대규모 tensor/matrix 연산에서 강점을 가집니다.", "why": "CPU와 GPU을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Model Serving", "Inference API", "Scalable AI", "Production Operations"], "keyPoints": ["workload → CPU or GPU → compute", "모든 단계가 GPU에 적합한 것은 아니며 전처리·I/O·제어 흐름은 CPU가 담당하기도 합니다.", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["CPU vs GPU의 입력과 출력은 무엇인가?", "CPU와 GPU이 전체 AI 시스템 엔지니어링에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "22.04": {"summary": "VRAM은 모델 weight, activation, KV cache, batch 입력 등 GPU 계산에 필요한 데이터를 보관하는 제한된 자원입니다.", "why": "GPU 메모리·VRAM을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Model Serving", "Inference API", "Scalable AI", "Production Operations"], "keyPoints": ["weights + activations + cache + batch ≤ VRAM", "메모리 부족은 batch size, precision, model size, context length와 직접 연결됩니다.", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["GPU Memory / VRAM의 입력과 출력은 무엇인가?", "GPU 메모리·VRAM이 전체 AI 시스템 엔지니어링에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "22.05": {"summary": "Model Loading(모델 로딩)은 AI 시스템 엔지니어링에서 중요한 개념입니다. 학습된 모델을 실제 요청에 안정적으로 제공하기 위해 Compute, Memory, Queue, Batching, API, Scaling, Observability를 함께 설계하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "모델 로딩을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Model Serving", "Inference API", "Scalable AI", "Production Operations"], "keyPoints": ["Model Loading: 입력 → 처리 → 출력", "모델 로딩이 전체 AI 시스템 엔지니어링 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Model Loading의 입력과 출력은 무엇인가?", "모델 로딩이 전체 AI 시스템 엔지니어링에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "22.06": {"summary": "Online Inference(온라인 추론)은 AI 시스템 엔지니어링에서 중요한 개념입니다. 학습된 모델을 실제 요청에 안정적으로 제공하기 위해 Compute, Memory, Queue, Batching, API, Scaling, Observability를 함께 설계하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "온라인 추론을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Model Serving", "Inference API", "Scalable AI", "Production Operations"], "keyPoints": ["Online Inference: 입력 → 처리 → 출력", "온라인 추론이 전체 AI 시스템 엔지니어링 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Online Inference의 입력과 출력은 무엇인가?", "온라인 추론이 전체 AI 시스템 엔지니어링에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "22.07": {"summary": "Batch Inference(배치 추론)은 AI 시스템 엔지니어링에서 중요한 개념입니다. 학습된 모델을 실제 요청에 안정적으로 제공하기 위해 Compute, Memory, Queue, Batching, API, Scaling, Observability를 함께 설계하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "배치 추론을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Model Serving", "Inference API", "Scalable AI", "Production Operations"], "keyPoints": ["Batch Inference: 입력 → 처리 → 출력", "배치 추론이 전체 AI 시스템 엔지니어링 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Batch Inference의 입력과 출력은 무엇인가?", "배치 추론이 전체 AI 시스템 엔지니어링에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "22.08": {"summary": "Model Serving(모델 서빙)은 AI 시스템 엔지니어링에서 중요한 개념입니다. 학습된 모델을 실제 요청에 안정적으로 제공하기 위해 Compute, Memory, Queue, Batching, API, Scaling, Observability를 함께 설계하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "모델 서빙을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Model Serving", "Inference API", "Scalable AI", "Production Operations"], "keyPoints": ["Model Serving: 입력 → 처리 → 출력", "모델 서빙이 전체 AI 시스템 엔지니어링 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Model Serving의 입력과 출력은 무엇인가?", "모델 서빙이 전체 AI 시스템 엔지니어링에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "22.09": {"summary": "Inference API(추론 API)은 AI 시스템 엔지니어링에서 중요한 개념입니다. 학습된 모델을 실제 요청에 안정적으로 제공하기 위해 Compute, Memory, Queue, Batching, API, Scaling, Observability를 함께 설계하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "추론 API을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Model Serving", "Inference API", "Scalable AI", "Production Operations"], "keyPoints": ["Inference API: 입력 → 처리 → 출력", "추론 API이 전체 AI 시스템 엔지니어링 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Inference API의 입력과 출력은 무엇인가?", "추론 API이 전체 AI 시스템 엔지니어링에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "22.10": {"summary": "Latency(Latency)은 AI 시스템 엔지니어링에서 중요한 개념입니다. 학습된 모델을 실제 요청에 안정적으로 제공하기 위해 Compute, Memory, Queue, Batching, API, Scaling, Observability를 함께 설계하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "Latency을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Model Serving", "Inference API", "Scalable AI", "Production Operations"], "keyPoints": ["Latency: 입력 → 처리 → 출력", "Latency이 전체 AI 시스템 엔지니어링 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Latency의 입력과 출력은 무엇인가?", "Latency이 전체 AI 시스템 엔지니어링에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "22.11": {"summary": "Throughput(Throughput)은 AI 시스템 엔지니어링에서 중요한 개념입니다. 학습된 모델을 실제 요청에 안정적으로 제공하기 위해 Compute, Memory, Queue, Batching, API, Scaling, Observability를 함께 설계하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "Throughput을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Model Serving", "Inference API", "Scalable AI", "Production Operations"], "keyPoints": ["Throughput: 입력 → 처리 → 출력", "Throughput이 전체 AI 시스템 엔지니어링 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Throughput의 입력과 출력은 무엇인가?", "Throughput이 전체 AI 시스템 엔지니어링에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "22.12": {"summary": "Concurrency(동시성)은 AI 시스템 엔지니어링에서 중요한 개념입니다. 학습된 모델을 실제 요청에 안정적으로 제공하기 위해 Compute, Memory, Queue, Batching, API, Scaling, Observability를 함께 설계하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "동시성을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Model Serving", "Inference API", "Scalable AI", "Production Operations"], "keyPoints": ["Concurrency: 입력 → 처리 → 출력", "동시성이 전체 AI 시스템 엔지니어링 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Concurrency의 입력과 출력은 무엇인가?", "동시성이 전체 AI 시스템 엔지니어링에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "22.13": {"summary": "Batching은 여러 요청의 계산을 묶어 GPU를 더 효율적으로 사용하는 기법입니다.", "why": "Batching을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Model Serving", "Inference API", "Scalable AI", "Production Operations"], "keyPoints": ["requests → batch → one/fewer GPU passes", "Batch가 커지면 throughput은 좋아질 수 있지만 대기시간과 메모리 사용량도 증가할 수 있습니다.", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Batching의 입력과 출력은 무엇인가?", "Batching이 전체 AI 시스템 엔지니어링에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "22.14": {"summary": "Streaming Response(Streaming 응답)은 AI 시스템 엔지니어링에서 중요한 개념입니다. 학습된 모델을 실제 요청에 안정적으로 제공하기 위해 Compute, Memory, Queue, Batching, API, Scaling, Observability를 함께 설계하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "Streaming 응답을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Model Serving", "Inference API", "Scalable AI", "Production Operations"], "keyPoints": ["Streaming Response: 입력 → 처리 → 출력", "Streaming 응답이 전체 AI 시스템 엔지니어링 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Streaming Response의 입력과 출력은 무엇인가?", "Streaming 응답이 전체 AI 시스템 엔지니어링에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "22.15": {"summary": "Caching(캐싱)은 AI 시스템 엔지니어링에서 중요한 개념입니다. 학습된 모델을 실제 요청에 안정적으로 제공하기 위해 Compute, Memory, Queue, Batching, API, Scaling, Observability를 함께 설계하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "캐싱을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Model Serving", "Inference API", "Scalable AI", "Production Operations"], "keyPoints": ["Caching: 입력 → 처리 → 출력", "캐싱이 전체 AI 시스템 엔지니어링 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Caching의 입력과 출력은 무엇인가?", "캐싱이 전체 AI 시스템 엔지니어링에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "22.16": {"summary": "Autoscaling은 부하나 지표에 따라 serving replica/compute 수를 조절해 성능과 비용의 균형을 맞춥니다.", "why": "오토스케일링을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Model Serving", "Inference API", "Scalable AI", "Production Operations"], "keyPoints": ["metrics → scaling decision → replicas", "Scale-out 속도, cold start, 최소/최대 용량과 비용을 함께 고려해야 합니다.", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Autoscaling의 입력과 출력은 무엇인가?", "오토스케일링이 전체 AI 시스템 엔지니어링에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "22.17": {"summary": "Queue와 Backpressure는 처리 능력보다 요청 유입이 빠를 때 시스템이 무너지지 않도록 대기·제한·거절 정책을 적용하는 핵심 구조입니다.", "why": "Queue와 Backpressure을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Model Serving", "Inference API", "Scalable AI", "Production Operations"], "keyPoints": ["arrival rate > service rate → queue/backpressure", "무제한 Queue는 지연만 키울 수 있으므로 timeout과 admission control도 필요합니다.", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Queue & Backpressure의 입력과 출력은 무엇인가?", "Queue와 Backpressure이 전체 AI 시스템 엔지니어링에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "22.18": {"summary": "Observability는 latency, throughput, errors, resource usage와 모델 품질 신호를 함께 관찰해 운영 상태를 설명할 수 있게 합니다.", "why": "관측성을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Model Serving", "Inference API", "Scalable AI", "Production Operations"], "keyPoints": ["logs + metrics + traces + model signals", "단순 인프라 모니터링뿐 아니라 모델/프롬프트/검색 계층의 문제도 추적해야 합니다.", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Observability의 입력과 출력은 무엇인가?", "관측성이 전체 AI 시스템 엔지니어링에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
  "22.19": {"summary": "Model Gateway(Model Gateway)은 AI 시스템 엔지니어링에서 중요한 개념입니다. 학습된 모델을 실제 요청에 안정적으로 제공하기 위해 Compute, Memory, Queue, Batching, API, Scaling, Observability를 함께 설계하는 흐름 안에서 이 개념이 어떤 입력을 받고 무엇을 변환하며 다음 단계에 무엇을 전달하는지 이해합니다.", "why": "Model Gateway을 용어로만 외우지 않고 실제 시스템의 데이터 흐름과 자원·품질 트레이드오프에 연결해야 이후 설계와 문제 분석에서 원인을 추적할 수 있습니다.", "usedFor": ["Model Serving", "Inference API", "Scalable AI", "Production Operations"], "keyPoints": ["Model Gateway: 입력 → 처리 → 출력", "Model Gateway이 전체 AI 시스템 엔지니어링 흐름에서 맡는 역할", "앞 단계와 다음 단계의 연결", "직접 조작하는 Lab에서 변화 관찰"], "questions": ["Model Gateway의 입력과 출력은 무엇인가?", "Model Gateway이 전체 AI 시스템 엔지니어링에서 필요한 이유는 무엇인가?", "관련 Parameter나 설계 선택을 바꾸면 결과에 어떤 변화가 생기는가?"], "visualType": "generic"},
});
// v0.0.15 CONTENT END

export function getTopicContent(code:string): TopicContent {
  return topicContent[code] ?? {
    summary:"이 Topic은 해당 Chapter를 이해하기 위해 필요한 핵심 개념입니다. 정의만 외우지 않고 시각화, 사용처, 선수지식, 다음 개념과 연결해 학습합니다.",
    why:"상위 개념과 다음 Topic 사이의 연결을 끊지 않고 전체 AI 구조를 단계적으로 이해하기 위해 필요합니다.",
    usedFor:["AI 학습 기반","다음 Topic의 선수지식","실제 모델/서비스 이해"],
    keyPoints:["정의","왜 필요한가","어디에 쓰이는가","어떻게 연결되는가"],
    questions:["이 개념은 상위 분야에서 어떤 역할을 하는가?","다음 단계에서 어디에 다시 등장하는가?"],
    visualType:"generic"
  };
}

Object.assign(topicContent, {
  "13.01": {
    summary: "What is a Language Model?(언어 모델이란?)은 언어 모델에서 중요한 개념입니다. 문맥에서 다음/가려진 Token의 확률을 모델링하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "언어 모델을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["언어 생성", "이해 모델"],
    keyPoints: ["What is a Language Model?", "언어 모델이란?", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["What is a Language Model?은 전체 언어 모델 흐름에서 어디에 위치하는가?", "What is a Language Model?의 입력과 출력은 무엇인가?", "언어 모델이란?가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "13.02": {
    summary: "N-gram Language Model(N-gram 언어 모델)은 언어 모델에서 중요한 개념입니다. 문맥에서 다음/가려진 Token의 확률을 모델링하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "언어 모델을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["언어 생성", "이해 모델"],
    keyPoints: ["N-gram Language Model", "N-gram 언어 모델", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["N-gram Language Model은 전체 언어 모델 흐름에서 어디에 위치하는가?", "N-gram Language Model의 입력과 출력은 무엇인가?", "N-gram 언어 모델가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "13.03": {
    summary: "Neural Language Model(신경 언어 모델)은 언어 모델에서 중요한 개념입니다. 문맥에서 다음/가려진 Token의 확률을 모델링하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "언어 모델을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["언어 생성", "이해 모델"],
    keyPoints: ["Neural Language Model", "신경 언어 모델", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Neural Language Model은 전체 언어 모델 흐름에서 어디에 위치하는가?", "Neural Language Model의 입력과 출력은 무엇인가?", "신경 언어 모델가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "13.04": {
    summary: "Autoregressive Modeling(자기회귀 모델링)은 언어 모델에서 중요한 개념입니다. 문맥에서 다음/가려진 Token의 확률을 모델링하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "언어 모델을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["언어 생성", "이해 모델"],
    keyPoints: ["Autoregressive Modeling", "자기회귀 모델링", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Autoregressive Modeling은 전체 언어 모델 흐름에서 어디에 위치하는가?", "Autoregressive Modeling의 입력과 출력은 무엇인가?", "자기회귀 모델링가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "13.05": {
    summary: "Masked Language Modeling(Masked LM)은 언어 모델에서 중요한 개념입니다. 문맥에서 다음/가려진 Token의 확률을 모델링하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "언어 모델을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["언어 생성", "이해 모델"],
    keyPoints: ["Masked Language Modeling", "Masked LM", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Masked Language Modeling은 전체 언어 모델 흐름에서 어디에 위치하는가?", "Masked Language Modeling의 입력과 출력은 무엇인가?", "Masked LM가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "13.06": {
    summary: "Next Token Prediction(다음 토큰 예측)은 언어 모델에서 중요한 개념입니다. 문맥에서 다음/가려진 Token의 확률을 모델링하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "언어 모델을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["언어 생성", "이해 모델"],
    keyPoints: ["Next Token Prediction", "다음 토큰 예측", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Next Token Prediction은 전체 언어 모델 흐름에서 어디에 위치하는가?", "Next Token Prediction의 입력과 출력은 무엇인가?", "다음 토큰 예측가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "13.07": {
    summary: "Encoder-only Models(Encoder-only 모델)은 언어 모델에서 중요한 개념입니다. 문맥에서 다음/가려진 Token의 확률을 모델링하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "언어 모델을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["언어 생성", "이해 모델"],
    keyPoints: ["Encoder-only Models", "Encoder-only 모델", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Encoder-only Models은 전체 언어 모델 흐름에서 어디에 위치하는가?", "Encoder-only Models의 입력과 출력은 무엇인가?", "Encoder-only 모델가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "13.08": {
    summary: "Decoder-only Models(Decoder-only 모델)은 언어 모델에서 중요한 개념입니다. 문맥에서 다음/가려진 Token의 확률을 모델링하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "언어 모델을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["언어 생성", "이해 모델"],
    keyPoints: ["Decoder-only Models", "Decoder-only 모델", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Decoder-only Models은 전체 언어 모델 흐름에서 어디에 위치하는가?", "Decoder-only Models의 입력과 출력은 무엇인가?", "Decoder-only 모델가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "13.09": {
    summary: "Encoder-Decoder Models(Encoder-Decoder 모델)은 언어 모델에서 중요한 개념입니다. 문맥에서 다음/가려진 Token의 확률을 모델링하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "언어 모델을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["언어 생성", "이해 모델"],
    keyPoints: ["Encoder-Decoder Models", "Encoder-Decoder 모델", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Encoder-Decoder Models은 전체 언어 모델 흐름에서 어디에 위치하는가?", "Encoder-Decoder Models의 입력과 출력은 무엇인가?", "Encoder-Decoder 모델가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "13.10": {
    summary: "BERT Family Concepts(BERT 계열 개념)은 언어 모델에서 중요한 개념입니다. 문맥에서 다음/가려진 Token의 확률을 모델링하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "언어 모델을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["언어 생성", "이해 모델"],
    keyPoints: ["BERT Family Concepts", "BERT 계열 개념", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["BERT Family Concepts은 전체 언어 모델 흐름에서 어디에 위치하는가?", "BERT Family Concepts의 입력과 출력은 무엇인가?", "BERT 계열 개념가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "13.11": {
    summary: "GPT Family Concepts(GPT 계열 개념)은 언어 모델에서 중요한 개념입니다. 문맥에서 다음/가려진 Token의 확률을 모델링하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "언어 모델을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["언어 생성", "이해 모델"],
    keyPoints: ["GPT Family Concepts", "GPT 계열 개념", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["GPT Family Concepts은 전체 언어 모델 흐름에서 어디에 위치하는가?", "GPT Family Concepts의 입력과 출력은 무엇인가?", "GPT 계열 개념가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "13.12": {
    summary: "T5 Family Concepts(T5 계열 개념)은 언어 모델에서 중요한 개념입니다. 문맥에서 다음/가려진 Token의 확률을 모델링하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "언어 모델을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["언어 생성", "이해 모델"],
    keyPoints: ["T5 Family Concepts", "T5 계열 개념", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["T5 Family Concepts은 전체 언어 모델 흐름에서 어디에 위치하는가?", "T5 Family Concepts의 입력과 출력은 무엇인가?", "T5 계열 개념가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "13.13": {
    summary: "Sequence Generation(시퀀스 생성)은 언어 모델에서 중요한 개념입니다. 문맥에서 다음/가려진 Token의 확률을 모델링하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "언어 모델을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["언어 생성", "이해 모델"],
    keyPoints: ["Sequence Generation", "시퀀스 생성", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Sequence Generation은 전체 언어 모델 흐름에서 어디에 위치하는가?", "Sequence Generation의 입력과 출력은 무엇인가?", "시퀀스 생성가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "14.02": {
    summary: "Foundation Model(파운데이션 모델)은 LLM에서 중요한 개념입니다. 대규모 Transformer 언어 모델의 생성과 추론 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["대화", "요약", "코드", "생성형 AI"],
    keyPoints: ["Foundation Model", "파운데이션 모델", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Foundation Model은 전체 LLM 흐름에서 어디에 위치하는가?", "Foundation Model의 입력과 출력은 무엇인가?", "파운데이션 모델가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "14.03": {
    summary: "Model Parameters(모델 파라미터)은 LLM에서 중요한 개념입니다. 대규모 Transformer 언어 모델의 생성과 추론 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["대화", "요약", "코드", "생성형 AI"],
    keyPoints: ["Model Parameters", "모델 파라미터", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Model Parameters은 전체 LLM 흐름에서 어디에 위치하는가?", "Model Parameters의 입력과 출력은 무엇인가?", "모델 파라미터가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "14.04": {
    summary: "Model Size(모델 크기)은 LLM에서 중요한 개념입니다. 대규모 Transformer 언어 모델의 생성과 추론 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["대화", "요약", "코드", "생성형 AI"],
    keyPoints: ["Model Size", "모델 크기", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Model Size은 전체 LLM 흐름에서 어디에 위치하는가?", "Model Size의 입력과 출력은 무엇인가?", "모델 크기가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "14.05": {
    summary: "Training Data(학습 데이터)은 LLM에서 중요한 개념입니다. 대규모 Transformer 언어 모델의 생성과 추론 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["대화", "요약", "코드", "생성형 AI"],
    keyPoints: ["Training Data", "학습 데이터", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Training Data은 전체 LLM 흐름에서 어디에 위치하는가?", "Training Data의 입력과 출력은 무엇인가?", "학습 데이터가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "14.06": {
    summary: "Pre-training(사전 학습)은 LLM에서 중요한 개념입니다. 대규모 Transformer 언어 모델의 생성과 추론 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["대화", "요약", "코드", "생성형 AI"],
    keyPoints: ["Pre-training", "사전 학습", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Pre-training은 전체 LLM 흐름에서 어디에 위치하는가?", "Pre-training의 입력과 출력은 무엇인가?", "사전 학습가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "14.07": {
    summary: "Tokenization in LLMs(LLM 토큰화)은 LLM에서 중요한 개념입니다. 대규모 Transformer 언어 모델의 생성과 추론 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["대화", "요약", "코드", "생성형 AI"],
    keyPoints: ["Tokenization in LLMs", "LLM 토큰화", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Tokenization in LLMs은 전체 LLM 흐름에서 어디에 위치하는가?", "Tokenization in LLMs의 입력과 출력은 무엇인가?", "LLM 토큰화가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "14.08": {
    summary: "Context Window(컨텍스트 윈도우)은 LLM에서 중요한 개념입니다. 대규모 Transformer 언어 모델의 생성과 추론 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["대화", "요약", "코드", "생성형 AI"],
    keyPoints: ["Context Window", "컨텍스트 윈도우", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Context Window은 전체 LLM 흐름에서 어디에 위치하는가?", "Context Window의 입력과 출력은 무엇인가?", "컨텍스트 윈도우가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "14.09": {
    summary: "Inference(추론)은 LLM에서 중요한 개념입니다. 대규모 Transformer 언어 모델의 생성과 추론 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["대화", "요약", "코드", "생성형 AI"],
    keyPoints: ["Inference", "추론", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Inference은 전체 LLM 흐름에서 어디에 위치하는가?", "Inference의 입력과 출력은 무엇인가?", "추론가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "14.10": {
    summary: "Logits(로짓)은 LLM에서 중요한 개념입니다. 대규모 Transformer 언어 모델의 생성과 추론 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["대화", "요약", "코드", "생성형 AI"],
    keyPoints: ["Logits", "로짓", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Logits은 전체 LLM 흐름에서 어디에 위치하는가?", "Logits의 입력과 출력은 무엇인가?", "로짓가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "14.11": {
    summary: "Probability Distribution(확률 분포)은 LLM에서 중요한 개념입니다. 대규모 Transformer 언어 모델의 생성과 추론 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["대화", "요약", "코드", "생성형 AI"],
    keyPoints: ["Probability Distribution", "확률 분포", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Probability Distribution은 전체 LLM 흐름에서 어디에 위치하는가?", "Probability Distribution의 입력과 출력은 무엇인가?", "확률 분포가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "14.12": {
    summary: "Temperature(Temperature)은 LLM에서 중요한 개념입니다. 대규모 Transformer 언어 모델의 생성과 추론 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["대화", "요약", "코드", "생성형 AI"],
    keyPoints: ["Temperature", "Temperature", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Temperature은 전체 LLM 흐름에서 어디에 위치하는가?", "Temperature의 입력과 출력은 무엇인가?", "Temperature가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "14.13": {
    summary: "Top-K(Top-K)은 LLM에서 중요한 개념입니다. 대규모 Transformer 언어 모델의 생성과 추론 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["대화", "요약", "코드", "생성형 AI"],
    keyPoints: ["Top-K", "Top-K", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Top-K은 전체 LLM 흐름에서 어디에 위치하는가?", "Top-K의 입력과 출력은 무엇인가?", "Top-K가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "14.14": {
    summary: "Top-P(Top-P)은 LLM에서 중요한 개념입니다. 대규모 Transformer 언어 모델의 생성과 추론 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["대화", "요약", "코드", "생성형 AI"],
    keyPoints: ["Top-P", "Top-P", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Top-P은 전체 LLM 흐름에서 어디에 위치하는가?", "Top-P의 입력과 출력은 무엇인가?", "Top-P가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "14.15": {
    summary: "Sampling(샘플링)은 LLM에서 중요한 개념입니다. 대규모 Transformer 언어 모델의 생성과 추론 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["대화", "요약", "코드", "생성형 AI"],
    keyPoints: ["Sampling", "샘플링", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Sampling은 전체 LLM 흐름에서 어디에 위치하는가?", "Sampling의 입력과 출력은 무엇인가?", "샘플링가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "14.16": {
    summary: "Determinism & Seed(결정성·Seed)은 LLM에서 중요한 개념입니다. 대규모 Transformer 언어 모델의 생성과 추론 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["대화", "요약", "코드", "생성형 AI"],
    keyPoints: ["Determinism & Seed", "결정성·Seed", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Determinism & Seed은 전체 LLM 흐름에서 어디에 위치하는가?", "Determinism & Seed의 입력과 출력은 무엇인가?", "결정성·Seed가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "14.17": {
    summary: "Hallucination(환각)은 LLM에서 중요한 개념입니다. 대규모 Transformer 언어 모델의 생성과 추론 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["대화", "요약", "코드", "생성형 AI"],
    keyPoints: ["Hallucination", "환각", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Hallucination은 전체 LLM 흐름에서 어디에 위치하는가?", "Hallucination의 입력과 출력은 무엇인가?", "환각가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "14.18": {
    summary: "Knowledge Cutoff Concept(학습 지식 시점 개념)은 LLM에서 중요한 개념입니다. 대규모 Transformer 언어 모델의 생성과 추론 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["대화", "요약", "코드", "생성형 AI"],
    keyPoints: ["Knowledge Cutoff Concept", "학습 지식 시점 개념", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Knowledge Cutoff Concept은 전체 LLM 흐름에서 어디에 위치하는가?", "Knowledge Cutoff Concept의 입력과 출력은 무엇인가?", "학습 지식 시점 개념가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "15.01": {
    summary: "Pre-training Objective(사전학습 목적함수)은 LLM 학습·정렬에서 중요한 개념입니다. 사전학습 모델을 목적과 선호에 맞게 조정하는 과정 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM 학습·정렬을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Fine-tuning", "SFT", "LoRA", "Alignment"],
    keyPoints: ["Pre-training Objective", "사전학습 목적함수", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Pre-training Objective은 전체 LLM 학습·정렬 흐름에서 어디에 위치하는가?", "Pre-training Objective의 입력과 출력은 무엇인가?", "사전학습 목적함수가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "15.02": {
    summary: "Continued Pre-training(추가 사전학습)은 LLM 학습·정렬에서 중요한 개념입니다. 사전학습 모델을 목적과 선호에 맞게 조정하는 과정 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM 학습·정렬을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Fine-tuning", "SFT", "LoRA", "Alignment"],
    keyPoints: ["Continued Pre-training", "추가 사전학습", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Continued Pre-training은 전체 LLM 학습·정렬 흐름에서 어디에 위치하는가?", "Continued Pre-training의 입력과 출력은 무엇인가?", "추가 사전학습가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "15.03": {
    summary: "Fine-tuning(파인튜닝)은 LLM 학습·정렬에서 중요한 개념입니다. 사전학습 모델을 목적과 선호에 맞게 조정하는 과정 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM 학습·정렬을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Fine-tuning", "SFT", "LoRA", "Alignment"],
    keyPoints: ["Fine-tuning", "파인튜닝", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Fine-tuning은 전체 LLM 학습·정렬 흐름에서 어디에 위치하는가?", "Fine-tuning의 입력과 출력은 무엇인가?", "파인튜닝가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "15.04": {
    summary: "Supervised Fine-tuning(SFT)은 LLM 학습·정렬에서 중요한 개념입니다. 사전학습 모델을 목적과 선호에 맞게 조정하는 과정 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM 학습·정렬을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Fine-tuning", "SFT", "LoRA", "Alignment"],
    keyPoints: ["Supervised Fine-tuning", "SFT", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Supervised Fine-tuning은 전체 LLM 학습·정렬 흐름에서 어디에 위치하는가?", "Supervised Fine-tuning의 입력과 출력은 무엇인가?", "SFT가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "15.05": {
    summary: "Instruction Tuning(Instruction Tuning)은 LLM 학습·정렬에서 중요한 개념입니다. 사전학습 모델을 목적과 선호에 맞게 조정하는 과정 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM 학습·정렬을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Fine-tuning", "SFT", "LoRA", "Alignment"],
    keyPoints: ["Instruction Tuning", "Instruction Tuning", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Instruction Tuning은 전체 LLM 학습·정렬 흐름에서 어디에 위치하는가?", "Instruction Tuning의 입력과 출력은 무엇인가?", "Instruction Tuning가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "15.06": {
    summary: "Parameter-efficient Fine-tuning(PEFT)은 LLM 학습·정렬에서 중요한 개념입니다. 사전학습 모델을 목적과 선호에 맞게 조정하는 과정 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM 학습·정렬을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Fine-tuning", "SFT", "LoRA", "Alignment"],
    keyPoints: ["Parameter-efficient Fine-tuning", "PEFT", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Parameter-efficient Fine-tuning은 전체 LLM 학습·정렬 흐름에서 어디에 위치하는가?", "Parameter-efficient Fine-tuning의 입력과 출력은 무엇인가?", "PEFT가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "15.07": {
    summary: "LoRA(LoRA)은 LLM 학습·정렬에서 중요한 개념입니다. 사전학습 모델을 목적과 선호에 맞게 조정하는 과정 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM 학습·정렬을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Fine-tuning", "SFT", "LoRA", "Alignment"],
    keyPoints: ["LoRA", "LoRA", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["LoRA은 전체 LLM 학습·정렬 흐름에서 어디에 위치하는가?", "LoRA의 입력과 출력은 무엇인가?", "LoRA가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "15.08": {
    summary: "QLoRA(QLoRA)은 LLM 학습·정렬에서 중요한 개념입니다. 사전학습 모델을 목적과 선호에 맞게 조정하는 과정 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM 학습·정렬을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Fine-tuning", "SFT", "LoRA", "Alignment"],
    keyPoints: ["QLoRA", "QLoRA", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["QLoRA은 전체 LLM 학습·정렬 흐름에서 어디에 위치하는가?", "QLoRA의 입력과 출력은 무엇인가?", "QLoRA가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "15.09": {
    summary: "Quantization Basics(양자화 기초)은 LLM 학습·정렬에서 중요한 개념입니다. 사전학습 모델을 목적과 선호에 맞게 조정하는 과정 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM 학습·정렬을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Fine-tuning", "SFT", "LoRA", "Alignment"],
    keyPoints: ["Quantization Basics", "양자화 기초", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Quantization Basics은 전체 LLM 학습·정렬 흐름에서 어디에 위치하는가?", "Quantization Basics의 입력과 출력은 무엇인가?", "양자화 기초가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "15.10": {
    summary: "Preference Data(선호 데이터)은 LLM 학습·정렬에서 중요한 개념입니다. 사전학습 모델을 목적과 선호에 맞게 조정하는 과정 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM 학습·정렬을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Fine-tuning", "SFT", "LoRA", "Alignment"],
    keyPoints: ["Preference Data", "선호 데이터", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Preference Data은 전체 LLM 학습·정렬 흐름에서 어디에 위치하는가?", "Preference Data의 입력과 출력은 무엇인가?", "선호 데이터가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "15.11": {
    summary: "RLHF Concept(RLHF 개념)은 LLM 학습·정렬에서 중요한 개념입니다. 사전학습 모델을 목적과 선호에 맞게 조정하는 과정 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM 학습·정렬을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Fine-tuning", "SFT", "LoRA", "Alignment"],
    keyPoints: ["RLHF Concept", "RLHF 개념", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["RLHF Concept은 전체 LLM 학습·정렬 흐름에서 어디에 위치하는가?", "RLHF Concept의 입력과 출력은 무엇인가?", "RLHF 개념가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "15.12": {
    summary: "Reward Model(Reward Model)은 LLM 학습·정렬에서 중요한 개념입니다. 사전학습 모델을 목적과 선호에 맞게 조정하는 과정 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM 학습·정렬을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Fine-tuning", "SFT", "LoRA", "Alignment"],
    keyPoints: ["Reward Model", "Reward Model", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Reward Model은 전체 LLM 학습·정렬 흐름에서 어디에 위치하는가?", "Reward Model의 입력과 출력은 무엇인가?", "Reward Model가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "15.13": {
    summary: "DPO Concept(DPO 개념)은 LLM 학습·정렬에서 중요한 개념입니다. 사전학습 모델을 목적과 선호에 맞게 조정하는 과정 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM 학습·정렬을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Fine-tuning", "SFT", "LoRA", "Alignment"],
    keyPoints: ["DPO Concept", "DPO 개념", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["DPO Concept은 전체 LLM 학습·정렬 흐름에서 어디에 위치하는가?", "DPO Concept의 입력과 출력은 무엇인가?", "DPO 개념가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "15.14": {
    summary: "Alignment(Alignment)은 LLM 학습·정렬에서 중요한 개념입니다. 사전학습 모델을 목적과 선호에 맞게 조정하는 과정 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM 학습·정렬을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Fine-tuning", "SFT", "LoRA", "Alignment"],
    keyPoints: ["Alignment", "Alignment", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Alignment은 전체 LLM 학습·정렬 흐름에서 어디에 위치하는가?", "Alignment의 입력과 출력은 무엇인가?", "Alignment가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "15.15": {
    summary: "Catastrophic Forgetting(파국적 망각)은 LLM 학습·정렬에서 중요한 개념입니다. 사전학습 모델을 목적과 선호에 맞게 조정하는 과정 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM 학습·정렬을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Fine-tuning", "SFT", "LoRA", "Alignment"],
    keyPoints: ["Catastrophic Forgetting", "파국적 망각", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Catastrophic Forgetting은 전체 LLM 학습·정렬 흐름에서 어디에 위치하는가?", "Catastrophic Forgetting의 입력과 출력은 무엇인가?", "파국적 망각가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "15.16": {
    summary: "Evaluation after Fine-tuning(파인튜닝 후 평가)은 LLM 학습·정렬에서 중요한 개념입니다. 사전학습 모델을 목적과 선호에 맞게 조정하는 과정 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "LLM 학습·정렬을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Fine-tuning", "SFT", "LoRA", "Alignment"],
    keyPoints: ["Evaluation after Fine-tuning", "파인튜닝 후 평가", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Evaluation after Fine-tuning은 전체 LLM 학습·정렬 흐름에서 어디에 위치하는가?", "Evaluation after Fine-tuning의 입력과 출력은 무엇인가?", "파인튜닝 후 평가가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "llm"
  },
  "16.01": {
    summary: "What is an Embedding?(임베딩이란?)은 임베딩·벡터 검색에서 중요한 개념입니다. 의미를 벡터 공간에 표현하고 가까운 정보를 검색하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "임베딩·벡터 검색을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Semantic Search", "RAG", "추천", "검색"],
    keyPoints: ["What is an Embedding?", "임베딩이란?", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["What is an Embedding?은 전체 임베딩·벡터 검색 흐름에서 어디에 위치하는가?", "What is an Embedding?의 입력과 출력은 무엇인가?", "임베딩이란?가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "16.02": {
    summary: "Embedding Space(임베딩 공간)은 임베딩·벡터 검색에서 중요한 개념입니다. 의미를 벡터 공간에 표현하고 가까운 정보를 검색하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "임베딩·벡터 검색을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Semantic Search", "RAG", "추천", "검색"],
    keyPoints: ["Embedding Space", "임베딩 공간", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Embedding Space은 전체 임베딩·벡터 검색 흐름에서 어디에 위치하는가?", "Embedding Space의 입력과 출력은 무엇인가?", "임베딩 공간가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "16.03": {
    summary: "Dense vs Sparse Vector(Dense·Sparse 벡터)은 임베딩·벡터 검색에서 중요한 개념입니다. 의미를 벡터 공간에 표현하고 가까운 정보를 검색하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "임베딩·벡터 검색을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Semantic Search", "RAG", "추천", "검색"],
    keyPoints: ["Dense vs Sparse Vector", "Dense·Sparse 벡터", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Dense vs Sparse Vector은 전체 임베딩·벡터 검색 흐름에서 어디에 위치하는가?", "Dense vs Sparse Vector의 입력과 출력은 무엇인가?", "Dense·Sparse 벡터가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "16.04": {
    summary: "Semantic Similarity(의미 유사도)은 임베딩·벡터 검색에서 중요한 개념입니다. 의미를 벡터 공간에 표현하고 가까운 정보를 검색하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "임베딩·벡터 검색을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Semantic Search", "RAG", "추천", "검색"],
    keyPoints: ["Semantic Similarity", "의미 유사도", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Semantic Similarity은 전체 임베딩·벡터 검색 흐름에서 어디에 위치하는가?", "Semantic Similarity의 입력과 출력은 무엇인가?", "의미 유사도가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "16.05": {
    summary: "Cosine Similarity(코사인 유사도)은 임베딩·벡터 검색에서 중요한 개념입니다. 의미를 벡터 공간에 표현하고 가까운 정보를 검색하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "임베딩·벡터 검색을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Semantic Search", "RAG", "추천", "검색"],
    keyPoints: ["Cosine Similarity", "코사인 유사도", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Cosine Similarity은 전체 임베딩·벡터 검색 흐름에서 어디에 위치하는가?", "Cosine Similarity의 입력과 출력은 무엇인가?", "코사인 유사도가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "16.06": {
    summary: "Dot Product Similarity(내적 유사도)은 임베딩·벡터 검색에서 중요한 개념입니다. 의미를 벡터 공간에 표현하고 가까운 정보를 검색하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "임베딩·벡터 검색을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Semantic Search", "RAG", "추천", "검색"],
    keyPoints: ["Dot Product Similarity", "내적 유사도", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Dot Product Similarity은 전체 임베딩·벡터 검색 흐름에서 어디에 위치하는가?", "Dot Product Similarity의 입력과 출력은 무엇인가?", "내적 유사도가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "16.07": {
    summary: "Euclidean Distance(유클리드 거리)은 임베딩·벡터 검색에서 중요한 개념입니다. 의미를 벡터 공간에 표현하고 가까운 정보를 검색하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "임베딩·벡터 검색을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Semantic Search", "RAG", "추천", "검색"],
    keyPoints: ["Euclidean Distance", "유클리드 거리", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Euclidean Distance은 전체 임베딩·벡터 검색 흐름에서 어디에 위치하는가?", "Euclidean Distance의 입력과 출력은 무엇인가?", "유클리드 거리가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "16.08": {
    summary: "Embedding Model(임베딩 모델)은 임베딩·벡터 검색에서 중요한 개념입니다. 의미를 벡터 공간에 표현하고 가까운 정보를 검색하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "임베딩·벡터 검색을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Semantic Search", "RAG", "추천", "검색"],
    keyPoints: ["Embedding Model", "임베딩 모델", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Embedding Model은 전체 임베딩·벡터 검색 흐름에서 어디에 위치하는가?", "Embedding Model의 입력과 출력은 무엇인가?", "임베딩 모델가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "16.09": {
    summary: "Vector Index(벡터 인덱스)은 임베딩·벡터 검색에서 중요한 개념입니다. 의미를 벡터 공간에 표현하고 가까운 정보를 검색하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "임베딩·벡터 검색을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Semantic Search", "RAG", "추천", "검색"],
    keyPoints: ["Vector Index", "벡터 인덱스", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Vector Index은 전체 임베딩·벡터 검색 흐름에서 어디에 위치하는가?", "Vector Index의 입력과 출력은 무엇인가?", "벡터 인덱스가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "16.10": {
    summary: "Exact vs Approximate Search(정확 검색과 근사 검색)은 임베딩·벡터 검색에서 중요한 개념입니다. 의미를 벡터 공간에 표현하고 가까운 정보를 검색하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "임베딩·벡터 검색을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Semantic Search", "RAG", "추천", "검색"],
    keyPoints: ["Exact vs Approximate Search", "정확 검색과 근사 검색", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Exact vs Approximate Search은 전체 임베딩·벡터 검색 흐름에서 어디에 위치하는가?", "Exact vs Approximate Search의 입력과 출력은 무엇인가?", "정확 검색과 근사 검색가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "16.11": {
    summary: "ANN(Approximate Nearest Neighbor)은 임베딩·벡터 검색에서 중요한 개념입니다. 의미를 벡터 공간에 표현하고 가까운 정보를 검색하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "임베딩·벡터 검색을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Semantic Search", "RAG", "추천", "검색"],
    keyPoints: ["ANN", "Approximate Nearest Neighbor", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["ANN은 전체 임베딩·벡터 검색 흐름에서 어디에 위치하는가?", "ANN의 입력과 출력은 무엇인가?", "Approximate Nearest Neighbor가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "16.12": {
    summary: "HNSW Concept(HNSW 개념)은 임베딩·벡터 검색에서 중요한 개념입니다. 의미를 벡터 공간에 표현하고 가까운 정보를 검색하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "임베딩·벡터 검색을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Semantic Search", "RAG", "추천", "검색"],
    keyPoints: ["HNSW Concept", "HNSW 개념", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["HNSW Concept은 전체 임베딩·벡터 검색 흐름에서 어디에 위치하는가?", "HNSW Concept의 입력과 출력은 무엇인가?", "HNSW 개념가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "16.13": {
    summary: "Vector Database(벡터 데이터베이스)은 임베딩·벡터 검색에서 중요한 개념입니다. 의미를 벡터 공간에 표현하고 가까운 정보를 검색하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "임베딩·벡터 검색을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Semantic Search", "RAG", "추천", "검색"],
    keyPoints: ["Vector Database", "벡터 데이터베이스", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Vector Database은 전체 임베딩·벡터 검색 흐름에서 어디에 위치하는가?", "Vector Database의 입력과 출력은 무엇인가?", "벡터 데이터베이스가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "16.14": {
    summary: "Metadata Filtering(메타데이터 필터링)은 임베딩·벡터 검색에서 중요한 개념입니다. 의미를 벡터 공간에 표현하고 가까운 정보를 검색하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "임베딩·벡터 검색을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Semantic Search", "RAG", "추천", "검색"],
    keyPoints: ["Metadata Filtering", "메타데이터 필터링", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Metadata Filtering은 전체 임베딩·벡터 검색 흐름에서 어디에 위치하는가?", "Metadata Filtering의 입력과 출력은 무엇인가?", "메타데이터 필터링가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "16.15": {
    summary: "Semantic Search(시맨틱 검색)은 임베딩·벡터 검색에서 중요한 개념입니다. 의미를 벡터 공간에 표현하고 가까운 정보를 검색하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "임베딩·벡터 검색을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Semantic Search", "RAG", "추천", "검색"],
    keyPoints: ["Semantic Search", "시맨틱 검색", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Semantic Search은 전체 임베딩·벡터 검색 흐름에서 어디에 위치하는가?", "Semantic Search의 입력과 출력은 무엇인가?", "시맨틱 검색가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
  "16.16": {
    summary: "Hybrid Search(하이브리드 검색)은 임베딩·벡터 검색에서 중요한 개념입니다. 의미를 벡터 공간에 표현하고 가까운 정보를 검색하는 원리 안에서 이 개념이 어떤 입력을 받고 어떤 결과를 만드는지 연결해 이해합니다.",
    why: "임베딩·벡터 검색을 용어 암기가 아니라 실제 데이터 흐름으로 이해하기 위해 필요합니다. 앞선 Token·Transformer 개념과 이후 RAG·Agent 시스템을 연결하는 기반이 됩니다.",
    usedFor: ["Semantic Search", "RAG", "추천", "검색"],
    keyPoints: ["Hybrid Search", "하이브리드 검색", "입력 → 변환 → 출력", "앞뒤 Topic과의 연결"],
    questions: ["Hybrid Search은 전체 임베딩·벡터 검색 흐름에서 어디에 위치하는가?", "Hybrid Search의 입력과 출력은 무엇인가?", "하이브리드 검색가 실제 AI 시스템에서 사용되는 예를 설명할 수 있는가?"],
    visualType: "generic"
  },
});
// v0.0.13 CONTENT END

// v0.0.14 — RAG / Prompt & Context Engineering / AI Agent explicit learning content
Object.assign(topicContent, {
  "17.01": {"summary": "Why RAG?(왜 RAG인가?)은 RAG 파이프라인에서 중요한 개념입니다. 외부 문서를 검색해 LLM의 Context에 근거를 공급하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "왜 RAG인가?을 단독 용어로 외우지 않고 실제 RAG 파이프라인 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["검색 증강 생성", "Enterprise Search", "Knowledge QA", "근거 기반 답변"], "keyPoints": ["Why RAG?", "왜 RAG인가?", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Why RAG?은 전체 RAG 파이프라인 흐름의 어느 위치에 있는가?", "왜 RAG인가? 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "17.02": {"summary": "RAG Architecture(RAG 전체 구조)은 RAG 파이프라인에서 중요한 개념입니다. 외부 문서를 검색해 LLM의 Context에 근거를 공급하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "RAG 전체 구조을 단독 용어로 외우지 않고 실제 RAG 파이프라인 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["검색 증강 생성", "Enterprise Search", "Knowledge QA", "근거 기반 답변"], "keyPoints": ["RAG Architecture", "RAG 전체 구조", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["RAG Architecture은 전체 RAG 파이프라인 흐름의 어느 위치에 있는가?", "RAG 전체 구조 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "17.03": {"summary": "Document Loading(문서 로딩)은 RAG 파이프라인에서 중요한 개념입니다. 외부 문서를 검색해 LLM의 Context에 근거를 공급하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "문서 로딩을 단독 용어로 외우지 않고 실제 RAG 파이프라인 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["검색 증강 생성", "Enterprise Search", "Knowledge QA", "근거 기반 답변"], "keyPoints": ["Document Loading", "문서 로딩", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Document Loading은 전체 RAG 파이프라인 흐름의 어느 위치에 있는가?", "문서 로딩 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "17.04": {"summary": "Parsing & Cleaning(파싱과 정제)은 RAG 파이프라인에서 중요한 개념입니다. 외부 문서를 검색해 LLM의 Context에 근거를 공급하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "파싱과 정제을 단독 용어로 외우지 않고 실제 RAG 파이프라인 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["검색 증강 생성", "Enterprise Search", "Knowledge QA", "근거 기반 답변"], "keyPoints": ["Parsing & Cleaning", "파싱과 정제", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Parsing & Cleaning은 전체 RAG 파이프라인 흐름의 어느 위치에 있는가?", "파싱과 정제 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "17.05": {"summary": "Chunking(청킹)은 RAG 파이프라인에서 중요한 개념입니다. 외부 문서를 검색해 LLM의 Context에 근거를 공급하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "청킹을 단독 용어로 외우지 않고 실제 RAG 파이프라인 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["검색 증강 생성", "Enterprise Search", "Knowledge QA", "근거 기반 답변"], "keyPoints": ["Document → Chunk 1 / Chunk 2 / Chunk 3", "문맥 보존과 검색 정밀도의 균형", "문서 경계를 고려한 분할"], "questions": ["Chunking은 전체 RAG 파이프라인 흐름의 어느 위치에 있는가?", "청킹 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "17.06": {"summary": "Chunk Size & Overlap(Chunk 크기와 Overlap)은 RAG 파이프라인에서 중요한 개념입니다. 외부 문서를 검색해 LLM의 Context에 근거를 공급하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "Chunk 크기와 Overlap을 단독 용어로 외우지 않고 실제 RAG 파이프라인 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["검색 증강 생성", "Enterprise Search", "Knowledge QA", "근거 기반 답변"], "keyPoints": ["Chunk Size", "Overlap", "Recall ↔ Precision Trade-off"], "questions": ["Chunk Size & Overlap은 전체 RAG 파이프라인 흐름의 어느 위치에 있는가?", "Chunk 크기와 Overlap 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "17.07": {"summary": "Embedding Documents(문서 임베딩)은 RAG 파이프라인에서 중요한 개념입니다. 외부 문서를 검색해 LLM의 Context에 근거를 공급하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "문서 임베딩을 단독 용어로 외우지 않고 실제 RAG 파이프라인 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["검색 증강 생성", "Enterprise Search", "Knowledge QA", "근거 기반 답변"], "keyPoints": ["Embedding Documents", "문서 임베딩", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Embedding Documents은 전체 RAG 파이프라인 흐름의 어느 위치에 있는가?", "문서 임베딩 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "17.08": {"summary": "Indexing(인덱싱)은 RAG 파이프라인에서 중요한 개념입니다. 외부 문서를 검색해 LLM의 Context에 근거를 공급하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "인덱싱을 단독 용어로 외우지 않고 실제 RAG 파이프라인 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["검색 증강 생성", "Enterprise Search", "Knowledge QA", "근거 기반 답변"], "keyPoints": ["Indexing", "인덱싱", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Indexing은 전체 RAG 파이프라인 흐름의 어느 위치에 있는가?", "인덱싱 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "17.09": {"summary": "Query Embedding(질의 임베딩)은 RAG 파이프라인에서 중요한 개념입니다. 외부 문서를 검색해 LLM의 Context에 근거를 공급하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "질의 임베딩을 단독 용어로 외우지 않고 실제 RAG 파이프라인 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["검색 증강 생성", "Enterprise Search", "Knowledge QA", "근거 기반 답변"], "keyPoints": ["Query Embedding", "질의 임베딩", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Query Embedding은 전체 RAG 파이프라인 흐름의 어느 위치에 있는가?", "질의 임베딩 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "17.10": {"summary": "Retrieval(검색)은 RAG 파이프라인에서 중요한 개념입니다. 외부 문서를 검색해 LLM의 Context에 근거를 공급하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "검색을 단독 용어로 외우지 않고 실제 RAG 파이프라인 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["검색 증강 생성", "Enterprise Search", "Knowledge QA", "근거 기반 답변"], "keyPoints": ["Query → Candidate Documents", "Similarity Search", "검색 결과가 생성 품질의 상한을 결정"], "questions": ["Retrieval은 전체 RAG 파이프라인 흐름의 어느 위치에 있는가?", "검색 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "17.11": {"summary": "Top-K Retrieval(Top-K 검색)은 RAG 파이프라인에서 중요한 개념입니다. 외부 문서를 검색해 LLM의 Context에 근거를 공급하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "Top-K 검색을 단독 용어로 외우지 않고 실제 RAG 파이프라인 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["검색 증강 생성", "Enterprise Search", "Knowledge QA", "근거 기반 답변"], "keyPoints": ["Top-K Retrieval", "Top-K 검색", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Top-K Retrieval은 전체 RAG 파이프라인 흐름의 어느 위치에 있는가?", "Top-K 검색 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "17.12": {"summary": "Reranking(재랭킹)은 RAG 파이프라인에서 중요한 개념입니다. 외부 문서를 검색해 LLM의 Context에 근거를 공급하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "재랭킹을 단독 용어로 외우지 않고 실제 RAG 파이프라인 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["검색 증강 생성", "Enterprise Search", "Knowledge QA", "근거 기반 답변"], "keyPoints": ["Retriever 후보 → Reranker → 재정렬", "Cross-encoder / scoring", "Top 후보의 관련성 개선"], "questions": ["Reranking은 전체 RAG 파이프라인 흐름의 어느 위치에 있는가?", "재랭킹 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "17.13": {"summary": "Prompt Augmentation(프롬프트 증강)은 RAG 파이프라인에서 중요한 개념입니다. 외부 문서를 검색해 LLM의 Context에 근거를 공급하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "프롬프트 증강을 단독 용어로 외우지 않고 실제 RAG 파이프라인 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["검색 증강 생성", "Enterprise Search", "Knowledge QA", "근거 기반 답변"], "keyPoints": ["Prompt Augmentation", "프롬프트 증강", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Prompt Augmentation은 전체 RAG 파이프라인 흐름의 어느 위치에 있는가?", "프롬프트 증강 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "17.14": {"summary": "Grounded Generation(근거 기반 생성)은 RAG 파이프라인에서 중요한 개념입니다. 외부 문서를 검색해 LLM의 Context에 근거를 공급하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "근거 기반 생성을 단독 용어로 외우지 않고 실제 RAG 파이프라인 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["검색 증강 생성", "Enterprise Search", "Knowledge QA", "근거 기반 답변"], "keyPoints": ["Retrieved Context", "Answer", "Grounding / Hallucination 감소"], "questions": ["Grounded Generation은 전체 RAG 파이프라인 흐름의 어느 위치에 있는가?", "근거 기반 생성 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "17.15": {"summary": "Citations & Sources(출처와 인용)은 RAG 파이프라인에서 중요한 개념입니다. 외부 문서를 검색해 LLM의 Context에 근거를 공급하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "출처와 인용을 단독 용어로 외우지 않고 실제 RAG 파이프라인 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["검색 증강 생성", "Enterprise Search", "Knowledge QA", "근거 기반 답변"], "keyPoints": ["Citations & Sources", "출처와 인용", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Citations & Sources은 전체 RAG 파이프라인 흐름의 어느 위치에 있는가?", "출처와 인용 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "17.16": {"summary": "Hybrid RAG(Hybrid RAG)은 RAG 파이프라인에서 중요한 개념입니다. 외부 문서를 검색해 LLM의 Context에 근거를 공급하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "Hybrid RAG을 단독 용어로 외우지 않고 실제 RAG 파이프라인 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["검색 증강 생성", "Enterprise Search", "Knowledge QA", "근거 기반 답변"], "keyPoints": ["Hybrid RAG", "Hybrid RAG", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Hybrid RAG은 전체 RAG 파이프라인 흐름의 어느 위치에 있는가?", "Hybrid RAG 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "17.17": {"summary": "Query Rewriting(Query Rewriting)은 RAG 파이프라인에서 중요한 개념입니다. 외부 문서를 검색해 LLM의 Context에 근거를 공급하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "Query Rewriting을 단독 용어로 외우지 않고 실제 RAG 파이프라인 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["검색 증강 생성", "Enterprise Search", "Knowledge QA", "근거 기반 답변"], "keyPoints": ["Query Rewriting", "Query Rewriting", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Query Rewriting은 전체 RAG 파이프라인 흐름의 어느 위치에 있는가?", "Query Rewriting 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "17.18": {"summary": "Multi-query Retrieval(Multi-query 검색)은 RAG 파이프라인에서 중요한 개념입니다. 외부 문서를 검색해 LLM의 Context에 근거를 공급하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "Multi-query 검색을 단독 용어로 외우지 않고 실제 RAG 파이프라인 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["검색 증강 생성", "Enterprise Search", "Knowledge QA", "근거 기반 답변"], "keyPoints": ["Multi-query Retrieval", "Multi-query 검색", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Multi-query Retrieval은 전체 RAG 파이프라인 흐름의 어느 위치에 있는가?", "Multi-query 검색 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "17.19": {"summary": "RAG Evaluation(RAG 평가)은 RAG 파이프라인에서 중요한 개념입니다. 외부 문서를 검색해 LLM의 Context에 근거를 공급하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "RAG 평가을 단독 용어로 외우지 않고 실제 RAG 파이프라인 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["검색 증강 생성", "Enterprise Search", "Knowledge QA", "근거 기반 답변"], "keyPoints": ["Retrieval Quality", "Faithfulness", "Answer Relevance"], "questions": ["RAG Evaluation은 전체 RAG 파이프라인 흐름의 어느 위치에 있는가?", "RAG 평가 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "17.20": {"summary": "Retrieval Failure Modes(검색 실패 유형)은 RAG 파이프라인에서 중요한 개념입니다. 외부 문서를 검색해 LLM의 Context에 근거를 공급하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "검색 실패 유형을 단독 용어로 외우지 않고 실제 RAG 파이프라인 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["검색 증강 생성", "Enterprise Search", "Knowledge QA", "근거 기반 답변"], "keyPoints": ["Retrieval Failure Modes", "검색 실패 유형", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Retrieval Failure Modes은 전체 RAG 파이프라인 흐름의 어느 위치에 있는가?", "검색 실패 유형 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "18.01": {"summary": "What is a Prompt?(프롬프트란?)은 Prompt & Context Engineering에서 중요한 개념입니다. LLM이 실제로 받는 입력을 목적에 맞게 설계하고 제한된 Context를 관리하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "프롬프트란?을 단독 용어로 외우지 않고 실제 Prompt & Context Engineering 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["LLM Application", "구조화 출력", "RAG Prompt", "Agent Instruction"], "keyPoints": ["What is a Prompt?", "프롬프트란?", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["What is a Prompt?은 전체 Prompt & Context Engineering 흐름의 어느 위치에 있는가?", "프롬프트란? 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "18.02": {"summary": "System / User / Assistant Roles(메시지 역할)은 Prompt & Context Engineering에서 중요한 개념입니다. LLM이 실제로 받는 입력을 목적에 맞게 설계하고 제한된 Context를 관리하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "메시지 역할을 단독 용어로 외우지 않고 실제 Prompt & Context Engineering 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["LLM Application", "구조화 출력", "RAG Prompt", "Agent Instruction"], "keyPoints": ["System", "User", "Assistant"], "questions": ["System / User / Assistant Roles은 전체 Prompt & Context Engineering 흐름의 어느 위치에 있는가?", "메시지 역할 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "18.03": {"summary": "Instruction Hierarchy Concept(지시 계층 개념)은 Prompt & Context Engineering에서 중요한 개념입니다. LLM이 실제로 받는 입력을 목적에 맞게 설계하고 제한된 Context를 관리하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "지시 계층 개념을 단독 용어로 외우지 않고 실제 Prompt & Context Engineering 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["LLM Application", "구조화 출력", "RAG Prompt", "Agent Instruction"], "keyPoints": ["상위 지시", "사용자 요청", "외부 콘텐츠는 데이터로 취급"], "questions": ["Instruction Hierarchy Concept은 전체 Prompt & Context Engineering 흐름의 어느 위치에 있는가?", "지시 계층 개념 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "18.04": {"summary": "Zero-shot Prompting(Zero-shot)은 Prompt & Context Engineering에서 중요한 개념입니다. LLM이 실제로 받는 입력을 목적에 맞게 설계하고 제한된 Context를 관리하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "Zero-shot을 단독 용어로 외우지 않고 실제 Prompt & Context Engineering 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["LLM Application", "구조화 출력", "RAG Prompt", "Agent Instruction"], "keyPoints": ["Zero-shot Prompting", "Zero-shot", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Zero-shot Prompting은 전체 Prompt & Context Engineering 흐름의 어느 위치에 있는가?", "Zero-shot 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "18.05": {"summary": "Few-shot Prompting(Few-shot)은 Prompt & Context Engineering에서 중요한 개념입니다. LLM이 실제로 받는 입력을 목적에 맞게 설계하고 제한된 Context를 관리하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "Few-shot을 단독 용어로 외우지 않고 실제 Prompt & Context Engineering 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["LLM Application", "구조화 출력", "RAG Prompt", "Agent Instruction"], "keyPoints": ["Few-shot Prompting", "Few-shot", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Few-shot Prompting은 전체 Prompt & Context Engineering 흐름의 어느 위치에 있는가?", "Few-shot 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "18.06": {"summary": "Prompt Templates(프롬프트 템플릿)은 Prompt & Context Engineering에서 중요한 개념입니다. LLM이 실제로 받는 입력을 목적에 맞게 설계하고 제한된 Context를 관리하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "프롬프트 템플릿을 단독 용어로 외우지 않고 실제 Prompt & Context Engineering 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["LLM Application", "구조화 출력", "RAG Prompt", "Agent Instruction"], "keyPoints": ["Prompt Templates", "프롬프트 템플릿", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Prompt Templates은 전체 Prompt & Context Engineering 흐름의 어느 위치에 있는가?", "프롬프트 템플릿 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "18.07": {"summary": "Structured Output(구조화 출력)은 Prompt & Context Engineering에서 중요한 개념입니다. LLM이 실제로 받는 입력을 목적에 맞게 설계하고 제한된 Context를 관리하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "구조화 출력을 단독 용어로 외우지 않고 실제 Prompt & Context Engineering 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["LLM Application", "구조화 출력", "RAG Prompt", "Agent Instruction"], "keyPoints": ["Schema", "JSON / typed fields", "Validation"], "questions": ["Structured Output은 전체 Prompt & Context Engineering 흐름의 어느 위치에 있는가?", "구조화 출력 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "18.08": {"summary": "Reasoning Prompt Patterns(추론 프롬프트 패턴)은 Prompt & Context Engineering에서 중요한 개념입니다. LLM이 실제로 받는 입력을 목적에 맞게 설계하고 제한된 Context를 관리하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "추론 프롬프트 패턴을 단독 용어로 외우지 않고 실제 Prompt & Context Engineering 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["LLM Application", "구조화 출력", "RAG Prompt", "Agent Instruction"], "keyPoints": ["Reasoning Prompt Patterns", "추론 프롬프트 패턴", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Reasoning Prompt Patterns은 전체 Prompt & Context Engineering 흐름의 어느 위치에 있는가?", "추론 프롬프트 패턴 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "18.09": {"summary": "Context Window Management(컨텍스트 윈도우 관리)은 Prompt & Context Engineering에서 중요한 개념입니다. LLM이 실제로 받는 입력을 목적에 맞게 설계하고 제한된 Context를 관리하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "컨텍스트 윈도우 관리을 단독 용어로 외우지 않고 실제 Prompt & Context Engineering 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["LLM Application", "구조화 출력", "RAG Prompt", "Agent Instruction"], "keyPoints": ["Token Budget", "Instruction + History + Retrieved Context", "잘라낼 정보의 우선순위"], "questions": ["Context Window Management은 전체 Prompt & Context Engineering 흐름의 어느 위치에 있는가?", "컨텍스트 윈도우 관리 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "18.10": {"summary": "Context Engineering(컨텍스트 엔지니어링)은 Prompt & Context Engineering에서 중요한 개념입니다. LLM이 실제로 받는 입력을 목적에 맞게 설계하고 제한된 Context를 관리하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "컨텍스트 엔지니어링을 단독 용어로 외우지 않고 실제 Prompt & Context Engineering 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["LLM Application", "구조화 출력", "RAG Prompt", "Agent Instruction"], "keyPoints": ["Instructions", "Retrieved Knowledge", "Tools", "Memory / State"], "questions": ["Context Engineering은 전체 Prompt & Context Engineering 흐름의 어느 위치에 있는가?", "컨텍스트 엔지니어링 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "18.11": {"summary": "Long Context Trade-offs(Long Context 트레이드오프)은 Prompt & Context Engineering에서 중요한 개념입니다. LLM이 실제로 받는 입력을 목적에 맞게 설계하고 제한된 Context를 관리하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "Long Context 트레이드오프을 단독 용어로 외우지 않고 실제 Prompt & Context Engineering 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["LLM Application", "구조화 출력", "RAG Prompt", "Agent Instruction"], "keyPoints": ["Long Context Trade-offs", "Long Context 트레이드오프", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Long Context Trade-offs은 전체 Prompt & Context Engineering 흐름의 어느 위치에 있는가?", "Long Context 트레이드오프 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "18.12": {"summary": "Prompt Versioning(프롬프트 버전 관리)은 Prompt & Context Engineering에서 중요한 개념입니다. LLM이 실제로 받는 입력을 목적에 맞게 설계하고 제한된 Context를 관리하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "프롬프트 버전 관리을 단독 용어로 외우지 않고 실제 Prompt & Context Engineering 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["LLM Application", "구조화 출력", "RAG Prompt", "Agent Instruction"], "keyPoints": ["Prompt Versioning", "프롬프트 버전 관리", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Prompt Versioning은 전체 Prompt & Context Engineering 흐름의 어느 위치에 있는가?", "프롬프트 버전 관리 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "18.13": {"summary": "Prompt Evaluation(프롬프트 평가)은 Prompt & Context Engineering에서 중요한 개념입니다. LLM이 실제로 받는 입력을 목적에 맞게 설계하고 제한된 Context를 관리하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "프롬프트 평가을 단독 용어로 외우지 않고 실제 Prompt & Context Engineering 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["LLM Application", "구조화 출력", "RAG Prompt", "Agent Instruction"], "keyPoints": ["Prompt Evaluation", "프롬프트 평가", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Prompt Evaluation은 전체 Prompt & Context Engineering 흐름의 어느 위치에 있는가?", "프롬프트 평가 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "18.14": {"summary": "Prompt Injection Basics(Prompt Injection 기초)은 Prompt & Context Engineering에서 중요한 개념입니다. LLM이 실제로 받는 입력을 목적에 맞게 설계하고 제한된 Context를 관리하는 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "Prompt Injection 기초을 단독 용어로 외우지 않고 실제 Prompt & Context Engineering 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["LLM Application", "구조화 출력", "RAG Prompt", "Agent Instruction"], "keyPoints": ["Untrusted Input", "Instruction/Data 경계", "Prompt Injection 방어"], "questions": ["Prompt Injection Basics은 전체 Prompt & Context Engineering 흐름의 어느 위치에 있는가?", "Prompt Injection 기초 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "19.01": {"summary": "What is an AI Agent?(AI Agent란?)은 AI Agent에서 중요한 개념입니다. LLM이 상태를 유지하며 도구를 선택·호출하고 관찰 결과를 다음 행동에 반영하는 반복 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "AI Agent란?을 단독 용어로 외우지 않고 실제 AI Agent 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["Tool Calling", "업무 자동화", "Agentic RAG", "멀티스텝 작업"], "keyPoints": ["What is an AI Agent?", "AI Agent란?", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["What is an AI Agent?은 전체 AI Agent 흐름의 어느 위치에 있는가?", "AI Agent란? 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "19.02": {"summary": "Model + Tools + State(모델·도구·상태)은 AI Agent에서 중요한 개념입니다. LLM이 상태를 유지하며 도구를 선택·호출하고 관찰 결과를 다음 행동에 반영하는 반복 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "모델·도구·상태을 단독 용어로 외우지 않고 실제 AI Agent 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["Tool Calling", "업무 자동화", "Agentic RAG", "멀티스텝 작업"], "keyPoints": ["Model", "Tools", "State"], "questions": ["Model + Tools + State은 전체 AI Agent 흐름의 어느 위치에 있는가?", "모델·도구·상태 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "19.03": {"summary": "Function Calling(Function Calling)은 AI Agent에서 중요한 개념입니다. LLM이 상태를 유지하며 도구를 선택·호출하고 관찰 결과를 다음 행동에 반영하는 반복 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "Function Calling을 단독 용어로 외우지 않고 실제 AI Agent 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["Tool Calling", "업무 자동화", "Agentic RAG", "멀티스텝 작업"], "keyPoints": ["Tool Schema → Arguments", "Model selects call", "Application executes tool"], "questions": ["Function Calling은 전체 AI Agent 흐름의 어느 위치에 있는가?", "Function Calling 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "19.04": {"summary": "Tool Use(도구 사용)은 AI Agent에서 중요한 개념입니다. LLM이 상태를 유지하며 도구를 선택·호출하고 관찰 결과를 다음 행동에 반영하는 반복 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "도구 사용을 단독 용어로 외우지 않고 실제 AI Agent 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["Tool Calling", "업무 자동화", "Agentic RAG", "멀티스텝 작업"], "keyPoints": ["Tool Use", "도구 사용", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Tool Use은 전체 AI Agent 흐름의 어느 위치에 있는가?", "도구 사용 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "19.05": {"summary": "Tool Schema(도구 Schema)은 AI Agent에서 중요한 개념입니다. LLM이 상태를 유지하며 도구를 선택·호출하고 관찰 결과를 다음 행동에 반영하는 반복 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "도구 Schema을 단독 용어로 외우지 않고 실제 AI Agent 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["Tool Calling", "업무 자동화", "Agentic RAG", "멀티스텝 작업"], "keyPoints": ["Tool Schema", "도구 Schema", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Tool Schema은 전체 AI Agent 흐름의 어느 위치에 있는가?", "도구 Schema 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "19.06": {"summary": "Agent Loop(Agent Loop)은 AI Agent에서 중요한 개념입니다. LLM이 상태를 유지하며 도구를 선택·호출하고 관찰 결과를 다음 행동에 반영하는 반복 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "Agent Loop을 단독 용어로 외우지 않고 실제 AI Agent 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["Tool Calling", "업무 자동화", "Agentic RAG", "멀티스텝 작업"], "keyPoints": ["Observe → Decide → Act → Observe", "종료 조건", "반복 횟수 / 비용 제어"], "questions": ["Agent Loop은 전체 AI Agent 흐름의 어느 위치에 있는가?", "Agent Loop 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "19.07": {"summary": "Planning(계획)은 AI Agent에서 중요한 개념입니다. LLM이 상태를 유지하며 도구를 선택·호출하고 관찰 결과를 다음 행동에 반영하는 반복 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "계획을 단독 용어로 외우지 않고 실제 AI Agent 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["Tool Calling", "업무 자동화", "Agentic RAG", "멀티스텝 작업"], "keyPoints": ["Goal → Subtasks → Actions", "Plan 수정", "실행 결과 기반 재계획"], "questions": ["Planning은 전체 AI Agent 흐름의 어느 위치에 있는가?", "계획 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "19.08": {"summary": "State Management(상태 관리)은 AI Agent에서 중요한 개념입니다. LLM이 상태를 유지하며 도구를 선택·호출하고 관찰 결과를 다음 행동에 반영하는 반복 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "상태 관리을 단독 용어로 외우지 않고 실제 AI Agent 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["Tool Calling", "업무 자동화", "Agentic RAG", "멀티스텝 작업"], "keyPoints": ["State Management", "상태 관리", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["State Management은 전체 AI Agent 흐름의 어느 위치에 있는가?", "상태 관리 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "19.09": {"summary": "Short-term Memory(단기 메모리)은 AI Agent에서 중요한 개념입니다. LLM이 상태를 유지하며 도구를 선택·호출하고 관찰 결과를 다음 행동에 반영하는 반복 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "단기 메모리을 단독 용어로 외우지 않고 실제 AI Agent 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["Tool Calling", "업무 자동화", "Agentic RAG", "멀티스텝 작업"], "keyPoints": ["Short-term Memory", "단기 메모리", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Short-term Memory은 전체 AI Agent 흐름의 어느 위치에 있는가?", "단기 메모리 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "19.10": {"summary": "Long-term Memory(장기 메모리)은 AI Agent에서 중요한 개념입니다. LLM이 상태를 유지하며 도구를 선택·호출하고 관찰 결과를 다음 행동에 반영하는 반복 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "장기 메모리을 단독 용어로 외우지 않고 실제 AI Agent 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["Tool Calling", "업무 자동화", "Agentic RAG", "멀티스텝 작업"], "keyPoints": ["Long-term Memory", "장기 메모리", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Long-term Memory은 전체 AI Agent 흐름의 어느 위치에 있는가?", "장기 메모리 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "19.11": {"summary": "Workflow vs Agent(Workflow와 Agent)은 AI Agent에서 중요한 개념입니다. LLM이 상태를 유지하며 도구를 선택·호출하고 관찰 결과를 다음 행동에 반영하는 반복 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "Workflow와 Agent을 단독 용어로 외우지 않고 실제 AI Agent 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["Tool Calling", "업무 자동화", "Agentic RAG", "멀티스텝 작업"], "keyPoints": ["Workflow = 정해진 경로", "Agent = 런타임 의사결정", "예측 가능성 ↔ 유연성"], "questions": ["Workflow vs Agent은 전체 AI Agent 흐름의 어느 위치에 있는가?", "Workflow와 Agent 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "19.12": {"summary": "Human in the Loop(Human-in-the-loop)은 AI Agent에서 중요한 개념입니다. LLM이 상태를 유지하며 도구를 선택·호출하고 관찰 결과를 다음 행동에 반영하는 반복 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "Human-in-the-loop을 단독 용어로 외우지 않고 실제 AI Agent 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["Tool Calling", "업무 자동화", "Agentic RAG", "멀티스텝 작업"], "keyPoints": ["Approval Gate", "사람의 검토", "고위험 Action 통제"], "questions": ["Human in the Loop은 전체 AI Agent 흐름의 어느 위치에 있는가?", "Human-in-the-loop 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "19.13": {"summary": "Multi-Agent Concepts(Multi-Agent 개념)은 AI Agent에서 중요한 개념입니다. LLM이 상태를 유지하며 도구를 선택·호출하고 관찰 결과를 다음 행동에 반영하는 반복 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "Multi-Agent 개념을 단독 용어로 외우지 않고 실제 AI Agent 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["Tool Calling", "업무 자동화", "Agentic RAG", "멀티스텝 작업"], "keyPoints": ["Multi-Agent Concepts", "Multi-Agent 개념", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Multi-Agent Concepts은 전체 AI Agent 흐름의 어느 위치에 있는가?", "Multi-Agent 개념 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "19.14": {"summary": "Agentic RAG(Agentic RAG)은 AI Agent에서 중요한 개념입니다. LLM이 상태를 유지하며 도구를 선택·호출하고 관찰 결과를 다음 행동에 반영하는 반복 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "Agentic RAG을 단독 용어로 외우지 않고 실제 AI Agent 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["Tool Calling", "업무 자동화", "Agentic RAG", "멀티스텝 작업"], "keyPoints": ["Agent decides when/how to retrieve", "Query rewrite", "검색 결과를 보고 다음 행동 선택"], "questions": ["Agentic RAG은 전체 AI Agent 흐름의 어느 위치에 있는가?", "Agentic RAG 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "19.15": {"summary": "MCP Concepts(MCP 개념)은 AI Agent에서 중요한 개념입니다. LLM이 상태를 유지하며 도구를 선택·호출하고 관찰 결과를 다음 행동에 반영하는 반복 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "MCP 개념을 단독 용어로 외우지 않고 실제 AI Agent 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["Tool Calling", "업무 자동화", "Agentic RAG", "멀티스텝 작업"], "keyPoints": ["MCP Concepts", "MCP 개념", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["MCP Concepts은 전체 AI Agent 흐름의 어느 위치에 있는가?", "MCP 개념 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "19.16": {"summary": "Agent Evaluation(Agent 평가)은 AI Agent에서 중요한 개념입니다. LLM이 상태를 유지하며 도구를 선택·호출하고 관찰 결과를 다음 행동에 반영하는 반복 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "Agent 평가을 단독 용어로 외우지 않고 실제 AI Agent 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["Tool Calling", "업무 자동화", "Agentic RAG", "멀티스텝 작업"], "keyPoints": ["Agent Evaluation", "Agent 평가", "입력 → 처리 → 출력", "앞뒤 Topic과의 연결"], "questions": ["Agent Evaluation은 전체 AI Agent 흐름의 어느 위치에 있는가?", "Agent 평가 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
  "19.17": {"summary": "Tool Failure Handling(도구 실패 처리)은 AI Agent에서 중요한 개념입니다. LLM이 상태를 유지하며 도구를 선택·호출하고 관찰 결과를 다음 행동에 반영하는 반복 과정 안에서 이 단계가 받는 입력, 수행하는 처리, 다음 단계로 전달하는 결과를 연결해 이해합니다.", "why": "도구 실패 처리을 단독 용어로 외우지 않고 실제 AI Agent 시스템에서의 역할과 트레이드오프를 이해해야 설계·디버깅·평가 시 원인을 추적할 수 있습니다.", "usedFor": ["Tool Calling", "업무 자동화", "Agentic RAG", "멀티스텝 작업"], "keyPoints": ["Timeout", "Retry / Fallback", "Error observation → next decision"], "questions": ["Tool Failure Handling은 전체 AI Agent 흐름의 어느 위치에 있는가?", "도구 실패 처리 단계의 입력과 출력은 무엇인가?", "이 단계를 잘못 설계하면 어떤 품질 또는 운영 문제가 생기는가?"], "visualType": "generic"},
});
// v0.0.14 CONTENT END


// v0.0.16 — LLM Performance / MLOps & LLMOps / AI Security explicit learning content
Object.assign(topicContent, {
  "23.01": {"summary": "Inference Cost Anatomy(추론 비용 구조)은 LLM 추론 최적화에서 중요한 개념입니다. 요청이 들어온 뒤 GPU 메모리·연산·스케줄링이 Token 생성 속도와 비용으로 이어지는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "추론 비용 구조을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 메모리와 처리량, 지연시간 사이의 트레이드오프 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["LLM Serving", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Inference Cost Anatomy", "추론 비용 구조", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Inference Cost Anatomy은 전체 LLM 추론 최적화 흐름의 어디에 위치하는가?", "추론 비용 구조을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 추론 비용 구조을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "23.02": {"summary": "Prefill vs Decode(Prefill과 Decode)은 LLM 추론 최적화에서 중요한 개념입니다. 요청이 들어온 뒤 GPU 메모리·연산·스케줄링이 Token 생성 속도와 비용으로 이어지는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "Prefill과 Decode을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 메모리와 처리량, 지연시간 사이의 트레이드오프 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["LLM Serving", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Prefill vs Decode", "Prefill과 Decode", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Prefill vs Decode은 전체 LLM 추론 최적화 흐름의 어디에 위치하는가?", "Prefill과 Decode을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 Prefill과 Decode을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "23.03": {"summary": "KV Cache(KV Cache)은 LLM 추론 최적화에서 중요한 개념입니다. 요청이 들어온 뒤 GPU 메모리·연산·스케줄링이 Token 생성 속도와 비용으로 이어지는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "KV Cache을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 메모리와 처리량, 지연시간 사이의 트레이드오프 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["LLM Serving", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["KV Cache", "KV Cache", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["KV Cache은 전체 LLM 추론 최적화 흐름의 어디에 위치하는가?", "KV Cache을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 KV Cache을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "23.04": {"summary": "Token Throughput(Token Throughput)은 LLM 추론 최적화에서 중요한 개념입니다. 요청이 들어온 뒤 GPU 메모리·연산·스케줄링이 Token 생성 속도와 비용으로 이어지는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "Token Throughput을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 메모리와 처리량, 지연시간 사이의 트레이드오프 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["LLM Serving", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Token Throughput", "Token Throughput", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Token Throughput은 전체 LLM 추론 최적화 흐름의 어디에 위치하는가?", "Token Throughput을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 Token Throughput을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "23.05": {"summary": "Time to First Token(TTFT)은 LLM 추론 최적화에서 중요한 개념입니다. 요청이 들어온 뒤 GPU 메모리·연산·스케줄링이 Token 생성 속도와 비용으로 이어지는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "TTFT을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 메모리와 처리량, 지연시간 사이의 트레이드오프 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["LLM Serving", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Time to First Token", "TTFT", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Time to First Token은 전체 LLM 추론 최적화 흐름의 어디에 위치하는가?", "TTFT을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 TTFT을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "23.06": {"summary": "Tokens per Second(Tokens/sec)은 LLM 추론 최적화에서 중요한 개념입니다. 요청이 들어온 뒤 GPU 메모리·연산·스케줄링이 Token 생성 속도와 비용으로 이어지는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "Tokens/sec을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 메모리와 처리량, 지연시간 사이의 트레이드오프 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["LLM Serving", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Tokens per Second", "Tokens/sec", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Tokens per Second은 전체 LLM 추론 최적화 흐름의 어디에 위치하는가?", "Tokens/sec을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 Tokens/sec을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "23.07": {"summary": "Batching for LLMs(LLM Batching)은 LLM 추론 최적화에서 중요한 개념입니다. 요청이 들어온 뒤 GPU 메모리·연산·스케줄링이 Token 생성 속도와 비용으로 이어지는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "LLM Batching을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 메모리와 처리량, 지연시간 사이의 트레이드오프 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["LLM Serving", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Batching for LLMs", "LLM Batching", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Batching for LLMs은 전체 LLM 추론 최적화 흐름의 어디에 위치하는가?", "LLM Batching을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 LLM Batching을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "23.08": {"summary": "Continuous Batching(Continuous Batching)은 LLM 추론 최적화에서 중요한 개념입니다. 요청이 들어온 뒤 GPU 메모리·연산·스케줄링이 Token 생성 속도와 비용으로 이어지는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "Continuous Batching을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 메모리와 처리량, 지연시간 사이의 트레이드오프 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["LLM Serving", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Continuous Batching", "Continuous Batching", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Continuous Batching은 전체 LLM 추론 최적화 흐름의 어디에 위치하는가?", "Continuous Batching을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 Continuous Batching을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "23.09": {"summary": "Quantization(양자화)은 LLM 추론 최적화에서 중요한 개념입니다. 요청이 들어온 뒤 GPU 메모리·연산·스케줄링이 Token 생성 속도와 비용으로 이어지는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "양자화을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 메모리와 처리량, 지연시간 사이의 트레이드오프 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["LLM Serving", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Quantization", "양자화", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Quantization은 전체 LLM 추론 최적화 흐름의 어디에 위치하는가?", "양자화을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 양자화을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "23.10": {"summary": "FP32 / FP16 / BF16 / INT8(숫자 정밀도)은 LLM 추론 최적화에서 중요한 개념입니다. 요청이 들어온 뒤 GPU 메모리·연산·스케줄링이 Token 생성 속도와 비용으로 이어지는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "숫자 정밀도을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 메모리와 처리량, 지연시간 사이의 트레이드오프 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["LLM Serving", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["FP32 / FP16 / BF16 / INT8", "숫자 정밀도", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["FP32 / FP16 / BF16 / INT8은 전체 LLM 추론 최적화 흐름의 어디에 위치하는가?", "숫자 정밀도을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 숫자 정밀도을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "23.11": {"summary": "Model Parallelism(모델 병렬화)은 LLM 추론 최적화에서 중요한 개념입니다. 요청이 들어온 뒤 GPU 메모리·연산·스케줄링이 Token 생성 속도와 비용으로 이어지는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "모델 병렬화을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 메모리와 처리량, 지연시간 사이의 트레이드오프 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["LLM Serving", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Model Parallelism", "모델 병렬화", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Model Parallelism은 전체 LLM 추론 최적화 흐름의 어디에 위치하는가?", "모델 병렬화을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 모델 병렬화을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "23.12": {"summary": "Tensor Parallelism(Tensor Parallelism)은 LLM 추론 최적화에서 중요한 개념입니다. 요청이 들어온 뒤 GPU 메모리·연산·스케줄링이 Token 생성 속도와 비용으로 이어지는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "Tensor Parallelism을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 메모리와 처리량, 지연시간 사이의 트레이드오프 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["LLM Serving", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Tensor Parallelism", "Tensor Parallelism", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Tensor Parallelism은 전체 LLM 추론 최적화 흐름의 어디에 위치하는가?", "Tensor Parallelism을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 Tensor Parallelism을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "23.13": {"summary": "Pipeline Parallelism(Pipeline Parallelism)은 LLM 추론 최적화에서 중요한 개념입니다. 요청이 들어온 뒤 GPU 메모리·연산·스케줄링이 Token 생성 속도와 비용으로 이어지는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "Pipeline Parallelism을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 메모리와 처리량, 지연시간 사이의 트레이드오프 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["LLM Serving", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Pipeline Parallelism", "Pipeline Parallelism", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Pipeline Parallelism은 전체 LLM 추론 최적화 흐름의 어디에 위치하는가?", "Pipeline Parallelism을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 Pipeline Parallelism을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "23.14": {"summary": "Speculative Decoding(Speculative Decoding)은 LLM 추론 최적화에서 중요한 개념입니다. 요청이 들어온 뒤 GPU 메모리·연산·스케줄링이 Token 생성 속도와 비용으로 이어지는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "Speculative Decoding을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 메모리와 처리량, 지연시간 사이의 트레이드오프 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["LLM Serving", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Speculative Decoding", "Speculative Decoding", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Speculative Decoding은 전체 LLM 추론 최적화 흐름의 어디에 위치하는가?", "Speculative Decoding을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 Speculative Decoding을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "23.15": {"summary": "Memory vs Latency Trade-off(메모리·Latency 트레이드오프)은 LLM 추론 최적화에서 중요한 개념입니다. 요청이 들어온 뒤 GPU 메모리·연산·스케줄링이 Token 생성 속도와 비용으로 이어지는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "메모리·Latency 트레이드오프을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 메모리와 처리량, 지연시간 사이의 트레이드오프 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["LLM Serving", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Memory vs Latency Trade-off", "메모리·Latency 트레이드오프", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Memory vs Latency Trade-off은 전체 LLM 추론 최적화 흐름의 어디에 위치하는가?", "메모리·Latency 트레이드오프을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 메모리·Latency 트레이드오프을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "23.16": {"summary": "Cost Optimization(비용 최적화)은 LLM 추론 최적화에서 중요한 개념입니다. 요청이 들어온 뒤 GPU 메모리·연산·스케줄링이 Token 생성 속도와 비용으로 이어지는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "비용 최적화을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 메모리와 처리량, 지연시간 사이의 트레이드오프 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["LLM Serving", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Cost Optimization", "비용 최적화", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Cost Optimization은 전체 LLM 추론 최적화 흐름의 어디에 위치하는가?", "비용 최적화을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 비용 최적화을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "24.01": {"summary": "ML Lifecycle(ML 생명주기)은 MLOps/LLMOps에서 중요한 개념입니다. 데이터·실험·모델·프롬프트·평가·배포·모니터링을 버전과 증거가 남는 반복 가능한 운영 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "ML 생명주기을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 재현성, 안전한 배포, 관측 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["AI 운영 자동화", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["ML Lifecycle", "ML 생명주기", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["ML Lifecycle은 전체 MLOps/LLMOps 흐름의 어디에 위치하는가?", "ML 생명주기을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 ML 생명주기을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "24.02": {"summary": "Experiment Tracking(실험 추적)은 MLOps/LLMOps에서 중요한 개념입니다. 데이터·실험·모델·프롬프트·평가·배포·모니터링을 버전과 증거가 남는 반복 가능한 운영 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "실험 추적을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 재현성, 안전한 배포, 관측 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["AI 운영 자동화", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Experiment Tracking", "실험 추적", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Experiment Tracking은 전체 MLOps/LLMOps 흐름의 어디에 위치하는가?", "실험 추적을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 실험 추적을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "24.03": {"summary": "Dataset Versioning(데이터셋 버전 관리)은 MLOps/LLMOps에서 중요한 개념입니다. 데이터·실험·모델·프롬프트·평가·배포·모니터링을 버전과 증거가 남는 반복 가능한 운영 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "데이터셋 버전 관리을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 재현성, 안전한 배포, 관측 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["AI 운영 자동화", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Dataset Versioning", "데이터셋 버전 관리", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Dataset Versioning은 전체 MLOps/LLMOps 흐름의 어디에 위치하는가?", "데이터셋 버전 관리을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 데이터셋 버전 관리을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "24.04": {"summary": "Feature Store Concept(Feature Store 개념)은 MLOps/LLMOps에서 중요한 개념입니다. 데이터·실험·모델·프롬프트·평가·배포·모니터링을 버전과 증거가 남는 반복 가능한 운영 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "Feature Store 개념을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 재현성, 안전한 배포, 관측 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["AI 운영 자동화", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Feature Store Concept", "Feature Store 개념", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Feature Store Concept은 전체 MLOps/LLMOps 흐름의 어디에 위치하는가?", "Feature Store 개념을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 Feature Store 개념을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "24.05": {"summary": "Model Versioning(모델 버전 관리)은 MLOps/LLMOps에서 중요한 개념입니다. 데이터·실험·모델·프롬프트·평가·배포·모니터링을 버전과 증거가 남는 반복 가능한 운영 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "모델 버전 관리을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 재현성, 안전한 배포, 관측 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["AI 운영 자동화", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Model Versioning", "모델 버전 관리", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Model Versioning은 전체 MLOps/LLMOps 흐름의 어디에 위치하는가?", "모델 버전 관리을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 모델 버전 관리을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "24.06": {"summary": "Model Registry(Model Registry)은 MLOps/LLMOps에서 중요한 개념입니다. 데이터·실험·모델·프롬프트·평가·배포·모니터링을 버전과 증거가 남는 반복 가능한 운영 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "Model Registry을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 재현성, 안전한 배포, 관측 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["AI 운영 자동화", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Model Registry", "Model Registry", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Model Registry은 전체 MLOps/LLMOps 흐름의 어디에 위치하는가?", "Model Registry을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 Model Registry을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "24.07": {"summary": "Training Pipeline(학습 파이프라인)은 MLOps/LLMOps에서 중요한 개념입니다. 데이터·실험·모델·프롬프트·평가·배포·모니터링을 버전과 증거가 남는 반복 가능한 운영 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "학습 파이프라인을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 재현성, 안전한 배포, 관측 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["AI 운영 자동화", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Training Pipeline", "학습 파이프라인", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Training Pipeline은 전체 MLOps/LLMOps 흐름의 어디에 위치하는가?", "학습 파이프라인을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 학습 파이프라인을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "24.08": {"summary": "CI/CD for ML(ML CI/CD)은 MLOps/LLMOps에서 중요한 개념입니다. 데이터·실험·모델·프롬프트·평가·배포·모니터링을 버전과 증거가 남는 반복 가능한 운영 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "ML CI/CD을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 재현성, 안전한 배포, 관측 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["AI 운영 자동화", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["CI/CD for ML", "ML CI/CD", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["CI/CD for ML은 전체 MLOps/LLMOps 흐름의 어디에 위치하는가?", "ML CI/CD을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 ML CI/CD을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "24.09": {"summary": "Model Deployment(모델 배포)은 MLOps/LLMOps에서 중요한 개념입니다. 데이터·실험·모델·프롬프트·평가·배포·모니터링을 버전과 증거가 남는 반복 가능한 운영 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "모델 배포을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 재현성, 안전한 배포, 관측 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["AI 운영 자동화", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Model Deployment", "모델 배포", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Model Deployment은 전체 MLOps/LLMOps 흐름의 어디에 위치하는가?", "모델 배포을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 모델 배포을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "24.10": {"summary": "Canary / A-B Concepts(Canary·A/B 개념)은 MLOps/LLMOps에서 중요한 개념입니다. 데이터·실험·모델·프롬프트·평가·배포·모니터링을 버전과 증거가 남는 반복 가능한 운영 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "Canary·A/B 개념을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 재현성, 안전한 배포, 관측 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["AI 운영 자동화", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Canary / A-B Concepts", "Canary·A/B 개념", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Canary / A-B Concepts은 전체 MLOps/LLMOps 흐름의 어디에 위치하는가?", "Canary·A/B 개념을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 Canary·A/B 개념을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "24.11": {"summary": "Model Monitoring(모델 모니터링)은 MLOps/LLMOps에서 중요한 개념입니다. 데이터·실험·모델·프롬프트·평가·배포·모니터링을 버전과 증거가 남는 반복 가능한 운영 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "모델 모니터링을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 재현성, 안전한 배포, 관측 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["AI 운영 자동화", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Model Monitoring", "모델 모니터링", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Model Monitoring은 전체 MLOps/LLMOps 흐름의 어디에 위치하는가?", "모델 모니터링을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 모델 모니터링을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "24.12": {"summary": "Data Drift(Data Drift)은 MLOps/LLMOps에서 중요한 개념입니다. 데이터·실험·모델·프롬프트·평가·배포·모니터링을 버전과 증거가 남는 반복 가능한 운영 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "Data Drift을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 재현성, 안전한 배포, 관측 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["AI 운영 자동화", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Data Drift", "Data Drift", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Data Drift은 전체 MLOps/LLMOps 흐름의 어디에 위치하는가?", "Data Drift을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 Data Drift을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "24.13": {"summary": "Concept Drift(Concept Drift)은 MLOps/LLMOps에서 중요한 개념입니다. 데이터·실험·모델·프롬프트·평가·배포·모니터링을 버전과 증거가 남는 반복 가능한 운영 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "Concept Drift을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 재현성, 안전한 배포, 관측 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["AI 운영 자동화", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Concept Drift", "Concept Drift", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Concept Drift은 전체 MLOps/LLMOps 흐름의 어디에 위치하는가?", "Concept Drift을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 Concept Drift을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "24.14": {"summary": "LLM Evaluation(LLM 평가)은 MLOps/LLMOps에서 중요한 개념입니다. 데이터·실험·모델·프롬프트·평가·배포·모니터링을 버전과 증거가 남는 반복 가능한 운영 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "LLM 평가을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 재현성, 안전한 배포, 관측 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["AI 운영 자동화", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["LLM Evaluation", "LLM 평가", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["LLM Evaluation은 전체 MLOps/LLMOps 흐름의 어디에 위치하는가?", "LLM 평가을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 LLM 평가을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "24.15": {"summary": "Prompt Versioning(프롬프트 버전 관리)은 MLOps/LLMOps에서 중요한 개념입니다. 데이터·실험·모델·프롬프트·평가·배포·모니터링을 버전과 증거가 남는 반복 가능한 운영 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "프롬프트 버전 관리을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 재현성, 안전한 배포, 관측 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["AI 운영 자동화", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Prompt Versioning", "프롬프트 버전 관리", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Prompt Versioning은 전체 MLOps/LLMOps 흐름의 어디에 위치하는가?", "프롬프트 버전 관리을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 프롬프트 버전 관리을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "24.16": {"summary": "RAG Evaluation(RAG 평가)은 MLOps/LLMOps에서 중요한 개념입니다. 데이터·실험·모델·프롬프트·평가·배포·모니터링을 버전과 증거가 남는 반복 가능한 운영 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "RAG 평가을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 재현성, 안전한 배포, 관측 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["AI 운영 자동화", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["RAG Evaluation", "RAG 평가", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["RAG Evaluation은 전체 MLOps/LLMOps 흐름의 어디에 위치하는가?", "RAG 평가을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 RAG 평가을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "24.17": {"summary": "Agent Evaluation(Agent 평가)은 MLOps/LLMOps에서 중요한 개념입니다. 데이터·실험·모델·프롬프트·평가·배포·모니터링을 버전과 증거가 남는 반복 가능한 운영 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "Agent 평가을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 재현성, 안전한 배포, 관측 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["AI 운영 자동화", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Agent Evaluation", "Agent 평가", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Agent Evaluation은 전체 MLOps/LLMOps 흐름의 어디에 위치하는가?", "Agent 평가을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 Agent 평가을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "24.18": {"summary": "Feedback Loop(피드백 루프)은 MLOps/LLMOps에서 중요한 개념입니다. 데이터·실험·모델·프롬프트·평가·배포·모니터링을 버전과 증거가 남는 반복 가능한 운영 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "피드백 루프을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 재현성, 안전한 배포, 관측 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["AI 운영 자동화", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Feedback Loop", "피드백 루프", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Feedback Loop은 전체 MLOps/LLMOps 흐름의 어디에 위치하는가?", "피드백 루프을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 피드백 루프을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "24.19": {"summary": "Cost & Usage Monitoring(비용·사용량 모니터링)은 MLOps/LLMOps에서 중요한 개념입니다. 데이터·실험·모델·프롬프트·평가·배포·모니터링을 버전과 증거가 남는 반복 가능한 운영 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "비용·사용량 모니터링을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 재현성, 안전한 배포, 관측 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["AI 운영 자동화", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Cost & Usage Monitoring", "비용·사용량 모니터링", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Cost & Usage Monitoring은 전체 MLOps/LLMOps 흐름의 어디에 위치하는가?", "비용·사용량 모니터링을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 비용·사용량 모니터링을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "25.01": {"summary": "AI Threat Model(AI 위협 모델)은 AI 보안·안전·거버넌스에서 중요한 개념입니다. 사용자 입력부터 RAG·모델·Agent Tool·출력까지 신뢰 경계를 나누고 통제를 배치하는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "AI 위협 모델을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 최소권한, 데이터 보호, Guardrail, 감사 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["Enterprise AI Governance", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["AI Threat Model", "AI 위협 모델", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["AI Threat Model은 전체 AI 보안·안전·거버넌스 흐름의 어디에 위치하는가?", "AI 위협 모델을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 AI 위협 모델을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "25.02": {"summary": "Prompt Injection(Prompt Injection)은 AI 보안·안전·거버넌스에서 중요한 개념입니다. 사용자 입력부터 RAG·모델·Agent Tool·출력까지 신뢰 경계를 나누고 통제를 배치하는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "Prompt Injection을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 최소권한, 데이터 보호, Guardrail, 감사 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["Enterprise AI Governance", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Prompt Injection", "Prompt Injection", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Prompt Injection은 전체 AI 보안·안전·거버넌스 흐름의 어디에 위치하는가?", "Prompt Injection을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 Prompt Injection을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "25.03": {"summary": "Indirect Prompt Injection(간접 Prompt Injection)은 AI 보안·안전·거버넌스에서 중요한 개념입니다. 사용자 입력부터 RAG·모델·Agent Tool·출력까지 신뢰 경계를 나누고 통제를 배치하는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "간접 Prompt Injection을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 최소권한, 데이터 보호, Guardrail, 감사 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["Enterprise AI Governance", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Indirect Prompt Injection", "간접 Prompt Injection", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Indirect Prompt Injection은 전체 AI 보안·안전·거버넌스 흐름의 어디에 위치하는가?", "간접 Prompt Injection을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 간접 Prompt Injection을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "25.04": {"summary": "Jailbreak Concept(Jailbreak 개념)은 AI 보안·안전·거버넌스에서 중요한 개념입니다. 사용자 입력부터 RAG·모델·Agent Tool·출력까지 신뢰 경계를 나누고 통제를 배치하는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "Jailbreak 개념을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 최소권한, 데이터 보호, Guardrail, 감사 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["Enterprise AI Governance", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Jailbreak Concept", "Jailbreak 개념", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Jailbreak Concept은 전체 AI 보안·안전·거버넌스 흐름의 어디에 위치하는가?", "Jailbreak 개념을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 Jailbreak 개념을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "25.05": {"summary": "Sensitive Data Leakage(민감정보 유출)은 AI 보안·안전·거버넌스에서 중요한 개념입니다. 사용자 입력부터 RAG·모델·Agent Tool·출력까지 신뢰 경계를 나누고 통제를 배치하는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "민감정보 유출을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 최소권한, 데이터 보호, Guardrail, 감사 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["Enterprise AI Governance", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Sensitive Data Leakage", "민감정보 유출", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Sensitive Data Leakage은 전체 AI 보안·안전·거버넌스 흐름의 어디에 위치하는가?", "민감정보 유출을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 민감정보 유출을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "25.06": {"summary": "PII & Privacy(PII와 개인정보)은 AI 보안·안전·거버넌스에서 중요한 개념입니다. 사용자 입력부터 RAG·모델·Agent Tool·출력까지 신뢰 경계를 나누고 통제를 배치하는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "PII와 개인정보을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 최소권한, 데이터 보호, Guardrail, 감사 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["Enterprise AI Governance", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["PII & Privacy", "PII와 개인정보", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["PII & Privacy은 전체 AI 보안·안전·거버넌스 흐름의 어디에 위치하는가?", "PII와 개인정보을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 PII와 개인정보을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "25.07": {"summary": "Training Data Security(학습 데이터 보안)은 AI 보안·안전·거버넌스에서 중요한 개념입니다. 사용자 입력부터 RAG·모델·Agent Tool·출력까지 신뢰 경계를 나누고 통제를 배치하는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "학습 데이터 보안을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 최소권한, 데이터 보호, Guardrail, 감사 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["Enterprise AI Governance", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Training Data Security", "학습 데이터 보안", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Training Data Security은 전체 AI 보안·안전·거버넌스 흐름의 어디에 위치하는가?", "학습 데이터 보안을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 학습 데이터 보안을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "25.08": {"summary": "Model Access Control(모델 접근통제)은 AI 보안·안전·거버넌스에서 중요한 개념입니다. 사용자 입력부터 RAG·모델·Agent Tool·출력까지 신뢰 경계를 나누고 통제를 배치하는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "모델 접근통제을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 최소권한, 데이터 보호, Guardrail, 감사 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["Enterprise AI Governance", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Model Access Control", "모델 접근통제", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Model Access Control은 전체 AI 보안·안전·거버넌스 흐름의 어디에 위치하는가?", "모델 접근통제을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 모델 접근통제을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "25.09": {"summary": "RAG Security(RAG 보안)은 AI 보안·안전·거버넌스에서 중요한 개념입니다. 사용자 입력부터 RAG·모델·Agent Tool·출력까지 신뢰 경계를 나누고 통제를 배치하는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "RAG 보안을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 최소권한, 데이터 보호, Guardrail, 감사 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["Enterprise AI Governance", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["RAG Security", "RAG 보안", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["RAG Security은 전체 AI 보안·안전·거버넌스 흐름의 어디에 위치하는가?", "RAG 보안을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 RAG 보안을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "25.10": {"summary": "Vector Store Security(Vector Store 보안)은 AI 보안·안전·거버넌스에서 중요한 개념입니다. 사용자 입력부터 RAG·모델·Agent Tool·출력까지 신뢰 경계를 나누고 통제를 배치하는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "Vector Store 보안을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 최소권한, 데이터 보호, Guardrail, 감사 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["Enterprise AI Governance", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Vector Store Security", "Vector Store 보안", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Vector Store Security은 전체 AI 보안·안전·거버넌스 흐름의 어디에 위치하는가?", "Vector Store 보안을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 Vector Store 보안을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "25.11": {"summary": "Agent Tool Security(Agent Tool 보안)은 AI 보안·안전·거버넌스에서 중요한 개념입니다. 사용자 입력부터 RAG·모델·Agent Tool·출력까지 신뢰 경계를 나누고 통제를 배치하는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "Agent Tool 보안을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 최소권한, 데이터 보호, Guardrail, 감사 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["Enterprise AI Governance", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Agent Tool Security", "Agent Tool 보안", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Agent Tool Security은 전체 AI 보안·안전·거버넌스 흐름의 어디에 위치하는가?", "Agent Tool 보안을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 Agent Tool 보안을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "25.12": {"summary": "Least Privilege for Agents(Agent 최소권한)은 AI 보안·안전·거버넌스에서 중요한 개념입니다. 사용자 입력부터 RAG·모델·Agent Tool·출력까지 신뢰 경계를 나누고 통제를 배치하는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "Agent 최소권한을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 최소권한, 데이터 보호, Guardrail, 감사 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["Enterprise AI Governance", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Least Privilege for Agents", "Agent 최소권한", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Least Privilege for Agents은 전체 AI 보안·안전·거버넌스 흐름의 어디에 위치하는가?", "Agent 최소권한을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 Agent 최소권한을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "25.13": {"summary": "Content Safety(콘텐츠 안전)은 AI 보안·안전·거버넌스에서 중요한 개념입니다. 사용자 입력부터 RAG·모델·Agent Tool·출력까지 신뢰 경계를 나누고 통제를 배치하는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "콘텐츠 안전을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 최소권한, 데이터 보호, Guardrail, 감사 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["Enterprise AI Governance", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Content Safety", "콘텐츠 안전", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Content Safety은 전체 AI 보안·안전·거버넌스 흐름의 어디에 위치하는가?", "콘텐츠 안전을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 콘텐츠 안전을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "25.14": {"summary": "Guardrails(Guardrail)은 AI 보안·안전·거버넌스에서 중요한 개념입니다. 사용자 입력부터 RAG·모델·Agent Tool·출력까지 신뢰 경계를 나누고 통제를 배치하는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "Guardrail을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 최소권한, 데이터 보호, Guardrail, 감사 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["Enterprise AI Governance", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Guardrails", "Guardrail", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Guardrails은 전체 AI 보안·안전·거버넌스 흐름의 어디에 위치하는가?", "Guardrail을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 Guardrail을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "25.15": {"summary": "Evaluation & Red Teaming(평가와 Red Teaming)은 AI 보안·안전·거버넌스에서 중요한 개념입니다. 사용자 입력부터 RAG·모델·Agent Tool·출력까지 신뢰 경계를 나누고 통제를 배치하는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "평가와 Red Teaming을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 최소권한, 데이터 보호, Guardrail, 감사 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["Enterprise AI Governance", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Evaluation & Red Teaming", "평가와 Red Teaming", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Evaluation & Red Teaming은 전체 AI 보안·안전·거버넌스 흐름의 어디에 위치하는가?", "평가와 Red Teaming을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 평가와 Red Teaming을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "25.16": {"summary": "Audit Logging(감사 로그)은 AI 보안·안전·거버넌스에서 중요한 개념입니다. 사용자 입력부터 RAG·모델·Agent Tool·출력까지 신뢰 경계를 나누고 통제를 배치하는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "감사 로그을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 최소권한, 데이터 보호, Guardrail, 감사 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["Enterprise AI Governance", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Audit Logging", "감사 로그", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Audit Logging은 전체 AI 보안·안전·거버넌스 흐름의 어디에 위치하는가?", "감사 로그을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 감사 로그을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "25.17": {"summary": "AI Governance(AI 거버넌스)은 AI 보안·안전·거버넌스에서 중요한 개념입니다. 사용자 입력부터 RAG·모델·Agent Tool·출력까지 신뢰 경계를 나누고 통제를 배치하는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "AI 거버넌스을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 최소권한, 데이터 보호, Guardrail, 감사 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["Enterprise AI Governance", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["AI Governance", "AI 거버넌스", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["AI Governance은 전체 AI 보안·안전·거버넌스 흐름의 어디에 위치하는가?", "AI 거버넌스을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 AI 거버넌스을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
  "25.18": {"summary": "Responsible AI Concepts(Responsible AI 개념)은 AI 보안·안전·거버넌스에서 중요한 개념입니다. 사용자 입력부터 RAG·모델·Agent Tool·출력까지 신뢰 경계를 나누고 통제를 배치하는 흐름 안에서 이 개념이 시스템의 어느 지점에 위치하고 어떤 지표·통제·운영 결과에 영향을 주는지 연결해 이해합니다.", "why": "Responsible AI 개념을 용어로만 외우면 실제 시스템의 병목이나 위험을 설명하기 어렵습니다. 최소권한, 데이터 보호, Guardrail, 감사 가능성 관점에서 입력 → 처리 → 관측 결과를 추적할 수 있어야 설계와 장애 분석에 활용할 수 있습니다.", "usedFor": ["Enterprise AI Governance", "Production AI", "Architecture Design", "Troubleshooting"], "keyPoints": ["Responsible AI Concepts", "Responsible AI 개념", "입력 → 처리 → 결과", "Trade-off / Failure Mode", "관측·검증 포인트"], "questions": ["Responsible AI Concepts은 전체 AI 보안·안전·거버넌스 흐름의 어디에 위치하는가?", "Responsible AI 개념을 변경하거나 실패했을 때 가장 먼저 달라지는 지표·위험은 무엇인가?", "운영 환경에서 Responsible AI 개념을 검증하려면 무엇을 관측해야 하는가?"], "visualType": "generic"},
// v0.0.17 CONTENT START
  "26.01": {"summary": "하나의 대규모 사전학습 모델을 여러 downstream 작업의 기반으로 재사용하는 구조입니다. 흐름은 Pretraining → Foundation Model → Prompt/RAG/Fine-tuning → Applications 로 추적할 수 있습니다.", "why": "현대 AI 서비스는 모델 하나가 아니라 Gateway, Retrieval, State, Tool, Evaluation, Observability, Security가 결합된 시스템이므로 각 계층의 책임과 경계를 이해해야 합니다.", "usedFor": ["Production AI Architecture", "RAG/Agent Platform", "Cloud AI", "System Design"], "keyPoints": ["Pretraining", "Adaptation", "Shared Model", "Downstream Tasks", "Pretraining → Foundation Model → Prompt/RAG/Fine-tuning → Applications"], "questions": ["Foundation Model Architecture의 핵심 입력과 출력은 무엇인가?", "Foundation Model 아키텍처에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Foundation Model Architecture은 어떻게 연결되는가?"], "visualType": "generic"},
  "26.02": {"summary": "작은 언어 모델은 제한된 파라미터와 메모리로 특정 작업·온디바이스·저비용 추론을 노리는 모델 계열입니다. 흐름은 Task scope → Smaller model → Lower memory/latency → Deployment 로 추적할 수 있습니다.", "why": "현대 AI 서비스는 모델 하나가 아니라 Gateway, Retrieval, State, Tool, Evaluation, Observability, Security가 결합된 시스템이므로 각 계층의 책임과 경계를 이해해야 합니다.", "usedFor": ["Production AI Architecture", "RAG/Agent Platform", "Cloud AI", "System Design"], "keyPoints": ["Parameter Budget", "Latency", "Edge/Private", "Task Fit", "Task scope → Smaller model → Lower memory/latency → Deployment"], "questions": ["Small Language Models의 핵심 입력과 출력은 무엇인가?", "Small Language Model에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Small Language Models은 어떻게 연결되는가?"], "visualType": "generic"},
  "26.03": {"summary": "Mixture of Experts는 여러 Expert 중 일부만 Router가 선택해 Token을 처리하게 하는 sparse computation 구조입니다. 흐름은 Token → Router → Top-k Experts → Combine 로 추적할 수 있습니다.", "why": "현대 AI 서비스는 모델 하나가 아니라 Gateway, Retrieval, State, Tool, Evaluation, Observability, Security가 결합된 시스템이므로 각 계층의 책임과 경계를 이해해야 합니다.", "usedFor": ["Production AI Architecture", "RAG/Agent Platform", "Cloud AI", "System Design"], "keyPoints": ["Router", "Experts", "Sparse Activation", "Load Balance", "Token → Router → Top-k Experts → Combine"], "questions": ["Mixture of Experts의 핵심 입력과 출력은 무엇인가?", "Mixture of Experts에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Mixture of Experts은 어떻게 연결되는가?"], "visualType": "generic"},
  "26.04": {"summary": "Dense 모델은 모든 주요 파라미터를 매 Token에 사용하고, MoE는 선택된 Expert만 활성화합니다. 흐름은 Dense: all blocks / MoE: routed experts 로 추적할 수 있습니다.", "why": "현대 AI 서비스는 모델 하나가 아니라 Gateway, Retrieval, State, Tool, Evaluation, Observability, Security가 결합된 시스템이므로 각 계층의 책임과 경계를 이해해야 합니다.", "usedFor": ["Production AI Architecture", "RAG/Agent Platform", "Cloud AI", "System Design"], "keyPoints": ["Dense Compute", "Sparse Compute", "Capacity", "Routing", "Dense: all blocks / MoE: routed experts"], "questions": ["Dense vs MoE Models의 핵심 입력과 출력은 무엇인가?", "Dense와 MoE 모델에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Dense vs MoE Models은 어떻게 연결되는가?"], "visualType": "generic"},
  "26.05": {"summary": "Long-context 아키텍처는 긴 입력을 처리할 때 Attention 비용, 위치 표현, KV Cache와 정보 검색 문제를 함께 다룹니다. 흐름은 Long tokens → Position/Attention strategy → Memory → Output 로 추적할 수 있습니다.", "why": "현대 AI 서비스는 모델 하나가 아니라 Gateway, Retrieval, State, Tool, Evaluation, Observability, Security가 결합된 시스템이므로 각 계층의 책임과 경계를 이해해야 합니다.", "usedFor": ["Production AI Architecture", "RAG/Agent Platform", "Cloud AI", "System Design"], "keyPoints": ["Context Length", "Attention Cost", "Position", "KV Cache", "Long tokens → Position/Attention strategy → Memory → Output"], "questions": ["Long-context Architecture의 핵심 입력과 출력은 무엇인가?", "Long-context 아키텍처에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Long-context Architecture은 어떻게 연결되는가?"], "visualType": "generic"},
  "26.06": {"summary": "RAG 애플리케이션은 모델 밖의 지식을 검색해 Context로 주입하고 근거 기반 생성을 수행합니다. 흐름은 Query → Retrieval → Rerank → Context → LLM → Citation 로 추적할 수 있습니다.", "why": "현대 AI 서비스는 모델 하나가 아니라 Gateway, Retrieval, State, Tool, Evaluation, Observability, Security가 결합된 시스템이므로 각 계층의 책임과 경계를 이해해야 합니다.", "usedFor": ["Production AI Architecture", "RAG/Agent Platform", "Cloud AI", "System Design"], "keyPoints": ["Retriever", "Vector Store", "Reranker", "Grounding", "Query → Retrieval → Rerank → Context → LLM → Citation"], "questions": ["RAG Application Architecture의 핵심 입력과 출력은 무엇인가?", "RAG 애플리케이션 구조에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 RAG Application Architecture은 어떻게 연결되는가?"], "visualType": "generic"},
  "26.07": {"summary": "Agent 애플리케이션은 모델에 Tool, State, Memory, Policy와 반복 실행 루프를 결합합니다. 흐름은 Goal → Plan → Tool → Observe → State → Next Action 로 추적할 수 있습니다.", "why": "현대 AI 서비스는 모델 하나가 아니라 Gateway, Retrieval, State, Tool, Evaluation, Observability, Security가 결합된 시스템이므로 각 계층의 책임과 경계를 이해해야 합니다.", "usedFor": ["Production AI Architecture", "RAG/Agent Platform", "Cloud AI", "System Design"], "keyPoints": ["Tool", "State", "Memory", "Policy", "Goal → Plan → Tool → Observe → State → Next Action"], "questions": ["Agent Application Architecture의 핵심 입력과 출력은 무엇인가?", "Agent 애플리케이션 구조에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Agent Application Architecture은 어떻게 연결되는가?"], "visualType": "generic"},
  "26.08": {"summary": "멀티모달 앱은 텍스트·이미지·음성 등 서로 다른 입력을 Encoder/공통 표현과 모델 흐름으로 결합합니다. 흐름은 Modalities → Encoders → Fusion/Shared Space → Model → Output 로 추적할 수 있습니다.", "why": "현대 AI 서비스는 모델 하나가 아니라 Gateway, Retrieval, State, Tool, Evaluation, Observability, Security가 결합된 시스템이므로 각 계층의 책임과 경계를 이해해야 합니다.", "usedFor": ["Production AI Architecture", "RAG/Agent Platform", "Cloud AI", "System Design"], "keyPoints": ["Modality", "Encoder", "Fusion", "Alignment", "Modalities → Encoders → Fusion/Shared Space → Model → Output"], "questions": ["Multimodal Application Architecture의 핵심 입력과 출력은 무엇인가?", "멀티모달 앱 구조에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Multimodal Application Architecture은 어떻게 연결되는가?"], "visualType": "generic"},
  "26.09": {"summary": "Model Router는 요청 특성·비용·지연·품질 정책에 따라 사용할 모델을 동적으로 선택합니다. 흐름은 Request → Policy/Classifier → Model A/B/C → Response 로 추적할 수 있습니다.", "why": "현대 AI 서비스는 모델 하나가 아니라 Gateway, Retrieval, State, Tool, Evaluation, Observability, Security가 결합된 시스템이므로 각 계층의 책임과 경계를 이해해야 합니다.", "usedFor": ["Production AI Architecture", "RAG/Agent Platform", "Cloud AI", "System Design"], "keyPoints": ["Routing Policy", "Cost", "Latency", "Fallback", "Request → Policy/Classifier → Model A/B/C → Response"], "questions": ["Model Router의 핵심 입력과 출력은 무엇인가?", "Model Router에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Model Router은 어떻게 연결되는가?"], "visualType": "generic"},
  "26.10": {"summary": "AI Gateway는 여러 모델 Endpoint 앞에서 인증, 라우팅, Rate Limit, 정책, 관측을 공통 처리하는 계층입니다. 흐름은 Client → Gateway → Policy → Model Provider 로 추적할 수 있습니다.", "why": "현대 AI 서비스는 모델 하나가 아니라 Gateway, Retrieval, State, Tool, Evaluation, Observability, Security가 결합된 시스템이므로 각 계층의 책임과 경계를 이해해야 합니다.", "usedFor": ["Production AI Architecture", "RAG/Agent Platform", "Cloud AI", "System Design"], "keyPoints": ["Authentication", "Rate Limit", "Routing", "Telemetry", "Client → Gateway → Policy → Model Provider"], "questions": ["AI Gateway의 핵심 입력과 출력은 무엇인가?", "AI Gateway에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 AI Gateway은 어떻게 연결되는가?"], "visualType": "generic"},
  "26.11": {"summary": "외부 Tool/API는 모델의 텍스트 생성 능력을 실제 데이터 조회와 행동 실행으로 확장합니다. 흐름은 Model intent → Schema → API call → Result → Model 로 추적할 수 있습니다.", "why": "현대 AI 서비스는 모델 하나가 아니라 Gateway, Retrieval, State, Tool, Evaluation, Observability, Security가 결합된 시스템이므로 각 계층의 책임과 경계를 이해해야 합니다.", "usedFor": ["Production AI Architecture", "RAG/Agent Platform", "Cloud AI", "System Design"], "keyPoints": ["Schema", "Validation", "Timeout", "Permission", "Model intent → Schema → API call → Result → Model"], "questions": ["External Tools & APIs의 핵심 입력과 출력은 무엇인가?", "외부 도구와 API에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 External Tools & APIs은 어떻게 연결되는가?"], "visualType": "generic"},
  "26.12": {"summary": "Memory/State Store는 대화·작업 진행 상태와 장기 기억을 모델 Context 밖에 지속시키는 저장 계층입니다. 흐름은 Interaction → State write/read → Context reconstruction 로 추적할 수 있습니다.", "why": "현대 AI 서비스는 모델 하나가 아니라 Gateway, Retrieval, State, Tool, Evaluation, Observability, Security가 결합된 시스템이므로 각 계층의 책임과 경계를 이해해야 합니다.", "usedFor": ["Production AI Architecture", "RAG/Agent Platform", "Cloud AI", "System Design"], "keyPoints": ["Session State", "Long-term Memory", "Persistence", "TTL", "Interaction → State write/read → Context reconstruction"], "questions": ["Memory & State Stores의 핵심 입력과 출력은 무엇인가?", "Memory·State 저장소에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Memory & State Stores은 어떻게 연결되는가?"], "visualType": "generic"},
  "26.13": {"summary": "Evaluation Layer는 모델·RAG·Agent 결과를 품질, 안전, 근거성, 작업 성공률 같은 기준으로 지속 검증합니다. 흐름은 Output/Trace → Evaluator → Metrics → Release decision 로 추적할 수 있습니다.", "why": "현대 AI 서비스는 모델 하나가 아니라 Gateway, Retrieval, State, Tool, Evaluation, Observability, Security가 결합된 시스템이므로 각 계층의 책임과 경계를 이해해야 합니다.", "usedFor": ["Production AI Architecture", "RAG/Agent Platform", "Cloud AI", "System Design"], "keyPoints": ["Offline Eval", "Online Eval", "Metrics", "Regression", "Output/Trace → Evaluator → Metrics → Release decision"], "questions": ["Evaluation Layer의 핵심 입력과 출력은 무엇인가?", "평가 계층에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Evaluation Layer은 어떻게 연결되는가?"], "visualType": "generic"},
  "26.14": {"summary": "Observability Layer는 Prompt, Retrieval, Model, Tool 호출의 Trace·Metric·Log를 연결해 장애와 비용을 추적합니다. 흐름은 Request → Trace spans → Metrics/Logs → Diagnosis 로 추적할 수 있습니다.", "why": "현대 AI 서비스는 모델 하나가 아니라 Gateway, Retrieval, State, Tool, Evaluation, Observability, Security가 결합된 시스템이므로 각 계층의 책임과 경계를 이해해야 합니다.", "usedFor": ["Production AI Architecture", "RAG/Agent Platform", "Cloud AI", "System Design"], "keyPoints": ["Trace", "Metrics", "Logs", "Cost", "Request → Trace spans → Metrics/Logs → Diagnosis"], "questions": ["Observability Layer의 핵심 입력과 출력은 무엇인가?", "관측성 계층에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Observability Layer은 어떻게 연결되는가?"], "visualType": "generic"},
  "26.15": {"summary": "Security Boundary는 사용자·데이터·모델·Tool 사이 신뢰 경계를 나누고 각 경계에 인증·권한·검증을 배치합니다. 흐름은 Identity → Input → Data → Model → Tool → Output/Audit 로 추적할 수 있습니다.", "why": "현대 AI 서비스는 모델 하나가 아니라 Gateway, Retrieval, State, Tool, Evaluation, Observability, Security가 결합된 시스템이므로 각 계층의 책임과 경계를 이해해야 합니다.", "usedFor": ["Production AI Architecture", "RAG/Agent Platform", "Cloud AI", "System Design"], "keyPoints": ["Trust Boundary", "Least Privilege", "Data Control", "Audit", "Identity → Input → Data → Model → Tool → Output/Audit"], "questions": ["Security Boundary의 핵심 입력과 출력은 무엇인가?", "보안 경계에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Security Boundary은 어떻게 연결되는가?"], "visualType": "generic"},
  "27.01": {"summary": "Build a Neuron 실습은 뉴런의 핵심 계산을 JavaScript/TypeScript의 작은 함수로 직접 만들고 입력을 바꾸며 결과를 검증하는 단계입니다. 흐름은 Input → TypeScript function → Intermediate values → Output → Test 로 추적할 수 있습니다.", "why": "공식을 읽는 것에서 끝내지 않고 직접 계산을 구현하면 입력·중간값·출력의 관계를 디버깅할 수 있어 추상 개념이 코드 수준의 이해로 바뀝니다.", "usedFor": ["TypeScript Lab", "Concept Verification", "Portfolio Demo", "Interactive Visualization"], "keyPoints": ["Build a Neuron", "TypeScript", "Intermediate Values", "Test/Visualize", "Input → TypeScript function → Intermediate values → Output → Test"], "questions": ["Build a Neuron의 핵심 입력과 출력은 무엇인가?", "뉴런 직접 구현에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Build a Neuron은 어떻게 연결되는가?"], "visualType": "generic"},
  "27.02": {"summary": "Build Activation Functions 실습은 활성화 함수의 핵심 계산을 JavaScript/TypeScript의 작은 함수로 직접 만들고 입력을 바꾸며 결과를 검증하는 단계입니다. 흐름은 Input → TypeScript function → Intermediate values → Output → Test 로 추적할 수 있습니다.", "why": "공식을 읽는 것에서 끝내지 않고 직접 계산을 구현하면 입력·중간값·출력의 관계를 디버깅할 수 있어 추상 개념이 코드 수준의 이해로 바뀝니다.", "usedFor": ["TypeScript Lab", "Concept Verification", "Portfolio Demo", "Interactive Visualization"], "keyPoints": ["Build Activation Functions", "TypeScript", "Intermediate Values", "Test/Visualize", "Input → TypeScript function → Intermediate values → Output → Test"], "questions": ["Build Activation Functions의 핵심 입력과 출력은 무엇인가?", "활성화 함수 구현에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Build Activation Functions은 어떻게 연결되는가?"], "visualType": "generic"},
  "27.03": {"summary": "Build Linear Regression 실습은 선형 회귀의 핵심 계산을 JavaScript/TypeScript의 작은 함수로 직접 만들고 입력을 바꾸며 결과를 검증하는 단계입니다. 흐름은 Input → TypeScript function → Intermediate values → Output → Test 로 추적할 수 있습니다.", "why": "공식을 읽는 것에서 끝내지 않고 직접 계산을 구현하면 입력·중간값·출력의 관계를 디버깅할 수 있어 추상 개념이 코드 수준의 이해로 바뀝니다.", "usedFor": ["TypeScript Lab", "Concept Verification", "Portfolio Demo", "Interactive Visualization"], "keyPoints": ["Build Linear Regression", "TypeScript", "Intermediate Values", "Test/Visualize", "Input → TypeScript function → Intermediate values → Output → Test"], "questions": ["Build Linear Regression의 핵심 입력과 출력은 무엇인가?", "선형 회귀 구현에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Build Linear Regression은 어떻게 연결되는가?"], "visualType": "generic"},
  "27.04": {"summary": "Build Gradient Descent 실습은 경사하강법의 핵심 계산을 JavaScript/TypeScript의 작은 함수로 직접 만들고 입력을 바꾸며 결과를 검증하는 단계입니다. 흐름은 Input → TypeScript function → Intermediate values → Output → Test 로 추적할 수 있습니다.", "why": "공식을 읽는 것에서 끝내지 않고 직접 계산을 구현하면 입력·중간값·출력의 관계를 디버깅할 수 있어 추상 개념이 코드 수준의 이해로 바뀝니다.", "usedFor": ["TypeScript Lab", "Concept Verification", "Portfolio Demo", "Interactive Visualization"], "keyPoints": ["Build Gradient Descent", "TypeScript", "Intermediate Values", "Test/Visualize", "Input → TypeScript function → Intermediate values → Output → Test"], "questions": ["Build Gradient Descent의 핵심 입력과 출력은 무엇인가?", "경사하강법 구현에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Build Gradient Descent은 어떻게 연결되는가?"], "visualType": "generic"},
  "27.05": {"summary": "Build a Tiny Neural Network 실습은 작은 신경망의 핵심 계산을 JavaScript/TypeScript의 작은 함수로 직접 만들고 입력을 바꾸며 결과를 검증하는 단계입니다. 흐름은 Input → TypeScript function → Intermediate values → Output → Test 로 추적할 수 있습니다.", "why": "공식을 읽는 것에서 끝내지 않고 직접 계산을 구현하면 입력·중간값·출력의 관계를 디버깅할 수 있어 추상 개념이 코드 수준의 이해로 바뀝니다.", "usedFor": ["TypeScript Lab", "Concept Verification", "Portfolio Demo", "Interactive Visualization"], "keyPoints": ["Build a Tiny Neural Network", "TypeScript", "Intermediate Values", "Test/Visualize", "Input → TypeScript function → Intermediate values → Output → Test"], "questions": ["Build a Tiny Neural Network의 핵심 입력과 출력은 무엇인가?", "작은 신경망 구현에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Build a Tiny Neural Network은 어떻게 연결되는가?"], "visualType": "generic"},
  "27.06": {"summary": "Visualize Forward Propagation 실습은 순전파 시각화의 핵심 계산을 JavaScript/TypeScript의 작은 함수로 직접 만들고 입력을 바꾸며 결과를 검증하는 단계입니다. 흐름은 Input → TypeScript function → Intermediate values → Output → Test 로 추적할 수 있습니다.", "why": "공식을 읽는 것에서 끝내지 않고 직접 계산을 구현하면 입력·중간값·출력의 관계를 디버깅할 수 있어 추상 개념이 코드 수준의 이해로 바뀝니다.", "usedFor": ["TypeScript Lab", "Concept Verification", "Portfolio Demo", "Interactive Visualization"], "keyPoints": ["Visualize Forward Propagation", "TypeScript", "Intermediate Values", "Test/Visualize", "Input → TypeScript function → Intermediate values → Output → Test"], "questions": ["Visualize Forward Propagation의 핵심 입력과 출력은 무엇인가?", "순전파 시각화에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Visualize Forward Propagation은 어떻게 연결되는가?"], "visualType": "generic"},
  "27.07": {"summary": "Visualize Backpropagation 실습은 역전파 시각화의 핵심 계산을 JavaScript/TypeScript의 작은 함수로 직접 만들고 입력을 바꾸며 결과를 검증하는 단계입니다. 흐름은 Input → TypeScript function → Intermediate values → Output → Test 로 추적할 수 있습니다.", "why": "공식을 읽는 것에서 끝내지 않고 직접 계산을 구현하면 입력·중간값·출력의 관계를 디버깅할 수 있어 추상 개념이 코드 수준의 이해로 바뀝니다.", "usedFor": ["TypeScript Lab", "Concept Verification", "Portfolio Demo", "Interactive Visualization"], "keyPoints": ["Visualize Backpropagation", "TypeScript", "Intermediate Values", "Test/Visualize", "Input → TypeScript function → Intermediate values → Output → Test"], "questions": ["Visualize Backpropagation의 핵심 입력과 출력은 무엇인가?", "역전파 시각화에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Visualize Backpropagation은 어떻게 연결되는가?"], "visualType": "generic"},
  "27.08": {"summary": "Build Matrix Operations 실습은 행렬 연산의 핵심 계산을 JavaScript/TypeScript의 작은 함수로 직접 만들고 입력을 바꾸며 결과를 검증하는 단계입니다. 흐름은 Input → TypeScript function → Intermediate values → Output → Test 로 추적할 수 있습니다.", "why": "공식을 읽는 것에서 끝내지 않고 직접 계산을 구현하면 입력·중간값·출력의 관계를 디버깅할 수 있어 추상 개념이 코드 수준의 이해로 바뀝니다.", "usedFor": ["TypeScript Lab", "Concept Verification", "Portfolio Demo", "Interactive Visualization"], "keyPoints": ["Build Matrix Operations", "TypeScript", "Intermediate Values", "Test/Visualize", "Input → TypeScript function → Intermediate values → Output → Test"], "questions": ["Build Matrix Operations의 핵심 입력과 출력은 무엇인가?", "행렬 연산 구현에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Build Matrix Operations은 어떻게 연결되는가?"], "visualType": "generic"},
  "27.09": {"summary": "Build a Tokenizer 실습은 Tokenizer의 핵심 계산을 JavaScript/TypeScript의 작은 함수로 직접 만들고 입력을 바꾸며 결과를 검증하는 단계입니다. 흐름은 Input → TypeScript function → Intermediate values → Output → Test 로 추적할 수 있습니다.", "why": "공식을 읽는 것에서 끝내지 않고 직접 계산을 구현하면 입력·중간값·출력의 관계를 디버깅할 수 있어 추상 개념이 코드 수준의 이해로 바뀝니다.", "usedFor": ["TypeScript Lab", "Concept Verification", "Portfolio Demo", "Interactive Visualization"], "keyPoints": ["Build a Tokenizer", "TypeScript", "Intermediate Values", "Test/Visualize", "Input → TypeScript function → Intermediate values → Output → Test"], "questions": ["Build a Tokenizer의 핵심 입력과 출력은 무엇인가?", "Tokenizer 구현에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Build a Tokenizer은 어떻게 연결되는가?"], "visualType": "generic"},
  "27.10": {"summary": "Build Embedding Similarity 실습은 임베딩 유사도 실험의 핵심 계산을 JavaScript/TypeScript의 작은 함수로 직접 만들고 입력을 바꾸며 결과를 검증하는 단계입니다. 흐름은 Input → TypeScript function → Intermediate values → Output → Test 로 추적할 수 있습니다.", "why": "공식을 읽는 것에서 끝내지 않고 직접 계산을 구현하면 입력·중간값·출력의 관계를 디버깅할 수 있어 추상 개념이 코드 수준의 이해로 바뀝니다.", "usedFor": ["TypeScript Lab", "Concept Verification", "Portfolio Demo", "Interactive Visualization"], "keyPoints": ["Build Embedding Similarity", "TypeScript", "Intermediate Values", "Test/Visualize", "Input → TypeScript function → Intermediate values → Output → Test"], "questions": ["Build Embedding Similarity의 핵심 입력과 출력은 무엇인가?", "임베딩 유사도 실험에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Build Embedding Similarity은 어떻게 연결되는가?"], "visualType": "generic"},
  "27.11": {"summary": "Build Self-Attention 실습은 Self-Attention의 핵심 계산을 JavaScript/TypeScript의 작은 함수로 직접 만들고 입력을 바꾸며 결과를 검증하는 단계입니다. 흐름은 Input → TypeScript function → Intermediate values → Output → Test 로 추적할 수 있습니다.", "why": "공식을 읽는 것에서 끝내지 않고 직접 계산을 구현하면 입력·중간값·출력의 관계를 디버깅할 수 있어 추상 개념이 코드 수준의 이해로 바뀝니다.", "usedFor": ["TypeScript Lab", "Concept Verification", "Portfolio Demo", "Interactive Visualization"], "keyPoints": ["Build Self-Attention", "TypeScript", "Intermediate Values", "Test/Visualize", "Input → TypeScript function → Intermediate values → Output → Test"], "questions": ["Build Self-Attention의 핵심 입력과 출력은 무엇인가?", "Self-Attention 구현에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Build Self-Attention은 어떻게 연결되는가?"], "visualType": "generic"},
  "27.12": {"summary": "Build Multi-Head Attention 실습은 Multi-Head Attention의 핵심 계산을 JavaScript/TypeScript의 작은 함수로 직접 만들고 입력을 바꾸며 결과를 검증하는 단계입니다. 흐름은 Input → TypeScript function → Intermediate values → Output → Test 로 추적할 수 있습니다.", "why": "공식을 읽는 것에서 끝내지 않고 직접 계산을 구현하면 입력·중간값·출력의 관계를 디버깅할 수 있어 추상 개념이 코드 수준의 이해로 바뀝니다.", "usedFor": ["TypeScript Lab", "Concept Verification", "Portfolio Demo", "Interactive Visualization"], "keyPoints": ["Build Multi-Head Attention", "TypeScript", "Intermediate Values", "Test/Visualize", "Input → TypeScript function → Intermediate values → Output → Test"], "questions": ["Build Multi-Head Attention의 핵심 입력과 출력은 무엇인가?", "Multi-Head Attention 구현에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Build Multi-Head Attention은 어떻게 연결되는가?"], "visualType": "generic"},
  "27.13": {"summary": "Build a Mini Transformer 실습은 Mini Transformer의 핵심 계산을 JavaScript/TypeScript의 작은 함수로 직접 만들고 입력을 바꾸며 결과를 검증하는 단계입니다. 흐름은 Input → TypeScript function → Intermediate values → Output → Test 로 추적할 수 있습니다.", "why": "공식을 읽는 것에서 끝내지 않고 직접 계산을 구현하면 입력·중간값·출력의 관계를 디버깅할 수 있어 추상 개념이 코드 수준의 이해로 바뀝니다.", "usedFor": ["TypeScript Lab", "Concept Verification", "Portfolio Demo", "Interactive Visualization"], "keyPoints": ["Build a Mini Transformer", "TypeScript", "Intermediate Values", "Test/Visualize", "Input → TypeScript function → Intermediate values → Output → Test"], "questions": ["Build a Mini Transformer의 핵심 입력과 출력은 무엇인가?", "Mini Transformer 구현에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Build a Mini Transformer은 어떻게 연결되는가?"], "visualType": "generic"},
  "27.14": {"summary": "Build Next-token Sampling 실습은 다음 토큰 Sampling의 핵심 계산을 JavaScript/TypeScript의 작은 함수로 직접 만들고 입력을 바꾸며 결과를 검증하는 단계입니다. 흐름은 Input → TypeScript function → Intermediate values → Output → Test 로 추적할 수 있습니다.", "why": "공식을 읽는 것에서 끝내지 않고 직접 계산을 구현하면 입력·중간값·출력의 관계를 디버깅할 수 있어 추상 개념이 코드 수준의 이해로 바뀝니다.", "usedFor": ["TypeScript Lab", "Concept Verification", "Portfolio Demo", "Interactive Visualization"], "keyPoints": ["Build Next-token Sampling", "TypeScript", "Intermediate Values", "Test/Visualize", "Input → TypeScript function → Intermediate values → Output → Test"], "questions": ["Build Next-token Sampling의 핵심 입력과 출력은 무엇인가?", "다음 토큰 Sampling 구현에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Build Next-token Sampling은 어떻게 연결되는가?"], "visualType": "generic"},
  "27.15": {"summary": "Build Vector Search 실습은 Vector Search의 핵심 계산을 JavaScript/TypeScript의 작은 함수로 직접 만들고 입력을 바꾸며 결과를 검증하는 단계입니다. 흐름은 Input → TypeScript function → Intermediate values → Output → Test 로 추적할 수 있습니다.", "why": "공식을 읽는 것에서 끝내지 않고 직접 계산을 구현하면 입력·중간값·출력의 관계를 디버깅할 수 있어 추상 개념이 코드 수준의 이해로 바뀝니다.", "usedFor": ["TypeScript Lab", "Concept Verification", "Portfolio Demo", "Interactive Visualization"], "keyPoints": ["Build Vector Search", "TypeScript", "Intermediate Values", "Test/Visualize", "Input → TypeScript function → Intermediate values → Output → Test"], "questions": ["Build Vector Search의 핵심 입력과 출력은 무엇인가?", "Vector Search 구현에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Build Vector Search은 어떻게 연결되는가?"], "visualType": "generic"},
  "27.16": {"summary": "Build a Mini RAG 실습은 Mini RAG의 핵심 계산을 JavaScript/TypeScript의 작은 함수로 직접 만들고 입력을 바꾸며 결과를 검증하는 단계입니다. 흐름은 Input → TypeScript function → Intermediate values → Output → Test 로 추적할 수 있습니다.", "why": "공식을 읽는 것에서 끝내지 않고 직접 계산을 구현하면 입력·중간값·출력의 관계를 디버깅할 수 있어 추상 개념이 코드 수준의 이해로 바뀝니다.", "usedFor": ["TypeScript Lab", "Concept Verification", "Portfolio Demo", "Interactive Visualization"], "keyPoints": ["Build a Mini RAG", "TypeScript", "Intermediate Values", "Test/Visualize", "Input → TypeScript function → Intermediate values → Output → Test"], "questions": ["Build a Mini RAG의 핵심 입력과 출력은 무엇인가?", "Mini RAG 구현에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Build a Mini RAG은 어떻게 연결되는가?"], "visualType": "generic"},
  "27.17": {"summary": "Build Tool Calling 실습은 Tool Calling의 핵심 계산을 JavaScript/TypeScript의 작은 함수로 직접 만들고 입력을 바꾸며 결과를 검증하는 단계입니다. 흐름은 Input → TypeScript function → Intermediate values → Output → Test 로 추적할 수 있습니다.", "why": "공식을 읽는 것에서 끝내지 않고 직접 계산을 구현하면 입력·중간값·출력의 관계를 디버깅할 수 있어 추상 개념이 코드 수준의 이해로 바뀝니다.", "usedFor": ["TypeScript Lab", "Concept Verification", "Portfolio Demo", "Interactive Visualization"], "keyPoints": ["Build Tool Calling", "TypeScript", "Intermediate Values", "Test/Visualize", "Input → TypeScript function → Intermediate values → Output → Test"], "questions": ["Build Tool Calling의 핵심 입력과 출력은 무엇인가?", "Tool Calling 구현에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Build Tool Calling은 어떻게 연결되는가?"], "visualType": "generic"},
  "27.18": {"summary": "Build a Mini Agent 실습은 Mini Agent의 핵심 계산을 JavaScript/TypeScript의 작은 함수로 직접 만들고 입력을 바꾸며 결과를 검증하는 단계입니다. 흐름은 Input → TypeScript function → Intermediate values → Output → Test 로 추적할 수 있습니다.", "why": "공식을 읽는 것에서 끝내지 않고 직접 계산을 구현하면 입력·중간값·출력의 관계를 디버깅할 수 있어 추상 개념이 코드 수준의 이해로 바뀝니다.", "usedFor": ["TypeScript Lab", "Concept Verification", "Portfolio Demo", "Interactive Visualization"], "keyPoints": ["Build a Mini Agent", "TypeScript", "Intermediate Values", "Test/Visualize", "Input → TypeScript function → Intermediate values → Output → Test"], "questions": ["Build a Mini Agent의 핵심 입력과 출력은 무엇인가?", "Mini Agent 구현에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Build a Mini Agent은 어떻게 연결되는가?"], "visualType": "generic"},
  "27.19": {"summary": "Add Evaluation 실습은 평가 기능 추가의 핵심 계산을 JavaScript/TypeScript의 작은 함수로 직접 만들고 입력을 바꾸며 결과를 검증하는 단계입니다. 흐름은 Input → TypeScript function → Intermediate values → Output → Test 로 추적할 수 있습니다.", "why": "공식을 읽는 것에서 끝내지 않고 직접 계산을 구현하면 입력·중간값·출력의 관계를 디버깅할 수 있어 추상 개념이 코드 수준의 이해로 바뀝니다.", "usedFor": ["TypeScript Lab", "Concept Verification", "Portfolio Demo", "Interactive Visualization"], "keyPoints": ["Add Evaluation", "TypeScript", "Intermediate Values", "Test/Visualize", "Input → TypeScript function → Intermediate values → Output → Test"], "questions": ["Add Evaluation의 핵심 입력과 출력은 무엇인가?", "평가 기능 추가에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Add Evaluation은 어떻게 연결되는가?"], "visualType": "generic"},
  "27.20": {"summary": "Add Observability 실습은 관측성 추가의 핵심 계산을 JavaScript/TypeScript의 작은 함수로 직접 만들고 입력을 바꾸며 결과를 검증하는 단계입니다. 흐름은 Input → TypeScript function → Intermediate values → Output → Test 로 추적할 수 있습니다.", "why": "공식을 읽는 것에서 끝내지 않고 직접 계산을 구현하면 입력·중간값·출력의 관계를 디버깅할 수 있어 추상 개념이 코드 수준의 이해로 바뀝니다.", "usedFor": ["TypeScript Lab", "Concept Verification", "Portfolio Demo", "Interactive Visualization"], "keyPoints": ["Add Observability", "TypeScript", "Intermediate Values", "Test/Visualize", "Input → TypeScript function → Intermediate values → Output → Test"], "questions": ["Add Observability의 핵심 입력과 출력은 무엇인가?", "관측성 추가에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Add Observability은 어떻게 연결되는가?"], "visualType": "generic"},
  "28.01": {"summary": "AI 논문은 문제 정의, 기존 한계, 제안 방법, 실험 설정, 결과, 한계를 분리해 읽으면 구조를 빠르게 파악할 수 있습니다. 흐름은 Abstract → Method → Experiments → Results → Limitations 로 추적할 수 있습니다.", "why": "최신 연구 용어를 결과만 외우기보다 기존 Transformer/LLM/RAG 지식과 어떤 가정·효율·평가 차이가 있는지 연결해야 논문과 새로운 모델을 스스로 읽을 수 있습니다.", "usedFor": ["Paper Reading", "Model Comparison", "Research Literacy", "Advanced Architecture"], "keyPoints": ["Claim", "Method", "Baseline", "Limitation", "Abstract → Method → Experiments → Results → Limitations"], "questions": ["Reading AI Papers의 핵심 입력과 출력은 무엇인가?", "AI 논문 읽는 법에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Reading AI Papers은 어떻게 연결되는가?"], "visualType": "generic"},
  "28.02": {"summary": "Benchmark는 모델 비교 절차이고 Dataset은 그 평가에 쓰이는 데이터입니다. 점수는 데이터 분포와 측정 방식의 영향을 받습니다. 흐름은 Dataset → Task → Metric → Benchmark result 로 추적할 수 있습니다.", "why": "최신 연구 용어를 결과만 외우기보다 기존 Transformer/LLM/RAG 지식과 어떤 가정·효율·평가 차이가 있는지 연결해야 논문과 새로운 모델을 스스로 읽을 수 있습니다.", "usedFor": ["Paper Reading", "Model Comparison", "Research Literacy", "Advanced Architecture"], "keyPoints": ["Dataset", "Metric", "Baseline", "Leakage", "Dataset → Task → Metric → Benchmark result"], "questions": ["Benchmark & Dataset의 핵심 입력과 출력은 무엇인가?", "Benchmark와 Dataset에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Benchmark & Dataset은 어떻게 연결되는가?"], "visualType": "generic"},
  "28.03": {"summary": "Scaling Law는 모델·데이터·연산 규모 변화와 학습 손실/성능 사이에서 관찰되는 경험적 관계를 다룹니다. 흐름은 Compute/Data/Parameters ↑ → Loss trend ↓ 로 추적할 수 있습니다.", "why": "최신 연구 용어를 결과만 외우기보다 기존 Transformer/LLM/RAG 지식과 어떤 가정·효율·평가 차이가 있는지 연결해야 논문과 새로운 모델을 스스로 읽을 수 있습니다.", "usedFor": ["Paper Reading", "Model Comparison", "Research Literacy", "Advanced Architecture"], "keyPoints": ["Parameters", "Data", "Compute", "Power Law", "Compute/Data/Parameters ↑ → Loss trend ↓"], "questions": ["Scaling Laws의 핵심 입력과 출력은 무엇인가?", "Scaling Law에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Scaling Laws은 어떻게 연결되는가?"], "visualType": "generic"},
  "28.04": {"summary": "Emergent Behavior는 규모가 커질 때 특정 능력이 갑자기 나타나는 것처럼 관측되는 현상을 가리키며 측정 방식의 영향도 함께 검토해야 합니다. 흐름은 Scale → Measurement → Observed capability 로 추적할 수 있습니다.", "why": "최신 연구 용어를 결과만 외우기보다 기존 Transformer/LLM/RAG 지식과 어떤 가정·효율·평가 차이가 있는지 연결해야 논문과 새로운 모델을 스스로 읽을 수 있습니다.", "usedFor": ["Paper Reading", "Model Comparison", "Research Literacy", "Advanced Architecture"], "keyPoints": ["Scale", "Metric", "Threshold Effect", "Interpretation", "Scale → Measurement → Observed capability"], "questions": ["Emergent Behavior Concept의 핵심 입력과 출력은 무엇인가?", "Emergent Behavior 개념에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Emergent Behavior Concept은 어떻게 연결되는가?"], "visualType": "generic"},
  "28.05": {"summary": "In-context Learning은 가중치를 업데이트하지 않고 Prompt 안의 예시와 지시를 이용해 현재 작업 패턴을 따르게 하는 현상입니다. 흐름은 Instruction + Examples + Query → Context → Prediction 로 추적할 수 있습니다.", "why": "최신 연구 용어를 결과만 외우기보다 기존 Transformer/LLM/RAG 지식과 어떤 가정·효율·평가 차이가 있는지 연결해야 논문과 새로운 모델을 스스로 읽을 수 있습니다.", "usedFor": ["Paper Reading", "Model Comparison", "Research Literacy", "Advanced Architecture"], "keyPoints": ["Few-shot", "Context", "No Weight Update", "Pattern", "Instruction + Examples + Query → Context → Prediction"], "questions": ["In-context Learning의 핵심 입력과 출력은 무엇인가?", "In-context Learning에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 In-context Learning은 어떻게 연결되는가?"], "visualType": "generic"},
  "28.06": {"summary": "Reasoning Model 개념은 복잡한 문제를 여러 중간 계산·검증 단계로 처리하도록 학습·추론 전략을 설계하는 접근을 다룹니다. 흐름은 Problem → Intermediate computation → Check → Answer 로 추적할 수 있습니다.", "why": "최신 연구 용어를 결과만 외우기보다 기존 Transformer/LLM/RAG 지식과 어떤 가정·효율·평가 차이가 있는지 연결해야 논문과 새로운 모델을 스스로 읽을 수 있습니다.", "usedFor": ["Paper Reading", "Model Comparison", "Research Literacy", "Advanced Architecture"], "keyPoints": ["Reasoning Tokens", "Verification", "Search", "Inference Cost", "Problem → Intermediate computation → Check → Answer"], "questions": ["Reasoning Models Concepts의 핵심 입력과 출력은 무엇인가?", "Reasoning Model 개념에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Reasoning Models Concepts은 어떻게 연결되는가?"], "visualType": "generic"},
  "28.07": {"summary": "Distillation은 큰 Teacher의 출력·분포·표현을 작은 Student가 학습해 비용을 줄이면서 능력을 이전하는 방법입니다. 흐름은 Teacher → Soft targets/Traces → Student 로 추적할 수 있습니다.", "why": "최신 연구 용어를 결과만 외우기보다 기존 Transformer/LLM/RAG 지식과 어떤 가정·효율·평가 차이가 있는지 연결해야 논문과 새로운 모델을 스스로 읽을 수 있습니다.", "usedFor": ["Paper Reading", "Model Comparison", "Research Literacy", "Advanced Architecture"], "keyPoints": ["Teacher", "Student", "Soft Targets", "Compression", "Teacher → Soft targets/Traces → Student"], "questions": ["Distillation의 핵심 입력과 출력은 무엇인가?", "지식 증류에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Distillation은 어떻게 연결되는가?"], "visualType": "generic"},
  "28.08": {"summary": "Synthetic Data는 모델·시뮬레이터·규칙으로 생성한 데이터를 학습/평가에 활용하는 방식이며 품질·편향 검증이 중요합니다. 흐름은 Generator → Synthetic samples → Filter → Train/Evaluate 로 추적할 수 있습니다.", "why": "최신 연구 용어를 결과만 외우기보다 기존 Transformer/LLM/RAG 지식과 어떤 가정·효율·평가 차이가 있는지 연결해야 논문과 새로운 모델을 스스로 읽을 수 있습니다.", "usedFor": ["Paper Reading", "Model Comparison", "Research Literacy", "Advanced Architecture"], "keyPoints": ["Generation", "Filtering", "Diversity", "Bias", "Generator → Synthetic samples → Filter → Train/Evaluate"], "questions": ["Synthetic Data의 핵심 입력과 출력은 무엇인가?", "합성 데이터에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Synthetic Data은 어떻게 연결되는가?"], "visualType": "generic"},
  "28.09": {"summary": "Retrieval-augmented Model은 외부 메모리나 검색 결과를 모델 계산에 결합해 파라미터 밖의 정보를 활용합니다. 흐름은 Query/Hidden state → Retrieve → Fuse → Predict 로 추적할 수 있습니다.", "why": "최신 연구 용어를 결과만 외우기보다 기존 Transformer/LLM/RAG 지식과 어떤 가정·효율·평가 차이가 있는지 연결해야 논문과 새로운 모델을 스스로 읽을 수 있습니다.", "usedFor": ["Paper Reading", "Model Comparison", "Research Literacy", "Advanced Architecture"], "keyPoints": ["Retrieval", "External Memory", "Fusion", "Grounding", "Query/Hidden state → Retrieve → Fuse → Predict"], "questions": ["Retrieval-augmented Models의 핵심 입력과 출력은 무엇인가?", "Retrieval-augmented Model에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Retrieval-augmented Models은 어떻게 연결되는가?"], "visualType": "generic"},
  "28.10": {"summary": "Sparse Attention은 모든 Token 쌍을 연결하지 않고 선택된 위치만 Attention해 긴 Sequence의 계산량을 줄이는 접근입니다. 흐름은 Tokens → Sparse pattern → Selected attention edges 로 추적할 수 있습니다.", "why": "최신 연구 용어를 결과만 외우기보다 기존 Transformer/LLM/RAG 지식과 어떤 가정·효율·평가 차이가 있는지 연결해야 논문과 새로운 모델을 스스로 읽을 수 있습니다.", "usedFor": ["Paper Reading", "Model Comparison", "Research Literacy", "Advanced Architecture"], "keyPoints": ["Local Window", "Global Token", "Sparsity", "Complexity", "Tokens → Sparse pattern → Selected attention edges"], "questions": ["Sparse Attention의 핵심 입력과 출력은 무엇인가?", "Sparse Attention에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Sparse Attention은 어떻게 연결되는가?"], "visualType": "generic"},
  "28.11": {"summary": "State Space Model은 Sequence를 상태의 갱신과 출력으로 표현해 긴 문맥을 효율적으로 처리하려는 모델 계열입니다. 흐름은 Input x_t → State h_t → Output y_t 로 추적할 수 있습니다.", "why": "최신 연구 용어를 결과만 외우기보다 기존 Transformer/LLM/RAG 지식과 어떤 가정·효율·평가 차이가 있는지 연결해야 논문과 새로운 모델을 스스로 읽을 수 있습니다.", "usedFor": ["Paper Reading", "Model Comparison", "Research Literacy", "Advanced Architecture"], "keyPoints": ["State", "Recurrence", "Sequence", "Efficiency", "Input x_t → State h_t → Output y_t"], "questions": ["State Space Models의 핵심 입력과 출력은 무엇인가?", "State Space Model에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 State Space Models은 어떻게 연결되는가?"], "visualType": "generic"},
  "28.12": {"summary": "Graph Neural Network는 Node와 Edge로 표현된 관계 구조에서 이웃 정보를 반복적으로 집계해 표현을 학습합니다. 흐름은 Graph → Message → Aggregate → Update node 로 추적할 수 있습니다.", "why": "최신 연구 용어를 결과만 외우기보다 기존 Transformer/LLM/RAG 지식과 어떤 가정·효율·평가 차이가 있는지 연결해야 논문과 새로운 모델을 스스로 읽을 수 있습니다.", "usedFor": ["Paper Reading", "Model Comparison", "Research Literacy", "Advanced Architecture"], "keyPoints": ["Node", "Edge", "Message Passing", "Aggregation", "Graph → Message → Aggregate → Update node"], "questions": ["Graph Neural Networks의 핵심 입력과 출력은 무엇인가?", "Graph Neural Network에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Graph Neural Networks은 어떻게 연결되는가?"], "visualType": "generic"},
  "28.13": {"summary": "Agent용 강화학습은 행동 결과의 Reward를 이용해 장기적인 Tool 선택·계획 정책을 개선하는 관점입니다. 흐름은 State → Action → Environment → Reward → Policy update 로 추적할 수 있습니다.", "why": "최신 연구 용어를 결과만 외우기보다 기존 Transformer/LLM/RAG 지식과 어떤 가정·효율·평가 차이가 있는지 연결해야 논문과 새로운 모델을 스스로 읽을 수 있습니다.", "usedFor": ["Paper Reading", "Model Comparison", "Research Literacy", "Advanced Architecture"], "keyPoints": ["State", "Action", "Reward", "Policy", "State → Action → Environment → Reward → Policy update"], "questions": ["Reinforcement Learning for Agents의 핵심 입력과 출력은 무엇인가?", "Agent용 강화학습에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Reinforcement Learning for Agents은 어떻게 연결되는가?"], "visualType": "generic"},
  "28.14": {"summary": "Continual Learning은 시간이 지나 새 데이터·작업을 배우면서 이전 지식을 과도하게 잃지 않도록 학습하는 문제입니다. 흐름은 Old knowledge + New stream → Update → Retain 로 추적할 수 있습니다.", "why": "최신 연구 용어를 결과만 외우기보다 기존 Transformer/LLM/RAG 지식과 어떤 가정·효율·평가 차이가 있는지 연결해야 논문과 새로운 모델을 스스로 읽을 수 있습니다.", "usedFor": ["Paper Reading", "Model Comparison", "Research Literacy", "Advanced Architecture"], "keyPoints": ["Data Stream", "Catastrophic Forgetting", "Replay", "Adaptation", "Old knowledge + New stream → Update → Retain"], "questions": ["Continual Learning의 핵심 입력과 출력은 무엇인가?", "Continual Learning에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Continual Learning은 어떻게 연결되는가?"], "visualType": "generic"},
  "28.15": {"summary": "Federated Learning은 원본 데이터를 중앙에 모으지 않고 여러 Client에서 학습한 Update를 집계하는 분산 학습 방식입니다. 흐름은 Global model → Clients train locally → Aggregate updates 로 추적할 수 있습니다.", "why": "최신 연구 용어를 결과만 외우기보다 기존 Transformer/LLM/RAG 지식과 어떤 가정·효율·평가 차이가 있는지 연결해야 논문과 새로운 모델을 스스로 읽을 수 있습니다.", "usedFor": ["Paper Reading", "Model Comparison", "Research Literacy", "Advanced Architecture"], "keyPoints": ["Client", "Local Training", "Aggregation", "Privacy", "Global model → Clients train locally → Aggregate updates"], "questions": ["Federated Learning의 핵심 입력과 출력은 무엇인가?", "Federated Learning에서 가장 중요한 trade-off 또는 실패 조건은 무엇인가?", "기존에 학습한 개념과 Federated Learning은 어떻게 연결되는가?"], "visualType": "generic"},
// v0.0.17 CONTENT END
});
