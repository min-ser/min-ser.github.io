import {getAreaConfig} from "@/lib/content";
import PageHeader from "@/components/content/PageHeader";
const items=[
 {no:"01",type:"CREATIVE WEB / GAME",title:"Cheonryugwan Archive",description:"세계관, 캐릭터, 스토리와 게임 콘텐츠를 하나의 웹 아카이브로 구성한 개인 창작 프로젝트입니다.",tags:["Worldbuilding","Game","Web Archive"],href:"/Portfolio/Game/Cheonryugwan-Archive/game/"},
 {no:"02",type:"AI LEARNING PLATFORM",title:"NeuralScope",description:"Neural Network와 LLM 기초 개념을 시각적·인터랙티브하게 학습하기 위해 구축한 AI 학습 웹 프로젝트입니다.",tags:["AI","Neural Network","LLM","Interactive Learning"],href:"/Portfolio/study/ai/"},
 {no:"03",type:"CS LEARNING PLATFORM",title:"CS Study",description:"Computer Science 핵심 개념을 체계적으로 정리하고 탐색할 수 있도록 구성한 학습형 웹 프로젝트입니다.",tags:["Computer Science","Study","Knowledge Base"],href:"/Portfolio/study/cs/"}
];
export default function Page(){const config=getAreaConfig("04_PORTFOLIO");return <section className="section pageTop portfolioPage"><PageHeader config={config} count={items.length}/><div className="portfolioShowcaseGrid">{items.map(item=><article className="portfolioShowcaseCard" key={item.href}><div className="portfolioShowcaseTop"><span>{item.no}</span><b>● LIVE</b></div><div className="portfolioShowcaseType">{item.type}</div><h2>{item.title}</h2><p>{item.description}</p><div className="tags">{item.tags.map(tag=><span key={tag}>{tag}</span>)}</div><a className="portfolioOpen" href={item.href}>OPEN PROJECT <span>↗</span></a></article>)}</div></section>}
