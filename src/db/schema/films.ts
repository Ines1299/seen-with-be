import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const films = pgTable("films", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  tmdbId: text("tmdb_id"), // nullable — stub records for unresolved matches
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
