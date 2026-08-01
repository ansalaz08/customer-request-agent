import { RequirementSchema } from "../schemas/requirement.schema";

export function parseRequirement(content: string) {
  console.log("Parsing Response...");
  try {
    const parsed = JSON.parse(content);
  
    return RequirementSchema.parse(parsed);
  } catch (error) {
    console.error("Failed to parse AI response:");
    console.error(error);

    throw error;
  }
}