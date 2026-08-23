export default function About(){
  return <section className="section" style={{maxWidth:850}}>
    <div className="eyebrow">ABOUT</div><h1 style={{fontSize:"clamp(44px,7vw,80px)",margin:"8px 0"}}>Why NeuralScope?</h1>
    <p className="muted" style={{fontSize:18,lineHeight:1.8}}>AI 개념을 읽고 외우는 대신, 실제 숫자가 어떻게 흐르고 변하는지 시각적으로 확인하기 위해 만든 학습 + 포트폴리오 프로젝트입니다.</p>
    <div className="explain">핵심 원칙: Visualization → Interaction → Calculation → Explanation → Implementation.</div>
  </section>
}
