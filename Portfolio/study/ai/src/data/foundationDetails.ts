export type DetailTab = "overview" | "detail" | "math" | "history" | "examples";

export type FoundationDetail = {
  id: string;
  tabs: {
    overview: string[];
    detail: string[];
    math: string[];
    history: string[];
    examples: string[];
  };
  comparisons?: {
    title: string;
    headers: string[];
    rows: string[][];
  };
  checklist: string[];
  recommendedDepth: number;
  next: string;
  related: string[];
};

export const foundationDetails: Record<string, FoundationDetail> = {
  ai: {
    id:"ai",
    tabs:{
      overview:[
        "AI는 하나의 특정 기술명이 아니라, 사람이 하던 지능적 작업을 컴퓨터가 수행하도록 만드는 넓은 분야입니다.",
        "규칙을 사람이 직접 작성하는 Rule-based AI와, 데이터에서 패턴을 학습하는 Machine Learning 계열이 함께 포함됩니다.",
        "LLM이나 AI Agent도 AI의 하위 범주 또는 AI를 활용한 시스템으로 이해해야 합니다."
      ],
      detail:[
        "초기 AI는 사람이 규칙을 작성하는 방식이 중심이었습니다. 하지만 현실 문제는 규칙을 모두 명시하기 어려워 Machine Learning이 중요해졌습니다.",
        "현대 AI는 데이터, 모델, 학습, 추론, 도구 사용이 결합된 시스템으로 확장되고 있습니다."
      ],
      math:["AI 자체는 단일 수식으로 정의되지 않습니다. 수학은 ML/DL 단계부터 본격적으로 등장합니다."],
      history:["1950~60년대 Symbolic AI → 통계적 Machine Learning → Deep Learning → Transformer → LLM/Generative AI 순으로 큰 흐름을 이해하면 됩니다."],
      examples:["체스 AI","추천 시스템","이미지 인식","음성 비서","ChatGPT","AI Agent"]
    },
    checklist:["AI가 큰 범주라는 점","ML/DL/LLM이 AI 안에 위치한다는 점","Rule-based와 학습 기반 AI의 차이"],
    recommendedDepth:45,
    next:"Machine Learning",
    related:["Machine Learning","Deep Learning","Generative AI","AI Agent"]
  },
  ml: {
    id:"ml",
    tabs:{
      overview:[
        "Machine Learning은 사람이 규칙을 직접 작성하는 대신 데이터에서 패턴을 학습해 예측과 판단을 수행하는 방법입니다.",
        "대표적으로 지도학습, 비지도학습, 강화학습이 있습니다."
      ],
      detail:[
        "전통적 프로그램은 사람이 규칙을 설계합니다. ML은 데이터와 정답/목표를 통해 규칙에 해당하는 파라미터를 학습합니다.",
        "Feature Engineering, Train/Test split, overfitting 같은 개념이 ML 단계에서 중요해집니다."
      ],
      math:["예측 함수 f(x;θ)를 두고, Loss를 최소화하는 θ를 찾는 문제가 ML의 공통 형태입니다."],
      history:["통계적 학습, SVM, Decision Tree, Random Forest, Gradient Boosting 등이 대표적 전통 ML 흐름입니다."],
      examples:["스팸 분류","고객 이탈 예측","수요 예측","이상 탐지","추천"]
    },
    comparisons:{
      title:"Traditional Programming vs Machine Learning",
      headers:["구분","Traditional","Machine Learning"],
      rows:[
        ["규칙","사람이 작성","데이터에서 학습"],
        ["입력","Data + Rules","Data + Target"],
        ["출력","Result","Model"],
        ["장점","명확하고 통제 쉬움","복잡한 패턴 자동 학습"]
      ]
    },
    checklist:["Train/Test의 차이","Feature/Label의 개념","학습과 추론의 차이"],
    recommendedDepth:55,
    next:"Deep Learning",
    related:["Supervised Learning","Unsupervised Learning","Reinforcement Learning","Deep Learning"]
  },
  dl: {
    id:"dl",
    tabs:{
      overview:[
        "Deep Learning은 여러 Layer의 Neural Network를 사용해 데이터에서 복잡한 특징을 자동으로 학습하는 Machine Learning의 한 분야입니다.",
        "전통적 ML에서는 사람이 Feature를 설계하는 경우가 많지만, Deep Learning은 표현(Representation) 자체를 Layer를 통해 학습할 수 있습니다.",
        "현대 이미지 인식, 음성 인식, 자연어 처리, 생성형 AI, LLM 대부분의 핵심 기반입니다."
      ],
      detail:[
        "Deep Learning의 'Deep'은 단순히 데이터가 많다는 뜻이 아니라 여러 Hidden Layer를 가진 신경망 구조를 의미합니다.",
        "초기 Layer는 단순한 패턴을, 뒤쪽 Layer는 더 추상적이고 복잡한 패턴을 학습하는 경향이 있습니다.",
        "예를 들어 이미지에서는 edge → texture → shape → object 같은 계층적 표현이 만들어질 수 있습니다.",
        "학습은 Forward Propagation으로 예측을 만들고, Loss를 계산한 뒤 Backpropagation과 Optimizer를 이용해 Weight를 업데이트하는 반복입니다."
      ],
      math:[
        "각 Layer는 대략 z = Wx + b, a = f(z) 형태로 표현할 수 있습니다.",
        "여러 Layer를 합성하면 fₙ(...f₂(f₁(x))) 형태의 복잡한 비선형 함수를 만들 수 있습니다.",
        "학습은 Loss L(θ)를 줄이는 방향으로 파라미터 θ를 갱신하는 최적화 문제입니다."
      ],
      history:[
        "1980s Backpropagation 재조명",
        "2012 AlexNet으로 대규모 이미지 분류에서 Deep Learning 성능이 크게 부각",
        "이후 CNN/RNN이 확산되고 2017 Transformer 등장",
        "Transformer가 대규모 언어 모델과 현대 Generative AI의 기반으로 발전"
      ],
      examples:[
        "이미지: 얼굴/사물 인식, 의료 영상",
        "음성: 음성→텍스트, 음성 합성",
        "자연어: 번역, 요약, 질의응답",
        "LLM: 대화, 코드 생성, 문서 이해",
        "자율주행: 객체 인식, 장면 이해"
      ]
    },
    comparisons:{
      title:"Machine Learning vs Deep Learning",
      headers:["항목","Machine Learning","Deep Learning"],
      rows:[
        ["특징 추출","사람이 설계하는 경우 많음","자동 학습"],
        ["데이터 요구량","상대적으로 적음","대체로 많음"],
        ["계산 자원","상대적으로 적음","GPU 등 많은 자원 사용"],
        ["표현력","모델에 따라 제한","매우 높은 비선형 표현"],
        ["대표 모델","SVM, Random Forest, XGBoost","CNN, RNN, Transformer"]
      ]
    },
    checklist:[
      "Deep Learning이 ML의 하위 범주라는 관계",
      "여러 Hidden Layer가 특징을 단계적으로 학습한다는 점",
      "Forward → Loss → Backpropagation → Update 흐름",
      "CNN/RNN/Transformer가 대표 구조라는 점"
    ],
    recommendedDepth:60,
    next:"Neural Network",
    related:["Neural Network","Representation Learning","CNN","RNN","Transformer","Backpropagation"]
  },
  nn: {
    id:"nn",
    tabs:{
      overview:[
        "Neural Network는 Neuron을 Layer 단위로 연결한 계산 구조입니다.",
        "각 연결에는 Weight가 있고, 각 Neuron은 Input의 가중합과 Activation을 계산합니다."
      ],
      detail:[
        "Input Layer → Hidden Layer → Output Layer 구조로 생각하면 됩니다.",
        "Layer가 깊어질수록 더 복잡한 표현을 학습할 수 있지만 학습 안정성, 연산량, 과적합 문제도 함께 고려해야 합니다."
      ],
      math:["기본 Layer: z = Wx + b, a = f(z)","전체 Network는 여러 함수의 합성으로 표현됩니다."],
      history:["Perceptron → Multi-layer Perceptron → Deep Neural Network로 발전했습니다."],
      examples:["분류","회귀","이미지","음성","Transformer Feed Forward"]
    },
    checklist:["Neuron/Weight/Bias","Layer 구조","Forward Propagation","Activation"],
    recommendedDepth:70,
    next:"Neuron",
    related:["Neuron","Layer","Activation","Forward Propagation"]
  },
  cnn: {
    id:"cnn",
    tabs:{
      overview:["CNN은 이미지처럼 공간적 구조가 있는 데이터에서 지역 패턴을 찾는 데 강한 신경망입니다."],
      detail:["Convolution Filter를 이동시키며 edge, texture, shape 같은 특징을 추출합니다."],
      math:["Convolution은 작은 Kernel과 입력 영역의 곱-합 연산으로 이해할 수 있습니다."],
      history:["LeNet → AlexNet → VGG/ResNet 등으로 발전했습니다."],
      examples:["이미지 분류","객체 탐지","의료 영상"]
    },
    checklist:["Convolution이 지역 패턴을 본다는 점","Transformer 학습에는 필수 아님"],
    recommendedDepth:30,
    next:"RNN",
    related:["Computer Vision","Convolution","ResNet"]
  },
  rnn: {
    id:"rnn",
    tabs:{
      overview:["RNN은 이전 시점의 상태를 다음 계산으로 전달해 순서 데이터를 처리합니다."],
      detail:["긴 문맥에서 정보가 희석되거나 병렬 처리가 어려운 문제가 Transformer 등장 배경 중 하나입니다."],
      math:["hₜ = f(Wₓxₜ + Wₕhₜ₋₁ + b)"],
      history:["RNN → LSTM/GRU → Attention → Transformer 흐름으로 이해하면 좋습니다."],
      examples:["시계열","초기 번역","음성"]
    },
    checklist:["순차 처리","Hidden State","Transformer와의 차이"],
    recommendedDepth:40,
    next:"Transformer",
    related:["LSTM","GRU","Attention","Transformer"]
  },
  genai: {
    id:"genai",
    tabs:{
      overview:["Generative AI는 기존 데이터를 분류만 하는 것이 아니라 새로운 텍스트, 이미지, 음성 등을 생성하는 AI 계열입니다."],
      detail:["LLM은 텍스트 생성형 AI의 대표 사례이며, Diffusion Model은 이미지 생성 분야의 대표 구조입니다."],
      math:["생성 모델은 데이터 분포를 학습하거나 다음 요소의 확률을 모델링하는 식으로 접근합니다."],
      history:["GAN/VAE → Transformer/LLM → Diffusion Model 등 다양한 생성 모델이 발전했습니다."],
      examples:["ChatGPT","이미지 생성","음악 생성","코드 생성"]
    },
    checklist:["LLM이 Generative AI의 한 종류라는 점","생성과 분류의 차이"],
    recommendedDepth:45,
    next:"RAG",
    related:["LLM","Diffusion","RAG","Fine-tuning"]
  },
  rag: {
    id:"rag",
    tabs:{
      overview:["RAG는 외부 문서를 검색한 뒤 관련 내용을 LLM 입력에 넣어 답변을 생성하는 구조입니다."],
      detail:["Embedding → Vector Search → Retrieval → Prompt Augmentation → Generation 흐름이 일반적입니다."],
      math:["문서와 질문 Vector 사이 Cosine Similarity 등을 사용해 관련 문서를 찾을 수 있습니다."],
      history:["LLM의 지식 최신성/사내 데이터 활용 문제를 보완하기 위한 대표 패턴으로 자리잡았습니다."],
      examples:["사내 문서 Q&A","정책 검색","지식 챗봇"]
    },
    checklist:["LLM 자체 학습과 RAG의 차이","Embedding/검색/생성의 연결"],
    recommendedDepth:50,
    next:"AI Agent",
    related:["Embedding","Vector DB","LLM","Retrieval"]
  },
  agent: {
    id:"agent",
    tabs:{
      overview:["AI Agent는 LLM을 중심으로 계획, 도구 사용, 메모리, 반복 실행을 결합한 시스템입니다."],
      detail:["LLM은 추론/결정 역할을 하고, 실제 외부 작업은 Tool/API를 통해 수행합니다."],
      math:["Agent 자체보다 내부 LLM과 검색/계획 모듈의 계산이 핵심입니다."],
      history:["Tool-use LLM, function calling, planner/executor 구조로 빠르게 발전하고 있습니다."],
      examples:["코딩 Agent","업무 자동화","데이터 분석 Agent"]
    },
    checklist:["LLM=모델, Agent=시스템","Tool Use","Memory/Workflow"],
    recommendedDepth:45,
    next:"전체 로드맵 복습",
    related:["LLM","Tool Use","Memory","Workflow"]
  }
};
