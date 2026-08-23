import Link from "next/link";
import { curriculum } from "@/data/curriculum";
import { getConceptHref } from "@/lib/curriculum";

export function MobileNavigation({
  activeDomain,
  activeConcept,
}: {
  activeDomain?: string;
  activeConcept?: string;
}) {
  return (
    <details className="mobile-nav">
      <summary>☰ Curriculum</summary>
      <div className="mobile-nav-panel">
        {curriculum.map((domain) => (
          <details key={domain.id} open={domain.id === activeDomain}>
            <summary className={domain.id === activeDomain ? "domain-active" : ""}>
              {String(domain.order).padStart(2, "0")} · {domain.shortTitle}
            </summary>
            <div>
              <Link href={`/${domain.id}/`} className="mobile-domain-link">
                {domain.title} Overview
              </Link>
              {domain.modules.flatMap((module) =>
                module.concepts.map((concept) => (
                  <Link
                    key={concept.id}
                    href={getConceptHref(domain.id, concept.id)}
                    className={
                      domain.id === activeDomain && concept.id === activeConcept
                        ? "active"
                        : ""
                    }
                  >
                    {concept.title}
                  </Link>
                ))
              )}
            </div>
          </details>
        ))}
      </div>
    </details>
  );
}
