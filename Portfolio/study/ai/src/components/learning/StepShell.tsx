import type { ReactNode } from "react";
import { getStep } from "@/data/steps";
import CommonLearningNav from "@/components/learning/CommonLearningNav";
import CurriculumStepNav from "@/components/learning/CurriculumStepNav";

export default function StepShell({
  id,
  children,
}: {
  id: number;
  children: ReactNode;
}) {
  const step = getStep(id);
  if (!step) return null;

  return (
    <div className="unified-learning-shell">
      <CommonLearningNav />

      <section className="learn-main">
        <div className="step-head">
          <div>
            <div className="eyebrow">
              STEP {String(step.id).padStart(2, "0")} · {step.group}
            </div>
            <h1>{step.title}</h1>
            <p>{step.subtitle}</p>
          </div>

          <div className={`status ${step.status}`}>
            {step.status === "completed"
              ? "COMPLETED"
              : step.status === "current"
              ? "CURRENT"
              : "PLANNED"}
          </div>
        </div>

        {children}

        <CurriculumStepNav />
      </section>
    </div>
  );
}
