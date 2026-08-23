export type Priority = "REQUIRED" | "RECOMMENDED" | "OPTIONAL";

export type FoundationNode = {
  id: string;
  title: string;
  korean: string;
  subtitle: string;
  description: string;
  priority: Priority;
  order: number;
  parent?: string;
  route: string;
  why: string;
  usedFor: string[];
  needNow: string[];
  later: string[];
};
