"use client";
import {useState} from "react";
import MarkdownDetailModal,{MarkdownModalDocument} from "@/components/content/MarkdownDetailModal";

export type ProfileTableItem={
 slug:string; title:string; subtitle?:string; period:string; markdown:string; cells:string[]; collapsed?:boolean;
};
export default function ProfileItemTable({items,columns,className,sourceLabel,closeLabel,detailLabel,detailHref}: {
 items:ProfileTableItem[];columns:string[];className:string;sourceLabel:string;closeLabel:string;detailLabel:string;detailHref:string;
}){
 const [item,setItem]=useState<MarkdownModalDocument|null>(null);
 const [showHidden,setShowHidden]=useState(false);
 const hiddenCount=items.filter(d=>d.collapsed===true).length;
 const hasHidden=hiddenCount>0;
 const visibleItems=showHidden?items:items.filter(d=>d.collapsed!==true);
 return <>
  <div className={`resumeTable ${className}`}>
   <div className="resumeTableHeader">{columns.map(x=><span key={x}>{x}</span>)}</div>
   {visibleItems.map(d=><button type="button" className="resumeTableRow resumeTableButton" key={d.slug} onClick={()=>setItem({
    slug:d.slug,title:d.title,subtitle:d.subtitle,period:d.period,markdown:d.markdown,detailHref,sourceLabel
   })}>{d.cells.map((cell,i)=>i===1?<strong key={i}>{cell}</strong>:<span key={i}>{cell}</span>)}</button>)}
  </div>
  {hasHidden&&<div className="resumeHiddenRecordControl">
   <button type="button" className="resumeHiddenRecordToggle" aria-expanded={showHidden} onClick={()=>setShowHidden(v=>!v)}>
    <span aria-hidden="true">{showHidden?"−":"+"}</span>
    {showHidden?`HIDE ${hiddenCount} HIDDEN ${hiddenCount===1?"RECORD":"RECORDS"}`:`SHOW ${hiddenCount} HIDDEN ${hiddenCount===1?"RECORD":"RECORDS"}`}
   </button>
  </div>}
  <MarkdownDetailModal item={item} closeLabel={closeLabel} detailLabel={detailLabel} onClose={()=>setItem(null)}/>
 </>;
}
