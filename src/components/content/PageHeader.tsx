import type { CSSProperties, ReactNode } from "react";
import type { AreaConfig } from "@/types/content";

const themes=[
 {match:/profile/i,kicker:"ENGINEER CORE",words:["AZURE","CLOUD","PLATFORM"],code:"01"},
 {match:/career/i,kicker:"CAREER EVOLUTION",words:["BUILD","OPERATE","IMPROVE"],code:"02"},
 {match:/project/i,kicker:"DELIVERY SYSTEM",words:["CLOUD","AKS","AI / DATA"],code:"03"},
 {match:/portfolio/i,kicker:"SHOWCASE MATRIX",words:["DESIGN","DEMO","RESULT"],code:"04"},
 {match:/github/i,kicker:"SOURCE NETWORK",words:["BRANCH","COMMIT","SHIP"],code:"05"},
 {match:/expertise/i,kicker:"KNOWLEDGE GRAPH",words:["ARTICLE","CATEGORY","TAG"],code:"06"},
 {match:/training/i,kicker:"SKILL PROGRESSION",words:["LEARN","PRACTICE","UNLOCK"],code:"07"},
 {match:/archive/i,kicker:"DATA VAULT",words:["INGEST","INDEX","PRESERVE"],code:"08"},
];

function Dots({count=5}:{count?:number}){return <>{Array.from({length:count},(_,i)=><i key={i} style={{"--i":i} as CSSProperties}/>)}</>}

function Visual({code,words,kicker}:{code:string;words:string[];kicker:string}){
 let body:ReactNode;
 switch(code){
  case "01": body=<div className="identityOrbit"><div className="identityCore">ME</div><span>AZ</span><span>CL</span><span>PL</span><b/><b/></div>; break;
  case "02": body=<div className="careerRail"><span/><span/><span/><span/><em/><Dots count={4}/></div>; break;
  case "03": body=<div className="deployStack"><span>CLOUD</span><span>AKS</span><span>DATA</span><span>AI</span><em/><Dots count={4}/></div>; break;
  case "04": body=<div className="showcaseMatrix"><Dots count={9}/><span>SELECT</span></div>; break;
  case "05": body=<div className="gitGraph"><span/><span/><span/><span/><i/><i/><i/><i/><em/></div>; break;
  case "07": body=<div className="skillTree"><span>CORE</span><i/><i/><i/><b/><b/><b/><em/></div>; break;
  case "08": body=<div className="dataVault"><div>VAULT</div><span/><span/><span/><Dots count={5}/></div>; break;
  default: body=<div className="knowledgeGraph"><span>KB</span><i/><i/><i/><i/><i/><b/><b/><b/><b/></div>;
 }
 return <div className={`unifiedHeroVisual visualType${code}`} aria-hidden="true">
   <div className="visualStage">{body}</div>
   <div className="visualLegend"><b>{kicker}</b>{words.map((w,i)=><span key={w} style={{"--i":i} as CSSProperties}>{w}</span>)}</div>
   <div className="visualSignal"><span>LIVE</span><i/><i/><i/></div>
  </div>
}

export default function PageHeader({config,count}:{config:AreaConfig;count?:number}){
 const source=`${config.pageTitle} ${config.terminalPath}`;
 const theme=themes.find(t=>t.match.test(source))||themes[0];
 const expertise=theme.code==="06";
 return <header className={`unifiedPageHeader pageTheme${theme.code} ${expertise?"expertiseHeader":"portfolioHeader"}`}>
  <div className="terminalLine"><span>{config.terminalPath}</span>{count!==undefined&&<span>{count} {config.counterLabel}</span>}</div>
  <div className="unifiedHeroGrid">
   <div className="unifiedHeroCopy">
    <p className="eyebrow">{config.pageEyebrow}</p>
    <h1>{config.pageTitle}</h1>
    <p className="lead">{config.pageDescription}</p>
   </div>
   <Visual code={theme.code} words={theme.words} kicker={theme.kicker}/>
  </div>
 </header>;
}
