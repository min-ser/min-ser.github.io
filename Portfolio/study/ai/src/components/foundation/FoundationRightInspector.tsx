import { foundationPath } from "@/data/foundationPath";
import { foundationDetails } from "@/data/foundationDetails";

export default function FoundationRightInspector({id}:{id:string}){
  const n=foundationPath.find(x=>x.id===id)!;
  const d=foundationDetails[id];

  return <aside className="foundation-rightbar">
    <div className="eyebrow">선택한 개념</div>
    <h3>{n.title}</h3>
    <div className="korean-title">{n.korean}</div>
    <div className={`priority ${n.priority.toLowerCase()}`}>{n.priority}</div>

    <details open><summary>정의 (What is it?)</summary><p>{n.description}</p></details>
    <details open><summary>왜 알아야 하나? (Why?)</summary><p>{n.why}</p></details>
    <details open><summary>어디에 사용되나? (Where used?)</summary>
      <ul>{n.usedFor.map(x=><li key={x}>{x}</li>)}</ul>
    </details>
    <details open><summary>지금은 어디까지 알아야 하나? (How deep?)</summary>
      {d&&<><div className="depth-meter"><span>권장 이해도: {d.recommendedDepth}%</span><div><i style={{width:`${d.recommendedDepth}%`}}/></div></div>
      <ul className="check-list">{d.checklist.map(x=><li key={x}>✓ {x}</li>)}</ul></>}
    </details>
    {d&&<details open><summary>다음에는 무엇을 배우나? (Next)</summary><p>→ {d.next}</p></details>}
    {d&&<div className="related-panel"><div className="left-title">관련 개념</div><div className="topic-row">{d.related.map(x=><span className="chip" key={x}>{x}</span>)}</div></div>}
  </aside>
}
