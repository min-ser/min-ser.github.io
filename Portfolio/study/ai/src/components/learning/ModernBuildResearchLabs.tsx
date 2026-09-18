"use client";
import { useMemo, useState } from "react";

function ArchitectureLab(){
  const [mode,setMode]=useState<'rag'|'agent'|'multimodal'>('rag');
  const [priority,setPriority]=useState<'quality'|'cost'|'latency'>('quality');
  const [gateway,setGateway]=useState(true),[evalOn,setEvalOn]=useState(true),[secure,setSecure]=useState(true);
  const model=priority==='quality'?'Large Model':priority==='latency'?'Small/Fast Model':'Economy Model';
  const middle=mode==='rag'?['RETRIEVER','VECTOR DB','RERANKER']:mode==='agent'?['STATE','TOOL ROUTER','EXTERNAL API']:['VISION ENCODER','FUSION','TEXT MODEL'];
  return <div className="special-lab"><div className="special-grid"><div className="security-path"><div className="threat-source"><b>MODERN AI APPLICATION</b><span>{mode.toUpperCase()} · route → {model}</span></div><div className="security-nodes"><div><b>CLIENT</b><span>→</span></div>{gateway&&<div><b>AI GATEWAY</b><span>→</span></div>}{middle.map(x=><div key={x}><b>{x}</b><span>→</span></div>)}<div><b>{model}</b><span>→</span></div><div><b>RESPONSE</b></div></div><div className="audit-strip">{secure?'SECURITY BOUNDARY ✓':'SECURITY CONTROLS REDUCED'} · {evalOn?'EVALUATION + OBSERVABILITY ON':'EVALUATION OFF'}</div></div><div className="special-controls"><h4>AI ARCHITECTURE COMPOSER</h4><label>Application <select value={mode} onChange={e=>setMode(e.target.value as typeof mode)}><option value="rag">RAG</option><option value="agent">Agent</option><option value="multimodal">Multimodal</option></select></label><label>Router priority <select value={priority} onChange={e=>setPriority(e.target.value as typeof priority)}><option value="quality">Quality</option><option value="latency">Latency</option><option value="cost">Cost</option></select></label><label className="lab-toggle"><input type="checkbox" checked={gateway} onChange={e=>setGateway(e.target.checked)}/> AI Gateway</label><label className="lab-toggle"><input type="checkbox" checked={evalOn} onChange={e=>setEvalOn(e.target.checked)}/> Evaluation / Observability</label><label className="lab-toggle"><input type="checkbox" checked={secure} onChange={e=>setSecure(e.target.checked)}/> Security Boundary</label><div className="formula-box">모델 선택만으로 아키텍처가 끝나지 않습니다. 요청 경로에 검색·상태·Tool·정책·평가·관측 계층을 조합하고 각 경계의 책임을 분리합니다.</div></div></div></div>
}

function BuildLab(){
 const [step,setStep]=useState(0),[input,setInput]=useState(2),[weight,setWeight]=useState(1.5); const stages=['INPUT','IMPLEMENT','INTERMEDIATE','OUTPUT','TEST']; const z=input*weight+.5; const y=Math.max(0,z);
 const snippets=[`const x = ${input};`,`const z = x * ${weight.toFixed(1)} + 0.5;`,`z = ${z.toFixed(2)}`,`relu(z) = ${y.toFixed(2)}`,y>=0?'PASS: finite numeric output':'CHECK'];
 return <div className="special-lab"><div className="special-grid"><div className="ops-lifecycle"><div className="ops-track">{stages.map((s,i)=><button type="button" key={s} className={i===step?'active':i<step?'passed':''} onClick={()=>setStep(i)}><b>{s}</b><span>{i<step?'✓':i===step?'●':'○'}</span></button>)}</div><div className="formula-box"><strong>{stages[step]}</strong><pre style={{whiteSpace:'pre-wrap',marginTop:10}}>{snippets[step]}</pre></div></div><div className="special-controls"><h4>BUILD → TRACE → TEST</h4><label>Input x <input type="range" min="-4" max="4" step="0.5" value={input} onChange={e=>setInput(+e.target.value)}/><b>{input}</b></label><label>Weight w <input type="range" min="-3" max="3" step="0.5" value={weight} onChange={e=>setWeight(+e.target.value)}/><b>{weight}</b></label><button type="button" className="lab-step-button" onClick={()=>setStep(s=>(s+1)%stages.length)}>RUN NEXT STEP</button><div className="serving-metrics"><span>z = xw+b <b>{z.toFixed(2)}</b></span><span>ReLU(z) <b>{y.toFixed(2)}</b></span></div><div className="formula-box"><small>Chapter 27의 각 실습은 이 패턴을 확장해 Matrix → Attention → Transformer → Vector Search → RAG → Agent까지 직접 구현하는 방향입니다.</small></div></div></div></div>
}

function ResearchLab(){
 const [scale,setScale]=useState(4),[sparse,setSparse]=useState(false),[retrieval,setRetrieval]=useState(true); const loss=(2.4/Math.pow(scale,.28)).toFixed(2); const compute=Math.round(scale*scale*(sparse?.38:1));
 const evidence=useMemo(()=>[{k:'PARAM/DATA SCALE',v:`${scale}×`},{k:'RELATIVE LOSS*',v:loss},{k:'ATTENTION COMPUTE*',v:`${compute}`},{k:'EXTERNAL MEMORY',v:retrieval?'RETRIEVAL':'PARAMETERS ONLY'}],[scale,sparse,retrieval,loss,compute]);
 return <div className="special-lab"><div className="special-grid"><div className="inference-timeline"><div className="phase prefill"><b>HYPOTHESIS</b><span>규모·구조·외부 메모리를 바꾸면 어떤 trade-off가 생길까?</span><i style={{width:`${scale*10}%`}}/></div><div className="decode-track"><b>EXPERIMENT</b><div><span>baseline</span><span>change</span><span>measure</span><span>compare</span></div></div><div className="cache-rack"><strong>INTERPRET, DON'T MEMORIZE</strong><span>Benchmark 점수 하나보다 데이터·metric·baseline·비용·한계를 함께 확인합니다.</span></div></div><div className="special-controls"><h4>RESEARCH EVIDENCE EXPLORER</h4><label>Scale <input type="range" min="1" max="10" value={scale} onChange={e=>setScale(+e.target.value)}/><b>{scale}×</b></label><label className="lab-toggle"><input type="checkbox" checked={sparse} onChange={e=>setSparse(e.target.checked)}/> Sparse attention assumption</label><label className="lab-toggle"><input type="checkbox" checked={retrieval} onChange={e=>setRetrieval(e.target.checked)}/> Retrieval memory</label><div className="serving-metrics">{evidence.map(x=><span key={x.k}>{x.k}<b>{x.v}</b></span>)}</div><div className="formula-box"><small>* 개념 이해용 상대값이며 실제 Scaling Law나 모델 성능 예측값이 아닙니다. 연구 결과는 논문의 데이터, 실험 조건과 측정 방법을 함께 확인해야 합니다.</small></div></div></div></div>
}

export default function ModernBuildResearchLabs({code}:{code:string}){
 if(code.startsWith('26.')) return <ArchitectureLab/>;
 if(code.startsWith('27.')) return <BuildLab/>;
 if(code.startsWith('28.')) return <ResearchLab/>;
 return null;
}
