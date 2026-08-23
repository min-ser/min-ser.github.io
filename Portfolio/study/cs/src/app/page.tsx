import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { curriculum } from "@/data/curriculum";
import { getAllConcepts } from "@/lib/curriculum";

export default function HomePage() {
  const concepts = getAllConcepts();

  return (
    <AppShell>
      <section className="hero">
        <div className="eyebrow">CS STUDY FOUNDATION / v0.1.0</div>
        <h1>Computer Science를<br />밑바닥부터 다시 연결한다.</h1>
        <p>
          지금은 내용을 외우는 단계가 아니라, 무엇을 어떤 순서로 배워야 하는지
          전체 지도를 먼저 완성하는 단계입니다.
        </p>

        <div className="hero-actions">
          <Link href="/roadmap/" className="primary-button">전체 Roadmap 보기</Link>
          <Link href="/orientation/" className="secondary-button">학습 시작점 보기</Link>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card"><strong>{curriculum.length}</strong><span>Domains</span></div>
        <div className="stat-card"><strong>{concepts.length}</strong><span>Concept Routes</span></div>
        <div className="stat-card"><strong>0%</strong><span>Content Filled</span></div>
        <div className="stat-card"><strong>0.1.0</strong><span>Foundation Version</span></div>
      </section>

      <section>
        <div className="section-heading">
          <span>CURRICULUM</span>
          <h2>전체 학습 영역</h2>
        </div>

        <div className="domain-grid">
          {curriculum.map((domain) => (
            <Link href={`/${domain.id}/`} key={domain.id} className="domain-card">
              <span className="domain-card-number">{String(domain.order).padStart(2, "0")}</span>
              <div>
                <div className="milestone-tag">{domain.milestone}</div>
                <h3>{domain.title}</h3>
                <p>{domain.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
