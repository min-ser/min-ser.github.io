import Link from "next/link";
export default function Lab(){
  const labs=[
    ["Neuron Lab","/learn/01-neuron/","실시간 Input / Weight / Bias"],
    ["Activation Lab","/learn/02-activation/","ReLU / Sigmoid / Tanh 비교"],
    ["Layer Lab","/learn/03-layer/","여러 뉴런 연결 Preview"],
    ["Network Visualizer","/learn/11-neural-visualizer/","전체 신경망 Preview"]
  ];
  return <section className="section"><div className="section-title"><div><div className="eyebrow">LAB</div><h2>개념을 직접 만져보는 공간</h2></div></div>
    <div className="grid steps">{labs.map(([t,h,d])=><Link key={t} href={h} className="card"><h3>{t}</h3><p>{d}</p></Link>)}</div>
  </section>
}
