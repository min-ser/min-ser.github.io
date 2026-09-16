"use client";
import Link from "next/link";
import {useEffect,useMemo,useState} from "react";

export type KnowledgeGroup={id:string;title:string;description:string;order:number};
export type KnowledgeArticle={
 id:string;slug:string;title:string;group:string;category:string;summary:string;createdDate:string;updatedDate:string;
 featured:boolean;tags:string[];markdown:string;
};
export type KnowledgeConfig={
 explorerTitle:string;recentTitle:string;featuredTitle:string;allArticlesLabel:string;articleCountLabel:string;
 updatedLabel:string;createdLabel:string;readLabel:string;modalSourceLabel:string;modalCloseLabel:string;
 fullArticleLabel:string;emptyLabel:string;searchPlaceholder:string;searchLabel:string;
 boardIndexLabel:string;boardUpdatedLabel:string;boardCategoryLabel:string;boardArticleLabel:string;boardTagsLabel:string;
 pageSize:number;previousLabel:string;nextLabel:string;pageLabel:string;
};
function date(value:string){return value.replaceAll("-",".");}

export default function ExpertiseKnowledgeBase({groups,articles,config}:{groups:KnowledgeGroup[];articles:KnowledgeArticle[];config:KnowledgeConfig;}){
 const [expanded,setExpanded]=useState<string[]>(groups.map(g=>g.id));
 const [activeGroup,setActiveGroup]=useState("");
 const [query,setQuery]=useState("");
 const [page,setPage]=useState(1);

 const filtered=useMemo(()=>articles.filter(article=>{
  const groupMatch=!activeGroup||article.group===activeGroup;
  const haystack=[article.title,article.summary,article.category,...article.tags].join(" ").toLowerCase();
  return groupMatch&&(!query.trim()||haystack.includes(query.trim().toLowerCase()));
 }),[articles,activeGroup,query]);

 const pageSize=Math.max(1,Number(config.pageSize)||10);
 const totalPages=Math.max(1,Math.ceil(filtered.length/pageSize));
 const paged=filtered.slice((page-1)*pageSize,page*pageSize);
 useEffect(()=>{setPage(1)},[activeGroup,query]);
 useEffect(()=>{if(page>totalPages)setPage(totalPages)},[page,totalPages]);

 const toggleGroup=(id:string)=>setActiveGroup(current=>current===id?"":id);

 return <div className="knowledgeLayout">
  <aside className="knowledgeExplorer">
   <div className="knowledgeExplorerHead"><span>{config.explorerTitle}</span><b>{articles.length}</b></div>
   <button type="button" className={`knowledgeAll ${activeGroup===""?"active":""}`} onClick={()=>setActiveGroup("")}>
    <span>{config.allArticlesLabel}</span><b>{articles.length}</b>
   </button>
   <nav>{groups.map(group=>{
    const docs=articles.filter(a=>a.group===group.id);
    const isOpen=expanded.includes(group.id);
    return <section className="knowledgeGroup" key={group.id}>
     <div className="knowledgeGroupLine">
      <button type="button" className="knowledgeToggle" onClick={()=>setExpanded(v=>isOpen?v.filter(x=>x!==group.id):[...v,group.id])}>
       <span>{isOpen?"▾":"▸"}</span><strong>{group.title}</strong><b>{docs.length}</b>
      </button>
      <button type="button" aria-pressed={activeGroup===group.id} className={`knowledgeGroupFilter ${activeGroup===group.id?"active":""}`} onClick={()=>toggleGroup(group.id)}>●</button>
     </div>
     {isOpen&&<div className="knowledgeGroupArticles">{docs.map(article=>
      <Link key={`${article.group}:${article.slug}`} href={`/expertise/${article.slug}`}>{article.title}</Link>
     )}</div>}
    </section>
   })}</nav>
  </aside>

  <main className="knowledgeMain">
   <div className="knowledgeToolbar">
    <div><span>{config.recentTitle}</span><b>{filtered.length} {config.articleCountLabel}</b></div>
    <label><span>{config.searchLabel}</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={config.searchPlaceholder}/></label>
   </div>

   {filtered.length===0?<div className="knowledgeEmpty">{config.emptyLabel}</div>:<>
    <div className="knowledgeBoard">
     <div className="knowledgeBoardHead">
      <span>{config.boardIndexLabel}</span><span>{config.boardUpdatedLabel}</span><span>{config.boardCategoryLabel}</span>
      <span>{config.boardArticleLabel}</span><span>{config.boardTagsLabel}</span>
     </div>
     {paged.map((article,rowIndex)=>{
      const absoluteIndex=(page-1)*pageSize+rowIndex+1;
      return <Link className="knowledgeBoardRow" key={`${article.group}:${article.slug}`} href={`/expertise/${article.slug}`}>
       <span className="knowledgeBoardIndex">{String(absoluteIndex).padStart(3,"0")}</span>
       <time>{date(article.updatedDate)}</time>
       <span className="knowledgeBoardCategory">{article.category}</span>
       <span className="knowledgeBoardArticle"><strong>{article.title}</strong><small>{article.summary}</small></span>
       <span className="knowledgeBoardTags">{article.tags.slice(0,4).map(tag=><em key={`${article.slug}:${tag}`}>{tag}</em>)}</span>
      </Link>
     })}
    </div>
    <div className="knowledgePagination">
     <button type="button" disabled={page<=1} onClick={()=>setPage(v=>Math.max(1,v-1))}>‹ {config.previousLabel}</button>
     <div>{Array.from({length:totalPages},(_,i)=>i+1).map(n=>
      <button type="button" className={n===page?"active":""} key={n} onClick={()=>setPage(n)}>{String(n).padStart(2,"0")}</button>
     )}</div>
     <span>{config.pageLabel} {page} / {totalPages}</span>
     <button type="button" disabled={page>=totalPages} onClick={()=>setPage(v=>Math.min(totalPages,v+1))}>{config.nextLabel} ›</button>
    </div>
   </>}
  </main>
 </div>;
}
