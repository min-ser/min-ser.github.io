import Link from "next/link";
import { curriculum } from "@/data/curriculum";
import { getConceptHref } from "@/lib/curriculum";

export function GlobalNavigation({
  activeDomain,
  activeConcept,
}: {
  activeDomain?: string;
  activeConcept?: string;
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">LEARNING PATH</div>

      <div className="nav-tree">
        {curriculum.map((domain) => (
          <details key={domain.id} open={domain.id === activeDomain || domain.order < 4}>
            <summary className={domain.id === activeDomain ? "domain-active" : ""}>
              <span className="domain-number">{String(domain.order).padStart(2, "0")}</span>
              <Link href={`/${domain.id}/`}>{domain.shortTitle}</Link>
            </summary>

            <div className="module-list">
              {domain.modules.map((module) => (
                <div key={module.id} className="module-block">
                  <div className="module-title">{module.title}</div>
                  {module.concepts.map((concept) => (
                    <Link
                      key={concept.id}
                      href={getConceptHref(domain.id, concept.id)}
                      className={`concept-link ${
                        domain.id === activeDomain && concept.id === activeConcept ? "active" : ""
                      }`}
                    >
                      {concept.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </aside>
  );
}
