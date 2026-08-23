import { milestones } from "@/data/curriculum";

export function LearningFlow({ activeMilestone }: { activeMilestone?: string }) {
  return (
    <div className="learning-flow" aria-label="Learning milestones">
      <div className="flow-track">
        {milestones.map((milestone) => (
          <div
            key={milestone}
            className={`flow-node ${activeMilestone === milestone ? "active" : ""}`}
          >
            <span className="flow-dot" />
            <span>{milestone}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
