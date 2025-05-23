import { index, serial, vector } from "drizzle-orm/pg-core";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const documentsTable = pgTable(
  "documents",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    embedding: vector("embedding", {
      dimensions: 256,
    }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    embedding_index: index("data_embedding_index").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops")
    ),
  })
);

export type InsertDocument = typeof documentsTable.$inferInsert;
export type SelectDocument = typeof documentsTable.$inferSelect;
