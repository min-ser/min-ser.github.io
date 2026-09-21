"use client";

import { useEffect, useMemo, useState } from "react";

const modes: Record<string,{label:string;nodes:string[]}> = {
  "00": {label:"AI FIELD MAP",nodes:["Problem","Data","Learning","Model","Inference","Decision"]},
  "01": {label:"MATH MOTION LAB",nodes:["Input Vector","Transform","Dot Product","Gradient","Update","Result"]},
  "02": {label:"DATA PIPELINE LAB",nodes:["Raw Data","Clean","Encode","Split","Train","Validate"]},
  "03": {label:"LEARNING LOOP",nodes:["Samples","Features","Model","Prediction","Error","Learn"]},
  "04": {label:"ALGORITHM LAB",nodes:["Data","Boundary","Fit","Predict","Compare","Generalize"]},
  "05": {label:"EVALUATION LAB",nodes:["Prediction","Threshold","TP / FP","FN / TN","Metric","Decision"]},
  "06": {label:"NEURAL SIGNAL LAB",nodes:["Input","Weight","Sum","Activation","Layer","Output"]},
  "07": {label:"TRAINING LOOP LAB",nodes:["Forward","Loss","Gradient","Backward","Update","Repeat"]},
  "08": {label:"ARCHITECTURE FLOW",nodes:["Input","Encoder","Features","State","Decoder","Output"]},
  "09": {label:"VISION PIPELINE",nodes:["Pixels","Kernel","Feature Map","Pooling","Head","Class"]},
  "10": {label:"NLP PIPELINE",nodes:["Text","Token","Vocabulary","Embedding","Model","Meaning"]},
  "11": {label:"ATTENTION LAB",nodes:["Token","Query","Key","Score","Softmax","Value"]},
  "12": {label:"TRANSFORMER SIGNAL",nodes:["Tokens","Embedding","Attention","Add & Norm","FFN","Output"]},
  "13": {label:"LANGUAGE MODEL FLOW",nodes:["Context","Tokens","Hidden State","Logits","Probability","Next Token"]},
  "14": {label:"LLM GENERATION LOOP",nodes:["Prompt","Tokens","Transformer ×N","Logits","Sample","Append"]},
  "15": {label:"LLM TRAINING FLOW",nodes:["Dataset","Objective","Forward","Loss","Update","Aligned Model"]},
  "16": {label:"VECTOR SEARCH LAB",nodes:["Text","Embedding","Vector","Similarity","Top-K","Result"]},
  "17": {label:"RAG PIPELINE LAB",nodes:["Question","Embed","Retrieve","Rerank","Context","Answer"]},
  "18": {label:"CONTEXT LAB",nodes:["System","Instruction","Examples","Context","Prompt","Output"]},
  "19": {label:"AGENT LOOP LAB",nodes:["Goal","Plan","Tool","Observation","Memory","Next Action"]},
  "20": {label:"MULTIMODAL FLOW",nodes:["Text","Image / Audio","Encoder","Shared Space","Model","Response"]},
  "21": {label:"GENERATION LAB",nodes:["Noise / Latent","Condition","Model","Denoise","Decode","Sample"]},
  "22": {label:"AI SERVING FLOW",nodes:["Request","Gateway","Queue","Model","Cache","Response"]},
  "23": {label:"INFERENCE PERFORMANCE",nodes:["Tokens","Batch","KV Cache","GPU","Decode","Stream"]},
  "24": {label:"MLOPS / LLMOPS LOOP",nodes:["Data","Experiment","Evaluate","Registry","Deploy","Monitor"]},
  "25": {label:"AI SECURITY PATH",nodes:["Input","Guard","Identity","Model / Tool","Output Guard","Audit"]},
  "26": {label:"MODERN AI STACK",nodes:["App","Agent / RAG","Model","AI Runtime","Data","Compute"]},
  "27": {label:"BUILD IT YOURSELF",nodes:["Concept","Formula","Code","Run","Visualize","Explain"]},
  "28": {label:"RESEARCH FRONTIER",nodes:["Question","Paper","Hypothesis","Experiment","Result","Next Idea"]},
};

export default function DynamicConceptLab({code,title,keyPoints}:{code:string;title:string;keyPoints:string[]}) {
  const chapter = code.split(".")[0];
  const config = modes[chapter] ?? modes["00"];
  const [step,setStep] = useState(0);
  const [strength,setStrength] = useState(65);
  const [playing,setPlaying] = useState(false);

  useEffect(()=>{
    if(!playing) return;
    const id = window.setInterval(()=>setStep(v=>(v+1)%config.nodes.length),850);
    return ()=>window.clearInterval(id);
  },[playing,config.nodes.length]);

  const explanation = useMemo(()=>{
    const point = keyPoints[step % Math.max(1,keyPoints.length)];
    return point || `${config.nodes[step]} 단계가 전체 흐름에서 어떻게 연결되는지 관찰합니다.`;
  },[keyPoints,step,config.nodes]);

  return <section className="dynamic-concept-lab" aria-label={`${title} interactive visualization`}>
    <div className="dynamic-lab-head">
      <div><span>INTERACTIVE CONCEPT LAB</span><strong>{config.label}</strong></div>
      <div className="dynamic-lab-actions">
        <button type="button" onClick={()=>setStep(v=>(v-1+config.nodes.length)%config.nodes.length)}>←</button>
        <button type="button" className="lab-primary" onClick={()=>setPlaying(v=>!v)}>{playing ? "PAUSE" : "PLAY FLOW"}</button>
        <button type="button" onClick={()=>setStep(v=>(v+1)%config.nodes.length)}>→</button>
      </div>
    </div>

    <div className="signal-stage">
      <svg viewBox="0 0 900 250" role="img" aria-label={`${title} concept flow`}>
        <defs><marker id={`arrow-${code.replace('.','-')}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" className="lab-arrow"/></marker></defs>
        {config.nodes.slice(0,-1).map((_,i)=>{
          const x1=80+i*145, x2=80+(i+1)*145;
          return <line key={i} x1={x1+38} y1="110" x2={x2-38} y2="110" className={i < step ? "lab-link passed":"lab-link"} markerEnd={`url(#arrow-${code.replace('.','-')})`}/>;
        })}
        {config.nodes.map((node,i)=>{
          const x=80+i*145; const active=i===step;
          return <g key={node} className={active?"lab-node active":i<step?"lab-node passed":"lab-node"} onClick={()=>setStep(i)} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==="Enter"||e.key===" ") setStep(i)}}>
            <circle cx={x} cy="110" r={active?36:30}/>
            <text x={x} y="114" textAnchor="middle">{String(i+1).padStart(2,"0")}</text>
            <text x={x} y="168" textAnchor="middle" className="lab-node-label">{node}</text>
          </g>;
        })}
        <circle className="signal-pulse" cx={80+step*145} cy="110" r={42 + strength/18}/>
      </svg>
    </div>

    <div className="dynamic-lab-console">
      <div><span>CURRENT STAGE</span><strong>{step+1} / {config.nodes.length} · {config.nodes[step]}</strong><p>{explanation}</p></div>
      <label><span>SIGNAL / EFFECT</span><strong>{strength}%</strong><input type="range" min="10" max="100" value={strength} onChange={e=>setStrength(Number(e.target.value))}/></label>
    </div>
    <div className="lab-hint">노드를 클릭하거나 PLAY FLOW를 눌러 정보가 어떻게 이동하는지 단계별로 확인하세요. 슬라이더는 시각적 영향도를 조절합니다.</div>
  </section>;
}
