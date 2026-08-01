import { RequirementSchema } from "../schemas/requirement.schema";

export function parseRequirement(content: string) {
  try {
    const cleaned = content
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

      const parsed = JSON.parse(cleaned);

      return RequirementSchema.parse(parsed);
  } catch (error) {
    console.error("Raw LLM Response:", content);
    console.error(content);

    throw new Error("Invalid JSON returned from LLM");
  }
}