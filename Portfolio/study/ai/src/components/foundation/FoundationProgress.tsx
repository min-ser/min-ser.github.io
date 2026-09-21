import Link from "next/link";
import { foundationPath } from "@/data/foundationPath";

const coreIds=["ai","ml","dl","nn","transformer","llm"];

export default function FoundationProgress({currentId}:{currentId:string}){
  const core=coreIds.map(id=>foundationPath.find(n=>n.id===id)!).filter(Boolean);
  const idx=core.findIndex(n=>n.id===currentId);
  const progress=idx<0?0:Math.round(((idx+1)/core.length)*100);

  return <div className="foundation-progress-wrap">
    <div className="foundation-progress-track">
      {core.map((n,i)=><div className="progress-item" key={n.id}>
        <Link className={`progress-card ${n.id===currentId?"active":""}`} href={n.route}>
          <span>{String(i+1).padStart(2,"0")}</span>
          <strong>{n.title}</strong>
          <small>{n.korean}</small>
        </Link>
        {i<core.length-1&&<div className="progress-arrow">→</div>}
      </div>)}
    </div>
    <div className="progress-meter"><span>진행률</span><div><i style={{width:`${progress}%`}}/></div><b>{progress}%</b></div>
  </div>
}
