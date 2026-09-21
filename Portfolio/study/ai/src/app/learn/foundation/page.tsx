import FoundationMap from "@/components/foundation/FoundationMap";
import LearningPathGuide from "@/components/foundation/LearningPathGuide";

export default function FoundationHome(){
  return <section className="section">
    <div className="section-title">
      <div><div className="eyebrow">AI FOUNDATION MAP</div><h2>AI / ML / DL / LLM은 서로 어떤 관계인가?</h2></div>
      <div className="muted">처음부터 시작하기</div>
    </div>
    <LearningPathGuide/>
    <div className="foundation-map-section"><FoundationMap/></div>
  </section>
}
