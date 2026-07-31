import { RequirementSchema } from "../schemas/requirement.schema";

export function parseRequirement(content: string) {
  const parsed = JSON.parse(content);

  return RequirementSchema.parse(parsed);
}