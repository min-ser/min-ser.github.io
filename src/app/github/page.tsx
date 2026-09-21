import Link from "next/link";
import GitHubRepoExplorer from "@/components/github/GitHubRepoExplorer";
import GitHubRepositoryGraph from "@/components/github/GitHubRepositoryGraph";
import {getGitHubRepositories} from "@/lib/github";
import {getAreaConfig} from "@/lib/content";
import s from "./GitHubHero.module.css";

function StatIcon({type}:{type:string}){
  const common={viewBox:"0 0 24 24","aria-hidden":true} as const;
  if(type==="owner") return <svg {...common}><circle cx="12" cy="8" r="4"/><path d="M5 21v-2a7 7 0 0 1 14 0v2M8 3h8"/></svg>;
  if(type==="repos") return <svg {...common}><path d="m12 3 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4M4 17l8 4 8-4"/></svg>;
  if(type==="api") return <svg {...common}><circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2.5 20a5.5 5.5 0 0 1 11 0M13 20a4 4 0 0 1 8 0"/></svg>;
  if(type==="stars") return <svg {...common}><path d="m12 2.8 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9L6.4 20l1.1-6.2L3 9.4l6.2-.9L12 2.8Z"/></svg>;
  if(type==="forks") return <svg {...common}><circle cx="6" cy="5" r="2"/><circle cx="18" cy="5" r="2"/><circle cx="12" cy="19" r="2"/><path d="M6 7v3c0 2 2 3 6 3s6-1 6-3V7M12 13v4"/></svg>;
  if(type==="language") return <svg {...common}><path d="m8 5-6 7 6 7M16 5l6 7-6 7M14 3l-4 18"/></svg>;
  if(type==="sync") return <svg {...common}><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/></svg>;
  return <svg {...common}><path d="M4 7h16v10H4zM8 4h8M8 20h8"/><path d="m9 10 2 2-2 2M13 14h3"/></svg>;
}

export default async function Page(){
  const {config,repositories}=await getGitHubRepositories();
  const area=getAreaConfig("04_GITHUB_PROJECTS");
  const liveCount=repositories.filter(r=>r.source==="github").length;
  const stars=repositories.reduce((n,r)=>n+(r.stars??0),0);
  const forks=repositories.reduce((n,r)=>n+(r.forks??0),0);
  const primary=repositories.find(r=>r.language)?.language||"Repository";
  const latest=repositories.map(r=>r.updatedAt).filter(Boolean).sort().at(-1);
  const sync=(area.syncPanel||{}) as Record<string,string>;
  const stats=[
    ["owner","OWNER",config.owner], ["repos","PUBLIC REPOSITORIES",String(repositories.length)],
    ["api","LIVE API",String(liveCount)], ["stars","TOTAL STARS",String(stars)],
    ["forks","TOTAL FORKS",String(forks)], ["language","PRIMARY LANGUAGE",primary],
    ["sync","LATEST SYNC",latest?new Date(latest).toISOString().slice(0,10):"SYNC PENDING"],
    ["mode","MODE",sync.modeValue||"PUBLIC API"]
  ];
  return <section className="section pageTop githubPage">
    <div className={s.masthead}>
      <div className={s.brand}><strong><em>&gt;_</em> 05 / <b>GITHUB</b></strong><span>CODE · COLLABORATE · AUTOMATE · OPEN SOURCE</span></div>
      <div className={s.message}><b>함께 만드는 더 나은 기술, 열린 개발을 지향합니다.</b><span>SAME ENGINEER. DIFFERENT STORIES.</span></div>
      <div className={s.words}><span>CODE</span><span>COLLABORATE</span><span>AUTOMATE</span><span>OPEN SOURCE</span></div>
    </div>
    <div className="terminalLine"><span>{area.terminalPath}</span><span>{repositories.length} {area.counterLabel}</span></div>
    <div className={s.hero}>
      <div className={`${s.card} ${s.intro}`}>
        <p className={s.eyebrow}>{area.pageEyebrow}</p><h1 className={s.title}>{area.pageTitle}</h1><p className={s.lead}>{area.pageDescription}</p>
        <div className={s.actions}><a href={`https://github.com/${config.owner}`} target="_blank" rel="noreferrer">View GitHub <span>→</span></a><a href="#repositories">Explore Repositories <span>→</span></a></div>
        <p className={s.quote}>“ Code opens opportunities. ”</p>
      </div>
      <div className={`${s.card} ${s.info}`}>
        <div className={s.infoHead}><b>GITHUB INFORMATION</b><span>LIVE API <i/> {liveCount?"CONNECTED":"FALLBACK"}</span></div>
        <div className={s.infoGrid}>{stats.map(([type,label,value])=><div className={s.stat} key={label}><span className={s.iconBox}><StatIcon type={type}/></span><span>{label}</span><strong>{value}</strong>{type==="language"&&<small className={s.meter}><i/></small>}</div>)}</div>
      </div>
      <div className={s.graphSlot}><GitHubRepositoryGraph/></div>
    </div>
    <div className="githubNotice"><span>{String(area.noticeLabel||"")}</span><p>{String(area.notice||"")}</p></div>
    <div id="repositories"><GitHubRepoExplorer owner={config.owner} repositories={repositories}/></div>
    <div className="githubBack"><Link href={String(area.backHref||"/")}>← {String(area.backLabel||"")}</Link></div>
  </section>;
}
