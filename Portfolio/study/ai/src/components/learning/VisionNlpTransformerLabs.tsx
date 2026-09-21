"use client";
import { useState } from "react";

function ImageTensorLab(){
 const [channel,setChannel]=useState(0); const names=["R","G","B"];
 const pixels=[[[240,80,60],[70,190,90],[40,90,220]],[[210,150,60],[30,120,210],[200,70,160]],[[80,210,190],[180,90,50],[120,160,230]]];
 return <div className="special-lab"><div className="special-grid"><div className="tensor-explorer"><div className="tensor-image">{pixels.flat().map((p,i)=><span key={i} style={{background:`rgb(${p[0]},${p[1]},${p[2]})`}} title={`RGB(${p.join(',')})`}/>)}</div><div className="pixel-grid tensor-channel">{pixels.flat().map((p,i)=><span key={i}>{p[channel]}</span>)}</div></div><div className="special-controls"><h4>IMAGE → TENSOR</h4><label>Channel <input type="range" min="0" max="2" value={channel} onChange={e=>setChannel(+e.target.value)}/><b>{names[channel]}</b></label><div className="formula-box">Image shape = <strong>3 × 3 × 3</strong><br/>현재 {names[channel]} channel의 3×3 값을 분리해 보고 있습니다.<br/><small>색상 이미지는 결국 숫자 배열로 모델에 입력됩니다.</small></div></div></div></div>
}
function DetectionLab(){
 const [shift,setShift]=useState(0); const gt={x:70,y:55,w:150,h:110}, pr={x:95+shift,y:70,w:145,h:105};
 const ix=Math.max(0,Math.min(gt.x+gt.w,pr.x+pr.w)-Math.max(gt.x,pr.x)); const iy=Math.max(0,Math.min(gt.y+gt.h,pr.y+pr.h)-Math.max(gt.y,pr.y)); const inter=ix*iy, union=gt.w*gt.h+pr.w*pr.h-inter, iou=inter/union;
 return <div className="special-lab"><div className="special-grid"><svg viewBox="0 0 340 230" className="special-svg"><rect x="20" y="20" width="300" height="185" rx="12" className="vision-frame"/><circle cx="170" cy="115" r="42" className="vision-object"/><rect x={gt.x} y={gt.y} width={gt.w} height={gt.h} className="gt-box"/><rect x={pr.x} y={pr.y} width={pr.w} height={pr.h} className="pred-box"/><text x="72" y="48">GROUND TRUTH</text><text x={pr.x+4} y={pr.y+18}>PRED</text></svg><div className="special-controls"><h4>DETECTION / IoU</h4><label>Prediction X <input type="range" min="-60" max="80" value={shift} onChange={e=>setShift(+e.target.value)}/><b>{shift}</b></label><div className="formula-box">IoU = Intersection / Union<br/><strong>{iou.toFixed(3)}</strong><br/><small>예측 Box를 움직이며 겹침 정도가 어떻게 평가되는지 확인하세요.</small></div></div></div></div>
}
function TokenizerLab(){
 const [mode,setMode]=useState(1); const text="NeuralScope learns attention";
 const tokens=mode===0?text.split(" "):mode===1?["Neural","Scope"," learns"," atten","tion"]:Array.from(text.replaceAll(" ","␠"));
 return <div className="special-lab"><div className="special-grid"><div className="token-demo"><div className="raw-text">{text}</div><div className="token-arrow">↓ TOKENIZE</div><div className="token-list">{tokens.map((t,i)=><span key={i}><b>{i+101}</b>{t}</span>)}</div></div><div className="special-controls"><h4>TOKENIZER</h4><label>Unit <input type="range" min="0" max="2" value={mode} onChange={e=>setMode(+e.target.value)}/><b>{["WORD","SUBWORD","CHAR"][mode]}</b></label><div className="formula-box">Token count = <strong>{tokens.length}</strong><br/>Text → Token → Token ID<br/><small>분할 단위가 작을수록 vocabulary 부담은 줄지만 sequence는 길어집니다.</small></div></div></div></div>
}
function EmbeddingLab(){
 const [dim,setDim]=useState(0); const words=[{w:"cat",x:78,y:72},{w:"dog",x:105,y:92},{w:"car",x:260,y:165},{w:"truck",x:285,y:145},{w:"kitten",x:62,y:110}];
 return <div className="special-lab"><div className="special-grid"><svg viewBox="0 0 350 230" className="special-svg"><line x1="25" y1="205" x2="330" y2="205"/><line x1="35" y1="20" x2="35" y2="215"/>{words.map((p,i)=><g key={p.w}><circle className={i===dim?'embedding-dot active':'embedding-dot'} cx={p.x} cy={p.y} r="8"/><text x={p.x+10} y={p.y+4}>{p.w}</text></g>)}</svg><div className="special-controls"><h4>EMBEDDING SPACE</h4><label>Focus <input type="range" min="0" max="4" value={dim} onChange={e=>setDim(+e.target.value)}/><b>{words[dim].w}</b></label><div className="formula-box">가까운 Vector는 학습된 표현 공간에서 더 관련된 문맥/의미를 가질 수 있습니다.<br/><small>실제 embedding은 2차원이 아니라 수백~수천 차원일 수 있습니다.</small></div></div></div></div>
}
function AttentionLab(){
 const [focus,setFocus]=useState(1); const tokens=["The","cat","chased","mouse"]; const base=[[.55,.18,.12,.15],[.12,.52,.18,.18],[.08,.42,.15,.35],[.10,.24,.18,.48]]; const row=base[focus];
 return <div className="special-lab"><div className="special-grid"><div className="attention-demo"><div className="attention-query">QUERY <strong>{tokens[focus]}</strong></div><div className="attention-bars">{tokens.map((t,i)=><div key={t}><span>{t}</span><i style={{width:`${row[i]*100}%`}}/><b>{row[i].toFixed(2)}</b></div>)}</div><div className="attention-formula">QKᵀ / √d → Softmax → Σ(weight × V)</div></div><div className="special-controls"><h4>ATTENTION WEIGHTS</h4><label>Query token <input type="range" min="0" max="3" value={focus} onChange={e=>setFocus(+e.target.value)}/><b>{tokens[focus]}</b></label><div className="formula-box">각 막대는 현재 Query가 각 Key/Value를 얼마나 참고하는지 나타냅니다.<br/>Σ weights = <strong>{row.reduce((a,b)=>a+b,0).toFixed(2)}</strong></div></div></div></div>
}
function TransformerFlowLab(){
 const stages=["TOKEN","EMBED + POS","ATTENTION","ADD & NORM","FFN","ADD & NORM","LOGITS"]; const [step,setStep]=useState(2);
 const next=()=>setStep(s=>(s+1)%stages.length);
 return <div className="special-lab"><div className="special-grid"><div className="transformer-pipeline">{stages.map((s,i)=><div className={i===step?'active':i<step?'passed':''} key={s}><span>{String(i+1).padStart(2,'0')}</span><b>{s}</b>{i<stages.length-1&&<i>→</i>}</div>)}</div><div className="special-controls"><h4>TRANSFORMER DATA FLOW</h4><label>Stage <input type="range" min="0" max={stages.length-1} value={step} onChange={e=>setStep(+e.target.value)}/><b>{step+1}/{stages.length}</b></label><button type="button" className="lab-step-button" onClick={next}>NEXT STAGE</button><div className="formula-box">현재: <strong>{stages[step]}</strong><br/><small>Token 표현이 Attention과 FFN을 통과하면서 문맥화되는 전체 경로를 따라가세요.</small></div></div></div></div>
}
export default function VisionNlpTransformerLabs({code}:{code:string}){
 if(["09.01","09.02"].includes(code)) return <ImageTensorLab/>;
 if(["09.09","09.10","09.11"].includes(code)) return <DetectionLab/>;
 if(["10.04","10.05","10.06","10.07"].includes(code)) return <TokenizerLab/>;
 if(["10.11","10.12"].includes(code)) return <EmbeddingLab/>;
 if(code.startsWith("11.")) return <AttentionLab/>;
 if(code.startsWith("12.")) return <TransformerFlowLab/>;
 return null;
}
