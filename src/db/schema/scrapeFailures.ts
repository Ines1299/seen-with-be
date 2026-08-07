import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { cinemas } from "./cinemas";

export const scrapeFailures = pgTable("scrape_failures", {
  id: uuid("id").primaryKey().defaultRandom(),
  cinemaId: uuid("cinema_id")
    .notNull()
    .references(() => cinemas.id),
  errorMessage: text("error_message").notNull(),
  occurredAt: timestamp("occurred_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
