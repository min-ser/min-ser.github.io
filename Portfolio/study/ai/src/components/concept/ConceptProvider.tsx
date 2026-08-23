"use client";
import { createContext, useContext, useEffect, useState } from "react";
import ConceptModal from "./ConceptModal";

type ContextValue={openConcept:(id:string)=>void};
const ConceptContext=createContext<ContextValue>({openConcept:()=>{}});

export function useConcept(){return useContext(ConceptContext)}

export default function ConceptProvider({children}:{children:React.ReactNode}){
  const [active,setActive]=useState<string|null>(null);
  useEffect(()=>{
    const close=(e:KeyboardEvent)=>{if(e.key==="Escape")setActive(null)};
    window.addEventListener("keydown",close);
    return()=>window.removeEventListener("keydown",close);
  },[]);
  return <ConceptContext.Provider value={{openConcept:setActive}}>
    {children}
    {active&&<ConceptModal conceptId={active} onClose={()=>setActive(null)} onNavigate={setActive}/>}
  </ConceptContext.Provider>
}
