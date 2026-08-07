import { Router } from "express";
import { db } from "../db/pool";
import { attendance } from "../db/schema";
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

export default router;
