"use client";
import { useMemo, useState } from "react";

function MultimodalAlignmentLab(){
  const [image,setImage]=useState(1); const [text,setText]=useState(1);
  const images=[['CAT',[.92,.18]],['CITY',[.18,.82]],['WAVE',[.62,.66]]];
  const texts=[['a cat',[.88,.22]],['urban skyline',[.22,.78]],['ocean sound',[.65,.61]]];
  const a=images[image][1] as number[], b=texts[text][1] as number[];
  const sim=(a[0]*b[0]+a[1]*b[1])/(Math.hypot(...a)*Math.hypot(...b));
  return <div className="special-lab"><div className="special-grid"><div className="mm-space"><svg viewBox="0 0 320 250" aria-label="multimodal embedding space"><path d="M35 215H295M35 215V25"/><circle cx={35+a[0]*245} cy={215-a[1]*175} r="14" className="mm-image"/><circle cx={35+b[0]*245} cy={215-b[1]*175} r="11" className="mm-text"/><line x1={35+a[0]*245} y1={215-a[1]*175} x2={35+b[0]*245} y2={215-b[1]*175}/><text x="45" y="42">shared embedding space</text></svg></div><div className="special-controls"><h4>MULTIMODAL ALIGNMENT</h4><label>Image <select value={image} onChange={e=>setImage(+e.target.value)}>{images.map((x,i)=><option value={i} key={x[0] as string}>{x[0] as string}</option>)}</select></label><label>Text <select value={text} onChange={e=>setText(+e.target.value)}>{texts.map((x,i)=><option value={i} key={x[0] as string}>{x[0] as string}</option>)}</select></label><div className="formula-box">cos(image, text) = <strong>{sim.toFixed(3)}</strong><br/><small>서로 다른 Modality를 비교 가능한 공통 표현 공간으로 정렬하는 개념을 단순화한 실험입니다.</small></div></div></div></div>
}

function DiffusionLab(){
  const [step,setStep]=useState(7); const noise=step/10;
  const cells=useMemo(()=>Array.from({length:64},(_,i)=>{const x=i%8,y=Math.floor(i/8); const shape=(x>=2&&x<=5&&y>=2&&y<=5)?0.88:0.12; const pseudo=((i*37+step*17)%101)/100; return shape*(1-noise)+pseudo*noise}),[step,noise]);
  return <div className="special-lab"><div className="special-grid"><div className="diffusion-stage"><div className="diffusion-grid">{cells.map((v,i)=><span key={i} style={{opacity:.18+v*.82}}/>)}</div><div className="diffusion-arrow">NOISE {Math.round(noise*100)}% → DENOISE {Math.round((1-noise)*100)}%</div></div><div className="special-controls"><h4>DIFFUSION DENOISING</h4><label>Noise t <input type="range" min="0" max="10" value={step} onChange={e=>setStep(+e.target.value)}/><b>{step}/10</b></label><button type="button" className="lab-step-button" onClick={()=>setStep(s=>Math.max(0,s-1))}>DENOISE ONE STEP</button><div className="formula-box">xₜ → model predicts noise → xₜ₋₁<br/><small>실제 Diffusion 계산이 아니라 Noise에서 구조가 복원되는 방향을 이해하기 위한 개념 시각화입니다.</small></div></div></div></div>
}

function ServingLab(){
  const [requests,setRequests]=useState(8),[batch,setBatch]=useState(2),[workers,setWorkers]=useState(2);
  const rounds=Math.ceil(requests/Math.max(1,batch*workers)); const latency=70+batch*14+Math.max(0,rounds-1)*32; const throughput=(requests/(rounds*.12)).toFixed(1);
  return <div className="special-lab"><div className="special-grid"><div className="serving-flow"><div className="serving-requests">{Array.from({length:requests},(_,i)=><span key={i}>R{i+1}</span>)}</div><b>QUEUE</b><i>→</i><div className="serving-workers">{Array.from({length:workers},(_,i)=><span key={i}>GPU {i+1}<small>batch × {batch}</small></span>)}</div><i>→</i><b>RESPONSE</b></div><div className="special-controls"><h4>AI SERVING LOAD</h4><label>Requests <input type="range" min="1" max="16" value={requests} onChange={e=>setRequests(+e.target.value)}/><b>{requests}</b></label><label>Batch <input type="range" min="1" max="8" value={batch} onChange={e=>setBatch(+e.target.value)}/><b>{batch}</b></label><label>Workers <input type="range" min="1" max="4" value={workers} onChange={e=>setWorkers(+e.target.value)}/><b>{workers}</b></label><div className="serving-metrics"><span>ROUNDS <b>{rounds}</b></span><span>LATENCY* <b>{latency} ms</b></span><span>THROUGHPUT* <b>{throughput}/s</b></span></div><div className="formula-box"><small>* 교육용 상대 지표입니다. 실제 값은 모델·GPU·입력 길이·스케줄러 등에 따라 달라집니다.</small></div></div></div></div>
}

export default function MultimodalGenerativeSystemLabs({code}:{code:string}){
  if(code.startsWith('20.')) return <MultimodalAlignmentLab/>;
  if(code.startsWith('21.')) return <DiffusionLab/>;
  if(code.startsWith('22.')) return <ServingLab/>;
  return null;
}
