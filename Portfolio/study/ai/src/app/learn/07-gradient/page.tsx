import StepShell from "@/components/learning/StepShell";
import { getStep } from "@/data/steps";
import StepVisualPreview from "@/components/simulations/StepVisualPreview";
export default function Page(){
  const step=getStep(7)!;
  return <StepShell id={7}><StepVisualPreview step={step}/></StepShell>
}
