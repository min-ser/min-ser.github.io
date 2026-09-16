import Link from "next/link";
import { steps } from "@/data/steps";

export default function Home(){
  return <>
    <section className="hero">
      <div className="eyebrow">INTERACTIVE AI LEARNING LAB</div>
      <h1>NeuralScope</h1>
      <h2>See the numbers. Touch the model. Understand the flow.</h2>
      <p>AI 개념을 글로만 읽지 않고, 값이 실제로 움직이고 계산되는 모습을 직접 조작하며 이해하기 위한 동적 학습 웹 프로젝트입니다.</p>
      <div className="actions"><Link className="btn primary" href="/learn/foundation/">START FROM ZERO →</Link><Link className="btn" href="/learn/01-neuron/">NEURAL NETWORK PATH</Link><Link className="btn" href="/learn/13-transformer/">TRANSFORMER PATH</Link><Link className="btn" href="/lab/">LAB</Link></div>

      <div className="live-stage">
        <div className="stage-top"><span>NEURAL NETWORK / LIVE PREVIEW</span><span className="live-dot">● VISUAL FIRST</span></div>
        <div className="home-network">
          <svg viewBox="0 0 820 300">
            {[80,150,220].flatMap((y1)=>[55,115,175,235].map((y2,i)=><line key={`a${y1}${i}`} x1="100" y1={y1} x2="360" y2={y2}/>))}
            {[55,115,175,235].flatMap((y1)=>[95,190].map((y2,i)=><line key={`b${y1}${i}`} x1="360" y1={y1} x2="650" y2={y2}/>))}
            {[80,150,220].map((y,i)=><circle key={`l${i}`} cx="100" cy={y} r="12"/>)}
            {[55,115,175,235].map((y,i)=><circle key={`m${i}`} className={i===1?"active":""} cx="360" cy={y} r="13"/>)}
            {[95,190].map((y,i)=><circle key={`r${i}`} className={i===0?"active":""} cx="650" cy={y} r="13"/>)}
            <text x="55" y="275" fill="#8397ab">INPUT</text><text x="320" y="275" fill="#8397ab">HIDDEN</text><text x="620" y="275" fill="#8397ab">OUTPUT</text>
          </svg>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="section-title"><div><div className="eyebrow">STARTING POINT</div><h2>AI가 무엇인지부터 모르겠다면</h2></div><div className="muted">AI → ML → DL → NN → Transformer → LLM</div></div>
      <div className="card" style={{marginBottom:18}}><h3>AI Concept Map</h3><p>AI, Machine Learning, Deep Learning, Neural Network, Transformer, LLM의 관계를 먼저 시각적으로 확인하세요.</p><div className="actions" style={{justifyContent:"flex-start"}}><Link className="btn primary" href="/learn/foundation/">OPEN FOUNDATION MAP →</Link></div></div>
    </section>

    <section className="section">
      <div className="section-title"><div><div className="eyebrow">LEARNING JOURNEY</div><h2>시각화가 먼저, 설명은 그 다음</h2></div><div className="muted">Neuron부터 실제 계산</div></div>
      <div className="grid steps">
        {steps.slice(1,9).map(s=><Link className="card" key={s.id} href={`/learn/${s.slug}/`}><div className="n">STEP {String(s.id).padStart(2,"0")}</div><h3>{s.title}</h3><p>{s.subtitle}</p><div className={`status ${s.status}`}>{s.status==="current"?"INTERACTIVE":s.status==="completed"?"DONE":"VISUAL PREVIEW"}</div></Link>)}
      </div>
    </section>
  </>
}
