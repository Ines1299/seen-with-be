import "dotenv/config";
import express from "express";
import { pool } from "./db/pool";
import screeningsRouter from "./routes/screenings";
import attendanceRouter from "./routes/attendance";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

pool
  .query("SELECT NOW()")
  .then((res) => {
    console.log("DB connected:", res.rows[0]);
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use(attendanceRouter);

app.use(screeningsRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
