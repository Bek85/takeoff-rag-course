import { generateEmbeddings } from "./generate-embeddings";
import { MOCK_DATA } from "../mock-data";
import { db } from "./db";
import { factsTable } from "./db/schema/facts-schema";

export async function uploadData(docs: { content: string; name: string }[]) {
  const embeddings = await generateEmbeddings(docs.map((doc) => doc.content));

  await db.insert(factsTable).values(
    embeddings.map((embedding, index) => ({
      content: docs[index].content,
      name: docs[index].name,
      embedding: embedding,
    }))
  );
}

// async function main() {
//   await uploadData(MOCK_DATA);
// }

// main();
