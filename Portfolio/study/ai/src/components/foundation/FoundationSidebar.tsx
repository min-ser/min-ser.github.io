import Link from "next/link";
import { foundationPath } from "@/data/foundationPath";

export default function FoundationSidebar({currentId}:{currentId:string}){
  return <aside className="foundation-leftbar">
    <div className="left-section">
      <div className="left-title">현재 학습 위치</div>
      <div className="path-switches">
        <Link className="path-switch blue" href="/learn/foundation/"><strong>🚀 START FROM ZERO</strong><small>AI 기초부터 차근차근</small></Link>
        <Link className="path-switch purple" href="/learn/01-neuron/"><strong>◉ NEURAL NETWORK PATH</strong><small>신경망 핵심 개념부터</small></Link>
        <Link className="path-switch green" href="/learn/13-transformer/"><strong>ϟ TRANSFORMER PATH</strong><small>Transformer와 LLM 중심</small></Link>
        <Link className="path-switch amber" href="/lab/"><strong>⌁ LAB</strong><small>직접 실험하고 이해하기</small></Link>
      </div>
    </div>

    <div className="left-section">
      <div className="left-title">AI 개념 지도</div>
      <nav className="foundation-nav-list">
        {foundationPath.map((n,i)=><Link key={n.id} href={n.route} className={`foundation-nav-link ${n.id===currentId?"active":""}`}>
          <span className="foundation-num">{String(i+1).padStart(2,"0")}</span>
          <span>{n.title}</span>
          <small className={`mini-priority ${n.priority.toLowerCase()}`}>{n.priority}</small>
        </Link>)}
      </nav>
    </div>

    <div className="left-section">
      <div className="left-title">학습 가이드</div>
      <p className="left-help">AI 학습의 전체 로드맵과 추천 학습 순서를 확인하세요.</p>
      <Link className="btn" href="/learn/">로드맵 보기 →</Link>
    </div>
  </aside>
}
