import Link from "next/link";
import { steps } from "@/data/steps";
export default function StepNav({id}:{id:number}){
  const prev=steps.find(s=>s.id===id-1), next=steps.find(s=>s.id===id+1);
  return <nav className="step-nav"><div>{prev&&<Link href={`/learn/${prev.slug}/`}>← {prev.title}</Link>}</div><div>{next&&<Link href={`/learn/${next.slug}/`}>{next.title} →</Link>}</div></nav>
}
