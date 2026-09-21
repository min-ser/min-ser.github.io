export type StepStatus = "completed" | "current" | "planned";

export type Step = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  group: "FOUNDATION" | "LEARNING" | "VISUALIZATION" | "TRANSFORMER";
  status: StepStatus;
  visual: string;
  topics: string[];
};
