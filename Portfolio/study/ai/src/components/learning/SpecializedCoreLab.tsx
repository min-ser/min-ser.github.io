"use client";
import { useMemo, useState } from "react";
import { NeuralSignalLab, WeightUpdateLab, OptimizerLab, ConvolutionLab, RnnLab } from "./DeepLearningLabs";

type P={code:string;title:string};
const clamp=(v:number,a:number,b:number)=>Math.max(a,Math.min(b,v));

function VectorLab(){
 const [x,setX]=useState(3),[y,setY]=useState(2),[bx,setBx]=useState(1),[by,setBy]=useState(4);
 const dot=x*bx+y*by, mag=Math.sqrt(x*x+y*y), bmag=Math.sqrt(bx*bx+by*by), cos=dot/(mag*bmag||1);
 const sx=(v:number)=>150+v*28, sy=(v:number)=>145-v*28;
 return <div className="special-lab"><div className="special-grid"><svg viewBox="0 0 320 290" className="special-svg"><line x1="20" y1="145" x2="300" y2="145"/><line x1="150" y1="15" x2="150" y2="275"/><line className="vector-a" x1="150" y1="145" x2={sx(x)} y2={sy(y)}/><circle className="vector-a" cx={sx(x)} cy={sy(y)} r="6"/><line className="vector-b" x1="150" y1="145" x2={sx(bx)} y2={sy(by)}/><circle className="vector-b" cx={sx(bx)} cy={sy(by)} r="6"/><text x="22" y="28">A = ({x}, {y})</text><text x="22" y="50">B = ({bx}, {by})</text></svg><div className="special-controls"><h4>VECTOR PLAYGROUND</h4><label>A.x <input type="range" min="-4" max="4" value={x} onChange={e=>setX(+e.target.value)}/><b>{x}</b></label><label>A.y <input type="range" min="-4" max="4" value={y} onChange={e=>setY(+e.target.value)}/><b>{y}</b></label><label>B.x <input type="range" min="-4" max="4" value={bx} onChange={e=>setBx(+e.target.value)}/><b>{bx}</b></label><label>B.y <input type="range" min="-4" max="4" value={by} onChange={e=>setBy(+e.target.value)}/><b>{by}</b></label><div className="formula-box">A·B = {x}×{bx} + {y}×{by} = <strong>{dot}</strong><br/>cos θ = <strong>{cos.toFixed(3)}</strong></div></div></div></div>
}
function GradientLab(){
 const [x,setX]=useState(4),[lr,setLr]=useState(.15); const loss=x*x, grad=2*x, next=clamp(x-lr*grad,-5,5);
 return <div className="special-lab"><div className="special-grid"><svg viewBox="0 0 360 260" className="special-svg"><path d="M25 225 Q180 -190 335 225" className="loss-curve"/><line x1="180" y1="20" x2="180" y2="235"/><line x1="20" y1="225" x2="340" y2="225"/><circle className="gradient-dot" cx={180+x*30} cy={225-loss*8} r="8"/><circle className="next-dot" cx={180+next*30} cy={225-next*next*8} r="7"/><text x="22" y="28">Loss = x²</text><text x="22" y="50">현재 x={x.toFixed(1)} → 다음 x={next.toFixed(2)}</text></svg><div className="special-controls"><h4>GRADIENT DESCENT</h4><label>현재 x <input type="range" min="-4" max="4" step="0.1" value={x} onChange={e=>setX(+e.target.value)}/><b>{x.toFixed(1)}</b></label><label>Learning Rate <input type="range" min="0.01" max="0.8" step="0.01" value={lr} onChange={e=>setLr(+e.target.value)}/><b>{lr.toFixed(2)}</b></label><div className="formula-box">Loss={loss.toFixed(2)}<br/>Gradient=2x=<strong>{grad.toFixed(2)}</strong><br/>x′ = x − η∇L = <strong>{next.toFixed(2)}</strong></div></div></div></div>
}
function RegressionLab(){
 const [m,setM]=useState(1),[b,setB]=useState(0); const pts=[[1,2],[2,2.8],[3,4.2],[4,5.1],[5,5.8]]; const mse=pts.reduce((s,[x,y])=>s+(y-(m*x+b))**2,0)/pts.length;
 const X=(x:number)=>35+x*50,Y=(y:number)=>235-y*30;
 return <div className="special-lab"><div className="special-grid"><svg viewBox="0 0 340 270" className="special-svg"><line x1="25" y1="235" x2="320" y2="235"/><line x1="35" y1="20" x2="35" y2="245"/>{pts.map(([x,y],i)=><g key={i}><line className="error-line" x1={X(x)} y1={Y(y)} x2={X(x)} y2={Y(m*x+b)}/><circle className="data-dot" cx={X(x)} cy={Y(y)} r="6"/></g>)}<line className="reg-line" x1={X(0)} y1={Y(b)} x2={X(5.5)} y2={Y(m*5.5+b)}/></svg><div className="special-controls"><h4>LINEAR REGRESSION</h4><label>Slope m <input type="range" min="0" max="2" step="0.05" value={m} onChange={e=>setM(+e.target.value)}/><b>{m.toFixed(2)}</b></label><label>Bias b <input type="range" min="-2" max="3" step="0.1" value={b} onChange={e=>setB(+e.target.value)}/><b>{b.toFixed(1)}</b></label><div className="formula-box">ŷ = mx+b<br/>MSE = <strong>{mse.toFixed(3)}</strong><br/><small>선을 움직여 오차선이 가장 짧아지는 위치를 찾아보세요.</small></div></div></div></div>
}
function ClassificationLab(){
 const [threshold,setThreshold]=useState(.5); const rows=[{p:.92,y:1},{p:.78,y:1},{p:.62,y:0},{p:.48,y:1},{p:.31,y:0},{p:.12,y:0}]; let tp=0,fp=0,tn=0,fn=0; rows.forEach(r=>{const pred=r.p>=threshold?1:0;if(pred&&r.y)tp++;else if(pred)fp++;else if(r.y)fn++;else tn++;}); const precision=tp/(tp+fp||1),recall=tp/(tp+fn||1);
 return <div className="special-lab"><div className="special-grid"><div className="prob-stack">{rows.map((r,i)=><div className="prob-row" key={i}><span>sample {i+1}</span><div><i style={{width:`${r.p*100}%`}}/><em style={{left:`${threshold*100}%`}}/></div><b>{r.p.toFixed(2)} / y={r.y}</b></div>)}</div><div className="special-controls"><h4>CLASSIFICATION THRESHOLD</h4><label>Threshold <input type="range" min="0.05" max="0.95" step="0.05" value={threshold} onChange={e=>setThreshold(+e.target.value)}/><b>{threshold.toFixed(2)}</b></label><div className="matrix-mini"><span>TP <b>{tp}</b></span><span>FP <b>{fp}</b></span><span>FN <b>{fn}</b></span><span>TN <b>{tn}</b></span></div><div className="formula-box">Precision <strong>{precision.toFixed(2)}</strong> · Recall <strong>{recall.toFixed(2)}</strong></div></div></div></div>
}
export default function SpecializedCoreLab({code,title}:P){
 if(code.startsWith("06.")) return <NeuralSignalLab/>;
 if(["07.01","07.02","07.03","07.04","07.05","07.09","07.19"].includes(code)) return <WeightUpdateLab/>;
 if(["07.06","07.07","07.08"].includes(code)) return <OptimizerLab/>;
 if(["08.02","08.03","08.04"].includes(code)) return <ConvolutionLab/>;
 if(["08.05","08.06","08.07","08.08","08.09","08.10","08.11","08.15"].includes(code)) return <RnnLab/>;
 if(["01.02","01.03","01.04","01.05","01.06","01.07","01.08"].includes(code)) return <VectorLab/>;
 if(["01.13","01.14","01.15","01.16","07.03","07.04","07.05"].includes(code)) return <GradientLab/>;
 if(["03.05","04.01","05.02"].includes(code)) return <RegressionLab/>;
 if(["03.06","05.03","05.04","05.05","05.06","05.07"].includes(code)) return <ClassificationLab/>;
 return null;
}
