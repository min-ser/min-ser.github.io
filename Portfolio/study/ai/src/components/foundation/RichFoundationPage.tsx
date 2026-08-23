"use client";
import { useState } from "react";
import { foundationPath } from "@/data/foundationPath";
import { foundationDetails, type DetailTab } from "@/data/foundationDetails";
import FoundationProgress from "./FoundationProgress";
import FoundationSidebar from "./FoundationSidebar";
import FoundationRightInspector from "./FoundationRightInspector";
import FoundationMap from "./FoundationMap";

const tabLabels:Record<DetailTab,string>={
  overview:"개요", detail:"상세 개념", math:"수학적 기초", history:"역사와 발전", examples:"실제 사례"
};

function DeepLearningVisual(){
  return <div className="dl-overview-visual">
    <div className="dl-inputs"><div>🐶</div><div>🐱</div><div>...</div></div>
    <div className="dl-network">
      <div className="dl-col">{[0,1,2,3].map(i=><span key={i}/>)}</div>
      <div className="dl-lines">⇢ ⇢ ⇢</div>
      <div className="dl-col purple">{[0,1,2].map(i=><span key={i}/>)}</div>
      <div className="dl-lines">⇢ ⇢</div>
      <div className="dl-col green">{[0,1,2].map(i=><span key={i}/>)}</div>
    </div>
    <div className="dl-outputs"><div>개</div><div>고양이</div><div>...</div></div>
  </div>
}

export default function RichFoundationPage({id}:{id:string}){
  const [tab,setTab]=useState<DetailTab>("overview");
  const n=foundationPath.find(x=>x.id===id)!;
  const d=foundationDetails[id];

  return <div className="foundation-learning-page">
    <FoundationProgress currentId={id}/>
    <div className="foundation-3col">
      <FoundationSidebar currentId={id}/>

      <main className="foundation-center">
        <div className="rich-title">
          <div className="step-no">{String(n.order).padStart(2,"0")}</div>
          <h1>{n.title}</h1>
          <h2>{n.korean}</h2>
          <p>{n.description}</p>
        </div>

        <div className="foundation-tabs">
          {(Object.keys(tabLabels) as DetailTab[]).map(t=><button key={t} onClick={()=>setTab(t)} className={tab===t?"active":""}>{tabLabels[t]}</button>)}
        </div>

        {id==="dl"&&tab==="overview"&&<section className="rich-card">
          <div className="rich-card-title">핵심 한눈에 보기</div>
          <DeepLearningVisual/>
          <p>Deep Learning은 여러 Hidden Layer를 쌓아 입력 데이터에서 복잡한 특징을 단계적으로 자동 학습합니다.</p>
        </section>}

        <section className="rich-card">
          <div className="rich-card-title">{tabLabels[tab]}</div>
          <div className="rich-paragraphs">{(d?.tabs[tab] ?? [n.description]).map((x,i)=><p key={i}>{x}</p>)}</div>
        </section>

        {d?.comparisons&&tab==="overview"&&<section className="rich-card">
          <div className="rich-card-title">{d.comparisons.title}</div>
          <div className="comparison-table">
            <div className="comparison-row head">{d.comparisons.headers.map(x=><div key={x}>{x}</div>)}</div>
            {d.comparisons.rows.map((r,i)=><div className="comparison-row" key={i}>{r.map((x,j)=><div key={j}>{x}</div>)}</div>)}
          </div>
        </section>}

        {(id==="dl"||id==="ai"||id==="ml")&&<section className="rich-card">
          <div className="rich-card-title">AI 개념 관계도</div>
          <div className="embedded-map"><FoundationMap/></div>
        </section>}
      </main>

      <FoundationRightInspector id={id}/>
    </div>
  </div>
}
