"use client";
import { getConcept } from "@/data/concepts";

export default function ConceptModal({conceptId,onClose,onNavigate}:{conceptId:string;onClose:()=>void;onNavigate:(id:string)=>void}){
  const c=getConcept(conceptId);
  if(!c) return null;
  return <div className="modal-backdrop" onMouseDown={onClose}>
    <article className="concept-modal" role="dialog" aria-modal="true" aria-label={`${c.term} 개념 설명`} onMouseDown={e=>e.stopPropagation()}>
      <div className="modal-head">
        <div><div className="eyebrow">CONCEPT DEEP DIVE</div><h2>{c.term} <span>/ {c.korean}</span></h2><p>{c.oneLine}</p></div>
        <button className="modal-close" onClick={onClose}>×</button>
      </div>
      <div className="modal-scroll">
        <section className="concept-block featured"><h3>쉽게 말하면</h3><p>{c.beginner}</p></section>
        <section className="concept-block why"><div className="concept-label">WHY SHOULD I KNOW THIS?</div><h3>왜 알아야 하나?</h3><p>{c.why}</p></section>
        <section className="concept-block"><div className="concept-label">WHERE IS IT USED?</div><h3>어디에 사용되나?</h3><div className="use-grid">{c.uses.map(x=><div className="use-item" key={x}>{x}</div>)}</div></section>
        {c.simulation&&<section className="concept-block"><div className="concept-label">IN THIS SIMULATION</div><h3>지금 화면에서는?</h3><p>{c.simulation}</p></section>}
        {c.change&&<section className="concept-block"><h3>값이 바뀌면?</h3><p>{c.change}</p></section>}
        {c.training&&<section className="concept-block"><h3>학습과의 관계</h3><p>{c.training}</p></section>}
        {c.formula&&<section className="concept-block"><div className="concept-label">FORMULA</div><h3>수식으로 보면</h3><pre className="formula">{c.formula}{c.example?`\n\n예: ${c.example}`:""}</pre></section>}
        <section className="concept-block"><div className="concept-label">YOU WILL SEE THIS AGAIN</div><h3>나중에 어디서 다시 나오나?</h3><div className="use-grid">{c.later.map(x=><div className="use-item" key={x}>{x}</div>)}</div></section>
        <section className="concept-block"><h3>관련 개념</h3><div className="related-row">{c.related.filter(id=>getConcept(id)).map(id=><button key={id} onClick={()=>onNavigate(id)}>{getConcept(id)!.term} →</button>)}</div></section>
      </div>
    </article>
  </div>
}
