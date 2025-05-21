"use server";

export async function splitText(text: string) {
  const MAX_CHUNK_SIZE = 1000; // Characters per chunk
  const chunks: string[] = [];

  // Split text by sentences or paragraphs
  const paragraphs = text.split(/\n\s*\n/);

  let currentChunk = "";

  for (const paragraph of paragraphs) {
    // If adding this paragraph would exceed max size, push current chunk and start new one
    if (
      currentChunk.length + paragraph.length > MAX_CHUNK_SIZE &&
      currentChunk.length > 0
    ) {
      chunks.push(currentChunk);
      currentChunk = paragraph;
    } else {
      currentChunk =
        currentChunk.length === 0
          ? paragraph
          : `${currentChunk}\n\n${paragraph}`;
    }
  }

  // Add the last chunk if it has content
  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  return chunks;
}
