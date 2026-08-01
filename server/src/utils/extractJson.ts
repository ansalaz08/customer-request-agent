export function extractJson(content: string) {
  const start = content.indexOf("{");

  if (start === -1) {
    throw new Error("No JSON object found.");
  }

  let depth = 0;

  for (let i = start; i < content.length; i++) {
    if (content[i] === "{") depth++;
    if (content[i] === "}") depth--;

    if (depth === 0) {
      return content.slice(start, i + 1);
    }
  }

  throw new Error("Incomplete JSON object.");
}