"use client";
import { useMemo, useState } from "react";

function RagPipelineLab(){
  const [query,setQuery]=useState("How does RAG reduce hallucination?"); const [k,setK]=useState(3); const [rerank,setRerank]=useState(true);
  const docs=[
    {id:"A",text:"RAG retrieves external evidence before generation.",score:.91},
    {id:"B",text:"Grounding asks the model to answer from supplied context.",score:.84},
    {id:"C",text:"Reranking can improve the order of retrieved candidates.",score:.73},
    {id:"D",text:"Chunk size changes retrieval granularity and recall.",score:.61},
    {id:"E",text:"Temperature changes the token sampling distribution.",score:.29},
  ];
  const ranked=useMemo(()=>[...docs].sort((a,b)=>(rerank?(b.score+(b.id==='B'?.08:0)):(b.score-a.score))-(rerank?(a.score+(a.id==='B'?.08:0)):0)).slice(0,k),[k,rerank]);
  return <div className="special-lab"><div className="rag-flow-strip">{['QUERY','EMBED','RETRIEVE','RERANK','CONTEXT','LLM','ANSWER'].map((x,i)=><div key={x}><b>{x}</b>{i<6&&<span>→</span>}</div>)}</div><div className="special-grid"><div className="rag-docs"><div className="rag-query">Q · {query}</div>{ranked.map((d,i)=><div className="rag-doc" key={d.id}><b>#{i+1} CHUNK {d.id}</b><span>{d.text}</span><em>{(d.score*100).toFixed(0)}%</em></div>)}<div className="rag-context"><b>CONTEXT ASSEMBLED</b><span>{ranked.map(d=>`[${d.id}] ${d.text}`).join(' ')}</span></div></div><div className="special-controls"><h4>RAG PIPELINE LAB</h4><label>Top-K <input type="range" min="1" max="5" value={k} onChange={e=>setK(+e.target.value)}/><b>{k}</b></label><label className="lab-toggle">Rerank <input type="checkbox" checked={rerank} onChange={e=>setRerank(e.target.checked)}/><b>{rerank?'ON':'OFF'}</b></label><input className="lab-text-input" value={query} onChange={e=>setQuery(e.target.value.slice(0,80))}/><div className="formula-box">Query → Vector → Top-K → {rerank?'Rerank → ':''}Context → LLM<br/><small>검색된 Chunk만 Context 후보가 됩니다. RAG 품질은 생성 모델뿐 아니라 검색·청킹·재랭킹 품질에 크게 좌우됩니다.</small></div></div></div></div>
}

function ContextBudgetLab(){
 const [system,setSystem]=useState(18),[history,setHistory]=useState(24),[retrieval,setRetrieval]=useState(42),[examples,setExamples]=useState(10); const max=100; const total=system+history+retrieval+examples; const output=Math.max(0,max-total);
 const parts=[['SYSTEM',system],['HISTORY',history],['RAG',retrieval],['EXAMPLES',examples],['OUTPUT',output]] as const;
 return <div className="special-lab"><div className="special-grid"><div><div className="budget-bar">{parts.map(([n,v])=><div key={n} className={`budget-${n.toLowerCase()}`} style={{width:`${Math.max(0,v)}%`}} title={`${n} ${v}`}>{v>8?n:''}</div>)}</div><div className="budget-legend">{parts.map(([n,v])=><span key={n}><b>{n}</b>{v}</span>)}</div>{total>max&&<div className="budget-warning">⚠ Context budget exceeded by {total-max}</div>}</div><div className="special-controls"><h4>CONTEXT BUDGET COMPOSER</h4>{[['System',system,setSystem],['History',history,setHistory],['Retrieved',retrieval,setRetrieval],['Examples',examples,setExamples]].map(([n,v,setter])=><label key={n as string}>{n as string}<input type="range" min="0" max="60" value={v as number} onChange={e=>(setter as (v:number)=>void)(+e.target.value)}/><b>{v as number}</b></label>)}<div className="formula-box">Input {total} / {max} · Output room {output}<br/><small>Context Engineering은 단순히 긴 Prompt를 쓰는 일이 아니라 제한된 Token 예산에 어떤 정보를 넣고 뺄지 결정하는 작업입니다.</small></div></div></div></div>
}

function AgentStateLab(){
 const stages=[['GOAL','사용자 목표 확인'],['PLAN','필요한 단계를 계획'],['TOOL','도구와 인자 선택'],['OBSERVE','도구 결과 관찰'],['DECIDE','추가 행동 여부 판단'],['ANSWER','최종 응답']];
 const [step,setStep]=useState(0),[failed,setFailed]=useState(false);
 const next=()=>setStep(s=>s>=stages.length-1?0:s+1);
 return <div className="special-lab"><div className="special-grid"><div className="agent-machine">{stages.map((s,i)=><button type="button" key={s[0]} className={i===step?'active':i<step?'passed':''} onClick={()=>setStep(i)}><b>{s[0]}</b><span>{s[1]}</span>{i<stages.length-1&&<i>↓</i>}</button>)}</div><div className="special-controls"><h4>AGENT STATE MACHINE</h4><button type="button" className="lab-step-button" onClick={next}>RUN NEXT STATE</button><label className="lab-toggle">Tool failure <input type="checkbox" checked={failed} onChange={e=>setFailed(e.target.checked)}/><b>{failed?'FAIL':'OK'}</b></label><div className="agent-console"><span>CURRENT</span><b>{stages[step][0]}</b><p>{failed&&step>=2&&step<5?'Tool error observed → retry, fallback, or ask for help.':stages[step][1]}</p></div><div className="formula-box">State + Observation → Next Action<br/><small>Agent는 LLM 자체와 동일한 개념이 아닙니다. 애플리케이션이 모델, Tool 실행, State, 종료 조건을 연결해 반복을 제어합니다.</small></div></div></div></div>
}

export default function RagPromptAgentLabs({code}:{code:string}){
 if(code.startsWith('17.')) return <RagPipelineLab/>;
 if(code.startsWith('18.')) return <ContextBudgetLab/>;
 if(code.startsWith('19.')) return <AgentStateLab/>;
 return null;
}
