export type ConceptStatus = "planned" | "draft" | "ready";

export interface Concept {
  id: string;
  title: string;
  summary: string;
  level: "foundation" | "core" | "internal" | "engineering" | "production" | "architecture";
  prerequisites?: string[];
  related?: string[];
  practical?: string[];
  status: ConceptStatus;
}

export interface Module {
  id: string;
  title: string;
  concepts: Concept[];
}

export interface Domain {
  id: string;
  order: number;
  title: string;
  shortTitle: string;
  milestone: string;
  description: string;
  modules: Module[];
}
