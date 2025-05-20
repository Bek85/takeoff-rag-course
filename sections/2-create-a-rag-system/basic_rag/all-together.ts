import { extractName } from "./filter-metadata";
import { getOptimizedQuery } from "./optimize-query";
import { rankDocuments } from "./rerank-documents";
import { retrieveData } from "./retrieve-data";

export async function processQuery(userQuery: string) {
  const optimizedQuery = await getOptimizedQuery(userQuery);
  console.log("Optimized query:", optimizedQuery);

  const entityName = await extractName(userQuery);
  console.log("Extracted entity name:", entityName);

  const retrievedDocs = await retrieveData(optimizedQuery, {
    name: entityName,
    limit: 10,
    minSimilarity: 0.3,
  });
  // console.log("Retrieved documents:", retrievedDocs);

  const rankedResults = await rankDocuments(optimizedQuery, retrievedDocs, 3);
  // console.log("Ranked results:", rankedResults);

  return rankedResults;
}

// async function main() {
//   const query = "I want to learn about animal sleep patterns";
//   const results = await processQuery(query);
//   console.log("Final results:", results);
// }

// main();
