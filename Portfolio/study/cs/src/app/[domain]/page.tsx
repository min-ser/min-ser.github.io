import { notFound } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { curriculum } from "@/data/curriculum";
import { getDomain, getConceptHref } from "@/lib/curriculum";

export function generateStaticParams() {
  return curriculum.map((domain) => ({ domain: domain.id }));
}

export default async function DomainPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain: domainId } = await params;
  const domain = getDomain(domainId);
  if (!domain) notFound();

  return (
    <AppShell activeDomain={domain.id} activeMilestone={domain.milestone}>
      <Breadcrumb domain={domain} />

      <section className="page-hero compact">
        <div className="eyebrow">{domain.milestone}</div>
        <h1>{domain.title}</h1>
        <p>{domain.description}</p>
      </section>

      <div className="module-cards">
        {domain.modules.map((module) => (
          <section key={module.id} className="module-card">
            <div className="module-card-head">
              <h2>{module.title}</h2>
              <span>{module.concepts.length} concepts</span>
            </div>
            <div className="concept-route-grid">
              {module.concepts.map((concept) => (
                <Link
                  key={concept.id}
                  href={getConceptHref(domain.id, concept.id)}
                  className="concept-route"
                >
                  <span className="planned-dot" />
                  <div>
                    <strong>{concept.title}</strong>
                    <p>{concept.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
