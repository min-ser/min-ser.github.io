import Link from "next/link";
import { steps } from "@/data/steps";
const groups=["FOUNDATION","LEARNING","VISUALIZATION","TRANSFORMER"] as const;
export default function Sidebar({currentId}:{currentId:number}){
  return <aside className="sidebar">{groups.map(group=><section className="side-group" key={group}>
    <div className="side-title">{group}</div>
    {steps.filter(s=>s.group===group).map(s=>{
      const active=s.id===currentId;
      const mark=s.status==="completed"?"✓":active?"●":"○";
      return <Link key={s.id} className={`side-link ${active?"current":""} ${s.status}`} href={`/learn/${s.slug}/`}>
        <span className="side-mark">{mark}</span><span>{String(s.id).padStart(2,"0")} {s.title}</span>
      </Link>
    })}
  </section>)}</aside>
}
