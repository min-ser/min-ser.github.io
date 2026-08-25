"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { curriculum,curriculumPhases,getCurrentCurriculum } from "@/data/curriculum";
export default function GlobalLearningFlow(){
 const pathname=usePathname(); if(!pathname.startsWith("/learn/")) return null;
 const current=getCurrentCurriculum(pathname); const idx=current?curriculum.findIndex(x=>x.id===current.id):-1; const progress=idx>=0?Math.round(((idx+1)/curriculum.length)*100):0;
 return <section className="global-learning-flow">
  <div className="global-flow-head"><div><div className="eyebrow">GLOBAL LEARNING FLOW</div><strong>전체 학습 경로</strong><span className="global-current">{current?`${String(current.order).padStart(2,"0")} ${current.title} · ${current.korean}`:"학습 로드맵"}</span></div>
  <div className="global-progress"><span>전체 학습률</span><div className="global-progress-bar"><i style={{width:`${progress}%`}}/></div><b>{progress}%</b></div></div>
  <div className="global-phase-row">{curriculumPhases.map(phase=>{const items=curriculum.filter(x=>x.phase===phase); const last=items[items.length-1]; const active=current?.phase===phase; const lastIdx=curriculum.findIndex(x=>x.id===last.id); const completed=idx>=lastIdx; return <div key={phase} className={`global-phase ${active?"active":""} ${completed?"completed":""}`}><span>{phase}</span><small>{String(items[0].order).padStart(2,"0")}–{String(last.order).padStart(2,"0")}</small></div>})}</div>
  <div className="global-step-scroll">{curriculum.map((item,i)=><div className="global-step-item" key={item.id}><Link href={item.route} className={`global-step-card ${current?.id===item.id?"active":""} ${idx>i?"done":""}`}><span>{String(item.order).padStart(2,"0")}</span><strong>{item.title}</strong><small>{item.korean}</small></Link>{i<curriculum.length-1&&<div className="global-step-arrow">→</div>}</div>)}</div>
 </section>
}
