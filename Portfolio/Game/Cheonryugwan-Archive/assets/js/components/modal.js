
export function openModal({title="Dialog",content="",actions=[]}={}){
 const b=document.createElement("div");b.className="ui-modal-backdrop";
 b.innerHTML=`<section class="ui-modal"><div class="ui-modal__head"><strong>${title}</strong></div><div class="ui-modal__body"></div><div class="ui-modal__foot ui-toolbar"></div></section>`;
 const body=b.querySelector(".ui-modal__body");typeof content==="string"?body.innerHTML=content:body.append(content);
 const foot=b.querySelector(".ui-modal__foot");actions.forEach(a=>{const x=document.createElement("button");x.className="ui-btn "+(a.primary?"ui-btn--primary":"");x.textContent=a.label;x.onclick=()=>a.onClick?.(()=>b.remove());foot.append(x)});
 b.onclick=e=>{if(e.target===b)b.remove()};document.body.append(b);return b;
}
