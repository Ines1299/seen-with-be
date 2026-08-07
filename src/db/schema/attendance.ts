import { pgTable, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./users";
import { screenings } from "./screenings";

export const attendanceStatusEnum = pgEnum("attendance_status", [
  "going",
  "interested",
]);
export const visibilityEnum = pgEnum("visibility", [
  "public",
  "friends",
  "private",
]);

export const attendance = pgTable("attendance", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  screeningId: uuid("screening_id")
    .notNull()
    .references(() => screenings.id),
  status: attendanceStatusEnum("status").notNull(),
  visibility: visibilityEnum("visibility").notNull().default("public"), // per-row, not per-user
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
