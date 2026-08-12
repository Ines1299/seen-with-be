import { Router } from "express";
import { listScreenings } from "../controllers/screenings";

const router = Router();

router.get("/screenings", listScreenings);

export default router;
