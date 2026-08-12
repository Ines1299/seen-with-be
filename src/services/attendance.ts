import { db } from "../db/pool";
import { attendance, users } from "../db/schema";
import { and, eq } from "drizzle-orm";

export async function upsertAttendance(
  screeningId: string,
  userId: string,
  status: "going" | "interested",
  visibility?: "public" | "friends" | "private",
) {
  const [existing] = await db
    .select()
    .from(attendance)
    .where(
      and(
        eq(attendance.userId, userId),
        eq(attendance.screeningId, screeningId),
      ),
    );

  if (existing) {
    const [updated] = await db
      .update(attendance)
      .set({ status, ...(visibility && { visibility }) })
      .where(eq(attendance.id, existing.id))
      .returning();
    return { row: updated, created: false };
  }

  const [created] = await db
    .insert(attendance)
    .values({ userId, screeningId, status, visibility: visibility ?? "public" })
    .returning();

  return { row: created, created: true };
}

export async function getAttendanceForScreening(screeningId: string) {
  const rows = await db
    .select({
      userId: attendance.userId,
      status: attendance.status,
      visibility: attendance.visibility,
      displayName: users.displayName,
    })
    .from(attendance)
    .innerJoin(users, eq(attendance.userId, users.id))
    .where(eq(attendance.screeningId, screeningId));

  return rows
    .filter((r) => r.visibility === "public")
    .map((r) => ({
      userId: r.userId,
      displayName: r.displayName,
      status: r.status,
    }));
}

export async function deleteAttendance(screeningId: string, userId: string) {
  await db
    .delete(attendance)
    .where(
      and(
        eq(attendance.userId, userId),
        eq(attendance.screeningId, screeningId),
      ),
    );
}
