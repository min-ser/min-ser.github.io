import ProfileVisual from "./hero/ProfileVisual";
import CareerVisual from "./hero/CareerVisual";
import SystemVisual from "./hero/SystemVisuals";
import ProjectsVisual from "./hero/ProjectsVisual";
import type { AreaConfig } from "@/types/content";
const themes=[
 {match:/profile/i,name:"profile",kicker:"ENGINEER CORE",status:"CONNECTED",steps:["AZURE","AKS","FABRIC","AI"]},
 {match:/career/i,name:"career",kicker:"CAREER TIMELINE",status:"EVOLVING",steps:["OPS","CLOUD","AZURE","PLATFORM"]},
 {match:/project/i,name:"projects",kicker:"DELIVERY PIPELINE",status:"HEALTHY",steps:["CODE","BUILD","ACR","AKS","LIVE"]},
 {match:/portfolio/i,name:"portfolio",kicker:"LIVE SHOWCASE",status:"LIVE",steps:["IDEA","DESIGN","BUILD","RESULT"]},
 {match:/github/i,name:"github",kicker:"REPOSITORY GRAPH",status:"SYNCED",steps:["MAIN","BRANCH","COMMIT","MERGE"]},
 {match:/expertise/i,name:"expertise",kicker:"KNOWLEDGE NETWORK",status:"INDEXED",steps:["ARTICLE","CATEGORY","TAG","SEARCH"]},
 {match:/training/i,name:"training",kicker:"SKILL TREE",status:"GROWING",steps:["LEARN","PRACTICE","APPLY","MASTER"]},
 {match:/archive/i,name:"archive",kicker:"DATA VAULT",status:"STORED",steps:["INGEST","INDEX","PRESERVE","REVISIT"]},
];
export default function PageHeader({config,count}:{config:AreaConfig;count?:number}){
 const source=`${config.pageTitle} ${config.terminalPath}`; const theme=themes.find(t=>t.match.test(source))||themes[0]; const expertise=theme.name==="expertise";
 return <header className={`unifiedPageHeader heroV16 ${expertise?"expertiseHeader":"portfolioHeader"}`}><div className="terminalLine"><span>{config.terminalPath}</span>{count!==undefined&&<span>{count} {config.counterLabel}</span>}</div><div className="unifiedHeroGrid"><div className="unifiedHeroCopy"><p className="eyebrow">{config.pageEyebrow}</p><h1>{config.pageTitle}</h1><p className="lead">{config.pageDescription}</p></div>{theme.name==="profile" ? <ProfileVisual/> : theme.name==="career" ? <CareerVisual/> : theme.name==="projects" ? <ProjectsVisual/> : <SystemVisual kind={theme.name as "portfolio"|"github"|"expertise"|"training"|"archive"}/>}</div></header>;
}
