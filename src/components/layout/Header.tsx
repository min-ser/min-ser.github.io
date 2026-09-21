"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect,useState } from "react";
import type { AreaConfig } from "@/types/content";
function active(pathname:string,href:string){return href==="/"?pathname==="/":pathname===href||pathname.startsWith(`${href}/`);}
type ViewMode="mobile"|"desktop";
export default function Header({nav,brand,subtitle,version}:{nav:AreaConfig[];brand:string;subtitle:string;version:string}){
 const pathname=usePathname(); const [open,setOpen]=useState(false); const [view,setView]=useState<ViewMode>("mobile");
 useEffect(()=>{const saved=localStorage.getItem("gitblog-view-mode") as ViewMode|null; if(saved==="desktop"||saved==="mobile")setView(saved)},[]);
 useEffect(()=>{document.documentElement.dataset.view=view;localStorage.setItem("gitblog-view-mode",view)},[view]);
 useEffect(()=>setOpen(false),[pathname]); useEffect(()=>{if(!open)return;const previous=document.body.style.overflow;document.body.style.overflow="hidden";return()=>{document.body.style.overflow=previous};},[open]);
 return <header className="siteHeader"><div className="headerInner"><div className="brandCluster"><Link className={`brand ${pathname==="/"?"activeBrand":""}`} href="/"><strong>{brand}</strong><span>{subtitle}</span></Link><span className="siteVersion">v{version}</span></div><div className="mobileHeaderActions"><div className="viewModeSwitch" aria-label="화면 모드"><button className={view==="mobile"?"active":""} onClick={()=>setView("mobile")}>MOBILE</button><button className={view==="desktop"?"active":""} onClick={()=>setView("desktop")}>PC</button></div><button className={`mobileMenuButton ${open?"isOpen":""}`} type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(v=>!v)}><span>{open?"CLOSE":"MENU"}</span><i aria-hidden="true"/></button></div><nav className="desktopNav" aria-label="Primary navigation">{nav.map(item=><Link key={item.href} href={item.href} className={active(pathname,item.href)?"activeNav":""}><span>{String(item.index).padStart(2,"0")}</span>{item.navLabel}</Link>)}</nav></div><nav id="mobile-navigation" className={`mobileNav ${open?"isOpen":""}`} aria-label="Mobile navigation">{nav.map(item=><Link key={item.href} href={item.href} className={active(pathname,item.href)?"activeNav":""}><span>{String(item.index).padStart(2,"0")}</span><strong>{item.navLabel}</strong><b>→</b></Link>)}</nav></header>;
}
