"use client";
import {useMemo,useState} from "react";
import MarkdownDetailModal,{MarkdownModalDocument} from "@/components/content/MarkdownDetailModal";

export type TimelineProject={id:string;slug:string;title:string;startDate:string;endDate?:string|null;status?:string;skills:string[];markdown:string;};
export type TimelineCareer={kind?:"career"|"training";id:string;slug:string;company:string;position:string;startDate:string;endDate?:string|null;status?:string;roles:string[];skills:string[];markdown:string;projects:TimelineProject[];collapsed?:boolean;};
export type TimelineConfig={timelineTitle:string;timelineDescription:string;presentLabel:string;projectLabel:string;emptyProjectLabel:string;careerModalSourceLabel:string;trainingModalSourceLabel:string;projectModalSourceLabel:string;modalCloseLabel:string;careerDetailLabel:string;trainingDetailLabel:string;projectDetailLabel:string;careerBadgeLabel:string;trainingBadgeLabel:string;filterCareerLabel:string;filterTrainingLabel:string;};

function period(start:string,end:string|null|undefined,status:string|undefined,present:string){return `${start.replaceAll("-",".")} — ${end?end.replaceAll("-","."):status==="ongoing"?present:""}`;}
function duration(start:string,end:string|null|undefined,status:string|undefined){
 const from=new Date(start);const to=end?new Date(end):status==="ongoing"?new Date():from;
 if(Number.isNaN(from.getTime())||Number.isNaN(to.getTime()))return "—";
 const months=Math.max(0,(to.getFullYear()-from.getFullYear())*12+to.getMonth()-from.getMonth());
 const years=Math.floor(months/12),rest=months%12;
 return [years?`${years}Y`:"",rest?`${rest}M`:""].filter(Boolean).join(" ")||"< 1M";
}

export default function CareerTimeline({careers,config}:{careers:TimelineCareer[];config:TimelineConfig}){
 const [modal,setModal]=useState<{doc:MarkdownModalDocument;detailLabel:string}|null>(null);
 const [includeTraining,setIncludeTraining]=useState(false);
 const [switching,setSwitching]=useState(false);
 const [showHiddenCareers,setShowHiddenCareers]=useState(false);
 const hiddenCareerCount=careers.filter(c=>c.kind!=="training"&&c.collapsed===true).length;
 const disclosureFiltered=showHiddenCareers?careers:careers.filter(c=>c.kind==="training"||c.collapsed!==true);
 const visibleCareers=includeTraining?disclosureFiltered:disclosureFiltered.filter(c=>c.kind!=="training");
 const intelligence=useMemo(()=>({careers:careers.filter(c=>c.kind!=="training").length,trainings:careers.filter(c=>c.kind==="training").length,projects:careers.reduce((total,c)=>total+c.projects.length,0),technologies:new Set(careers.flatMap(c=>c.skills)).size}),[careers]);
 const changeMode=(next:boolean)=>{if(next===includeTraining)return;setSwitching(true);window.setTimeout(()=>{setIncludeTraining(next);setSwitching(false);},180);};
 const openCareer=(c:TimelineCareer)=>{const training=c.kind==="training";setModal({detailLabel:training?config.trainingDetailLabel:config.careerDetailLabel,doc:{slug:c.slug,title:c.company,subtitle:c.position,period:period(c.startDate,c.endDate,c.status,config.presentLabel),markdown:c.markdown,detailHref:training?"/training":`/career/${c.slug}`,sourceLabel:training?config.trainingModalSourceLabel:config.careerModalSourceLabel}});};
 const openProject=(p:TimelineProject)=>setModal({detailLabel:config.projectDetailLabel,doc:{slug:p.slug,title:p.title,period:period(p.startDate,p.endDate,p.status,config.presentLabel),markdown:p.markdown,detailHref:`/projects/${p.slug}`,sourceLabel:config.projectModalSourceLabel}});

 return <div className="careerIntelligence">
  <div className="careerTimelineIntro">
   <div><span>CAREER INTELLIGENCE / {config.timelineTitle}</span><p>{config.timelineDescription}</p></div>
   <div className={`careerTimelineFilter ${includeTraining?"showTraining":"careerOnly"}`} role="group" aria-label="Career timeline filter">
    <button type="button" className={!includeTraining?"isActive":""} aria-pressed={!includeTraining} onClick={()=>changeMode(false)}>{config.filterCareerLabel}</button>
    <button type="button" className={includeTraining?"isActive":""} aria-pressed={includeTraining} onClick={()=>changeMode(true)}>{config.filterTrainingLabel}</button>
   </div>
  </div>
  <div className="careerTimelineViewport">
   {switching&&<div className="careerIntelligenceScan" aria-hidden="true"><i/><span>REFRESHING CAREER DATA...</span></div>}
   <div className="careerTimeline" key={includeTraining?"career-training":"career-only"}>
    {visibleCareers.map((career,careerIndex)=><article className="careerTimelineNode" key={career.id}>
     <div className="careerTimelineRail"><span>{String(careerIndex+1).padStart(2,"0")}</span></div>
     <div className="careerTimelineContent">
      <button className="careerTimelineCompany" type="button" onClick={()=>openCareer(career)}>
       <span className="careerTimelinePeriod">{period(career.startDate,career.endDate,career.status,config.presentLabel)}</span><strong>{career.company}</strong>
       <span className={`careerTimelineKind ${career.kind==="training"?"isTraining":"isCareer"}`}>{career.kind==="training"?config.trainingBadgeLabel:config.careerBadgeLabel}</span>
       <em>{career.position}</em><span className="careerTimelineDuration">{duration(career.startDate,career.endDate,career.status)}</span>
       {career.roles.length>0&&<small>{career.roles.join(" · ")}</small>}
      </button>
      <div className="careerTimelineProjects"><div className="careerTimelineProjectsHead"><span>{config.projectLabel}</span><b>{career.projects.length}</b></div>
       {career.projects.length===0?<p className="careerTimelineEmpty">{config.emptyProjectLabel}</p>:career.projects.map((project,projectIndex)=><button className="careerProjectNode" type="button" onClick={()=>openProject(project)} key={project.id}>
        <span className="careerProjectIndex">{String(projectIndex+1).padStart(2,"0")}</span><span className="careerProjectPeriod">{period(project.startDate,project.endDate,project.status,config.presentLabel)}</span><strong>{project.title}</strong>{project.skills.length>0&&<small>{project.skills.slice(0,5).join(" / ")}</small>}
       </button>)}
      </div>
     </div>
    </article>)}
   </div>
  </div>
  {hiddenCareerCount>0&&<div className="resumeHiddenRecordControl careerHiddenRecordControl">
   <button type="button" className="resumeHiddenRecordToggle" aria-expanded={showHiddenCareers} onClick={()=>setShowHiddenCareers(v=>!v)}>
    <span aria-hidden="true">{showHiddenCareers?"−":"+"}</span>
    {showHiddenCareers?`HIDE ${hiddenCareerCount} HIDDEN ${hiddenCareerCount===1?"RECORD":"RECORDS"}`:`SHOW ${hiddenCareerCount} HIDDEN ${hiddenCareerCount===1?"RECORD":"RECORDS"}`}
   </button>
  </div>}
  <MarkdownDetailModal item={modal?.doc??null} closeLabel={config.modalCloseLabel} detailLabel={modal?.detailLabel??""} onClose={()=>setModal(null)}/>
 </div>;
}
