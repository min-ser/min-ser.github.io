import type { CSSProperties } from "react";
import type { AreaConfig } from "@/types/content";

const themes=[
 {match:/profile/i,kicker:"IDENTITY / PROFILE",words:["ENGINEER","AZURE","PLATFORM"],code:"01"},
 {match:/career/i,kicker:"CAREER / TIMELINE",words:["BUILD","OPERATE","IMPROVE"],code:"02"},
 {match:/project/i,kicker:"PROJECT / ARCHIVE",words:["BUILD","LEARN","DEPLOY"],code:"03"},
 {match:/portfolio/i,kicker:"PORTFOLIO / LAB",words:["CREATE","DEMO","EXPLORE"],code:"04"},
 {match:/github/i,kicker:"GITHUB / SOURCE",words:["CODE","COMMIT","SHIP"],code:"05"},
 {match:/expertise/i,kicker:"KNOWLEDGE / BASE",words:["RECORD","CONNECT","REUSE"],code:"06"},
 {match:/training/i,kicker:"TRAINING / GROWTH",words:["STUDY","PRACTICE","GROW"],code:"07"},
 {match:/archive/i,kicker:"ARCHIVE / HISTORY",words:["STORE","TRACE","PRESERVE"],code:"08"},
];

export default function PageHeader({config,count}:{config:AreaConfig;count?:number}){
 const source=`${config.pageTitle} ${config.terminalPath}`;
 const theme=themes.find(t=>t.match.test(source))||themes[0];
 return <header className={`unifiedPageHeader pageTheme${theme.code}`}>
  <div className="terminalLine"><span>{config.terminalPath}</span>{count!==undefined&&<span>{count} {config.counterLabel}</span>}</div>
  <div className="unifiedHeroGrid">
   <div className="unifiedHeroCopy">
    <p className="eyebrow">{config.pageEyebrow}</p>
    <h1>{config.pageTitle}</h1>
    <p className="lead">{config.pageDescription}</p>
   </div>
   <div className="unifiedHeroVisual" aria-hidden="true">
    <div className="visualCore"><i/><i/><i/><span>{theme.code}</span></div>
    <div className="visualWords">{theme.words.map((word,index)=><span key={word} style={{"--i":index} as CSSProperties}>{word}</span>)}</div>
    <div className="visualMeta"><b>{theme.kicker}</b><span>REAL RECORDS</span><span>CONTINUOUS GROWTH</span></div>
   </div>
  </div>
 </header>;
}
