import { CohereClient } from "cohere-ai";
import { config } from "dotenv";
import OpenAI from "openai";

config({ path: ".env.local" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

export { openai, cohere };
