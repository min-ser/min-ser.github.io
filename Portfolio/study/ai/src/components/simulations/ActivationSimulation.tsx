"use client";
import { useMemo, useState } from "react";
import ConceptTerm from "@/components/concept/ConceptTerm";

const sigmoid=(x:number)=>1/(1+Math.exp(-x));
const tanh=(x:number)=>Math.tanh(x);
const relu=(x:number)=>Math.max(0,x);

function pathFor(fn:(x:number)=>number,yMin:number,yMax:number){
  const pts=[] as string[];
  for(let i=0;i<=120;i++){
    const x=-5+(10*i/120);
    const y=fn(x);
    const sx=50+(500*i/120);
    const sy=210-((y-yMin)/(yMax-yMin))*160;
    pts.push(`${i===0?"M":"L"} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
  }
  return pts.join(" ");
}

export default function ActivationSimulation(){
  const [x,setX]=useState(.8);
  const values=useMemo(()=>({relu:relu(x),sigmoid:sigmoid(x),tanh:tanh(x)}),[x]);
  const sx=50+((x+5)/10)*500;
  const sy=210-((Math.max(-1,Math.min(1,relu(x)))+1)/2)*160;

  return <div className="sim-grid">
    <section className="sim-card">
      <div className="sim-toolbar"><span>ACTIVATION LAB</span><span className="live-dot">● INTERACTIVE</span></div>
      <div className="sim-body">
        <svg className="chart-svg" viewBox="0 0 600 270" role="img" aria-label="Activation 함수 그래프">
          <line className="axis" x1="50" y1="210" x2="560" y2="210"/><line className="axis" x1="305" y1="35" x2="305" y2="235"/>
          <path className="curve" d={pathFor(relu,0,5)}/>
          <path className="curve2" d={pathFor(sigmoid,0,1)}/>
          <path d={pathFor(tanh,-1,1)} fill="none" stroke="#75e6ad" strokeWidth="2"/>
          <circle className="dot" cx={sx} cy={sy} r="5"/>
          <text x="470" y="55">ReLU</text><text x="470" y="78">Sigmoid</text><text x="470" y="101">Tanh</text>
        </svg>
        <div className="controls">
          <div className="control"><label>Input x</label><input aria-label="Activation input" type="range" min="-5" max="5" step=".01" value={x} onChange={e=>setX(Number(e.target.value))}/><output>{x.toFixed(2)}</output></div>
        </div>
        <div className="grid" style={{gridTemplateColumns:"repeat(3,minmax(0,1fr))",marginTop:18}}>
          <div className="card"><div className="n">ReLU</div><h3>{values.relu.toFixed(3)}</h3><p>음수는 0, 양수는 그대로 통과</p></div>
          <div className="card"><div className="n">Sigmoid</div><h3>{values.sigmoid.toFixed(3)}</h3><p>출력을 0~1 사이로 압축</p></div>
          <div className="card"><div className="n">Tanh</div><h3>{values.tanh.toFixed(3)}</h3><p>출력을 -1~1 사이로 압축</p></div>
        </div>
      </div>
    </section>
    <aside className="inspector">
      <div className="eyebrow">WHAT CHANGED?</div><div className="concept-quick"><ConceptTerm id="activation"/><ConceptTerm id="relu"/><ConceptTerm id="sigmoid"/><ConceptTerm id="tanh"/></div><h3>같은 입력, 다른 반응</h3>
      <div className="inspector-row"><span>Input</span><strong>{x.toFixed(3)}</strong></div>
      <div className="inspector-row"><span>ReLU</span><strong>{values.relu.toFixed(3)}</strong></div>
      <div className="inspector-row"><span>Sigmoid</span><strong>{values.sigmoid.toFixed(3)}</strong></div>
      <div className="inspector-row"><span>Tanh</span><strong>{values.tanh.toFixed(3)}</strong></div>
      <div className="explain">이 페이지는 이미 동적으로 작동합니다. 이후 학습할 때 설명과 구현 코드를 더 보강하면 됩니다.</div>
    </aside>
  </div>
}
