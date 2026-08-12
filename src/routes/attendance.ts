import { Router } from "express";
import {
  markAttendance,
  removeAttendance,
  listAttendance,
} from "../controllers/attendance";

const router = Router();

router.post("/screenings/:id/attendance", markAttendance);

router.delete("/screenings/:id/attendance", removeAttendance);

router.get("/screenings/:id/attendance", listAttendance);

export default router;
