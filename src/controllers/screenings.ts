import { Request, Response } from "express";
import { getScreenings } from "../services/screenings";

export async function listScreenings(_req: Request, res: Response) {
  const rows = await getScreenings();
  res.json(rows);
}
