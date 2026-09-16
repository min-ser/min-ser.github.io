"use client";
import { useConcept } from "./ConceptProvider";
import { getConcept } from "@/data/concepts";

export default function ConceptTerm({id,children}:{id:string;children?:React.ReactNode}){
  const {openConcept}=useConcept();
  const c=getConcept(id);
  if(!c) return <>{children ?? id}</>;
  return <button className="concept-term" onClick={()=>openConcept(id)} title={c.oneLine}>
    {children ?? c.term}<span className="concept-info">ⓘ</span>
  </button>
}
