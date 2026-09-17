"use client";
import {useEffect,useMemo,useState} from "react";
import MarkdownRenderer from "@/components/content/MarkdownRenderer";

type ProjectItem={
 slug:string;title:string;summary:string;startDate:string;endDate:string;status:string;careerId:string;trainingId:string;
 repository:string;featured:boolean;skills:string[];markdown:string;
};
type ProjectDomain="CLOUD / PLATFORM"|"AI / DATA"|"APPLICATION"|"SYSTEM OPERATIONS";

function domain(project:ProjectItem):ProjectDomain{
 const source=[project.title,...project.skills].join(" ").toLowerCase();
 if(/fabric|azure|aks|kubernetes|devops|cloud|security|audit|eventhub|finops|gitlab/.test(source))return "CLOUD / PLATFORM";
 if(/ai|deep|tensorflow|keras|python|django|vision|recognition|data|stock/.test(source))return "AI / DATA";
 if(/java|spring|jsp|javascript|commerce|web application/.test(source))return "APPLICATION";
 return "SYSTEM OPERATIONS";
}
function displayStatus(status:string){
 if(status==="ongoing")return "ACTIVE";
 if(status==="completed")return "DELIVERED";
 return status.replaceAll("_"," ").toUpperCase()||"ARCHIVED";
}
function period(project:ProjectItem){
 return [project.startDate,project.endDate||(project.status==="ongoing"?"PRESENT":"")].filter(Boolean).join(" — ");
}

export default function ProjectModalList({projects}:{projects:ProjectItem[]}){
 const domains=useMemo(()=>Array.from(new Set(projects.map(domain))),[projects]);
 const [activeDomain,setActiveDomain]=useState("ALL OPERATIONS");
 const [query,setQuery]=useState("");
 const [active,setActive]=useState<ProjectItem|null>(null);
 const [scanning,setScanning]=useState(false);
 const filtered=useMemo(()=>projects.filter(project=>{
  const domainMatch=activeDomain==="ALL OPERATIONS"||domain(project)===activeDomain;
  const haystack=[project.title,project.summary,project.status,...project.skills].join(" ").toLowerCase();
  return domainMatch&&(!query.trim()||haystack.includes(query.trim().toLowerCase()));
 }),[projects,activeDomain,query]);

 const syncUrl=(slug?:string)=>{const url=new URL(window.location.href);if(slug)url.searchParams.set("mission",slug);else url.searchParams.delete("mission");window.history.replaceState({},"",`${url.pathname}${url.search}${url.hash}`);};
 const open=(project:ProjectItem)=>{setScanning(true);window.setTimeout(()=>{setActive(project);syncUrl(project.slug);setScanning(false);window.scrollTo({top:0,behavior:"smooth"});},240);};
 const close=()=>{setScanning(true);window.setTimeout(()=>{setActive(null);syncUrl();setScanning(false);},180);};
 useEffect(()=>{const slug=new URLSearchParams(window.location.search).get("mission");if(slug){const found=projects.find(project=>project.slug===slug);if(found)setActive(found);}},[projects]);

 const telemetry={
  total:projects.length,
  active:projects.filter(project=>project.status==="ongoing").length,
  repositories:projects.filter(project=>project.repository).length,
  technologies:new Set(projects.flatMap(project=>project.skills)).size
 };

 return <div className={`projectOps ${active?"isReading":"isBoard"}`}>
  {scanning&&<div className="projectOpsScan" aria-hidden="true"><i/><span>SCANNING MISSION DATA...</span></div>}
  {active?<article className="projectOpsReader">
   <header className="projectOpsReaderHead"><button type="button" onClick={close}>← BACK TO PROJECT BOARD</button><span>MISSION DATA LOADED</span></header>
   <div className="projectOpsStatusLine"><span>{domain(active)}</span><b className={active.status==="ongoing"?"isActive":""}>{displayStatus(active.status)}</b><time>{period(active)}</time></div>
   <h1>{active.title}</h1>
   {active.summary&&<p className="projectOpsLead">{active.summary}</p>}
   <div className="projectOpsTelemetry projectOpsReaderTelemetry">
    <div><span>MISSION TYPE</span><strong>{active.careerId?"CAREER":active.trainingId?"TRAINING":"INDEPENDENT"}</strong></div>
    <div><span>TECH STACK</span><strong>{String(active.skills.length).padStart(2,"0")}</strong></div>
    <div><span>REPOSITORY</span><strong>{active.repository?"LINKED":"LOCAL RECORD"}</strong></div>
    <div><span>PRIORITY</span><strong>{active.featured?"FEATURED":"STANDARD"}</strong></div>
   </div>
   <div className="projectOpsTags">{active.skills.map(skill=><em key={`${active.slug}:${skill}`}>{skill}</em>)}</div>
   {active.repository&&<a className="projectOpsRepository" href={active.repository} target="_blank" rel="noreferrer"><span>EXTERNAL REPOSITORY</span><b>OPEN GITHUB ↗</b></a>}
   <div className="projectOpsBody"><article className="markdown"><MarkdownRenderer>{active.markdown}</MarkdownRenderer></article></div>
  </article>:<>
   <div className="projectOpsTelemetry" aria-label="Project operations summary">
    <div><span>TOTAL MISSIONS</span><strong>{String(telemetry.total).padStart(2,"0")}</strong></div>
    <div><span>ACTIVE</span><strong>{String(telemetry.active).padStart(2,"0")}</strong></div>
    <div><span>REPOSITORIES</span><strong>{String(telemetry.repositories).padStart(2,"0")}</strong></div>
    <div><span>TECHNOLOGIES</span><strong>{String(telemetry.technologies).padStart(2,"0")}</strong></div>
   </div>
   <div className="projectOpsToolbar">
    <div><span>MISSION OPERATIONS</span><b>{filtered.length} TARGETS DETECTED</b></div>
    <label><span>SEARCH</span><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search mission, stack, status..."/></label>
   </div>
   <div className="projectOpsFilters" role="group" aria-label="Project domain filter">
    {["ALL OPERATIONS",...domains].map(item=><button type="button" key={item} className={activeDomain===item?"active":""} aria-pressed={activeDomain===item} onClick={()=>setActiveDomain(item)}>{item}<small>{item==="ALL OPERATIONS"?projects.length:projects.filter(project=>domain(project)===item).length}</small></button>)}
   </div>
   {filtered.length?<div className="projectOpsBoard">
    <div className="projectOpsBoardHead"><span>ID</span><span>STATUS</span><span>DOMAIN</span><span>MISSION / STACK</span><span>DATE</span><span>OPEN</span></div>
    {filtered.map((project,index)=><button type="button" className="projectOpsRow" key={project.slug} onClick={()=>open(project)}>
     <span>{String(index+1).padStart(3,"0")}</span>
     <b className={project.status==="ongoing"?"isActive":""}>{displayStatus(project.status)}</b>
     <span>{domain(project)}</span>
     <span className="projectOpsIdentity"><strong>{project.title}</strong><small>{project.skills.slice(0,5).join(" / ")}</small></span>
     <time>{project.startDate.replaceAll("-", ".")}</time><i>＋</i>
    </button>)}
   </div>:<div className="projectOpsEmpty">NO MISSION RECORDS DETECTED</div>}
  </>}
 </div>;
}
