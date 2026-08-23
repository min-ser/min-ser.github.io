import Link from "next/link";

export function GlobalHeader() {
  return (
    <header className="global-header">
      <Link href="/" className="brand">
        <span className="brand-mark">CS://</span>FOUNDATION
        <span className="version">v0.1.0</span>
      </Link>

      <nav className="header-nav" aria-label="Global">
        <Link href="/">Dashboard</Link>
        <Link href="/roadmap/">Roadmap</Link>
        <Link href="/knowledge-map/">Knowledge Map</Link>
        <Link href="/progress/">Progress</Link>
      </nav>

      <div className="header-tools">
        <button type="button" disabled title="v0.1.x에서 기능 구조만 준비">
          Search ⌘K
        </button>
      </div>
    </header>
  );
}
