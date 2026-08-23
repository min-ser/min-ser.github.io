import Link from "next/link";
import { steps } from "@/data/steps";
export default function Learn(){
  return <section className="section">
    <div className="section-title"><div><div className="eyebrow">ROADMAP</div><h2>AI의 큰 그림부터 내부 계산까지</h2></div><div className="muted">Foundation + 16 Interactive Steps</div></div>
    <Link className="card" href="/learn/foundation/" style={{display:"block",marginBottom:20}}><div className="n">START HERE · FOUNDATION MAP</div><h3>AI → ML → DL → Neural Network → Transformer → LLM</h3><p>AI라는 추상적인 개념부터 전체 관계를 먼저 이해합니다. 무엇을 지금 알아야 하고 무엇을 나중에 깊게 볼지도 안내합니다.</p><div className="status current">RECOMMENDED START</div></Link>
    <div className="grid steps">
      {steps.map(s=><Link className="card" key={s.id} href={`/learn/${s.slug}/`}><div className="n">STEP {String(s.id).padStart(2,"0")} · {s.group}</div><h3>{s.title}</h3><p>{s.subtitle}</p><div className={`status ${s.status}`}>{s.status==="current"?"INTERACTIVE":s.status==="completed"?"COMPLETED":"VISUAL PREVIEW"}</div></Link>)}
    </div>
  </section>
}
