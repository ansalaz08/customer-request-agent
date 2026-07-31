export interface RequirementAnalysis {
  approvalThreshold: number | null;
  approver: string | null;
  needsClarification: boolean | null;
  questions: string[];
}