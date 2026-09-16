import { notFound } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ContentPlaceholder } from "@/components/learning/ContentPlaceholder";
import { curriculum } from "@/data/curriculum";
import { getAllConcepts, getConcept, getConceptHref } from "@/lib/curriculum";

export function generateStaticParams() {
  return getAllConcepts().map(({ domain, concept }) => ({
    domain: domain.id,
    concept: concept.id,
  }));
}

export default async function ConceptPage({
  params,
}: {
  params: Promise<{ domain: string; concept: string }>;
}) {
  const { domain: domainId, concept: conceptId } = await params;
  const entry = getConcept(domainId, conceptId);
  if (!entry) notFound();

  const { domain, module, concept } = entry;
  const all = getAllConcepts();
  const index = all.findIndex(
    (item) => item.domain.id === domain.id && item.concept.id === concept.id
  );
  const prev = index > 0 ? all[index - 1] : undefined;
  const next = index < all.length - 1 ? all[index + 1] : undefined;

  return (
    <AppShell
      activeDomain={domain.id}
      activeConcept={concept.id}
      activeMilestone={domain.milestone}
    >
      <Breadcrumb domain={domain} module={module} concept={concept} />

      <section className="concept-hero">
        <div>
          <div className="eyebrow">{concept.level.toUpperCase()} · {concept.status.toUpperCase()}</div>
          <h1>{concept.title}</h1>
          <p>{concept.summary}</p>
        </div>
        <div className="concept-index">
          <strong>{index + 1}</strong>
          <span>/ {all.length}</span>
        </div>
      </section>

      <section className="learning-preview">
        <div className="preview-card">
          <span>선수 지식</span>
          <strong>v0.1.x에서 연결 관계 정교화 예정</strong>
        </div>
        <div className="preview-card">
          <span>실무 연결</span>
          <strong>개념별 Practical Link 구조 준비됨</strong>
        </div>
        <div className="preview-card">
          <span>콘텐츠 상태</span>
          <strong>Planned</strong>
        </div>
      </section>

      <ContentPlaceholder />

      <nav className="page-navigation">
        <div>
          {prev ? (
            <Link href={getConceptHref(prev.domain.id, prev.concept.id)}>
              <span>← PREVIOUS</span>
              <strong>{prev.concept.title}</strong>
            </Link>
          ) : <span />}
        </div>
        <div className="page-progress">
          {index + 1} / {all.length}
        </div>
        <div>
          {next ? (
            <Link href={getConceptHref(next.domain.id, next.concept.id)}>
              <span>NEXT →</span>
              <strong>{next.concept.title}</strong>
            </Link>
          ) : <span />}
        </div>
      </nav>
    </AppShell>
  );
}
