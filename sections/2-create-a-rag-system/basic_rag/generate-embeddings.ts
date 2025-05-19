import { openai } from "./api-clients";

async function generateEmbeddings(texts: string[]) {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    dimensions: 256,
    input: texts,
  });

  return embedding.data.map((embedding) => embedding.embedding);
}

export default generateEmbeddings;
