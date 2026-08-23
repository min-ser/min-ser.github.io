"use client";
import { useState } from "react";
import Link from "next/link";
import { foundationPath } from "@/data/foundationPath";

export default function FoundationMap(){
  const [selected,setSelected]=useState("ai");
  const node=foundationPath.find(n=>n.id===selected)!;

  const pos:Record<string,[number,number]>={
    ai:[360,45], ml:[260,125], dl:[230,205], nn:[105,285], cnn:[230,285], rnn:[355,285],
    transformer:[485,285], llm:[520,365], genai:[470,125], rag:[430,445], agent:[610,445]
  };

  const edges:[string,string][]=[
    ["ai","ml"],["ml","dl"],["dl","nn"],["dl","cnn"],["dl","rnn"],["dl","transformer"],
    ["transformer","llm"],["ai","genai"],["llm","rag"],["llm","agent"]
  ];

  return <div className="foundation-map-grid">
    <section className="sim-card">
      <div className="sim-toolbar"><span>AI CONCEPT MAP</span><span className="live-dot">● CLICK A NODE</span></div>
      <div className="foundation-canvas">
        <svg viewBox="0 0 720 500" className="foundation-svg" role="img" aria-label="AI 개념 관계도">
          {edges.map(([a,b])=>{
            const [x1,y1]=pos[a], [x2,y2]=pos[b];
            return <line key={`${a}-${b}`} className="foundation-edge" x1={x1} y1={y1} x2={x2} y2={y2}/>;
          })}
          {foundationPath.map(n=>{
            const [x,y]=pos[n.id] ?? [350,250];
            const active=n.id===selected;
            return <g key={n.id} onClick={()=>setSelected(n.id)} className="foundation-node" tabIndex={0}
              onKeyDown={e=>{if(e.key==="Enter"||e.key===" ")setSelected(n.id)}}>
              <circle cx={x} cy={y} r={active?30:25} className={active?"map-node active":"map-node"}/>
              <text x={x} y={y+4} textAnchor="middle" className="map-label">{n.title==="Artificial Intelligence"?"AI":n.title==="Machine Learning"?"ML":n.title==="Deep Learning"?"DL":n.title==="Neural Network"?"NN":n.title==="Large Language Model"?"LLM":n.title==="Generative AI"?"GenAI":n.title}</text>
            </g>
          })}
        </svg>
      </div>
    </section>

    <aside className="inspector foundation-inspector">
      <div className="eyebrow">YOU SELECTED</div>
      <h3>{node.title}</h3>
      <div className="korean-title">{node.korean}</div>
      <p>{node.description}</p>
      <div className={`priority ${node.priority.toLowerCase()}`}>{node.priority}</div>
      <div className="inspector-section"><strong>왜 알아야 하나?</strong><p>{node.why}</p></div>
      <div className="inspector-section"><strong>어디에 쓰이나?</strong><div className="topic-row">{node.usedFor.map(x=><span className="chip" key={x}>{x}</span>)}</div></div>
      <Link className="btn primary full" href={node.route}>이 개념 학습하기 →</Link>
    </aside>
  </div>
}
