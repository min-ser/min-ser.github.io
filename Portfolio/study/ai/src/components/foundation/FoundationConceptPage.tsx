import Link from "next/link";
import { getFoundationNode, foundationPath } from "@/data/foundationPath";

export default function FoundationConceptPage({id}:{id:string}){
  const n=getFoundationNode(id);
  if(!n) return null;
  const idx=foundationPath.findIndex(x=>x.id===id);
  const prev=foundationPath[idx-1], next=foundationPath[idx+1];

  return <article className="foundation-page">
    <div className="eyebrow">AI FOUNDATION · {n.priority}</div>
    <h1>{n.title}</h1>
    <h2>{n.korean}</h2>
    <p className="foundation-lead">{n.description}</p>

    <section className="foundation-section why-card">
      <div className="concept-label">WHY SHOULD I KNOW THIS?</div>
      <h3>왜 알아야 하나?</h3>
      <p>{n.why}</p>
    </section>

    <section className="foundation-section">
      <div className="concept-label">WHERE IS IT USED?</div>
      <h3>어디에 사용되나?</h3>
      <div className="use-grid">{n.usedFor.map(x=><div className="use-item" key={x}>{x}</div>)}</div>
    </section>

    <section className="foundation-section">
      <div className="concept-label">HOW DEEP SHOULD I GO NOW?</div>
      <h3>지금은 어디까지 알아야 하나?</h3>
      <div className="depth-list">{n.needNow.map((x,i)=><div key={x}><span>✓</span>{x}</div>)}</div>
      <div className="depth-note">수학적 증명이나 세부 구현은 필요해지는 Step에서 다시 내려갑니다.</div>
    </section>

    <section className="foundation-section">
      <div className="concept-label">WHAT COMES NEXT?</div>
      <h3>이후 어떤 개념으로 연결되나?</h3>
      <div className="topic-row">{n.later.map(x=><span className="chip" key={x}>{x}</span>)}</div>
    </section>

    <div className="step-nav">
      <div>{prev&&<Link href={prev.route}>← {prev.title}</Link>}</div>
      <div>{next&&<Link href={next.route}>{next.title} →</Link>}</div>
    </div>
  </article>
}
