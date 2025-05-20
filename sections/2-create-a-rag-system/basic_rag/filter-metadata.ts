import { openai } from "./api-clients";
import { retrieveData } from "./retrieve-data";
export async function extractName(query: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: query }],
    tools: [
      {
        type: "function",
        function: {
          name: "filter_by_name",
          description:
            "Extract the name of an animal or entity from the query. It must be the full name of the animal and plural",
          parameters: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "The name of the animal or entity",
              },
            },
            required: ["name"],
          },
        },
      },
    ],
  });

  const toolCall = response.choices[0].message.tool_calls?.[0];
  return toolCall ? JSON.parse(toolCall.function.arguments).name : null;
}

async function main() {
  const query = "Tell me about elephants";
  const name = await extractName(query);
  const documents = await retrieveData(query, { name });
  console.log(documents);
}

main();
