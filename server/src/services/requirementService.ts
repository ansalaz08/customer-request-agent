import axios from "axios";

export async function analyzeRequirement(requirement: string) {
  const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
    model: "meta-llama/llama-31-8b-instruct:free",
    messages: [
      {
        role: "system",
        content: `
        You extract workflow rules.
        
        Return OLNY valid JSON.

        Schema:
        {
          "approvalThreshold": number|null,
          "approver": string|null,
          "needsClarification": boolean,
          "questions": string[]
        }
        `
      },
      {
        role: "user",
        content: requirement
      }
    ]
  },
  {
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    }
  });

  return response.data.choices[0].message.content;
}