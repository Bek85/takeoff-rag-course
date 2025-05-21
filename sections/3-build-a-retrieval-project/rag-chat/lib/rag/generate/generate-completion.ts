"use server";

import { openai } from "../api-clients";

// Takes context and user input, returns AI completion incorporating the context
export async function generateCompletionWithContext(
  context: string | string[],
  input: string
) {
  // Ensure context is a string
  const contextStr = Array.isArray(context) ? context.join("\n\n") : context;

  // Call OpenAI API to generate completion
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini", // Using smaller model for better latency/cost
    temperature: 0, // Set to 0 for more deterministic outputs
    max_tokens: 1000, // Maximum length of completion
    messages: [
      {
        role: "system",
        content: `Answer based on the provided context.
Context:
${contextStr}
`,
      },
      { role: "user", content: `${input}` },
    ],
  });

  // Extract and return just the completion text
  return completion.choices[0].message.content;
}
