import type { Step } from "@/types/learning";

function NetworkSvg({reverse=false}:{reverse?:boolean}){
  const a=[[90,70],[90,150],[90,230]], b=[[320,50],[320,115],[320,180],[320,245]], c=[[550,95],[550,195]];
  return <svg className="visual-svg" viewBox="0 0 650 300">
    {a.flatMap(([x1,y1])=>b.map(([x2,y2],i)=><line key={`a${y1}${i}`} className="wire" x1={reverse?x2:x1} y1={reverse?y2:y1} x2={reverse?x1:x2} y2={reverse?y1:y2}/>))}
    {b.flatMap(([x1,y1])=>c.map(([x2,y2],i)=><line key={`b${y1}${i}`} className={i===0?"wire hot":"wire"} x1={reverse?x2:x1} y1={reverse?y2:y1} x2={reverse?x1:x2} y2={reverse?y1:y2}/>))}
    {a.map(([x,y],i)=><circle key={`aa${i}`} className="node" cx={x} cy={y} r="15"/>)}
    {b.map(([x,y],i)=><circle key={`bb${i}`} className={i===1?"node hot":"node"} cx={x} cy={y} r="16"/>)}
    {c.map(([x,y],i)=><circle key={`cc${i}`} className={i===0?"node hot":"node"} cx={x} cy={y} r="16"/>)}
    <text x="55" y="280">INPUT</text><text x="280" y="280">HIDDEN</text><text x="525" y="280">OUTPUT</text>
  </svg>
}

export default function StepVisualPreview({step}:{step:Step}){
  let visual:React.ReactNode;

  if(step.visual==="layer" || step.visual==="network" || step.visual==="forward") visual=<NetworkSvg/>;
  else if(step.visual==="backprop") visual=<NetworkSvg reverse/>;
  else if(step.visual==="matrix") visual=<div>
    <div className="matrix">{[.2,.8,-.3,.1,.4,.7,.9,.3,.1].map((v,i)=><div key={i} className={`cell ${i===4?"hot":""}`}>{v}</div>)}</div>
    <div className="preview-note">강조된 Cell처럼 행렬의 각 값이 입력 Vector와 곱해져 다음 Layer 값을 만듭니다.</div>
  </div>;
  else if(step.visual==="loss") visual=<svg className="chart-svg" viewBox="0 0 620 280">
    <line className="axis" x1="50" y1="230" x2="580" y2="230"/><line className="axis" x1="50" y1="40" x2="50" y2="230"/>
    <path className="curve" d="M60 70 C170 95 260 130 350 170 S500 215 565 222"/>
    <circle className="dot" cx="160" cy="92" r="6"/><circle cx="505" cy="216" r="6" fill="#75e6ad"/>
    <text x="120" y="70">큰 Loss</text><text x="475" y="195">작은 Loss</text>
  </svg>;
  else if(step.visual==="gradient" || step.visual==="optimizer") visual=<svg className="chart-svg" viewBox="0 0 620 280">
    <path d="M50 70 C160 210 270 235 360 150 S500 80 580 185" fill="none" stroke="#395063" strokeWidth="3"/>
    <circle className="dot" cx="155" cy="175" r="7"/><line x1="155" y1="175" x2="245" y2="215" stroke="#58d9ff" strokeWidth="5"/>
    <text x="110" y="145">현재 Weight</text><text x="245" y="238">Loss가 줄어드는 방향</text>
  </svg>;
  else if(step.visual==="training") visual=<svg className="chart-svg" viewBox="0 0 620 280">
    <line className="axis" x1="60" y1="230" x2="580" y2="230"/><line className="axis" x1="60" y1="40" x2="60" y2="230"/>
    <path className="curve" d="M65 60 C160 115 180 145 260 160 S390 200 560 220"/>
    <text x="470" y="250">Epoch →</text><text x="15" y="55">Loss</text>
  </svg>;
  else if(step.visual==="token") visual=<div className="token-row">{["I","love","AI","→","[102]","[541]","[893]"].map((t,i)=><div key={i} className={`token ${i===2||i===6?"hot":""}`}>{t}</div>)}</div>;
  else if(step.visual==="transformer") visual=<div style={{display:"grid",gap:12,width:"min(520px,100%)"}}>
    {["Embedding","Self Attention","+ Residual","Feed Forward","+ Residual"].map((x,i)=><div key={x} className={`card ${i===1?"hot":""}`} style={{textAlign:"center"}}>{x}</div>)}
  </div>;
  else if(step.visual==="attention") visual=<div>
    <div className="token-row">{["The","capital","of","Korea","is"].map((t,i)=><div className={`token ${i===3?"hot":""}`} key={t}>{t}</div>)}</div>
    <svg className="visual-svg" viewBox="0 0 650 210"><path d="M80 170 Q325 20 550 170" fill="none" stroke="#58d9ff" strokeWidth="5"/><path d="M190 170 Q350 70 550 170" fill="none" stroke="#8a7dff" strokeWidth="3"/><text x="250" y="90">Attention Strength</text></svg>
  </div>;
  else if(step.visual==="llm") visual=<div style={{display:"grid",gridTemplateColumns:"repeat(5,minmax(0,1fr))",gap:8,width:"100%"}}>
    {["TEXT","TOKEN","EMBED","TRANSFORMER","NEXT TOKEN"].map((x,i)=><div key={x} className="card" style={{textAlign:"center"}}><div className="n">0{i+1}</div><h3>{x}</h3></div>)}
  </div>;
  else visual=<NetworkSvg/>;

  return <div className="sim-grid">
    <section className="sim-card">
      <div className="sim-toolbar"><span>{step.title.toUpperCase()} VISUAL PREVIEW</span><span>SCHEMATIC</span></div>
      <div className="preview-wrap">{visual}</div>
    </section>
    <aside className="inspector">
      <div className="eyebrow">PLANNED INTERACTION</div><h3>이 Step에서 직접 보게 될 것</h3>
      <div className="topic-row">{step.topics.map(t=><span className="chip" key={t}>{t}</span>)}</div>
      <div className="explain">
        이 페이지는 단순한 Coming Soon 문서가 아니라, 앞으로 구현될 핵심 시각화의 형태를 미리 보여주는 임시 Simulation 페이지입니다.
      </div>
    </aside>
  </div>
}
