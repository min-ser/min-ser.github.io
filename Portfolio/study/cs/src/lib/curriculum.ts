import { curriculum } from "@/data/curriculum";

export function getDomain(domainId: string) {
  return curriculum.find((domain) => domain.id === domainId);
}

export function getConcept(domainId: string, conceptId: string) {
  const domain = getDomain(domainId);
  if (!domain) return undefined;

  for (const module of domain.modules) {
    const concept = module.concepts.find((item) => item.id === conceptId);
    if (concept) return { domain, module, concept };
  }

  return undefined;
}

export function getAllConcepts() {
  return curriculum.flatMap((domain) =>
    domain.modules.flatMap((module) =>
      module.concepts.map((concept) => ({ domain, module, concept }))
    )
  );
}

export function getConceptHref(domainId: string, conceptId: string) {
  return `/${domainId}/${conceptId}/`;
}
