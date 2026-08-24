
export function createSidebar(items=[]){
 const a=document.createElement("aside");a.className="ce-shared-sidebar";
 a.innerHTML='<div class="ce-sidebar-title">WORKSPACE</div>';
 items.forEach(x=>{const e=document.createElement("a");e.href=x.href||"#";e.textContent="> "+x.label;if(x.active)e.classList.add("active");a.append(e)});
 return a;
}
