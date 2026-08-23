"use client";
import { useMemo, useState } from "react";
import ConceptTerm from "@/components/concept/ConceptTerm";

export default function NeuronSimulation(){
  const [x1,setX1]=useState(.7),[x2,setX2]=useState(.3),[w1,setW1]=useState(.8),[w2,setW2]=useState(-.3),[bias,setBias]=useState(.12);
  const calc=useMemo(()=>{
    const p1=x1*w1,p2=x2*w2,z=p1+p2+bias;
    return {p1,p2,z};
  },[x1,x2,w1,w2,bias]);
  const strength=Math.min(1,Math.abs(calc.z));

  const c=(label:string,value:number,setter:(n:number)=>void,min=-1,max=1)=>(
    <div className="control"><label>{label}</label><input aria-label={label} type="range" min={min} max={max} step="0.01" value={value} onChange={e=>setter(Number(e.target.value))}/><output>{value.toFixed(2)}</output></div>
  );

  return <div className="sim-grid">
    <section className="sim-card">
      <div className="sim-toolbar"><span>LIVE NEURON</span><span className="live-dot">● REAL-TIME</span></div>
      <div className="sim-body">
        <svg className="visual-svg" viewBox="0 0 760 340" role="img" aria-label="입력 두 개가 가중치를 거쳐 뉴런으로 들어가는 시각화">
          <line className={`wire ${Math.abs(x1*w1)>.25?"hot":""}`} x1="145" y1="95" x2="520" y2="160"/>
          <line className={`wire ${Math.abs(x2*w2)>.25?"hot":""}`} x1="145" y1="245" x2="520" y2="180"/>
          <line className={`wire ${strength>.25?"hot":""}`} x1="575" y1="170" x2="695" y2="170"/>
          <circle className="node" cx="110" cy="95" r="25"/><text x="97" y="100">x₁</text>
          <circle className="node" cx="110" cy="245" r="25"/><text x="97" y="250">x₂</text>
          <circle className={`node ${strength>.35?"hot":""}`} cx="548" cy="170" r="38"/><text x="532" y="175">Σ</text>
          <circle className={`node ${strength>.15?"hot":""}`} cx="710" cy="170" r="22"/>
          <text x="210" y="105">× w₁ = {w1.toFixed(2)}</text>
          <text x="210" y="240">× w₂ = {w2.toFixed(2)}</text>
          <text x="500" y="245">bias = {bias.toFixed(2)}</text>
          <text x="680" y="220">z = {calc.z.toFixed(3)}</text>
        </svg>

        <div className="controls">
          {c("Input x₁",x1,setX1,0,1)}
          {c("Weight w₁",w1,setW1)}
          {c("Input x₂",x2,setX2,0,1)}
          {c("Weight w₂",w2,setW2)}
          {c("Bias",bias,setBias)}
        </div>

        <div className="calc">
          <h4>현재 발생한 계산 · <ConceptTerm id="weighted-sum">Weighted Sum</ConceptTerm></h4>
          <div className="formula">
            x₁ × w₁ = {x1.toFixed(2)} × {w1.toFixed(2)} = {calc.p1.toFixed(3)}{"\n"}
            x₂ × w₂ = {x2.toFixed(2)} × {w2.toFixed(2)} = {calc.p2.toFixed(3)}{"\n"}
            bias = {bias.toFixed(3)}{"\n"}
            ─────────────────────────{"\n"}
            weighted sum z = {calc.z.toFixed(3)}
          </div>
        </div>

        <div className="explain">
          슬라이더를 움직여 보세요. 선의 강조와 뉴런 상태가 실제 계산값과 함께 변합니다.
          이 단계의 핵심은 “AI 뉴런도 결국 입력값에 가중치를 곱하고 Bias를 더하는 계산 단위”라는 점을 눈으로 확인하는 것입니다.
        </div>
      </div>
    </section>

    <aside className="inspector">
      <div className="eyebrow">LIVE INSPECTOR</div><div className="concept-quick"><ConceptTerm id="input"/><ConceptTerm id="weight"/><ConceptTerm id="bias"/><ConceptTerm id="neuron"/></div>
      <h3>Neuron #1</h3>
      <div className="inspector-row"><span>x₁ contribution</span><strong>{calc.p1.toFixed(3)}</strong></div>
      <div className="inspector-row"><span>x₂ contribution</span><strong>{calc.p2.toFixed(3)}</strong></div>
      <div className="inspector-row"><span>Bias</span><strong>{bias.toFixed(3)}</strong></div>
      <div className="inspector-row"><span>Weighted Sum</span><strong>{calc.z.toFixed(3)}</strong></div>
      <div className="topic-row"><span className="chip">Input</span><span className="chip">Weight</span><span className="chip">Bias</span><span className="chip">Σ</span></div>
    </aside>
  </div>
}
