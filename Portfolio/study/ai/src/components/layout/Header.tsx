import Link from "next/link";
export default function Header(){
  return <header className="header"><div className="header-inner">
    <Link className="brand" href="/">Neural<span>Scope</span></Link>
    <nav className="nav"><Link href="/learn/foundation/">FOUNDATION</Link><Link href="/learn/">LEARN</Link><Link href="/lab/">LAB</Link><Link href="/about/">ABOUT</Link></nav>
  </div></header>
}
