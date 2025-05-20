import { retrieveData } from './retrieve-data';
import { cohere } from './api-clients';

export async function rankDocuments(query: string, documents: {content: string; name: string}[], limit = 3) {
  const rerank = await cohere.v2.rerank({
    documents: documents.map((doc) => ({text: doc.content, id: doc.name})),
    query,
    topN: limit,
    model: "rerank-english-v3.0",
  });

  return rerank.results.map((result) => ({
    name: documents[result.index].name,
    content: documents[result.index].content,
    relevanceScore: result.relevanceScore,
  }));
}

async function main() {
  const retrievedDocuments = await retrieveData("Interesting facts about animal sleep");
  console.log(retrievedDocuments);
  const rankedDocuments = await rankDocuments("Interesting facts about animal sleep", retrievedDocuments);
  console.log(rankedDocuments);
}

main();
