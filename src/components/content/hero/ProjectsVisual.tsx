"use client";

const stages = [
  { key:"CODE", sub:"SOURCE", path:"M7 4h10v5H7zM5 9h14v11H5zM8 13h8M8 16h5" },
  { key:"BUILD", sub:"RUNNER", path:"M4 6h16v12H4zM8 10l3 3-3 3M13 16h4" },
  { key:"ACR", sub:"REGISTRY", path:"M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9" },
  { key:"AKS", sub:"CLUSTER", path:"M12 3l3 2 3-.5 1 3 2 2-2 2 .5 3-3 1-2 3-3-1-3 1-2-3-3-1 .5-3-2-2 2-2 1-3 3 .5zM9 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0" },
  { key:"LIVE", sub:"SERVICE", path:"M4 17l4-5 3 3 5-8 4 3M4 20h16" }
];

export default function ProjectsVisual(){
 return <div className="projectsMock" aria-label="Delivery Pipeline visualization">
   <div className="pmHead"><span><b>03 PROJECTS</b> — Delivery Pipeline</span><em><i/> DEPLOYMENT HEALTHY</em></div>
   <div className="pmBody">
    <div className="pmPipeline">
      <svg className="pmTrack" viewBox="0 0 520 100" preserveAspectRatio="none"><path d="M38 49 H482"/><path className="pmTrackRun" d="M38 49 H482"/></svg>
      <div className="pmStages">{stages.map((s,i)=><div className="pmStage" key={s.key} style={{"--i":i} as React.CSSProperties}>
        <span className="pmIcon"><svg viewBox="0 0 24 24"><path d={s.path}/></svg><i/></span>
        <b>{s.key}</b><small>{s.sub}</small>{i<4&&<strong>→</strong>}
      </div>)}</div>
      <div className="pmMiniTrack"><span/><i/><i/><i/><i/><b/></div>
    </div>
    <aside className="pmDeploy"><small>DEPLOYMENT</small><b><i/> HEALTHY</b><div><span>BUILD</span><em><i/></em></div><div><span>DEPLOY</span><em><i/></em></div><div><span>MONITOR</span><em><i/></em></div><div><span>SCALE</span><em><i/></em></div></aside>
   </div>
   <div className="pmStatus"><span>COMMIT <b>8F21</b></span><span>TEST <b>24/24</b></span><span>IMAGE <b>PUSHED</b></span><span>PODS <b>3/3</b></span><em>● LIVE</em></div>
 </div>
}
