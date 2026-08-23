import StepShell from "@/components/learning/StepShell";
import { getStep } from "@/data/steps";
import StepVisualPreview from "@/components/simulations/StepVisualPreview";
export default function Page(){
  const step=getStep(0)!;
  return <StepShell id={0}><StepVisualPreview step={step}/><div className="explain">NeuralScope는 개념 설명을 먼저 읽는 사이트가 아니라, 시각화를 먼저 조작하고 “방금 무슨 일이 일어났는가?”를 계산과 설명으로 확인하는 학습 사이트입니다.</div></StepShell>
}
