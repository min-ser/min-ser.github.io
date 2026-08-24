
export function mountPageHeader(target,{eyebrow="$ workspace",title=document.title,description="",actions=[]}={}){
 const root=typeof target==="string"?document.querySelector(target):target;if(!root)return;
 const h=document.createElement("div");h.className="page-heading";
 h.innerHTML=`<div><div style="color:var(--green);font-size:11px;margin-bottom:5px">${eyebrow}</div><h1>${title}</h1><p>${description}</p></div><div class="ui-toolbar"></div>`;
 const tools=h.querySelector(".ui-toolbar");actions.forEach(a=>{const el=document.createElement(a.href?"a":"button");el.className="ui-btn "+(a.primary?"ui-btn--primary":"");el.textContent=a.label;if(a.href)el.href=a.href;else el.onclick=a.onClick;tools.append(el)});
 root.prepend(h);
}
