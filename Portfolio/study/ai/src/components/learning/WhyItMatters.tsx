import ConceptTerm from "@/components/concept/ConceptTerm";

export default function WhyItMatters({step}:{step:1|2}){
  if(step===1) return <section className="learning-context">
    <div className="context-main">
      <div className="eyebrow">WHY THIS MATTERS</div><h2>왜 뉴런부터 배우는가?</h2>
      <p><ConceptTerm id="neuron"/>은 신경망의 가장 작은 계산 단위입니다. 여기서 <ConceptTerm id="input"/>, <ConceptTerm id="weight"/>, <ConceptTerm id="bias"/>가 어떻게 하나의 결과로 합쳐지는지 이해하면 Layer와 전체 Neural Network가 같은 계산을 대량으로 반복한다는 사실을 읽을 수 있게 됩니다.</p>
      <div className="question-grid"><div>AI의 “학습”에서 실제로 무엇이 변할까?</div><div>왜 같은 Input도 다른 결과를 만들까?</div><div>Layer는 뉴런 하나와 무엇이 다를까?</div></div>
    </div>
    <div className="context-side"><div className="concept-label">WHERE THIS IS USED</div><strong>거의 모든 신경망의 출발점</strong><p>이미지 분류 · 추천 · 음성 인식 · Transformer · LLM</p></div>
  </section>;

  return <section className="learning-context">
    <div className="context-main">
      <div className="eyebrow">WHY THIS MATTERS</div><h2>왜 Activation을 배우는가?</h2>
      <p><ConceptTerm id="activation"/>은 뉴런의 계산 결과에 비선형성을 넣어 여러 Layer가 복잡한 패턴을 학습할 수 있게 합니다. <ConceptTerm id="relu"/>, <ConceptTerm id="sigmoid"/>, <ConceptTerm id="tanh"/>를 같은 입력으로 비교하면 함수 선택이 출력에 어떤 차이를 만드는지 바로 확인할 수 있습니다.</p>
      <div className="question-grid"><div>왜 Layer를 많이 쌓는 것만으로는 부족할까?</div><div>음수 값을 0으로 만드는 이유는?</div><div>0~1 범위가 필요한 출력은 어디에 쓰일까?</div></div>
    </div>
    <div className="context-side"><div className="concept-label">WHERE THIS IS USED</div><strong>Deep Learning의 표현력을 만드는 핵심</strong><p>CNN · MLP · 분류 출력 · Transformer Feed Forward</p></div>
  </section>;
}
