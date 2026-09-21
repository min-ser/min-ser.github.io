import { AppShell } from "@/components/layout/AppShell";
import { curriculum } from "@/data/curriculum";

export default function KnowledgeMapPage() {
  return (
    <AppShell>
      <section className="page-hero compact">
        <div className="eyebrow">KNOWLEDGE MAP</div>
        <h1>CS Knowledge Map</h1>
        <p>노드 간 선수지식·연관지식 그래프는 v0.1.x에서 계속 정교화합니다.</p>
      </section>

      <div className="knowledge-map-skeleton">
        {curriculum.map((domain) => (
          <div className="map-node" key={domain.id}>
            <span>{String(domain.order).padStart(2, "0")}</span>
            <strong>{domain.shortTitle}</strong>
            <small>{domain.milestone}</small>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
