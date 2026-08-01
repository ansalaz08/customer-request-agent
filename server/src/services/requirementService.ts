import axios from "axios";

export async function analyzeRequirement(requirement: string) {
  try {
    console.log("Calling OpenRouter...");

    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: process.env.OPENROUTER_MODEL,
      messages: [
        {
          role: "system",
          content: `
          You are a backend service. Do not explain your reasoning. Do not use markdown. Do not wrap the response in code fences. Return exactly one JSON object that conforms to the schema.
          
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
  } catch (error: any) {
    console.error("OpenRouter Error:");
    console.error(JSON.stringify(error.response?.data, null, 2));
    throw error;
  }

}