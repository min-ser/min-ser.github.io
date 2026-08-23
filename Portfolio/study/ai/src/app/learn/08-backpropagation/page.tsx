import StepShell from "@/components/learning/StepShell";
import { getStep } from "@/data/steps";
import StepVisualPreview from "@/components/simulations/StepVisualPreview";
export default function Page(){
  const step=getStep(8)!;
  return <StepShell id={8}><StepVisualPreview step={step}/></StepShell>
}
