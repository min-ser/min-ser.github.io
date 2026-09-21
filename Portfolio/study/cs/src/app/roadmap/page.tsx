import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { curriculum } from "@/data/curriculum";

export default function RoadmapPage() {
  return (
    <AppShell>
      <section className="page-hero compact">
        <div className="eyebrow">ROADMAP</div>
        <h1>전체 CS Learning Path</h1>
        <p>v0.1.0에서는 모든 영역과 Route를 먼저 연결합니다.</p>
      </section>

      <div className="roadmap-list">
        {curriculum.map((domain) => (
          <Link href={`/${domain.id}/`} className="roadmap-item" key={domain.id}>
            <span>{String(domain.order).padStart(2, "0")}</span>
            <div>
              <small>{domain.milestone}</small>
              <strong>{domain.title}</strong>
              <p>{domain.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
