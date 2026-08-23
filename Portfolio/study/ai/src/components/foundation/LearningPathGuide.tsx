import Link from "next/link";
import { foundationPath } from "@/data/foundationPath";

export default function LearningPathGuide(){
  const core=foundationPath.filter(n=>["ai","ml","dl","nn","transformer","llm"].includes(n.id));
  return <section className="learning-path-guide">
    <div className="eyebrow">START FROM ZERO</div>
    <h2>AI가 너무 추상적이라면 이 순서로 보면 됩니다.</h2>
    <p className="muted">각 단계에서 “지금은 어디까지 알아야 하는가?”를 구분해서 과도하게 깊게 들어가지 않도록 안내합니다.</p>
    <div className="path-line">
      {core.map((n,i)=><div key={n.id} className="path-step">
        <Link href={n.route}><span>{String(i+1).padStart(2,"0")}</span><strong>{n.title}</strong><small>{n.korean}</small></Link>
        {i<core.length-1&&<div className="path-arrow">→</div>}
      </div>)}
    </div>
  </section>
}
