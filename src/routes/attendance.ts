import { Router } from "express";
import { db } from "../db/pool";
import { attendance, users } from "../db/schema";
import { and, eq } from "drizzle-orm";

const router = Router();

router.post("/screenings/:id/attendance", async (req, res) => {
  const { id: screeningId } = req.params;
  const { userId, status, visibility } = req.body;

  if (!userId || !status) {
    return res.status(400).json({ error: "userId and status are required" });
  }

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
    return res.json(updated);
  }

  const [created] = await db
    .insert(attendance)
    .values({ userId, screeningId, status, visibility: visibility ?? "public" })
    .returning();

  res.status(201).json(created);
});

router.get("/screenings/:id/attendance", async (req, res) => {
  const { id: screeningId } = req.params;

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

  const visible = rows.filter((r) => r.visibility === "public");

  res.json(
    visible.map((r) => ({
      userId: r.userId,
      displayName: r.displayName,
      status: r.status,
    })),
  );
});
export default router;
