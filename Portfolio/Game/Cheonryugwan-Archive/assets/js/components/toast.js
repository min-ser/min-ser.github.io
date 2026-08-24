
export function toast(message,type="info"){
 let host=document.querySelector(".ui-toast-host");if(!host){host=document.createElement("div");host.className="ui-toast-host";document.body.append(host)}
 const el=document.createElement("div");el.className="ui-toast";el.textContent=message;if(type==="error")el.style.borderLeftColor="var(--danger)";
 host.append(el);setTimeout(()=>el.remove(),2800)
}
