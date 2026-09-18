import type { CSSProperties, ReactNode } from "react";
import type { AreaConfig } from "@/types/content";

const themes=[
 {match:/profile/i,kicker:"ENGINEER CORE",words:["AZURE","CLOUD","PLATFORM"],code:"01"},
 {match:/career/i,kicker:"CAREER EVOLUTION",words:["2020","CLOUD","PLATFORM"],code:"02"},
 {match:/project/i,kicker:"DELIVERY PIPELINE",words:["BUILD","DEPLOY","HEALTHY"],code:"03"},
 {match:/portfolio/i,kicker:"LIVE SHOWCASE",words:["IDEA","BUILD","LIVE"],code:"04"},
 {match:/github/i,kicker:"REPOSITORY FLOW",words:["BRANCH","MERGE","BUILD ✓"],code:"05"},
 {match:/expertise/i,kicker:"KNOWLEDGE NETWORK",words:["ARTICLE","CATEGORY","TAG"],code:"06"},
 {match:/training/i,kicker:"SKILL TREE",words:["LEARN","APPLY","MASTER"],code:"07"},
 {match:/archive/i,kicker:"DATA VAULT",words:["INGEST","INDEX","STORED"],code:"08"},
];
function Dots({count=5}:{count?:number}){return <>{Array.from({length:count},(_,i)=><i key={i} style={{"--i":i} as CSSProperties}/>)}</>}
function Visual({code,words,kicker}:{code:string;words:string[];kicker:string}){
 let body:ReactNode;
 switch(code){
  case "01": body=<div className="v15Orbit"><div className="v15Core">CORE</div>{["AZ","AKS","AI","FAB","DEV"].map((x,i)=><span key={x} style={{"--i":i} as CSSProperties}>{x}</span>)}<b/><em/></div>; break;
  case "02": body=<div className="v15Career"><div className="v15CareerLine"/><Dots count={5}/><em/><small>2020</small><small>2026</small></div>; break;
  case "03": body=<div className="v15Pipeline">{["SRC","BUILD","ACR","AKS","LIVE"].map((x,i)=><span key={x} style={{"--i":i} as CSSProperties}>{x}</span>)}<b/><em>● HEALTHY</em></div>; break;
  case "04": body=<div className="v15Showcase"><Dots count={6}/><b>LIVE</b><em>IDEA → DESIGN → BUILD</em></div>; break;
  case "05": body=<div className="v15Git"><span/><span/><span/><span/><b/><b/><b/><em>MERGE</em><i/></div>; break;
  case "07": body=<div className="v15Skills"><span>CORE</span>{["AZ","AKS","FAB","AI"].map((x,i)=><i key={x} style={{"--i":i} as CSSProperties}>{x}</i>)}<b/><b/><b/><b/></div>; break;
  case "08": body=<div className="v15Vault"><span>DATA<br/>VAULT</span>{["DOC","LOG","CODE","NOTE"].map((x,i)=><i key={x} style={{"--i":i} as CSSProperties}>{x}</i>)}<b/><em>STORED +1</em></div>; break;
  default: body=<div className="v15Knowledge"><span>KB</span>{["AKS","AZURE","FABRIC","AI","SEC"].map((x,i)=><i key={x} style={{"--i":i} as CSSProperties}>{x}</i>)}<b/><b/><b/><b/><b/></div>;
 }
 return <div className={`unifiedHeroVisual visualType${code} v15Visual`} aria-hidden="true"><div className="visualStage">{body}</div><div className="visualLegend"><b>{kicker}</b>{words.map((w,i)=><span key={w} style={{"--i":i} as CSSProperties}>{w}</span>)}</div><div className="visualSignal"><span>LIVE</span><i/><i/><i/></div></div>
}
export default function PageHeader({config,count}:{config:AreaConfig;count?:number}){
 const source=`${config.pageTitle} ${config.terminalPath}`; const theme=themes.find(t=>t.match.test(source))||themes[0]; const expertise=theme.code==="06";
 return <header className={`unifiedPageHeader pageTheme${theme.code} ${expertise?"expertiseHeader":"portfolioHeader"}`}><div className="terminalLine"><span>{config.terminalPath}</span>{count!==undefined&&<span>{count} {config.counterLabel}</span>}</div><div className="unifiedHeroGrid"><div className="unifiedHeroCopy"><p className="eyebrow">{config.pageEyebrow}</p><h1>{config.pageTitle}</h1><p className="lead">{config.pageDescription}</p></div><Visual code={theme.code} words={theme.words} kicker={theme.kicker}/></div></header>;
}
