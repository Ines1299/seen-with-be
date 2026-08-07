import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const cinemas = pgTable("cinemas", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  area: text("area").notNull(), // North / East / South / West / Central
  website: text("website"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
