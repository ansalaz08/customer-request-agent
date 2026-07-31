import { z } from "zod";

export const RequirementSchema = z.object({
  approvalThreshold: z.number().nullable(),
  approver: z.string().nullable(),
  needsClarification: z.boolean(),
  questions: z.array(z.string()),
});