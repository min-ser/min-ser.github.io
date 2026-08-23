import type { ReactNode } from "react";
import { GlobalHeader } from "./GlobalHeader";
import { GlobalNavigation } from "./GlobalNavigation";
import { LearningFlow } from "./LearningFlow";
import { MobileNavigation } from "./MobileNavigation";

export function AppShell({
  children,
  activeDomain,
  activeConcept,
  activeMilestone,
}: {
  children: ReactNode;
  activeDomain?: string;
  activeConcept?: string;
  activeMilestone?: string;
}) {
  return (
    <div className="app-shell">
      <GlobalHeader />
      <LearningFlow activeMilestone={activeMilestone} />
      <MobileNavigation activeDomain={activeDomain} activeConcept={activeConcept} />
      <div className="workspace">
        <GlobalNavigation activeDomain={activeDomain} activeConcept={activeConcept} />
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}
