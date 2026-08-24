
export function mountFooter(){
 document.querySelectorAll("footer,.site-footer,.ce-global-footer").forEach(x=>x.remove());
 const f=document.createElement("footer");f.className="ce-global-footer";
 f.innerHTML=`<span>CHEONRYUGWAN EDITOR</span><span>Scenario IDE · Asset Registry · Runtime</span><span>v0.10.3</span>`;
 document.body.append(f);
}
