import Link from "next/link";

export function Breadcrumb({
  domain,
  module,
  concept,
}: {
  domain?: { id: string; title: string };
  module?: { title: string };
  concept?: { title: string };
}) {
  return (
    <div className="breadcrumb">
      <Link href="/">CS</Link>
      {domain && (
        <>
          <span>/</span>
          <Link href={`/${domain.id}/`}>{domain.title}</Link>
        </>
      )}
      {module && (
        <>
          <span>/</span>
          <span>{module.title}</span>
        </>
      )}
      {concept && (
        <>
          <span>/</span>
          <span>{concept.title}</span>
        </>
      )}
    </div>
  );
}
