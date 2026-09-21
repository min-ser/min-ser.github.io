export type ConceptSection = {
  title: string;
  body: string;
};

export type Concept = {
  id: string;
  term: string;
  korean: string;
  oneLine: string;
  beginner: string;
  why: string;
  uses: string[];
  simulation?: string;
  change?: string;
  training?: string;
  formula?: string;
  example?: string;
  later: string[];
  related: string[];
};
