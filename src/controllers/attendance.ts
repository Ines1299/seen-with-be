import { Request, Response } from "express";
import {
  upsertAttendance,
  getAttendanceForScreening,
  deleteAttendance,
} from "../services/attendance";

export async function markAttendance(req: Request, res: Response) {
  const { id: screeningId } = req.params;

  if (!screeningId || Array.isArray(screeningId)) {
    return res.status(400).json({ error: "screeningId is required" });
  }

  const { userId, status, visibility } = req.body;

  if (!userId || !status) {
    return res.status(400).json({ error: "userId and status are required" });
  }

  const { row, created } = await upsertAttendance(
    screeningId,
    userId,
    status,
    visibility,
  );
  res.status(created ? 201 : 200).json(row);
}

export async function listAttendance(req: Request, res: Response) {
  const { id: screeningId } = req.params;

  if (!screeningId || Array.isArray(screeningId)) {
    return res.status(400).json({ error: "screeningId is required" });
  }

  const rows = await getAttendanceForScreening(screeningId);

  res.json(rows);
}

export async function removeAttendance(req: Request, res: Response) {
  const { id: screeningId } = req.params;

  if (!screeningId || Array.isArray(screeningId)) {
    return res.status(400).json({ error: "screeningId is required" });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  await deleteAttendance(screeningId, userId);
  res.status(204).send();
}
