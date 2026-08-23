import type { FoundationNode } from "@/types/path";

export const foundationPath: FoundationNode[] = [
  {
    id:"ai", title:"Artificial Intelligence", korean:"인공지능", subtitle:"AI라는 가장 큰 범주부터 시작",
    description:"사람이 하던 판단, 예측, 생성 같은 지능적 작업을 컴퓨터가 수행하도록 만드는 넓은 분야입니다.",
    priority:"REQUIRED", order:1, route:"/learn/foundation/01-ai/",
    why:"ML, DL, LLM, Agent가 모두 AI라는 큰 범주 안에서 어떤 관계인지 이해하기 위한 출발점입니다.",
    usedFor:["추천","검색","이미지 인식","로봇","LLM","생성형 AI"],
    needNow:["AI가 하나의 기술이 아니라 큰 범주라는 점","Rule-based와 학습 기반 방식의 차이"],
    later:["Machine Learning","Deep Learning","LLM","AI Agent"]
  },
  {
    id:"ml", title:"Machine Learning", korean:"머신러닝", subtitle:"규칙을 사람이 쓰는 대신 데이터에서 학습",
    description:"데이터에서 패턴을 찾아 예측이나 판단 규칙을 만드는 AI 접근법입니다.",
    priority:"REQUIRED", order:2, parent:"ai", route:"/learn/foundation/02-machine-learning/",
    why:"'AI가 학습한다'는 말을 이해하려면 사람이 규칙을 작성하는 프로그램과 ML의 차이를 알아야 합니다.",
    usedFor:["수요 예측","이상 탐지","추천","분류","회귀"],
    needNow:["Train/Test 개념","Feature와 Label의 역할","학습과 추론의 차이"],
    later:["Deep Learning","Training","Loss","Optimizer"]
  },
  {
    id:"dl", title:"Deep Learning", korean:"딥러닝", subtitle:"Neural Network를 깊게 쌓아 복잡한 패턴 학습",
    description:"여러 Layer의 Neural Network를 이용하는 Machine Learning의 한 분야입니다.",
    priority:"REQUIRED", order:3, parent:"ml", route:"/learn/foundation/03-deep-learning/",
    why:"LLM과 Transformer가 Deep Learning 위에서 만들어졌기 때문에 여기서부터 Neural Network 학습으로 연결됩니다.",
    usedFor:["이미지 인식","음성 인식","자연어 처리","LLM","생성형 AI"],
    needNow:["ML 안에 DL이 포함된다는 관계","Layer와 Neural Network가 핵심이라는 점"],
    later:["Neural Network","CNN","RNN","Transformer"]
  },
  {
    id:"nn", title:"Neural Network", korean:"신경망", subtitle:"Neuron과 Layer가 연결된 계산 구조",
    description:"입력에 Weight를 적용하고 여러 Layer를 거쳐 출력으로 변환하는 계산 구조입니다.",
    priority:"REQUIRED", order:4, parent:"dl", route:"/learn/foundation/04-neural-network/",
    why:"이후 Neuron, Activation, Forward, Backpropagation을 이해하기 위한 직접적인 기반입니다.",
    usedFor:["분류","예측","Vision","Speech","Transformer"],
    needNow:["Neuron이 계산 단위라는 점","Layer가 뉴런들의 집합이라는 점","Forward로 값이 흐른다는 점"],
    later:["Neuron","Activation","Layer","Forward Propagation"]
  },
  {
    id:"cnn", title:"CNN", korean:"합성곱 신경망", subtitle:"이미지에 강했던 대표 Deep Learning 구조",
    description:"공간적으로 가까운 패턴을 효율적으로 찾도록 설계된 신경망 구조입니다.",
    priority:"OPTIONAL", order:5, parent:"dl", route:"/learn/foundation/05-cnn/",
    why:"Transformer를 배우는 데 필수는 아니지만 Deep Learning의 대표 구조와 발전 맥락을 이해하는 데 도움이 됩니다.",
    usedFor:["이미지 분류","객체 탐지","의료 영상"],
    needNow:["이미지 분야의 대표 구조라는 정도"],
    later:["Computer Vision","멀티모달 AI"]
  },
  {
    id:"rnn", title:"RNN", korean:"순환 신경망", subtitle:"순서가 있는 데이터를 처리하던 대표 구조",
    description:"이전 상태를 다음 계산에 전달해 순차 데이터를 처리하는 신경망입니다.",
    priority:"RECOMMENDED", order:6, parent:"dl", route:"/learn/foundation/06-rnn/",
    why:"Transformer가 왜 등장했는지 비교하기 위해 알아두면 좋습니다.",
    usedFor:["시계열","초기 자연어 처리","음성"],
    needNow:["순차 처리와 긴 문맥 처리의 한계"],
    later:["Transformer","Attention"]
  },
  {
    id:"transformer", title:"Transformer", korean:"트랜스포머", subtitle:"Attention 중심의 현대 LLM 핵심 구조",
    description:"순차적으로만 처리하지 않고 Attention으로 토큰 간 관계를 계산하는 모델 구조입니다.",
    priority:"REQUIRED", order:7, parent:"dl", route:"/learn/13-transformer/",
    why:"현대 LLM을 이해하기 위한 핵심 모델 구조입니다.",
    usedFor:["LLM","번역","요약","멀티모달","코드 생성"],
    needNow:["Attention이 핵심이라는 점","Token/Embedding을 입력으로 사용한다는 점"],
    later:["Self Attention","LLM","Generative AI"]
  },
  {
    id:"llm", title:"Large Language Model", korean:"대규모 언어 모델", subtitle:"다음 Token 예측을 대규모로 학습한 언어 모델",
    description:"방대한 텍스트에서 언어 패턴을 학습해 Token을 이어 생성하는 대규모 신경망 모델입니다.",
    priority:"REQUIRED", order:8, parent:"transformer", route:"/learn/15-mini-language-model/",
    why:"ChatGPT 같은 시스템을 'AI 전체'가 아니라 특정 계열의 모델로 정확히 위치시키기 위해 필요합니다.",
    usedFor:["대화","요약","번역","코드","질의응답"],
    needNow:["Token → Embedding → Transformer → Next Token 흐름"],
    later:["Generative AI","RAG","Fine-tuning","AI Agent"]
  },
  {
    id:"genai", title:"Generative AI", korean:"생성형 AI", subtitle:"텍스트·이미지·음성 등을 새로 생성",
    description:"학습한 데이터 패턴을 바탕으로 새로운 콘텐츠를 생성하는 AI 계열입니다.",
    priority:"RECOMMENDED", order:9, parent:"ai", route:"/learn/foundation/09-generative-ai/",
    why:"LLM이 생성형 AI의 한 종류라는 관계를 이해하면 용어 혼동이 줄어듭니다.",
    usedFor:["텍스트 생성","이미지 생성","음악","코드","영상"],
    needNow:["LLM=생성형 AI 전체가 아니라는 점"],
    later:["RAG","Fine-tuning","AI Agent"]
  },
  {
    id:"rag", title:"RAG", korean:"검색 증강 생성", subtitle:"외부 지식을 검색해 LLM 답변에 활용",
    description:"질문과 관련된 문서를 검색한 뒤 그 내용을 LLM 입력에 추가해 답변 품질을 높이는 방식입니다.",
    priority:"RECOMMENDED", order:10, parent:"llm", route:"/learn/foundation/10-rag/",
    why:"LLM 자체의 학습 지식과 외부 최신/사내 지식을 연결하는 대표 방식입니다.",
    usedFor:["사내 문서 Q&A","검색형 챗봇","지식 검색"],
    needNow:["검색과 생성이 결합된 구조라는 점"],
    later:["Embedding","Vector Search","AI Agent"]
  },
  {
    id:"agent", title:"AI Agent", korean:"AI 에이전트", subtitle:"LLM이 도구를 사용하고 작업을 수행",
    description:"모델이 단순 답변을 넘어 계획하고 도구를 호출하며 여러 단계를 수행하도록 구성한 시스템입니다.",
    priority:"RECOMMENDED", order:11, parent:"llm", route:"/learn/foundation/11-ai-agent/",
    why:"LLM과 Agent를 같은 개념으로 오해하지 않기 위해 필요합니다.",
    usedFor:["업무 자동화","코딩 Agent","데이터 분석","도구 호출"],
    needNow:["LLM은 모델, Agent는 모델을 활용한 시스템이라는 차이"],
    later:["Tool Use","Memory","Workflow"]
  }
];

export const getFoundationNode = (id:string) => foundationPath.find(n=>n.id===id);
