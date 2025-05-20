import { ELEPHANT_WIKI } from "../mock-data";

export async function splitText(data: { content: string; name: string }[]) {
  const chunks: { content: string; name: string }[] = [];

  const CHUNK_SIZE = 200;

  for (const { content, name } of data) {
    const words = content.split(/\s+/);

    for (let i = 0; i < words.length; i += CHUNK_SIZE) {
      const chunk = words.slice(i, i + CHUNK_SIZE);
      chunks.push({ content: chunk.join(" "), name });
    }
  }
  return chunks;
}

async function main() {
  const chunks = await splitText([
    { content: ELEPHANT_WIKI, name: "Elephants" },
  ]);
  console.log(chunks);
  console.log(chunks.length);
}

main();
