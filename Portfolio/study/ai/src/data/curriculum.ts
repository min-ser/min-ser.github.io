export type CurriculumPhase = "AI FOUNDATION" | "NEURAL BASICS" | "LEARNING" | "TRANSFORMER & LLM" | "MODERN AI";
export type CurriculumItem = { order:number; id:string; title:string; korean:string; route:string; phase:CurriculumPhase; priority:"REQUIRED"|"RECOMMENDED" };
export const curriculum: CurriculumItem[] = [
  {order:1,id:"ai",title:"Artificial Intelligence",korean:"인공지능",route:"/learn/foundation/01-ai/",phase:"AI FOUNDATION",priority:"REQUIRED"},
  {order:2,id:"ml",title:"Machine Learning",korean:"머신러닝",route:"/learn/foundation/02-machine-learning/",phase:"AI FOUNDATION",priority:"REQUIRED"},
  {order:3,id:"dl",title:"Deep Learning",korean:"딥러닝",route:"/learn/foundation/03-deep-learning/",phase:"AI FOUNDATION",priority:"REQUIRED"},
  {order:4,id:"nn",title:"Neural Network",korean:"신경망",route:"/learn/foundation/04-neural-network/",phase:"AI FOUNDATION",priority:"REQUIRED"},
  {order:5,id:"neuron",title:"Neuron",korean:"뉴런",route:"/learn/01-neuron/",phase:"NEURAL BASICS",priority:"REQUIRED"},
  {order:6,id:"activation",title:"Activation",korean:"활성화 함수",route:"/learn/02-activation/",phase:"NEURAL BASICS",priority:"REQUIRED"},
  {order:7,id:"layer",title:"Layer",korean:"레이어",route:"/learn/03-layer/",phase:"NEURAL BASICS",priority:"REQUIRED"},
  {order:8,id:"matrix",title:"Vector & Matrix",korean:"벡터와 행렬",route:"/learn/04-vector-matrix/",phase:"NEURAL BASICS",priority:"REQUIRED"},
  {order:9,id:"forward",title:"Forward Propagation",korean:"순전파",route:"/learn/05-forward-propagation/",phase:"NEURAL BASICS",priority:"REQUIRED"},
  {order:10,id:"loss",title:"Loss",korean:"손실",route:"/learn/06-loss/",phase:"LEARNING",priority:"REQUIRED"},
  {order:11,id:"gradient",title:"Gradient",korean:"기울기",route:"/learn/07-gradient/",phase:"LEARNING",priority:"REQUIRED"},
  {order:12,id:"backprop",title:"Backpropagation",korean:"역전파",route:"/learn/08-backpropagation/",phase:"LEARNING",priority:"REQUIRED"},
  {order:13,id:"optimizer",title:"Optimizer",korean:"최적화",route:"/learn/09-optimizer/",phase:"LEARNING",priority:"REQUIRED"},
  {order:14,id:"training",title:"Training",korean:"학습",route:"/learn/10-training/",phase:"LEARNING",priority:"REQUIRED"},
  {order:15,id:"token",title:"Token & Embedding",korean:"토큰과 임베딩",route:"/learn/12-token-embedding/",phase:"TRANSFORMER & LLM",priority:"REQUIRED"},
  {order:16,id:"transformer",title:"Transformer",korean:"트랜스포머",route:"/learn/13-transformer/",phase:"TRANSFORMER & LLM",priority:"REQUIRED"},
  {order:17,id:"attention",title:"Self Attention",korean:"셀프 어텐션",route:"/learn/14-self-attention/",phase:"TRANSFORMER & LLM",priority:"REQUIRED"},
  {order:18,id:"llm",title:"Language Model",korean:"언어 모델 / LLM",route:"/learn/15-mini-language-model/",phase:"TRANSFORMER & LLM",priority:"REQUIRED"},
  {order:19,id:"genai",title:"Generative AI",korean:"생성형 AI",route:"/learn/foundation/09-generative-ai/",phase:"MODERN AI",priority:"RECOMMENDED"},
  {order:20,id:"rag",title:"RAG",korean:"검색 증강 생성",route:"/learn/foundation/10-rag/",phase:"MODERN AI",priority:"RECOMMENDED"},
  {order:21,id:"agent",title:"AI Agent",korean:"AI 에이전트",route:"/learn/foundation/11-ai-agent/",phase:"MODERN AI",priority:"RECOMMENDED"}
];
export const curriculumPhases: CurriculumPhase[]=["AI FOUNDATION","NEURAL BASICS","LEARNING","TRANSFORMER & LLM","MODERN AI"];
export function getCurrentCurriculum(pathname:string){const p=pathname.endsWith("/")?pathname:`${pathname}/`; return curriculum.find(x=>p===x.route||p.startsWith(x.route));}
