"use client";

const nodes = [
  { key:"cloud", label:"CLOUD", sub:"AZURE", x:19, y:34, icon:"cloud" },
  { key:"aks", label:"AKS", sub:"KUBERNETES", x:23, y:72, icon:"aks" },
  { key:"fabric", label:"FABRIC", sub:"DATA", x:76, y:25, icon:"fabric" },
  { key:"ai", label:"AI", sub:"INTELLIGENCE", x:82, y:57, icon:"ai" },
  { key:"devops", label:"DEVOPS", sub:"AUTOMATION", x:66, y:78, icon:"devops" },
];

function TechIcon({type}:{type:string}) {
  if(type==="cloud") return <svg viewBox="0 0 32 32"><path d="M7 22h17a5 5 0 0 0 .4-10A8 8 0 0 0 9.5 10 6 6 0 0 0 7 22Z"/></svg>;
  if(type==="aks") return <svg viewBox="0 0 32 32"><path d="m16 5 9 5v12l-9 5-9-5V10l9-5Z"/><circle cx="16" cy="16" r="4"/><path d="M16 8v4m0 8v4m-7-8h3m8 0h3m-12-6 3 3m4 6 3 3m0-12-3 3m-4 6-3 3"/></svg>;
  if(type==="fabric") return <svg viewBox="0 0 32 32"><path d="M8 7h16v5H8zM8 14h16v5H8zM8 21h16v5H8z"/><path d="M12 9.5h8M12 16.5h8M12 23.5h8"/></svg>;
  if(type==="ai") return <svg viewBox="0 0 32 32"><rect x="9" y="9" width="14" height="14" rx="3"/><circle cx="16" cy="16" r="4"/><path d="M16 4v5m0 14v5M4 16h5m14 0h5M8 8l3 3m10 10 3 3m0-16-3 3M11 21l-3 3"/></svg>;
  return <svg viewBox="0 0 32 32"><path d="M6 12c3-5 8-5 12-1l8 8-5 5-8-8c-2-2-4-2-7 2M26 12c-3-5-8-5-12-1l-8 8 5 5 8-8c2-2 4-2 7 2"/></svg>;
}

export default function ProfileVisual(){
  return <div className="profileSystem" aria-label="Engineer Core technology network">
    <div className="profileSystemTop"><span>01 PROFILE / ENGINEER CORE</span><b><i/> NETWORK ONLINE</b></div>
    <div className="profileSystemStage">
      <svg className="profileNetworkLines" viewBox="0 0 1000 360" preserveAspectRatio="none" aria-hidden="true">
        <ellipse className="pvOrbit pvOrbitA" cx="500" cy="180" rx="315" ry="116"/>
        <ellipse className="pvOrbit pvOrbitB" cx="500" cy="180" rx="250" ry="150" transform="rotate(-14 500 180)"/>
        <ellipse className="pvOrbit pvOrbitC" cx="500" cy="180" rx="205" ry="82" transform="rotate(17 500 180)"/>
        <path className="pvLink pvL1" d="M500 180 L190 122"/>
        <path className="pvLink pvL2" d="M500 180 L230 259"/>
        <path className="pvLink pvL3" d="M500 180 L760 90"/>
        <path className="pvLink pvL4" d="M500 180 L820 205"/>
        <path className="pvLink pvL5" d="M500 180 L660 281"/>
        <path className="pvMesh" d="M190 122L230 259M760 90L820 205L660 281M230 259L660 281M190 122L760 90"/>
      </svg>
      <div className="profileRadar" aria-hidden="true"><i/><i/><i/></div>
      <div className="profileCore">
        <div className="profileCoreMark">&gt;_</div><strong>ENGINEER</strong><span>CORE</span><small>BUILD · CONNECT · SOLVE</small>
      </div>
      {nodes.map((n,i)=><div key={n.key} className={`profileTechNode profileTechNode-${n.key}`} style={{left:`${n.x}%`,top:`${n.y}%`, ['--pv-delay' as string]:`${i*1.25}s`}}>
        <div className="profileTechIcon"><TechIcon type={n.icon}/><span className="profileNodePulse"/></div>
        <div className="profileTechText"><strong>{n.label}</strong><small>{n.sub}</small></div>
      </div>)}
      <span className="profileSignal profileSignal1"/><span className="profileSignal profileSignal2"/><span className="profileSignal profileSignal3"/><span className="profileSignal profileSignal4"/><span className="profileSignal profileSignal5"/>
      <div className="profileSystemWords"><span>CONNECT</span><span>BUILD</span><span>SOLVE</span><span>GROW</span></div>
    </div>
    <div className="profileSystemBottom"><span><i>05</i> TECHNOLOGY DOMAINS</span><span><i>05/05</i> CONNECTED</span><span><i>01</i> ENGINEER CORE</span><b>● READY</b></div>
  </div>
}
