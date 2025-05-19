import { openai } from "./api-clients";

export async function generateEmbeddings(texts: string[]) {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    dimensions: 256,
    input: texts,
  });

  return embedding.data.map((embedding) => embedding.embedding);
}

// async function main() {
//   const embeddings = await generateEmbeddings([
//     "Hello, world!",
//     "This is a test",
//   ]);
//   console.log(embeddings);
// }

// main();
