import {
  pgTable,
  uuid,
  text,
  timestamp,
  numeric,
  unique,
} from "drizzle-orm/pg-core";
import { cinemas } from "./cinemas";
import { films } from "./films";

export const screenings = pgTable(
  "screenings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    cinemaId: uuid("cinema_id")
      .notNull()
      .references(() => cinemas.id),
    filmId: uuid("film_id").references(() => films.id), // nullable — stub if TMDB match fails
    externalId: text("external_id").notNull(), // used for the upsert on (cinema_id, external_id)
    startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
    price: numeric("price"),
    ticketUrl: text("ticket_url"),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    unique("screenings_cinema_external_id_unique").on(
      table.cinemaId,
      table.externalId,
    ),
  ],
);
