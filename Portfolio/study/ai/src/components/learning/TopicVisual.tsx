"use client";

import { useMemo, useState } from "react";
import type { TopicContent } from "@/data/topicContent";

export default function TopicVisual({
  code,
  content,
}: {
  code: string;
  content: TopicContent;
}) {
  if (content.visualType === "neuron") {
    return <NeuronMiniVisual />;
  }

  if (content.visualType === "activation") {
    return <ActivationMiniVisual />;
  }

  if (content.visualType === "matrix") {
    return (
      <div className="topic-visual-card">
        <div className="visual-caption">MATRIX VIEW</div>
        <div className="matrix-visual">
          {[0.2, 0.8, -0.3, 0.1, 0.4, 0.7, 0.9, 0.3, 0.1].map(
            (v, i) => (
              <div className={i === 4 ? "matrix-cell hot" : "matrix-cell"} key={i}>
                {v}
              </div>
            )
          )}
        </div>
        <p>많은 Neuron 연결을 행렬 하나로 묶어 계산할 수 있습니다.</p>
      </div>
    );
  }

  if (content.visualType === "transformer") {
    const blocks = ["Token", "Embedding", "Attention", "Add & Norm", "FFN", "Output"];
    return (
      <div className="topic-visual-card">
        <div className="visual-caption">TRANSFORMER FLOW</div>
        <div className="pipeline-visual">
          {blocks.map((x, i) => (
            <div className="pipeline-item" key={x}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <strong>{x}</strong>
              {i < blocks.length - 1 && <em>→</em>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (content.visualType === "llm") {
    return (
      <div className="topic-visual-card">
        <div className="visual-caption">LLM PIPELINE</div>
        <div className="llm-pipeline">
          {["Text", "Tokens", "Embedding", "Transformer × N", "Logits", "Next Token"].map(
            (x, i) => (
              <div key={x}>
                <span>{i + 1}</span>
                <strong>{x}</strong>
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  if (content.visualType === "dl-network") {
    return (
      <div className="topic-visual-card">
        <div className="visual-caption">DEEP LEARNING</div>
        <svg viewBox="0 0 720 250" className="topic-svg">
          {[75, 125, 175].map((y, i) => <circle key={`a${i}`} cx="75" cy={y} r="14" className="vnode" />)}
          {[45, 95, 145, 195].map((y, i) => <circle key={`b${i}`} cx="290" cy={y} r="14" className="vnode purple" />)}
          {[65, 125, 185].map((y, i) => <circle key={`c${i}`} cx="505" cy={y} r="14" className="vnode green" />)}
          {[75,125,175].flatMap((y1)=>[45,95,145,195].map((y2,j)=><line key={`${y1}-${j}`} x1="89" y1={y1} x2="276" y2={y2} className="vwire"/>))}
          {[45,95,145,195].flatMap((y1)=>[65,125,185].map((y2,j)=><line key={`x${y1}-${j}`} x1="304" y1={y1} x2="491" y2={y2} className="vwire"/>))}
          <text x="35" y="232">INPUT</text><text x="245" y="232">HIDDEN</text><text x="475" y="232">FEATURE</text>
        </svg>
      </div>
    );
  }

  if (content.visualType === "ml-flow") {
    return (
      <div className="topic-visual-card">
        <div className="visual-caption">PROGRAMMING vs MACHINE LEARNING</div>
        <div className="comparison-flow">
          <div><strong>Traditional</strong><span>Data + Rules → Result</span></div>
          <div><strong>Machine Learning</strong><span>Data + Target → Training → Model</span></div>
        </div>
      </div>
    );
  }

  if (content.visualType === "ai-map") {
    return (
      <div className="topic-visual-card">
        <div className="visual-caption">AI CONCEPT MAP</div>
        <div className="ai-tree">
          <strong>AI</strong>
          <div>Machine Learning</div>
          <div>Deep Learning</div>
          <div>Transformer</div>
          <div>LLM</div>
        </div>
      </div>
    );
  }

  return (
    <div className="topic-visual-card generic">
      <div className="visual-caption">{code} CONCEPT VIEW</div>
      <div className="generic-orbit">
        <span />
        <strong>{content.keyPoints[0] ?? "Concept"}</strong>
        <span />
      </div>
      <p>이 Topic은 이후 실제 계산/시각화 학습 시뮬레이션으로 확장됩니다.</p>
    </div>
  );
}

function NeuronMiniVisual() {
  const [x, setX] = useState(0.7);
  const [w, setW] = useState(0.8);
  const [b, setB] = useState(0.1);
  const z = useMemo(() => x * w + b, [x, w, b]);

  return (
    <div className="topic-visual-card">
      <div className="visual-caption">LIVE NEURON</div>
      <div className="mini-neuron">
        <div><span>Input</span><strong>{x.toFixed(2)}</strong></div>
        <em>× {w.toFixed(2)}</em>
        <div className="mini-node">Σ</div>
        <em>+ {b.toFixed(2)}</em>
        <div><span>Output</span><strong>{z.toFixed(3)}</strong></div>
      </div>
      <div className="mini-controls">
        <label>Input <input type="range" min="0" max="1" step=".01" value={x} onChange={e=>setX(Number(e.target.value))}/></label>
        <label>Weight <input type="range" min="-1" max="1" step=".01" value={w} onChange={e=>setW(Number(e.target.value))}/></label>
        <label>Bias <input type="range" min="-1" max="1" step=".01" value={b} onChange={e=>setB(Number(e.target.value))}/></label>
      </div>
    </div>
  );
}

function ActivationMiniVisual() {
  const [x, setX] = useState(0.5);
  const relu = Math.max(0, x);
  const sigmoid = 1 / (1 + Math.exp(-x));
  const tanh = Math.tanh(x);

  return (
    <div className="topic-visual-card">
      <div className="visual-caption">ACTIVATION COMPARISON</div>
      <label className="activation-slider">
        Input {x.toFixed(2)}
        <input type="range" min="-5" max="5" step=".01" value={x} onChange={e=>setX(Number(e.target.value))}/>
      </label>
      <div className="activation-values">
        <div><span>ReLU</span><strong>{relu.toFixed(3)}</strong></div>
        <div><span>Sigmoid</span><strong>{sigmoid.toFixed(3)}</strong></div>
        <div><span>Tanh</span><strong>{tanh.toFixed(3)}</strong></div>
      </div>
    </div>
  );
}
