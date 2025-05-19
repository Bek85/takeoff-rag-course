import { db } from "./db";
import { factsTable } from "./db/schema/facts-schema";
import { generateEmbeddings } from "./generate-embeddings";
import { cosineDistance, desc, gt, and, sql } from "drizzle-orm";

export async function retrieveData(
  input: string,
  options: { limit?: number; minSimilarity?: number; name?: string | null } = {}
) {
  const { limit = 10, minSimilarity = 0.3, name = null } = options;

  const embedding = await generateEmbeddings([input]);
  const similarity = sql<number>`1 - (${cosineDistance(
    factsTable.embedding,
    embedding[0]
  )})`;

  const documents = await db
    .select({ name: factsTable.name, content: factsTable.content, similarity })
    .from(factsTable)
    .where(
      name
        ? and(
            gt(similarity, minSimilarity),
            sql`LOWER(${factsTable.name}) = LOWER(${name})`
          )
        : gt(similarity, minSimilarity)
    )
    .orderBy(desc(similarity))
    .limit(limit);

  return documents;
}
