"use client";

const years = ["2020","2021","2022","2023","2024","2025","2026"];
const milestones = [
  { year:"2020", label:"OPS", x:8, cls:"ops" },
  { year:"2022", label:"CLOUD", x:32, cls:"cloud" },
  { year:"2023", label:"DEVOPS", x:45, cls:"devops" },
  { year:"2024", label:"AZURE", x:58, cls:"azure" },
  { year:"2026", label:"PLATFORM", x:92, cls:"platform" },
];

export default function CareerVisual(){
  return <div className="careerMock" aria-label="Career Timeline Evolution">
    <div className="careerMockHead"><b>02&nbsp; CAREER</b><span>— Career Timeline</span><i>EVOLVING</i></div>
    <div className="careerMockBody">
      <div className="careerMockStage">
        <div className="careerYears">{years.map(y=><span key={y}>{y}</span>)}</div>
        <div className="careerRailLine"><i className="careerRailProgress"/><i className="careerRailRunner"/></div>
        {milestones.map((m,i)=><div key={m.label} className={`careerPoint ${m.cls}`} style={{left:`${m.x}%`, ['--delay' as string]:`${i*1.25}s`}}>
          <i className="careerDot"><u/></i><b>{m.label}</b>
        </div>)}
        <div className="careerEvent eventCloud"><span>INFRA</span><i/>CLOUD</div>
        <div className="careerEvent eventPlatform"><span>ENGINEER</span><i/>PLATFORM</div>
      </div>
      <div className="careerMockLegend"><span>EXPERIENCE</span><span>EVOLUTION</span><span>IMPACT</span><span>BEYOND</span></div>
    </div>
    <div className="careerMockFooter">
      <span><i>01</i> OPS</span><span><i>02</i> CLOUD</span><span><i>03</i> AZURE</span><span><i>04</i> PLATFORM</span><b>● LIVE JOURNEY</b>
    </div>
  </div>
}
