import { AppShell } from "@/components/layout/AppShell";
import { getAllConcepts } from "@/lib/curriculum";

export default function ProgressPage() {
  const total = getAllConcepts().length;

  return (
    <AppShell>
      <section className="page-hero compact">
        <div className="eyebrow">PROGRESS</div>
        <h1>Learning Progress</h1>
        <p>진행률 저장 기능은 콘텐츠 작성 전에 데이터 구조를 먼저 확정합니다.</p>
      </section>

      <div className="progress-panel">
        <div>
          <span>Concepts</span>
          <strong>0 / {total}</strong>
        </div>
        <div>
          <span>Completion</span>
          <strong>0%</strong>
        </div>
        <div>
          <span>Current Phase</span>
          <strong>Foundation Skeleton</strong>
        </div>
      </div>
    </AppShell>
  );
}
